(function (global) {
  "use strict";

  function makeApiError(kind) {
    const err = new Error(kind);
    err.kind = kind;
    return err;
  }

  function checkoutErrorKind(status) {
    if (status === 401) return "unauthenticated";
    if (status === 409) return "alreadyMember";
    if (status === 429) return "rateLimited";
    if (status === 503 || status === 404) return "unavailable";
    if (status === 502) return "checkoutFailed";
    return "network";
  }

  function geolocationErrorMessage(copy, err) {
    const code = err && err.code;
    if (code === "unsupported") return copy.errorUnsupported;
    if (code === 1) return copy.errorPermission;
    if (code === 2) return copy.errorUnavailable;
    if (code === 3) return copy.errorTimeout;
    return copy.errorUnavailable;
  }

  function isSignalApiId(value) {
    return (
      typeof value === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
    );
  }

  function formatObservedDate(observedOn, localeTag) {
    if (!observedOn) return "";
    try {
      const date = new Date(observedOn + "T12:00:00Z");
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat(localeTag, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    } catch (_err) {
      return "";
    }
  }

  function profileDisplayName(email) {
    if (!email) return "";
    const local = email.split("@")[0] || "";
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    if (!cleaned) return "";
    return cleaned
      .split(/\s+/)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function formatActivityWhen(iso) {
    if (!iso || typeof iso !== "string") return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    try {
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (_err) {
      return iso.slice(0, 10);
    }
  }

  function activityItemDetail(item, copy) {
    if (!item || !item.kind) return "";
    if (item.kind === "contribution" && item.contribution) {
      const intentKey = item.contribution.intent;
      const intentLabel =
        (copy.intents && copy.intents[intentKey]) || intentKey || "";
      const text = String(item.contribution.text || "").trim();
      const clipped = text.length > 140 ? text.slice(0, 137) + "…" : text;
      return intentLabel ? intentLabel + " · " + clipped : clipped;
    }
    if (item.kind === "signal_evolution" && item.evolution) {
      const latest = String(item.evolution.latestUpdate || "").trim();
      const status = String(item.evolution.statusLabel || "").trim();
      if (latest) return latest;
      return status;
    }
    const community =
      item.signal && item.signal.community && item.signal.community.displayName;
    return community || "";
  }

  function isPasskeyCeremonyCancelled(err) {
    const causeName = err && err.cause && err.cause.name;
    return (
      (err &&
        (err.name === "NotAllowedError" ||
          err.name === "AbortError" ||
          err.code === "ERROR_CEREMONY_ABORTED")) ||
      causeName === "NotAllowedError" ||
      causeName === "AbortError" ||
      (err &&
        err.code === "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY" &&
        causeName === "NotAllowedError")
    );
  }

  function sessionStatusNoteText(copy, cached) {
    if (!cached) return "";
    if (cached.note === "unavailable") {
      return copy.sessionUnavailable || "";
    }
    if (cached.note === "local") {
      return copy.sessionLocalOnly || "";
    }
    if (cached.note === "gated") {
      return copy.sessionGated || "";
    }
    if (cached.note === "publish_failed") {
      return copy.sessionPublishFailed || "";
    }
    return "";
  }

  global.TownAppUtils = Object.freeze({
    makeApiError,
    checkoutErrorKind,
    geolocationErrorMessage,
    isSignalApiId,
    formatObservedDate,
    profileDisplayName,
    formatActivityWhen,
    activityItemDetail,
    isPasskeyCeremonyCancelled,
    sessionStatusNoteText,
  });
})(typeof window !== "undefined" ? window : globalThis);
