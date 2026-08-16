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
    // Pilot Madrid (M9): madrid.towncivic.org is a production pilot host,
    // not yet live -- inert until that domain exists.
    return (
      host === "towncivic.org" ||
      host === "www.towncivic.org" ||
      host === "madrid.towncivic.org"
    );
  }

  function isStagingPageHost(hostname) {
    var host = normalizeHost(hostname);
    if (!host) return false;
    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.indexOf("town-public-staging") === 0) return true;
    if (host.indexOf(".up.railway.app") !== -1 && host.indexOf("staging") !== -1) {
      return true;
    }
    // Pilot Madrid (M2/M8): madrid-staging.towncivic.org must resolve to the
    // staging API, same as any other staging page host -- without this, it
    // fell through to the production default and every fetch was rejected
    // by production's single-origin CORS lock (found via manual QA, M8).
    if (host === "madrid-staging.towncivic.org") return true;
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
