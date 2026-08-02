/**
 * Single active API for the public site and /platform/ console.
 *
 * Production API is live. Every page host uses it.
 * Rollback emergency: set ACTIVE_API_BASE back to STAGING_API_BASE and
 * temporarily set ALLOW_PRODUCTION_WEB_ORIGIN=true on staging.
 */
(function (global) {
  "use strict";

  var STAGING_API_BASE = "https://api-staging.towncivic.org";
  var PRODUCTION_API_BASE = "https://api.towncivic.org";
  var ACTIVE_API_BASE = PRODUCTION_API_BASE;

  function normalizeHost(hostname) {
    return String(hostname || "")
      .toLowerCase()
      .replace(/\.$/, "");
  }

  function apiHostname(apiBase) {
    var base = String(apiBase || "").trim();
    if (!base) return "";
    var match = base.match(/^https?:\/\/([^/?#]+)/i);
    if (!match) return "";
    return normalizeHost(match[1]);
  }

  function sameApiBase(left, right) {
    return apiHostname(left) !== "" && apiHostname(left) === apiHostname(right);
  }

  function isStagingApiBase(apiBase) {
    return apiHostname(apiBase) === "api-staging.towncivic.org";
  }

  function isProductionApiBase(apiBase) {
    return apiHostname(apiBase) === "api.towncivic.org";
  }

  function resolveApiBase(_hostname) {
    return ACTIVE_API_BASE;
  }

  /** Fail-closed: only the single active API base is allowed. */
  function allowApiBaseForHost(_hostname, apiBase) {
    return !!apiBase && sameApiBase(apiBase, ACTIVE_API_BASE);
  }

  function resolveApiBaseSafe(hostname) {
    var apiBase = resolveApiBase(hostname);
    if (!allowApiBaseForHost(hostname, apiBase)) {
      return {
        ok: false,
        apiBase: null,
        error: "Misconfigured API base.",
      };
    }
    return { ok: true, apiBase: apiBase, error: null };
  }

  global.TownApiBase = {
    STAGING_API_BASE: STAGING_API_BASE,
    PRODUCTION_API_BASE: PRODUCTION_API_BASE,
    ACTIVE_API_BASE: ACTIVE_API_BASE,
    isStagingApiBase: isStagingApiBase,
    isProductionApiBase: isProductionApiBase,
    allowApiBaseForHost: allowApiBaseForHost,
    resolveApiBase: resolveApiBase,
    resolveApiBaseSafe: resolveApiBaseSafe,
  };
})(typeof window !== "undefined" ? window : globalThis);
