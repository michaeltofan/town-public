/**
 * Host-aware API base for the public site and /platform/ console.
 *
 * - towncivic.org / www → production API
 * - staging Railway host + localhost → staging API
 *
 * Fail-closed: each page host may only call its resolved API base.
 */
(function (global) {
  "use strict";

  var STAGING_API_BASE = "https://api-staging.towncivic.org";
  var PRODUCTION_API_BASE = "https://api.towncivic.org";
  /** Default for production page hosts. */
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

  function isProductionPageHost(hostname) {
    var host = normalizeHost(hostname);
    return host === "towncivic.org" || host === "www.towncivic.org";
  }

  function isStagingPageHost(hostname) {
    var host = normalizeHost(hostname);
    if (!host) return false;
    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.indexOf("town-public-staging") === 0) return true;
    if (host.indexOf(".up.railway.app") !== -1 && host.indexOf("staging") !== -1) {
      return true;
    }
    return false;
  }

  function resolveApiBase(hostname) {
    if (isProductionPageHost(hostname)) return PRODUCTION_API_BASE;
    if (isStagingPageHost(hostname)) return STAGING_API_BASE;
    // Unknown hosts stay on production default only if not staging-like.
    return ACTIVE_API_BASE;
  }

  /** Fail-closed: only the API base resolved for this page host is allowed. */
  function allowApiBaseForHost(hostname, apiBase) {
    return !!apiBase && sameApiBase(apiBase, resolveApiBase(hostname));
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
    isProductionPageHost: isProductionPageHost,
    isStagingPageHost: isStagingPageHost,
    allowApiBaseForHost: allowApiBaseForHost,
    resolveApiBase: resolveApiBase,
    resolveApiBaseSafe: resolveApiBaseSafe,
  };
})(typeof window !== "undefined" ? window : globalThis);
