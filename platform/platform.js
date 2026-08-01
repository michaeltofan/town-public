(function () {
  "use strict";

  var API_BASE = "https://api-staging.towncivic.org";

  var gate = document.getElementById("gate");
  var consoleEl = document.getElementById("console");
  var gateStatus = document.getElementById("gate-status");
  var consoleStatus = document.getElementById("console-status");
  var operatorRole = document.getElementById("operator-role");
  var operatorId = document.getElementById("operator-id");
  var retrySession = document.getElementById("retry-session");
  var signInForm = document.getElementById("platform-sign-in-form");
  var signInButton = document.getElementById("platform-sign-in");
  var signOutButton = document.getElementById("platform-sign-out");
  var emailInput = document.getElementById("platform-email");
  var passwordInput = document.getElementById("platform-password");

  var session = null;
  var signInSubmitting = false;

  function setStatus(el, message, kind) {
    if (!el) return;
    el.textContent = message || "";
    el.classList.remove("is-error", "is-ok");
    if (kind) el.classList.add(kind);
  }

  async function requestJson(url, options) {
    var opts = options || {};
    return fetch(url, {
      method: opts.method || "GET",
      headers: opts.headers || { Accept: "application/json" },
      body: opts.body,
      credentials: "include",
    });
  }

  async function getJson(path) {
    var response = await requestJson(API_BASE + path, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    var payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  async function postJson(path, body) {
    var response = await requestJson(API_BASE + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body == null ? {} : body),
    });
    var payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function emptyState(message) {
    return (
      '<div class="row"><div><h4>' +
      escapeHtml(message) +
      "</h4></div></div>"
    );
  }

  function setSignInBusy(busy) {
    signInSubmitting = !!busy;
    if (signInButton) signInButton.disabled = signInSubmitting;
    if (retrySession) retrySession.disabled = signInSubmitting;
    if (emailInput) emailInput.disabled = signInSubmitting;
    if (passwordInput) passwordInput.disabled = signInSubmitting;
  }

  function showConsole() {
    gate.hidden = true;
    consoleEl.hidden = false;
    operatorRole.hidden = false;
    operatorId.hidden = false;
    if (signOutButton) signOutButton.hidden = false;
    operatorRole.textContent = session.role;
    operatorId.textContent = session.accountId;
  }

  function showGate(message, kind) {
    gate.hidden = false;
    consoleEl.hidden = true;
    operatorRole.hidden = true;
    operatorId.hidden = true;
    if (signOutButton) signOutButton.hidden = true;
    session = null;
    var statusKind = arguments.length > 1 ? kind : message ? "is-error" : null;
    setStatus(gateStatus, message, statusKind);
  }

  async function loadOperatorSession() {
    var result = await getJson("/v1/platform/session");
    if (result.response.status === 200 && result.payload && result.payload.data) {
      session = result.payload.data;
      return { ok: true, session: session };
    }
    return { ok: false, status: result.response.status };
  }

  async function enterConsoleFromSession() {
    showConsole();
    setStatus(consoleStatus, "Signed in as platform operator.", "is-ok");
    await loadSection("status");
  }

  async function bootstrap() {
    setStatus(gateStatus, "Checking operator session…");
    var result = await loadOperatorSession();
    if (result.ok) {
      await enterConsoleFromSession();
      return true;
    }
    showGate("Sign in with an authorized platform operator account.", null);
    return false;
  }

  async function startPlatformPasswordSignIn(email, password) {
    if (signInSubmitting) return;
    setSignInBusy(true);
    setStatus(gateStatus, "Signing in…");
    try {
      var auth = await postJson("/v1/authentication/password", {
        email: email,
        password: password,
        clientType: "web",
      });
      if (auth.response.status === 404) {
        showGate(
          "Password Sign-in is disabled on the API (PASSWORD_SIGN_IN_ENABLED).",
          "is-error"
        );
        return;
      }
      if (auth.response.status !== 200) {
        showGate("Sign-in failed. Check email and password.", "is-error");
        return;
      }
      var operator = await loadOperatorSession();
      if (operator.ok) {
        if (passwordInput) passwordInput.value = "";
        await enterConsoleFromSession();
        return;
      }
      showGate(
        "Signed in, but this account is not authorized for platform access.",
        "is-error"
      );
    } catch (_err) {
      showGate("Sign-in failed. Try again.", "is-error");
    } finally {
      setSignInBusy(false);
    }
  }

  async function signOutPlatform() {
    if (signOutButton) signOutButton.disabled = true;
    try {
      await postJson("/v1/authentication/logout", {});
    } catch (_err) {
      /* still clear local console state */
    }
    session = null;
    showGate("Signed out. Sign in again with an authorized operator account.");
    if (signOutButton) signOutButton.disabled = false;
  }

  function bindNav() {
    var items = document.querySelectorAll(".nav-item");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        items.forEach(function (node) {
          node.classList.remove("is-active");
        });
        item.classList.add("is-active");
        var section = item.getAttribute("data-section");
        document.querySelectorAll(".section").forEach(function (panel) {
          panel.classList.toggle(
            "is-active",
            panel.getAttribute("data-panel") === section
          );
        });
        loadSection(section);
      });
    });
  }

  async function loadSection(section) {
    try {
      if (section === "status") await loadStatus();
      if (section === "accounts") await loadAccounts();
      if (section === "memberships") await loadMemberships();
      if (section === "communities") await loadCommunities();
      if (section === "moderation") await loadModeration();
      if (section === "audit") await loadAudit();
      if (section === "operators") await loadOperators();
    } catch (err) {
      setStatus(
        consoleStatus,
        err && err.message ? err.message : "Failed to load section",
        "is-error"
      );
    }
  }

  function componentTone(status) {
    if (status === "ok") return "is-ok";
    if (status === "disabled") return "is-disabled";
    if (status === "degraded" || status === "misconfigured" || status === "timeout") {
      return "is-warn";
    }
    return "is-fail";
  }

  function componentCard(label, component) {
    var status = component && component.status ? component.status : "unknown";
    var detail = component && component.detail ? component.detail : "";
    return (
      '<div class="stat component-stat ' +
      componentTone(status) +
      '"><span>' +
      escapeHtml(label) +
      "</span><strong>" +
      escapeHtml(status) +
      "</strong>" +
      (detail
        ? '<em class="component-detail">' + escapeHtml(detail) + "</em>"
        : "") +
      "</div>"
    );
  }

  async function loadStatus() {
    var result = await getJson("/v1/platform/status");
    if (result.response.status !== 200) {
      throw new Error("Unable to load platform status");
    }
    var data = result.payload.data;
    var health = data.health;
    var components = data.components || {};
    var counts = data.counts;
    var componentsEl = document.getElementById("status-components");
    if (componentsEl) {
      componentsEl.innerHTML =
        componentCard("API", components.api) +
        componentCard("Database", components.database) +
        componentCard("Email", components.email) +
        componentCard("Stripe", components.stripe);
    }
    var html = "";
    html +=
      '<div class="stat"><span>Ready</span><strong>' +
      escapeHtml(health.ready) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Migrations</span><strong>' +
      escapeHtml(health.checks.migrations) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Accounts</span><strong>' +
      escapeHtml(counts.accounts.total) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Suspended</span><strong>' +
      escapeHtml(counts.accounts.suspended) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Memberships</span><strong>' +
      escapeHtml(counts.memberships.active) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Hidden signals</span><strong>' +
      escapeHtml(counts.signals.hidden) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Pending review</span><strong>' +
      escapeHtml(counts.submissions.pendingReview) +
      "</strong></div>";
    document.getElementById("status-grid").innerHTML = html;
    await loadUptime();
    await loadAlerts();
    await loadRecentErrors();
    var commit =
      health.build && health.build.commitSha ? health.build.commitSha.slice(0, 8) : "unknown";
    setStatus(
      consoleStatus,
      "Build " + commit + " · " + health.build.environment,
      "is-ok"
    );
  }

  function canManageAlerts() {
    return session && (session.role === "ops_admin" || session.role === "role_admin");
  }

  function formatRatio(ratio) {
    if (ratio === null || ratio === undefined || Number.isNaN(Number(ratio))) return "—";
    return Math.round(Number(ratio) * 100) + "%";
  }

  function uptimeSampleRow(sample) {
    var comps = sample.components || {};
    return (
      '<article class="uptime-row">' +
      '<div class="uptime-row-top">' +
      '<strong class="uptime-overall">' +
      escapeHtml(sample.overallStatus || "unknown") +
      "</strong>" +
      '<time datetime="' +
      escapeHtml(sample.sampledAt || "") +
      '">' +
      escapeHtml(sample.sampledAt || "") +
      "</time>" +
      "</div>" +
      '<p class="uptime-components">api ' +
      escapeHtml(comps.api || "—") +
      " · db " +
      escapeHtml(comps.database || "—") +
      " · email " +
      escapeHtml(comps.email || "—") +
      " · stripe " +
      escapeHtml(comps.stripe || "—") +
      "</p>" +
      "</article>"
    );
  }

  async function loadUptime() {
    var summaryEl = document.getElementById("status-uptime-summary");
    var samplesEl = document.getElementById("status-uptime-samples");
    if (!summaryEl || !samplesEl) return;
    var result = await getJson("/v1/platform/uptime?limit=24");
    if (result.response.status !== 200) {
      summaryEl.innerHTML = "";
      samplesEl.innerHTML = '<p class="muted">Unable to load uptime samples.</p>';
      return;
    }
    var data = result.payload.data || {};
    var summary = data.summary || {};
    summaryEl.innerHTML =
      '<div class="stat"><span>Ok ratio</span><strong>' +
      escapeHtml(formatRatio(summary.okRatio)) +
      "</strong></div>" +
      '<div class="stat"><span>Samples</span><strong>' +
      escapeHtml(summary.sampleCount) +
      "</strong></div>" +
      '<div class="stat"><span>Open alerts</span><strong>' +
      escapeHtml(summary.openAlertCount) +
      "</strong></div>";
    var samples = data.samples || [];
    if (!samples.length) {
      samplesEl.innerHTML =
        '<p class="muted">No uptime samples yet. Samples appear after Monitor status checks (throttled).</p>';
      return;
    }
    samplesEl.innerHTML = samples.slice(0, 12).map(uptimeSampleRow).join("");
  }

  function alertRow(alert) {
    var actions = "";
    if (!alert.acknowledgedAt && canManageAlerts()) {
      actions =
        '<button type="button" class="row-action" data-action="ack-alert" data-id="' +
        escapeHtml(alert.id) +
        '">Acknowledge</button>';
    }
    return (
      '<article class="alert-row severity-' +
      escapeHtml(alert.severity || "warning") +
      '">' +
      '<div class="alert-row-top">' +
      "<strong>" +
      escapeHtml(alert.component || "unknown") +
      "</strong>" +
      '<span class="alert-status">' +
      escapeHtml(alert.status || "") +
      " · " +
      escapeHtml(alert.severity || "") +
      "</span>" +
      '<time datetime="' +
      escapeHtml(alert.openedAt || "") +
      '">' +
      escapeHtml(alert.openedAt || "") +
      "</time>" +
      "</div>" +
      '<p class="alert-detail">' +
      escapeHtml(alert.detail || "No detail") +
      "</p>" +
      '<p class="alert-meta">' +
      (alert.acknowledgedAt
        ? "Acknowledged " + escapeHtml(alert.acknowledgedAt)
        : "Unacknowledged") +
      (alert.resolvedAt ? " · resolved " + escapeHtml(alert.resolvedAt) : " · open") +
      "</p>" +
      (actions ? '<div class="row-actions">' + actions + "</div>" : "") +
      "</article>"
    );
  }

  async function loadAlerts() {
    var alertsEl = document.getElementById("status-alerts");
    if (!alertsEl) return;
    var result = await getJson("/v1/platform/alerts?limit=20&state=open");
    if (result.response.status !== 200) {
      alertsEl.innerHTML = '<p class="muted">Unable to load alerts.</p>';
      return;
    }
    var alerts =
      result.payload && result.payload.data && result.payload.data.alerts
        ? result.payload.data.alerts
        : [];
    if (!alerts.length) {
      alertsEl.innerHTML = '<p class="muted">No open alerts.</p>';
      return;
    }
    alertsEl.innerHTML = alerts.map(alertRow).join("");
    alertsEl.querySelectorAll('[data-action="ack-alert"]').forEach(function (button) {
      button.addEventListener("click", function () {
        void acknowledgeAlert(button.getAttribute("data-id"));
      });
    });
  }

  async function acknowledgeAlert(alertId) {
    if (!alertId) return;
    var result = await postJson("/v1/platform/alerts/" + alertId + "/acknowledge", {});
    if (result.response.status !== 200) {
      setStatus(consoleStatus, "Acknowledge failed (ops_admin required)", "is-error");
      return;
    }
    setStatus(consoleStatus, "Alert acknowledged", "is-ok");
    await loadAlerts();
    await loadUptime();
  }

  function errorRow(error) {
    var when = error.occurredAt || "";
    var route =
      (error.method ? error.method + " " : "") + (error.route ? error.route : "unknown-route");
    return (
      '<article class="error-row">' +
      '<div class="error-row-top">' +
      '<strong class="error-code">' +
      escapeHtml(error.errorCode || "INTERNAL_ERROR") +
      "</strong>" +
      '<span class="error-status">' +
      escapeHtml(String(error.statusCode || "")) +
      "</span>" +
      '<time datetime="' +
      escapeHtml(when) +
      '">' +
      escapeHtml(when) +
      "</time>" +
      "</div>" +
      '<p class="error-route">' +
      escapeHtml(route) +
      "</p>" +
      '<p class="error-message">' +
      escapeHtml(error.message || "") +
      "</p>" +
      '<p class="error-meta">requestId ' +
      escapeHtml(error.requestId || "—") +
      (error.commitSha
        ? " · build " + escapeHtml(String(error.commitSha).slice(0, 8))
        : "") +
      "</p>" +
      "</article>"
    );
  }

  async function loadRecentErrors() {
    var errorsEl = document.getElementById("status-errors");
    if (!errorsEl) return;
    var result = await getJson("/v1/platform/errors?limit=20");
    if (result.response.status !== 200) {
      errorsEl.innerHTML = '<p class="muted">Unable to load recent errors.</p>';
      return;
    }
    var errors =
      result.payload && result.payload.data && result.payload.data.errors
        ? result.payload.data.errors
        : [];
    if (!errors.length) {
      errorsEl.innerHTML = '<p class="muted">No recent technical errors.</p>';
      return;
    }
    errorsEl.innerHTML = errors.map(errorRow).join("");
  }

  function accountRow(account) {
    var actions = "";
    if (account.status === "active") {
      actions +=
        '<button type="button" class="row-action danger" data-action="suspend" data-id="' +
        escapeHtml(account.accountId) +
        '">Suspend</button>';
    }
    if (account.status === "suspended") {
      actions +=
        '<button type="button" class="row-action" data-action="reactivate" data-id="' +
        escapeHtml(account.accountId) +
        '">Reactivate</button>';
    }
    actions +=
      '<button type="button" class="row-action secondary" data-action="inspect" data-id="' +
      escapeHtml(account.accountId) +
      '">Investigate</button>';
    return (
      '<div class="row"><div><h4>' +
      escapeHtml(account.email || account.accountId) +
      "</h4><p>" +
      escapeHtml(account.status) +
      " · membership " +
      escapeHtml(account.membershipStatus || "none") +
      " · " +
      escapeHtml(account.communitySlug || "unbound") +
      "<br />" +
      escapeHtml(account.accountId) +
      '</p></div><div class="row-actions">' +
      actions +
      "</div></div>"
    );
  }

  async function loadAccounts(query) {
    var params = new URLSearchParams();
    params.set("limit", "50");
    if (query && query.q) params.set("q", query.q);
    if (query && query.status) params.set("status", query.status);
    var result = await getJson("/v1/platform/accounts?" + params.toString());
    if (result.response.status !== 200) {
      throw new Error("Unable to load accounts");
    }
    var accounts = result.payload.data.accounts || [];
    var list = document.getElementById("accounts-list");
    list.innerHTML = accounts.length
      ? accounts.map(accountRow).join("")
      : emptyState("No accounts matched.");
    list.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        handleAccountAction(
          button.getAttribute("data-action"),
          button.getAttribute("data-id")
        );
      });
    });
  }

  async function handleAccountAction(action, accountId) {
    if (action === "inspect") {
      document.getElementById("investigate-account-id").value = accountId;
      document.querySelector('[data-section="investigate"]').click();
      await loadInvestigation(accountId);
      return;
    }
    if (action === "suspend") {
      var reason = window.prompt(
        "Suspend reason (immoral|abusive|spam|off_topic|illegal|other)",
        "spam"
      );
      if (!reason) return;
      var suspend = await postJson(
        "/v1/platform/accounts/" + encodeURIComponent(accountId) + "/suspend",
        { reason: reason }
      );
      if (suspend.response.status !== 200) {
        setStatus(consoleStatus, "Suspend failed", "is-error");
        return;
      }
      setStatus(consoleStatus, "Account suspended", "is-ok");
      await loadAccounts();
      return;
    }
    if (action === "reactivate") {
      var reactivate = await postJson(
        "/v1/platform/accounts/" + encodeURIComponent(accountId) + "/reactivate",
        {}
      );
      if (reactivate.response.status !== 200) {
        setStatus(consoleStatus, "Reactivate failed", "is-error");
        return;
      }
      setStatus(consoleStatus, "Account reactivated", "is-ok");
      await loadAccounts();
    }
  }

  function newIdempotencyKey() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (ch) {
      var r = (Math.random() * 16) | 0;
      var v = ch === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function toIsoFromLocalInput(value) {
    if (!value) return null;
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString();
  }

  function membershipActionButtons(row) {
    var actions = Array.isArray(row.allowedActions) ? row.allowedActions : [];
    var buttons = [];
    if (actions.indexOf("extend") !== -1) {
      buttons.push(
        '<button type="button" class="row-action" data-action="extend" data-id="' +
          escapeHtml(row.accountId) +
          '">Extend</button>'
      );
    }
    if (actions.indexOf("schedule_cancellation") !== -1) {
      buttons.push(
        '<button type="button" class="row-action danger" data-action="schedule_cancellation" data-id="' +
          escapeHtml(row.accountId) +
          '">Schedule cancellation</button>'
      );
    }
    if (!buttons.length) {
      if (row.source === "stripe" || row.source === "google_play") {
        buttons.push(
          '<span class="muted">Provider-managed — use Stripe/Play flows</span>'
        );
      } else {
        buttons.push('<span class="muted">No local mutations available</span>');
      }
    }
    return '<div class="row-actions">' + buttons.join("") + "</div>";
  }

  async function loadMemberships(filters) {
    var query = new URLSearchParams();
    query.set("limit", "50");
    if (filters && filters.q) query.set("q", filters.q);
    if (filters && filters.status) query.set("status", filters.status);
    var result = await getJson("/v1/platform/memberships?" + query.toString());
    if (result.response.status !== 200) {
      throw new Error("Unable to load memberships");
    }
    var memberships = result.payload.data.memberships || [];
    var list = document.getElementById("memberships-list");
    list.innerHTML = memberships.length
      ? memberships
          .map(function (row) {
            return (
              '<div class="row"><div><h4>' +
              escapeHtml(row.email || row.accountId) +
              "</h4><p>" +
              escapeHtml(row.status) +
              " · " +
              escapeHtml(row.source) +
              " · until " +
              escapeHtml(row.accessUntil || "n/a") +
              (row.cancelAtPeriodEnd ? " · cancel at period end" : "") +
              "</p><p class=\"muted\">" +
              escapeHtml(row.accountId) +
              "</p></div>" +
              membershipActionButtons(row) +
              "</div>"
            );
          })
          .join("")
      : emptyState("No memberships found.");

    list.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        handleMembershipAction(
          button.getAttribute("data-action"),
          button.getAttribute("data-id")
        );
      });
    });
  }

  async function handleMembershipAction(action, accountId) {
    if (!accountId) return;
    if (action === "extend") {
      var untilLocal = window.prompt(
        "New accessUntil (local datetime, e.g. 2031-01-01T00:00)",
        ""
      );
      if (!untilLocal) return;
      var accessUntil = toIsoFromLocalInput(untilLocal);
      if (!accessUntil) {
        setStatus(consoleStatus, "Invalid accessUntil", "is-error");
        return;
      }
      var extendReason = window.prompt("Administrative reason (required)", "");
      if (!extendReason || extendReason.trim().length < 3) {
        setStatus(consoleStatus, "Reason is required", "is-error");
        return;
      }
      setStatus(consoleStatus, "Extending membership…");
      var extend = await postJson(
        "/v1/platform/memberships/" + encodeURIComponent(accountId) + "/extend",
        {
          accessUntil: accessUntil,
          reason: extendReason.trim(),
          idempotencyKey: newIdempotencyKey(),
        }
      );
      if (extend.response.status !== 200) {
        var extendCode =
          extend.payload && extend.payload.error && extend.payload.error.code
            ? extend.payload.error.code
            : "request_failed";
        setStatus(consoleStatus, "Extend failed (" + extendCode + ")", "is-error");
        return;
      }
      setStatus(
        consoleStatus,
        extend.payload.data.changed ? "Membership extended" : "Extend already applied",
        "is-ok"
      );
      await loadMemberships(currentMembershipFilters());
      return;
    }

    if (action === "schedule_cancellation") {
      var cancelReason = window.prompt("Administrative reason (required)", "");
      if (!cancelReason || cancelReason.trim().length < 3) {
        setStatus(consoleStatus, "Reason is required", "is-error");
        return;
      }
      if (
        !window.confirm(
          "Schedule cancellation for this admin membership? Access continues until accessUntil."
        )
      ) {
        return;
      }
      setStatus(consoleStatus, "Scheduling cancellation…");
      var cancel = await postJson(
        "/v1/platform/memberships/" +
          encodeURIComponent(accountId) +
          "/schedule-cancellation",
        {
          reason: cancelReason.trim(),
          idempotencyKey: newIdempotencyKey(),
        }
      );
      if (cancel.response.status !== 200) {
        var cancelCode =
          cancel.payload && cancel.payload.error && cancel.payload.error.code
            ? cancel.payload.error.code
            : "request_failed";
        setStatus(
          consoleStatus,
          "Schedule cancellation failed (" + cancelCode + ")",
          "is-error"
        );
        return;
      }
      setStatus(
        consoleStatus,
        cancel.payload.data.changed
          ? "Cancellation scheduled"
          : "Cancellation already scheduled",
        "is-ok"
      );
      await loadMemberships(currentMembershipFilters());
    }
  }

  function currentMembershipFilters() {
    return {
      q: document.getElementById("memberships-q").value.trim(),
      status: document.getElementById("memberships-status").value,
    };
  }

  async function loadCommunities() {
    var result = await getJson("/v1/platform/communities");
    if (result.response.status !== 200) {
      throw new Error("Unable to load communities");
    }
    var communities = result.payload.data.communities || [];
    document.getElementById("communities-list").innerHTML = communities
      .map(function (row) {
        return (
          '<div class="row"><div><h4>' +
          escapeHtml(row.displayName) +
          "</h4><p>" +
          escapeHtml(row.slug) +
          " · " +
          escapeHtml(row.countryCode) +
          " · bound accounts " +
          escapeHtml(row.boundAccounts) +
          "</p></div></div>"
        );
      })
      .join("");
  }

  var REASON_PROMPT =
    "Reason (immoral|abusive|spam|off_topic|illegal|other)";

  function promptReason(defaultValue) {
    var reason = window.prompt(REASON_PROMPT, defaultValue || "spam");
    if (!reason) return null;
    reason = reason.trim();
    if (
      ["immoral", "abusive", "spam", "off_topic", "illegal", "other"].indexOf(
        reason
      ) === -1
    ) {
      setStatus(consoleStatus, "Invalid moderation reason", "is-error");
      return null;
    }
    return reason;
  }

  function currentSubmissionFilters() {
    return {
      q: document.getElementById("submissions-q").value.trim(),
      communitySlug: document.getElementById("submissions-community").value.trim(),
      status: document.getElementById("submissions-status").value,
    };
  }

  function currentDiscussionFilters() {
    return {
      q: document.getElementById("discussions-q").value.trim(),
      communitySlug: document.getElementById("discussions-community").value.trim(),
      hiddenOnly: document.getElementById("discussions-hidden").value,
    };
  }

  function actionButtons(actions, idAttr, id) {
    return (actions || [])
      .map(function (action) {
        var danger =
          action === "hide" || action === "reject" ? " danger" : "";
        return (
          '<button type="button" class="row-action' +
          danger +
          '" data-action="' +
          escapeHtml(action) +
          '" ' +
          idAttr +
          '="' +
          escapeHtml(id) +
          '">' +
          escapeHtml(action) +
          "</button>"
        );
      })
      .join("");
  }

  async function loadModeration(filters) {
    setStatus(consoleStatus, "Loading moderation…");
    var submissionFilters = (filters && filters.submissions) || currentSubmissionFilters();
    var discussionFilters = (filters && filters.discussions) || currentDiscussionFilters();

    var submissionQuery = new URLSearchParams({ limit: "50" });
    if (submissionFilters.q) submissionQuery.set("q", submissionFilters.q);
    if (submissionFilters.communitySlug) {
      submissionQuery.set("communitySlug", submissionFilters.communitySlug);
    }
    if (submissionFilters.status) {
      submissionQuery.set("status", submissionFilters.status);
    }

    var discussionQuery = new URLSearchParams({ limit: "50" });
    if (discussionFilters.q) discussionQuery.set("q", discussionFilters.q);
    if (discussionFilters.communitySlug) {
      discussionQuery.set("communitySlug", discussionFilters.communitySlug);
    }
    if (discussionFilters.hiddenOnly === "true") {
      discussionQuery.set("hiddenOnly", "true");
    }

    var signals = await getJson("/v1/platform/signals?limit=50");
    var submissions = await getJson(
      "/v1/platform/submissions?" + submissionQuery.toString()
    );
    var discussions = await getJson(
      "/v1/platform/discussions?" + discussionQuery.toString()
    );
    if (
      signals.response.status !== 200 ||
      submissions.response.status !== 200 ||
      discussions.response.status !== 200
    ) {
      throw new Error("Unable to load moderation inventories");
    }

    var signalsList = document.getElementById("signals-list");
    var signalRows = signals.payload.data.signals || [];
    signalsList.innerHTML = signalRows.length
      ? signalRows
          .map(function (row) {
            var action = row.hidden
              ? '<button type="button" class="row-action" data-action="unhide" data-id="' +
                escapeHtml(row.id) +
                '">Unhide</button>'
              : '<button type="button" class="row-action danger" data-action="hide" data-id="' +
                escapeHtml(row.id) +
                '">Hide</button>';
            return (
              '<div class="row"><div><h4>' +
              escapeHtml(row.headline) +
              "</h4><p>" +
              escapeHtml(row.communitySlug) +
              " · " +
              (row.hidden ? "hidden" : "visible") +
              (row.hiddenReason ? " · " + escapeHtml(row.hiddenReason) : "") +
              '</p></div><div class="row-actions">' +
              action +
              "</div></div>"
            );
          })
          .join("")
      : emptyState("No signals.");

    signalsList.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", async function () {
        var id = button.getAttribute("data-id");
        var action = button.getAttribute("data-action");
        var result;
        if (action === "hide") {
          var reason = promptReason("spam");
          if (!reason) return;
          if (!window.confirm("Hide this signal for reason: " + reason + "?")) {
            return;
          }
          setStatus(consoleStatus, "Hiding signal…");
          result = await postJson(
            "/v1/platform/signals/" + encodeURIComponent(id) + "/hide",
            { reason: reason }
          );
        } else {
          if (!window.confirm("Unhide this signal?")) return;
          setStatus(consoleStatus, "Unhiding signal…");
          result = await postJson(
            "/v1/platform/signals/" + encodeURIComponent(id) + "/unhide",
            {}
          );
        }
        if (!result || result.response.status !== 200) {
          setStatus(consoleStatus, "Signal action failed", "is-error");
          return;
        }
        setStatus(consoleStatus, "Signal updated", "is-ok");
        await loadModeration();
      });
    });

    var submissionsList = document.getElementById("submissions-list");
    var submissionRows = submissions.payload.data.submissions || [];
    submissionsList.innerHTML = submissionRows.length
      ? submissionRows
          .map(function (row) {
            return (
              '<div class="row"><div><h4>' +
              escapeHtml(row.headline) +
              "</h4><p>" +
              escapeHtml(row.communitySlug) +
              " · " +
              escapeHtml(row.status) +
              (row.reviewReason ? " · " + escapeHtml(row.reviewReason) : "") +
              " · " +
              escapeHtml(row.accountId) +
              '</p></div><div class="row-actions">' +
              '<button type="button" class="row-action secondary" data-action="inspect" data-id="' +
              escapeHtml(row.id) +
              '">Inspect</button>' +
              actionButtons(row.allowedActions, "data-id", row.id) +
              "</div></div>"
            );
          })
          .join("")
      : emptyState("No submissions match these filters.");

    submissionsList.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", async function () {
        var id = button.getAttribute("data-id");
        var action = button.getAttribute("data-action");
        if (action === "inspect") {
          setStatus(consoleStatus, "Loading submission…");
          var detail = await getJson(
            "/v1/platform/submissions/" + encodeURIComponent(id)
          );
          if (detail.response.status !== 200) {
            setStatus(consoleStatus, "Submission detail failed", "is-error");
            return;
          }
          document.getElementById("submission-detail").textContent = JSON.stringify(
            detail.payload.data,
            null,
            2
          );
          setStatus(consoleStatus, "Submission loaded", "is-ok");
          return;
        }
        var reason = promptReason(action === "reject" ? "spam" : "other");
        if (!reason) return;
        if (
          !window.confirm(
            action === "reject"
              ? "Reject this submission for reason: " + reason + "?"
              : "Restore this submission to pending_review? Reason for audit: " +
                  reason
          )
        ) {
          return;
        }
        setStatus(
          consoleStatus,
          action === "reject" ? "Rejecting submission…" : "Restoring submission…"
        );
        var result = await postJson(
          "/v1/platform/submissions/" +
            encodeURIComponent(id) +
            "/" +
            encodeURIComponent(action),
          { reason: reason }
        );
        if (!result || result.response.status !== 200) {
          setStatus(consoleStatus, "Submission action failed", "is-error");
          return;
        }
        document.getElementById("submission-detail").textContent = JSON.stringify(
          result.payload.data,
          null,
          2
        );
        setStatus(
          consoleStatus,
          result.payload.data.changed
            ? action === "reject"
              ? "Submission rejected"
              : "Submission restored"
            : "Submission already in target state",
          "is-ok"
        );
        await loadModeration({
          submissions: currentSubmissionFilters(),
          discussions: currentDiscussionFilters(),
        });
      });
    });

    var discussionsList = document.getElementById("discussions-list");
    var discussionRows = discussions.payload.data.contributions || [];
    discussionsList.innerHTML = discussionRows.length
      ? discussionRows
          .map(function (row) {
            return (
              '<div class="row"><div><h4>' +
              escapeHtml(row.intent) +
              " · " +
              escapeHtml(row.signalSlug) +
              "</h4><p>" +
              escapeHtml(row.body) +
              "<br />" +
              escapeHtml(row.communitySlug) +
              " · " +
              (row.hidden ? "hidden" : "visible") +
              (row.hiddenReason ? " · " + escapeHtml(row.hiddenReason) : "") +
              " · " +
              escapeHtml(row.accountId) +
              '</p></div><div class="row-actions">' +
              '<button type="button" class="row-action secondary" data-action="inspect" data-id="' +
              escapeHtml(row.contributionId) +
              '">Inspect</button>' +
              actionButtons(row.allowedActions, "data-id", row.contributionId) +
              "</div></div>"
            );
          })
          .join("")
      : emptyState("No discussion contributions match these filters.");

    discussionsList.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", async function () {
        var id = button.getAttribute("data-id");
        var action = button.getAttribute("data-action");
        var row = discussionRows.find(function (item) {
          return item.contributionId === id;
        });
        if (action === "inspect") {
          document.getElementById("discussion-detail").textContent = JSON.stringify(
            row || { contributionId: id },
            null,
            2
          );
          setStatus(consoleStatus, "Contribution loaded", "is-ok");
          return;
        }
        var reason = promptReason(action === "hide" ? "spam" : "other");
        if (!reason) return;
        if (
          !window.confirm(
            action === "hide"
              ? "Hide this contribution for reason: " + reason + "?"
              : "Unhide this contribution? Reason for audit: " + reason
          )
        ) {
          return;
        }
        setStatus(
          consoleStatus,
          action === "hide" ? "Hiding contribution…" : "Unhiding contribution…"
        );
        var result = await postJson(
          "/v1/platform/discussions/" +
            encodeURIComponent(id) +
            "/" +
            encodeURIComponent(action),
          { reason: reason }
        );
        if (!result || result.response.status !== 200) {
          setStatus(consoleStatus, "Discussion action failed", "is-error");
          return;
        }
        document.getElementById("discussion-detail").textContent = JSON.stringify(
          result.payload.data,
          null,
          2
        );
        setStatus(
          consoleStatus,
          result.payload.data.changed
            ? action === "hide"
              ? "Contribution hidden"
              : "Contribution unhidden"
            : "Contribution already in target state",
          "is-ok"
        );
        await loadModeration({
          submissions: currentSubmissionFilters(),
          discussions: currentDiscussionFilters(),
        });
      });
    });

    setStatus(consoleStatus, "Moderation inventory ready", "is-ok");
  }

  async function loadInvestigation(accountId) {
    var emails = await getJson(
      "/v1/platform/accounts/" + encodeURIComponent(accountId) + "/emails"
    );
    var payments = await getJson(
      "/v1/platform/accounts/" + encodeURIComponent(accountId) + "/payments"
    );
    if (emails.response.status !== 200 || payments.response.status !== 200) {
      setStatus(consoleStatus, "Investigation failed", "is-error");
      return;
    }
    document.getElementById("investigate-emails").textContent = JSON.stringify(
      emails.payload.data,
      null,
      2
    );
    document.getElementById("investigate-payments").textContent = JSON.stringify(
      payments.payload.data,
      null,
      2
    );
    setStatus(consoleStatus, "Investigation loaded", "is-ok");
  }

  async function loadAudit() {
    var result = await getJson("/v1/platform/audit?limit=50");
    if (result.response.status !== 200) {
      throw new Error("Unable to load audit history");
    }
    var events = result.payload.data.events || [];
    document.getElementById("audit-list").innerHTML = events.length
      ? events
          .map(function (event) {
            return (
              '<div class="row"><div><h4>' +
              escapeHtml(event.action) +
              "</h4><p>" +
              escapeHtml(event.occurredAt) +
              " · operator " +
              escapeHtml(event.operatorAccountId) +
              (event.targetAccountId
                ? " · target " + escapeHtml(event.targetAccountId)
                : "") +
              (event.targetSignalId
                ? " · signal " + escapeHtml(event.targetSignalId)
                : "") +
              "</p></div></div>"
            );
          })
          .join("")
      : emptyState("No audit events yet.");
  }

  async function loadOperators() {
    var result = await getJson("/v1/platform/operators");
    if (result.response.status === 404) {
      document.getElementById("operators-list").innerHTML = emptyState(
        "Operator role management requires role_admin."
      );
      return;
    }
    if (result.response.status !== 200) {
      throw new Error("Unable to load operators");
    }
    var operators = result.payload.data.operators || [];
    var list = document.getElementById("operators-list");
    list.innerHTML = operators
      .map(function (row) {
        var revoke =
          row.accountId === session.accountId
            ? ""
            : '<button type="button" class="row-action danger" data-action="revoke" data-id="' +
              escapeHtml(row.accountId) +
              '">Revoke</button>';
        return (
          '<div class="row"><div><h4>' +
          escapeHtml(row.role) +
          "</h4><p>" +
          escapeHtml(row.accountId) +
          " · granted " +
          escapeHtml(row.grantedAt) +
          '</p></div><div class="row-actions">' +
          revoke +
          "</div></div>"
        );
      })
      .join("");
    list.querySelectorAll('[data-action="revoke"]').forEach(function (button) {
      button.addEventListener("click", async function () {
        var id = button.getAttribute("data-id");
        var revoke = await postJson(
          "/v1/platform/operators/" + encodeURIComponent(id) + "/revoke",
          {}
        );
        if (revoke.response.status !== 200) {
          setStatus(consoleStatus, "Revoke failed", "is-error");
          return;
        }
        setStatus(consoleStatus, "Operator revoked", "is-ok");
        await loadOperators();
      });
    });
  }

  document.getElementById("accounts-search").addEventListener("submit", function (event) {
    event.preventDefault();
    loadAccounts({
      q: document.getElementById("accounts-q").value.trim(),
      status: document.getElementById("accounts-status").value,
    });
  });

  document
    .getElementById("submissions-search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loadModeration({
        submissions: currentSubmissionFilters(),
        discussions: currentDiscussionFilters(),
      });
    });

  document
    .getElementById("discussions-search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loadModeration({
        submissions: currentSubmissionFilters(),
        discussions: currentDiscussionFilters(),
      });
    });

  document
    .getElementById("memberships-search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loadMemberships(currentMembershipFilters());
    });

  document
    .getElementById("memberships-grant")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var accountId = document.getElementById("memberships-grant-account").value.trim();
      var accessUntil = toIsoFromLocalInput(
        document.getElementById("memberships-grant-until").value
      );
      var reason = document.getElementById("memberships-grant-reason").value.trim();
      if (!accountId || !accessUntil || reason.length < 3) {
        setStatus(consoleStatus, "Grant requires account, accessUntil, and reason", "is-error");
        return;
      }
      if (
        !window.confirm(
          "Grant an administrative membership to " + accountId + " until " + accessUntil + "?"
        )
      ) {
        return;
      }
      setStatus(consoleStatus, "Granting membership…");
      var grant = await postJson("/v1/platform/memberships/grant", {
        accountId: accountId,
        accessUntil: accessUntil,
        reason: reason,
        idempotencyKey: newIdempotencyKey(),
      });
      if (grant.response.status !== 200) {
        var grantCode =
          grant.payload && grant.payload.error && grant.payload.error.code
            ? grant.payload.error.code
            : "request_failed";
        setStatus(consoleStatus, "Grant failed (" + grantCode + ")", "is-error");
        return;
      }
      setStatus(
        consoleStatus,
        grant.payload.data.changed ? "Membership granted" : "Grant already applied",
        "is-ok"
      );
      document.getElementById("memberships-grant").reset();
      await loadMemberships(currentMembershipFilters());
    });

  document
    .getElementById("investigate-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loadInvestigation(document.getElementById("investigate-account-id").value.trim());
    });

  document.getElementById("operator-grant").addEventListener("submit", async function (event) {
    event.preventDefault();
    var accountId = document.getElementById("operator-account-id").value.trim();
    var role = document.getElementById("operator-grant-role").value;
    var result = await postJson("/v1/platform/operators", {
      accountId: accountId,
      role: role,
    });
    if (result.response.status !== 200) {
      setStatus(consoleStatus, "Grant failed (role_admin required)", "is-error");
      return;
    }
    setStatus(consoleStatus, "Operator granted", "is-ok");
    await loadOperators();
  });

  if (signInForm) {
    signInForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = emailInput ? emailInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value : "";
      if (!email || !password) {
        showGate("Email and password are required.", "is-error");
        return;
      }
      startPlatformPasswordSignIn(email, password);
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", function () {
      signOutPlatform();
    });
  }

  retrySession.addEventListener("click", function () {
    bootstrap();
  });

  bindNav();
  bootstrap();
})();
