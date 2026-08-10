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

  const COUNTRY_META = {
    Italy: { countryCode: "IT", flag: "assets/flags/italy.png" },
    Germany: { countryCode: "DE", flag: "assets/flags/germany.png" },
    Romania: { countryCode: "RO", flag: "assets/flags/romania.png" },
    Austria: { countryCode: "AT", flag: "assets/flags/austria.svg" },
    France: { countryCode: "FR", flag: "assets/flags/france.svg" },
    Hungary: { countryCode: "HU", flag: "assets/flags/hungary.svg" },
    Spain: { countryCode: "ES", flag: "assets/flags/spain.svg" },
  };

  // Canonical public community catalog. Feed identity, both country pickers,
  // commitment payloads and API slugs must all derive from this registry.
  const CITY_BY_COUNTRY = {
    Italy: [
      { id: "Milano", slug: "milano-it", language: "it", image: "assets/cities/milano.png" },
    ],
    Germany: [
      { id: "Munich", slug: "munich-de", language: "de", image: "assets/cities/munich.png" },
      { id: "Koln", slug: "koln-de", language: "de", image: "assets/cities/koln.svg" },
      { id: "Dortmund", slug: "dortmund-de", language: "de", image: "assets/cities/dortmund.svg" },
      { id: "Stuttgart", slug: "stuttgart-de", language: "de", image: "assets/cities/stuttgart.svg" },
      { id: "Frankfurt", slug: "frankfurt-de", language: "de", image: "assets/cities/frankfurt.svg" },
    ],
    Romania: [
      { id: "Arad", slug: "arad-ro", language: "ro", image: "assets/cities/arad.png" },
      { id: "ClujNapoca", slug: "cluj-napoca-ro", language: "ro", image: "assets/cities/cluj-napoca.svg" },
      { id: "Sibiu", slug: "sibiu-ro", language: "ro", image: "assets/cities/sibiu.svg" },
      { id: "Iasi", slug: "iasi-ro", language: "ro", image: "assets/cities/iasi.svg" },
      { id: "Timisoara", slug: "timisoara-ro", language: "ro", image: "assets/cities/timisoara.svg" },
    ],
    Austria: [
      { id: "Salzburg", slug: "salzburg-at", language: "de", image: "assets/cities/salzburg.svg" },
    ],
    France: [
      { id: "Marseille", slug: "marseille-fr", language: "fr", image: "assets/cities/marseille.svg" },
      { id: "Lyon", slug: "lyon-fr", language: "fr", image: "assets/cities/lyon.svg" },
      { id: "Toulouse", slug: "toulouse-fr", language: "fr", image: "assets/cities/toulouse.svg" },
    ],
    Hungary: [
      { id: "Budapest", slug: "budapest-hu", language: "hu", image: "assets/cities/budapest.svg" },
      { id: "Szeged", slug: "szeged-hu", language: "hu", image: "assets/cities/szeged.svg" },
    ],
    Spain: [
      { id: "Madrid", slug: "madrid-es", language: "es", image: "assets/cities/madrid.svg" },
      { id: "Barcelona", slug: "barcelona-es", language: "es", image: "assets/cities/barcelona.svg" },
      { id: "Valencia", slug: "valencia-es", language: "es", image: "assets/cities/valencia.svg" },
      { id: "Sevilla", slug: "sevilla-es", language: "es", image: "assets/cities/sevilla.svg" },
      { id: "Malaga", slug: "malaga-es", language: "es", image: "assets/cities/malaga.svg" },
    ],
  };

  const COUNTRY_BY_CITY_ID = {};
  const SLUG_BY_CITY_ID = {};
  const CITY_BY_ID = {};
  for (const country of Object.keys(CITY_BY_COUNTRY)) {
    for (const city of CITY_BY_COUNTRY[country]) {
      COUNTRY_BY_CITY_ID[city.id] = country;
      SLUG_BY_CITY_ID[city.id] = city.slug;
      CITY_BY_ID[city.id] = Object.assign(
        { country: country, countryCode: COUNTRY_META[country].countryCode },
        city
      );
    }
  }

  function countries() {
    return Object.keys(CITY_BY_COUNTRY);
  }

  function cityIds() {
    return Object.keys(CITY_BY_ID);
  }

  function cityForId(cityId) {
    return CITY_BY_ID[cityId] || null;
  }

  function countryMeta(country) {
    return COUNTRY_META[country] || null;
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
    COUNTRY_META: COUNTRY_META,
    CITY_BY_COUNTRY: CITY_BY_COUNTRY,
    countries: countries,
    cityIds: cityIds,
    cityForId: cityForId,
    countryMeta: countryMeta,
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
