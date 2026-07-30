/**
 * TOWN public city-discovery editorial helpers.
 * Locale resolution + story insertion only — no device location, eligibility, or API use.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownCityDiscovery = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CITY_DISCOVERY_STORY_ID = "town-city-discovery";
  const CITY_DISCOVERY_INSERT_AFTER = 5;

  const CITY_DISCOVERY_COPY = {
    en: {
      headline1: "Explore towns everywhere.",
      headline2: "What is happening in your town?",
      support: "Discover the TOWN community where you live.",
      primary: "Find my city",
      secondary: "Continue exploring",
    },
    es: {
      headline1: "Explora ciudades de todas partes.",
      headline2: "¿Qué está pasando en tu ciudad?",
      support: "Descubre la comunidad TOWN del lugar donde vives.",
      primary: "Encontrar mi ciudad",
      secondary: "Seguir explorando",
    },
    ro: {
      headline1: "Explorează orașe de pretutindeni.",
      headline2: "Ce se întâmplă în orașul tău?",
      support: "Descoperă comunitatea TOWN din locul în care trăiești.",
      primary: "Găsește orașul meu",
      secondary: "Continuă explorarea",
    },
    it: {
      headline1: "Esplora città da ogni luogo.",
      headline2: "Cosa sta succedendo nella tua città?",
      support: "Scopri la comunità TOWN del luogo in cui vivi.",
      primary: "Trova la mia città",
      secondary: "Continua a esplorare",
    },
    de: {
      headline1: "Entdecke Städte aus aller Welt.",
      headline2: "Was passiert in deiner Stadt?",
      support: "Entdecke die TOWN-Community an deinem Wohnort.",
      primary: "Meine Stadt finden",
      secondary: "Weiter entdecken",
    },
  };

  const SUPPORTED_EDITORIAL_LANGS = {
    en: true,
    es: true,
    ro: true,
    it: true,
    de: true,
  };

  /**
   * Normalize a locale tag to a lowercase language subtag.
   * Returns null when the tag cannot be parsed safely.
   */
  function normalizeLanguageTag(tag) {
    if (tag == null) return null;
    const raw = String(tag).trim();
    if (!raw) return null;
    const primary = raw.split(/[-_]/)[0];
    if (!primary) return null;
    const lang = primary.toLowerCase();
    if (!/^[a-z]{2,3}$/.test(lang)) return null;
    return lang;
  }

  /**
   * Resolve editorial copy language from browser language preferences only.
   * Never infers city, country, eligibility, or membership.
   */
  function resolveEditorialLanguage(preferredLanguages) {
    let list = preferredLanguages;
    if (list == null) list = [];
    if (typeof list === "string") list = [list];
    if (!list || typeof list.length !== "number") list = [];

    for (let i = 0; i < list.length; i++) {
      const lang = normalizeLanguageTag(list[i]);
      if (lang && SUPPORTED_EDITORIAL_LANGS[lang]) {
        return lang;
      }
    }
    return "en";
  }

  function editorialCopyForLanguage(lang) {
    const key = SUPPORTED_EDITORIAL_LANGS[lang] ? lang : "en";
    return CITY_DISCOVERY_COPY[key] || CITY_DISCOVERY_COPY.en;
  }

  function createCityDiscoveryStory(lang) {
    const resolved = resolveEditorialLanguage([lang]);
    const copy = editorialCopyForLanguage(resolved);
    return {
      id: CITY_DISCOVERY_STORY_ID,
      kind: "city-discovery",
      lang: resolved,
      copy: copy,
      image: "assets/welcome-street.png",
      focus: "50% 45%",
    };
  }

  function isCityDiscoveryStory(scene) {
    return !!(
      scene &&
      (scene.kind === "city-discovery" || scene.id === CITY_DISCOVERY_STORY_ID)
    );
  }

  /**
   * Insert the editorial story after exactly `afterCount` existing public signals.
   * Preserves remaining signal order. Idempotent if already inserted.
   */
  function insertCityDiscoveryStory(scenes, story, afterCount) {
    const source = Array.isArray(scenes) ? scenes.slice() : [];
    const insertAt =
      typeof afterCount === "number" && afterCount >= 0
        ? afterCount
        : CITY_DISCOVERY_INSERT_AFTER;
    const editorial = story || createCityDiscoveryStory("en");

    for (let i = 0; i < source.length; i++) {
      if (isCityDiscoveryStory(source[i])) {
        return source;
      }
    }

    const head = source.slice(0, insertAt);
    const tail = source.slice(insertAt);
    return head.concat([editorial], tail);
  }

  /**
   * Pure locale resolution side-effect contract for tests:
   * resolving a language never mutates city/country/eligibility/membership state.
   */
  function resolveLocaleWithoutSideEffects(preferredLanguages, state) {
    const lang = resolveEditorialLanguage(preferredLanguages);
    const next = state && typeof state === "object" ? state : {};
    return {
      lang: lang,
      selectedCountry: next.selectedCountry,
      selectedCity: next.selectedCity,
      locationVerified: next.locationVerified,
      membershipSimulated: next.membershipSimulated,
      eligibility: next.eligibility,
    };
  }

  return {
    CITY_DISCOVERY_STORY_ID: CITY_DISCOVERY_STORY_ID,
    CITY_DISCOVERY_INSERT_AFTER: CITY_DISCOVERY_INSERT_AFTER,
    CITY_DISCOVERY_COPY: CITY_DISCOVERY_COPY,
    normalizeLanguageTag: normalizeLanguageTag,
    resolveEditorialLanguage: resolveEditorialLanguage,
    editorialCopyForLanguage: editorialCopyForLanguage,
    createCityDiscoveryStory: createCityDiscoveryStory,
    isCityDiscoveryStory: isCityDiscoveryStory,
    insertCityDiscoveryStory: insertCityDiscoveryStory,
    resolveLocaleWithoutSideEffects: resolveLocaleWithoutSideEffects,
  };
});
