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
    Italy: [{ id: "Milano", slug: "milano-it" }],
    Germany: [{ id: "Munich", slug: "munich-de" }],
    Romania: [
      { id: "Arad", slug: "arad-ro" },
      { id: "ClujNapoca", slug: "cluj-napoca-ro" },
      { id: "Sibiu", slug: "sibiu-ro" },
      { id: "Iasi", slug: "iasi-ro" },
      { id: "Timisoara", slug: "timisoara-ro" },
    ],
  };

  const COUNTRY_BY_CITY_ID = {};
  const SLUG_BY_CITY_ID = {};
  for (const country of Object.keys(CITY_BY_COUNTRY)) {
    for (const city of CITY_BY_COUNTRY[country]) {
      COUNTRY_BY_CITY_ID[city.id] = country;
      SLUG_BY_CITY_ID[city.id] = city.slug;
    }
  }

  function citiesForCountry(country) {
    const entries = CITY_BY_COUNTRY[country];
    return entries ? entries.slice() : [];
  }

  function slugForCityId(cityId) {
    return SLUG_BY_CITY_ID[cityId] || null;
  }

  function countryForCityId(cityId) {
    return COUNTRY_BY_CITY_ID[cityId] || null;
  }

  function canSelectCity(country) {
    return (
      typeof country === "string" &&
      country !== "" &&
      Array.isArray(CITY_BY_COUNTRY[country]) &&
      CITY_BY_COUNTRY[country].length > 0
    );
  }

  function isCityValidForCountry(country, cityId) {
    if (!canSelectCity(country) || !cityId) return false;
    return CITY_BY_COUNTRY[country].some((city) => city.id === cityId);
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
