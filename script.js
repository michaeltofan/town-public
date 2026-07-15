(() => {
  const viewEntry = document.getElementById("view-entry");
  const viewCountry = document.getElementById("view-country");
  const viewCity = document.getElementById("view-city");
  const viewLocation = document.getElementById("view-location");
  const viewFeed = document.getElementById("view-feed");
  const viewAccount = document.getElementById("view-account");
  const viewEmail = document.getElementById("view-email");
  const viewCode = document.getElementById("view-code");
  const viewPasskey = document.getElementById("view-passkey");
  const viewReady = document.getElementById("view-ready");
  const viewPayment = document.getElementById("view-payment");
  const viewActive = document.getElementById("view-active");
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
  const feedArea = document.getElementById("feed-area");
  const feedSummary = document.getElementById("feed-summary");
  const feedMeta = document.getElementById("feed-meta");
  const feedImage = document.getElementById("feed-image");
  const feedSeeToo = document.getElementById("feed-see-too");
  const feedOpenSignal = document.getElementById("feed-open-signal");
  const feedPrev = document.getElementById("feed-prev");
  const feedNext = document.getElementById("feed-next");
  const signalDetail = document.getElementById("signal-detail");
  const detailImage = document.getElementById("detail-image");
  const detailClose = document.getElementById("detail-close");
  const detailUserStatus = document.getElementById("detail-user-status");
  const detailCommunity = document.getElementById("detail-community");
  const detailCategory = document.getElementById("detail-category");
  const detailHeadline = document.getElementById("detail-headline");
  const detailMeta = document.getElementById("detail-meta");
  const detailCivicStatus = document.getElementById("detail-civic-status");
  const detailDescription = document.getElementById("detail-description");
  const detailWhyLabel = document.getElementById("detail-why-label");
  const detailWhy = document.getElementById("detail-why");
  const detailWhoLabel = document.getElementById("detail-who-label");
  const detailWho = document.getElementById("detail-who");
  const detailUpdateLabel = document.getElementById("detail-update-label");
  const detailUpdate = document.getElementById("detail-update");
  const detailStatusLabel = document.getElementById("detail-status-label");
  const detailStatusNote = document.getElementById("detail-status-note");
  const detailSeeToo = document.getElementById("detail-see-too");
  const detailSeeTooDone = document.getElementById("detail-see-too-done");
  const detailDoneTitle = document.getElementById("detail-done-title");
  const detailDoneNote = document.getElementById("detail-done-note");
  const feedSeeTooDone = document.getElementById("feed-see-too-done");
  const feedDoneTitle = document.getElementById("feed-done-title");
  const feedDoneNote = document.getElementById("feed-done-note");
  const activeLabel = document.getElementById("active-label");
  const activeTitle = document.getElementById("active-title");
  const activeCommunity = document.getElementById("active-community");
  const activeMemberStatus = document.getElementById("active-member-status");
  const activeBody = document.getElementById("active-body");
  const activeBodySecond = document.getElementById("active-body-second");
  const activePrototype = document.getElementById("active-prototype");
  const activeReturn = document.getElementById("active-return");
  const activeBack = document.getElementById("active-back");
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
  const passkeyIntro = document.getElementById("passkey-intro");
  const passkeySuccess = document.getElementById("passkey-success");
  const passkeyLabel = document.getElementById("passkey-label");
  const passkeyTitle = document.getElementById("passkey-title");
  const passkeyBody = document.getElementById("passkey-body");
  const passkeyBodySecond = document.getElementById("passkey-body-second");
  const passkeyMethodsTitle = document.getElementById("passkey-methods-title");
  const passkeyMethodsList = document.getElementById("passkey-methods-list");
  const passkeyBenefitsTitle = document.getElementById("passkey-benefits-title");
  const passkeyBenefitsList = document.getElementById("passkey-benefits-list");
  const passkeyPrototype = document.getElementById("passkey-prototype");
  const passkeyCreate = document.getElementById("passkey-create");
  const passkeyBack = document.getElementById("passkey-back");
  const passkeySuccessLabel = document.getElementById("passkey-success-label");
  const passkeySuccessTitle = document.getElementById("passkey-success-title");
  const passkeySuccessBody = document.getElementById("passkey-success-body");
  const passkeySuccessEmail = document.getElementById("passkey-success-email");
  const passkeySuccessAccess = document.getElementById("passkey-success-access");
  const passkeySuccessNote = document.getElementById("passkey-success-note");
  const passkeyContinue = document.getElementById("passkey-continue");
  const passkeyNotice = document.getElementById("passkey-notice");
  const passkeyNoticeTitle = document.getElementById("passkey-notice-title");
  const passkeyNoticeBody = document.getElementById("passkey-notice-body");
  const passkeySimulate = document.getElementById("passkey-simulate");
  const readyLabel = document.getElementById("ready-label");
  const readyTitle = document.getElementById("ready-title");
  const readyCommunity = document.getElementById("ready-community");
  const readyEmail = document.getElementById("ready-email");
  const readyEmailStatus = document.getElementById("ready-email-status");
  const readyAccessStatus = document.getElementById("ready-access-status");
  const readyBody = document.getElementById("ready-body");
  const readyBodySecond = document.getElementById("ready-body-second");
  const readyInactive = document.getElementById("ready-inactive");
  const readyMembership = document.getElementById("ready-membership");
  const readyPaymentNote = document.getElementById("ready-payment-note");
  const readyContinue = document.getElementById("ready-continue");
  const readyBack = document.getElementById("ready-back");
  const paymentIntro = document.getElementById("payment-intro");
  const paymentSuccess = document.getElementById("payment-success");
  const paymentLabel = document.getElementById("payment-label");
  const paymentTitle = document.getElementById("payment-title");
  const paymentCommunity = document.getElementById("payment-community");
  const paymentPrice = document.getElementById("payment-price");
  const paymentRenewal = document.getElementById("payment-renewal");
  const paymentCancel = document.getElementById("payment-cancel");
  const paymentBody = document.getElementById("payment-body");
  const paymentAccountStatus = document.getElementById("payment-account-status");
  const paymentMembershipStatus = document.getElementById(
    "payment-membership-status"
  );
  const paymentPrototype = document.getElementById("payment-prototype");
  const paymentSimulateStart = document.getElementById("payment-simulate-start");
  const paymentBack = document.getElementById("payment-back");
  const paymentSuccessLabel = document.getElementById("payment-success-label");
  const paymentSuccessTitle = document.getElementById("payment-success-title");
  const paymentSuccessCommunity = document.getElementById(
    "payment-success-community"
  );
  const paymentSuccessAccount = document.getElementById("payment-success-account");
  const paymentSuccessMembership = document.getElementById(
    "payment-success-membership"
  );
  const paymentSuccessBody = document.getElementById("payment-success-body");
  const paymentSuccessNote = document.getElementById("payment-success-note");
  const paymentContinue = document.getElementById("payment-continue");
  const paymentNotice = document.getElementById("payment-notice");
  const paymentNoticeTitle = document.getElementById("payment-notice-title");
  const paymentNoticeBody = document.getElementById("payment-notice-body");
  const paymentSimulateConfirm = document.getElementById(
    "payment-simulate-confirm"
  );
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
    !viewAccount ||
    !viewEmail ||
    !viewCode ||
    !viewPasskey ||
    !viewReady ||
    !viewPayment ||
    !viewActive ||
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
    !feedArea ||
    !feedSummary ||
    !feedMeta ||
    !feedImage ||
    !feedSeeToo ||
    !feedOpenSignal ||
    !feedPrev ||
    !feedNext ||
    !signalDetail ||
    !detailImage ||
    !detailClose ||
    !detailUserStatus ||
    !detailCommunity ||
    !detailCategory ||
    !detailHeadline ||
    !detailMeta ||
    !detailCivicStatus ||
    !detailDescription ||
    !detailWhyLabel ||
    !detailWhy ||
    !detailWhoLabel ||
    !detailWho ||
    !detailUpdateLabel ||
    !detailUpdate ||
    !detailStatusLabel ||
    !detailStatusNote ||
    !detailSeeToo ||
    !detailSeeTooDone ||
    !detailDoneTitle ||
    !detailDoneNote ||
    !feedSeeTooDone ||
    !feedDoneTitle ||
    !feedDoneNote ||
    !activeLabel ||
    !activeTitle ||
    !activeCommunity ||
    !activeMemberStatus ||
    !activeBody ||
    !activeBodySecond ||
    !activePrototype ||
    !activeReturn ||
    !activeBack ||
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
    !passkeyIntro ||
    !passkeySuccess ||
    !passkeyLabel ||
    !passkeyTitle ||
    !passkeyBody ||
    !passkeyBodySecond ||
    !passkeyMethodsTitle ||
    !passkeyMethodsList ||
    !passkeyBenefitsTitle ||
    !passkeyBenefitsList ||
    !passkeyPrototype ||
    !passkeyCreate ||
    !passkeyBack ||
    !passkeySuccessLabel ||
    !passkeySuccessTitle ||
    !passkeySuccessBody ||
    !passkeySuccessEmail ||
    !passkeySuccessAccess ||
    !passkeySuccessNote ||
    !passkeyContinue ||
    !passkeyNotice ||
    !passkeyNoticeTitle ||
    !passkeyNoticeBody ||
    !passkeySimulate ||
    !readyLabel ||
    !readyTitle ||
    !readyCommunity ||
    !readyEmail ||
    !readyEmailStatus ||
    !readyAccessStatus ||
    !readyBody ||
    !readyBodySecond ||
    !readyInactive ||
    !readyMembership ||
    !readyPaymentNote ||
    !readyContinue ||
    !readyBack ||
    !paymentIntro ||
    !paymentSuccess ||
    !paymentLabel ||
    !paymentTitle ||
    !paymentCommunity ||
    !paymentPrice ||
    !paymentRenewal ||
    !paymentCancel ||
    !paymentBody ||
    !paymentAccountStatus ||
    !paymentMembershipStatus ||
    !paymentPrototype ||
    !paymentSimulateStart ||
    !paymentBack ||
    !paymentSuccessLabel ||
    !paymentSuccessTitle ||
    !paymentSuccessCommunity ||
    !paymentSuccessAccount ||
    !paymentSuccessMembership ||
    !paymentSuccessBody ||
    !paymentSuccessNote ||
    !paymentContinue ||
    !paymentNotice ||
    !paymentNoticeTitle ||
    !paymentNoticeBody ||
    !paymentSimulateConfirm ||
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
        observedDate: "14 luglio 2026",
        area: "Città Studi",
        headline: "Marciapiede danneggiato davanti alla scuola di via Padova",
        summary:
          "Le radici hanno sollevato il marciapiede. Bambini e anziani sono costretti sulla carreggiata.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 42%",
        civicStatus: "Stato civico: osservato — in attesa di attenzione locale",
        description:
          "Davanti alla scuola di via Padova il marciapiede è sollevato e spezzato. Il passaggio pedonale resta irregolare per diversi metri e costringe chi cammina a avvicinarsi alla carreggiata, soprattutto nelle ore di entrata e uscita.",
        whyMatters:
          "Qui passa ogni giorno chi accompagna i bambini a scuola e chi si muove a piedi nel quartiere. Un marciapiede danneggiato non è un dettaglio estetico: riduce la sicurezza di un tratto quotidiano e molto frequentato.",
        whoAffected:
          "Famiglie con bambini, anziani, persone con mobilità ridotta e chi attraversa Città Studi a piedi nelle ore di punta.",
        latestUpdate:
          "Il segnale resta locale e aperto. Nessuna conferma rilevante di intervento è ancora disponibile in questo prototipo.",
        statusNote:
          "«Osservato» significa che il problema è stato riconosciuto dalla comunità locale. Non implica una pratica ufficiale né un intervento già avviato.",
      },
      {
        id: "milano-signal-2",
        category: "ILLUMINAZIONE",
        authorName: "Chiara Valli",
        observedTime: "Segnalato due giorni fa",
        observedDate: "13 luglio 2026",
        area: "Porta Romana",
        headline: "Il percorso vicino alla scuola resta al buio la sera",
        summary:
          "Diversi lampioni non funzionano sul tratto pedonale. I residenti hanno già segnalato il Comune.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "58% 40%",
        civicStatus: "Stato civico: segnalato — monitoraggio locale",
        description:
          "Sul tratto pedonale vicino alla scuola, più lampioni restano spenti dopo il tramonto. Il percorso tra le abitazioni e l’ingresso scolastico diventa difficile da leggere, soprattutto per chi torna a piedi la sera.",
        whyMatters:
          "Una strada poco illuminata riduce il senso di sicurezza di un percorso scolastico e quotidiano. In un quartiere abitato, la luce pubblica è parte essenziale della vita locale.",
        whoAffected:
          "Studenti, genitori, residenti della sera e chi usa questo tratto pedonale per raggiungere fermate e abitazioni vicine.",
        latestUpdate:
          "I residenti riferiscono di aver già segnalato il Comune. In questo prototipo il segnale resta in monitoraggio locale.",
        statusNote:
          "«Segnalato» indica che il problema è stato portato all’attenzione locale. Non conferma riparazione, presa in carico formale o tempi di intervento.",
      },
      {
        id: "milano-signal-3",
        category: "LAVORI PUBBLICI",
        authorName: "Luca Ferri",
        observedTime: "Osservato questa settimana",
        observedDate: "Questa settimana · luglio 2026",
        area: "Lorenteggio",
        headline:
          "Il cantiere restringe il passaggio pedonale senza indicazioni chiare",
        summary:
          "Il percorso temporaneo è stretto e poco segnalato. Servono tempi chiari e un passaggio più sicuro.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Stato civico: aperto — richiede chiarezza locale",
        description:
          "Il cantiere ha ristretto il passaggio pedonale a un corridoio stretto, con indicazioni poco leggibili. Pedoni e ciclisti si trovano a condividere uno spazio ridotto, senza un percorso alternativo chiaro.",
        whyMatters:
          "I lavori pubblici fanno parte della vita di quartiere, ma senza indicazioni e tempi comprensibili il passaggio quotidiano diventa confuso e meno sicuro.",
        whoAffected:
          "Pedoni, ciclisti, residenti di Lorenteggio e chi attraversa l’area per lavoro o scuola.",
        latestUpdate:
          "Il segnale resta aperto. In questo prototipo non risultano ancora indicazioni aggiornate su durata o percorso alternativo.",
        statusNote:
          "«Aperto» significa che la situazione resta da chiarire per la comunità. Non implica una decisione amministrativa già conclusa.",
      },
    ],
    Munich: [
      {
        id: "munich-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Anna Weber",
        observedTime: "Gestern beobachtet",
        observedDate: "14. Juli 2026",
        area: "Schwabing",
        headline: "Der Gehweg ist hier kaum noch sicher passierbar.",
        summary:
          "Unebene Platten verengen den Gehweg. Menschen mit Kinderwagen oder Rollstuhl müssen auf die Straße ausweichen.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 42%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "In Schwabing ist der Gehweg durch angehobene und unebene Platten stark eingeschränkt. Der sichere Fußweg wird schmal, sodass Menschen näher an den Fahrbahnrand ausweichen müssen.",
        whyMatters:
          "Ein beschädigter Gehweg betrifft den Alltag im Viertel. Er macht einen häufig genutzten Weg unsicherer — besonders für Familien, ältere Menschen und alle, die zu Fuß unterwegs sind.",
        whoAffected:
          "Familien mit Kinderwagen, ältere Menschen, Personen mit eingeschränkter Mobilität und Fußgängerinnen und Fußgänger im täglichen Weg durch Schwabing.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. In diesem Prototyp liegt noch keine bestätigte Maßnahme vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "munich-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Jonas Keller",
        observedTime: "Vor zwei Tagen gemeldet",
        observedDate: "13. Juli 2026",
        area: "Haidhausen",
        headline: "Mehrere Straßenlaternen bleiben am Abend dunkel.",
        summary:
          "Der Fußweg zwischen Wohnhäusern und Haltestelle ist kaum beleuchtet. Anwohner haben die Störung bereits gemeldet.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "58% 40%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Mehrere Laternen am Fußweg zwischen Wohnhäusern und Haltestelle bleiben nach Einbruch der Dunkelheit aus. Der Weg ist schwerer zu lesen und fühlt sich weniger sicher an.",
        whyMatters:
          "Gute Beleuchtung gehört zur alltäglichen Sicherheit im Quartier. Ein dunkler Schul- und Wohnweg betrifft nicht nur Komfort, sondern das Vertrauen in den öffentlichen Raum.",
        whoAffected:
          "Anwohnerinnen und Anwohner, Schülerinnen und Schüler, Abendgänger sowie alle, die diesen Fußweg zur Haltestelle nutzen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. In diesem Prototyp bleibt das Signal in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "munich-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Lukas Brandt",
        observedTime: "Diese Woche beobachtet",
        observedDate: "Diese Woche · Juli 2026",
        area: "Sendling",
        headline: "Der provisorische Weg ist zu eng und schlecht ausgeschildert.",
        summary:
          "Fußgänger und Radfahrer teilen sich einen schmalen Durchgang. Es fehlen klare Hinweise und ein sicherer Übergang.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "Die Bauarbeiten haben den Durchgang auf einen engen provisorischen Weg verengt. Fußgänger und Radfahrer teilen sich denselben schmalen Raum, ohne klare Führung oder erkennbare Alternative.",
        whyMatters:
          "Öffentliche Bauarbeiten gehören zum Stadtleben. Ohne verständliche Hinweise und sichere Übergänge wird der Alltag im Viertel jedoch unnötig unsicher und unklar.",
        whoAffected:
          "Fußgänger, Radfahrer, Anwohner in Sendling und alle, die das Gebiet regelmäßig durchqueren.",
        latestUpdate:
          "Das Signal bleibt offen. In diesem Prototyp gibt es noch keine aktualisierte Angabe zu Dauer oder Ausweichweg.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
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
      member: "Membro · {city}",
      seeThisToo: "LO VEDO ANCH’IO",
      doneTitle: "Lo vedi anche tu",
      doneNote: "Conferma registrata nel prototipo",
      openSignal: "Apri segnale",
      openSignalClose: "Chiudi",
      whyLabel: "Perché conta qui",
      whoLabel: "Chi è coinvolto",
      updateLabel: "Ultimo aggiornamento",
      statusLabel: "Cosa significa questo stato",
      communityArea: "{city} · {area}",
      previous: "Precedente",
      next: "Successiva",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      back: "Zurück",
      visitor: "Besucher",
      member: "Mitglied · {city}",
      seeThisToo: "ICH SEHE DAS AUCH",
      doneTitle: "Du siehst das auch",
      doneNote: "Bestätigung im Prototyp registriert",
      openSignal: "Signal öffnen",
      openSignalClose: "Schließen",
      whyLabel: "Warum das hier zählt",
      whoLabel: "Wen es betrifft",
      updateLabel: "Letzte Aktualisierung",
      statusLabel: "Was dieser Status bedeutet",
      communityArea: "{city} · {area}",
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
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const PASSKEY_COPY = {
    it: {
      label: "ACCESSO SICURO",
      title: "Proteggi il tuo account TOWN.",
      body:
        "TOWN utilizza una passkey: non devi creare o ricordare una password.",
      bodySecond:
        "Nel flusso approvato, l’accesso sicuro usa i metodi del tuo dispositivo.",
      methodsTitle: "Metodi disponibili sul dispositivo",
      methods: ["Face ID", "Touch ID", "Impronta digitale", "PIN del dispositivo"],
      benefitsTitle: "Perché una passkey",
      benefits: [
        "Nessuna password da ricordare",
        "Maggiore resistenza al phishing",
        "Nessuna password condivisa con TOWN",
        "Puoi aggiungere altri dispositivi in seguito",
      ],
      prototype:
        "In questo prototipo la creazione reale della passkey non è attiva e non viene creato alcun credential di autenticazione.",
      create: "Crea accesso sicuro",
      back: "Indietro",
      noticeTitle: "Simulazione del prototipo",
      noticeBody:
        "La creazione reale della passkey non è ancora attiva in questo prototipo.",
      simulate: "Simula configurazione",
      successLabel: "ACCESSO CONFIGURATO",
      successTitle: "Accesso sicuro configurato nel prototipo.",
      successBody:
        "La tua email resta verificata. Non è stata creata una passkey reale.",
      successEmail: "Email verificata",
      successAccess: "Accesso sicuro configurato (prototipo)",
      successNote:
        "Questo è solo uno stato di simulazione. Non esiste un account autenticato reale.",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "SICHERER ZUGANG",
      title: "Schütze dein TOWN-Konto.",
      body:
        "TOWN verwendet einen Passkey. Du musst kein Passwort erstellen oder merken.",
      bodySecond:
        "Im genehmigten Ablauf nutzt der sichere Zugang die Methoden deines Geräts.",
      methodsTitle: "Verfügbare Gerätemethoden",
      methods: ["Face ID", "Touch ID", "Fingerabdruck", "Geräte-PIN"],
      benefitsTitle: "Warum ein Passkey",
      benefits: [
        "Kein Passwort zum Merken",
        "Besserer Schutz vor Phishing",
        "Kein Passwort wird mit TOWN geteilt",
        "Weitere Geräte können später hinzugefügt werden",
      ],
      prototype:
        "In diesem Prototyp ist die echte Passkey-Erstellung nicht aktiv und es wird kein Authentifizierungsnachweis erstellt.",
      create: "Sicheren Zugang erstellen",
      back: "Zurück",
      noticeTitle: "Prototyp-Simulation",
      noticeBody:
        "Die echte Passkey-Erstellung ist in diesem Prototyp noch nicht verfügbar.",
      simulate: "Einrichtung simulieren",
      successLabel: "ZUGANG EINGERICHTET",
      successTitle: "Sicherer Zugang im Prototyp eingerichtet.",
      successBody:
        "Deine E-Mail bleibt bestätigt. Es wurde kein echter Passkey erstellt.",
      successEmail: "E-Mail bestätigt",
      successAccess: "Sicherer Zugang eingerichtet (Prototyp)",
      successNote:
        "Dies ist nur ein Simulationszustand. Es gibt kein echt authentifiziertes Konto.",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const READY_COPY = {
    it: {
      label: "ACCOUNT PRONTO",
      title: "Il tuo account TOWN è pronto.",
      community: "Comunità: {city}",
      emailLine: "Email: {email}",
      emailStatus: "Email verificata (prototipo)",
      accessStatus: "Accesso sicuro configurato (prototipo)",
      body:
        "La configurazione dell’account nel prototipo è completa.",
      bodySecond:
        "Il prossimo passo è attivare l’iscrizione annuale a TOWN.",
      inactive:
        "Account pronto — la membership non è attiva. Non puoi ancora partecipare come membro.",
      membership: "Iscrizione TOWN — €12 all’anno",
      paymentNote:
        "In questo prototipo non è attivo alcun pagamento reale.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "KONTO BEREIT",
      title: "Dein TOWN-Konto ist bereit.",
      community: "Gemeinschaft: {city}",
      emailLine: "E-Mail: {email}",
      emailStatus: "E-Mail bestätigt (Prototyp)",
      accessStatus: "Sicherer Zugang eingerichtet (Prototyp)",
      body:
        "Die Kontoeinrichtung im Prototyp ist abgeschlossen.",
      bodySecond:
        "Als Nächstes aktivierst du deine jährliche TOWN-Mitgliedschaft.",
      inactive:
        "Konto bereit — die Mitgliedschaft ist nicht aktiv. Du kannst noch nicht als Mitglied teilnehmen.",
      membership: "TOWN-Mitgliedschaft — €12 pro Jahr",
      paymentNote:
        "In diesem Prototyp ist keine echte Zahlung aktiv.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const PAYMENT_COPY = {
    it: {
      label: "MEMBERSHIP ANNUALE",
      title: "Attiva l’iscrizione annuale a TOWN.",
      community: "Comunità: {city}",
      price: "€12 all’anno",
      renewal: "Rinnovo annuale automatico.",
      cancel:
        "Puoi annullare in qualsiasi momento. L’accesso resta attivo fino alla fine del periodo già pagato.",
      body:
        "Con una membership attiva potrai partecipare alla comunità locale verificata.",
      accountStatus: "Account: pronto",
      membershipStatus: "Membership: non attiva",
      prototype:
        "In questo prototipo il pagamento reale non è attivo, Stripe non è integrato e nessuna membership verrà attivata davvero.",
      simulateStart: "Simula attivazione membership",
      back: "Indietro",
      noticeTitle: "Pagamento non attivo",
      noticeBody:
        "Il pagamento reale non è attivo in questo prototipo. Stripe non è integrato. Puoi solo simulare l’attivazione.",
      simulateConfirm: "Simula attivazione",
      successLabel: "MEMBERSHIP SIMULATA",
      successTitle: "Membership attiva — solo prototipo.",
      successCommunity: "Comunità: {city}",
      successAccount: "Account: pronto",
      successMembership: "Membership: attiva — solo prototipo",
      successBody:
        "Nessun pagamento reale è avvenuto. Non esiste alcun entitlement reale.",
      successNote:
        "Questo stato è solo una simulazione. Non implica conferma civica, autenticazione reale o abbonamento reale.",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "JÄHRLICHE MITGLIEDSCHAFT",
      title: "Aktiviere die jährliche TOWN-Mitgliedschaft.",
      community: "Gemeinschaft: {city}",
      price: "€12 pro Jahr",
      renewal: "Jährliche automatische Verlängerung.",
      cancel:
        "Du kannst jederzeit kündigen. Der Zugang bleibt bis zum Ende des bereits bezahlten Zeitraums aktiv.",
      body:
        "Mit einer aktiven Mitgliedschaft kannst du an der verifizierten lokalen Gemeinschaft teilnehmen.",
      accountStatus: "Konto: bereit",
      membershipStatus: "Mitgliedschaft: nicht aktiv",
      prototype:
        "In diesem Prototyp ist keine echte Zahlung aktiv, Stripe ist nicht integriert und es wird keine echte Mitgliedschaft aktiviert.",
      simulateStart: "Mitgliedschaftsaktivierung simulieren",
      back: "Zurück",
      noticeTitle: "Zahlung nicht aktiv",
      noticeBody:
        "Echte Zahlung ist in diesem Prototyp nicht aktiv. Stripe ist nicht integriert. Du kannst die Aktivierung nur simulieren.",
      simulateConfirm: "Aktivierung simulieren",
      successLabel: "MITGLIEDSCHAFT SIMULIERT",
      successTitle: "Mitgliedschaft aktiv — nur Prototyp.",
      successCommunity: "Gemeinschaft: {city}",
      successAccount: "Konto: bereit",
      successMembership: "Mitgliedschaft: aktiv — nur Prototyp",
      successBody:
        "Es ist keine echte Zahlung erfolgt. Es gibt kein reales Entitlement.",
      successNote:
        "Dieser Zustand ist nur eine Simulation. Er bedeutet keine zivile Bestätigung, keine echte Authentifizierung und kein echtes Abonnement.",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  const ACTIVE_COPY = {
    it: {
      label: "MEMBERSHIP ATTIVA",
      title: "Membership attiva — solo prototipo.",
      community: "Comunità: {city}",
      memberStatus: "Membro · {city}",
      body:
        "La configurazione dell’account nel prototipo è completa e la partecipazione è ora attiva nel prototipo.",
      bodySecond:
        "Nessun pagamento reale è avvenuto e non esiste alcun entitlement reale.",
      prototype:
        "Questo è solo lo stato di chiusura del percorso prototipo. Non implica autenticazione reale o conferma civica salvata.",
      returnSignal: "Torna al segnale",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      label: "MITGLIEDSCHAFT AKTIV",
      title: "Mitgliedschaft aktiv — nur Prototyp.",
      community: "Gemeinschaft: {city}",
      memberStatus: "Mitglied · {city}",
      body:
        "Die Kontoeinrichtung im Prototyp ist abgeschlossen und die Teilnahme ist im Prototyp jetzt aktiv.",
      bodySecond:
        "Es ist keine echte Zahlung erfolgt und es gibt kein reales Entitlement.",
      prototype:
        "Dies ist nur der Abschlusszustand des Prototypwegs. Er bedeutet keine echte Authentifizierung und keine gespeicherte zivile Bestätigung.",
      returnSignal: "Zurück zum Signal",
      back: "Zurück",
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
  let originatingFeedIndex = 0;
  let enteredEmail = "";
  let emailVerified = false;
  let passkeySimulated = false;
  let membershipSimulated = false;
  let signalConfirmed = false;

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
    passkey: "TOWN — Secure access",
    ready: "TOWN — Account ready",
    payment: "TOWN — Membership payment",
    active: "TOWN — Membership active",
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
    if (raw.startsWith("passkey")) return "passkey";
    if (raw.startsWith("ready")) return "ready";
    if (raw.startsWith("payment")) return "payment";
    if (raw.startsWith("active")) return "active";
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

  function syncFeedMemberState() {
    const lang = communityLanguage();
    const copy = FEED_COPY[lang] || FEED_COPY.it;
    const cityName = cityDisplayName(lang);
    const onOrigin =
      signalConfirmed &&
      membershipSimulated &&
      feedIndex === originatingFeedIndex;

    if (membershipSimulated) {
      feedVisitor.textContent = copy.member.replace("{city}", cityName);
      detailUserStatus.textContent = copy.member.replace("{city}", cityName);
    } else {
      feedVisitor.textContent = copy.visitor;
      detailUserStatus.textContent = copy.visitor;
    }

    feedDoneTitle.textContent = copy.doneTitle;
    feedDoneNote.textContent = copy.doneNote;
    detailDoneTitle.textContent = copy.doneTitle;
    detailDoneNote.textContent = copy.doneNote;
    detailSeeToo.textContent = copy.seeThisToo;

    if (onOrigin) {
      feedSeeToo.hidden = true;
      feedSeeToo.disabled = true;
      feedSeeTooDone.hidden = false;
      detailSeeToo.hidden = true;
      detailSeeToo.disabled = true;
      detailSeeTooDone.hidden = false;
    } else if (membershipSimulated) {
      // Membership journey complete: do not reopen visitor invitation on other scenes.
      feedSeeToo.hidden = true;
      feedSeeToo.disabled = true;
      feedSeeTooDone.hidden = true;
      detailSeeToo.hidden = true;
      detailSeeToo.disabled = true;
      detailSeeTooDone.hidden = true;
    } else {
      feedSeeToo.hidden = false;
      feedSeeToo.disabled = false;
      feedSeeTooDone.hidden = true;
      feedSeeToo.textContent = copy.seeThisToo;
      detailSeeToo.hidden = false;
      detailSeeToo.disabled = false;
      detailSeeTooDone.hidden = true;
    }
  }

  function applyFeedCopyChrome() {
    const lang = communityLanguage();
    const copy = FEED_COPY[lang] || FEED_COPY.it;
    feedBack.textContent = copy.back;
    feedSeeToo.textContent = copy.seeThisToo;
    feedOpenSignal.textContent = copy.openSignal;
    feedPrev.textContent = copy.previous;
    feedNext.textContent = copy.next;
    detailClose.textContent = copy.openSignalClose;
    detailWhyLabel.textContent = copy.whyLabel;
    detailWhoLabel.textContent = copy.whoLabel;
    detailUpdateLabel.textContent = copy.updateLabel;
    detailStatusLabel.textContent = copy.statusLabel;
    feedCommunity.textContent = cityDisplayName(lang);
    syncFeedMemberState();
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function populateSignalDetail() {
    const lang = communityLanguage();
    const copy = FEED_COPY[lang] || FEED_COPY.it;
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    if (!scene) return;

    const cityName = cityDisplayName(lang);
    detailImage.src = scene.image;
    detailImage.style.objectPosition = scene.focus;
    detailCommunity.textContent = copy.communityArea
      .replace("{city}", cityName)
      .replace("{area}", scene.area);
    detailCategory.textContent = scene.category;
    detailHeadline.textContent = scene.headline;
    detailMeta.textContent =
      scene.observedDate + " · " + scene.authorName + " · " + scene.area;
    detailCivicStatus.textContent = scene.civicStatus;
    detailDescription.textContent = scene.description;
    detailWhy.textContent = scene.whyMatters;
    detailWho.textContent = scene.whoAffected;
    detailUpdate.textContent = scene.latestUpdate;
    detailStatusNote.textContent = scene.statusNote;
    syncFeedMemberState();
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
    feedArea.textContent = scene.area;
    feedSummary.textContent = scene.summary;
    feedMeta.textContent =
      scene.authorName + " · " + (scene.observedDate || scene.observedTime);
    feedPager.textContent = feedIndex + 1 + " / " + scenes.length;
    feedPrev.disabled = feedIndex <= 0;
    feedNext.disabled = feedIndex >= scenes.length - 1;
    syncFeedMemberState();
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

  function fillList(node, items) {
    node.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      node.appendChild(li);
    });
  }

  function closePasskeyNotice() {
    if (passkeyNotice.hidden) return;
    passkeyNotice.hidden = true;
    document.body.style.overflow = "";
  }

  function openPasskeyNotice() {
    const copy = PASSKEY_COPY[membershipLang()];
    passkeyNoticeTitle.textContent = copy.noticeTitle;
    passkeyNoticeBody.textContent = copy.noticeBody;
    passkeySimulate.textContent = copy.simulate;
    passkeyNotice.hidden = false;
    document.body.style.overflow = "hidden";
    passkeySimulate.focus();
  }

  function showPasskeyIntro() {
    passkeyIntro.hidden = false;
    passkeySuccess.hidden = true;
  }

  function showPasskeySuccess() {
    passkeyIntro.hidden = true;
    passkeySuccess.hidden = false;
  }

  function applyPasskeyCopy() {
    const copy = PASSKEY_COPY[membershipLang()];
    passkeyLabel.textContent = copy.label;
    passkeyTitle.textContent = copy.title;
    passkeyBody.textContent = copy.body;
    passkeyBodySecond.textContent = copy.bodySecond;
    passkeyMethodsTitle.textContent = copy.methodsTitle;
    fillList(passkeyMethodsList, copy.methods);
    passkeyBenefitsTitle.textContent = copy.benefitsTitle;
    fillList(passkeyBenefitsList, copy.benefits);
    passkeyPrototype.textContent = copy.prototype;
    passkeyCreate.textContent = copy.create;
    passkeyBack.textContent = copy.back;
    passkeySuccessLabel.textContent = copy.successLabel;
    passkeySuccessTitle.textContent = copy.successTitle;
    passkeySuccessBody.textContent = copy.successBody;
    passkeySuccessEmail.textContent = copy.successEmail;
    passkeySuccessAccess.textContent = copy.successAccess;
    passkeySuccessNote.textContent = copy.successNote;
    passkeyContinue.textContent = copy.continue;
    if (passkeySimulated) {
      showPasskeySuccess();
    } else {
      showPasskeyIntro();
    }
    document.documentElement.lang = membershipLang();
  }

  function applyReadyCopy() {
    const copy = READY_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    readyLabel.textContent = copy.label;
    readyTitle.textContent = copy.title;
    readyCommunity.textContent = copy.community.replace("{city}", cityName);
    readyEmail.textContent = enteredEmail
      ? copy.emailLine.replace("{email}", enteredEmail)
      : "";
    readyEmail.hidden = !enteredEmail;
    readyEmailStatus.textContent = copy.emailStatus;
    readyAccessStatus.textContent = copy.accessStatus;
    readyBody.textContent = copy.body;
    readyBodySecond.textContent = copy.bodySecond;
    readyInactive.textContent = copy.inactive;
    readyMembership.textContent = copy.membership;
    readyPaymentNote.textContent = copy.paymentNote;
    readyContinue.textContent = copy.continue;
    readyBack.textContent = copy.back;
    document.documentElement.lang = membershipLang();
  }

  function closePaymentNotice() {
    if (paymentNotice.hidden) return;
    paymentNotice.hidden = true;
    document.body.style.overflow = "";
  }

  function openPaymentNotice() {
    const copy = PAYMENT_COPY[membershipLang()];
    paymentNoticeTitle.textContent = copy.noticeTitle;
    paymentNoticeBody.textContent = copy.noticeBody;
    paymentSimulateConfirm.textContent = copy.simulateConfirm;
    paymentNotice.hidden = false;
    document.body.style.overflow = "hidden";
    paymentSimulateConfirm.focus();
  }

  function showPaymentIntro() {
    paymentIntro.hidden = false;
    paymentSuccess.hidden = true;
  }

  function showPaymentSuccess() {
    paymentIntro.hidden = true;
    paymentSuccess.hidden = false;
  }

  function applyPaymentCopy() {
    const copy = PAYMENT_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    paymentLabel.textContent = copy.label;
    paymentTitle.textContent = copy.title;
    paymentCommunity.textContent = copy.community.replace("{city}", cityName);
    paymentPrice.textContent = copy.price;
    paymentRenewal.textContent = copy.renewal;
    paymentCancel.textContent = copy.cancel;
    paymentBody.textContent = copy.body;
    paymentAccountStatus.textContent = copy.accountStatus;
    paymentMembershipStatus.textContent = copy.membershipStatus;
    paymentPrototype.textContent = copy.prototype;
    paymentSimulateStart.textContent = copy.simulateStart;
    paymentBack.textContent = copy.back;
    paymentSuccessLabel.textContent = copy.successLabel;
    paymentSuccessTitle.textContent = copy.successTitle;
    paymentSuccessCommunity.textContent = copy.successCommunity.replace(
      "{city}",
      cityName
    );
    paymentSuccessAccount.textContent = copy.successAccount;
    paymentSuccessMembership.textContent = copy.successMembership;
    paymentSuccessBody.textContent = copy.successBody;
    paymentSuccessNote.textContent = copy.successNote;
    paymentContinue.textContent = copy.continue;
    if (membershipSimulated) {
      showPaymentSuccess();
    } else {
      showPaymentIntro();
    }
    document.documentElement.lang = membershipLang();
  }

  function applyActiveCopy() {
    const copy = ACTIVE_COPY[membershipLang()];
    const cityName = copy.cityNames[selectedCity] || selectedCity || "";
    activeLabel.textContent = copy.label;
    activeTitle.textContent = copy.title;
    activeCommunity.textContent = copy.community.replace("{city}", cityName);
    activeMemberStatus.textContent = copy.memberStatus.replace(
      "{city}",
      cityName
    );
    activeBody.textContent = copy.body;
    activeBodySecond.textContent = copy.bodySecond;
    activePrototype.textContent = copy.prototype;
    activeReturn.textContent = copy.returnSignal;
    activeBack.textContent = copy.back;
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
    emailVerified = false;
    passkeySimulated = false;
    membershipSimulated = false;
    signalConfirmed = false;
    originatingFeedIndex = 0;
    feedSeeToo.hidden = false;
    feedSeeToo.disabled = false;
    feedSeeTooDone.hidden = true;
    detailSeeToo.hidden = false;
    detailSeeToo.disabled = false;
    detailSeeTooDone.hidden = true;
    closeSignalDetail();
    emailInput.value = "";
    emailError.hidden = true;
    emailError.textContent = "";
    emailContinue.disabled = true;
    codeInput.value = "";
    codeError.hidden = true;
    codeError.textContent = "";
    codeVerify.disabled = true;
    closePasskeyNotice();
    showPasskeyIntro();
    closePaymentNotice();
    showPaymentIntro();
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
    viewPasskey.hidden = name !== "passkey";
    viewReady.hidden = name !== "ready";
    viewPayment.hidden = name !== "payment";
    viewActive.hidden = name !== "active";
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
    document.body.classList.toggle("page-passkey", name === "passkey");
    document.body.classList.toggle("page-ready", name === "ready");
    document.body.classList.toggle("page-payment", name === "payment");
    document.body.classList.toggle("page-active", name === "active");

    if (name !== "feed") {
      closeInvite();
      closeSignalDetail();
    }
    if (name !== "passkey") {
      closePasskeyNotice();
    }
    if (name !== "payment") {
      closePaymentNotice();
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
    if (name === "passkey") {
      applyPasskeyCopy();
    }
    if (name === "ready") {
      applyReadyCopy();
    }
    if (name === "payment") {
      applyPaymentCopy();
    }
    if (name === "active") {
      applyActiveCopy();
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
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
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
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !locationVerified
    ) {
      route = "location";
    }
    if (
      (route === "code" ||
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !enteredEmail
    ) {
      route = "email";
    }
    if (
      (route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !emailVerified
    ) {
      route = "code";
    }
    if (
      (route === "ready" || route === "payment" || route === "active") &&
      !passkeySimulated
    ) {
      route = "passkey";
    }
    if (route === "active" && !membershipSimulated) {
      route = "payment";
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

  function closeSignalDetail() {
    if (signalDetail.hidden) return;
    signalDetail.hidden = true;
    document.body.style.overflow = "";
  }

  function openSignalDetail() {
    applyFeedCopyChrome();
    populateSignalDetail();
    signalDetail.hidden = false;
    document.body.style.overflow = "hidden";
    detailClose.focus();
  }

  // Backward-compatible aliases used by existing feed flow helpers.
  function closeSignalSheet() {
    closeSignalDetail();
  }

  function openSignalSheet() {
    openSignalDetail();
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
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
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
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
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
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
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

  detailClose.addEventListener("click", () => {
    closeSignalDetail();
  });

  detailSeeToo.addEventListener("click", () => {
    if (membershipSimulated || detailSeeToo.disabled) return;
    originatingFeedIndex = feedIndex;
    closeSignalDetail();
    openInvite();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!signalDetail.hidden) {
        event.preventDefault();
        closeSignalDetail();
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
    if (membershipSimulated || feedSeeToo.disabled) return;
    closeSignalSheet();
    originatingFeedIndex = feedIndex;
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
    openSignalDetail();
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
    emailVerified = true;
    passkeySimulated = false;
    go("passkey");
  });

  codeChangeEmail.addEventListener("click", () => {
    emailVerified = false;
    passkeySimulated = false;
    go("email");
  });

  passkeyCreate.addEventListener("click", () => {
    // Prototype notice only — no browser credential APIs.
    openPasskeyNotice();
  });

  passkeySimulate.addEventListener("click", () => {
    passkeySimulated = true;
    closePasskeyNotice();
    applyPasskeyCopy();
    passkeyContinue.focus();
  });

  passkeyBack.addEventListener("click", () => {
    closePasskeyNotice();
    go("code");
  });

  passkeyContinue.addEventListener("click", () => {
    go("ready");
  });

  readyContinue.addEventListener("click", () => {
    membershipSimulated = false;
    go("payment");
  });

  readyBack.addEventListener("click", () => {
    // Return to Screen 10 success state.
    passkeySimulated = true;
    go("passkey");
  });

  paymentSimulateStart.addEventListener("click", () => {
    // Prototype notice only — no Stripe / card fields / real activation.
    openPaymentNotice();
  });

  paymentSimulateConfirm.addEventListener("click", () => {
    membershipSimulated = true;
    closePaymentNotice();
    applyPaymentCopy();
    paymentContinue.focus();
  });

  paymentBack.addEventListener("click", () => {
    closePaymentNotice();
    go("ready");
  });

  paymentContinue.addEventListener("click", () => {
    go("active");
  });

  activeReturn.addEventListener("click", () => {
    feedIndex = originatingFeedIndex;
    signalConfirmed = true;
    go("feed");
  });

  activeBack.addEventListener("click", () => {
    membershipSimulated = true;
    go("payment");
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", render);
  syncCountryContinue();
  render();
})();
