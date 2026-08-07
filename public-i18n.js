/**
 * TOWN public reading-language helpers.
 * One deterministic resolver for feed signals, editorial story, and public chrome.
 * Never infers city/country/eligibility/membership; never calls APIs.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownPublicI18n = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SUPPORTED_READING_LANGS = {
    en: true,
    es: true,
    it: true,
    de: true,
    ro: true,
  };

  const SOURCE_LANG_BY_CITY = {
    Milano: "it",
    Munich: "de",
    Arad: "ro",
    ClujNapoca: "ro",
    Sibiu: "ro",
    Iasi: "ro",
    Timisoara: "ro",
    Koln: "de",
    Dortmund: "de",
    Stuttgart: "de",
    Frankfurt: "de",
    Salzburg: "de",
  };

  const SOURCE_LANGUAGE_LABELS = {
    en: {
      it: "Original in Italian",
      de: "Original in German",
      ro: "Original in Romanian",
    },
    es: {
      it: "Original en italiano",
      de: "Original en alemán",
      ro: "Original en rumano",
    },
    it: {
      it: "Originale in italiano",
      de: "Originale in tedesco",
      ro: "Originale in rumeno",
    },
    de: {
      it: "Original auf Italienisch",
      de: "Original auf Deutsch",
      ro: "Original auf Rumänisch",
    },
    ro: {
      it: "Original în italiană",
      de: "Original în germană",
      ro: "Original în română",
    },
  };

  const FEED_UI_COPY = {
    en: {
      back: "Back",
      visitor: "Visitor",
      member: "Member · {city}",
      seeThisToo: "I SEE THIS TOO",
      doneTitle: "You see this too",
      doneNote: "Confirmation saved on TOWN",
      openSignal: "Open signal",
      openSignalClose: "Close",
      whyLabel: "Why this matters here",
      whoLabel: "Who is affected",
      updateLabel: "Latest update",
      statusLabel: "What this status means",
      communityArea: "{city} · {area}",
      sessionLabel: "Session toward a solution",
      sessionOpen: "Open a discussion session",
      sessionContribute: "Add your contribution",
      clearTestimony: "Remove media",
      demoTestimonyNote: "Attached — uploads securely when you publish",
      storyOf: "Story {current} of {total}",
      cityNames: { Milano: "Milano", Munich: "Munich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Cologne", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      navHome: "HOME",
      navMembership: "MEMBERSHIP",
      navChat: "CHAT",
      navActivity: "ACTIVITY",
      navProfile: "PROFILE",
      chatUnavailable: "Chat is not available yet on TOWN.",
    },
    es: {
      back: "Atrás",
      visitor: "Visitante",
      member: "Miembro · {city}",
      seeThisToo: "YO TAMBIÉN LO VEO",
      doneTitle: "Tú también lo ves",
      doneNote: "Confirmación guardada en TOWN",
      openSignal: "Abrir señal",
      openSignalClose: "Cerrar",
      whyLabel: "Por qué importa aquí",
      whoLabel: "Quién está afectado",
      updateLabel: "Última actualización",
      statusLabel: "Qué significa este estado",
      communityArea: "{city} · {area}",
      sessionLabel: "Sesión hacia una solución",
      sessionOpen: "Abrir una sesión de discusión",
      sessionContribute: "Añadir tu contribución",
      clearTestimony: "Quitar medio",
      demoTestimonyNote: "Adjunto — se carga de forma segura al publicar",
      storyOf: "Historia {current} de {total}",
      cityNames: { Milano: "Milán", Munich: "Múnich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Colonia", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Fráncfort", Salzburg: "Salzburgo" },
      navHome: "INICIO",
      navMembership: "MEMBRESÍA",
      navChat: "CHAT",
      navActivity: "ACTIVIDAD",
      navProfile: "PERFIL",
      chatUnavailable: "El chat aún no está disponible en TOWN.",
    },
    it: {
      back: "Indietro",
      visitor: "Visitatore",
      member: "Membro · {city}",
      seeThisToo: "LO VEDO ANCH’IO",
      doneTitle: "Lo vedi anche tu",
      doneNote: "Conferma salvata su TOWN",
      openSignal: "Apri il segnale",
      openSignalClose: "Chiudi",
      whyLabel: "Perché conta qui",
      whoLabel: "Chi è coinvolto",
      updateLabel: "Ultimo aggiornamento",
      statusLabel: "Cosa significa questo stato",
      communityArea: "{city} · {area}",
      sessionLabel: "Sessione verso una soluzione",
      sessionOpen: "Apri una sessione di discussione",
      sessionContribute: "Aggiungi il tuo contributo",
      clearTestimony: "Rimuovi media",
      demoTestimonyNote: "Allegato — viene caricato in sicurezza alla pubblicazione",
      storyOf: "Storia {current} di {total}",
      cityNames: { Milano: "Milano", Munich: "Monaco", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Colonia", Dortmund: "Dortmund", Stuttgart: "Stoccarda", Frankfurt: "Francoforte", Salzburg: "Salisburgo" },
      navHome: "HOME",
      navMembership: "MEMBERSHIP",
      navChat: "CHAT",
      navActivity: "ATTIVITÀ",
      navProfile: "PROFILO",
      chatUnavailable: "La chat non è ancora disponibile su TOWN.",
    },
    de: {
      back: "Zurück",
      visitor: "Besucher",
      member: "Mitglied · {city}",
      seeThisToo: "ICH SEHE DAS AUCH",
      doneTitle: "Du siehst das auch",
      doneNote: "Bestätigung auf TOWN gespeichert",
      openSignal: "Signal öffnen",
      openSignalClose: "Schließen",
      whyLabel: "Warum das hier zählt",
      whoLabel: "Wen es betrifft",
      updateLabel: "Letzte Aktualisierung",
      statusLabel: "Was dieser Status bedeutet",
      communityArea: "{city} · {area}",
      sessionLabel: "Sitzung auf dem Weg zur Lösung",
      sessionOpen: "Diskussionssitzung eröffnen",
      sessionContribute: "Deinen Beitrag hinzufügen",
      clearTestimony: "Medium entfernen",
      demoTestimonyNote: "Angehängt — wird beim Veröffentlichen sicher hochgeladen",
      storyOf: "Geschichte {current} von {total}",
      cityNames: { Milano: "Mailand", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      navHome: "START",
      navMembership: "MITGLIEDSCHAFT",
      navChat: "CHAT",
      navActivity: "AKTIVITÄT",
      navProfile: "PROFIL",
      chatUnavailable: "Chat ist auf TOWN noch nicht verfügbar.",
    },
    ro: {
      back: "Înapoi",
      visitor: "Vizitator",
      member: "Membru · {city}",
      seeThisToo: "VĂD ȘI EU ASTA",
      doneTitle: "Vezi și tu",
      doneNote: "Confirmare salvată pe TOWN",
      openSignal: "Deschide semnalul",
      openSignalClose: "Închide",
      whyLabel: "De ce contează aici",
      whoLabel: "Cine este implicat",
      updateLabel: "Ultima actualizare",
      statusLabel: "Ce înseamnă această stare",
      communityArea: "{city} · {area}",
      sessionLabel: "Sesiune către o soluție",
      sessionOpen: "Deschide o sesiune de discuții",
      sessionContribute: "Adaugă contribuția ta",
      clearTestimony: "Elimină media",
      demoTestimonyNote: "Atașat — se încarcă în siguranță la publicare",
      storyOf: "Povestea {current} din {total}",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      navHome: "ACASĂ",
      navMembership: "MEMBRU",
      navChat: "CHAT",
      navActivity: "ACTIVITATE",
      navProfile: "PROFIL",
      chatUnavailable: "Chat-ul nu este încă disponibil pe TOWN.",
    },
  };

  const COUNTRY_COPY = {
    en: {
      back: "Back",
      title: "Choose your country",
      lead: "TOWN connects you to your real local community.",
      legend: "Country",
      continue: "Continue",
      countries: {
        Italy: "Italy",
        Germany: "Germany",
        Romania: "Romania",
        Austria: "Austria",
      },
    },
    es: {
      back: "Atrás",
      title: "Elige tu país",
      lead: "TOWN te conecta con tu comunidad local real.",
      legend: "País",
      continue: "Continuar",
      countries: {
        Italy: "Italia",
        Germany: "Alemania",
        Romania: "Rumanía",
        Austria: "Austria",
      },
    },
    it: {
      back: "Indietro",
      title: "Scegli il tuo paese",
      lead: "TOWN ti collega alla tua vera comunità locale.",
      legend: "Paese",
      continue: "Continua",
      countries: {
        Italy: "Italia",
        Germany: "Germania",
        Romania: "România",
        Austria: "Austria",
      },
    },
    de: {
      back: "Zurück",
      title: "Wähle dein Land",
      lead: "TOWN verbindet dich mit deiner echten lokalen Gemeinschaft.",
      legend: "Land",
      continue: "Weiter",
      countries: {
        Italy: "Italien",
        Germany: "Deutschland",
        Romania: "Rumänien",
        Austria: "Österreich",
      },
    },
    ro: {
      back: "Înapoi",
      title: "Alege-ți țara",
      lead: "TOWN te leagă de comunitatea ta locală reală.",
      legend: "Țară",
      continue: "Continuă",
      countries: {
        Italy: "Italia",
        Germany: "Germania",
        Romania: "România",
        Austria: "Austria",
      },
    },
  };

  const PUBLIC_INVITE_COPY = {
    en: {
      inviteTitle: "You care about what happens in your community.",
      inviteBody:
        "To confirm this signal and become part of the solution, join TOWN as a verified local member.",
      inviteBodySecond:
        "TOWN is built around real people from the same community — not anonymous accounts, followers, or social popularity.",
      continue: "Continue",
      notNow: "Not now",
    },
    es: {
      inviteTitle: "Te importa lo que ocurre en tu comunidad.",
      inviteBody:
        "Para confirmar esta señal y formar parte de la solución, únete a TOWN como miembro local verificado.",
      inviteBodySecond:
        "TOWN se construye en torno a personas reales de la misma comunidad — no cuentas anónimas, seguidores ni popularidad en redes.",
      continue: "Continuar",
      notNow: "Ahora no",
    },
    it: {
      inviteTitle: "Ti sta a cuore ciò che accade nella tua comunità.",
      inviteBody:
        "Per confermare questo segnale e diventare parte della soluzione, unisciti a TOWN come membro locale verificato.",
      inviteBodySecond:
        "TOWN è costruito intorno a persone reali della stessa comunità — non su account anonimi, follower o popolarità sui social.",
      continue: "Continua",
      notNow: "Non ora",
    },
    de: {
      inviteTitle: "Dir ist wichtig, was in deiner Gemeinschaft geschieht.",
      inviteBody:
        "Um dieses Signal zu bestätigen und Teil der Lösung zu werden, tritt TOWN als verifiziertes lokales Mitglied bei.",
      inviteBodySecond:
        "TOWN ist um echte Menschen derselben Gemeinschaft gebaut — nicht um anonyme Konten, Follower oder Social-Media-Popularität.",
      continue: "Weiter",
      notNow: "Nicht jetzt",
    },
    ro: {
      inviteTitle: "Îți pasă de ce se întâmplă în comunitatea ta.",
      inviteBody:
        "Pentru a confirma acest semnal și a deveni parte din soluție, alătură-te TOWN ca membru local verificat.",
      inviteBodySecond:
        "TOWN este construit în jurul unor oameni reali din aceeași comunitate — nu conturi anonime, urmăritori sau popularitate pe social media.",
      continue: "Continuă",
      notNow: "Nu acum",
    },
  };

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

  function resolveReadingLanguage(preferredLanguages) {
    let list = preferredLanguages;
    if (list == null) list = [];
    if (typeof list === "string") list = [list];
    if (!list || typeof list.length !== "number") list = [];

    for (let i = 0; i < list.length; i++) {
      const lang = normalizeLanguageTag(list[i]);
      if (lang && SUPPORTED_READING_LANGS[lang]) return lang;
    }
    return "en";
  }

  function catalogForLang(catalog, lang) {
    const resolved = resolveReadingLanguage([lang]);
    return (
      (catalog && (catalog[resolved] || catalog.en)) ||
      (catalog && catalog.it) ||
      null
    );
  }

  function pickLocalized(entry, lang, key, englishEntry) {
    const resolved = resolveReadingLanguage([lang]);
    const primary = entry && entry[resolved];
    if (primary && primary[key] != null && primary[key] !== "") {
      return primary[key];
    }
    const en = (entry && entry.en) || englishEntry || null;
    if (en && en[key] != null && en[key] !== "") return en[key];
    return "";
  }

  function feedChromeCopy(lang) {
    return catalogForLang(FEED_UI_COPY, lang) || FEED_UI_COPY.en;
  }

  function countryCopy(lang) {
    return catalogForLang(COUNTRY_COPY, lang) || COUNTRY_COPY.en;
  }

  function publicInviteCopy(lang) {
    return catalogForLang(PUBLIC_INVITE_COPY, lang) || PUBLIC_INVITE_COPY.en;
  }

  function sourceLanguageForCity(cityId) {
    return SOURCE_LANG_BY_CITY[cityId] || null;
  }

  function sourceLanguageLabel(readingLang, sourceLang) {
    const labels =
      SOURCE_LANGUAGE_LABELS[resolveReadingLanguage([readingLang])] ||
      SOURCE_LANGUAGE_LABELS.en;
    return (labels && labels[sourceLang]) || "";
  }

  function storyLabel(lang, current, total) {
    const copy = feedChromeCopy(lang);
    return String(copy.storyOf || FEED_UI_COPY.en.storyOf)
      .replace("{current}", String(current))
      .replace("{total}", String(total));
  }

  /**
   * Locale resolution side-effect contract for tests.
   */
  function resolveLocaleWithoutSideEffects(preferredLanguages, state) {
    const lang = resolveReadingLanguage(preferredLanguages);
    const next = state && typeof state === "object" ? state : {};
    return {
      lang: lang,
      selectedCountry: next.selectedCountry,
      selectedCity: next.selectedCity,
      locationVerified: next.locationVerified,
      membershipSimulated: next.membershipSimulated,
      eligibility: next.eligibility,
      sessionAuthenticated: next.sessionAuthenticated,
    };
  }

  return {
    SUPPORTED_READING_LANGS: SUPPORTED_READING_LANGS,
    SOURCE_LANG_BY_CITY: SOURCE_LANG_BY_CITY,
    FEED_UI_COPY: FEED_UI_COPY,
    COUNTRY_COPY: COUNTRY_COPY,
    PUBLIC_INVITE_COPY: PUBLIC_INVITE_COPY,
    normalizeLanguageTag: normalizeLanguageTag,
    resolveReadingLanguage: resolveReadingLanguage,
    // Backward-compatible alias used by city-discovery helpers/tests.
    resolveEditorialLanguage: resolveReadingLanguage,
    feedChromeCopy: feedChromeCopy,
    countryCopy: countryCopy,
    publicInviteCopy: publicInviteCopy,
    sourceLanguageForCity: sourceLanguageForCity,
    sourceLanguageLabel: sourceLanguageLabel,
    storyLabel: storyLabel,
    pickLocalized: pickLocalized,
    catalogForLang: catalogForLang,
    resolveLocaleWithoutSideEffects: resolveLocaleWithoutSideEffects,
  };
});
