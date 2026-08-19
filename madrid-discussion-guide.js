/**
 * TOWN Madrid pilot — internal discussion-routing agent.
 *
 * Pure client-side matcher: scores a draft signal against live Madrid scenes
 * so members are guided into the same discussion instead of opening duplicates.
 * No API calls, no LLM, no browser globals required.
 *
 * Enabled only on Madrid pilot hosts by the public app (script.js).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownMadridDiscussionGuide = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DEFAULT_MIN_SCORE = 0.28;
  const DEFAULT_LIMIT = 3;
  const MIN_DRAFT_TOKENS = 2;

  // High-frequency Spanish / civic filler — not useful for place identity.
  const STOPWORDS = {
    a: true,
    al: true,
    algo: true,
    alguna: true,
    algunas: true,
    alguno: true,
    algunos: true,
    ante: true,
    antes: true,
    aqui: true,
    aquel: true,
    aquella: true,
    aquellas: true,
    aquellos: true,
    asi: true,
    aun: true,
    aunque: true,
    bajo: true,
    bien: true,
    cada: true,
    casi: true,
    como: true,
    con: true,
    contra: true,
    cual: true,
    cuales: true,
    cuando: true,
    de: true,
    del: true,
    desde: true,
    donde: true,
    dos: true,
    el: true,
    ella: true,
    ellas: true,
    ellos: true,
    en: true,
    entre: true,
    era: true,
    es: true,
    esa: true,
    esas: true,
    ese: true,
    eso: true,
    esos: true,
    esta: true,
    estas: true,
    este: true,
    esto: true,
    estos: true,
    hay: true,
    la: true,
    las: true,
    le: true,
    les: true,
    lo: true,
    los: true,
    mas: true,
    me: true,
    mi: true,
    mis: true,
    muy: true,
    nada: true,
    ni: true,
    no: true,
    nos: true,
    nosotros: true,
    o: true,
    otra: true,
    otras: true,
    otro: true,
    otros: true,
    para: true,
    pero: true,
    poco: true,
    por: true,
    porque: true,
    que: true,
    se: true,
    ser: true,
    si: true,
    sin: true,
    sobre: true,
    su: true,
    sus: true,
    tambien: true,
    te: true,
    tiene: true,
    tienen: true,
    todo: true,
    todos: true,
    un: true,
    una: true,
    unas: true,
    uno: true,
    unos: true,
    y: true,
    ya: true,
    // Civic filler common in drafts / headlines
    senal: true,
    civic: true,
    civica: true,
    problema: true,
    urgente: true,
    necesita: true,
    atencion: true,
  };

  /**
   * Madrid place / landmark aliases that strongly imply the same discussion
   * when shared between draft and an existing signal.
   */
  const PLACE_ALIASES = {
    azca: true,
    tetuan: true,
    "cuatro-caminos": true,
    cuatrocaminos: true,
    retiro: true,
    lavapies: true,
    legazpi: true,
    argumosa: true,
    "tierno-galvan": true,
    tiernogalvan: true,
    malasana: true,
    chueca: true,
    chamberi: true,
    latina: true,
    carabanchel: true,
    vallecas: true,
    hortaleza: true,
    salamanca: true,
    moncloa: true,
    usera: true,
    villaverde: true,
    arganzuela: true,
    centro: true,
    sol: true,
    granvia: true,
    "gran-via": true,
    castellan: true, // truncated castellaña / castellana
    castellana: true,
    manzanares: true,
  };

  const MULTI_TOKEN_PLACES = [
    ["parque", "central", "azca"],
    ["parque", "azca"],
    ["cuatro", "caminos"],
    ["tierno", "galvan"],
    ["puerta", "alcala"],
    ["gran", "via"],
    ["casa", "campo"],
    ["pablo", "ruiz", "picasso"],
  ];

  function stripDiacritics(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function normalizeText(value) {
    return stripDiacritics(value)
      .toLowerCase()
      .replace(/[^a-z0-9ñ\s-]/g, " ")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(value) {
    const normalized = normalizeText(value);
    if (!normalized) return [];
    const raw = normalized.split(" ");
    const out = [];
    const seen = Object.create(null);
    for (let i = 0; i < raw.length; i++) {
      const token = raw[i];
      if (!token) continue;
      if (STOPWORDS[token]) continue;
      if (token.length < 3 && !PLACE_ALIASES[token]) continue;
      if (seen[token]) continue;
      seen[token] = true;
      out.push(token);
    }
    return out;
  }

  function sceneCorpusText(scene) {
    if (!scene || typeof scene !== "object") return "";
    return [
      scene.headline,
      scene.summary,
      scene.description,
      scene.area,
      scene.category,
      scene.whyMatters,
      scene.whoAffected,
    ]
      .filter(Boolean)
      .join(" ");
  }

  function draftCorpusText(draft) {
    if (!draft || typeof draft !== "object") return "";
    return [draft.title, draft.description, draft.category]
      .filter(Boolean)
      .join(" ");
  }

  function tokenSet(tokens) {
    const set = Object.create(null);
    for (let i = 0; i < tokens.length; i++) set[tokens[i]] = true;
    return set;
  }

  function sharedTokens(aTokens, bSet) {
    const shared = [];
    for (let i = 0; i < aTokens.length; i++) {
      if (bSet[aTokens[i]]) shared.push(aTokens[i]);
    }
    return shared;
  }

  function countPlaceHits(tokens) {
    let n = 0;
    for (let i = 0; i < tokens.length; i++) {
      if (PLACE_ALIASES[tokens[i]]) n += 1;
    }
    return n;
  }

  function multiPlaceHits(normalizedText) {
    const hits = [];
    if (!normalizedText) return hits;
    for (let i = 0; i < MULTI_TOKEN_PLACES.length; i++) {
      const parts = MULTI_TOKEN_PLACES[i];
      let ok = true;
      for (let j = 0; j < parts.length; j++) {
        if (normalizedText.indexOf(parts[j]) < 0) {
          ok = false;
          break;
        }
      }
      if (ok) hits.push(parts.join(" "));
    }
    return hits;
  }

  /**
   * Score one live scene against a draft. Returns null when too weak to
   * surface, otherwise { scene, score, sharedTokens, placeHits, reason }.
   */
  function scoreScene(draft, scene, options) {
    const opts = options || {};
    const minScore =
      typeof opts.minScore === "number" ? opts.minScore : DEFAULT_MIN_SCORE;

    const draftText = draftCorpusText(draft);
    const sceneText = sceneCorpusText(scene);
    const draftTokens = tokenize(draftText);
    const sceneTokens = tokenize(sceneText);

    if (draftTokens.length < MIN_DRAFT_TOKENS || sceneTokens.length < 1) {
      return null;
    }

    const sceneSet = tokenSet(sceneTokens);
    const shared = sharedTokens(draftTokens, sceneSet);
    if (shared.length < 1) return null;

    const unionSize = draftTokens.length + sceneTokens.length - shared.length;
    const jaccard = unionSize > 0 ? shared.length / unionSize : 0;
    const coverage = shared.length / draftTokens.length;

    let score = jaccard * 0.55 + coverage * 0.45;

    const sharedPlaces = shared.filter(function (token) {
      return PLACE_ALIASES[token];
    });
    const draftPlaces = countPlaceHits(draftTokens);
    const scenePlaces = countPlaceHits(sceneTokens);
    if (sharedPlaces.length >= 1 && draftPlaces >= 1 && scenePlaces >= 1) {
      score += 0.22 * Math.min(sharedPlaces.length, 2);
    }

    const draftNorm = normalizeText(draftText);
    const sceneNorm = normalizeText(sceneText);
    const draftMulti = multiPlaceHits(draftNorm);
    const sceneMulti = multiPlaceHits(sceneNorm);
    const sharedMulti = draftMulti.filter(function (name) {
      return sceneMulti.indexOf(name) >= 0;
    });

    const draftPlaceTokens = draftTokens.filter(function (token) {
      return PLACE_ALIASES[token];
    });
    // Place-specific drafts must share place identity. "parque" alone must
    // not route AZCA → Retiro or any other green space.
    if (
      (draftPlaceTokens.length >= 1 || draftMulti.length >= 1) &&
      sharedPlaces.length < 1 &&
      sharedMulti.length < 1
    ) {
      return null;
    }

    if (sharedMulti.length >= 1) {
      score += 0.3;
    }

    if (
      draft.category &&
      scene.category &&
      normalizeText(draft.category) === normalizeText(scene.category)
    ) {
      score += 0.08;
    }

    // Generic token overlap without place identity needs a higher bar.
    if (sharedPlaces.length < 1 && sharedMulti.length < 1) {
      const genericFloor = Math.max(minScore, 0.38);
      if (score < genericFloor) return null;
    }

    // Cap so ranking stays readable.
    if (score > 1) score = 1;

    if (score < minScore) return null;

    let reason = "shared_tokens";
    if (sharedMulti.length >= 1) reason = "same_place";
    else if (sharedPlaces.length >= 1) reason = "place_token";

    return {
      scene: scene,
      score: Math.round(score * 1000) / 1000,
      sharedTokens: shared,
      placeHits: sharedPlaces.concat(sharedMulti),
      reason: reason,
    };
  }

  /**
   * Rank live scenes that likely belong to the same discussion as the draft.
   * @param {object} draft { title, description, category }
   * @param {Array<object>} scenes live feed scenes for Madrid
   * @param {object} [options] { minScore, limit }
   */
  function suggestMatches(draft, scenes, options) {
    const opts = options || {};
    const limit =
      typeof opts.limit === "number" && opts.limit > 0
        ? opts.limit
        : DEFAULT_LIMIT;
    const list = Array.isArray(scenes) ? scenes : [];
    const scored = [];

    for (let i = 0; i < list.length; i++) {
      const hit = scoreScene(draft, list[i], opts);
      if (hit) scored.push(hit);
    }

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      const aHead = (a.scene && a.scene.headline) || "";
      const bHead = (b.scene && b.scene.headline) || "";
      return aHead.localeCompare(bHead);
    });

    return scored.slice(0, limit);
  }

  function isStrongMatch(match) {
    if (!match || typeof match.score !== "number") return false;
    if (match.score >= 0.45) return true;
    return match.reason === "same_place" && match.score >= 0.35;
  }

  return {
    DEFAULT_MIN_SCORE: DEFAULT_MIN_SCORE,
    DEFAULT_LIMIT: DEFAULT_LIMIT,
    normalizeText: normalizeText,
    tokenize: tokenize,
    sceneCorpusText: sceneCorpusText,
    draftCorpusText: draftCorpusText,
    scoreScene: scoreScene,
    suggestMatches: suggestMatches,
    isStrongMatch: isStrongMatch,
  };
});
