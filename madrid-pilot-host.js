/**
 * TOWN Madrid pilot host detection.
 * Pure hostname -> pilot city resolution. No API calls, no state.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownMadridPilotHost = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  /** Canonical city id, matching TownCommunityCommitment.CITY_BY_ID. */
  const MADRID_PILOT_CITY_ID = "Madrid";

  const MADRID_PILOT_HOSTNAMES = {
    "madrid-staging.towncivic.org": true,
    "madrid.towncivic.org": true,
  };

  function normalizeHost(hostname) {
    return String(hostname || "")
      .toLowerCase()
      .replace(/\.$/, "");
  }

  /**
   * Returns the locked pilot city id for this hostname, or null when the
   * hostname is not a Madrid pilot host (including towncivic.org itself).
   */
  function resolvePilotCityId(hostname) {
    const host = normalizeHost(hostname);
    return host && MADRID_PILOT_HOSTNAMES[host] ? MADRID_PILOT_CITY_ID : null;
  }

  function isMadridPilotHost(hostname) {
    return resolvePilotCityId(hostname) !== null;
  }

  return {
    MADRID_PILOT_CITY_ID: MADRID_PILOT_CITY_ID,
    resolvePilotCityId: resolvePilotCityId,
    isMadridPilotHost: isMadridPilotHost,
  };
});
