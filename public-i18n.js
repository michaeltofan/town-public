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
    fr: true,
    hu: true,
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
    Marseille: "fr",
    Lyon: "fr",
    Toulouse: "fr",
    Budapest: "hu",
    Szeged: "hu",
    Madrid: "es",
    Barcelona: "es",
    Valencia: "es",
    Sevilla: "es",
    Malaga: "es",
  };

  const SOURCE_LANGUAGE_LABELS = {
    en: {
      it: "Original in Italian",
      de: "Original in German",
      ro: "Original in Romanian",
      fr: "Original in French",
      hu: "Original in Hungarian",
    },
    es: {
      it: "Original en italiano",
      de: "Original en alemán",
      ro: "Original en rumano",
      fr: "Original en francés",
      hu: "Original en húngaro",
    },
    fr: {
      it: "Original en italien",
      de: "Original en allemand",
      ro: "Original en roumain",
      fr: "Original en français",
      hu: "Original en hongrois",
    },
    it: {
      it: "Originale in italiano",
      de: "Originale in tedesco",
      ro: "Originale in rumeno",
      fr: "Originale in francese",
      hu: "Originale in ungherese",
    },
    de: {
      it: "Original auf Italienisch",
      de: "Original auf Deutsch",
      ro: "Original auf Rumänisch",
      fr: "Original auf Französisch",
      hu: "Original auf Ungarisch",
    },
    ro: {
      it: "Original în italiană",
      de: "Original în germană",
      ro: "Original în română",
      fr: "Original în franceză",
      hu: "Original în maghiară",
    },
    hu: {
      it: "Eredeti olasz nyelven",
      de: "Eredeti német nyelven",
      ro: "Eredeti román nyelven",
      fr: "Eredeti francia nyelven",
      hu: "Eredeti magyar nyelven",
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
      confirmCount: "{count} confirmations",
      confirmCountOne: "1 confirmation",
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
      chatWelcomeAvailable: "Membership welcome",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Welcome to TOWN",
      chatWelcomeBody:
        "This is not a member-to-member chat. When your membership is active, TOWN leaves an introduction here — a starting point for local civic work.",
      chatWelcomeMessageMeta: "From TOWN",
      chatWelcomeMessageText:
        "Your membership is active. Start with public data that helps you understand Madrid.",
      chatWelcomeLinkHint: "Madrid open data catalog:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Close",
      chatWelcomeFeedCta: "Back to feed",
    },
    es: {
      back: "Atrás",
      visitor: "Visitante",
      member: "Miembro · {city}",
      seeThisToo: "YO TAMBIÉN LO VEO",
      doneTitle: "Tú también lo ves",
      doneNote: "Confirmación guardada en TOWN",
      confirmCount: "{count} confirmaciones",
      confirmCountOne: "1 confirmación",
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
      chatWelcomeAvailable: "Bienvenida de membresía",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Bienvenido a TOWN",
      chatWelcomeBody:
        "Esto no es un chat entre miembros. Cuando tu membresía está activa, TOWN deja aquí una introducción — un punto de partida para el trabajo cívico local.",
      chatWelcomeMessageMeta: "De TOWN",
      chatWelcomeMessageText:
        "Tu membresía está activa. Empieza con datos públicos que ayudan a entender Madrid.",
      chatWelcomeLinkHint: "Catálogo de datos abiertos de Madrid:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Cerrar",
      chatWelcomeFeedCta: "Volver al feed",
    },
    fr: {
      back: "Retour",
      visitor: "Visiteur",
      member: "Membre · {city}",
      seeThisToo: "JE LE VOIS AUSSI",
      doneTitle: "Vous le voyez aussi",
      doneNote: "Confirmation enregistrée sur TOWN",
      confirmCount: "{count} confirmations",
      confirmCountOne: "1 confirmation",
      openSignal: "Ouvrir le signalement",
      openSignalClose: "Fermer",
      whyLabel: "Pourquoi c'est important ici",
      whoLabel: "Qui est concerné",
      updateLabel: "Dernière mise à jour",
      statusLabel: "Ce que signifie ce statut",
      communityArea: "{city} · {area}",
      sessionLabel: "Session vers une solution",
      sessionOpen: "Ouvrir une session de discussion",
      sessionContribute: "Ajouter votre contribution",
      clearTestimony: "Supprimer le média",
      demoTestimonyNote: "Joint — sera téléversé en toute sécurité lors de la publication",
      storyOf: "Histoire {current} sur {total}",
      cityNames: { Milano: "Milan", Munich: "Munich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Cologne", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Francfort", Salzburg: "Salzbourg" },
      navHome: "ACCUEIL",
      navMembership: "ADHÉSION",
      navChat: "CHAT",
      navActivity: "ACTIVITÉ",
      navProfile: "PROFIL",
      chatUnavailable: "Le chat n'est pas encore disponible sur TOWN.",
      chatWelcomeAvailable: "Bienvenue d'adhésion",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Bienvenue sur TOWN",
      chatWelcomeBody:
        "Ceci n'est pas un chat entre membres. Lorsque votre adhésion est active, TOWN laisse ici une introduction — un point de départ pour le travail civique local.",
      chatWelcomeMessageMeta: "De TOWN",
      chatWelcomeMessageText:
        "Votre adhésion est active. Commencez par des données publiques qui aident à comprendre Madrid.",
      chatWelcomeLinkHint: "Catalogue de données ouvertes de Madrid :",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Fermer",
      chatWelcomeFeedCta: "Retour au fil",
    },
    hu: {
      back: "Vissza",
      visitor: "Látogató",
      member: "Tag · {city}",
      seeThisToo: "ÉN IS LÁTOM EZT",
      doneTitle: "Ön is látja ezt",
      doneNote: "A megerősítést a TOWN elmentette",
      confirmCount: "{count} megerősítés",
      confirmCountOne: "1 megerősítés",
      openSignal: "Jelzés megnyitása",
      openSignalClose: "Bezárás",
      whyLabel: "Miért fontos ez itt",
      whoLabel: "Kiket érint",
      updateLabel: "Legfrissebb frissítés",
      statusLabel: "Mit jelent ez az állapot",
      communityArea: "{city} · {area}",
      sessionLabel: "Közös munka a megoldásért",
      sessionOpen: "Egyeztetés indítása",
      sessionContribute: "Hozzászólás hozzáadása",
      clearTestimony: "Média eltávolítása",
      demoTestimonyNote: "Csatolva — közzétételkor biztonságosan feltöltjük",
      storyOf: "{current}. történet, összesen {total}",
      cityNames: { Milano: "Milánó", Munich: "München", Arad: "Arad", ClujNapoca: "Kolozsvár", Sibiu: "Nagyszeben", Iasi: "Jászvásár", Timisoara: "Temesvár", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg", Marseille: "Marseille", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
      navHome: "KEZDŐLAP",
      navMembership: "TAGSÁG",
      navChat: "CHAT",
      navActivity: "AKTIVITÁS",
      navProfile: "PROFIL",
      chatUnavailable: "A chat még nem érhető el a TOWN-on.",
      chatWelcomeAvailable: "Tagsági üdvözlés",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Üdvözöl a TOWN",
      chatWelcomeBody:
        "Ez nem tagok közötti chat. Amikor a tagságod aktív, a TOWN ide helyez egy bevezetőt — kiindulópontot a helyi közösségi munkához.",
      chatWelcomeMessageMeta: "A TOWN-tól",
      chatWelcomeMessageText:
        "A tagságod aktív. Kezdd nyilvános adatokkal, amelyek segítenek megérteni Madridot.",
      chatWelcomeLinkHint: "Madrid nyílt adatkatalógusa:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Bezárás",
      chatWelcomeFeedCta: "Vissza a feedhez",
    },
    it: {
      back: "Indietro",
      visitor: "Visitatore",
      member: "Membro · {city}",
      seeThisToo: "LO VEDO ANCH’IO",
      doneTitle: "Lo vedi anche tu",
      doneNote: "Conferma salvata su TOWN",
      confirmCount: "{count} conferme",
      confirmCountOne: "1 conferma",
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
      chatWelcomeAvailable: "Benvenuto membership",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Benvenuto su TOWN",
      chatWelcomeBody:
        "Questa non è una chat tra membri. Quando la membership è attiva, TOWN lascia qui un’introduzione — un punto di partenza per il lavoro civico locale.",
      chatWelcomeMessageMeta: "Da TOWN",
      chatWelcomeMessageText:
        "La tua membership è attiva. Inizia dai dati pubblici che aiutano a capire Madrid.",
      chatWelcomeLinkHint: "Catalogo open data di Madrid:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Chiudi",
      chatWelcomeFeedCta: "Torna al feed",
    },
    de: {
      back: "Zurück",
      visitor: "Besucher",
      member: "Mitglied · {city}",
      seeThisToo: "ICH SEHE DAS AUCH",
      doneTitle: "Du siehst das auch",
      doneNote: "Bestätigung auf TOWN gespeichert",
      confirmCount: "{count} Bestätigungen",
      confirmCountOne: "1 Bestätigung",
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
      chatWelcomeAvailable: "Mitgliedschafts-Willkommen",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Willkommen bei TOWN",
      chatWelcomeBody:
        "Das ist kein Chat zwischen Mitgliedern. Wenn deine Mitgliedschaft aktiv ist, hinterlässt TOWN hier eine Einführung — einen Ausgangspunkt für lokale zivile Arbeit.",
      chatWelcomeMessageMeta: "Von TOWN",
      chatWelcomeMessageText:
        "Deine Mitgliedschaft ist aktiv. Beginne mit öffentlichen Daten, die helfen, Madrid zu verstehen.",
      chatWelcomeLinkHint: "Offener Datenkatalog von Madrid:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Schließen",
      chatWelcomeFeedCta: "Zurück zum Feed",
    },
    ro: {
      back: "Înapoi",
      visitor: "Vizitator",
      member: "Membru · {city}",
      seeThisToo: "VĂD ȘI EU ASTA",
      doneTitle: "Vezi și tu",
      doneNote: "Confirmare salvată pe TOWN",
      confirmCount: "{count} confirmări",
      confirmCountOne: "1 confirmare",
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
      chatWelcomeAvailable: "Bun venit ca membru",
      chatWelcomeLabel: "CHAT",
      chatWelcomeTitle: "Bun venit pe TOWN",
      chatWelcomeBody:
        "Aceasta nu este o conversație între membri. Când membership-ul este activ, TOWN lasă aici o introducere — un punct de plecare pentru munca civică locală.",
      chatWelcomeMessageMeta: "De la TOWN",
      chatWelcomeMessageText:
        "Membership-ul tău este activ. Începe cu date publice care te ajută să înțelegi Madridul.",
      chatWelcomeLinkHint: "Catalogul de date deschise al Madridului:",
      chatWelcomeLinkLabel: "https://datos.madrid.es/dataset/",
      chatWelcomeClose: "Închide",
      chatWelcomeFeedCta: "Înapoi la feed",
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
        France: "France",
        Hungary: "Hungary",
        Spain: "Spain",
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
        France: "Francia",
        Hungary: "Hungría",
        Spain: "España",
      },
    },
    fr: {
      back: "Retour",
      title: "Choisissez votre pays",
      lead: "TOWN vous relie à votre véritable communauté locale.",
      legend: "Pays",
      continue: "Continuer",
      countries: {
        Italy: "Italie",
        Germany: "Allemagne",
        Romania: "Roumanie",
        Austria: "Autriche",
        France: "France",
        Hungary: "Hongrie",
        Spain: "Espagne",
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
        France: "Francia",
        Hungary: "Ungheria",
        Spain: "Spagna",
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
        France: "Frankreich",
        Hungary: "Ungarn",
        Spain: "Spanien",
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
        France: "Franța",
        Hungary: "Ungaria",
        Spain: "Spania",
      },
    },
    hu: {
      back: "Vissza",
      title: "Válassza ki az országát",
      lead: "A TOWN összeköti Önt a valódi helyi közösségével.",
      legend: "Ország",
      continue: "Tovább",
      countries: {
        Italy: "Olaszország",
        Germany: "Németország",
        Romania: "Románia",
        Austria: "Ausztria",
        France: "Franciaország",
        Hungary: "Magyarország",
        Spain: "Spanyolország",
      },
    },
  };

  const EXPANDED_CITY_NAMES = {
    Marseille: "Marseille",
    Lyon: "Lyon",
    Toulouse: "Toulouse",
    Budapest: "Budapest",
    Szeged: "Szeged",
    Madrid: "Madrid",
    Barcelona: "Barcelona",
    Valencia: "Valencia",
    Sevilla: "Sevilla",
    Malaga: "Malaga",
  };
  const EXPANDED_CITY_NAMES_BY_LANG = {
    es: {
      Madrid: "Madrid",
      Barcelona: "Barcelona",
      Valencia: "Valencia",
      Sevilla: "Sevilla",
      Malaga: "Málaga",
      Marseille: "Marsella",
    },
    fr: {
      Barcelona: "Barcelone",
      Valencia: "Valence",
      Sevilla: "Séville",
    },
    it: {
      Barcelona: "Barcellona",
      Sevilla: "Siviglia",
    },
  };
  Object.keys(FEED_UI_COPY).forEach(function (lang) {
    Object.assign(FEED_UI_COPY[lang].cityNames, EXPANDED_CITY_NAMES);
    if (EXPANDED_CITY_NAMES_BY_LANG[lang]) {
      Object.assign(FEED_UI_COPY[lang].cityNames, EXPANDED_CITY_NAMES_BY_LANG[lang]);
    }
  });

  const PUBLIC_INVITE_COPY = {
    en: {
      inviteTitle: "You care about what happens in your community.",
      inviteBody:
        "To confirm this signal and become part of the solution, create an identified account and declare the community where you participate.",
      inviteBodySecond:
        "TOWN is built around real people from the same community — not anonymous accounts, followers, or social popularity.",
      continue: "Continue",
      notNow: "Continue exploring",
    },
    es: {
      inviteTitle: "Te importa lo que ocurre en tu comunidad.",
      inviteBody:
        "Para confirmar esta señal y formar parte de la solución, crea una cuenta identificada y declara la comunidad en la que participas.",
      inviteBodySecond:
        "TOWN se construye en torno a personas reales de la misma comunidad — no cuentas anónimas, seguidores ni popularidad en redes.",
      continue: "Continuar",
      notNow: "Seguir explorando",
    },
    fr: {
      inviteTitle: "Ce qui se passe dans votre communauté vous tient à cœur.",
      inviteBody:
        "Pour confirmer ce signalement et faire partie de la solution, créez un compte identifié et déclarez la communauté dans laquelle vous participez.",
      inviteBodySecond:
        "TOWN est construit autour de personnes réelles d'une même communauté — pas de comptes anonymes, d'abonnés ou de popularité sur les réseaux sociaux.",
      continue: "Continuer",
      notNow: "Continuer à explorer",
    },
    hu: {
      inviteTitle: "Fontos Önnek, mi történik a közösségében.",
      inviteBody:
        "A jelzés megerősítéséhez és a megoldásban való részvételhez hozzon létre azonosított fiókot, és adja meg azt a közösséget, ahol részt vesz.",
      inviteBodySecond:
        "A TOWN ugyanazon közösség valódi embereire épül — nem névtelen fiókokra, követőkre vagy közösségimédia-népszerűségre.",
      continue: "Tovább",
      notNow: "Böngészés folytatása",
    },
    it: {
      inviteTitle: "Ti sta a cuore ciò che accade nella tua comunità.",
      inviteBody:
        "Per confermare questo segnale e diventare parte della soluzione, crea un account identificato e dichiara la comunità in cui partecipi.",
      inviteBodySecond:
        "TOWN è costruito intorno a persone reali della stessa comunità — non su account anonimi, follower o popolarità sui social.",
      continue: "Continua",
      notNow: "Continua a esplorare",
    },
    de: {
      inviteTitle: "Dir ist wichtig, was in deiner Gemeinschaft geschieht.",
      inviteBody:
        "Um dieses Signal zu bestätigen und Teil der Lösung zu werden, erstelle ein identifiziertes Konto und gib die Gemeinschaft an, in der du teilnimmst.",
      inviteBodySecond:
        "TOWN ist um echte Menschen derselben Gemeinschaft gebaut — nicht um anonyme Konten, Follower oder Social-Media-Popularität.",
      continue: "Weiter",
      notNow: "Weiter erkunden",
    },
    ro: {
      inviteTitle: "Îți pasă de ce se întâmplă în comunitatea ta.",
      inviteBody:
        "Pentru a confirma acest semnal și a deveni parte din soluție, creează un cont identificat și declară comunitatea în care participi.",
      inviteBodySecond:
        "TOWN este construit în jurul unor oameni reali din aceeași comunitate — nu conturi anonime, urmăritori sau popularitate pe social media.",
      continue: "Continuă",
      notNow: "Continuă să explorezi",
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
