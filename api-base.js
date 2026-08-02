/**
 * Shared API host resolution for the public site and /platform/ console.
 * Production pages (towncivic.org) must never call the staging API.
 */
(function (global) {
  "use strict";

  var PRODUCTION_API_BASE = "https://api.towncivic.org";
  var STAGING_API_BASE = "https://api-staging.towncivic.org";

  function normalizeHost(hostname) {
    return String(hostname || "")
      .toLowerCase()
      .replace(/\.$/, "");
  }

  function isProductionHost(hostname) {
    var host = normalizeHost(hostname);
    return host === "towncivic.org" || host === "www.towncivic.org";
  }

  function apiHostname(apiBase) {
    var base = String(apiBase || "").trim();
    if (!base) return "";
    var match = base.match(/^https?:\/\/([^/?#]+)/i);
    if (!match) return "";
    return normalizeHost(match[1]);
  }

  function isStagingApiBase(apiBase) {
    return apiHostname(apiBase) === "api-staging.towncivic.org";
  }

  function isProductionApiBase(apiBase) {
    return apiHostname(apiBase) === "api.towncivic.org";
  }

  function resolveApiBase(hostname) {
    if (isProductionHost(hostname)) {
      return PRODUCTION_API_BASE;
    }
    return STAGING_API_BASE;
  }

  /** Fail-closed policy: production pages may only call the production API. */
  function allowApiBaseForHost(hostname, apiBase) {
    if (!apiBase) return false;
    if (isProductionHost(hostname)) {
      return isProductionApiBase(apiBase) && !isStagingApiBase(apiBase);
    }
    return true;
  }

  /**
   * Fail-closed resolver. Production hosts refuse anything other than the
   * production API base (including a missing/blank base).
   */
  function resolveApiBaseSafe(hostname) {
    var apiBase = resolveApiBase(hostname);
    if (!allowApiBaseForHost(hostname, apiBase)) {
      return {
        ok: false,
        apiBase: null,
        error: isProductionHost(hostname)
          ? "Misconfigured API base: production host refused non-production API."
          : "Misconfigured API base: empty API URL.",
      };
    }
    return { ok: true, apiBase: apiBase, error: null };
  }

  global.TownApiBase = {
    PRODUCTION_API_BASE: PRODUCTION_API_BASE,
    STAGING_API_BASE: STAGING_API_BASE,
    isProductionHost: isProductionHost,
    isStagingApiBase: isStagingApiBase,
    isProductionApiBase: isProductionApiBase,
    allowApiBaseForHost: allowApiBaseForHost,
    resolveApiBase: resolveApiBase,
    resolveApiBaseSafe: resolveApiBaseSafe,
  };
})(typeof window !== "undefined" ? window : globalThis);
