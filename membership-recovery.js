/**
 * TOWN membership recovery helpers — advisory checkout marker + authoritative
 * membership snapshot derivation + bounded polling policy.
 *
 * The checkout-pending marker is never authorization. Membership and civic
 * participation are derived only from GET /v1/account/membership responses.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownMembershipRecovery = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // Advisory only — survives same-tab Stripe Checkout navigation.
  // Never payment/customer/provider identifiers. Never authorization.
  const CHECKOUT_PENDING_KEY = "town.checkoutPending";
  const CHECKOUT_PENDING_VALUE = "1";

  const RECOVERY_MAX_MS = 12000;
  const RECOVERY_INTERVAL_MS = 2000;

  const PAID_MEMBERSHIP_STATUSES = {
    active: true,
    cancelling: true,
  };

  // Pre-webhook / non-paid states that remain fail-closed on normal loads, but
  // must NOT stop a pending Checkout recovery poll (they may precede invoice.paid).
  const PRE_WEBHOOK_MEMBERSHIP_STATUSES = {
    inactive: true,
    expired: true,
    suspended: true,
  };

  // Authoritative outcomes that may end a pending Checkout recovery window.
  // paid_pending_binding is terminal but never grants civic participation.
  const CHECKOUT_RECOVERY_STOP_STATUSES = {
    active: true,
    cancelling: true,
    paid_pending_binding: true,
  };

  function resolveStorage(storage) {
    if (storage) return storage;
    try {
      // Default store for advisory CHECKOUT_PENDING_KEY (town.checkoutPending) only.
      if (typeof sessionStorage !== "undefined") return sessionStorage; // CHECKOUT_PENDING only
    } catch (_err) {
      return null;
    }
    return null;
  }

  function setCheckoutPendingMarker(storage) {
    const store = resolveStorage(storage);
    if (!store || typeof store.setItem !== "function") return false;
    try {
      store.setItem(CHECKOUT_PENDING_KEY, CHECKOUT_PENDING_VALUE);
      return true;
    } catch (_err) {
      return false;
    }
  }

  function clearCheckoutPendingMarker(storage) {
    const store = resolveStorage(storage);
    if (!store || typeof store.removeItem !== "function") return false;
    try {
      store.removeItem(CHECKOUT_PENDING_KEY);
      return true;
    } catch (_err) {
      return false;
    }
  }

  function hasCheckoutPendingMarker(storage) {
    const store = resolveStorage(storage);
    if (!store || typeof store.getItem !== "function") return false;
    try {
      return store.getItem(CHECKOUT_PENDING_KEY) === CHECKOUT_PENDING_VALUE;
    } catch (_err) {
      return false;
    }
  }

  // Marker alone never grants membership or participation.
  function markerGrantsAuthorization(_markerPresent) {
    return false;
  }

  function deriveMembershipSnapshot(payload) {
    if (!payload || typeof payload !== "object") return null;
    const data = payload.data;
    if (!data || typeof data !== "object") return null;
    const membership = data.membership;
    const access = data.access;
    if (!membership || typeof membership !== "object") return null;
    if (!access || typeof access !== "object") return null;
    if (typeof membership.status !== "string" || membership.status === "") {
      return null;
    }
    return {
      status: membership.status,
      accessUntil:
        membership.accessUntil === undefined ? null : membership.accessUntil,
      cancelAtPeriodEnd: membership.cancelAtPeriodEnd === true,
      accessLevel: access.level,
      canParticipate: access.canParticipate === true,
      localEligibility: access.localEligibility,
      // Self-only owner label from GET /v1/account/membership — gates owner tools UI.
      isOwner: data.isOwner === true,
    };
  }

  function isOwnerAccount(snapshot) {
    return !!(snapshot && snapshot.isOwner === true);
  }

  function isPaidMembership(snapshot) {
    return !!(
      snapshot &&
      typeof snapshot.status === "string" &&
      PAID_MEMBERSHIP_STATUSES[snapshot.status]
    );
  }

  function canParticipate(snapshot) {
    return !!(snapshot && snapshot.canParticipate === true);
  }

  function isPreWebhookMembershipStatus(snapshot) {
    return !!(
      snapshot &&
      typeof snapshot.status === "string" &&
      PRE_WEBHOOK_MEMBERSHIP_STATUSES[snapshot.status]
    );
  }

  function isPaidPendingBinding(snapshot) {
    return !!(snapshot && snapshot.status === "paid_pending_binding");
  }

  /**
   * Stop conditions for a pending post-Checkout polling window only.
   * inactive / expired / suspended must NOT stop polling before timeout —
   * they may be the account's pre-webhook state.
   */
  function isCheckoutRecoveryStopOutcome(snapshot) {
    return !!(
      snapshot &&
      typeof snapshot.status === "string" &&
      CHECKOUT_RECOVERY_STOP_STATUSES[snapshot.status]
    );
  }

  // Backward-compatible alias used by earlier recovery wiring/tests.
  // Means "checkout recovery may stop", NOT "any known membership status".
  function isTerminalMembershipOutcome(snapshot) {
    return isCheckoutRecoveryStopOutcome(snapshot);
  }

  function enablesMemberAuthorizedState(snapshot) {
    return isPaidMembership(snapshot) && canParticipate(snapshot);
  }

  function enablesCivicParticipation(snapshot) {
    if (!snapshot) return false;
    // paid_pending_binding is never active web participation.
    if (isPaidPendingBinding(snapshot)) return false;
    // Pre-webhook / non-paid states stay fail-closed for civic actions.
    if (isPreWebhookMembershipStatus(snapshot)) return false;
    return isPaidMembership(snapshot) && canParticipate(snapshot);
  }

  /**
   * Membership upsell / "become a member" invite is only for accounts that are
   * not already paid and not already civic-capable. Paid or pending-binding
   * members must never be treated as non-payers.
   */
  function shouldOfferMembershipInvite(snapshot) {
    if (!snapshot) return true;
    if (isPaidMembership(snapshot)) return false;
    if (isPaidPendingBinding(snapshot)) return false;
    if (enablesCivicParticipation(snapshot)) return false;
    if (isOwnerAccount(snapshot) && canParticipate(snapshot)) return false;
    return true;
  }

  /**
   * Normal authenticated loads (no Checkout marker): apply any derived snapshot
   * once. Non-paid states fail closed and must not start recovery polling.
   */
  function shouldStartCheckoutRecoveryPolling(pendingMarker, snapshot) {
    if (!pendingMarker) return false;
    if (isCheckoutRecoveryStopOutcome(snapshot)) return false;
    return true;
  }

  function shouldClearCheckoutPendingMarker(reason) {
    return (
      reason === "success" ||
      reason === "timeout" ||
      reason === "exit" ||
      reason === "dismiss"
    );
  }

  /**
   * Bounded recovery poller — no overlapping polls, stops on success/timeout/exit.
   * options.poll() → Promise resolving to a value passed to shouldStop(result).
   */
  function createBoundedPoller(options) {
    const opts = options || {};
    const maxMs = opts.maxMs != null ? opts.maxMs : RECOVERY_MAX_MS;
    const intervalMs =
      opts.intervalMs != null ? opts.intervalMs : RECOVERY_INTERVAL_MS;
    const now = typeof opts.now === "function" ? opts.now : Date.now;
    const schedule =
      typeof opts.setTimeout === "function" ? opts.setTimeout : setTimeout;
    const cancel =
      typeof opts.clearTimeout === "function" ? opts.clearTimeout : clearTimeout;
    const poll = opts.poll;
    const shouldStop =
      typeof opts.shouldStop === "function"
        ? opts.shouldStop
        : function () {
            return false;
          };
    const onStop = typeof opts.onStop === "function" ? opts.onStop : null;

    let timerId = null;
    let stopped = false;
    let startedAt = 0;
    let inFlight = false;
    let stopReason = null;

    function finish(reason) {
      if (stopped) return;
      stopped = true;
      stopReason = reason;
      if (timerId != null) {
        cancel(timerId);
        timerId = null;
      }
      if (onStop) onStop(reason);
    }

    function scheduleNext() {
      if (stopped) return;
      if (now() - startedAt >= maxMs) {
        finish("timeout");
        return;
      }
      timerId = schedule(runTick, intervalMs);
    }

    function runTick() {
      timerId = null;
      if (stopped) return;
      if (now() - startedAt >= maxMs) {
        finish("timeout");
        return;
      }
      if (inFlight) return;
      if (typeof poll !== "function") {
        finish("exit");
        return;
      }
      inFlight = true;
      Promise.resolve()
        .then(function () {
          return poll();
        })
        .then(function (result) {
          inFlight = false;
          if (stopped) return;
          if (shouldStop(result)) {
            finish("success");
            return;
          }
          scheduleNext();
        })
        .catch(function () {
          inFlight = false;
          if (stopped) return;
          scheduleNext();
        });
    }

    return {
      start: function () {
        if (stopped) return;
        startedAt = now();
        runTick();
      },
      stop: function () {
        finish("exit");
      },
      isStopped: function () {
        return stopped;
      },
      stopReason: function () {
        return stopReason;
      },
    };
  }

  return {
    CHECKOUT_PENDING_KEY: CHECKOUT_PENDING_KEY,
    CHECKOUT_PENDING_VALUE: CHECKOUT_PENDING_VALUE,
    RECOVERY_MAX_MS: RECOVERY_MAX_MS,
    RECOVERY_INTERVAL_MS: RECOVERY_INTERVAL_MS,
    setCheckoutPendingMarker: setCheckoutPendingMarker,
    clearCheckoutPendingMarker: clearCheckoutPendingMarker,
    hasCheckoutPendingMarker: hasCheckoutPendingMarker,
    markerGrantsAuthorization: markerGrantsAuthorization,
    deriveMembershipSnapshot: deriveMembershipSnapshot,
    isOwnerAccount: isOwnerAccount,
    isPaidMembership: isPaidMembership,
    canParticipate: canParticipate,
    isPreWebhookMembershipStatus: isPreWebhookMembershipStatus,
    isPaidPendingBinding: isPaidPendingBinding,
    isCheckoutRecoveryStopOutcome: isCheckoutRecoveryStopOutcome,
    isTerminalMembershipOutcome: isTerminalMembershipOutcome,
    enablesMemberAuthorizedState: enablesMemberAuthorizedState,
    enablesCivicParticipation: enablesCivicParticipation,
    shouldOfferMembershipInvite: shouldOfferMembershipInvite,
    shouldStartCheckoutRecoveryPolling: shouldStartCheckoutRecoveryPolling,
    shouldClearCheckoutPendingMarker: shouldClearCheckoutPendingMarker,
    createBoundedPoller: createBoundedPoller,
  };
});
