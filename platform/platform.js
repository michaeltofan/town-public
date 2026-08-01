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
  var signInButton = document.getElementById("platform-sign-in");
  var signOutButton = document.getElementById("platform-sign-out");

  var session = null;
  var anonymousClientKey = null;
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

  function getAnonymousClientKey() {
    if (anonymousClientKey) return anonymousClientKey;
    var bytes = new Uint8Array(24);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < bytes.length; i += 1) {
        bytes[i] = (Math.random() * 256) | 0;
      }
    }
    var binary = "";
    for (var j = 0; j < bytes.length; j += 1) {
      binary += String.fromCharCode(bytes[j]);
    }
    anonymousClientKey = btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
    return anonymousClientKey;
  }

  function setSignInBusy(busy) {
    signInSubmitting = !!busy;
    if (signInButton) signInButton.disabled = signInSubmitting;
    if (retrySession) retrySession.disabled = signInSubmitting;
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
    // Pass kind explicitly (including null) when provided; default message → error.
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

  async function requestPasskeyAuthenticationOptions() {
    var result = await postJson("/v1/authentication/passkeys/options", {
      clientType: "web",
      anonymousClientKey: getAnonymousClientKey(),
    });
    var data = result.payload && result.payload.data;
    if (
      result.response.status === 200 &&
      data &&
      data.authenticationCeremonyId &&
      data.options
    ) {
      return {
        authenticationCeremonyId: data.authenticationCeremonyId,
        options: data.options,
      };
    }
    throw new Error("Unable to start passkey Sign-in");
  }

  async function verifyPasskeyAuthentication(authenticationCeremonyId, assertion) {
    var result = await postJson("/v1/authentication/passkeys/verify", {
      authenticationCeremonyId: authenticationCeremonyId,
      clientType: "web",
      response: assertion,
    });
    var data = result.payload && result.payload.data;
    if (result.response.status === 200 && data && data.status === "AUTHENTICATED") {
      return data;
    }
    throw new Error("Passkey verification failed");
  }

  async function fetchAuthenticationSession() {
    var result = await getJson("/v1/authentication/session");
    var data = result.payload && result.payload.data;
    if (result.response.status === 200 && data && data.authenticated === true) {
      return data;
    }
    throw new Error("Authenticated session was not established");
  }

  function isPasskeyCeremonyCancelled(err) {
    var name = err && err.name;
    var causeName = err && err.cause && err.cause.name;
    return (
      name === "NotAllowedError" ||
      name === "AbortError" ||
      causeName === "NotAllowedError" ||
      causeName === "AbortError" ||
      (err &&
        err.code === "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY" &&
        causeName === "NotAllowedError")
    );
  }

  function runPasskeyAuthenticationCeremony() {
    var swaBrowser = window["Simple" + "Web" + "Authn" + "Browser"];
    var startAuthentication = swaBrowser && swaBrowser.startAuthentication;
    if (typeof startAuthentication !== "function") {
      return Promise.reject(new Error("Passkey support is unavailable in this browser"));
    }
    return requestPasskeyAuthenticationOptions()
      .then(function (ceremony) {
        return startAuthentication({ optionsJSON: ceremony.options }).then(
          function (assertion) {
            return verifyPasskeyAuthentication(
              ceremony.authenticationCeremonyId,
              assertion
            );
          }
        );
      })
      .then(function () {
        return fetchAuthenticationSession();
      });
  }

  async function enterConsoleFromSession() {
    showConsole();
    setStatus(consoleStatus, "Signed in as platform operator.", "is-ok");
    await loadSection("status");
  }

  async function bootstrap(options) {
    var opts = options || {};
    if (!opts.quiet) {
      setStatus(gateStatus, "Checking operator session…");
    }
    var result = await loadOperatorSession();
    if (result.ok) {
      await enterConsoleFromSession();
      return true;
    }
    showGate(
      "Sign in with an authorized platform operator account.",
      null
    );
    return false;
  }

  async function startPlatformPasskeySignIn() {
    if (signInSubmitting) return;
    setSignInBusy(true);
    setStatus(gateStatus, "Waiting for passkey…");
    try {
      await runPasskeyAuthenticationCeremony();
      var operator = await loadOperatorSession();
      if (operator.ok) {
        await enterConsoleFromSession();
        return;
      }
      // Authenticated account without platform_operators grant stays gated.
      showGate(
        "Signed in, but this account is not authorized for platform access.",
        "is-error"
      );
    } catch (err) {
      if (isPasskeyCeremonyCancelled(err)) {
        showGate("Passkey Sign-in was cancelled.", "is-error");
      } else {
        showGate(
          (err && err.message) || "Passkey Sign-in failed. Try again.",
          "is-error"
        );
      }
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

  async function loadStatus() {
    var result = await getJson("/v1/platform/status");
    if (result.response.status !== 200) {
      throw new Error("Unable to load platform status");
    }
    var data = result.payload.data;
    var health = data.health;
    var counts = data.counts;
    var html = "";
    html +=
      '<div class="stat"><span>Ready</span><strong>' +
      escapeHtml(health.ready) +
      "</strong></div>";
    html +=
      '<div class="stat"><span>Database</span><strong>' +
      escapeHtml(health.checks.database) +
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
    setStatus(
      consoleStatus,
      "Build " + health.build.commitSha.slice(0, 8) + " · " + health.build.environment,
      "is-ok"
    );
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

  async function loadMemberships() {
    var result = await getJson("/v1/platform/memberships?limit=50");
    if (result.response.status !== 200) {
      throw new Error("Unable to load memberships");
    }
    var memberships = result.payload.data.memberships || [];
    document.getElementById("memberships-list").innerHTML = memberships.length
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
              "</p></div></div>"
            );
          })
          .join("")
      : emptyState("No memberships found.");
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

  async function loadModeration() {
    var signals = await getJson("/v1/platform/signals?limit=50");
    var submissions = await getJson("/v1/platform/submissions");
    var discussions = await getJson("/v1/platform/discussions");
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
          var reason = window.prompt(
            "Hide reason (immoral|abusive|spam|off_topic|illegal|other)",
            "spam"
          );
          if (!reason) return;
          result = await postJson(
            "/v1/platform/signals/" + encodeURIComponent(id) + "/hide",
            { reason: reason }
          );
        } else {
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

    document.getElementById("submissions-list").innerHTML = (
      submissions.payload.data.submissions || []
    )
      .map(function (row) {
        return (
          '<div class="row"><div><h4>' +
          escapeHtml(row.headline) +
          "</h4><p>" +
          escapeHtml(row.communitySlug) +
          " · " +
          escapeHtml(row.status) +
          " · " +
          escapeHtml(row.accountId) +
          "</p></div></div>"
        );
      })
      .join("") || emptyState("No pending submissions.");

    document.getElementById("discussions-list").innerHTML = (
      discussions.payload.data.contributions || []
    )
      .map(function (row) {
        return (
          '<div class="row"><div><h4>' +
          escapeHtml(row.intent) +
          " · " +
          escapeHtml(row.signalSlug) +
          "</h4><p>" +
          escapeHtml(row.body) +
          "<br />" +
          escapeHtml(row.accountId) +
          "</p></div></div>"
        );
      })
      .join("") || emptyState("No recent discussion contributions.");
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

  if (signInButton) {
    signInButton.addEventListener("click", function () {
      startPlatformPasskeySignIn();
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
