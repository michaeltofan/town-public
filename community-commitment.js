/**
 * TOWN community commitment helpers — pre-Checkout country/city choice and
 * personal responsibility declaration. Browser state never authorizes commitment.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownCommunityCommitment = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CITY_BY_COUNTRY = {
    Italy: { id: "Milano", slug: "milano-it" },
    Germany: { id: "Munich", slug: "munich-de" },
    Romania: { id: "Arad", slug: "arad-ro" },
  };

  const COUNTRY_BY_CITY_ID = {
    Milano: "Italy",
    Munich: "Germany",
    Arad: "Romania",
  };

  const SLUG_BY_CITY_ID = {
    Milano: "milano-it",
    Munich: "munich-de",
    Arad: "arad-ro",
  };

  function citiesForCountry(country) {
    const entry = CITY_BY_COUNTRY[country];
    return entry ? [entry] : [];
  }

  function slugForCityId(cityId) {
    return SLUG_BY_CITY_ID[cityId] || null;
  }

  function countryForCityId(cityId) {
    return COUNTRY_BY_CITY_ID[cityId] || null;
  }

  function canSelectCity(country) {
    return typeof country === "string" && country !== "" && !!CITY_BY_COUNTRY[country];
  }

  function isCityValidForCountry(country, cityId) {
    if (!canSelectCity(country) || !cityId) return false;
    return CITY_BY_COUNTRY[country].id === cityId;
  }

  /** City selection alone never counts as acceptance. */
  function citySelectionCountsAsAcceptance() {
    return false;
  }

  function deriveCommitmentSnapshot(payload) {
    if (!payload || typeof payload !== "object") return null;
    const data = payload.data;
    if (!data || typeof data !== "object") return null;
    if (data.status !== "none" && data.status !== "recorded") return null;
    if (typeof data.accepted !== "boolean") return null;
    return {
      status: data.status,
      accepted: data.accepted === true,
      acceptedAt: data.acceptedAt == null ? null : data.acceptedAt,
      commitmentVersion:
        data.commitmentVersion == null ? null : data.commitmentVersion,
      editable: data.editable === true,
      community: data.community && typeof data.community === "object"
        ? {
            slug: data.community.slug,
            displayName: data.community.displayName,
            cityName: data.community.cityName,
            countryCode: data.community.countryCode,
          }
        : null,
    };
  }

  function hasRecordedCommitment(snapshot) {
    return !!(
      snapshot &&
      snapshot.status === "recorded" &&
      snapshot.accepted === true &&
      snapshot.community &&
      typeof snapshot.community.slug === "string"
    );
  }

  /** Browser/local simulated state cannot manufacture acceptance. */
  function localStateGrantsCommitment(_marker) {
    return false;
  }

  function shouldInvalidateAcceptance(prevCountry, prevCity, nextCountry, nextCity) {
    return prevCountry !== nextCountry || prevCity !== nextCity;
  }

  function checkoutAvailable(snapshot) {
    return hasRecordedCommitment(snapshot);
  }

  function cityIdFromCommitment(snapshot) {
    if (!hasRecordedCommitment(snapshot)) return null;
    const slug = snapshot.community.slug;
    for (const cityId of Object.keys(SLUG_BY_CITY_ID)) {
      if (SLUG_BY_CITY_ID[cityId] === slug) return cityId;
    }
    return null;
  }

  function countryFromCommitment(snapshot) {
    const cityId = cityIdFromCommitment(snapshot);
    return cityId ? countryForCityId(cityId) : null;
  }

  return {
    CITY_BY_COUNTRY: CITY_BY_COUNTRY,
    citiesForCountry: citiesForCountry,
    slugForCityId: slugForCityId,
    countryForCityId: countryForCityId,
    canSelectCity: canSelectCity,
    isCityValidForCountry: isCityValidForCountry,
    citySelectionCountsAsAcceptance: citySelectionCountsAsAcceptance,
    deriveCommitmentSnapshot: deriveCommitmentSnapshot,
    hasRecordedCommitment: hasRecordedCommitment,
    localStateGrantsCommitment: localStateGrantsCommitment,
    shouldInvalidateAcceptance: shouldInvalidateAcceptance,
    checkoutAvailable: checkoutAvailable,
    cityIdFromCommitment: cityIdFromCommitment,
    countryFromCommitment: countryFromCommitment,
  };
});
