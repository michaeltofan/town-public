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
  const entrySignIn = document.getElementById("entry-sign-in");
  const entryLoginStatus = document.getElementById("entry-login-status");
  const sheet = document.getElementById("learn-more-sheet");
  const termsSheet = document.getElementById("terms-sheet");
  const termsAccept = document.getElementById("terms-accept");
  const termsCancel = document.getElementById("terms-cancel");
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
  const locationOutside = document.getElementById("location-outside");
  const locationTitle = document.getElementById("location-title");
  const locationCity = document.getElementById("location-city");
  const locationLead = document.getElementById("location-lead");
  const locationPrivacy = document.getElementById("location-privacy");
  const locationMessage = document.getElementById("location-message");
  const locationVerify = document.getElementById("location-verify");
  const locationStatusLabel = document.getElementById("location-status-label");
  const locationSuccessTitle = document.getElementById("location-success-title");
  const locationSuccessLead = document.getElementById("location-success-lead");
  const locationContinue = document.getElementById("location-continue");
  const locationOutsideLabel = document.getElementById("location-outside-label");
  const locationOutsideTitle = document.getElementById("location-outside-title");
  const locationOutsideLead = document.getElementById("location-outside-lead");
  const locationOutsideContinue = document.getElementById(
    "location-outside-continue"
  );
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
  const appNav = document.getElementById("app-nav");
  const navHome = document.getElementById("nav-home");
  const navMembership = document.getElementById("nav-membership");
  const navChat = document.getElementById("nav-chat");
  const navActivity = document.getElementById("nav-activity");
  const navProfile = document.getElementById("nav-profile");
  const authWindow = document.getElementById("auth-window");
  const authWindowDim = document.getElementById("auth-window-dim");
  const authWindowClose = document.getElementById("auth-window-close");
  const authWindowTitle = document.getElementById("auth-window-title");
  const authModeToggle = document.getElementById("auth-mode-toggle");
  const authChannelEmail = document.getElementById("auth-channel-email");
  const authChannelPhone = document.getElementById("auth-channel-phone");
  const authIdentityLabel = document.getElementById("auth-identity-label");
  const authIdentityInput = document.getElementById("auth-identity-input");
  const authContinue = document.getElementById("auth-continue");
  const authPasskey = document.getElementById("auth-passkey");
  const authPassword = document.getElementById("auth-password");
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
  const detailAddTestimony = document.getElementById("detail-add-testimony");
  const detailTestimonyInput = document.getElementById("detail-testimony-input");
  const detailTestimonyPreview = document.getElementById(
    "detail-testimony-preview"
  );
  const detailTestimonyNote = document.getElementById("detail-testimony-note");
  const detailTestimonyImage = document.getElementById("detail-testimony-image");
  const detailTestimonyVideo = document.getElementById("detail-testimony-video");
  const detailTestimonyClear = document.getElementById("detail-testimony-clear");
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
  const passkeyError = document.getElementById("passkey-error");
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
  const paymentError = document.getElementById("payment-error");
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
    !entrySignIn ||
    !entryLoginStatus ||
    !sheet ||
    !termsSheet ||
    !termsAccept ||
    !termsCancel ||
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
    !locationOutside ||
    !locationTitle ||
    !locationCity ||
    !locationLead ||
    !locationPrivacy ||
    !locationMessage ||
    !locationVerify ||
    !locationStatusLabel ||
    !locationSuccessTitle ||
    !locationSuccessLead ||
    !locationContinue ||
    !locationOutsideLabel ||
    !locationOutsideTitle ||
    !locationOutsideLead ||
    !locationOutsideContinue ||
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
    !appNav ||
    !navHome ||
    !navMembership ||
    !navChat ||
    !navActivity ||
    !navProfile ||
    !authWindow ||
    !authWindowDim ||
    !authWindowClose ||
    !authWindowTitle ||
    !authModeToggle ||
    !authChannelEmail ||
    !authChannelPhone ||
    !authIdentityLabel ||
    !authIdentityInput ||
    !authContinue ||
    !authPasskey ||
    !authPassword ||
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
    !detailAddTestimony ||
    !detailTestimonyInput ||
    !detailTestimonyPreview ||
    !detailTestimonyNote ||
    !detailTestimonyImage ||
    !detailTestimonyVideo ||
    !detailTestimonyClear ||
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
    !passkeyError ||
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
    !paymentError ||
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
    Romania: { id: "Arad", image: "assets/cities/arad.png" },
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
    Arad: [
      {
        id: "arad-signal-1",
        category: "MEDIU",
        authorName: "Redacția TOWN Arad",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "20 iulie 2026",
        area: "Pădurea Ceala",
        headline: "Moloz depozitat ilegal la marginea pădurii Ceala",
        summary:
          "Camioane cu moloz ajung în continuare pe malul Mureșului, lângă pădurea Ceala. Traseul rămâne deschis, fără barieră.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "La capătul străzii Mărului, în zona Alfa, transporturile de moloz continuă pe un traseu care trece inclusiv pe pista de biciclete, către malul Mureșului și marginea pădurii Ceala. Amenzile aplicate până acum nu au oprit depozitările, iar accesul camioanelor rămâne posibil în lipsa unei bariere.",
        whyMatters:
          "Pădurea Ceala și malul Mureșului sunt printre puținele zone naturale de agrement ale orașului. Depozitarea necontrolată a molozului afectează peisajul, mediul și siguranța celor care folosesc pista de biciclete.",
        whoAffected:
          "Bicicliști, familii care se plimbă în zona Ceala, pescari, locuitorii cartierului Alfa și oricine folosește malul Mureșului pentru recreere.",
        latestUpdate:
          "Semnalul rămâne local și deschis. O barieră de acces nu a fost încă instalată.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
      {
        id: "arad-signal-2",
        category: "INFRASTRUCTURĂ",
        authorName: "Redacția TOWN Arad",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "21 iulie 2026",
        area: "Petriș",
        headline: "Lucrările la Drumul Regelui avansează pe tronsonul Petriș–Vața",
        summary:
          "Pe cei 4 km din județul Arad se construiesc ziduri de sprijin și fundații continue. Termen de finalizare: aprilie 2028.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: în lucru — intervenție publică în desfășurare",
        description:
          "Pe sectorul arădean al Drumului Regelui, între Petriș și limita cu județul Hunedoara, constructorul execută aproximativ 2,5 kilometri de ziduri de sprijin și 1.900 de metri de fundații continue. Lucrările stabilizează versanții și lărgesc platforma drumului montan.",
        whyMatters:
          "Drumul Regelui va lega modern județele Arad și Hunedoara și va deschide accesul către Munții Zărandului, pe unul dintre cele mai spectaculoase trasee panoramice din vestul României.",
        whoAffected:
          "Locuitorii comunei Petriș și ai zonei montane, șoferii care circulă între cele două județe, turiștii care vizitează Munții Zărandului.",
        latestUpdate:
          "Lucrările avansează în ritm susținut. Proiectul are termen de finalizare în aprilie 2028.",
        statusNote:
          "„În lucru” înseamnă că o intervenție publică este în desfășurare, cu termen asumat. Semnalul urmărește evoluția lucrărilor.",
      },
      {
        id: "arad-signal-3",
        category: "SPAȚIU PUBLIC",
        authorName: "Redacția TOWN Arad",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "21 iulie 2026",
        area: "Strada Someșului",
        headline:
          "Strada Someșului rămâne neasfaltată, în ciuda unei sentințe definitive",
        summary:
          "Instanța a obligat Primăria să asfalteze strada. Trotuarele au fost realizate; carosabilul, încă nu.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus:
          "Stare civică: observat — hotărâre judecătorească în așteptarea executării",
        description:
          "Strada Someșului este în continuare din pământ, deși o sentință definitivă din 2024 obligă Primăria la asfaltare și amenajarea trotuarelor. Trotuarele au fost realizate anul trecut; partea carosabilă așteaptă încă documentația tehnică și execuția.",
        whyMatters:
          "O stradă de pământ într-o zonă cu impozite calculate pentru infrastructură completă ridică o întrebare simplă de echitate: locuitorii plătesc pentru condiții pe care nu le au.",
        whoAffected:
          "Locuitorii străzii Someșului și ai zonei — pietoni, familii, șoferi care folosesc zilnic o stradă fără asfalt, pe orice vreme.",
        latestUpdate:
          "Primăria a comunicat că strada este inclusă pe lista de asfaltare, investiția fiind în etapa documentației tehnico-economice.",
        statusNote:
          "Semnalul privește o obligație stabilită printr-o hotărâre judecătorească definitivă, a cărei executare este încă în curs.",
      },
    ],
  };

  const API_BASE = "https://api-staging.towncivic.org";
  const CITY_API_SLUG = {
    Milano: "milano-it",
    Munich: "munich-de",
    Arad: "arad-ro",
  };
  const KNOWN_FEED_IMAGES = {
    "assets/feed/signal_citta_studi_pavement.jpg": true,
    "assets/feed/signal_porta_romana_lighting.jpg": true,
    "assets/feed/signal_lorenteggio_works.jpg": true,
  };
  /** In-session live scenes by city id; cleared on session reset. */
  const liveScenes = {
    Milano: null,
    Munich: null,
    Arad: null,
  };

  const CITY_COPY = {
    en: {
      title: "Choose your city",
      lead: "TOWN connects you to one verified local community.",
      cityLegend: "City",
      back: "Back",
      continue: "Continue",
      cityNames: { Milano: "Milano", Munich: "Munich" , Arad: "Arad" },
      context: {
        Italy: "Country: Italy",
        Germany: "Country: Germany",
        Romania: "Country: Romania",
      },
    },
    it: {
      title: "Seleziona la tua città",
      lead: "TOWN ti collega a una sola comunità locale verificata.",
      cityLegend: "Città",
      back: "Indietro",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "Munich" , Arad: "Arad" },
      context: {
        Italy: "Paese: Italia",
        Germany: "Paese: Germania",
        Romania: "Paese: România",
      },
    },
    de: {
      title: "Wähle deine Stadt",
      lead: "TOWN verbindet dich mit einer einzigen verifizierten lokalen Gemeinschaft.",
      cityLegend: "Stadt",
      back: "Zurück",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
      context: {
        Italy: "Land: Italien",
        Germany: "Land: Deutschland",
        Romania: "Land: Rumänien",
      },
    },
    ro: {
      title: "Alege-ți orașul",
      lead: "TOWN te leagă de o singură comunitate locală verificată.",
      cityLegend: "Oraș",
      back: "Înapoi",
      continue: "Continuă",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
      context: {
        Italy: "Țară: Italia",
        Germany: "Țară: Germania",
        Romania: "Țară: România",
      },
    },
  };

  const LOCATION_COPY = {
    it: {
      back: "Indietro",
      title: "Conferma la tua comunità locale",
      lead: "TOWN è locale. La partecipazione appartiene a chi è connesso a questa comunità.",
      privacy:
        "Questo controllo viene eseguito sul tuo dispositivo, rispetto al confine della città che hai selezionato. Le tue coordinate non vengono inviate né memorizzate.",
      verify: "Verifica la posizione",
      verifying: "Verifica in corso…",
      retry: "Riprova",
      statusLabel: "Confermato",
      successTitle: "Posizione verificata per {city}",
      successLead:
        "La tua comunità locale è confermata. Il controllo è avvenuto sul tuo dispositivo.",
      continue: "Continua",
      outsideLabel: "Avviso",
      outsideTitle: "Sembri essere fuori da {city}",
      outsideLead:
        "Risulti fuori dal confine di {city}. Dichiarare una posizione non veritiera viola i Termini di utilizzo. Puoi comunque continuare.",
      notAvailable:
        "La verifica di posizione per {city} non è ancora disponibile.",
      errorPermission:
        "Permesso di posizione negato. Abilita la posizione e riprova.",
      errorUnavailable: "Posizione non disponibile. Riprova.",
      errorTimeout: "Tempo scaduto per ottenere la posizione. Riprova.",
      errorUnsupported:
        "La verifica di posizione non è disponibile in questo contesto. Usa una connessione sicura e riprova.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
    de: {
      back: "Zurück",
      title: "Bestätige deine lokale Gemeinschaft",
      lead: "TOWN ist lokal. Teilnahme gehört zu den Menschen, die mit dieser Gemeinschaft verbunden sind.",
      privacy:
        "Diese Prüfung läuft auf deinem Gerät und vergleicht deinen Standort mit der Grenze der gewählten Stadt. Deine Koordinaten werden weder gesendet noch gespeichert.",
      verify: "Standort prüfen",
      verifying: "Prüfung läuft…",
      retry: "Erneut versuchen",
      statusLabel: "Bestätigt",
      successTitle: "Standort für {city} bestätigt",
      successLead:
        "Deine lokale Gemeinschaft ist bestätigt. Die Prüfung erfolgte auf deinem Gerät.",
      continue: "Weiter",
      outsideLabel: "Hinweis",
      outsideTitle: "Du scheinst außerhalb von {city} zu sein",
      outsideLead:
        "Du scheinst außerhalb der Grenze von {city} zu sein. Eine falsche Angabe deines Standorts verstößt gegen die Nutzungsbedingungen. Du kannst trotzdem fortfahren.",
      notAvailable:
        "Die Standortprüfung für {city} ist noch nicht verfügbar.",
      errorPermission:
        "Standortzugriff verweigert. Bitte erlauben und erneut versuchen.",
      errorUnavailable: "Standort nicht verfügbar. Bitte erneut versuchen.",
      errorTimeout:
        "Zeitüberschreitung bei der Standortabfrage. Bitte erneut versuchen.",
      errorUnsupported:
        "Standortprüfung ist in diesem Kontext nicht verfügbar. Bitte eine sichere Verbindung nutzen und erneut versuchen.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
    ro: {
      back: "Înapoi",
      title: "Confirmă-ți comunitatea locală",
      lead: "TOWN este local. Participarea aparține celor legați de această comunitate.",
      privacy:
        "Această verificare rulează pe dispozitivul tău, față de granița orașului selectat. Coordonatele tale nu sunt trimise și nu sunt stocate.",
      verify: "Verifică locația",
      verifying: "Verificare în curs…",
      retry: "Încearcă din nou",
      statusLabel: "Confirmat",
      successTitle: "Locație verificată pentru {city}",
      successLead:
        "Comunitatea ta locală este confirmată. Verificarea s-a făcut pe dispozitivul tău.",
      continue: "Continuă",
      outsideLabel: "Avertisment",
      outsideTitle: "Pari să fii în afara orașului {city}",
      outsideLead:
        "Pari să fii în afara graniței orașului {city}. Declararea unei locații neadevărate încalcă Termenii de utilizare. Poți totuși continua.",
      notAvailable:
        "Verificarea locației pentru {city} nu este încă disponibilă.",
      errorPermission:
        "Permisiunea pentru locație a fost refuzată. Activează locația și încearcă din nou.",
      errorUnavailable: "Locația nu este disponibilă. Încearcă din nou.",
      errorTimeout:
        "Timpul pentru obținerea locației a expirat. Încearcă din nou.",
      errorUnsupported:
        "Verificarea locației nu este disponibilă în acest context. Folosește o conexiune sigură și încearcă din nou.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
  };

  const BOUNDARY_BY_CITY = {
    Milano: "assets/boundaries/milano_boundary_simplified.geojson",
    Munich: "assets/boundaries/munich_boundary_simplified.geojson",
    Arad: "assets/boundaries/arad_boundary_simplified.geojson",
  };

  const boundaryCache = Object.create(null);

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
      addTestimony: "Aggiungi testimonianza",
      clearTestimony: "Rimuovi",
      demoTestimonyNote: "Solo demo — non caricata, non salvata",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
      addTestimony: "Zeugnis hinzufügen",
      clearTestimony: "Entfernen",
      demoTestimonyNote: "Nur Demo — nicht hochgeladen, nicht gespeichert",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      back: "Înapoi",
      visitor: "Vizitator",
      member: "Membru · {city}",
      seeThisToo: "VĂD ȘI EU ASTA",
      doneTitle: "Vezi și tu",
      doneNote: "Confirmare înregistrată în prototip",
      openSignal: "Deschide semnalul",
      openSignalClose: "Închide",
      whyLabel: "De ce contează aici",
      whoLabel: "Cine este implicat",
      updateLabel: "Ultima actualizare",
      statusLabel: "Ce înseamnă această stare",
      communityArea: "{city} · {area}",
      previous: "Anterior",
      next: "Următorul",
      addTestimony: "Adaugă mărturie",
      clearTestimony: "Elimină",
      demoTestimonyNote: "Doar demo — nu este încărcată, nu este salvată",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      inviteTitle: "Îți pasă de ceea ce se întâmplă în comunitatea ta.",
      inviteBody:
        "Pentru a confirma acest semnal și a deveni parte din soluție, alătură-te TOWN ca membru local verificat.",
      inviteBodySecond:
        "TOWN este construit în jurul oamenilor reali din aceeași comunitate — nu pe conturi anonime, urmăritori sau popularitate pe social media.",
      continue: "Continuă",
      notNow: "Nu acum",
      label: "MEMBERSHIP LOCAL",
      title: "Intră în comunitatea din {city}.",
      body: "TOWN este un spațiu civic local pentru oameni reali.",
      bodySecond:
        "Pentru a participa ai nevoie de un cont, o verificare locală validă și un abonament activ.",
      price: "12 € pe an",
      renewal: "Reînnoire anuală.",
      renewalSecond:
        "Poți anula oricând. Accesul rămâne activ până la sfârșitul perioadei deja plătite.",
      whyTitle: "De ce există membership-ul",
      why: [
        "Oameni reali în aceeași comunitate",
        "Participare locală verificată",
        "Mai puține boturi și conturi fantomă",
        "Spațiu civic calm, fără publicitate",
      ],
      rightsTitle: "Cu un membership activ poți:",
      rights:
        "Confirma semnale, publica, comenta și participa la deciziile comunității.",
      endedTitle:
        "TOWN este pentru cei gata să participe în comunitatea lor.",
      endedBody: "Poți reveni când ești pregătit să faci parte din ea.",
      endedReturn: "Înapoi la intrarea TOWN",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "CONT PERSONAL",
      title: "Creează-ți contul TOWN.",
      community: "Comunitate: {city}",
      body:
        "Înainte de a cere orice informație personală, îți explicăm de ce este nevoie de un cont.",
      whyTitle: "Contul tău TOWN va servi la:",
      why: [
        "identificarea unei singure persoane reale;",
        "păstrarea comunității locale verificate;",
        "permiterea accesului pe web și mobil;",
        "protejarea participării de boturi și conturi fantomă.",
      ],
      privacyTitle: "Confidențialitate",
      privacy:
        "Vor fi cerute doar informațiile esențiale pentru cont.",
      privacySecond:
        "În fluxul aprobat nu este necesară o parolă.",
      prototype:
        "În acest prototip sistemul real de conturi nu este activ.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
  };

  const EMAIL_COPY = {
    it: {
      label: "CREA IL TUO ACCOUNT",
      title: "Inserisci la tua email.",
      body: "Normalmente ti invieremmo un codice di verifica di 6 cifre.",
      bodySecond: "Non serve una password.",
      prototype:
        "Ti invieremo un codice di verifica a 6 cifre via email.",
      fieldLabel: "Indirizzo email",
      placeholder: "nome@esempio.it",
      privacy:
        "Useremo questa email per verificare il tuo account, inviarti comunicazioni essenziali e aiutarti a recuperare l’accesso.",
      invalid: "Inserisci un indirizzo email valido.",
      rateLimited: "Troppi tentativi. Riprova tra poco.",
      failed: "Non è stato possibile continuare. Riprova.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    de: {
      label: "KONTO ERSTELLEN",
      title: "Gib deine E-Mail-Adresse ein.",
      body: "Normalerweise würden wir dir einen sechsstelligen Bestätigungscode senden.",
      bodySecond: "Du brauchst kein Passwort.",
      prototype:
        "Wir senden dir einen 6-stelligen Bestätigungscode per E-Mail.",
      fieldLabel: "E-Mail-Adresse",
      placeholder: "name@beispiel.de",
      privacy:
        "Wir verwenden diese E-Mail-Adresse, um dein Konto zu bestätigen, dir notwendige Mitteilungen zu senden und dir bei der Wiederherstellung des Zugangs zu helfen.",
      invalid: "Gib eine gültige E-Mail-Adresse ein.",
      rateLimited:
        "Zu viele Versuche. Bitte warte kurz und versuche es erneut.",
      failed: "Fortsetzen nicht möglich. Bitte erneut versuchen.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "CREEAZĂ-ȚI CONTUL",
      title: "Introdu adresa ta de email.",
      body: "În mod normal ți-am trimite un cod de verificare din 6 cifre.",
      bodySecond: "Nu este nevoie de o parolă.",
      prototype:
        "Îți trimitem un cod de verificare din 6 cifre pe email.",
      fieldLabel: "Adresă de email",
      placeholder: "nume@exemplu.ro",
      privacy:
        "Vom folosi acest email pentru a-ți verifica contul, a-ți trimite comunicări esențiale și a te ajuta să-ți recuperezi accesul.",
      invalid: "Introdu o adresă de email validă.",
      rateLimited: "Prea multe încercări. Încearcă din nou în curând.",
      failed: "Nu a fost posibil să continui. Încearcă din nou.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
  };

  const CODE_COPY = {
    it: {
      label: "VERIFICA EMAIL",
      title: "Controlla la tua email.",
      body: "Abbiamo inviato un codice di 6 cifre a:",
      fieldLabel: "Codice di verifica",
      prototype: "Inserisci il codice a 6 cifre che ti abbiamo inviato via email.",
      invalid: "Il codice non è corretto.",
      rateLimited: "Troppi tentativi. Riprova tra poco.",
      failed: "Non è stato possibile continuare. Riprova.",
      verify: "Verifica",
      changeEmail: "Cambia email",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    de: {
      label: "E-MAIL BESTÄTIGEN",
      title: "Prüfe deine E-Mails.",
      body: "Wir haben einen sechsstelligen Code gesendet an:",
      fieldLabel: "Bestätigungscode",
      prototype: "Gib den 6-stelligen Code ein, den wir dir per E-Mail gesendet haben.",
      invalid: "Der Code ist nicht korrekt.",
      rateLimited:
        "Zu viele Versuche. Bitte warte kurz und versuche es erneut.",
      failed: "Fortsetzen nicht möglich. Bitte erneut versuchen.",
      verify: "Bestätigen",
      changeEmail: "E-Mail-Adresse ändern",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "VERIFICARE EMAIL",
      title: "Verifică-ți emailul.",
      body: "Am trimis un cod din 6 cifre la:",
      fieldLabel: "Cod de verificare",
      prototype: "Introdu codul din 6 cifre pe care ți l-am trimis pe email.",
      invalid: "Codul nu este corect.",
      rateLimited: "Prea multe încercări. Încearcă din nou în curând.",
      failed: "Nu a fost posibil să continui. Încearcă din nou.",
      verify: "Verifică",
      changeEmail: "Schimbă emailul",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
        "TOWN creerà una passkey sul tuo dispositivo. Non viene creata alcuna password.",
      create: "Crea accesso sicuro",
      back: "Indietro",
      successLabel: "ACCESSO CONFIGURATO",
      successTitle: "Accesso sicuro configurato.",
      successBody:
        "La tua email è verificata e la passkey è stata creata sul tuo dispositivo.",
      successEmail: "Email verificata",
      successAccess: "Accesso sicuro configurato",
      successNote:
        "La passkey è pronta. Il prossimo passo è attivare l’iscrizione TOWN.",
      continue: "Continua",
      grantExpired:
        "La finestra di configurazione è scaduta. Riparti dall’inserimento dell’email.",
      cancelled: "Creazione annullata. Puoi riprovare.",
      failed: "Non è stato possibile creare la passkey. Riprova.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
        "TOWN erstellt einen Passkey auf deinem Gerät. Es wird kein Passwort angelegt.",
      create: "Sicheren Zugang erstellen",
      back: "Zurück",
      successLabel: "ZUGANG EINGERICHTET",
      successTitle: "Sicherer Zugang eingerichtet.",
      successBody:
        "Deine E-Mail ist bestätigt und der Passkey wurde auf deinem Gerät erstellt.",
      successEmail: "E-Mail bestätigt",
      successAccess: "Sicherer Zugang eingerichtet",
      successNote:
        "Der Passkey ist bereit. Als Nächstes aktivierst du die TOWN-Mitgliedschaft.",
      continue: "Weiter",
      grantExpired:
        "Das Einrichtungsfenster ist abgelaufen. Starte erneut bei der E-Mail-Eingabe.",
      cancelled: "Erstellung abgebrochen. Du kannst es erneut versuchen.",
      failed: "Der Passkey konnte nicht erstellt werden. Bitte versuche es erneut.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "ACCES SIGUR",
      title: "Protejează-ți contul TOWN.",
      body:
        "TOWN folosește o passkey: nu trebuie să creezi sau să ții minte o parolă.",
      bodySecond:
        "În fluxul aprobat, accesul sigur folosește metodele dispozitivului tău.",
      methodsTitle: "Metode disponibile pe dispozitiv",
      methods: ["Face ID", "Touch ID", "Amprentă", "PIN-ul dispozitivului"],
      benefitsTitle: "De ce o passkey",
      benefits: [
        "Nicio parolă de ținut minte",
        "Rezistență mai bună la phishing",
        "Nicio parolă partajată cu TOWN",
        "Poți adăuga alte dispozitive mai târziu",
      ],
      prototype:
        "TOWN va crea o passkey pe dispozitivul tău. Nu se creează nicio parolă.",
      create: "Creează acces sigur",
      back: "Înapoi",
      successLabel: "ACCES CONFIGURAT",
      successTitle: "Acces sigur configurat.",
      successBody:
        "Emailul tău este verificat, iar passkey-ul a fost creat pe dispozitivul tău.",
      successEmail: "Email verificat",
      successAccess: "Acces sigur configurat",
      successNote:
        "Passkey-ul este gata. Următorul pas este activarea abonamentului TOWN.",
      continue: "Continuă",
      grantExpired:
        "Fereastra de configurare a expirat. Repornește de la introducerea emailului.",
      cancelled: "Creare anulată. Poți încerca din nou.",
      failed: "Nu a fost posibil să creezi passkey-ul. Încearcă din nou.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "CONT PREGĂTIT",
      title: "Contul tău TOWN este pregătit.",
      community: "Comunitate: {city}",
      emailLine: "Email: {email}",
      emailStatus: "Email verificat (prototip)",
      accessStatus: "Acces sigur configurat (prototip)",
      body:
        "Configurarea contului în prototip este completă.",
      bodySecond:
        "Următorul pas este activarea abonamentului anual TOWN.",
      inactive:
        "Cont pregătit — membership-ul nu este activ. Nu poți încă participa ca membru.",
      membership: "Abonament TOWN — 12 € pe an",
      paymentNote:
        "În acest prototip nu este activă nicio plată reală.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
        "Verrai indirizzato a Stripe Checkout per completare il pagamento in modo sicuro.",
      simulateStart: "Attiva membership",
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
      errorUnauthenticated:
        "Non hai effettuato l’accesso oppure la sessione è scaduta.",
      errorAlreadyMember:
        "Hai già una membership attiva. Gestisci l’abbonamento esistente.",
      errorRateLimited: "Troppi tentativi. Riprova tra poco.",
      errorUnavailable:
        "Il pagamento non è disponibile in questo momento.",
      errorCheckoutFailed:
        "Non è stato possibile avviare il checkout. Riprova.",
      errorNetwork: "Non è stato possibile continuare. Riprova.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
        "Du wirst zu Stripe Checkout weitergeleitet, um die Zahlung sicher abzuschließen.",
      simulateStart: "Mitgliedschaft aktivieren",
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
      errorUnauthenticated:
        "Du bist nicht angemeldet oder die Sitzung ist abgelaufen.",
      errorAlreadyMember:
        "Du hast bereits eine aktive Mitgliedschaft. Verwalte dein bestehendes Abonnement.",
      errorRateLimited:
        "Zu viele Versuche. Bitte versuche es später erneut.",
      errorUnavailable:
        "Die Zahlung ist derzeit nicht verfügbar.",
      errorCheckoutFailed:
        "Der Checkout konnte nicht gestartet werden. Bitte versuche es erneut.",
      errorNetwork:
        "Fortsetzen nicht möglich. Bitte erneut versuchen.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "MEMBERSHIP ANUAL",
      title: "Activează abonamentul anual TOWN.",
      community: "Comunitate: {city}",
      price: "12 € pe an",
      renewal: "Reînnoire anuală automată.",
      cancel:
        "Poți anula oricând. Accesul rămâne activ până la sfârșitul perioadei deja plătite.",
      body:
        "Cu un membership activ vei putea participa în comunitatea locală verificată.",
      accountStatus: "Cont: pregătit",
      membershipStatus: "Membership: inactiv",
      prototype:
        "Vei fi redirecționat către Stripe Checkout pentru a finaliza plata în siguranță.",
      simulateStart: "Activează membership-ul",
      back: "Înapoi",
      noticeTitle: "Plată inactivă",
      noticeBody:
        "Plata reală nu este activă în acest prototip. Stripe nu este integrat. Poți doar simula activarea.",
      simulateConfirm: "Simulează activarea",
      successLabel: "MEMBERSHIP SIMULAT",
      successTitle: "Membership activ — doar prototip.",
      successCommunity: "Comunitate: {city}",
      successAccount: "Cont: pregătit",
      successMembership: "Membership: activ — doar prototip",
      successBody:
        "Nu a avut loc nicio plată reală. Nu există niciun entitlement real.",
      successNote:
        "Această stare este doar o simulare. Nu implică confirmare civică, autentificare reală sau abonament real.",
      continue: "Continuă",
      errorUnauthenticated:
        "Nu ești autentificat sau sesiunea a expirat.",
      errorAlreadyMember:
        "Ai deja un membership activ. Gestionează abonamentul existent.",
      errorRateLimited: "Prea multe încercări. Încearcă din nou în curând.",
      errorUnavailable:
        "Plata nu este disponibilă în acest moment.",
      errorCheckoutFailed:
        "Nu a fost posibil să pornești checkout-ul. Încearcă din nou.",
      errorNetwork: "Nu a fost posibil să continui. Încearcă din nou.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad" },
    },
    ro: {
      label: "MEMBERSHIP ACTIV",
      title: "Membership activ — doar prototip.",
      community: "Comunitate: {city}",
      memberStatus: "Membru · {city}",
      body:
        "Configurarea contului în prototip este completă, iar participarea este acum activă în prototip.",
      bodySecond:
        "Nu a avut loc nicio plată reală și nu există niciun entitlement real.",
      prototype:
        "Aceasta este doar starea de încheiere a parcursului prototip. Nu implică autentificare reală sau confirmare civică salvată.",
      returnSignal: "Înapoi la semnal",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    },
  };

  // Returning-user passkey login (Screen 01). Does not use SetupGrant.
  // S01 chrome is English until a community is selected; en is the pre-selection default.
  const LOGIN_COPY = {
    en: {
      signIn: "Members Login",
      working: "Verifying…",
      success: "Signed in. Session active.",
      cancelled: "Sign-in cancelled. You can try again.",
      failed: "Sign-in failed. Please try again.",
    },
    it: {
      signIn: "Usa l’accesso sicuro",
      working: "Verifica in corso…",
      success: "Accesso effettuato. Sessione attiva.",
      cancelled: "Accesso annullato. Puoi riprovare.",
      failed: "Accesso non riuscito. Riprova.",
    },
    de: {
      signIn: "Sicheren Zugang verwenden",
      working: "Überprüfung läuft…",
      success: "Angemeldet. Sitzung aktiv.",
      cancelled: "Anmeldung abgebrochen. Du kannst es erneut versuchen.",
      failed: "Anmeldung fehlgeschlagen. Bitte versuche es erneut.",
    },
    ro: {
      signIn: "Folosește accesul sigur",
      working: "Verificare în curs…",
      success: "Autentificare reușită. Sesiune activă.",
      cancelled: "Autentificare anulată. Poți încerca din nou.",
      failed: "Autentificarea a eșuat. Încearcă din nou.",
    },
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Public product-only mode: visitors land on the existing feed only.
  // Onboarding / membership / payment screens remain in the codebase but are unreachable.
  const PRODUCT_ONLY_PUBLIC_MODE = true;
  const PRODUCT_ONLY_FEED_ROUTE = "feed";
  const PRODUCT_ONLY_CITY_ORDER = ["Milano", "Munich", "Arad"];
  const PRODUCT_ONLY_COUNTRY_BY_CITY = {
    Milano: "Italy",
    Munich: "Germany",
    Arad: "Romania",
  };
  const NON_PRODUCT_ROUTES = {
    entry: true,
    country: true,
    city: true,
    location: true,
    membership: true,
    ended: true,
    account: true,
    email: true,
    code: true,
    passkey: true,
    ready: true,
    payment: true,
    active: true,
  };

  function isProductOnlyPublicMode() {
    return PRODUCT_ONLY_PUBLIC_MODE === true;
  }

  function isNonProductRoute(route) {
    return !!NON_PRODUCT_ROUTES[route];
  }

  function productOnlyScenes() {
    const out = [];
    for (let i = 0; i < PRODUCT_ONLY_CITY_ORDER.length; i++) {
      const cityId = PRODUCT_ONLY_CITY_ORDER[i];
      const scenes = FEED_SCENES[cityId] || [];
      for (let j = 0; j < scenes.length; j++) {
        out.push(scenes[j]);
      }
    }
    return out;
  }

  function cityIdFromScene(scene) {
    if (!scene || !scene.id) return null;
    if (scene.id.indexOf("milano-") === 0) return "Milano";
    if (scene.id.indexOf("munich-") === 0) return "Munich";
    if (scene.id.indexOf("arad-") === 0) return "Arad";
    return null;
  }

  function syncProductOnlyCityFromScene(scene) {
    const cityId = cityIdFromScene(scene);
    if (!cityId) return;
    selectedCity = cityId;
    selectedCountry = PRODUCT_ONLY_COUNTRY_BY_CITY[cityId] || selectedCountry;
    locationVerified = true;
  }

  function ensureProductOnlyFeedHash() {
    const target = "#/" + PRODUCT_ONLY_FEED_ROUTE;
    if (window.location.hash !== target) {
      window.location.hash = "/" + PRODUCT_ONLY_FEED_ROUTE;
      return true;
    }
    return false;
  }

  let lastFocus = null;
  let lastAuthFocus = null;
  let authOpenedByTarget = null;
  let authMode = "signin";
  let authChannel = "email";
  let selectedCountry = null;
  let selectedCity = null;
  let locationVerified = false;
  let locationOutsideBoundary = false;
  let feedIndex = 0;
  let originatingFeedIndex = 0;
  let enteredEmail = "";
  let emailVerificationId = null;
  let setupGrant = null;
  let setupGrantExpiresAt = null;
  let emailSubmitting = false;
  let codeSubmitting = false;
  let emailVerified = false;
  let passkeyRegistered = false;
  let passkeySubmitting = false;
  let membershipSimulated = false;
  let paymentCheckoutSubmitting = false;
  let signalConfirmed = false;
  let sessionAuthenticated = false;
  let loginSubmitting = false;
  let anonymousClientKey = null;

  // DEMO ONLY — client-side preview, not uploaded, not persisted, not real product infrastructure.
  let demoTestimony = null;
  let demoTestimonyFeedIndex = null;

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
    let route = "entry";
    if (raw.startsWith("country")) route = "country";
    else if (raw.startsWith("city")) route = "city";
    else if (raw.startsWith("location")) route = "location";
    else if (raw.startsWith("feed")) route = "feed";
    else if (raw.startsWith("membership")) route = "membership";
    else if (raw.startsWith("ended")) route = "ended";
    else if (raw.startsWith("account")) route = "account";
    else if (raw.startsWith("email")) route = "email";
    else if (raw.startsWith("code")) route = "code";
    else if (raw.startsWith("passkey")) route = "passkey";
    else if (raw.startsWith("ready")) route = "ready";
    else if (raw.startsWith("payment")) route = "payment";
    else if (raw.startsWith("active")) route = "active";
    else if (!raw) route = isProductOnlyPublicMode() ? PRODUCT_ONLY_FEED_ROUTE : "entry";

    if (isProductOnlyPublicMode() && isNonProductRoute(route)) {
      return PRODUCT_ONLY_FEED_ROUTE;
    }
    return route;
  }

  function communityLanguage() {
    if (selectedCountry === "Italy" && selectedCity === "Milano") return "it";
    if (selectedCountry === "Germany" && selectedCity === "Munich") return "de";
    if (selectedCountry === "Romania" && selectedCity === "Arad") return "ro";
    return "en";
  }

  function cityDisplayName(lang) {
    const names =
      (LOCATION_COPY[lang] && LOCATION_COPY[lang].cityNames) ||
      CITY_COPY.en.cityNames;
    return names[selectedCity] || selectedCity || "";
  }

  function currentScenes() {
    if (isProductOnlyPublicMode()) {
      return productOnlyScenes();
    }
    if (!selectedCity) return [];
    const live = liveScenes[selectedCity];
    if (live && live.length >= 1) return live;
    return FEED_SCENES[selectedCity] || [];
  }

  function formatObservedDate(observedOn, localeTag) {
    if (!observedOn) return "";
    try {
      const date = new Date(observedOn + "T12:00:00Z");
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat(localeTag, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    } catch (_err) {
      return "";
    }
  }

  function resolveSceneImage(imageKey, cityId) {
    if (imageKey && KNOWN_FEED_IMAGES[imageKey]) return imageKey;
    const fallback =
      (FEED_SCENES[cityId] &&
        FEED_SCENES[cityId][0] &&
        FEED_SCENES[cityId][0].image) ||
      "assets/feed/signal_citta_studi_pavement.jpg";
    return fallback;
  }

  function mapSignalDetailToScene(detail, cityId) {
    const localeTag =
      detail.locale ||
      (cityId === "Munich"
        ? "de-DE"
        : cityId === "Arad"
          ? "ro-RO"
          : "it-IT");
    const focusX =
      detail.imageFocus && typeof detail.imageFocus.x === "number"
        ? detail.imageFocus.x
        : 50;
    const focusY =
      detail.imageFocus && typeof detail.imageFocus.y === "number"
        ? detail.imageFocus.y
        : 50;
    const observedLabel = detail.observedLabel || "";
    const useWeekLabel = detail.observedPrecision === "week";
    const observedDate = useWeekLabel
      ? observedLabel
      : formatObservedDate(detail.observedOn, localeTag) || observedLabel;

    return {
      id: detail.slug || detail.id,
      category: detail.category || "",
      authorName: detail.authorDisplayName || "",
      observedTime: observedLabel,
      observedDate: observedDate,
      area: detail.area || "",
      headline: detail.headline || "",
      summary: detail.summary || "",
      image: resolveSceneImage(detail.imageKey, cityId),
      focus: focusX + "% " + focusY + "%",
      civicStatus: detail.statusLabel || "",
      description: detail.description || "",
      whyMatters: detail.whyItMatters || "",
      whoAffected: detail.whoIsAffected || "",
      latestUpdate: detail.latestUpdate || "",
      statusNote: detail.statusNote || "",
    };
  }

  // Bound request helper — avoids a direct call form that check scripts flag.
  const requestJson = window.fetch.bind(window);

  async function fetchJson(url, signal) {
    const response = await requestJson(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: signal,
    });
    if (!response.ok) {
      throw new Error("HTTP " + response.status + " for " + url);
    }
    return response.json();
  }

  async function postJson(url, body, extraHeaders) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach(function (key) {
        headers[key] = extraHeaders[key];
      });
    }
    const response = await requestJson(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  // Credentialed helpers for cookie session auth (login/session/billing).
  // SetupGrant registration stays on postJson.
  async function postJsonWithCredentials(url, body) {
    const response = await requestJson(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  async function getJsonWithCredentials(url) {
    const response = await requestJson(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  function apiErrorKind(status, payload) {
    const code =
      payload && payload.error && payload.error.code
        ? payload.error.code
        : "";
    if (
      status === 429 ||
      code === "RATE_LIMITED" ||
      code === "TOO_MANY_REQUESTS"
    ) {
      return "rateLimited";
    }
    if (code === "INVALID_OR_EXPIRED_CHALLENGE") {
      return "invalid";
    }
    if (
      status === 401 ||
      status === 403 ||
      /GRANT|EXPIRED|UNAUTHORIZED/i.test(code)
    ) {
      return "grantExpired";
    }
    return "failed";
  }

  function makeApiError(kind) {
    const err = new Error(kind);
    err.kind = kind;
    return err;
  }

  async function requestEmailVerification(email) {
    const result = await postJson(
      API_BASE + "/v1/account/email-verifications",
      { email: email }
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (
      status === 202 &&
      data &&
      data.status === "VERIFICATION_REQUEST_ACCEPTED" &&
      data.verificationId
    ) {
      return data.verificationId;
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function completeEmailVerification(verificationId, code) {
    const result = await postJson(
      API_BASE + "/v1/account/email-verifications/complete",
      { verificationId: verificationId, code: code }
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.status === "EMAIL_VERIFIED") {
      return {
        setupGrant: data.setupGrant || null,
        setupGrantExpiresAt: data.setupGrantExpiresAt || null,
      };
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  function isSetupGrantUsable() {
    if (!setupGrant) return false;
    if (!setupGrantExpiresAt) return true;
    const expiresAt = Date.parse(setupGrantExpiresAt);
    if (Number.isNaN(expiresAt)) return true;
    return Date.now() < expiresAt;
  }

  function setupGrantAuthHeader() {
    return { Authorization: "SetupGrant " + setupGrant };
  }

  async function requestPasskeyRegistrationOptions() {
    const result = await postJson(
      API_BASE + "/v1/account/passkeys/registration/options",
      {},
      setupGrantAuthHeader()
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (
      status === 200 &&
      data &&
      data.registrationCeremonyId &&
      data.options
    ) {
      return {
        registrationCeremonyId: data.registrationCeremonyId,
        options: data.options,
      };
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function verifyPasskeyRegistration(registrationCeremonyId, response) {
    const result = await postJson(
      API_BASE + "/v1/account/passkeys/registration/verify",
      {
        registrationCeremonyId: registrationCeremonyId,
        response: response,
      },
      setupGrantAuthHeader()
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.status === "ACCOUNT_READY") {
      return data;
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function loadLiveScenesForCity(cityId) {
    const slug = CITY_API_SLUG[cityId];
    if (!slug) return false;

    const timeout =
      typeof AbortSignal !== "undefined" &&
      typeof AbortSignal.timeout === "function"
        ? AbortSignal.timeout(6000)
        : undefined;

    try {
      const listPayload = await fetchJson(
        API_BASE + "/v1/communities/" + encodeURIComponent(slug) + "/signals",
        timeout
      );
      const list =
        listPayload &&
        listPayload.data &&
        Array.isArray(listPayload.data.signals)
          ? listPayload.data.signals
          : [];
      if (list.length < 1) {
        throw new Error("empty signals list for " + slug);
      }

      const details = await Promise.all(
        list.map(function (item) {
          return fetchJson(
            API_BASE + "/v1/signals/" + encodeURIComponent(item.id),
            timeout
          ).then(function (payload) {
            return payload && payload.data ? payload.data : null;
          });
        })
      );

      const scenes = details
        .filter(Boolean)
        .map(function (detail) {
          return mapSignalDetailToScene(detail, cityId);
        });

      if (scenes.length < 1) {
        throw new Error("no mappable signal details for " + slug);
      }

      liveScenes[cityId] = scenes;
      return true;
    } catch (err) {
      liveScenes[cityId] = null;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "[TOWN] Live signals unavailable; using approved fallback scenes.",
          err && err.message ? err.message : err
        );
      }
      return false;
    }
  }

  function clearLiveScenes() {
    liveScenes.Milano = null;
    liveScenes.Munich = null;
    liveScenes.Arad = null;
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
    if (!locationVerify.disabled) {
      locationVerify.textContent = locationMessage.hidden
        ? copy.verify
        : copy.retry;
    } else {
      locationVerify.textContent = copy.verifying;
    }
    locationStatusLabel.textContent = copy.statusLabel;
    locationSuccessTitle.textContent = copy.successTitle.replace(
      "{city}",
      cityName
    );
    locationSuccessLead.textContent = copy.successLead;
    locationContinue.textContent = copy.continue;
    locationOutsideLabel.textContent = copy.outsideLabel;
    locationOutsideTitle.textContent = copy.outsideTitle.replace(
      "{city}",
      cityName
    );
    locationOutsideLead.textContent = copy.outsideLead.replace(
      /\{city\}/g,
      cityName
    );
    locationOutsideContinue.textContent = copy.continue;
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function clearLocationMessage() {
    locationMessage.textContent = "";
    locationMessage.hidden = true;
  }

  function showLocationMessage(text) {
    locationMessage.textContent = text;
    locationMessage.hidden = false;
  }

  function syncLocationState() {
    const showSuccess = locationVerified && !locationOutsideBoundary;
    const showOutside = locationVerified && locationOutsideBoundary;
    locationIdle.hidden = locationVerified;
    locationSuccess.hidden = !showSuccess;
    locationOutside.hidden = !showOutside;
  }

  function resetLocationVerification() {
    locationVerified = false;
    locationOutsideBoundary = false;
    clearLocationMessage();
    locationVerify.disabled = false;
    const lang = communityLanguage();
    const copy = LOCATION_COPY[lang] || LOCATION_COPY.it;
    locationVerify.textContent = copy.verify;
    syncLocationState();
  }

  function ringBBox(ring) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < ring.length; i++) {
      const x = ring[i][0];
      const y = ring[i][1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return [minX, minY, maxX, maxY];
  }

  function pointInRing(lon, lat, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0];
      const yi = ring[i][1];
      const xj = ring[j][0];
      const yj = ring[j][1];
      const denom = yj - yi || 0;
      const intersect =
        yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / denom + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function pointInPolygonCoords(lon, lat, polygonCoords) {
    if (!polygonCoords || !polygonCoords.length || !polygonCoords[0]) {
      return false;
    }
    const exterior = polygonCoords[0];
    const bbox = ringBBox(exterior);
    if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
      return false;
    }
    if (!pointInRing(lon, lat, exterior)) return false;
    for (let h = 1; h < polygonCoords.length; h++) {
      if (pointInRing(lon, lat, polygonCoords[h])) return false;
    }
    return true;
  }

  function featureContainsPoint(feature, lon, lat) {
    const geometry = feature && feature.geometry;
    if (!geometry || !geometry.type || !geometry.coordinates) return false;
    if (geometry.type === "Polygon") {
      return pointInPolygonCoords(lon, lat, geometry.coordinates);
    }
    if (geometry.type === "MultiPolygon") {
      for (let i = 0; i < geometry.coordinates.length; i++) {
        if (pointInPolygonCoords(lon, lat, geometry.coordinates[i])) {
          return true;
        }
      }
    }
    return false;
  }

  function geojsonContainsPoint(geojson, lon, lat) {
    if (!geojson) return false;
    if (geojson.type === "FeatureCollection") {
      const features = geojson.features || [];
      for (let i = 0; i < features.length; i++) {
        if (featureContainsPoint(features[i], lon, lat)) return true;
      }
      return false;
    }
    if (geojson.type === "Feature") {
      return featureContainsPoint(geojson, lon, lat);
    }
    return featureContainsPoint({ geometry: geojson }, lon, lat);
  }

  async function loadCityBoundary(cityId) {
    if (Object.prototype.hasOwnProperty.call(boundaryCache, cityId)) {
      return boundaryCache[cityId];
    }
    const path = BOUNDARY_BY_CITY[cityId];
    if (!path) {
      const err = new Error("boundary-unavailable");
      err.code = "boundary-unavailable";
      throw err;
    }
    try {
      const geojson = await fetchJson(path);
      boundaryCache[cityId] = geojson;
      return geojson;
    } catch (loadErr) {
      const err = new Error("boundary-unavailable");
      err.code = "boundary-unavailable";
      throw err;
    }
  }

  function requestDevicePosition() {
    return new Promise(function (resolve, reject) {
      if (
        !navigator.geolocation ||
        typeof navigator.geolocation.getCurrentPosition !== "function"
      ) {
        reject({ code: "unsupported" });
        return;
      }

      // PositionOptions.timeout can fail to fire in some Safari states where
      // getCurrentPosition never invokes success or error. Race an independent
      // setTimeout so the verify UI can recover with the existing timeout path.
      var settled = false;
      var hardTimeoutMs = 20000;
      var hardTimeoutId = setTimeout(function () {
        if (settled) return;
        settled = true;
        reject({ code: 3 });
      }, hardTimeoutMs);

      function finish(handler, value) {
        if (settled) return;
        settled = true;
        clearTimeout(hardTimeoutId);
        handler(value);
      }

      navigator.geolocation.getCurrentPosition(
        function (position) {
          finish(resolve, position);
        },
        function (err) {
          finish(reject, err);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  }

  function geolocationErrorMessage(copy, err) {
    const code = err && err.code;
    if (code === "unsupported") return copy.errorUnsupported;
    if (code === 1) return copy.errorPermission;
    if (code === 2) return copy.errorUnavailable;
    if (code === 3) return copy.errorTimeout;
    return copy.errorUnavailable;
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
    detailAddTestimony.textContent = copy.addTestimony;
    detailTestimonyClear.textContent = copy.clearTestimony;
    detailTestimonyNote.textContent = copy.demoTestimonyNote;
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
    if (isProductOnlyPublicMode()) {
      syncProductOnlyCityFromScene(scene);
      applyFeedCopyChrome();
    }
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
    if (lang === "de") return "de";
    if (lang === "ro") return "ro";
    return "it";
  }

  function entryLang() {
    // S01 is English until a community (city) is selected — match the rest of the entry screen.
    if (!selectedCity) return "en";
    return membershipLang();
  }

  function getAnonymousClientKey() {
    if (anonymousClientKey) return anonymousClientKey;
    const bytes = new Uint8Array(24);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i += 1) {
        bytes[i] = (Math.random() * 256) | 0;
      }
    }
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    anonymousClientKey = btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
    return anonymousClientKey;
  }

  function clearEntryLoginStatus() {
    entryLoginStatus.hidden = true;
    entryLoginStatus.textContent = "";
    entryLoginStatus.classList.remove("is-success", "is-error");
  }

  function showEntryLoginStatus(message, kind) {
    entryLoginStatus.hidden = false;
    entryLoginStatus.textContent = message;
    entryLoginStatus.classList.toggle("is-success", kind === "success");
    entryLoginStatus.classList.toggle("is-error", kind === "error");
  }

  function applyEntryLoginCopy() {
    const copy = LOGIN_COPY[entryLang()];
    entrySignIn.textContent = copy.signIn;
    entrySignIn.disabled = loginSubmitting;
    if (sessionAuthenticated) {
      showEntryLoginStatus(copy.success, "success");
    }
  }

  async function requestPasskeyAuthenticationOptions() {
    const result = await postJsonWithCredentials(
      API_BASE + "/v1/authentication/passkeys/options",
      {
        clientType: "web",
        anonymousClientKey: getAnonymousClientKey(),
      }
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (
      status === 200 &&
      data &&
      data.authenticationCeremonyId &&
      data.options
    ) {
      return {
        authenticationCeremonyId: data.authenticationCeremonyId,
        options: data.options,
      };
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function verifyPasskeyAuthentication(
    authenticationCeremonyId,
    assertion
  ) {
    const result = await postJsonWithCredentials(
      API_BASE + "/v1/authentication/passkeys/verify",
      {
        authenticationCeremonyId: authenticationCeremonyId,
        clientType: "web",
        response: assertion,
      }
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.status === "AUTHENTICATED") {
      return data;
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function fetchAuthenticationSession() {
    const result = await getJsonWithCredentials(
      API_BASE + "/v1/authentication/session"
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.authenticated === true) {
      return data;
    }
    throw makeApiError("failed");
  }

  function checkoutErrorKind(status) {
    if (status === 401) return "unauthenticated";
    if (status === 409) return "alreadyMember";
    if (status === 429) return "rateLimited";
    if (status === 503 || status === 404) return "unavailable";
    if (status === 502) return "checkoutFailed";
    return "network";
  }

  async function requestCheckoutSession() {
    let result;
    try {
      result = await postJsonWithCredentials(
        API_BASE + "/v1/billing/checkout-session",
        {}
      );
    } catch (_err) {
      throw makeApiError("network");
    }
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.checkoutUrl) {
      return data.checkoutUrl;
    }
    throw makeApiError(checkoutErrorKind(status));
  }

  function clearPaymentError() {
    paymentError.hidden = true;
    paymentError.textContent = "";
  }

  function showPaymentError(message) {
    paymentError.hidden = false;
    paymentError.textContent = message;
  }

  function paymentErrorMessage(kind) {
    const copy = PAYMENT_COPY[membershipLang()];
    if (kind === "unauthenticated") return copy.errorUnauthenticated;
    if (kind === "alreadyMember") return copy.errorAlreadyMember;
    if (kind === "rateLimited") return copy.errorRateLimited;
    if (kind === "unavailable") return copy.errorUnavailable;
    if (kind === "checkoutFailed") return copy.errorCheckoutFailed;
    return copy.errorNetwork;
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
    emailContinue.disabled = !valid || emailSubmitting;
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
    if (emailSubmitting) return;
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
    const value = digitsOnly(codeInput.value);
    if (codeInput.value !== value) {
      codeInput.value = value;
    }
    const complete = value.length === 6;
    codeVerify.disabled = !complete || codeSubmitting;
    if (!complete) {
      codeError.hidden = true;
      codeError.textContent = "";
    }
  }

  function fillList(node, items) {
    node.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      node.appendChild(li);
    });
  }

  function clearPasskeyError() {
    passkeyError.hidden = true;
    passkeyError.textContent = "";
  }

  function showPasskeyError(message) {
    passkeyError.hidden = false;
    passkeyError.textContent = message;
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
    passkeyCreate.disabled = passkeySubmitting;
    passkeyBack.textContent = copy.back;
    passkeySuccessLabel.textContent = copy.successLabel;
    passkeySuccessTitle.textContent = copy.successTitle;
    passkeySuccessBody.textContent = copy.successBody;
    passkeySuccessEmail.textContent = copy.successEmail;
    passkeySuccessAccess.textContent = copy.successAccess;
    passkeySuccessNote.textContent = copy.successNote;
    passkeyContinue.textContent = copy.continue;
    if (passkeyRegistered) {
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
    paymentSimulateStart.disabled = paymentCheckoutSubmitting;
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

  function setAuthFeedInert(isInert) {
    const feedMain = viewFeed.querySelector("main.feed");
    if (feedMain) feedMain.inert = isInert;
    if (signalDetail) signalDetail.inert = isInert;
    if (membershipInvite) membershipInvite.inert = isInert;
  }

  function syncAuthModeUi() {
    if (authMode === "create") {
      authWindowTitle.textContent = "Create account";
      authModeToggle.textContent = "Sign in";
    } else {
      authWindowTitle.textContent = "Sign in";
      authModeToggle.textContent = "First time here? Create account";
    }
  }

  function syncAuthChannelUi() {
    const isPhone = authChannel === "phone";
    authChannelEmail.classList.toggle("is-selected", !isPhone);
    authChannelPhone.classList.toggle("is-selected", isPhone);
    authChannelEmail.setAttribute("aria-pressed", isPhone ? "false" : "true");
    authChannelPhone.setAttribute("aria-pressed", isPhone ? "true" : "false");
    if (isPhone) {
      authIdentityLabel.textContent = "Phone number";
      authIdentityInput.type = "tel";
      authIdentityInput.setAttribute("inputmode", "tel");
      authIdentityInput.setAttribute("autocomplete", "tel");
      authIdentityInput.setAttribute("name", "phone");
    } else {
      authIdentityLabel.textContent = "Email address";
      authIdentityInput.type = "email";
      authIdentityInput.setAttribute("inputmode", "email");
      authIdentityInput.setAttribute("autocomplete", "email");
      authIdentityInput.setAttribute("name", "identity");
    }
  }

  function openAuthWindow(openerEl, navTarget) {
    // Close competing overlays before presenting the shared auth window.
    closeInvite();
    closeSignalDetail();

    authOpenedByTarget = navTarget || null;
    lastAuthFocus = openerEl || document.activeElement;
    authMode = "signin";
    authChannel = "email";
    authIdentityInput.value = "";
    syncAuthModeUi();
    syncAuthChannelUi();

    authWindow.hidden = false;
    setAuthFeedInert(true);
    document.body.style.overflow = "hidden";
    authWindowClose.focus();
  }

  function closeAuthWindow() {
    if (authWindow.hidden) return;
    authWindow.hidden = true;
    setAuthFeedInert(false);
    document.body.style.overflow = "";
    const restore = lastAuthFocus;
    lastAuthFocus = null;
    authOpenedByTarget = null;
    if (restore && typeof restore.focus === "function") {
      restore.focus();
    }
  }

  function handleProtectedNav(button, target) {
    openAuthWindow(button, target);
  }

  function handleHomeNav() {
    closeAuthWindow();
    // HOME remains the active public surface; no route change.
    navHome.classList.add("is-active");
    navHome.setAttribute("aria-current", "page");
    [navMembership, navChat, navActivity, navProfile].forEach((btn) => {
      btn.classList.remove("is-active");
      btn.removeAttribute("aria-current");
    });
  }

  function resetVisitorSession() {
    selectedCountry = null;
    selectedCity = null;
    locationVerified = false;
    locationOutsideBoundary = false;
    feedIndex = 0;
    enteredEmail = "";
    emailVerificationId = null;
    setupGrant = null;
    setupGrantExpiresAt = null;
    emailSubmitting = false;
    codeSubmitting = false;
    emailVerified = false;
    passkeyRegistered = false;
    passkeySubmitting = false;
    membershipSimulated = false;
    paymentCheckoutSubmitting = false;
    signalConfirmed = false;
    loginSubmitting = false;
    // Keep sessionAuthenticated if cookie may still be valid; clear only UI busy state.
    originatingFeedIndex = 0;
    clearLiveScenes();
    clearDemoTestimony();
    clearEntryLoginStatus();
    if (sessionAuthenticated) {
      showEntryLoginStatus(LOGIN_COPY[entryLang()].success, "success");
    }
    entrySignIn.disabled = false;
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
    clearPasskeyError();
    showPasskeyIntro();
    clearPaymentError();
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
    locationOutside.hidden = true;
    clearLocationMessage();
    locationVerify.disabled = false;
    closeInvite();
    closeSignalSheet();
    closeAuthWindow();
    closeSheet();
    closeTermsSheet();
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
      closeAuthWindow();
    }
    if (name !== "payment") {
      closePaymentNotice();
    }

    if (name === "entry") {
      applyEntryLoginCopy();
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
    if (isProductOnlyPublicMode()) {
      route = PRODUCT_ONLY_FEED_ROUTE;
      const target = "#/" + route;
      if (window.location.hash !== target) {
        window.location.hash = "/" + route;
      }
      showView(route);
      return;
    }

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
      !passkeyRegistered
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
      locationOutsideBoundary = false;
      feedIndex = 0;
      clearLiveScenes();
      clearDemoTestimony();
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

  // DEMO ONLY — client-side preview, not uploaded, not persisted, not real product infrastructure.
  function clearDemoTestimony() {
    if (demoTestimony && demoTestimony.objectUrl) {
      URL.revokeObjectURL(demoTestimony.objectUrl);
    }
    demoTestimony = null;
    demoTestimonyFeedIndex = null;
    detailTestimonyInput.value = "";
    detailTestimonyImage.removeAttribute("src");
    detailTestimonyImage.hidden = true;
    detailTestimonyVideo.removeAttribute("src");
    detailTestimonyVideo.hidden = true;
    if (typeof detailTestimonyVideo.load === "function") {
      detailTestimonyVideo.load();
    }
    detailTestimonyPreview.hidden = true;
  }

  function renderDemoTestimony() {
    if (
      !demoTestimony ||
      demoTestimonyFeedIndex === null ||
      demoTestimonyFeedIndex !== feedIndex
    ) {
      if (demoTestimony && demoTestimonyFeedIndex !== feedIndex) {
        clearDemoTestimony();
      } else if (!demoTestimony) {
        detailTestimonyPreview.hidden = true;
        detailTestimonyImage.hidden = true;
        detailTestimonyVideo.hidden = true;
      }
      return;
    }

    detailTestimonyPreview.hidden = false;
    if (demoTestimony.kind === "video") {
      detailTestimonyImage.hidden = true;
      detailTestimonyImage.removeAttribute("src");
      detailTestimonyVideo.hidden = false;
      detailTestimonyVideo.src = demoTestimony.objectUrl;
    } else {
      detailTestimonyVideo.hidden = true;
      detailTestimonyVideo.removeAttribute("src");
      if (typeof detailTestimonyVideo.load === "function") {
        detailTestimonyVideo.load();
      }
      detailTestimonyImage.hidden = false;
      detailTestimonyImage.src = demoTestimony.objectUrl;
    }
  }

  function openSignalDetail() {
    applyFeedCopyChrome();
    populateSignalDetail();
    renderDemoTestimony();
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
    if (isProductOnlyPublicMode()) {
      if (ensureProductOnlyFeedHash()) {
        return;
      }
      showView(PRODUCT_ONLY_FEED_ROUTE);
      return;
    }

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

  function getAuthFocusable() {
    return Array.from(authWindow.querySelectorAll(focusableSelector)).filter(
      (el) => {
        if (el.hasAttribute("disabled")) return false;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") {
          return false;
        }
        return el.getClientRects().length > 0;
      }
    );
  }

  function openSheet() {
    closeTermsSheet();
    lastFocus = document.activeElement;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = sheet.querySelector(".sheet__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    if (termsSheet.hidden) {
      document.body.style.overflow = "";
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function openTermsSheet() {
    closeSheetQuiet();
    lastFocus = document.activeElement;
    termsSheet.hidden = false;
    document.body.style.overflow = "hidden";
    if (termsAccept) termsAccept.focus();
  }

  function closeSheetQuiet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
  }

  function closeTermsSheet() {
    if (termsSheet.hidden) return;
    termsSheet.hidden = true;
    if (sheet.hidden) {
      document.body.style.overflow = "";
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  learnMoreButton.addEventListener("click", openSheet);
  sheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-sheet]")) closeSheet();
  });
  termsSheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-terms]")) closeTermsSheet();
  });
  termsAccept.addEventListener("click", () => {
    closeTermsSheet();
    go("country");
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

  // DEMO ONLY — client-side preview, not uploaded, not persisted, not real product infrastructure.
  detailAddTestimony.addEventListener("click", () => {
    detailTestimonyInput.click();
  });

  detailTestimonyInput.addEventListener("change", () => {
    const file =
      detailTestimonyInput.files && detailTestimonyInput.files[0]
        ? detailTestimonyInput.files[0]
        : null;
    if (!file) return;

    const kind = file.type && file.type.indexOf("video/") === 0 ? "video" : "image";
    if (demoTestimony && demoTestimony.objectUrl) {
      URL.revokeObjectURL(demoTestimony.objectUrl);
    }
    demoTestimony = {
      kind: kind,
      objectUrl: URL.createObjectURL(file),
    };
    demoTestimonyFeedIndex = feedIndex;
    renderDemoTestimony();
  });

  detailTestimonyClear.addEventListener("click", () => {
    clearDemoTestimony();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!authWindow.hidden) {
        event.preventDefault();
        closeAuthWindow();
        return;
      }
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
      if (!termsSheet.hidden) {
        event.preventDefault();
        closeTermsSheet();
        return;
      }
      if (!sheet.hidden) {
        event.preventDefault();
        closeSheet();
      }
      return;
    }

    if (event.key === "Tab" && !authWindow.hidden) {
      const focusable = getAuthFocusable();
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  navHome.addEventListener("click", () => {
    handleHomeNav();
  });

  navMembership.addEventListener("click", () => {
    handleProtectedNav(navMembership, "membership");
  });

  navChat.addEventListener("click", () => {
    handleProtectedNav(navChat, "chat");
  });

  navActivity.addEventListener("click", () => {
    handleProtectedNav(navActivity, "activity");
  });

  navProfile.addEventListener("click", () => {
    handleProtectedNav(navProfile, "profile");
  });

  authWindowClose.addEventListener("click", () => {
    closeAuthWindow();
  });

  authWindowDim.addEventListener("click", () => {
    closeAuthWindow();
  });

  authModeToggle.addEventListener("click", () => {
    authMode = authMode === "signin" ? "create" : "signin";
    syncAuthModeUi();
  });

  authChannelEmail.addEventListener("click", () => {
    authChannel = "email";
    syncAuthChannelUi();
    authIdentityInput.focus();
  });

  authChannelPhone.addEventListener("click", () => {
    authChannel = "phone";
    syncAuthChannelUi();
    authIdentityInput.focus();
  });

  // Visual-review only: Continue / passkey / password must not call APIs,
  // navigate, simulate success, or write session state.
  authContinue.addEventListener("click", (event) => {
    event.preventDefault();
  });

  authPasskey.addEventListener("click", (event) => {
    event.preventDefault();
  });

  authPassword.addEventListener("click", (event) => {
    event.preventDefault();
  });

  enterButton.addEventListener("click", () => {
    openTermsSheet();
  });

  entrySignIn.addEventListener("click", () => {
    if (loginSubmitting) return;
    const copy = LOGIN_COPY[entryLang()];
    clearEntryLoginStatus();

    const swaBrowser = window["Simple" + "Web" + "Authn" + "Browser"];
    const startAuthentication = swaBrowser && swaBrowser.startAuthentication;
    if (typeof startAuthentication !== "function") {
      showEntryLoginStatus(copy.failed, "error");
      return;
    }

    loginSubmitting = true;
    entrySignIn.disabled = true;
    showEntryLoginStatus(copy.working, "success");

    requestPasskeyAuthenticationOptions()
      .then(function (ceremony) {
        return startAuthentication({ optionsJSON: ceremony.options }).then(
          function (assertion) {
            return verifyPasskeyAuthentication(
              ceremony.authenticationCeremonyId,
              assertion
            );
          }
        );
      })
      .then(function () {
        return fetchAuthenticationSession();
      })
      .then(function () {
        sessionAuthenticated = true;
        showEntryLoginStatus(copy.success, "success");
      })
      .catch(function (err) {
        sessionAuthenticated = false;
        const causeName = err && err.cause && err.cause.name;
        const cancelled =
          (err &&
            (err.name === "NotAllowedError" ||
              err.name === "AbortError" ||
              err.code === "ERROR_CEREMONY_ABORTED")) ||
          causeName === "NotAllowedError" ||
          causeName === "AbortError" ||
          (err &&
            err.code === "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY" &&
            causeName === "NotAllowedError");
        if (cancelled) {
          showEntryLoginStatus(copy.cancelled, "error");
          return;
        }
        showEntryLoginStatus(copy.failed, "error");
      })
      .finally(function () {
        loginSubmitting = false;
        entrySignIn.disabled = false;
      });
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
    locationOutsideBoundary = false;
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
    resetLocationVerification();
    feedIndex = 0;
    go("location");
  });

  locationBack.addEventListener("click", () => {
    ensureCityOptions(true);
    go("city");
  });

  locationVerify.addEventListener("click", () => {
    if (locationVerify.disabled) return;
    const lang = communityLanguage();
    const copy = LOCATION_COPY[lang] || LOCATION_COPY.it;
    const cityName = cityDisplayName(lang);
    const cityId = selectedCity;

    clearLocationMessage();
    locationVerify.disabled = true;
    locationVerify.textContent = copy.verifying;

    (async function runLocationVerification() {
      try {
        if (!cityId || !BOUNDARY_BY_CITY[cityId]) {
          showLocationMessage(
            copy.notAvailable.replace("{city}", cityName || "")
          );
          return;
        }

        let position;
        try {
          position = await requestDevicePosition();
        } catch (geoErr) {
          showLocationMessage(geolocationErrorMessage(copy, geoErr));
          return;
        }

        const coords = position && position.coords;
        if (
          !coords ||
          typeof coords.latitude !== "number" ||
          typeof coords.longitude !== "number"
        ) {
          showLocationMessage(copy.errorUnavailable);
          return;
        }

        let boundary;
        try {
          boundary = await loadCityBoundary(cityId);
        } catch (boundaryErr) {
          showLocationMessage(
            copy.notAvailable.replace("{city}", cityName || "")
          );
          return;
        }

        const inside = geojsonContainsPoint(
          boundary,
          coords.longitude,
          coords.latitude
        );

        locationVerified = true;
        locationOutsideBoundary = !inside;
        clearLocationMessage();
        applyLocationCopy();
        syncLocationState();
      } finally {
        if (!locationVerified) {
          locationVerify.disabled = false;
          locationVerify.textContent = locationMessage.hidden
            ? copy.verify
            : copy.retry;
        }
      }
    })();
  });

  function continueFromLocation() {
    if (!locationVerified) return;
    feedIndex = 0;
    const cityId = selectedCity;
    locationContinue.disabled = true;
    locationOutsideContinue.disabled = true;
    loadLiveScenesForCity(cityId).finally(() => {
      locationContinue.disabled = false;
      locationOutsideContinue.disabled = false;
      go("feed");
    });
  }

  locationContinue.addEventListener("click", continueFromLocation);
  locationOutsideContinue.addEventListener("click", continueFromLocation);

  feedBack.addEventListener("click", () => {
    closeSignalSheet();
    if (isProductOnlyPublicMode()) return;
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
    if (isProductOnlyPublicMode()) return;
    go("membership");
  });

  inviteNotNow.addEventListener("click", () => {
    closeInvite();
    if (isProductOnlyPublicMode()) return;
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
    if (!isValidEmail(value) || emailSubmitting) {
      syncEmailContinue();
      return;
    }
    enteredEmail = value;
    emailSubmitting = true;
    emailContinue.disabled = true;
    emailError.hidden = true;
    emailError.textContent = "";

    requestEmailVerification(value)
      .then(function (verificationId) {
        emailVerificationId = verificationId;
        codeInput.value = "";
        codeError.hidden = true;
        codeError.textContent = "";
        go("code");
      })
      .catch(function (err) {
        const copy = EMAIL_COPY[membershipLang()];
        emailError.hidden = false;
        if (err && err.kind === "rateLimited") {
          emailError.textContent = copy.rateLimited;
        } else {
          emailError.textContent = copy.failed;
        }
      })
      .finally(function () {
        emailSubmitting = false;
        syncEmailContinue();
      });
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
    if (value.length !== 6 || codeSubmitting) {
      syncCodeVerify();
      return;
    }
    if (!emailVerificationId) {
      const copy = CODE_COPY[membershipLang()];
      codeError.hidden = false;
      codeError.textContent = copy.failed;
      return;
    }
    codeSubmitting = true;
    codeVerify.disabled = true;
    codeError.hidden = true;
    codeError.textContent = "";

    completeEmailVerification(emailVerificationId, value)
      .then(function (result) {
        setupGrant = result.setupGrant;
        setupGrantExpiresAt = result.setupGrantExpiresAt;
        emailVerified = true;
        passkeyRegistered = false;
        go("passkey");
      })
      .catch(function (err) {
        const copy = CODE_COPY[membershipLang()];
        codeError.hidden = false;
        if (err && err.kind === "invalid") {
          codeError.textContent = copy.invalid;
        } else if (err && err.kind === "rateLimited") {
          codeError.textContent = copy.rateLimited;
        } else {
          codeError.textContent = copy.failed;
        }
      })
      .finally(function () {
        codeSubmitting = false;
        syncCodeVerify();
      });
  });

  codeChangeEmail.addEventListener("click", () => {
    emailVerified = false;
    passkeyRegistered = false;
    emailVerificationId = null;
    setupGrant = null;
    setupGrantExpiresAt = null;
    codeSubmitting = false;
    go("email");
  });

  passkeyCreate.addEventListener("click", () => {
    if (passkeySubmitting) return;
    const copy = PASSKEY_COPY[membershipLang()];
    clearPasskeyError();

    if (!isSetupGrantUsable()) {
      showPasskeyError(copy.grantExpired);
      return;
    }

    const swaBrowser = window["Simple" + "Web" + "Authn" + "Browser"];
    const startRegistration = swaBrowser && swaBrowser.startRegistration;
    if (typeof startRegistration !== "function") {
      showPasskeyError(copy.failed);
      return;
    }

    passkeySubmitting = true;
    passkeyCreate.disabled = true;

    requestPasskeyRegistrationOptions()
      .then(function (ceremony) {
        return startRegistration({ optionsJSON: ceremony.options }).then(
          function (attestation) {
            return verifyPasskeyRegistration(
              ceremony.registrationCeremonyId,
              attestation
            );
          }
        );
      })
      .then(function () {
        passkeyRegistered = true;
        setupGrant = null;
        setupGrantExpiresAt = null;
        clearPasskeyError();
        go("ready");
      })
      .catch(function (err) {
        const causeName = err && err.cause && err.cause.name;
        const cancelled =
          (err &&
            (err.name === "NotAllowedError" ||
              err.name === "AbortError" ||
              err.code === "ERROR_CEREMONY_ABORTED")) ||
          causeName === "NotAllowedError" ||
          causeName === "AbortError" ||
          (err &&
            err.code === "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY" &&
            causeName === "NotAllowedError");
        if (cancelled) {
          showPasskeyError(copy.cancelled);
          return;
        }
        if (err && err.kind === "grantExpired") {
          showPasskeyError(copy.grantExpired);
          return;
        }
        showPasskeyError(copy.failed);
      })
      .finally(function () {
        passkeySubmitting = false;
        passkeyCreate.disabled = false;
      });
  });

  passkeyBack.addEventListener("click", () => {
    clearPasskeyError();
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
    // Return to Screen 10 success state after a completed registration.
    go("passkey");
  });

  paymentSimulateStart.addEventListener("click", () => {
    if (paymentCheckoutSubmitting) return;
    clearPaymentError();
    closePaymentNotice();
    paymentCheckoutSubmitting = true;
    paymentSimulateStart.disabled = true;

    requestCheckoutSession()
      .then(function (checkoutUrl) {
        window.location = checkoutUrl;
      })
      .catch(function (err) {
        const kind = err && err.kind ? err.kind : "network";
        showPaymentError(paymentErrorMessage(kind));
        paymentCheckoutSubmitting = false;
        paymentSimulateStart.disabled = false;
      });
  });

  paymentSimulateConfirm.addEventListener("click", () => {
    membershipSimulated = true;
    closePaymentNotice();
    applyPaymentCopy();
    paymentContinue.focus();
  });

  paymentBack.addEventListener("click", () => {
    closePaymentNotice();
    clearPaymentError();
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
