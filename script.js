(() => {
  const viewEntry = document.getElementById("view-entry");
  const viewCountry = document.getElementById("view-country");
  const viewCity = document.getElementById("view-city");
  const viewLocation = document.getElementById("view-location");
  const viewFeed = document.getElementById("view-feed");
  const viewBoundary = document.getElementById("view-boundary");
  const viewAccount = document.getElementById("view-account");
  const viewEmail = document.getElementById("view-email");
  const viewCode = document.getElementById("view-code");
  const learnMoreButton = document.getElementById("learn-more");
  const enterButton = document.getElementById("enter-town");
  const sheet = document.getElementById("learn-more-sheet");
  const continueCountry = document.getElementById("continue-country");
  const countryBack = document.getElementById("country-back");
  const cityBack = document.getElementById("city-back");
  const continueCity = document.getElementById("continue-city");
  const cityOptions = document.getElementById("city-options");
  const cityTitle = document.getElementById("city-title");
  const cityLead = document.getElementById("city-lead");
  const cityLegend = document.getElementById("city-legend");
  const cityContext = document.getElementById("city-context");
  const locationBack = document.getElementById("location-back");
  const locationIdle = document.getElementById("location-idle");
  const locationSuccess = document.getElementById("location-success");
  const locationTitle = document.getElementById("location-title");
  const locationCity = document.getElementById("location-city");
  const locationLead = document.getElementById("location-lead");
  const locationPrivacy = document.getElementById("location-privacy");
  const locationVerify = document.getElementById("location-verify");
  const locationStatusLabel = document.getElementById("location-status-label");
  const locationSuccessTitle = document.getElementById("location-success-title");
  const locationSuccessLead = document.getElementById("location-success-lead");
  const locationContinue = document.getElementById("location-continue");
  const feedBack = document.getElementById("feed-back");
  const feedVisitor = document.getElementById("feed-visitor");
  const feedPager = document.getElementById("feed-pager");
  const feedCommunity = document.getElementById("feed-community");
  const feedCategory = document.getElementById("feed-category");
  const feedHeadline = document.getElementById("feed-headline");
  const feedSummary = document.getElementById("feed-summary");
  const feedMeta = document.getElementById("feed-meta");
  const feedImage = document.getElementById("feed-image");
  const feedSeeToo = document.getElementById("feed-see-too");
  const feedOpenSignal = document.getElementById("feed-open-signal");
  const feedPrev = document.getElementById("feed-prev");
  const feedNext = document.getElementById("feed-next");
  const signalSheet = document.getElementById("signal-sheet");
  const signalSheetTitle = document.getElementById("signal-sheet-title");
  const signalSheetMessage = document.getElementById("signal-sheet-message");
  const signalSheetClose = document.getElementById("signal-sheet-close");
  const boundaryBack = document.getElementById("boundary-back");
  const boundaryMeta = document.getElementById("boundary-meta");
  const boundaryLabel = document.getElementById("boundary-label");
  const boundaryTitle = document.getElementById("boundary-title");
  const boundaryLead = document.getElementById("boundary-lead");
  const accountLabel = document.getElementById("account-label");
  const accountTitle = document.getElementById("account-title");
  const accountCommunity = document.getElementById("account-community");
  const accountBody = document.getElementById("account-body");
  const accountWhyTitle = document.getElementById("account-why-title");
  const accountWhyList = document.getElementById("account-why-list");
  const accountPrivacyTitle = document.getElementById("account-privacy-title");
  const accountPrivacy = document.getElementById("account-privacy");
  const accountPrivacySecond = document.getElementById("account-privacy-second");
  const accountPrototype = document.getElementById("account-prototype");
  const accountContinue = document.getElementById("account-continue");
  const accountBack = document.getElementById("account-back");
  const emailLabel = document.getElementById("email-label");
  const emailTitle = document.getElementById("email-title");
  const emailBody = document.getElementById("email-body");
  const emailBodySecond = document.getElementById("email-body-second");
  const emailPrototype = document.getElementById("email-prototype");
  const emailFieldLabel = document.getElementById("email-field-label");
  const emailInput = document.getElementById("email-input");
  const emailError = document.getElementById("email-error");
  const emailPrivacy = document.getElementById("email-privacy");
  const emailContinue = document.getElementById("email-continue");
  const emailBack = document.getElementById("email-back");
  const codeLabel = document.getElementById("code-label");
  const codeTitle = document.getElementById("code-title");
  const codeBody = document.getElementById("code-body");
  const codeEmail = document.getElementById("code-email");
  const codeFieldLabel = document.getElementById("code-field-label");
  const codeInput = document.getElementById("code-input");
  const codePrototype = document.getElementById("code-prototype");
  const codeError = document.getElementById("code-error");
  const codeVerify = document.getElementById("code-verify");
  const codeChangeEmail = document.getElementById("code-change-email");
  const membershipInvite = document.getElementById("membership-invite");
  const inviteTitle = document.getElementById("invite-title");
  const inviteBody = document.getElementById("invite-body");
  const inviteBodySecond = document.getElementById("invite-body-second");
  const inviteContinue = document.getElementById("invite-continue");
  const inviteNotNow = document.getElementById("invite-not-now");
  const viewMembership = document.getElementById("view-membership");
  const membershipLabel = document.getElementById("membership-label");
  const membershipTitle = document.getElementById("membership-title");
  const membershipCommunity = document.getElementById("membership-community");
  const membershipBody = document.getElementById("membership-body");
  const membershipBodySecond = document.getElementById("membership-body-second");
  const membershipPrice = document.getElementById("membership-price");
  const membershipRenewal = document.getElementById("membership-renewal");
  const membershipRenewalSecond = document.getElementById(
    "membership-renewal-second"
  );
  const membershipWhyTitle = document.getElementById("membership-why-title");
  const membershipWhyList = document.getElementById("membership-why-list");
  const membershipRightsTitle = document.getElementById(
    "membership-rights-title"
  );
  const membershipRights = document.getElementById("membership-rights");
  const membershipContinue = document.getElementById("membership-continue");
  const membershipNotNow = document.getElementById("membership-not-now");
  const viewEnded = document.getElementById("view-ended");
  const endedTitle = document.getElementById("ended-title");
  const endedBody = document.getElementById("ended-body");
  const endedReturn = document.getElementById("ended-return");
  const countryInputs = Array.from(
    document.querySelectorAll('input[name="country"]')
  );

  if (
    !viewEntry ||
    !viewCountry ||
    !viewCity ||
    !viewLocation ||
    !viewFeed ||
    !viewBoundary ||
    !viewAccount ||
    !viewEmail ||
    !viewCode ||
    !learnMoreButton ||
    !enterButton ||
    !sheet ||
    !continueCountry ||
    !countryBack ||
    !cityBack ||
    !continueCity ||
    !cityOptions ||
    !cityTitle ||
    !cityLead ||
    !cityLegend ||
    !cityContext ||
    !locationBack ||
    !locationIdle ||
    !locationSuccess ||
    !locationTitle ||
    !locationCity ||
    !locationLead ||
    !locationPrivacy ||
    !locationVerify ||
    !locationStatusLabel ||
    !locationSuccessTitle ||
    !locationSuccessLead ||
    !locationContinue ||
    !feedBack ||
    !feedVisitor ||
    !feedPager ||
    !feedCommunity ||
    !feedCategory ||
    !feedHeadline ||
    !feedSummary ||
    !feedMeta ||
    !feedImage ||
    !feedSeeToo ||
    !feedOpenSignal ||
    !feedPrev ||
    !feedNext ||
    !signalSheet ||
    !signalSheetTitle ||
    !signalSheetMessage ||
    !signalSheetClose ||
    !boundaryBack ||
    !boundaryMeta ||
    !boundaryLabel ||
    !boundaryTitle ||
    !boundaryLead ||
    !accountLabel ||
    !accountTitle ||
    !accountCommunity ||
    !accountBody ||
    !accountWhyTitle ||
    !accountWhyList ||
    !accountPrivacyTitle ||
    !accountPrivacy ||
    !accountPrivacySecond ||
    !accountPrototype ||
    !accountContinue ||
    !accountBack ||
    !emailLabel ||
    !emailTitle ||
    !emailBody ||
    !emailBodySecond ||
    !emailPrototype ||
    !emailFieldLabel ||
    !emailInput ||
    !emailError ||
    !emailPrivacy ||
    !emailContinue ||
    !emailBack ||
    !codeLabel ||
    !codeTitle ||
    !codeBody ||
    !codeEmail ||
    !codeFieldLabel ||
    !codeInput ||
    !codePrototype ||
    !codeError ||
    !codeVerify ||
    !codeChangeEmail ||
    !membershipInvite ||
    !inviteTitle ||
    !inviteBody ||
    !inviteBodySecond ||
    !inviteContinue ||
    !inviteNotNow ||
    !viewMembership ||
    !membershipLabel ||
    !membershipTitle ||
    !membershipCommunity ||
    !membershipBody ||
    !membershipBodySecond ||
    !membershipPrice ||
    !membershipRenewal ||
    !membershipRenewalSecond ||
    !membershipWhyTitle ||
    !membershipWhyList ||
    !membershipRightsTitle ||
    !membershipRights ||
    !membershipContinue ||
    !membershipNotNow ||
    !viewEnded ||
    !endedTitle ||
    !endedBody ||
    !endedReturn
  ) {
    return;
  }

  const CITY_BY_COUNTRY = {
    Italy: { id: "Milano", image: "assets/cities/milano.png" },
    Germany: { id: "Munich", image: "assets/cities/munich.png" },
  };

  // Approved Experience Prototype V1 scenes (fictional content).
  const FEED_SCENES = {
    Milano: [
      {
        id: "milano-signal-1",
        category: "SPAZIO PUBBLICO",
        authorName: "Marta Rinaldi",
        observedTime: "Osservato ieri",
        area: "Città Studi",
        headline: "Marciapiede danneggiato davanti alla scuola di via Padova",
        summary:
          "Le radici hanno sollevato il marciapiede. Bambini e anziani sono costretti sulla carreggiata.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 42%",
      },
      {
        id: "milano-signal-2",
        category: "ILLUMINAZIONE",
        authorName: "Chiara Valli",
        observedTime: "Segnalato due giorni fa",
        area: "Porta Romana",
        headline: "Il percorso vicino alla scuola resta al buio la sera",
        summary:
          "Diversi lampioni non funzionano sul tratto pedonale. I residenti hanno già segnalato il Comune.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "58% 40%",
      },
      {
        id: "milano-signal-3",
        category: "LAVORI PUBBLICI",
        authorName: "Luca Ferri",
        observedTime: "Osservato questa settimana",
        area: "Lorenteggio",
        headline:
          "Il cantiere restringe il passaggio pedonale senza indicazioni chiare",
        summary:
          "Il percorso temporaneo è stretto e poco segnalato. Servono tempi chiari e un passaggio più sicuro.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
      },
    ],
    Munich: [
      {
        id: "munich-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Anna Weber",
        observedTime: "Gestern beobachtet",
        area: "Schwabing",
        headline: "Der Gehweg ist hier kaum noch sicher passierbar.",
        summary:
          "Unebene Platten verengen den Gehweg. Menschen mit Kinderwagen oder Rollstuhl müssen auf die Straße ausweichen.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 42%",
      },
      {
        id: "munich-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Jonas Keller",
        observedTime: "Vor zwei Tagen gemeldet",
        area: "Haidhausen",
        headline: "Mehrere Straßenlaternen bleiben am Abend dunkel.",
        summary:
          "Der Fußweg zwischen Wohnhäusern und Haltestelle ist kaum beleuchtet. Anwohner haben die Störung bereits gemeldet.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "58% 40%",
      },
      {
        id: "munich-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Lukas Brandt",
        observedTime: "Diese Woche beobachtet",
        area: "Sendling",
        headline: "Der provisorische Weg ist zu eng und schlecht ausgeschildert.",
        summary:
          "Fußgänger und Radfahrer teilen sich einen schmalen Durchgang. Es fehlen klare Hinweise und ein sicherer Übergang.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
      },
    ],
  };

  const CITY_COPY = {
    en: {
      title: "Choose your city",
      lead: "TOWN connects you to one verified local community.",
      cityLegend: "City",
      back: "Back",
      continue: "Continue",
      cityNames: { Milano: "Milano", Munich: "Munich" },
      context: {
        Italy: "Country: Italy",
        Germany: "Country: Germany",
      },
    },
    it: {
      title: "Seleziona la tua città",
      lead: "TOWN ti collega a una sola comunità locale verificata.",
      cityLegend: "Città",
      back: "Indietro",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "Munich" },
      context: {
        Italy: "Paese: Italia",
        Germany: "Paese: Germania",
      },
    },
    de: {
      title: "Wähle deine Stadt",
      lead: "TOWN verbindet dich mit einer einzigen verifizierten lokalen Gemeinschaft.",
      cityLegend: "Stadt",
      back: "Zurück",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
      context: {
        Italy: "Land: Italien",
        Germany: "Land: Deutschland",
      },
    },
  };

  const LOCATION_COPY = {
    it: {
      back: "Indietro",
      title: "Conferma la tua comunità locale",
      lead: "TOWN è locale. La partecipazione appartiene a chi è connesso a questa comunità.",
      privacy:
        "Questo prototipo non esegue una verifica GPS reale. In questa fase non vengono raccolti né memorizzati dati di posizione reali.",
      verify: "Simula la verifica",
      statusLabel: "Solo prototipo",
      successTitle: "Posizione verificata per {city}",
      successLead:
        "La tua comunità locale è confermata in questo prototipo. Non è stato usato alcun GPS reale.",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      back: "Zurück",
      title: "Bestätige deine lokale Gemeinschaft",
      lead: "TOWN ist lokal. Teilnahme gehört zu den Menschen, die mit dieser Gemeinschaft verbunden sind.",
      privacy:
        "Dieser Prototyp führt keine echte GPS-Prüfung durch. In diesem Schritt werden keine echten Standortdaten erfasst oder gespeichert.",
      verify: "Prüfung simulieren",
      statusLabel: "Nur Prototyp",
      successTitle: "Standort für {city} bestätigt",
      successLead:
        "Deine lokale Gemeinschaft ist in diesem Prototyp bestätigt. Es wurde kein echtes GPS verwendet.",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const FEED_COPY = {
    it: {
      back: "Indietro",
      visitor: "Visitatore",
      seeThisToo: "LO VEDO ANCH’IO",
      openSignal: "Apri segnale",
      openSignalTitle: "Dettaglio del segnale",
      openSignalMessage:
        "I dettagli di questo segnale saranno aggiunti nella prossima fase di TOWN.",
      openSignalClose: "Chiudi",
      previous: "Precedente",
      next: "Successiva",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      back: "Zurück",
      visitor: "Besucher",
      seeThisToo: "ICH SEHE DAS AUCH",
      openSignal: "Signal öffnen",
      openSignalTitle: "Signaldetails",
      openSignalMessage:
        "Weitere Informationen zu diesem Signal werden in der nächsten TOWN-Phase hinzugefügt.",
      openSignalClose: "Schließen",
      previous: "Zurück",
      next: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const MEMBERSHIP_COPY = {
    it: {
      inviteTitle: "Ti sta a cuore ciò che accade nella tua comunità.",
      inviteBody:
        "Per confermare questo segnale e diventare parte della soluzione, unisciti a TOWN come membro locale verificato.",
      inviteBodySecond:
        "TOWN è costruito intorno a persone reali della stessa comunità — non su account anonimi, follower o popolarità sui social.",
      continue: "Continua",
      notNow: "Non ora",
      label: "MEMBERSHIP LOCALE",
      title: "Entra nella comunità di {city}.",
      body: "TOWN è uno spazio civico locale per persone reali.",
      bodySecond:
        "Per partecipare servono un account, una verifica locale valida e un abbonamento attivo.",
      price: "€12 all’anno",
      renewal: "Rinnovo annuale.",
      renewalSecond:
        "Puoi annullare in qualsiasi momento. L’accesso resta attivo fino alla fine del periodo già pagato.",
      whyTitle: "Perché esiste la membership",
      why: [
        "Persone reali nella stessa comunità",
        "Partecipazione locale verificata",
        "Meno bot e account fantasma",
        "Spazio civico calmo, senza pubblicità",
      ],
      rightsTitle: "Con una membership attiva puoi:",
      rights:
        "Confermare segnali, pubblicare, commentare e partecipare alle decisioni della comunità.",
      endedTitle:
        "TOWN è per chi è pronto a partecipare alla propria comunità.",
      endedBody: "Puoi tornare quando sei pronto a farne parte.",
      endedReturn: "Torna all’ingresso TOWN",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      inviteTitle: "Dir ist wichtig, was in deiner Gemeinschaft geschieht.",
      inviteBody:
        "Um dieses Signal zu bestätigen und Teil der Lösung zu werden, tritt TOWN als verifiziertes lokales Mitglied bei.",
      inviteBodySecond:
        "TOWN wird von echten Menschen aus derselben Gemeinschaft getragen — nicht von anonymen Konten, Followern oder Popularität in sozialen Medien.",
      continue: "Weiter",
      notNow: "Noch nicht",
      label: "LOKALE MITGLIEDSCHAFT",
      title: "Werde Mitglied in deiner Münchner Gemeinschaft.",
      body: "TOWN ist ein lokaler zivilgesellschaftlicher Raum für echte Menschen.",
      bodySecond:
        "Für die Teilnahme brauchst du ein Konto, eine gültige lokale Verifizierung und eine aktive Mitgliedschaft.",
      price: "€12 pro Jahr",
      renewal: "Jährliche Verlängerung.",
      renewalSecond:
        "Du kannst jederzeit kündigen. Der Zugang bleibt bis zum Ende des bereits bezahlten Zeitraums aktiv.",
      whyTitle: "Warum es die Mitgliedschaft gibt",
      why: [
        "Echte Menschen in derselben Gemeinschaft",
        "Verifizierte lokale Teilnahme",
        "Weniger Bots und Geisterkonten",
        "Ruhiger zivilgesellschaftlicher Raum ohne Werbung",
      ],
      rightsTitle: "Mit einer aktiven Mitgliedschaft kannst du:",
      rights:
        "Signale bestätigen, Beiträge veröffentlichen, kommentieren und an Entscheidungen der Gemeinschaft teilnehmen.",
      endedTitle:
        "TOWN ist für Menschen, die bereit sind, sich an ihrer Gemeinschaft zu beteiligen.",
      endedBody:
        "Du kannst zurückkehren, wenn du bereit bist, ein Teil davon zu sein.",
      endedReturn: "Zurück zum TOWN-Eingang",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const ACCOUNT_COPY = {
    it: {
      label: "ACCOUNT PERSONALE",
      title: "Crea il tuo account TOWN.",
      community: "Comunità: {city}",
      body:
        "Prima di chiedere qualsiasi informazione personale, ti spieghiamo perché serve un account.",
      whyTitle: "Il tuo account TOWN servirà a:",
      why: [
        "identificare una sola persona reale;",
        "conservare la comunità locale verificata;",
        "consentire l’accesso su web e mobile;",
        "proteggere la partecipazione da bot e account fantasma.",
      ],
      privacyTitle: "Privacy",
      privacy:
        "Verranno richieste solo le informazioni essenziali per l’account.",
      privacySecond:
        "Nel flusso approvato non è richiesta una password.",
      prototype:
        "In questo prototipo il sistema reale di account non è attivo.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "PERSÖNLICHES KONTO",
      title: "Erstelle dein TOWN-Konto.",
      community: "Gemeinschaft: {city}",
      body:
        "Bevor wir persönliche Angaben erfragen, erklären wir, warum ein Konto nötig ist.",
      whyTitle: "Dein TOWN-Konto dient dazu:",
      why: [
        "eine einzige reale Person zu kennzeichnen;",
        "die verifizierte lokale Gemeinschaft zu bewahren;",
        "den Zugang über Web und Mobile zu unterstützen;",
        "die Teilnahme vor Bots und Geisterkonten zu schützen.",
      ],
      privacyTitle: "Privatsphäre",
      privacy:
        "Es werden nur die für das Konto wesentlichen Angaben erfragt.",
      privacySecond:
        "Im genehmigten Ablauf ist kein Passwort erforderlich.",
      prototype:
        "In diesem Prototyp ist das reale Kontosystem nicht aktiv.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const EMAIL_COPY = {
    it: {
      label: "CREA IL TUO ACCOUNT",
      title: "Inserisci la tua email.",
      body: "Normalmente ti invieremmo un codice di verifica di 6 cifre.",
      bodySecond: "Non serve una password.",
      prototype:
        "In questo prototipo non viene inviata alcuna email e non viene creato un account reale.",
      fieldLabel: "Indirizzo email",
      placeholder: "nome@esempio.it",
      privacy:
        "Useremo questa email per verificare il tuo account, inviarti comunicazioni essenziali e aiutarti a recuperare l’accesso.",
      invalid: "Inserisci un indirizzo email valido.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "KONTO ERSTELLEN",
      title: "Gib deine E-Mail-Adresse ein.",
      body: "Normalerweise würden wir dir einen sechsstelligen Bestätigungscode senden.",
      bodySecond: "Du brauchst kein Passwort.",
      prototype:
        "In diesem Prototyp wird keine E-Mail gesendet und kein reales Konto erstellt.",
      fieldLabel: "E-Mail-Adresse",
      placeholder: "name@beispiel.de",
      privacy:
        "Wir verwenden diese E-Mail-Adresse, um dein Konto zu bestätigen, dir notwendige Mitteilungen zu senden und dir bei der Wiederherstellung des Zugangs zu helfen.",
      invalid: "Gib eine gültige E-Mail-Adresse ein.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const CODE_COPY = {
    it: {
      label: "VERIFICA EMAIL",
      title: "Controlla la tua email.",
      body: "Abbiamo inviato un codice di 6 cifre a:",
      fieldLabel: "Codice di verifica",
      prototype: "Nel prototipo, inserisci 123456 per continuare.",
      invalid: "Il codice non è corretto.",
      verify: "Verifica",
      changeEmail: "Cambia email",
      boundaryLabel: "Confine Screen 10",
      boundaryTitle:
        "L’introduzione alla passkey non è ancora implementata.",
      boundaryLead:
        "Questo è un punto di stop deliberato dopo la verifica email. Lo Screen 10 non è stato costruito.",
      boundaryMeta:
        "Selezionato: {country} · {city}{verified}{email}",
      boundaryVerified: " · verificato (mock)",
      boundaryEmail: " · email: {value}",
      boundaryCountry: { Italy: "Italia", Germany: "Germania" },
      boundaryBack: "Torna al codice di verifica",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "E-MAIL BESTÄTIGEN",
      title: "Prüfe deine E-Mails.",
      body: "Wir haben einen sechsstelligen Code gesendet an:",
      fieldLabel: "Bestätigungscode",
      prototype: "Gib im Prototyp 123456 ein, um fortzufahren.",
      invalid: "Der Code ist nicht korrekt.",
      verify: "Bestätigen",
      changeEmail: "E-Mail-Adresse ändern",
      boundaryLabel: "Screen-10-Grenze",
      boundaryTitle:
        "Die Passkey-Einführung ist noch nicht implementiert.",
      boundaryLead:
        "Dies ist ein bewusster Halt nach der E-Mail-Bestätigung. Screen 10 wurde nicht gebaut.",
      boundaryMeta:
        "Ausgewählt: {country} · {city}{verified}{email}",
      boundaryVerified: " · verifiziert (Mock)",
      boundaryEmail: " · E-Mail: {value}",
      boundaryCountry: { Italy: "Italien", Germany: "Deutschland" },
      boundaryBack: "Zurück zum Bestätigungscode",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PROTOTYPE_CODE = "123456";

  let lastFocus = null;
  let selectedCountry = null;
  let selectedCity = null;
  let locationVerified = false;
  let feedIndex = 0;
  let enteredEmail = "";

  const titles = {
    entry: "TOWN — Entry",
    country: "TOWN — Choose your country",
    city: "TOWN — Choose your city",
    location: "TOWN — Confirm local community",
    feed: "TOWN — Local feed",
    membership: "TOWN — Membership",
    ended: "TOWN — Experience end",
    account: "TOWN — Account setup",
    email: "TOWN — Email entry",
    code: "TOWN — Verification code",
    boundary: "TOWN — Screen 10 boundary",
  };

  function parseRoute() {
    const raw = (window.location.hash || "").replace(/^#\/?/, "");
    if (raw.startsWith("country")) return "country";
    if (raw.startsWith("city")) return "city";
    if (raw.startsWith("location")) return "location";
    if (raw.startsWith("feed")) return "feed";
    if (raw.startsWith("membership")) return "membership";
    if (raw.startsWith("ended")) return "ended";
    if (raw.startsWith("account")) return "account";
    if (raw.startsWith("email")) return "email";
    if (raw.startsWith("code")) return "code";
    if (raw.startsWith("boundary")) return "boundary";
    return "entry";
  }

  function communityLanguage() {
    if (selectedCountry === "Italy" && selectedCity === "Milano") return "it";
    if (selectedCountry === "Germany" && selectedCity === "Munich") return "de";
    return "en";
  }

  function cityDisplayName(lang) {
    const names =
      (LOCATION_COPY[lang] && LOCATION_COPY[lang].cityNames) ||
      CITY_COPY.en.cityNames;
    return names[selectedCity] || selectedCity || "";
  }

  function currentScenes() {
    return FEED_SCENES[selectedCity] || [];
  }

  function applyCityCopy() {
    const lang = communityLanguage();
    const copy = CITY_COPY[lang];
    cityTitle.textContent = copy.title;
    cityLead.textContent = copy.lead;
    cityLegend.textContent = copy.cityLegend;
    cityBack.textContent = copy.back;
    continueCity.textContent = copy.continue;
    document.documentElement.lang = lang === "en" ? "en" : lang;

    if (selectedCountry) {
      cityContext.hidden = false;
      cityContext.textContent = copy.context[selectedCountry] || "";
    } else {
      cityContext.hidden = true;
      cityContext.textContent = "";
    }

    const label = cityOptions.querySelector(".country__option-label");
    if (label && selectedCountry) {
      const cityId = CITY_BY_COUNTRY[selectedCountry].id;
      label.textContent = copy.cityNames[cityId];
    }
  }

  function applyLocationCopy() {
    const lang = communityLanguage();
    const copy = LOCATION_COPY[lang] || LOCATION_COPY.it;
    const cityName = cityDisplayName(lang);

    locationBack.textContent = copy.back;
    locationTitle.textContent = copy.title;
    locationCity.textContent = cityName;
    locationLead.textContent = copy.lead;
    locationPrivacy.textContent = copy.privacy;
    locationVerify.textContent = copy.verify;
    locationStatusLabel.textContent = copy.statusLabel;
    locationSuccessTitle.textContent = copy.successTitle.replace(
      "{city}",
      cityName
    );
    locationSuccessLead.textContent = copy.successLead;
    locationContinue.textContent = copy.continue;
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function syncLocationState() {
    locationIdle.hidden = locationVerified;
    locationSuccess.hidden = !locationVerified;
  }

  function applyFeedCopyChrome() {
    const lang = communityLanguage();
    const copy = FEED_COPY[lang] || FEED_COPY.it;
    feedBack.textContent = copy.back;
    feedVisitor.textContent = copy.visitor;
    feedSeeToo.textContent = copy.seeThisToo;
    feedOpenSignal.textContent = copy.openSignal;
    feedPrev.textContent = copy.previous;
    feedNext.textContent = copy.next;
    signalSheetTitle.textContent = copy.openSignalTitle;
    signalSheetMessage.textContent = copy.openSignalMessage;
    signalSheetClose.textContent = copy.openSignalClose;
    feedCommunity.textContent = cityDisplayName(lang);
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function renderFeedScene() {
    const scenes = currentScenes();
    if (!scenes.length) return;
    if (feedIndex < 0) feedIndex = 0;
    if (feedIndex > scenes.length - 1) feedIndex = scenes.length - 1;

    const scene = scenes[feedIndex];
    feedImage.src = scene.image;
    feedImage.style.objectPosition = scene.focus;
    feedCategory.textContent = scene.category;
    feedHeadline.textContent = scene.headline;
    feedSummary.textContent = scene.summary;
    feedMeta.textContent = scene.authorName + " · " + scene.observedTime + " · " + scene.area;
    feedPager.textContent = feedIndex + 1 + " / " + scenes.length;
    feedPrev.disabled = feedIndex <= 0;
    feedNext.disabled = feedIndex >= scenes.length - 1;
  }

  function renderCityOptions(options) {
    const preserve = options && options.preserveSelection;
    const previousCity = preserve ? selectedCity : null;

    cityOptions.innerHTML = "";
    if (!preserve) {
      selectedCity = null;
      continueCity.disabled = true;
    }

    if (!selectedCountry || !CITY_BY_COUNTRY[selectedCountry]) {
      return;
    }

    const city = CITY_BY_COUNTRY[selectedCountry];
    const copy = CITY_COPY[communityLanguage()];
    const optionId = "city-" + city.id.toLowerCase();

    const label = document.createElement("label");
    label.className = "country__option";
    label.innerHTML =
      '<input type="radio" name="city" value="' +
      city.id +
      '" id="' +
      optionId +
      '" />' +
      '<span class="country__option-face">' +
      '<img class="country__flag city__thumb" src="' +
      city.image +
      '" alt="" width="28" height="20" decoding="async" />' +
      '<span class="country__option-label">' +
      copy.cityNames[city.id] +
      "</span>" +
      "</span>";

    cityOptions.appendChild(label);

    const input = label.querySelector("input");
    input.addEventListener("change", () => {
      selectedCity = input.checked ? input.value : null;
      continueCity.disabled = !selectedCity;
      applyCityCopy();
    });

    if (preserve && previousCity === city.id) {
      input.checked = true;
      selectedCity = previousCity;
      continueCity.disabled = false;
    }
  }


  function membershipLang() {
    const lang = communityLanguage();
    return lang === "de" ? "de" : "it";
  }

  function applyInviteCopy() {
    const copy = MEMBERSHIP_COPY[membershipLang()];
    inviteTitle.textContent = copy.inviteTitle;
    inviteBody.textContent = copy.inviteBody;
    inviteBodySecond.textContent = copy.inviteBodySecond;
    inviteContinue.textContent = copy.continue;
    inviteNotNow.textContent = copy.notNow;
  }

  function applyMembershipCopy() {
    const copy = MEMBERSHIP_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    membershipLabel.textContent = copy.label;
    membershipTitle.textContent =
      selectedCity === "Munich"
        ? copy.title
        : copy.title.replace("{city}", cityName);
    membershipCommunity.textContent = cityName;
    membershipBody.textContent = copy.body;
    membershipBodySecond.textContent = copy.bodySecond;
    membershipPrice.textContent = copy.price;
    membershipRenewal.textContent = copy.renewal;
    membershipRenewalSecond.textContent = copy.renewalSecond;
    membershipWhyTitle.textContent = copy.whyTitle;
    membershipWhyList.innerHTML = "";
    copy.why.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      membershipWhyList.appendChild(li);
    });
    membershipRightsTitle.textContent = copy.rightsTitle;
    membershipRights.textContent = copy.rights;
    membershipContinue.textContent = copy.continue;
    membershipNotNow.textContent = copy.notNow;
    document.documentElement.lang = membershipLang();
  }

  function applyEndedCopy() {
    const copy = MEMBERSHIP_COPY[membershipLang()];
    endedTitle.textContent = copy.endedTitle;
    endedBody.textContent = copy.endedBody;
    endedReturn.textContent = copy.endedReturn;
    document.documentElement.lang = membershipLang();
  }

  function applyAccountCopy() {
    const copy = ACCOUNT_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    accountLabel.textContent = copy.label;
    accountTitle.textContent = copy.title;
    accountCommunity.textContent = copy.community.replace("{city}", cityName);
    accountBody.textContent = copy.body;
    accountWhyTitle.textContent = copy.whyTitle;
    accountWhyList.innerHTML = "";
    copy.why.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      accountWhyList.appendChild(li);
    });
    accountPrivacyTitle.textContent = copy.privacyTitle;
    accountPrivacy.textContent = copy.privacy;
    accountPrivacySecond.textContent = copy.privacySecond;
    accountPrototype.textContent = copy.prototype;
    accountContinue.textContent = copy.continue;
    accountBack.textContent = copy.back;
    document.documentElement.lang = membershipLang();
  }

  function applyEmailCopy() {
    const copy = EMAIL_COPY[membershipLang()];
    emailLabel.textContent = copy.label;
    emailTitle.textContent = copy.title;
    emailBody.textContent = copy.body;
    emailBodySecond.textContent = copy.bodySecond;
    emailPrototype.textContent = copy.prototype;
    emailFieldLabel.textContent = copy.fieldLabel;
    emailInput.placeholder = copy.placeholder;
    emailPrivacy.textContent = copy.privacy;
    emailContinue.textContent = copy.continue;
    emailBack.textContent = copy.back;
    if (enteredEmail && emailInput.value !== enteredEmail) {
      emailInput.value = enteredEmail;
    }
    syncEmailContinue();
    document.documentElement.lang = membershipLang();
  }

  function isValidEmail(value) {
    return EMAIL_PATTERN.test(value);
  }

  function syncEmailContinue() {
    const copy = EMAIL_COPY[membershipLang()];
    const value = (emailInput.value || "").trim();
    const valid = isValidEmail(value);
    emailContinue.disabled = !valid;
    if (!value) {
      emailError.hidden = true;
      emailError.textContent = "";
      return;
    }
    if (!valid) {
      emailError.hidden = false;
      emailError.textContent = copy.invalid;
      return;
    }
    emailError.hidden = true;
    emailError.textContent = "";
  }

  function applyCodeCopy() {
    const copy = CODE_COPY[membershipLang()];
    codeLabel.textContent = copy.label;
    codeTitle.textContent = copy.title;
    codeBody.textContent = copy.body;
    codeEmail.textContent = enteredEmail || "";
    codeFieldLabel.textContent = copy.fieldLabel;
    codePrototype.textContent = copy.prototype;
    codeVerify.textContent = copy.verify;
    codeChangeEmail.textContent = copy.changeEmail;
    syncCodeVerify();
    document.documentElement.lang = membershipLang();
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
  }

  function syncCodeVerify() {
    const copy = CODE_COPY[membershipLang()];
    const value = digitsOnly(codeInput.value);
    if (codeInput.value !== value) {
      codeInput.value = value;
    }
    const complete = value.length === 6;
    const accepted = value === PROTOTYPE_CODE;
    codeVerify.disabled = !accepted;
    if (!complete) {
      codeError.hidden = true;
      codeError.textContent = "";
      return;
    }
    if (!accepted) {
      codeError.hidden = false;
      codeError.textContent = copy.invalid;
      return;
    }
    codeError.hidden = true;
    codeError.textContent = "";
  }

  function applyBoundaryCopy() {
    const copy = CODE_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    const countryName =
      (copy.boundaryCountry && copy.boundaryCountry[selectedCountry]) ||
      selectedCountry ||
      "";
    boundaryLabel.textContent = copy.boundaryLabel;
    boundaryTitle.textContent = copy.boundaryTitle;
    boundaryLead.textContent = copy.boundaryLead;
    boundaryBack.textContent = copy.boundaryBack;
    if (selectedCountry && selectedCity) {
      const emailPart = enteredEmail
        ? copy.boundaryEmail.replace("{value}", enteredEmail)
        : "";
      boundaryMeta.hidden = false;
      boundaryMeta.textContent = copy.boundaryMeta
        .replace("{country}", countryName)
        .replace("{city}", cityName)
        .replace(
          "{verified}",
          locationVerified ? copy.boundaryVerified : ""
        )
        .replace("{email}", emailPart);
    } else {
      boundaryMeta.hidden = true;
      boundaryMeta.textContent = "";
    }
    document.documentElement.lang = membershipLang();
  }

  function openInvite() {
    closeSignalSheet();
    applyInviteCopy();
    membershipInvite.hidden = false;
    document.body.style.overflow = "hidden";
    inviteContinue.focus();
  }

  function closeInvite() {
    if (membershipInvite.hidden) return;
    membershipInvite.hidden = true;
    document.body.style.overflow = "";
  }

  function resetVisitorSession() {
    selectedCountry = null;
    selectedCity = null;
    locationVerified = false;
    feedIndex = 0;
    enteredEmail = "";
    emailInput.value = "";
    emailError.hidden = true;
    emailError.textContent = "";
    emailContinue.disabled = true;
    codeInput.value = "";
    codeError.hidden = true;
    codeError.textContent = "";
    codeVerify.disabled = true;
    countryInputs.forEach((input) => {
      input.checked = false;
    });
    cityOptions.innerHTML = "";
    continueCountry.disabled = true;
    continueCity.disabled = true;
    locationIdle.hidden = false;
    locationSuccess.hidden = true;
    closeInvite();
    closeSignalSheet();
    closeSheet();
  }

  function showView(name) {
    viewEntry.hidden = name !== "entry";
    viewCountry.hidden = name !== "country";
    viewCity.hidden = name !== "city";
    viewLocation.hidden = name !== "location";
    viewFeed.hidden = name !== "feed";
    viewMembership.hidden = name !== "membership";
    viewEnded.hidden = name !== "ended";
    viewAccount.hidden = name !== "account";
    viewEmail.hidden = name !== "email";
    viewCode.hidden = name !== "code";
    viewBoundary.hidden = name !== "boundary";
    document.title = titles[name] || titles.entry;
    document.body.classList.toggle("page-country", name === "country");
    document.body.classList.toggle("page-city", name === "city");
    document.body.classList.toggle("page-location", name === "location");
    document.body.classList.toggle("page-feed", name === "feed");
    document.body.classList.toggle("page-membership", name === "membership");
    document.body.classList.toggle("page-ended", name === "ended");
    document.body.classList.toggle("page-account", name === "account");
    document.body.classList.toggle("page-email", name === "email");
    document.body.classList.toggle("page-code", name === "code");
    document.body.classList.toggle("page-boundary", name === "boundary");

    if (name !== "feed") {
      closeInvite();
    }

    if (name === "city") applyCityCopy();
    if (name === "location") {
      applyLocationCopy();
      syncLocationState();
    }
    if (name === "feed") {
      applyFeedCopyChrome();
      renderFeedScene();
    }
    if (name === "membership") {
      applyMembershipCopy();
    }
    if (name === "ended") {
      applyEndedCopy();
    }
    if (name === "account") {
      applyAccountCopy();
    }
    if (name === "email") {
      applyEmailCopy();
    }
    if (name === "code") {
      applyCodeCopy();
    }
    if (name === "boundary") {
      applyBoundaryCopy();
    }
  }

  function go(route) {
    if (route === "city" && !selectedCountry) route = "country";
    if (
      (route === "location" ||
        route === "feed" ||
        route === "membership" ||
        route === "ended" ||
        route === "account" ||
        route === "email" ||
        route === "code" ||
        route === "boundary") &&
      (!selectedCountry || !selectedCity)
    ) {
      route = selectedCountry ? "city" : "country";
    }
    if (
      (route === "feed" ||
        route === "membership" ||
        route === "ended" ||
        route === "account" ||
        route === "email" ||
        route === "code" ||
        route === "boundary") &&
      !locationVerified
    ) {
      route = "location";
    }
    if ((route === "code" || route === "boundary") && !enteredEmail) {
      route = "email";
    }

    if (route === "entry") {
      const base = window.location.href.split("#")[0];
      if (window.location.hash) {
        history.pushState(null, "", base);
      }
      showView("entry");
      return;
    }

    const target = "#/" + route;
    if (window.location.hash !== target) {
      window.location.hash = "/" + route;
    }
    showView(route);
  }

  function syncCountryContinue() {
    const chosen = countryInputs.find((input) => input.checked);
    const nextCountry = chosen ? chosen.value : null;
    if (nextCountry !== selectedCountry) {
      selectedCountry = nextCountry;
      selectedCity = null;
      locationVerified = false;
      feedIndex = 0;
      renderCityOptions();
    } else {
      selectedCountry = nextCountry;
    }
    continueCountry.disabled = !selectedCountry;
  }

  function ensureCityOptions(preserveSelection) {
    if (!selectedCountry) return;
    if (cityOptions.childElementCount === 0) {
      renderCityOptions({ preserveSelection: !!preserveSelection });
    } else if (preserveSelection && selectedCity) {
      const input = cityOptions.querySelector(
        'input[value="' + selectedCity + '"]'
      );
      if (input) {
        input.checked = true;
        continueCity.disabled = false;
      }
    }
  }

  function closeSignalSheet() {
    if (signalSheet.hidden) return;
    signalSheet.hidden = true;
    document.body.style.overflow = "";
  }

  function openSignalSheet() {
    applyFeedCopyChrome();
    signalSheet.hidden = false;
    document.body.style.overflow = "hidden";
    signalSheetClose.focus();
  }

  function render() {
    const route = parseRoute();
    if (
      (route === "city" ||
        route === "location" ||
        route === "feed" ||
        route === "membership" ||
        route === "ended" ||
        route === "account" ||
        route === "email" ||
        route === "code" ||
        route === "boundary") &&
      !selectedCountry
    ) {
      syncCountryContinue();
    }
    if (route === "city") ensureCityOptions(true);
    if (route === "city" && !selectedCountry) {
      go("country");
      return;
    }
    if (
      (route === "location" ||
        route === "feed" ||
        route === "membership" ||
        route === "ended" ||
        route === "account" ||
        route === "email" ||
        route === "code" ||
        route === "boundary") &&
      (!selectedCountry || !selectedCity)
    ) {
      go(selectedCountry ? "city" : "country");
      return;
    }
    if (
      (route === "feed" ||
        route === "membership" ||
        route === "ended" ||
        route === "account" ||
        route === "email" ||
        route === "code" ||
        route === "boundary") &&
      !locationVerified
    ) {
      go("location");
      return;
    }
    showView(route);
  }

  const focusableSelector =
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
    );
  }

  function openSheet() {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = sheet.querySelector(".sheet__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  learnMoreButton.addEventListener("click", openSheet);
  sheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-sheet]")) closeSheet();
  });

  signalSheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-signal]")) closeSignalSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!signalSheet.hidden) {
        event.preventDefault();
        closeSignalSheet();
        return;
      }
      if (!membershipInvite.hidden) {
        // Escape does not dismiss the invitation — Not now is the exit.
        event.preventDefault();
        return;
      }
      if (!sheet.hidden) {
        event.preventDefault();
        closeSheet();
      }
    }
  });

  enterButton.addEventListener("click", () => {
    closeSheet();
    go("country");
  });

  countryBack.addEventListener("click", () => {
    go("entry");
  });

  countryInputs.forEach((input) => {
    input.addEventListener("change", syncCountryContinue);
  });

  continueCountry.addEventListener("click", () => {
    if (!selectedCountry) return;
    locationVerified = false;
    feedIndex = 0;
    renderCityOptions();
    applyCityCopy();
    go("city");
  });

  cityBack.addEventListener("click", () => {
    go("country");
  });

  continueCity.addEventListener("click", () => {
    if (!selectedCountry || !selectedCity) return;
    locationVerified = false;
    feedIndex = 0;
    go("location");
  });

  locationBack.addEventListener("click", () => {
    ensureCityOptions(true);
    go("city");
  });

  locationVerify.addEventListener("click", () => {
    // Mock-only verification. No device location access or network calls.
    locationVerified = true;
    applyLocationCopy();
    syncLocationState();
  });

  locationContinue.addEventListener("click", () => {
    if (!locationVerified) return;
    feedIndex = 0;
    go("feed");
  });

  feedBack.addEventListener("click", () => {
    closeSignalSheet();
    go("location");
  });

  feedPrev.addEventListener("click", () => {
    if (feedIndex <= 0) return;
    feedIndex -= 1;
    renderFeedScene();
  });

  feedNext.addEventListener("click", () => {
    const scenes = currentScenes();
    if (feedIndex >= scenes.length - 1) return;
    feedIndex += 1;
    renderFeedScene();
  });

  feedSeeToo.addEventListener("click", () => {
    closeSignalSheet();
    // Screen 06 stage 1: contextual invitation over originating signal.
    openInvite();
  });

  inviteContinue.addEventListener("click", () => {
    closeInvite();
    go("membership");
  });

  inviteNotNow.addEventListener("click", () => {
    closeInvite();
    go("ended");
  });

  membershipContinue.addEventListener("click", () => {
    go("account");
  });

  membershipNotNow.addEventListener("click", () => {
    go("ended");
  });

  endedReturn.addEventListener("click", () => {
    resetVisitorSession();
    go("entry");
  });

  feedOpenSignal.addEventListener("click", () => {
    openSignalSheet();
  });

  accountContinue.addEventListener("click", () => {
    go("email");
  });

  accountBack.addEventListener("click", () => {
    go("membership");
  });

  emailInput.addEventListener("input", () => {
    syncEmailContinue();
  });

  emailContinue.addEventListener("click", () => {
    const value = (emailInput.value || "").trim();
    if (!isValidEmail(value)) {
      syncEmailContinue();
      return;
    }
    enteredEmail = value;
    codeInput.value = "";
    codeError.hidden = true;
    codeError.textContent = "";
    go("code");
  });

  emailBack.addEventListener("click", () => {
    enteredEmail = (emailInput.value || "").trim();
    go("account");
  });

  codeInput.addEventListener("input", () => {
    syncCodeVerify();
  });

  codeVerify.addEventListener("click", () => {
    const value = digitsOnly(codeInput.value);
    if (value !== PROTOTYPE_CODE) {
      syncCodeVerify();
      return;
    }
    // Screen 10 boundary only — passkey introduction is not built.
    go("boundary");
  });

  codeChangeEmail.addEventListener("click", () => {
    go("email");
  });

  boundaryBack.addEventListener("click", () => {
    go("code");
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", render);
  syncCountryContinue();
  render();
})();
