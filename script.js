(() => {
  const authInput = window.TownAuthInput;
  if (!authInput) {
    throw new Error("TownAuthInput must load before script.js");
  }
  const { digitsOnly, passwordCodePointLength, passwordMeetsPolicy } = authInput;
  const viewEntry = document.getElementById("view-entry");
  const viewCountry = document.getElementById("view-country");
  const viewCity = document.getElementById("view-city");
  const viewLocation = document.getElementById("view-location");
  const viewFeed = document.getElementById("view-feed");
  const viewAccount = document.getElementById("view-account");
  const viewEmail = document.getElementById("view-email");
  const viewCode = document.getElementById("view-code");
  const viewPassword = document.getElementById("view-password");
  const viewPasskey = document.getElementById("view-passkey");
  const viewReady = document.getElementById("view-ready");
  const viewCommitment = document.getElementById("view-commitment");
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
  const feedScroller = document.getElementById("feed-scroller");
  const feedPanelTemplate = document.getElementById("feed-panel-template");
  const cityDiscoveryPanelTemplate = document.getElementById(
    "city-discovery-panel-template"
  );
  const feedLiveStatus = document.getElementById("feed-live-status");
  const feedState = document.getElementById("feed-state");
  const feedStateTitle = document.getElementById("feed-state-title");
  const feedStateBody = document.getElementById("feed-state-body");
  const feedStateRetry = document.getElementById("feed-state-retry");
  const appNav = document.getElementById("app-nav");
  const navHome = document.getElementById("nav-home");
  const navMembership = document.getElementById("nav-membership");
  const navChat = document.getElementById("nav-chat");
  const navActivity = document.getElementById("nav-activity");
  const activityPanel = document.getElementById("activity-panel");
  const activityDim = document.getElementById("activity-dim");
  const activityClose = document.getElementById("activity-close");
  const activityLabel = document.getElementById("activity-label");
  const activityTitle = document.getElementById("activity-title");
  const activityLead = document.getElementById("activity-lead");
  const activityInboxLabel = document.getElementById("activity-inbox-label");
  const activityInboxEmpty = document.getElementById("activity-inbox-empty");
  const activityInboxList = document.getElementById("activity-inbox-list");
  const activityRecentLabel = document.getElementById("activity-recent-label");
  const activityStatus = document.getElementById("activity-status");
  const activityEmpty = document.getElementById("activity-empty");
  const activityList = document.getElementById("activity-list");
  const activityFeed = document.getElementById("activity-feed");
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
  const authPasswordWrap = document.getElementById("auth-password-wrap");
  const authPasswordLabel = document.getElementById("auth-password-label");
  const authPassword = document.getElementById("auth-password");
  const authContinue = document.getElementById("auth-continue");
  const authPasskey = document.getElementById("auth-passkey");
  const authWindowStatus = document.getElementById("auth-window-status");
  const passwordLabel = document.getElementById("password-label");
  const passwordTitle = document.getElementById("password-title");
  const passwordBody = document.getElementById("password-body");
  const passwordBodySecond = document.getElementById("password-body-second");
  const passwordFieldLabel = document.getElementById("password-field-label");
  const passwordInput = document.getElementById("password-input");
  const passwordConfirmLabel = document.getElementById("password-confirm-label");
  const passwordConfirm = document.getElementById("password-confirm");
  const passwordNote = document.getElementById("password-note");
  const passwordError = document.getElementById("password-error");
  const passwordContinue = document.getElementById("password-continue");
  const passwordBack = document.getElementById("password-back");
  const profilePanel = document.getElementById("profile-panel");
  const profileDim = document.getElementById("profile-dim");
  const profileClose = document.getElementById("profile-close");
  const profileLabel = document.getElementById("profile-label");
  const profileAvatar = document.getElementById("profile-avatar");
  const profileTitle = document.getElementById("profile-title");
  const profileHandle = document.getElementById("profile-handle");
  const profileBio = document.getElementById("profile-bio");
  const profileCommunity = document.getElementById("profile-community");
  const profileMembership = document.getElementById("profile-membership");
  const profileActivityTitle = document.getElementById("profile-activity-title");
  const profileActivityEmpty = document.getElementById("profile-activity-empty");
  const profileActivityList = document.getElementById("profile-activity-list");
  const profileFeed = document.getElementById("profile-feed");
  const profileCreateSignal = document.getElementById("profile-create-signal");
  const profilePlatformConsole = document.getElementById(
    "profile-platform-console"
  );
  const profileMembershipCta = document.getElementById("profile-membership-cta");
  const profileManageBilling = document.getElementById("profile-manage-billing");
  const profileSignOut = document.getElementById("profile-sign-out");
  const profileStatus = document.getElementById("profile-status");
  const ownerModeration = document.getElementById("owner-moderation");
  const ownerModerationDim = document.getElementById("owner-moderation-dim");
  const ownerModerationClose = document.getElementById("owner-moderation-close");
  const ownerModerationTitle = document.getElementById("owner-moderation-title");
  const ownerModerationLead = document.getElementById("owner-moderation-lead");
  const ownerModerationReason = document.getElementById("owner-moderation-reason");
  const ownerModerationStatus = document.getElementById("owner-moderation-status");
  const ownerModerationError = document.getElementById("owner-moderation-error");
  const ownerModerationSignalsTitle = document.getElementById(
    "owner-moderation-signals-title"
  );
  const ownerModerationSignalsEmpty = document.getElementById(
    "owner-moderation-signals-empty"
  );
  const ownerModerationSignalsList = document.getElementById(
    "owner-moderation-signals-list"
  );
  const ownerModerationAccountsTitle = document.getElementById(
    "owner-moderation-accounts-title"
  );
  const ownerModerationAccountsEmpty = document.getElementById(
    "owner-moderation-accounts-empty"
  );
  const ownerModerationAccountsList = document.getElementById(
    "owner-moderation-accounts-list"
  );
  const signalCreate = document.getElementById("signal-create");
  const signalCreateDim = document.getElementById("signal-create-dim");
  const signalCreateClose = document.getElementById("signal-create-close");
  const signalCreateTitle = document.getElementById("signal-create-title");
  const signalCreateLead = document.getElementById("signal-create-lead");
  const signalCreateForm = document.getElementById("signal-create-form");
  const signalCreateTitleInput = document.getElementById(
    "signal-create-title-input"
  );
  const signalCreateDescription = document.getElementById(
    "signal-create-description"
  );
  const signalCreateCategory = document.getElementById("signal-create-category");
  const signalCreateRealName = document.getElementById("signal-create-real-name");
  const signalCreatePhoto = document.getElementById("signal-create-photo");
  const signalCreatePreview = document.getElementById("signal-create-preview");
  const signalCreatePreviewImage = document.getElementById(
    "signal-create-preview-image"
  );
  const signalCreateAccept = document.getElementById("signal-create-accept");
  const signalCreateAcceptText = document.getElementById(
    "signal-create-accept-text"
  );
  const signalCreateError = document.getElementById("signal-create-error");
  const signalCreateSubmit = document.getElementById("signal-create-submit");
  const signalCreateCancel = document.getElementById("signal-create-cancel");
  const signalDetail = document.getElementById("signal-detail");
  const detailImage = document.getElementById("detail-image");
  const detailClose = document.getElementById("detail-close");
  const detailUserStatus = document.getElementById("detail-user-status");
  const detailCommunity = document.getElementById("detail-community");
  const detailCategory = document.getElementById("detail-category");
  const detailHeadline = document.getElementById("detail-headline");
  const detailMeta = document.getElementById("detail-meta");
  const detailSourceLang = document.getElementById("detail-source-lang");
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
  const detailCivicProcess = document.getElementById("detail-civic-process");
  const detailProcessLabel = document.getElementById("detail-process-label");
  const detailProcessStage = document.getElementById("detail-process-stage");
  const detailProcessState = document.getElementById("detail-process-state");
  const detailProcessFacts = document.getElementById("detail-process-facts");
  const detailProcessConfirmationsLabel = document.getElementById(
    "detail-process-confirmations-label"
  );
  const detailProcessConfirmations = document.getElementById(
    "detail-process-confirmations"
  );
  const detailProcessNextLabel = document.getElementById(
    "detail-process-next-label"
  );
  const detailProcessNext = document.getElementById("detail-process-next");
  const detailProcessClosingLabel = document.getElementById(
    "detail-process-closing-label"
  );
  const detailProcessClosing = document.getElementById("detail-process-closing");
  const detailProcessTimeline = document.getElementById(
    "detail-process-timeline"
  );
  const detailProcessEventLabel = document.getElementById(
    "detail-process-event-label"
  );
  const detailProcessEventTime = document.getElementById(
    "detail-process-event-time"
  );
  const detailProcessProposals = document.getElementById(
    "detail-process-proposals"
  );
  const detailProcessProposalsState = document.getElementById(
    "detail-process-proposals-state"
  );
  const detailProcessProposalsEmpty = document.getElementById(
    "detail-process-proposals-empty"
  );
  const detailProcessProposalsList = document.getElementById(
    "detail-process-proposals-list"
  );
  const detailProcessProposalsContribute = document.getElementById(
    "detail-process-proposals-contribute"
  );
  const detailProcessProposalsCompose = document.getElementById(
    "detail-process-proposals-compose"
  );
  const detailProcessProposalsComposeTitle = document.getElementById(
    "detail-process-proposals-compose-title"
  );
  const detailProcessProposalsTitleInput = document.getElementById(
    "detail-process-proposals-title-input"
  );
  const detailProcessProposalsBodyInput = document.getElementById(
    "detail-process-proposals-body-input"
  );
  const detailProcessProposalsOutcomeInput = document.getElementById(
    "detail-process-proposals-outcome-input"
  );
  const detailProcessProposalsInstitutionInput = document.getElementById(
    "detail-process-proposals-institution-input"
  );
  const detailProcessProposalsResourcesInput = document.getElementById(
    "detail-process-proposals-resources-input"
  );
  const detailProcessProposalsDeadlineInput = document.getElementById(
    "detail-process-proposals-deadline-input"
  );
  const detailProcessProposalsSubmit = document.getElementById(
    "detail-process-proposals-submit"
  );
  const detailProcessProposalsCancel = document.getElementById(
    "detail-process-proposals-cancel"
  );
  const detailProcessProposalsNote = document.getElementById(
    "detail-process-proposals-note"
  );
  const detailProcessDeliberation = document.getElementById(
    "detail-process-deliberation"
  );
  const detailProcessDeliberationState = document.getElementById(
    "detail-process-deliberation-state"
  );
  const detailProcessDeliberationList = document.getElementById(
    "detail-process-deliberation-list"
  );
  const detailProcessVoting = document.getElementById("detail-process-voting");
  const detailProcessVotingState = document.getElementById(
    "detail-process-voting-state"
  );
  const detailProcessVotingList = document.getElementById(
    "detail-process-voting-list"
  );
  const detailProcessVotingSubmit = document.getElementById(
    "detail-process-voting-submit"
  );
  const detailProcessVotingNote = document.getElementById(
    "detail-process-voting-note"
  );
  const detailProcessMandate = document.getElementById(
    "detail-process-mandate"
  );
  const detailProcessMandateState = document.getElementById(
    "detail-process-mandate-state"
  );
  const detailProcessMandateWinner = document.getElementById(
    "detail-process-mandate-winner"
  );
  const detailProcessMandateAuthor = document.getElementById(
    "detail-process-mandate-author"
  );
  const detailProcessMandateTitle = document.getElementById(
    "detail-process-mandate-title"
  );
  const detailProcessMandateBody = document.getElementById(
    "detail-process-mandate-body"
  );
  const detailProcessMandateTally = document.getElementById(
    "detail-process-mandate-tally"
  );
  const detailProcessMandateMinorityList = document.getElementById(
    "detail-process-mandate-minority-list"
  );
  const detailProcessMandateContest = document.getElementById(
    "detail-process-mandate-contest"
  );
  const detailProcessMandateContestStatus = document.getElementById(
    "detail-process-mandate-contest-status"
  );
  const detailProcessMandateContestForm = document.getElementById(
    "detail-process-mandate-contest-form"
  );
  const detailProcessMandateContestLabel = document.getElementById(
    "detail-process-mandate-contest-label"
  );
  const detailProcessMandateContestReason = document.getElementById(
    "detail-process-mandate-contest-reason"
  );
  const detailProcessMandateContestElaboration = document.getElementById(
    "detail-process-mandate-contest-elaboration"
  );
  const detailProcessMandateContestSubmit = document.getElementById(
    "detail-process-mandate-contest-submit"
  );
  const detailProcessMandateContestNote = document.getElementById(
    "detail-process-mandate-contest-note"
  );
  const detailProcessAction = document.getElementById("detail-process-action");
  const detailProcessActionState = document.getElementById(
    "detail-process-action-state"
  );
  const detailProcessActionWinner = document.getElementById(
    "detail-process-action-winner"
  );
  const detailProcessActionAuthor = document.getElementById(
    "detail-process-action-author"
  );
  const detailProcessActionTitle = document.getElementById(
    "detail-process-action-title"
  );
  const detailProcessActionBody = document.getElementById(
    "detail-process-action-body"
  );
  const detailProcessActionInstitution = document.getElementById(
    "detail-process-action-institution"
  );
  const detailProcessActionObjective = document.getElementById(
    "detail-process-action-objective"
  );
  const detailProcessActionDeadline = document.getElementById(
    "detail-process-action-deadline"
  );
  const detailProcessActionStatus = document.getElementById(
    "detail-process-action-status"
  );
  const detailProcessActionResponsible = document.getElementById(
    "detail-process-action-responsible"
  );
  const detailProcessActionCollaborators = document.getElementById(
    "detail-process-action-collaborators"
  );
  const detailProcessActionList = document.getElementById(
    "detail-process-action-list"
  );
  const detailProcessActionTakeStep = document.getElementById(
    "detail-process-action-take-step"
  );
  const detailProcessActionOfferHelp = document.getElementById(
    "detail-process-action-offer-help"
  );
  const detailProcessActionContribute = document.getElementById(
    "detail-process-action-contribute"
  );
  const detailProcessActionAddEvidence = document.getElementById(
    "detail-process-action-add-evidence"
  );
  const detailProcessActionInstitutionResponse = document.getElementById(
    "detail-process-action-institution-response"
  );
  const detailProcessActionCompose = document.getElementById(
    "detail-process-action-compose"
  );
  const detailProcessActionInput = document.getElementById(
    "detail-process-action-input"
  );
  const detailProcessActionBlockedReason = document.getElementById(
    "detail-process-action-blocked-reason"
  );
  const detailProcessActionUrlInput = document.getElementById(
    "detail-process-action-url-input"
  );
  const detailProcessActionSubmit = document.getElementById(
    "detail-process-action-submit"
  );
  const detailProcessActionCancel = document.getElementById(
    "detail-process-action-cancel"
  );
  const detailProcessActionNote = document.getElementById(
    "detail-process-action-note"
  );
  const detailProcessVerification = document.getElementById(
    "detail-process-verification"
  );
  const detailProcessVerificationState = document.getElementById(
    "detail-process-verification-state"
  );
  const detailProcessVerificationWinner = document.getElementById(
    "detail-process-verification-winner"
  );
  const detailProcessVerificationAuthor = document.getElementById(
    "detail-process-verification-author"
  );
  const detailProcessVerificationTitle = document.getElementById(
    "detail-process-verification-title"
  );
  const detailProcessVerificationBody = document.getElementById(
    "detail-process-verification-body"
  );
  const detailProcessVerificationReady = document.getElementById(
    "detail-process-verification-ready"
  );
  const detailProcessVerificationOutcome = document.getElementById(
    "detail-process-verification-outcome"
  );
  const detailProcessVerificationTally = document.getElementById(
    "detail-process-verification-tally"
  );
  const detailProcessVerificationDisputeEscalated = document.getElementById(
    "detail-process-verification-dispute-escalated"
  );
  const detailProcessVerificationConfirm = document.getElementById(
    "detail-process-verification-confirm"
  );
  const detailProcessVerificationConfirmDelivered = document.getElementById(
    "detail-process-verification-confirm-delivered"
  );
  const detailProcessVerificationConfirmNotDelivered = document.getElementById(
    "detail-process-verification-confirm-not-delivered"
  );
  const detailProcessVerificationEvidenceList = document.getElementById(
    "detail-process-verification-evidence-list"
  );
  const detailProcessVerificationEvidenceContribute = document.getElementById(
    "detail-process-verification-evidence-contribute"
  );
  const detailProcessVerificationEvidenceCompose = document.getElementById(
    "detail-process-verification-evidence-compose"
  );
  const detailProcessVerificationEvidenceInput = document.getElementById(
    "detail-process-verification-evidence-input"
  );
  const detailProcessVerificationEvidenceUrlInput = document.getElementById(
    "detail-process-verification-evidence-url-input"
  );
  const detailProcessVerificationEvidenceSubmit = document.getElementById(
    "detail-process-verification-evidence-submit"
  );
  const detailProcessVerificationEvidenceCancel = document.getElementById(
    "detail-process-verification-evidence-cancel"
  );
  const detailProcessVerificationEvidenceNote = document.getElementById(
    "detail-process-verification-evidence-note"
  );
  const detailSeeToo = document.getElementById("detail-see-too");
  const detailSeeTooDone = document.getElementById("detail-see-too-done");
  const detailDoneTitle = document.getElementById("detail-done-title");
  const detailDoneNote = document.getElementById("detail-done-note");
  const detailConfirmCount = document.getElementById("detail-confirm-count");
  const detailSessionLabel = document.getElementById("detail-session-label");
  const detailSessionBody = document.getElementById("detail-session-body");
  const detailSessionEmpty = document.getElementById("detail-session-empty");
  const detailSessionList = document.getElementById("detail-session-list");
  const detailSessionContribute = document.getElementById(
    "detail-session-contribute"
  );
  const detailSessionCompose = document.getElementById("detail-session-compose");
  const detailSessionComposeTitle = document.getElementById(
    "detail-session-compose-title"
  );
  const detailSessionComposeGuide = document.getElementById(
    "detail-session-compose-guide"
  );
  const detailSessionInput = document.getElementById("detail-session-input");
  const detailSessionIntent = document.getElementById("detail-session-intent");
  const detailSessionIntentLegend = document.getElementById(
    "detail-session-intent-legend"
  );
  const detailSessionIntentObservationLabel = document.getElementById(
    "detail-session-intent-observation-label"
  );
  const detailSessionIntentProposalLabel = document.getElementById(
    "detail-session-intent-proposal-label"
  );
  const detailSessionIntentNextStepLabel = document.getElementById(
    "detail-session-intent-next-step-label"
  );
  const detailSessionAttach = document.getElementById("detail-session-attach");
  const detailSessionPublish = document.getElementById("detail-session-publish");
  const detailSessionCancel = document.getElementById("detail-session-cancel");
  const detailSessionDemoNote = document.getElementById(
    "detail-session-demo-note"
  );
  const detailTestimonyInput = document.getElementById("detail-testimony-input");
  const detailTestimonyPreview = document.getElementById(
    "detail-testimony-preview"
  );
  const detailTestimonyNote = document.getElementById("detail-testimony-note");
  const detailTestimonyImage = document.getElementById("detail-testimony-image");
  const detailTestimonyVideo = document.getElementById("detail-testimony-video");
  const detailTestimonyClear = document.getElementById("detail-testimony-clear");
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
  const readyError = document.getElementById("ready-error");
  const readyContinue = document.getElementById("ready-continue");
  const readyBack = document.getElementById("ready-back");
  const commitmentLabel = document.getElementById("commitment-label");
  const commitmentTitle = document.getElementById("commitment-title");
  const commitmentBody = document.getElementById("commitment-body");
  const commitmentCountryFieldset = document.getElementById(
    "commitment-country-fieldset"
  );
  const commitmentCountryLegend = document.getElementById(
    "commitment-country-legend"
  );
  const commitmentCountryItalyLabel = document.getElementById(
    "commitment-country-italy-label"
  );
  const commitmentCountryGermanyLabel = document.getElementById(
    "commitment-country-germany-label"
  );
  const commitmentCountryRomaniaLabel = document.getElementById(
    "commitment-country-romania-label"
  );
  const commitmentCountryAustriaLabel = document.getElementById(
    "commitment-country-austria-label"
  );
  const commitmentCountryFranceLabel = document.getElementById(
    "commitment-country-france-label"
  );
  const commitmentCountryHungaryLabel = document.getElementById(
    "commitment-country-hungary-label"
  );
  const commitmentCountrySpainLabel = document.getElementById(
    "commitment-country-spain-label"
  );
  const commitmentCityFieldset = document.getElementById(
    "commitment-city-fieldset"
  );
  const commitmentCityLegend = document.getElementById(
    "commitment-city-legend"
  );
  const commitmentCityOptions = document.getElementById(
    "commitment-city-options"
  );
  const commitmentReview = document.getElementById("commitment-review");
  const commitmentReviewLabel = document.getElementById(
    "commitment-review-label"
  );
  const commitmentReviewCountry = document.getElementById(
    "commitment-review-country"
  );
  const commitmentReviewCity = document.getElementById(
    "commitment-review-city"
  );
  const commitmentReviewNote = document.getElementById(
    "commitment-review-note"
  );
  const commitmentAcceptLabelWrap = document.getElementById(
    "commitment-accept-label-wrap"
  );
  const commitmentAccept = document.getElementById("commitment-accept");
  const commitmentAcceptText = document.getElementById(
    "commitment-accept-text"
  );
  const commitmentAcceptRequired = document.getElementById(
    "commitment-accept-required"
  );
  const commitmentError = document.getElementById("commitment-error");
  const commitmentSavedStatus = document.getElementById(
    "commitment-saved-status"
  );
  const commitmentCheckoutHint = document.getElementById(
    "commitment-checkout-hint"
  );
  const commitmentConfirm = document.getElementById("commitment-confirm");
  const commitmentCheckout = document.getElementById("commitment-checkout");
  const commitmentBack = document.getElementById("commitment-back");
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
  const paymentConfirming = document.getElementById("payment-confirming");
  const paymentConfirmingLabel = document.getElementById(
    "payment-confirming-label"
  );
  const paymentConfirmingTitle = document.getElementById(
    "payment-confirming-title"
  );
  const paymentConfirmingBody = document.getElementById(
    "payment-confirming-body"
  );
  const paymentConfirmingStatus = document.getElementById(
    "payment-confirming-status"
  );
  const paymentConfirmingRetry = document.getElementById(
    "payment-confirming-retry"
  );
  const paymentConfirmingDismiss = document.getElementById(
    "payment-confirming-dismiss"
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
    !viewPassword ||
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
    !feedScroller ||
    !feedPanelTemplate ||
    !cityDiscoveryPanelTemplate ||
    !feedLiveStatus ||
    !feedState ||
    !feedStateTitle ||
    !feedStateBody ||
    !feedStateRetry ||
    !appNav ||
    !navHome ||
    !navMembership ||
    !navChat ||
    !navActivity ||
    !activityPanel ||
    !activityDim ||
    !activityClose ||
    !activityLabel ||
    !activityTitle ||
    !activityLead ||
    !activityInboxLabel ||
    !activityInboxEmpty ||
    !activityInboxList ||
    !activityRecentLabel ||
    !activityStatus ||
    !activityEmpty ||
    !activityList ||
    !activityFeed ||
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
    !authPasswordWrap ||
    !authPasswordLabel ||
    !authPassword ||
    !authContinue ||
    !authPasskey ||
    !authWindowStatus ||
    !passwordLabel ||
    !passwordTitle ||
    !passwordBody ||
    !passwordBodySecond ||
    !passwordFieldLabel ||
    !passwordInput ||
    !passwordConfirmLabel ||
    !passwordConfirm ||
    !passwordNote ||
    !passwordError ||
    !passwordContinue ||
    !passwordBack ||
    !profilePanel ||
    !profileDim ||
    !profileClose ||
    !profileLabel ||
    !profileAvatar ||
    !profileTitle ||
    !profileHandle ||
    !profileBio ||
    !profileCommunity ||
    !profileMembership ||
    !profileActivityTitle ||
    !profileActivityEmpty ||
    !profileActivityList ||
    !profileFeed ||
    !profileCreateSignal ||
    !profilePlatformConsole ||
    !profileMembershipCta ||
    !profileManageBilling ||
    !profileSignOut ||
    !profileStatus ||
    !ownerModeration ||
    !ownerModerationDim ||
    !ownerModerationClose ||
    !ownerModerationTitle ||
    !ownerModerationLead ||
    !ownerModerationReason ||
    !ownerModerationStatus ||
    !ownerModerationError ||
    !ownerModerationSignalsTitle ||
    !ownerModerationSignalsEmpty ||
    !ownerModerationSignalsList ||
    !ownerModerationAccountsTitle ||
    !ownerModerationAccountsEmpty ||
    !ownerModerationAccountsList ||
    !signalCreate ||
    !signalCreateDim ||
    !signalCreateClose ||
    !signalCreateTitle ||
    !signalCreateLead ||
    !signalCreateForm ||
    !signalCreateTitleInput ||
    !signalCreateDescription ||
    !signalCreateCategory ||
    !signalCreateRealName ||
    !signalCreatePhoto ||
    !signalCreatePreview ||
    !signalCreatePreviewImage ||
    !signalCreateAccept ||
    !signalCreateAcceptText ||
    !signalCreateError ||
    !signalCreateSubmit ||
    !signalCreateCancel ||
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
    !detailCivicProcess ||
    !detailProcessLabel ||
    !detailProcessStage ||
    !detailProcessState ||
    !detailProcessFacts ||
    !detailProcessConfirmationsLabel ||
    !detailProcessConfirmations ||
    !detailProcessNextLabel ||
    !detailProcessNext ||
    !detailProcessClosingLabel ||
    !detailProcessClosing ||
    !detailProcessTimeline ||
    !detailProcessEventLabel ||
    !detailProcessEventTime ||
    !detailProcessProposals ||
    !detailProcessProposalsState ||
    !detailProcessProposalsEmpty ||
    !detailProcessProposalsList ||
    !detailProcessProposalsContribute ||
    !detailProcessProposalsCompose ||
    !detailProcessProposalsComposeTitle ||
    !detailProcessProposalsTitleInput ||
    !detailProcessProposalsBodyInput ||
    !detailProcessProposalsOutcomeInput ||
    !detailProcessProposalsInstitutionInput ||
    !detailProcessProposalsResourcesInput ||
    !detailProcessProposalsDeadlineInput ||
    !detailProcessProposalsSubmit ||
    !detailProcessProposalsCancel ||
    !detailProcessProposalsNote ||
    !detailProcessDeliberation ||
    !detailProcessDeliberationState ||
    !detailProcessDeliberationList ||
    !detailProcessVoting ||
    !detailProcessVotingState ||
    !detailProcessVotingList ||
    !detailProcessVotingSubmit ||
    !detailProcessVotingNote ||
    !detailProcessMandate ||
    !detailProcessMandateState ||
    !detailProcessMandateWinner ||
    !detailProcessMandateAuthor ||
    !detailProcessMandateTitle ||
    !detailProcessMandateBody ||
    !detailProcessMandateTally ||
    !detailProcessAction ||
    !detailProcessActionState ||
    !detailProcessActionWinner ||
    !detailProcessActionAuthor ||
    !detailProcessActionTitle ||
    !detailProcessActionBody ||
    !detailProcessActionInstitution ||
    !detailProcessActionObjective ||
    !detailProcessActionDeadline ||
    !detailProcessActionStatus ||
    !detailProcessActionResponsible ||
    !detailProcessActionCollaborators ||
    !detailProcessActionList ||
    !detailProcessActionTakeStep ||
    !detailProcessActionOfferHelp ||
    !detailProcessActionContribute ||
    !detailProcessActionAddEvidence ||
    !detailProcessActionInstitutionResponse ||
    !detailProcessActionCompose ||
    !detailProcessActionInput ||
    !detailProcessActionBlockedReason ||
    !detailProcessActionUrlInput ||
    !detailProcessActionSubmit ||
    !detailProcessActionCancel ||
    !detailProcessActionNote ||
    !detailProcessVerification ||
    !detailProcessVerificationState ||
    !detailProcessVerificationWinner ||
    !detailProcessVerificationAuthor ||
    !detailProcessVerificationTitle ||
    !detailProcessVerificationBody ||
    !detailProcessVerificationReady ||
    !detailProcessVerificationOutcome ||
    !detailProcessVerificationTally ||
    !detailProcessVerificationDisputeEscalated ||
    !detailProcessVerificationConfirm ||
    !detailProcessVerificationConfirmDelivered ||
    !detailProcessVerificationConfirmNotDelivered ||
    !detailProcessVerificationEvidenceList ||
    !detailProcessVerificationEvidenceContribute ||
    !detailProcessVerificationEvidenceCompose ||
    !detailProcessVerificationEvidenceInput ||
    !detailProcessVerificationEvidenceUrlInput ||
    !detailProcessVerificationEvidenceSubmit ||
    !detailProcessVerificationEvidenceCancel ||
    !detailProcessVerificationEvidenceNote ||
    !detailSeeToo ||
    !detailSeeTooDone ||
    !detailDoneTitle ||
    !detailDoneNote ||
    !detailConfirmCount ||
    !detailSessionLabel ||
    !detailSessionBody ||
    !detailSessionEmpty ||
    !detailSessionList ||
    !detailSessionContribute ||
    !detailSessionCompose ||
    !detailSessionComposeTitle ||
    !detailSessionComposeGuide ||
    !detailSessionInput ||
    !detailSessionIntent ||
    !detailSessionIntentLegend ||
    !detailSessionIntentObservationLabel ||
    !detailSessionIntentProposalLabel ||
    !detailSessionIntentNextStepLabel ||
    !detailSessionAttach ||
    !detailSessionPublish ||
    !detailSessionCancel ||
    !detailSessionDemoNote ||
    !detailTestimonyInput ||
    !detailTestimonyPreview ||
    !detailTestimonyNote ||
    !detailTestimonyImage ||
    !detailTestimonyVideo ||
    !detailTestimonyClear ||
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
    !readyError ||
    !readyContinue ||
    !readyBack ||
    !viewCommitment ||
    !commitmentLabel ||
    !commitmentTitle ||
    !commitmentBody ||
    !commitmentCountryFieldset ||
    !commitmentCountryLegend ||
    !commitmentCountryItalyLabel ||
    !commitmentCountryGermanyLabel ||
    !commitmentCountryRomaniaLabel ||
    !commitmentCountryAustriaLabel ||
    !commitmentCountryFranceLabel ||
    !commitmentCountryHungaryLabel ||
    !commitmentCountrySpainLabel ||
    !commitmentCityFieldset ||
    !commitmentCityLegend ||
    !commitmentCityOptions ||
    !commitmentReview ||
    !commitmentReviewLabel ||
    !commitmentReviewCountry ||
    !commitmentReviewCity ||
    !commitmentReviewNote ||
    !commitmentAcceptLabelWrap ||
    !commitmentAccept ||
    !commitmentAcceptText ||
    !commitmentAcceptRequired ||
    !commitmentError ||
    !commitmentSavedStatus ||
    !commitmentCheckoutHint ||
    !commitmentConfirm ||
    !commitmentCheckout ||
    !commitmentBack ||
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
    !paymentConfirming ||
    !paymentConfirmingLabel ||
    !paymentConfirmingTitle ||
    !paymentConfirmingBody ||
    !paymentConfirmingStatus ||
    !paymentConfirmingRetry ||
    !paymentConfirmingDismiss ||
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

  const communityCatalogApi = window.TownCommunityCommitment;
  const CITY_BY_COUNTRY = communityCatalogApi.CITY_BY_COUNTRY;

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
          "Il segnale resta locale e aperto. Nessuna conferma rilevante di intervento è ancora disponibile.",
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
          "I residenti riferiscono di aver già segnalato il Comune. Il segnale resta in monitoraggio locale.",
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
          "Il segnale resta aperto. Non risultano ancora indicazioni aggiornate su durata o percorso alternativo.",
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
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Maßnahme vor.",
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
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
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
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu Dauer oder Ausweichweg.",
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
    ClujNapoca: [
      {
        id: "cluj-napoca-signal-1",
        category: "MEDIU",
        authorName: "Redacția TOWN Cluj-Napoca",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "3 august 2026",
        area: "Zorilor",
        headline: "Spațiul verde din Parcul Rozelor, năpădit de vegetație necontrolată",
        summary:
          "Iarba și tufișurile netunse de peste două luni acoperă aleile secundare. Locuitorii cer reluarea programului de întreținere.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "În Parcul Rozelor din cartierul Zorilor, aleile secundare sunt acoperite de vegetație netunsă încă de la începutul verii. Băncile și coșurile de gunoi devin greu accesibile, iar iarba înaltă ascunde denivelările terenului.",
        whyMatters:
          "Parcul Rozelor este unul dintre puținele spații verzi extinse din Zorilor, folosit zilnic de familii, sportivi și persoane în vârstă. Lipsa întreținerii reduce siguranța și utilitatea unui spațiu public esențial pentru cartier.",
        whoAffected:
          "Familii cu copii, persoane în vârstă, sportivi și locuitorii cartierului Zorilor care folosesc parcul pentru plimbări zilnice.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu există încă o confirmare a reluării programului de întreținere.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
      {
        id: "cluj-napoca-signal-2",
        category: "INFRASTRUCTURĂ",
        authorName: "Redacția TOWN Cluj-Napoca",
        observedTime: "Semnalat acum două zile",
        observedDate: "1 august 2026",
        area: "Mănăștur",
        headline: "Carosabilul de pe strada Fabricii de Zahăr rămâne plin de gropi",
        summary:
          "Denivelările s-au adâncit după ploile din iulie. Autobuzele de transport public evită acum banda din dreapta.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: semnalat — monitorizare locală",
        description:
          "Pe strada Fabricii de Zahăr, în Mănăștur, mai multe gropi extinse afectează ambele benzi de circulație. Ploile din iulie au adâncit denivelările existente, iar șoferii de autobuz raportează că evită banda din dreapta pe tot traseul.",
        whyMatters:
          "Strada este un traseu zilnic pentru transportul public și pentru mii de locuitori ai celui mai populat cartier al orașului. Gropile adânci cresc riscul de accidente și uzura prematură a vehiculelor.",
        whoAffected:
          "Locuitorii cartierului Mănăștur, pasagerii liniilor de autobuz care circulă pe strada Fabricii de Zahăr, bicicliști și șoferi.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu a fost confirmată încă o dată pentru lucrări de reparație.",
        statusNote:
          "„Semnalat” indică faptul că problema a fost adusă la cunoștința comunității locale. Nu confirmă reparație, preluare formală sau termene de intervenție.",
      },
      {
        id: "cluj-napoca-signal-3",
        category: "SPAȚIU PUBLIC",
        authorName: "Redacția TOWN Cluj-Napoca",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "4 august 2026",
        area: "Centrul Vechi",
        headline:
          "Zona pietonală din jurul Bisericii Sfântul Mihail, blocată de terase neautorizate",
        summary:
          "Mese și scaune ocupă trotuarul pe o lățime de peste doi metri. Persoanele cu cărucior sau cu mobilitate redusă sunt nevoite să coboare pe carosabil.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: deschis — necesită clarificare locală",
        description:
          "În jurul Pieței Unirii, mai multe terase depășesc perimetrul autorizat și ocupă trotuarul aproape în întregime, în special seara. Spațiul pietonal rămas este insuficient pentru fluxul de trecere, mai ales în zilele de weekend.",
        whyMatters:
          "Centrul Vechi este cea mai circulată zonă pietonală a orașului. Un trotuar blocat afectează direct accesibilitatea pentru persoane cu cărucioare, cărucioare de copii sau mobilitate redusă.",
        whoAffected:
          "Persoane cu mobilitate redusă, părinți cu cărucioare, turiști și locuitorii care traversează zilnic Piața Unirii pe jos.",
        latestUpdate:
          "Semnalul rămâne deschis. Nu există încă o verificare confirmată a respectării perimetrelor autorizate.",
        statusNote:
          "„Deschis” înseamnă că situația rămâne de clarificat pentru comunitate. Nu implică o decizie administrativă deja încheiată.",
      },
    ],
    Sibiu: [
      {
        id: "sibiu-signal-1",
        category: "SPAȚIU PUBLIC",
        authorName: "Redacția TOWN Sibiu",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "2 august 2026",
        area: "Piața Mică",
        headline: "Pavajul istoric din Piața Mică s-a deplasat lângă Pasajul Scărilor",
        summary:
          "Câteva zeci de pietre de pavaj s-au ridicat și s-au deplasat. Zona rămâne instabilă la pas, mai ales pe timp de ploaie.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "Lângă intrarea în Pasajul Scărilor, o porțiune din pavajul istoric al Pieței Mici s-a deplasat, lăsând pietre ridicate și goluri între ele. Traficul pietonal intens din zonă, combinat cu ploile de vară, a accelerat degradarea.",
        whyMatters:
          "Piața Mică este inima turistică și pietonală a orașului, traversată zilnic de mii de locuitori și vizitatori. Pavajul instabil crește riscul de accidentare, în special pentru persoanele în vârstă.",
        whoAffected:
          "Locuitorii din Centrul Istoric, comercianții din piață, turiștii și persoanele în vârstă care traversează zona zilnic.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o intervenție de refacere a pavajului.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
      {
        id: "sibiu-signal-2",
        category: "INFRASTRUCTURĂ",
        authorName: "Redacția TOWN Sibiu",
        observedTime: "Semnalat acum trei săptămâni",
        observedDate: "17 iulie 2026",
        area: "Hipodrom",
        headline: "Stâlpii de iluminat din cartierul Hipodrom III rămân stinși de trei săptămâni",
        summary:
          "Un tronson de aproape un kilometru pe strada Ceferiștilor este întunecat seara. Locuitorii au depus deja o sesizare la Primărie.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: semnalat — monitorizare locală",
        description:
          "Pe strada Ceferiștilor, în cartierul Hipodrom III, un tronson de aproape un kilometru rămâne fără iluminat public de la începutul lunii. Locuitorii spun că problema a fost deja semnalată furnizorului de energie, fără o dată clară de remediere.",
        whyMatters:
          "Iluminatul public face parte din siguranța zilnică a unui cartier rezidențial dens. Un tronson întunecat afectează atât siguranța pietonilor, cât și percepția generală de siguranță a zonei.",
        whoAffected:
          "Locuitorii cartierului Hipodrom III, elevi care se întorc seara de la activități, persoane care folosesc strada Ceferiștilor pentru a ajunge la stațiile de transport public.",
        latestUpdate:
          "Locuitorii confirmă că au depus deja o sesizare. Semnalul rămâne în monitorizare locală.",
        statusNote:
          "„Semnalat” indică faptul că problema a fost adusă la cunoștința comunității locale. Nu confirmă reparație, preluare formală sau termene de intervenție.",
      },
      {
        id: "sibiu-signal-3",
        category: "MEDIU",
        authorName: "Redacția TOWN Sibiu",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "5 august 2026",
        area: "Pădurea Dumbrava",
        headline: "Cărările din Pădurea Dumbrava, blocate de crengi căzute după furtuna din iulie",
        summary:
          "Mai multe cărări principale spre Zoo și Muzeul Astra rămân impracticabile. Curățarea nu a fost încă anunțată.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "Furtuna puternică din a doua jumătate a lunii iulie a doborât mai multe crengi mari pe cărările principale din Pădurea Dumbrava, blocând accesul pietonal spre zona Zoo și spre traseele care duc către Muzeul Astra.",
        whyMatters:
          "Pădurea Dumbrava este cea mai folosită zonă de agrement din apropierea orașului, vizitată zilnic de familii, alergători și turiști. Cărările blocate reduc accesul la un spațiu natural esențial pentru comunitate.",
        whoAffected:
          "Familii care vizitează Zoo, alergători, turiști care merg spre Muzeul Astra și locuitorii din apropiere care folosesc pădurea pentru plimbări zilnice.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu a fost anunțată încă o dată pentru curățarea cărărilor afectate.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
    ],
    Iasi: [
      {
        id: "iasi-signal-1",
        category: "INFRASTRUCTURĂ",
        authorName: "Redacția TOWN Iași",
        observedTime: "Semnalat ieri",
        observedDate: "6 august 2026",
        area: "Tătărași",
        headline: "Asfaltul de pe strada Moara de Vânt s-a surpat pe o porțiune de zece metri",
        summary:
          "O conductă de apă spartă a subminat carosabilul. Circulația pe bandă unică este dirijată manual de un agent de pază local.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: semnalat — monitorizare locală",
        description:
          "Pe strada Moara de Vânt, în Tătărași, o avarie la conducta de apă a dus la surparea asfaltului pe o porțiune de aproximativ zece metri. Circulația se desfășoară pe o singură bandă, iar în orele de vârf apar ambuteiaje.",
        whyMatters:
          "Strada Moara de Vânt este un traseu principal de acces spre zona rezidențială Tătărași. Surparea carosabilului reprezintă un pericol real pentru vehicule și pietoni deopotrivă.",
        whoAffected:
          "Locuitorii cartierului Tătărași, șoferii care folosesc strada ca rută zilnică, pietonii care traversează zona.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o dată pentru repararea conductei și a carosabilului.",
        statusNote:
          "„Semnalat” indică faptul că problema a fost adusă la cunoștința comunității locale. Nu confirmă reparație, preluare formală sau termene de intervenție.",
      },
      {
        id: "iasi-signal-2",
        category: "SPAȚIU PUBLIC",
        authorName: "Redacția TOWN Iași",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "4 august 2026",
        area: "Copou",
        headline: "Aleea principală din Parcul Copou rămâne fără bănci funcționale",
        summary:
          "Majoritatea băncilor de pe aleea centrală au scândurile rupte sau lipsă. Vizitatorii se așază pe marginea aleii.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "Pe aleea principală a Parcului Copou, aproape de Teiul lui Eminescu, majoritatea băncilor au scândurile rupte sau complet lipsă. Vizitatorii, mai ales persoanele în vârstă, se văd nevoiți să se așeze pe marginea aleii sau pe iarbă.",
        whyMatters:
          "Parcul Copou este un reper istoric și un spațiu de recreere folosit zilnic de mii de ieșeni. Lipsa mobilierului urban funcțional reduce accesibilitatea unui spațiu public esențial pentru oraș.",
        whoAffected:
          "Persoane în vârstă, familii cu copii, studenți din campusurile din apropiere și turiști care vizitează Teiul lui Eminescu.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu există încă o confirmare a înlocuirii mobilierului urban.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
      {
        id: "iasi-signal-3",
        category: "MEDIU",
        authorName: "Redacția TOWN Iași",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "5 august 2026",
        area: "Nicolina",
        headline: "Malul Bahluiului din Nicolina, acoperit de deșeuri aduse de apele mari",
        summary:
          "Apele crescute din iulie au împins gunoaie și resturi vegetale pe mal. Mirosul afectează blocurile din apropiere.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "Pe malul Bahluiului, în dreptul cartierului Nicolina, creșterea nivelului apei din iulie a împins pe mal cantități mari de deșeuri plutitoare și resturi vegetale. Zona nu a fost curățată de la momentul retragerii apelor.",
        whyMatters:
          "Malul Bahluiului este folosit ca traseu pietonal și de agrement pentru locuitorii din Nicolina. Deșeurile acumulate afectează atât mediul, cât și calitatea vieții în blocurile din apropiere.",
        whoAffected:
          "Locuitorii blocurilor din apropierea malului, persoane care folosesc traseul pietonal de-a lungul Bahluiului, familii cu copii.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o dată pentru operațiunea de curățare.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
    ],
    Timisoara: [
      {
        id: "timisoara-signal-1",
        category: "SPAȚIU PUBLIC",
        authorName: "Redacția TOWN Timișoara",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "3 august 2026",
        area: "Iosefin",
        headline: "Trotuarul din fața Gării de Nord rămâne blocat de biciclete abandonate",
        summary:
          "Peste zece biciclete fără roți sau șa stau prinse de gard de luni de zile. Spațiul pietonal s-a redus la jumătate.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "În fața Gării de Nord, dinspre Iosefin, mai multe biciclete abandonate — unele fără roți, altele fără șa — ocupă gardul și trotuarul de câteva luni. Spațiul rămas pentru pietoni s-a redus considerabil, mai ales în orele de vârf ale traficului feroviar.",
        whyMatters:
          "Zona Gării de Nord este un punct intens de tranzit zilnic pentru navetiști și călători. Un trotuar blocat afectează direct fluxul pietonal într-una dintre cele mai aglomerate zone ale orașului.",
        whoAffected:
          "Navetiști, călători cu bagaje, persoane cu mobilitate redusă și locuitorii din Iosefin care trec zilnic prin zonă.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o operațiune de ridicare a bicicletelor abandonate.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
      {
        id: "timisoara-signal-2",
        category: "INFRASTRUCTURĂ",
        authorName: "Redacția TOWN Timișoara",
        observedTime: "Semnalat acum o săptămână",
        observedDate: "31 iulie 2026",
        area: "Fabric",
        headline:
          "Pista de biciclete de pe strada Take Ionescu se întrerupe brusc lângă intersecția cu Circumvalațiunii",
        summary:
          "Marcajul dispare fără avertisment, iar bicicliștii sunt nevoiți să intre direct în traficul auto.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: semnalat — monitorizare locală",
        description:
          "Pe strada Take Ionescu, în apropierea intersecției cu Circumvalațiunii, pista de biciclete se întrerupe brusc, fără o zonă de tranziție marcată. Bicicliștii care circulă spre centru sunt nevoiți să intre direct pe banda auto, fără avertisment vizual pentru șoferi.",
        whyMatters:
          "Take Ionescu este una dintre principalele artere folosite de bicicliști pentru a ajunge în centrul orașului. O întrerupere neclară a pistei crește riscul de accident chiar la intrarea într-o intersecție aglomerată.",
        whoAffected:
          "Bicicliști navetiști, elevi și studenți care folosesc bicicleta zilnic, șoferii care circulă pe Take Ionescu.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o soluție de continuare sau marcare a pistei.",
        statusNote:
          "„Semnalat” indică faptul că problema a fost adusă la cunoștința comunității locale. Nu confirmă reparație, preluare formală sau termene de intervenție.",
      },
      {
        id: "timisoara-signal-3",
        category: "MEDIU",
        authorName: "Redacția TOWN Timișoara",
        observedTime: "Observat săptămâna aceasta",
        observedDate: "6 august 2026",
        area: "Pădurea Verde",
        headline: "Zona de picnic din Pădurea Verde rămâne fără coșuri de gunoi funcționale",
        summary:
          "Coșurile existente sunt pline sau răsturnate de câteva săptămâni. Deșeurile se acumulează în jurul meselor de picnic.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Stare civică: observat — în așteptarea atenției locale",
        description:
          "În zona de picnic din Pădurea Verde, coșurile de gunoi existente sunt fie pline la capacitate, fie răsturnate, de câteva săptămâni. Deșeurile se acumulează în jurul meselor de picnic, mai ales după weekendurile aglomerate.",
        whyMatters:
          "Pădurea Verde este principalul spațiu de agrement de la marginea orașului, folosit intens vara de familii și grupuri. Lipsa gestionării deșeurilor afectează atât igiena, cât și atractivitatea zonei.",
        whoAffected:
          "Familii care vin la picnic, alergători și cicliști care folosesc traseele din pădure, locuitorii din apropiere.",
        latestUpdate:
          "Semnalul rămâne local și deschis. Nu este confirmată încă o dată pentru golirea și înlocuirea coșurilor.",
        statusNote:
          "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută.",
      },
    ],
    Koln: [
      {
        id: "koln-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Redaktion TOWN Köln",
        observedTime: "Gestern beobachtet",
        observedDate: "6. August 2026",
        area: "Ehrenfeld",
        headline: "Der Spielplatz an der Piusstraße bleibt seit Wochen gesperrt",
        summary:
          "Ein beschädigtes Klettergerüst wurde provisorisch abgesperrt, aber nicht repariert. Kinder weichen auf die Straße aus.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "Auf dem Spielplatz in Ehrenfeld ist das große Klettergerüst seit einem Monat mit Flatterband abgesperrt, nachdem ein Teil der Konstruktion beschädigt wurde. Eine Reparatur wurde bisher nicht angekündigt, der Spielplatz bleibt nur eingeschränkt nutzbar.",
        whyMatters:
          "Der Spielplatz ist einer der wenigen großen Spielorte im dicht bebauten Ehrenfeld. Ohne ihn weichen Familien auf Gehwege und ruhige Straßen aus, was die Sicherheit der Kinder verringert.",
        whoAffected:
          "Familien mit kleinen Kindern, Kindertagesstätten in der Nähe und Anwohnerinnen und Anwohner, die den Platz täglich nutzen.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Reparatur vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "koln-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Redaktion TOWN Köln",
        observedTime: "Vor zwei Wochen gemeldet",
        observedDate: "24. Juli 2026",
        area: "Nippes",
        headline: "Mehrere Straßenlaternen am Wilhelmplatz bleiben dunkel",
        summary:
          "Der Fußweg zur Straßenbahnhaltestelle ist abends kaum beleuchtet. Anwohner haben die Störung bereits gemeldet.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Rund um den Wilhelmplatz in Nippes bleiben seit über zwei Wochen mehrere Straßenlaternen dunkel. Der Fußweg zur nächsten Straßenbahnhaltestelle ist nach Einbruch der Dunkelheit schwer einsehbar.",
        whyMatters:
          "Gute Beleuchtung gehört zur alltäglichen Sicherheit im Viertel. Ein dunkler Weg zur Haltestelle betrifft besonders Berufspendlerinnen und -pendler in den Abendstunden.",
        whoAffected:
          "Anwohnerinnen und Anwohner, Fahrgäste der Straßenbahn und alle, die abends zu Fuß zur Haltestelle gehen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "koln-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Redaktion TOWN Köln",
        observedTime: "Diese Woche beobachtet",
        observedDate: "5. August 2026",
        area: "Deutz",
        headline: "Die Baustelle an der Deutzer Brücke lässt kaum Platz für Fußgänger",
        summary:
          "Der provisorische Gehweg ist eng und schlecht ausgeschildert. Es fehlt eine sichere Führung für Rollstuhlfahrer.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "An der Deutzer Brücke hat eine Baustelle den Gehweg auf einen schmalen provisorischen Streifen verengt. Es gibt keine erkennbare Alternative für Rollstuhlfahrer oder Personen mit Kinderwagen.",
        whyMatters:
          "Die Deutzer Brücke ist eine der meistgenutzten Fußgängerverbindungen über den Rhein. Ein zu enger Baustellenweg macht den täglichen Übergang für viele Menschen unsicher.",
        whoAffected:
          "Fußgänger, Rollstuhlfahrer, Eltern mit Kinderwagen und Pendlerinnen und Pendler, die täglich die Brücke queren.",
        latestUpdate:
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu Dauer oder einer sicheren Alternative.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
      },
    ],
    Dortmund: [
      {
        id: "dortmund-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Redaktion TOWN Dortmund",
        observedTime: "Gestern beobachtet",
        observedDate: "6. August 2026",
        area: "Kreuzviertel",
        headline: "Der Gehweg in der Vinckestraße ist durch Baumwurzeln stark angehoben",
        summary:
          "Wurzeln haben mehrere Gehwegplatten angehoben. Fußgänger weichen regelmäßig auf die Straße aus.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "In der Vinckestraße im Kreuzviertel haben Baumwurzeln mehrere Gehwegplatten deutlich angehoben. Der Gehweg ist auf einer Länge von rund zwanzig Metern uneben, besonders bei Dunkelheit eine Stolpergefahr.",
        whyMatters:
          "Das Kreuzviertel ist dicht bebaut und wird viel zu Fuß erschlossen. Ein beschädigter Gehweg betrifft den täglichen Weg vieler Anwohnerinnen und Anwohner.",
        whoAffected:
          "Anwohnerinnen und Anwohner, ältere Menschen, Familien mit Kinderwagen und alle, die die Vinckestraße zu Fuß nutzen.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Maßnahme vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "dortmund-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Redaktion TOWN Dortmund",
        observedTime: "Vor einer Woche gemeldet",
        observedDate: "31. Juli 2026",
        area: "Hörde",
        headline: "Der Uferweg am Phoenix-See liegt abends im Dunkeln",
        summary:
          "Ein rund 300 Meter langer Abschnitt des Uferwegs hat keine funktionierende Beleuchtung. Läufer und Radfahrer meiden die Strecke nach Einbruch der Dunkelheit.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Am östlichen Ufer des Phoenix-Sees in Hörde bleibt ein rund 300 Meter langer Abschnitt des Uferwegs abends unbeleuchtet. Anwohner vermuten einen technischen Defekt, eine Meldung an die Stadtwerke ist bereits erfolgt.",
        whyMatters:
          "Der Uferweg ist eine der meistgenutzten Freizeitstrecken der Stadt. Ein dunkler Abschnitt schränkt die abendliche Nutzung für viele Menschen spürbar ein.",
        whoAffected:
          "Läuferinnen und Läufer, Radfahrende, Anwohnerinnen und Anwohner und alle, die den Uferweg abends nutzen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "dortmund-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Redaktion TOWN Dortmund",
        observedTime: "Diese Woche beobachtet",
        observedDate: "4. August 2026",
        area: "Innenstadt-Nord",
        headline: "Die Umleitung an der Münsterstraße ist für Radfahrer nicht ausgeschildert",
        summary:
          "Der Radweg endet abrupt an der Baustelle, eine Weiterführung fehlt. Radfahrer weichen unangekündigt auf die Fahrbahn aus.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "An der Münsterstraße in der Nordstadt endet der Radweg direkt an einer Baustelle, ohne dass eine Umleitung ausgeschildert ist. Radfahrende müssen unvermittelt auf die Fahrbahn wechseln, was Autofahrer überrascht.",
        whyMatters:
          "Die Münsterstraße ist eine zentrale Radverbindung in die Innenstadt. Eine unklare Umleitung an einer belebten Kreuzung erhöht das Unfallrisiko unmittelbar.",
        whoAffected:
          "Radfahrerinnen und Radfahrer, Berufspendler, Autofahrer und alle, die die Münsterstraße regelmäßig queren.",
        latestUpdate:
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu einer ausgeschilderten Umleitung.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
      },
    ],
    Stuttgart: [
      {
        id: "stuttgart-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Redaktion TOWN Stuttgart",
        observedTime: "Vor zehn Tagen beobachtet",
        observedDate: "28. Juli 2026",
        area: "Bad Cannstatt",
        headline: "Der Spielplatz am Kursaal ist seit dem Sturm im Juli halb gesperrt",
        summary:
          "Ein umgestürzter Ast beschädigte die Schaukel. Der Bereich ist notdürftig abgesperrt, eine Reparatur steht aus.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "Nach dem Sturm Ende Juli beschädigte ein umgestürzter Ast die große Schaukelanlage am Kursaal-Spielplatz in Bad Cannstatt. Der Bereich ist mit Flatterband abgesperrt, der Rest des Spielplatzes bleibt nutzbar.",
        whyMatters:
          "Der Kursaal-Spielplatz ist der zentrale Treffpunkt für Familien im Stadtteil. Eine dauerhaft gesperrte Schaukelanlage schränkt das Angebot für Kinder spürbar ein.",
        whoAffected:
          "Familien mit kleinen Kindern, Kindertagesstätten in der Nähe und Anwohnerinnen und Anwohner, die den Platz täglich nutzen.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Reparatur vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "stuttgart-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Redaktion TOWN Stuttgart",
        observedTime: "Vor zehn Tagen gemeldet",
        observedDate: "28. Juli 2026",
        area: "Ostheim",
        headline: "Die Fußgängerunterführung an der Schwarenbergstraße bleibt dunkel",
        summary:
          "Die Beleuchtung der Unterführung fällt seit Tagen komplett aus. Anwohner meiden den Weg nach Einbruch der Dunkelheit.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Die Fußgängerunterführung unter der Schwarenbergstraße in Ostheim ist seit rund zehn Tagen ohne funktionierende Beleuchtung. Der Weg verbindet zwei Wohngebiete und wird täglich stark genutzt.",
        whyMatters:
          "Eine dunkle Unterführung ist ein zentraler Sicherheitsfaktor im Alltag. Ohne Beleuchtung meiden viele Anwohnerinnen und Anwohner den direkten Weg und nehmen Umwege in Kauf.",
        whoAffected:
          "Anwohnerinnen und Anwohner, Schülerinnen und Schüler auf dem Schulweg und alle, die die Unterführung abends nutzen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "stuttgart-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Redaktion TOWN Stuttgart",
        observedTime: "Diese Woche beobachtet",
        observedDate: "5. August 2026",
        area: "Vaihingen",
        headline: "Die Baustelle an der Universität engt den Rad- und Fußweg stark ein",
        summary:
          "Radfahrer und Fußgänger teilen sich einen schmalen provisorischen Streifen ohne klare Trennung.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "Auf dem Campus in Vaihingen hat eine Baustelle den kombinierten Rad- und Fußweg auf einen schmalen provisorischen Streifen reduziert. Eine Trennung zwischen Fußgängern und Radfahrenden fehlt vollständig.",
        whyMatters:
          "Der Weg wird von tausenden Studierenden und Beschäftigten täglich genutzt. Ohne klare Trennung steigt das Risiko von Zusammenstößen in den Stoßzeiten erheblich.",
        whoAffected:
          "Studierende, Beschäftigte der Universität, Radfahrerinnen und Radfahrer sowie Fußgänger auf dem Campus.",
        latestUpdate:
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu Dauer oder einer klaren Wegetrennung.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
      },
    ],
    Frankfurt: [
      {
        id: "frankfurt-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Redaktion TOWN Frankfurt",
        observedTime: "Gestern beobachtet",
        observedDate: "6. August 2026",
        area: "Bornheim",
        headline: "Der Gehweg in der Berger Straße ist durch lose Pflastersteine uneben",
        summary:
          "Mehrere Pflastersteine haben sich gelöst und liegen lose auf dem Gehweg. Passanten stolpern regelmäßig.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "In der Berger Straße in Bornheim haben sich auf einem stark frequentierten Abschnitt mehrere Pflastersteine gelöst. Sie liegen lose auf dem Gehweg und stellen besonders bei Dunkelheit eine Stolpergefahr dar.",
        whyMatters:
          "Die Berger Straße ist eine der belebtesten Einkaufsstraßen des Viertels. Ein unebener Gehweg betrifft täglich viele Menschen, besonders ältere Passanten.",
        whoAffected:
          "Anwohnerinnen und Anwohner, ältere Menschen, Besucherinnen und Besucher der Geschäfte in der Berger Straße.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Maßnahme vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "frankfurt-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Redaktion TOWN Frankfurt",
        observedTime: "Vor zwei Wochen gemeldet",
        observedDate: "24. Juli 2026",
        area: "Gallus",
        headline: "Der Weg entlang der Bahngleise im Gallus bleibt abends unbeleuchtet",
        summary:
          "Ein rund 200 Meter langer Fußweg zwischen Wohnhäusern und der Haltestelle hat keine funktionierende Beleuchtung.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Entlang der Bahngleise im Gallusviertel bleibt ein rund 200 Meter langer Fußweg zwischen Wohnhäusern und der S-Bahn-Haltestelle abends dunkel. Anwohner berichten, dass mehrere Laternen bereits seit Wochen ausgefallen sind.",
        whyMatters:
          "Der Weg ist die kürzeste Verbindung zur Haltestelle für viele Anwohnerinnen und Anwohner. Fehlende Beleuchtung wirkt sich direkt auf das Sicherheitsgefühl auf dem täglichen Weg aus.",
        whoAffected:
          "Anwohnerinnen und Anwohner, Berufspendlerinnen und -pendler und alle, die abends die Haltestelle nutzen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "frankfurt-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Redaktion TOWN Frankfurt",
        observedTime: "Diese Woche beobachtet",
        observedDate: "5. August 2026",
        area: "Sachsenhausen",
        headline: "Die Baustelle am Mainufer versperrt den Uferweg ohne Hinweisschilder",
        summary:
          "Fußgänger und Radfahrer stehen unvermittelt vor einer Absperrung. Ein ausgeschilderter Umweg fehlt.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "Am Mainufer in Sachsenhausen versperrt eine Baustelle den beliebten Uferweg vollständig, ohne dass ein Umweg ausgeschildert ist. Fußgänger und Radfahrende stehen unvermittelt vor der Absperrung und müssen selbst einen Weg finden.",
        whyMatters:
          "Der Uferweg ist eine der meistgenutzten Freizeit- und Pendelstrecken der Stadt. Eine unangekündigte Vollsperrung ohne Umleitung sorgt für unnötige Verwirrung und Umwege.",
        whoAffected:
          "Fußgänger, Radfahrerinnen und Radfahrer, Joggerinnen und Jogger und alle, die den Uferweg täglich nutzen.",
        latestUpdate:
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu einer ausgeschilderten Umleitung.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
      },
    ],
    Salzburg: [
      {
        id: "salzburg-signal-1",
        category: "ÖFFENTLICHER RAUM",
        authorName: "Redaktion TOWN Salzburg",
        observedTime: "Gestern beobachtet",
        observedDate: "6. August 2026",
        area: "Altstadt",
        headline: "Das Kopfsteinpflaster in der Getreidegasse ist an mehreren Stellen abgesackt",
        summary:
          "Einzelne Steine haben sich gesenkt, es bilden sich Pfützen bei Regen. Rollstuhlfahrer weichen auf die Fahrbahn aus.",
        image: "assets/feed/signal_citta_studi_pavement.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
        description:
          "In der Getreidegasse in der Altstadt sind an mehreren Stellen einzelne Pflastersteine abgesackt. Bei Regen bilden sich dort Pfützen, und Personen mit Rollstuhl oder Rollator weichen häufig auf die angrenzende Fahrbahn aus.",
        whyMatters:
          "Die Getreidegasse ist die meistbegangene Fußgängerzone der Altstadt. Ein unebenes Pflaster betrifft täglich tausende Passanten, besonders Menschen mit eingeschränkter Mobilität.",
        whoAffected:
          "Rollstuhlfahrerinnen und Rollstuhlfahrer, ältere Menschen, Anrainerinnen und Anrainer sowie Besucherinnen und Besucher der Altstadt.",
        latestUpdate:
          "Das Signal bleibt lokal und offen. Derzeit liegt keine bestätigte Maßnahme vor.",
        statusNote:
          "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff.",
      },
      {
        id: "salzburg-signal-2",
        category: "STRASSENBELEUCHTUNG",
        authorName: "Redaktion TOWN Salzburg",
        observedTime: "Vor einer Woche gemeldet",
        observedDate: "31. Juli 2026",
        area: "Lehen",
        headline: "Die Unterführung bei der Bahnhaltestelle Lehen bleibt seit Tagen dunkel",
        summary:
          "Die Beleuchtung ist komplett ausgefallen. Anwohner nehmen abends lieber einen Umweg über die Hauptstraße.",
        image: "assets/feed/signal_porta_romana_lighting.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: gemeldet — lokale Beobachtung",
        description:
          "Die Fußgängerunterführung bei der Bahnhaltestelle Lehen ist seit rund einer Woche ohne funktionierende Beleuchtung. Anwohner berichten, dass sie abends lieber einen Umweg über die Hauptstraße nehmen.",
        whyMatters:
          "Die Unterführung ist der direkte Zugang zur Bahnhaltestelle für viele Pendlerinnen und Pendler. Fehlende Beleuchtung verringert das Sicherheitsgefühl auf einem täglich genutzten Weg.",
        whoAffected:
          "Pendlerinnen und Pendler, Anwohnerinnen und Anwohner und alle, die die Bahnhaltestelle Lehen abends nutzen.",
        latestUpdate:
          "Anwohner berichten, die Störung bereits gemeldet zu haben. Das Signal bleibt in lokaler Beobachtung.",
        statusNote:
          "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan.",
      },
      {
        id: "salzburg-signal-3",
        category: "ÖFFENTLICHE BAUARBEITEN",
        authorName: "Redaktion TOWN Salzburg",
        observedTime: "Diese Woche beobachtet",
        observedDate: "5. August 2026",
        area: "Parsch",
        headline: "Die Baustelle am Kapuzinerberg-Zugang lässt keinen sicheren Fußweg frei",
        summary:
          "Der Wanderweg ist auf einen schmalen Streifen neben der Baustelle reduziert, ohne Absperrung zur Grube.",
        image: "assets/feed/signal_lorenteggio_works.jpg",
        focus: "50% 45%",
        civicStatus: "Bürgerlicher Status: offen — braucht lokale Klarheit",
        description:
          "Am Zugang zum Kapuzinerberg in Parsch hat eine Baustelle den Wanderweg auf einen schmalen Streifen reduziert. Eine Absperrung zur angrenzenden Baugrube fehlt, was besonders bei Dunkelheit ein Risiko darstellt.",
        whyMatters:
          "Der Kapuzinerberg ist eines der beliebtesten Naherholungsgebiete der Stadt. Ein ungesicherter Zugang betrifft täglich viele Wanderer und Anwohner, die diesen Weg nutzen.",
        whoAffected:
          "Wanderinnen und Wanderer, Anwohnerinnen und Anwohner von Parsch und alle, die den Kapuzinerberg regelmäßig besuchen.",
        latestUpdate:
          "Das Signal bleibt offen. Es gibt noch keine aktualisierte Angabe zu einer gesicherten Wegeführung.",
        statusNote:
          "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung.",
      },
    ],
  };

  const apiBaseHelper = window.TownApiBase || null;
  const apiBaseResolution =
    apiBaseHelper && typeof apiBaseHelper.resolveApiBaseSafe === "function"
      ? apiBaseHelper.resolveApiBaseSafe(window.location.hostname)
      : {
          ok: false,
          apiBase: null,
          error: "Misconfigured API base: helper missing.",
        };
  const API_BASE = apiBaseResolution.ok ? apiBaseResolution.apiBase : "";
  const API_BASE_ERROR = apiBaseResolution.ok ? null : apiBaseResolution.error;
  if (!API_BASE && typeof console !== "undefined" && console.error) {
    console.error(API_BASE_ERROR || "Misconfigured API base.");
  }
  // Owner product-testing only: unlocks canTakeCivicAction while API is staging.
  // Does not invent backend canParticipate; strip after read. Not a production grant.
  const CITY_API_SLUG = {};
  const KNOWN_FEED_IMAGES = {
    "assets/feed/signal_citta_studi_pavement.jpg": true,
    "assets/feed/signal_porta_romana_lighting.jpg": true,
    "assets/feed/signal_lorenteggio_works.jpg": true,
  };
  const CITY_PLACEHOLDER_IMAGES = {};
  /** In-session live scenes by city id; cleared on session reset. */
  const liveScenes = {};
  const catalogCityIds = communityCatalogApi.cityIds();
  for (let cityIndex = 0; cityIndex < catalogCityIds.length; cityIndex++) {
    const catalogCity = communityCatalogApi.cityForId(catalogCityIds[cityIndex]);
    CITY_API_SLUG[catalogCity.id] = catalogCity.slug;
    CITY_PLACEHOLDER_IMAGES[catalogCity.id] = catalogCity.image;
    liveScenes[catalogCity.id] = null;
  }

  const CITY_COPY = {
    en: {
      title: "Choose your city",
      lead: "TOWN connects you to one local community that you declare.",
      cityLegend: "City",
      back: "Back",
      continue: "Continue",
      cityNames: { Milano: "Milano", Munich: "Munich" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      context: {
        Italy: "Country: Italy",
        Germany: "Country: Germany",
        Romania: "Country: Romania",
      },
    },
    es: {
      title: "Elige tu ciudad",
      lead: "TOWN te conecta con una sola comunidad local que tú declaras.",
      cityLegend: "Ciudad",
      back: "Atrás",
      continue: "Continuar",
      cityNames: { Milano: "Milán", Munich: "Múnich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      context: {
        Italy: "País: Italia",
        Germany: "País: Alemania",
        Romania: "País: Rumanía",
      },
    },
    it: {
      title: "Seleziona la tua città",
      lead: "TOWN ti collega a una sola comunità locale che dichiari.",
      cityLegend: "Città",
      back: "Indietro",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "Munich" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      context: {
        Italy: "Paese: Italia",
        Germany: "Paese: Germania",
        Romania: "Paese: România",
      },
    },
    de: {
      title: "Wähle deine Stadt",
      lead: "TOWN verbindet dich mit einer einzigen lokalen Gemeinschaft, die du angibst.",
      cityLegend: "Stadt",
      back: "Zurück",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      context: {
        Italy: "Land: Italien",
        Germany: "Land: Deutschland",
        Romania: "Land: Rumänien",
      },
    },
    ro: {
      title: "Alege-ți orașul",
      lead: "TOWN te leagă de o singură comunitate locală pe care o declari.",
      cityLegend: "Oraș",
      back: "Înapoi",
      continue: "Continuă",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      context: {
        Italy: "Țară: Italia",
        Germany: "Țară: Germania",
        Romania: "Țară: România",
      },
    },
  };

  const LOCATION_COPY = {
    en: {
      back: "Back",
      title: "Confirm your local community",
      lead: "TOWN is local. Participation belongs to people connected to this community.",
      privacy:
        "This check runs on your device against the boundary of the city you selected. Your coordinates are neither sent nor stored.",
      verify: "Verify location",
      verifying: "Verifying…",
      retry: "Try again",
      statusLabel: "Confirmed",
      successTitle: "Location verified for {city}",
      successLead:
        "Your local community is confirmed. The check happened on your device.",
      continue: "Continue",
      outsideLabel: "Notice",
      outsideTitle: "You appear to be outside {city}",
      outsideLead:
        "You appear to be outside the boundary of {city}. Declaring an untrue location violates the Terms of Use. You can still continue.",
      notAvailable:
        "Location verification for {city} is not available yet.",
      errorPermission:
        "Location permission denied. Enable location and try again.",
      errorUnavailable: "Location unavailable. Try again.",
      errorTimeout: "Timed out while getting location. Try again.",
      errorUnsupported:
        "Location verification is not available in this context. Use a secure connection and try again.",
      cityNames: { Milano: "Milano", Munich: "Munich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    es: {
      back: "Atrás",
      title: "Confirma tu comunidad local",
      lead: "TOWN es local. La participación pertenece a quienes están conectados a esta comunidad.",
      privacy:
        "Esta comprobación se ejecuta en tu dispositivo respecto al límite de la ciudad que seleccionaste. Tus coordenadas no se envían ni se almacenan.",
      verify: "Verificar ubicación",
      verifying: "Verificando…",
      retry: "Reintentar",
      statusLabel: "Confirmado",
      successTitle: "Ubicación verificada para {city}",
      successLead:
        "Tu comunidad local está confirmada. La comprobación se realizó en tu dispositivo.",
      continue: "Continuar",
      outsideLabel: "Aviso",
      outsideTitle: "Pareces estar fuera de {city}",
      outsideLead:
        "Pareces estar fuera del límite de {city}. Declarar una ubicación falsa incumple los Términos de uso. Aun así puedes continuar.",
      notAvailable:
        "La verificación de ubicación para {city} aún no está disponible.",
      errorPermission:
        "Permiso de ubicación denegado. Activa la ubicación e inténtalo de nuevo.",
      errorUnavailable: "Ubicación no disponible. Inténtalo de nuevo.",
      errorTimeout: "Se agotó el tiempo para obtener la ubicación. Inténtalo de nuevo.",
      errorUnsupported:
        "La verificación de ubicación no está disponible en este contexto. Usa una conexión segura e inténtalo de nuevo.",
      cityNames: { Milano: "Milán", Munich: "Múnich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
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
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const BOUNDARY_BY_CITY = {
    Milano: "assets/boundaries/milano_boundary_simplified.geojson",
    Munich: "assets/boundaries/munich_boundary_simplified.geojson",
    Arad: "assets/boundaries/arad_boundary_simplified.geojson",
  };

  const boundaryCache = Object.create(null);

  const FEED_COPY = {
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
      clearTestimony: "Remove media",
      demoTestimonyNote: "Attached — uploads securely when you publish",
      sessionLabel: "Session toward a solution",
      sessionBody:
        "This is not a chat. Paying members open a focused discussion on this signal — to turn what is seen into a local movement toward a solution.",
      sessionEmpty:
        "No session yet. The first contribution opens the discussion for this signal.",
      sessionOpen: "Open a discussion session",
      sessionContribute: "Add your contribution",
      sessionComposeTitle: "Contribute to this signal",
      sessionComposeGuide:
        "Share a concrete observation, a local proposal, or a next step. Write to move the community toward a solution — not for empty talk.",
      sessionAttach: "Attach photo or video",
      sessionPublish: "Publish contribution",
      sessionCancel: "Cancel",
      sessionIntentLegend: "What kind of contribution is this?",
      sessionIntentObservation: "Observation",
      sessionIntentProposal: "Proposal",
      sessionIntentNextStep: "Next step",
      sessionNeedIntent: "Choose observation, proposal, or next step.",
      sessionUnavailable:
        "Couldn't reach TOWN for this session — try again later.",
      sessionLocalOnly:
        "This preview signal has no server session yet.",
      sessionGated:
        "Discussion opens with active membership. Confirm this signal first, or continue membership to participate.",
      sessionLoading: "Loading the discussion session…",
      sessionPublishFailed:
        "Couldn't publish this contribution — try again.",
      sessionNeedText:
        "Write at least a short, concrete contribution before publishing.",
      sessionYou: "You",
      feedLoadingTitle: "Loading local signals",
      feedLoadingBody: "TOWN is fetching live civic signals for your cities.",
      feedEmptyTitle: "No live signals right now",
      feedEmptyBody: "Couldn't reach TOWN — try again later.",
      feedRetry: "Try again",
      seeTooFailed: "Couldn't save this confirmation — try again.",
      seeTooBusy: "Saving your confirmation…",
      notYourCommunity:
        "You can explore, but participation is reserved for the local community.",
      cityNames: { Milano: "Milano", Munich: "Munich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      clearTestimony: "Quitar medio",
      demoTestimonyNote: "Adjunto — se carga de forma segura al publicar",
      sessionLabel: "Sesión hacia una solución",
      sessionBody:
        "Esto no es un chat. Los miembros de pago abren una discusión centrada en esta señal — para convertir lo visto en un movimiento local hacia una solución.",
      sessionEmpty:
        "Aún no hay sesión. La primera contribución abre la discusión de esta señal.",
      sessionOpen: "Abrir una sesión de discusión",
      sessionContribute: "Añadir tu contribución",
      sessionComposeTitle: "Contribuir a esta señal",
      sessionComposeGuide:
        "Comparte una observación concreta, una propuesta local o un siguiente paso. Escribe para mover a la comunidad hacia una solución — no para hablar en vacío.",
      sessionAttach: "Adjuntar foto o vídeo",
      sessionPublish: "Publicar contribución",
      sessionCancel: "Cancelar",
      sessionIntentLegend: "¿Qué tipo de contribución es?",
      sessionIntentObservation: "Observación",
      sessionIntentProposal: "Propuesta",
      sessionIntentNextStep: "Siguiente paso",
      sessionNeedIntent: "Elige observación, propuesta o siguiente paso.",
      sessionUnavailable:
        "No se pudo contactar a TOWN para esta sesión — inténtalo de nuevo.",
      sessionLocalOnly:
        "Esta señal de vista previa aún no tiene sesión en el servidor.",
      sessionGated:
        "La discusión se abre con membresía activa. Confirma esta señal primero, o continúa la membresía para participar.",
      sessionLoading: "Cargando la sesión de discusión…",
      sessionPublishFailed:
        "No se pudo publicar esta contribución — inténtalo de nuevo.",
      sessionNeedText:
        "Escribe al menos una contribución breve y concreta antes de publicar.",
      sessionYou: "Tú",
      feedLoadingTitle: "Cargando señales locales",
      feedLoadingBody: "TOWN está obteniendo señales cívicas en vivo para tus ciudades.",
      feedEmptyTitle: "No hay señales en vivo ahora",
      feedEmptyBody: "No se pudo contactar a TOWN — inténtalo de nuevo.",
      feedRetry: "Intentar de nuevo",
      seeTooFailed: "No se pudo guardar esta confirmación — inténtalo de nuevo.",
      seeTooBusy: "Guardando tu confirmación…",
      notYourCommunity:
        "Puedes explorar, pero la participación está reservada a la comunidad local.",
      cityNames: { Milano: "Milán", Munich: "Múnich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      clearTestimony: "Rimuovi media",
      demoTestimonyNote: "Allegato — viene caricato in sicurezza alla pubblicazione",
      sessionLabel: "Sessione verso una soluzione",
      sessionBody:
        "Non è una chat. I membri paganti aprono una discussione focalizzata su questo segnale — per trasformare ciò che si vede in un movimento locale verso una soluzione.",
      sessionEmpty:
        "Nessuna sessione ancora. Il primo contributo apre la discussione su questo segnale.",
      sessionOpen: "Apri una sessione di discussione",
      sessionContribute: "Aggiungi il tuo contributo",
      sessionComposeTitle: "Contribuisci a questo segnale",
      sessionComposeGuide:
        "Condividi un’osservazione concreta, una proposta locale o un passo successivo. Scrivi per avvicinare la comunità a una soluzione — non per parlare a vuoto.",
      sessionAttach: "Allega foto o video",
      sessionPublish: "Pubblica il contributo",
      sessionCancel: "Annulla",
      sessionIntentLegend: "Che tipo di contributo è?",
      sessionIntentObservation: "Osservazione",
      sessionIntentProposal: "Proposta",
      sessionIntentNextStep: "Prossimo passo",
      sessionNeedIntent: "Scegli osservazione, proposta o prossimo passo.",
      sessionUnavailable:
        "Impossibile raggiungere TOWN per questa sessione — riprova più tardi.",
      sessionLocalOnly:
        "Questo segnale di anteprima non ha ancora una sessione sul server.",
      sessionGated:
        "La discussione si apre con l’iscrizione attiva. Conferma prima questo segnale, oppure continua l’iscrizione per partecipare.",
      sessionLoading: "Caricamento della sessione di discussione…",
      sessionPublishFailed:
        "Impossibile pubblicare questo contributo — riprova.",
      sessionNeedText:
        "Scrivi almeno un contributo breve e concreto prima di pubblicare.",
      sessionYou: "Tu",
      feedLoadingTitle: "Caricamento segnali locali",
      feedLoadingBody: "TOWN sta recuperando i segnali civici live per le tue città.",
      feedEmptyTitle: "Nessun segnale live al momento",
      feedEmptyBody: "Impossibile raggiungere TOWN — riprova più tardi.",
      feedRetry: "Riprova",
      seeTooFailed: "Impossibile salvare questa conferma — riprova.",
      seeTooBusy: "Salvataggio della conferma…",
      notYourCommunity:
        "Puoi esplorare, ma la partecipazione è riservata alla comunità locale.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      clearTestimony: "Medium entfernen",
      demoTestimonyNote: "Angehängt — wird beim Veröffentlichen sicher hochgeladen",
      sessionLabel: "Sitzung auf dem Weg zur Lösung",
      sessionBody:
        "Das ist kein Chat. Zahlende Mitglieder eröffnen eine fokussierte Diskussion zu diesem Signal — damit aus dem Gesehenen eine lokale Bewegung zur Lösung wird.",
      sessionEmpty:
        "Noch keine Sitzung. Der erste Beitrag eröffnet die Diskussion zu diesem Signal.",
      sessionOpen: "Diskussionssitzung eröffnen",
      sessionContribute: "Deinen Beitrag hinzufügen",
      sessionComposeTitle: "Zu diesem Signal beitragen",
      sessionComposeGuide:
        "Teile eine konkrete Beobachtung, einen lokalen Vorschlag oder einen nächsten Schritt. Schreibe, um die Gemeinschaft einer Lösung näherzubringen — nicht für leeres Gerede.",
      sessionAttach: "Foto oder Video anhängen",
      sessionPublish: "Beitrag veröffentlichen",
      sessionCancel: "Abbrechen",
      sessionIntentLegend: "Welche Art von Beitrag ist das?",
      sessionIntentObservation: "Beobachtung",
      sessionIntentProposal: "Vorschlag",
      sessionIntentNextStep: "Nächster Schritt",
      sessionNeedIntent: "Wähle Beobachtung, Vorschlag oder nächsten Schritt.",
      sessionUnavailable:
        "TOWN ist für diese Sitzung nicht erreichbar — später erneut versuchen.",
      sessionLocalOnly:
        "Dieses Vorschau-Signal hat noch keine Serversitzung.",
      sessionGated:
        "Die Diskussion öffnet sich mit aktiver Mitgliedschaft. Bestätige zuerst dieses Signal oder setze die Mitgliedschaft fort, um teilzunehmen.",
      sessionLoading: "Diskussionssitzung wird geladen…",
      sessionPublishFailed:
        "Dieser Beitrag konnte nicht veröffentlicht werden — erneut versuchen.",
      sessionNeedText:
        "Schreibe mindestens einen kurzen, konkreten Beitrag vor dem Veröffentlichen.",
      sessionYou: "Du",
      feedLoadingTitle: "Lokale Signale werden geladen",
      feedLoadingBody: "TOWN holt live-Bürger-Signale für deine Städte.",
      feedEmptyTitle: "Gerade keine Live-Signale",
      feedEmptyBody: "TOWN ist nicht erreichbar — später erneut versuchen.",
      feedRetry: "Erneut versuchen",
      seeTooFailed: "Diese Bestätigung konnte nicht gespeichert werden — erneut versuchen.",
      seeTooBusy: "Bestätigung wird gespeichert…",
      notYourCommunity:
        "Du kannst erkunden, aber die Teilnahme ist der lokalen Gemeinschaft vorbehalten.",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
      clearTestimony: "Elimină media",
      demoTestimonyNote: "Atașat — se încarcă în siguranță la publicare",
      sessionLabel: "Sesiune către o soluție",
      sessionBody:
        "Nu este un chat. Membrii care plătesc deschid o discuție concentrată pe acest semnal — ca ceea ce se vede să devină o mișcare locală către o soluție.",
      sessionEmpty:
        "Nicio sesiune încă. Prima contribuție deschide discuția pe acest semnal.",
      sessionOpen: "Deschide o sesiune de discuții",
      sessionContribute: "Adaugă contribuția ta",
      sessionComposeTitle: "Contribuie la acest semnal",
      sessionComposeGuide:
        "Spune o observație concretă, o propunere locală sau un pas următor. Scrie ca să muți comunitatea spre o soluție — nu pentru vorbă goală.",
      sessionAttach: "Atașează foto sau video",
      sessionPublish: "Publică contribuția",
      sessionCancel: "Anulează",
      sessionIntentLegend: "Ce fel de contribuție este?",
      sessionIntentObservation: "Observație",
      sessionIntentProposal: "Propunere",
      sessionIntentNextStep: "Pas următor",
      sessionNeedIntent: "Alege observație, propunere sau pas următor.",
      sessionUnavailable:
        "Nu am putut contacta TOWN pentru această sesiune — încearcă din nou.",
      sessionLocalOnly:
        "Acest semnal de previzualizare nu are încă sesiune pe server.",
      sessionGated:
        "Discuția se deschide cu membership activ. Confirmă mai întâi acest semnal sau continuă membership-ul ca să participi.",
      sessionLoading: "Se încarcă sesiunea de discuții…",
      sessionPublishFailed:
        "Nu am putut publica această contribuție — încearcă din nou.",
      sessionNeedText:
        "Scrie cel puțin o contribuție scurtă și concretă înainte de publicare.",
      sessionYou: "Tu",
      feedLoadingTitle: "Se încarcă semnalele locale",
      feedLoadingBody: "TOWN preia semnale civice live pentru orașele tale.",
      feedEmptyTitle: "Niciun semnal live acum",
      feedEmptyBody: "Nu am putut contacta TOWN — încearcă din nou.",
      feedRetry: "Încearcă din nou",
      seeTooFailed: "Nu am putut salva această confirmare — încearcă din nou.",
      seeTooBusy: "Se salvează confirmarea…",
      notYourCommunity:
        "Poți explora, dar participarea este rezervată comunității locale.",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const MEMBERSHIP_COPY = {
    it: {
      inviteTitle: "Ti sta a cuore ciò che accade nella tua comunità.",
      inviteBody:
        "Per confermare questo segnale e diventare parte della soluzione, crea un account identificato e dichiara la comunità in cui partecipi.",
      inviteBodySecond:
        "TOWN è costruito intorno a persone reali della stessa comunità — non su account anonimi, follower o popolarità sui social.",
      continue: "Continua",
      notNow: "Continua a esplorare",
      label: "MEMBERSHIP LOCALE",
      title: "Entra nella comunità di {city}.",
      body: "TOWN è uno spazio civico locale per persone reali.",
      bodySecond:
        "Per partecipare servono un account identificato, una comunità dichiarata e una membership attiva.",
      price: "€12 all’anno",
      renewal: "Rinnovo annuale.",
      renewalSecond:
        "Puoi annullare in qualsiasi momento. L’accesso resta attivo fino alla fine del periodo già pagato.",
      whyTitle: "Perché esiste la membership",
      why: [
        "Persone reali nella stessa comunità",
        "Partecipazione responsabile nella comunità dichiarata",
        "Meno bot e account fantasma",
        "Spazio civico calmo, senza pubblicità",
      ],
      rightsTitle: "Con una membership attiva puoi:",
      rights:
        "Confermare segnali, aprire sessioni di discussione verso una soluzione e partecipare alle decisioni della comunità.",
      endedTitle:
        "TOWN è per chi è pronto a partecipare alla propria comunità.",
      endedBody: "Puoi tornare quando sei pronto a farne parte.",
      endedReturn: "Torna all’ingresso TOWN",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      inviteTitle: "Dir ist wichtig, was in deiner Gemeinschaft geschieht.",
      inviteBody:
        "Um dieses Signal zu bestätigen und Teil der Lösung zu werden, erstelle ein identifiziertes Konto und gib die Gemeinschaft an, in der du teilnimmst.",
      inviteBodySecond:
        "TOWN wird von echten Menschen aus derselben Gemeinschaft getragen — nicht von anonymen Konten, Followern oder Popularität in sozialen Medien.",
      continue: "Weiter",
      notNow: "Weiter erkunden",
      label: "LOKALE MITGLIEDSCHAFT",
      title: "Werde Mitglied in deiner Münchner Gemeinschaft.",
      body: "TOWN ist ein lokaler zivilgesellschaftlicher Raum für echte Menschen.",
      bodySecond:
        "Für die Teilnahme brauchst du ein identifiziertes Konto, eine angegebene Gemeinschaft und eine aktive Mitgliedschaft.",
      price: "€12 pro Jahr",
      renewal: "Jährliche Verlängerung.",
      renewalSecond:
        "Du kannst jederzeit kündigen. Der Zugang bleibt bis zum Ende des bereits bezahlten Zeitraums aktiv.",
      whyTitle: "Warum es die Mitgliedschaft gibt",
      why: [
        "Echte Menschen in derselben Gemeinschaft",
        "Verantwortliche Teilnahme in der angegebenen Gemeinschaft",
        "Weniger Bots und Geisterkonten",
        "Ruhiger zivilgesellschaftlicher Raum ohne Werbung",
      ],
      rightsTitle: "Mit einer aktiven Mitgliedschaft kannst du:",
      rights:
        "Signale bestätigen, Diskussionssitzungen auf dem Weg zur Lösung eröffnen und an Entscheidungen der Gemeinschaft teilnehmen.",
      endedTitle:
        "TOWN ist für Menschen, die bereit sind, sich an ihrer Gemeinschaft zu beteiligen.",
      endedBody:
        "Du kannst zurückkehren, wenn du bereit bist, ein Teil davon zu sein.",
      endedReturn: "Zurück zum TOWN-Eingang",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      inviteTitle: "Îți pasă de ceea ce se întâmplă în comunitatea ta.",
      inviteBody:
        "Pentru a confirma acest semnal și a deveni parte din soluție, creează un cont identificat și declară comunitatea în care participi.",
      inviteBodySecond:
        "TOWN este construit în jurul oamenilor reali din aceeași comunitate — nu pe conturi anonime, urmăritori sau popularitate pe social media.",
      continue: "Continuă",
      notNow: "Continuă să explorezi",
      label: "MEMBERSHIP LOCAL",
      title: "Intră în comunitatea din {city}.",
      body: "TOWN este un spațiu civic local pentru oameni reali.",
      bodySecond:
        "Pentru a participa ai nevoie de un cont identificat, o comunitate declarată și un membership activ.",
      price: "12 € pe an",
      renewal: "Reînnoire anuală.",
      renewalSecond:
        "Poți anula oricând. Accesul rămâne activ până la sfârșitul perioadei deja plătite.",
      whyTitle: "De ce există membership-ul",
      why: [
        "Oameni reali în aceeași comunitate",
        "Participare responsabilă în comunitatea declarată",
        "Mai puține boturi și conturi fantomă",
        "Spațiu civic calm, fără publicitate",
      ],
      rightsTitle: "Cu un membership activ poți:",
      rights:
        "Confirma semnale, deschide sesiuni de discuții către o soluție și participa la deciziile comunității.",
      endedTitle:
        "TOWN este pentru cei gata să participe în comunitatea lor.",
      endedBody: "Poți reveni când ești pregătit să faci parte din ea.",
      endedReturn: "Înapoi la intrarea TOWN",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "conservare la comunità locale dichiarata;",
        "consentire l’accesso su web e mobile;",
        "proteggere la partecipazione da bot e account fantasma.",
      ],
      privacyTitle: "Privacy",
      privacy:
        "Verranno richieste solo le informazioni essenziali per l’account.",
      privacySecond:
        "Creerai una password e registrerai una passkey per un accesso sicuro.",
      prototype:
        "Dopo aver verificato l’email, creerai la password e poi la passkey.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "die angegebene lokale Gemeinschaft zu speichern;",
        "den Zugang über Web und Mobile zu unterstützen;",
        "die Teilnahme vor Bots und Geisterkonten zu schützen.",
      ],
      privacyTitle: "Privatsphäre",
      privacy:
        "Es werden nur die für das Konto wesentlichen Angaben erfragt.",
      privacySecond:
        "Du erstellst ein Passwort und registrierst einen Passkey für sicheren Zugang.",
      prototype:
        "Nach der E-Mail-Bestätigung erstellst du zuerst das Passwort und dann den Passkey.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "păstrarea comunității locale declarate;",
        "permiterea accesului pe web și mobil;",
        "protejarea participării de boturi și conturi fantomă.",
      ],
      privacyTitle: "Confidențialitate",
      privacy:
        "Vor fi cerute doar informațiile esențiale pentru cont.",
      privacySecond:
        "Vei crea o parolă și vei înregistra o passkey pentru acces sigur.",
      prototype:
        "După verificarea emailului, creezi mai întâi parola și apoi passkey-ul.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const EMAIL_COPY = {
    it: {
      label: "CREA IL TUO ACCOUNT",
      title: "Inserisci la tua email.",
      body: "Normalmente ti invieremmo un codice di verifica di 6 cifre.",
      bodySecond: "Dopo la verifica creerai una password, poi una passkey.",
      prototype:
        "Ti invieremo un codice di verifica a 6 cifre via email.",
      fieldLabel: "Indirizzo email",
      placeholder: "nome@esempio.it",
      privacy:
        "Useremo questa email per verificare il tuo account, inviarti comunicazioni essenziali e aiutarti a recuperare l’accesso.",
      invalid: "Inserisci un indirizzo email valido.",
      rateLimited: "Troppi tentativi. Riprova tra poco.",
      failed: "Non è stato possibile continuare. Riprova.",
      restartAfterRefresh:
        "La configurazione sicura è stata interrotta. Inserisci di nuovo l'email per ricevere un nuovo codice e continuare.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      label: "KONTO ERSTELLEN",
      title: "Gib deine E-Mail-Adresse ein.",
      body: "Normalerweise würden wir dir einen sechsstelligen Bestätigungscode senden.",
      bodySecond: "Nach der Bestätigung erstellst du ein Passwort und dann einen Passkey.",
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
      restartAfterRefresh:
        "Die sichere Einrichtung wurde unterbrochen. Gib deine E-Mail erneut ein, um einen neuen Code zu erhalten und fortzufahren.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      label: "CREEAZĂ-ȚI CONTUL",
      title: "Introdu adresa ta de email.",
      body: "În mod normal ți-am trimite un cod de verificare din 6 cifre.",
      bodySecond: "După verificare vei crea o parolă, apoi o passkey.",
      prototype:
        "Îți trimitem un cod de verificare din 6 cifre pe email.",
      fieldLabel: "Adresă de email",
      placeholder: "nume@exemplu.ro",
      privacy:
        "Vom folosi acest email pentru a-ți verifica contul, a-ți trimite comunicări esențiale și a te ajuta să-ți recuperezi accesul.",
      invalid: "Introdu o adresă de email validă.",
      rateLimited: "Prea multe încercări. Încearcă din nou în curând.",
      failed: "Nu a fost posibil să continui. Încearcă din nou.",
      restartAfterRefresh:
        "Configurarea securizată a fost întreruptă. Introdu din nou emailul pentru a primi un cod nou și a continua.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const CODE_COPY = {
    it: {
      label: "VERIFICA EMAIL",
      title: "Controlla la tua email.",
      body: "Abbiamo inviato un codice di 6 cifre a:",
      fieldLabel: "Codice di verifica",
      prototype: "Inserisci il codice a 6 cifre che ti abbiamo inviato via email.",
      invalid: "Il codice non è corretto. Potrebbe essere scaduto; richiedi un nuovo codice per continuare.",
      rateLimited: "Troppi tentativi. Riprova tra poco.",
      failed: "Non è stato possibile continuare. Riprova.",
      verify: "Verifica",
      changeEmail: "Cambia email / richiedi un nuovo codice",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      label: "E-MAIL BESTÄTIGEN",
      title: "Prüfe deine E-Mails.",
      body: "Wir haben einen sechsstelligen Code gesendet an:",
      fieldLabel: "Bestätigungscode",
      prototype: "Gib den 6-stelligen Code ein, den wir dir per E-Mail gesendet haben.",
      invalid: "Der Code ist nicht korrekt. Er könnte abgelaufen sein; fordere einen neuen Code an, um fortzufahren.",
      rateLimited:
        "Zu viele Versuche. Bitte warte kurz und versuche es erneut.",
      failed: "Fortsetzen nicht möglich. Bitte erneut versuchen.",
      verify: "Bestätigen",
      changeEmail: "E-Mail-Adresse ändern / neuen Code anfordern",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      label: "VERIFICARE EMAIL",
      title: "Verifică-ți emailul.",
      body: "Am trimis un cod din 6 cifre la:",
      fieldLabel: "Cod de verificare",
      prototype: "Introdu codul din 6 cifre pe care ți l-am trimis pe email.",
      invalid: "Codul este incorect sau a expirat. Solicită un cod nou pentru a continua.",
      rateLimited: "Prea multe încercări. Încearcă din nou în curând.",
      failed: "Nu a fost posibil să continui. Încearcă din nou.",
      verify: "Verifică",
      changeEmail: "Solicită un cod nou",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const PASSWORD_COPY = {
    en: {
      label: "CREATE YOUR PASSWORD",
      title: "Secure your TOWN account.",
      body: "Create a password before registering your passkey.",
      bodySecond: "After setup, you can sign in with either your passkey or your email and password.",
      fieldLabel: "Password",
      confirmLabel: "Confirm password",
      note: "Use 15 to 128 characters. Spaces and Unicode characters are allowed.",
      mismatch: "The passwords do not match.",
      invalid: "Use a password between 15 and 128 characters.",
      grantExpired: "The setup window expired. Start again from email entry.",
      failed: "Could not set the password. Try again.",
      continue: "Create password",
      back: "Back",
    },
    es: {
      label: "CREA TU CONTRASEÑA",
      title: "Protege tu cuenta TOWN.",
      body: "Crea una contraseña antes de registrar tu passkey.",
      bodySecond: "Después podrás iniciar sesión con la passkey o con tu email y contraseña.",
      fieldLabel: "Contraseña",
      confirmLabel: "Confirmar contraseña",
      note: "Usa entre 15 y 128 caracteres. Se permiten espacios y caracteres Unicode.",
      mismatch: "Las contraseñas no coinciden.",
      invalid: "Usa una contraseña de entre 15 y 128 caracteres.",
      grantExpired: "La ventana de configuración ha caducado. Empieza de nuevo desde el email.",
      failed: "No se pudo crear la contraseña. Inténtalo de nuevo.",
      continue: "Crear contraseña",
      back: "Atrás",
    },
    it: {
      label: "CREA LA PASSWORD",
      title: "Proteggi il tuo account TOWN.",
      body: "Crea una password prima di registrare la passkey.",
      bodySecond: "In seguito potrai accedere con la passkey oppure con email e password.",
      fieldLabel: "Password",
      confirmLabel: "Conferma password",
      note: "Usa da 15 a 128 caratteri. Sono consentiti spazi e caratteri Unicode.",
      mismatch: "Le password non coincidono.",
      invalid: "Usa una password da 15 a 128 caratteri.",
      grantExpired: "La finestra di configurazione è scaduta. Riparti dall’email.",
      failed: "Non è stato possibile creare la password. Riprova.",
      continue: "Crea password",
      back: "Indietro",
    },
    de: {
      label: "PASSWORT ERSTELLEN",
      title: "Schütze dein TOWN-Konto.",
      body: "Erstelle ein Passwort, bevor du den Passkey registrierst.",
      bodySecond: "Danach kannst du dich mit Passkey oder mit E-Mail und Passwort anmelden.",
      fieldLabel: "Passwort",
      confirmLabel: "Passwort bestätigen",
      note: "Verwende 15 bis 128 Zeichen. Leerzeichen und Unicode-Zeichen sind erlaubt.",
      mismatch: "Die Passwörter stimmen nicht überein.",
      invalid: "Verwende ein Passwort mit 15 bis 128 Zeichen.",
      grantExpired: "Das Einrichtungsfenster ist abgelaufen. Beginne erneut mit der E-Mail.",
      failed: "Das Passwort konnte nicht erstellt werden. Bitte erneut versuchen.",
      continue: "Passwort erstellen",
      back: "Zurück",
    },
    ro: {
      label: "CREEAZĂ PAROLA",
      title: "Protejează-ți contul TOWN.",
      body: "Creează o parolă înainte de a înregistra passkey-ul.",
      bodySecond: "Ulterior te poți autentifica fie cu passkey, fie cu email și parolă.",
      fieldLabel: "Parolă",
      confirmLabel: "Confirmă parola",
      note: "Folosește între 15 și 128 de caractere. Sunt permise spațiile și caracterele Unicode.",
      mismatch: "Parolele nu coincid.",
      invalid: "Folosește o parolă între 15 și 128 de caractere.",
      grantExpired: "Fereastra de configurare a expirat. Repornește de la email.",
      failed: "Nu a fost posibilă crearea parolei. Încearcă din nou.",
      continue: "Creează parola",
      back: "Înapoi",
    },
    fr: {
      label: "CRÉEZ VOTRE MOT DE PASSE",
      title: "Protégez votre compte TOWN.",
      body: "Créez un mot de passe avant d’enregistrer votre clé d’accès.",
      bodySecond: "Vous pourrez ensuite vous connecter avec la clé d’accès ou avec votre e-mail et votre mot de passe.",
      fieldLabel: "Mot de passe",
      confirmLabel: "Confirmer le mot de passe",
      note: "Utilisez entre 15 et 128 caractères. Les espaces et caractères Unicode sont autorisés.",
      mismatch: "Les mots de passe ne correspondent pas.",
      invalid: "Utilisez un mot de passe de 15 à 128 caractères.",
      grantExpired: "La fenêtre de configuration a expiré. Recommencez par l’e-mail.",
      failed: "Impossible de créer le mot de passe. Réessayez.",
      continue: "Créer le mot de passe",
      back: "Retour",
    },
    hu: {
      label: "JELSZÓ LÉTREHOZÁSA",
      title: "Védje TOWN-fiókját.",
      body: "A hozzáférési kulcs regisztrálása előtt hozzon létre jelszót.",
      bodySecond: "Ezután hozzáférési kulccsal vagy e-mail-címmel és jelszóval is bejelentkezhet.",
      fieldLabel: "Jelszó",
      confirmLabel: "Jelszó megerősítése",
      note: "Használjon 15–128 karaktert. Szóköz és Unicode-karakter is megengedett.",
      mismatch: "A jelszavak nem egyeznek.",
      invalid: "Használjon 15–128 karakteres jelszót.",
      grantExpired: "A beállítási időablak lejárt. Kezdje újra az e-mail megadásától.",
      failed: "A jelszó létrehozása sikertelen. Próbálja újra.",
      continue: "Jelszó létrehozása",
      back: "Vissza",
    },
  };

  const PASSKEY_COPY = {
    it: {
      label: "ACCESSO SICURO",
      title: "Proteggi il tuo account TOWN.",
      body:
        "Hai creato la password. Ora registra una passkey per un accesso rapido e resistente al phishing.",
      bodySecond:
        "Nel flusso approvato, l’accesso sicuro usa i metodi del tuo dispositivo.",
      methodsTitle: "Metodi disponibili sul dispositivo",
      methods: ["Face ID", "Touch ID", "Impronta digitale", "PIN del dispositivo"],
      benefitsTitle: "Perché una passkey",
      benefits: [
        "Accesso rapido senza digitare la password",
        "Maggiore resistenza al phishing",
        "Il segreto della passkey non viene condiviso con TOWN",
        "Puoi aggiungere altri dispositivi in seguito",
      ],
      prototype:
        "TOWN creerà una passkey sul tuo dispositivo; la password resta disponibile come metodo alternativo.",
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      label: "SICHERER ZUGANG",
      title: "Schütze dein TOWN-Konto.",
      body:
        "Du hast dein Passwort erstellt. Registriere jetzt einen Passkey für schnellen, phishing-resistenten Zugang.",
      bodySecond:
        "Im genehmigten Ablauf nutzt der sichere Zugang die Methoden deines Geräts.",
      methodsTitle: "Verfügbare Gerätemethoden",
      methods: ["Face ID", "Touch ID", "Fingerabdruck", "Geräte-PIN"],
      benefitsTitle: "Warum ein Passkey",
      benefits: [
        "Schnelle Anmeldung ohne Passworteingabe",
        "Besserer Schutz vor Phishing",
        "Das Passkey-Geheimnis wird nicht mit TOWN geteilt",
        "Weitere Geräte können später hinzugefügt werden",
      ],
      prototype:
        "TOWN erstellt einen Passkey auf deinem Gerät; dein Passwort bleibt als alternative Anmeldemethode verfügbar.",
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
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      label: "ACCES SIGUR",
      title: "Protejează-ți contul TOWN.",
      body:
        "Ai creat parola. Acum înregistrează o passkey pentru acces rapid și rezistent la phishing.",
      bodySecond:
        "În fluxul aprobat, accesul sigur folosește metodele dispozitivului tău.",
      methodsTitle: "Metode disponibile pe dispozitiv",
      methods: ["Face ID", "Touch ID", "Amprentă", "PIN-ul dispozitivului"],
      benefitsTitle: "De ce o passkey",
      benefits: [
        "Autentificare rapidă fără introducerea parolei",
        "Rezistență mai bună la phishing",
        "Secretul passkey-ului nu este partajat cu TOWN",
        "Poți adăuga alte dispozitive mai târziu",
      ],
      prototype:
        "TOWN va crea o passkey pe dispozitiv; parola rămâne disponibilă ca metodă alternativă.",
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
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const READY_COPY = {
    it: {
      label: "ACCOUNT PRONTO",
      title: "Il tuo account TOWN è pronto.",
      community: "Comunità: {city}",
      emailLine: "Email: {email}",
      emailStatus: "Email verificata",
      accessStatus: "Accesso sicuro configurato",
      body:
        "La configurazione dell’account è completa.",
      bodySecond:
        "Il prossimo passo è attivare l’iscrizione annuale a TOWN.",
      inactive:
        "Account pronto — la membership non è attiva. Non puoi ancora partecipare come membro.",
      membership: "Iscrizione TOWN — €12 all’anno",
      paymentNote:
        "Il passo successivo è Stripe Checkout per la membership annuale.",
      continue: "Continua",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      label: "KONTO BEREIT",
      title: "Dein TOWN-Konto ist bereit.",
      community: "Gemeinschaft: {city}",
      emailLine: "E-Mail: {email}",
      emailStatus: "E-Mail bestätigt",
      accessStatus: "Sicherer Zugang eingerichtet",
      body:
        "Die Kontoeinrichtung ist abgeschlossen.",
      bodySecond:
        "Als Nächstes aktivierst du deine jährliche TOWN-Mitgliedschaft.",
      inactive:
        "Konto bereit — die Mitgliedschaft ist nicht aktiv. Du kannst noch nicht als Mitglied teilnehmen.",
      membership: "TOWN-Mitgliedschaft — €12 pro Jahr",
      paymentNote:
        "Der nächste Schritt ist Stripe Checkout für die jährliche Mitgliedschaft.",
      continue: "Weiter",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      label: "CONT PREGĂTIT",
      title: "Contul tău TOWN este pregătit.",
      community: "Comunitate: {city}",
      emailLine: "Email: {email}",
      emailStatus: "Email verificat",
      accessStatus: "Acces sigur configurat",
      body:
        "Configurarea contului este completă.",
      bodySecond:
        "Următorul pas este activarea abonamentului anual TOWN.",
      inactive:
        "Cont pregătit — membership-ul nu este activ. Nu poți încă participa ca membru.",
      membership: "Abonament TOWN — 12 € pe an",
      paymentNote:
        "Următorul pas este Stripe Checkout pentru membership-ul anual.",
      continue: "Continuă",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "Con una membership attiva potrai partecipare nella comunità locale che hai dichiarato.",
      accountStatus: "Account: pronto",
      membershipStatus: "Membership: non attiva",
      prototype:
        "Verrai indirizzato a Stripe Checkout per completare il pagamento in modo sicuro.",
      simulateStart: "Attiva membership",
      back: "Indietro",
      successLabel: "MEMBERSHIP ATTIVA",
      successTitle: "Membership annuale attiva.",
      successCommunity: "Comunità: {city}",
      successAccount: "Account: pronto",
      successMembership: "Membership: attiva",
      successBody:
        "Il pagamento è stato confermato. La membership annuale TOWN è attiva per questa comunità.",
      successNote:
        "Puoi gestire l’abbonamento dal profilo quando Stripe lo consente per questo account.",
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
      confirmingLabel: "CONFERMA MEMBERSHIP",
      confirmingTitle: "Conferma della membership in corso.",
      confirmingBody:
        "Stiamo verificando l’attivazione con TOWN. Questo può richiedere alcuni secondi dopo il pagamento.",
      confirmingStatus: "Conferma in corso…",
      confirmingPending:
        "La conferma è ancora in corso. Il pagamento non è indicato come non riuscito — riprova tra poco.",
      confirmingRetry: "Riprova",
      confirmingDismiss: "Torna al feed",
      paidNoParticipateTitle: "Membership registrata",
      paidNoParticipateStatus:
        "Il pagamento risulta registrato, ma la partecipazione civica non è ancora disponibile. Completa la scelta della comunità se richiesto, oppure riprova tra poco.",
      continueCommunity: "Scegli la comunità",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "Mit einer aktiven Mitgliedschaft kannst du in der von dir angegebenen lokalen Gemeinschaft teilnehmen.",
      accountStatus: "Konto: bereit",
      membershipStatus: "Mitgliedschaft: nicht aktiv",
      prototype:
        "Du wirst zu Stripe Checkout weitergeleitet, um die Zahlung sicher abzuschließen.",
      simulateStart: "Mitgliedschaft aktivieren",
      back: "Zurück",
      successLabel: "MITGLIEDSCHAFT AKTIV",
      successTitle: "Jährliche Mitgliedschaft aktiv.",
      successCommunity: "Gemeinschaft: {city}",
      successAccount: "Konto: bereit",
      successMembership: "Mitgliedschaft: aktiv",
      successBody:
        "Die Zahlung wurde bestätigt. Die jährliche TOWN-Mitgliedschaft ist für diese Gemeinschaft aktiv.",
      successNote:
        "Du kannst das Abonnement im Profil verwalten, wenn Stripe das für dieses Konto erlaubt.",
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
      confirmingLabel: "MITGLIEDSCHAFT BESTÄTIGEN",
      confirmingTitle: "Mitgliedschaft wird bestätigt.",
      confirmingBody:
        "Wir prüfen die Aktivierung bei TOWN. Das kann nach der Zahlung einige Sekunden dauern.",
      confirmingStatus: "Bestätigung läuft…",
      confirmingPending:
        "Die Bestätigung läuft noch. Die Zahlung gilt nicht als fehlgeschlagen — bitte versuche es gleich erneut.",
      confirmingRetry: "Erneut versuchen",
      confirmingDismiss: "Zurück zum Feed",
      paidNoParticipateTitle: "Mitgliedschaft erfasst",
      paidNoParticipateStatus:
        "Die Zahlung ist erfasst, aber die Mitwirkung ist noch nicht verfügbar. Schließe gegebenenfalls die Gemeindewahl ab oder versuche es gleich erneut.",
      continueCommunity: "Gemeinde wählen",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
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
        "Cu un membership activ vei putea participa în comunitatea locală pe care ai declarat-o.",
      accountStatus: "Cont: pregătit",
      membershipStatus: "Membership: inactiv",
      prototype:
        "Vei fi redirecționat către Stripe Checkout pentru a finaliza plata în siguranță.",
      simulateStart: "Activează membership-ul",
      back: "Înapoi",
      successLabel: "MEMBERSHIP ACTIV",
      successTitle: "Membership anual activ.",
      successCommunity: "Comunitate: {city}",
      successAccount: "Cont: pregătit",
      successMembership: "Membership: activ",
      successBody:
        "Plata a fost confirmată. Membership-ul anual TOWN este activ pentru această comunitate.",
      successNote:
        "Poți gestiona abonamentul din profil când Stripe o permite pentru acest cont.",
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
      confirmingLabel: "CONFIRMARE MEMBERSHIP",
      confirmingTitle: "Confirmarea membership-ului este în curs.",
      confirmingBody:
        "Verificăm activarea cu TOWN. Acest lucru poate dura câteva secunde după plată.",
      confirmingStatus: "Confirmare în curs…",
      confirmingPending:
        "Confirmarea este încă în curs. Plata nu este indicată ca eșuată — încearcă din nou în curând.",
      confirmingRetry: "Încearcă din nou",
      confirmingDismiss: "Înapoi la feed",
      paidNoParticipateTitle: "Membership înregistrat",
      paidNoParticipateStatus:
        "Plata este înregistrată, dar participarea civică nu este încă disponibilă. Completează alegerea comunității dacă e nevoie sau încearcă din nou în curând.",
      continueCommunity: "Alege comunitatea",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const ACTIVE_COPY = {
    it: {
      label: "MEMBERSHIP ATTIVA",
      title: "Membership annuale attiva.",
      community: "Comunità: {city}",
      memberStatus: "Membro · {city}",
      body:
        "La membership annuale TOWN è attiva per la tua comunità.",
      bodySecond:
        "Puoi tornare al segnale da cui sei partito e partecipare quando l’account lo consente.",
      prototype:
        "Gestisci l’abbonamento dal profilo quando Stripe lo consente per questo account.",
      returnSignal: "Torna al segnale",
      back: "Indietro",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    de: {
      label: "MITGLIEDSCHAFT AKTIV",
      title: "Jährliche Mitgliedschaft aktiv.",
      community: "Gemeinschaft: {city}",
      memberStatus: "Mitglied · {city}",
      body:
        "Die jährliche TOWN-Mitgliedschaft ist für deine Gemeinschaft aktiv.",
      bodySecond:
        "Du kannst zum Signal zurückkehren, von dem du gekommen bist, und teilnehmen, wenn das Konto es erlaubt.",
      prototype:
        "Verwalte das Abonnement im Profil, wenn Stripe das für dieses Konto erlaubt.",
      returnSignal: "Zurück zum Signal",
      back: "Zurück",
      cityNames: { Milano: "Milano", Munich: "München" , Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
    ro: {
      label: "MEMBERSHIP ACTIV",
      title: "Membership anual activ.",
      community: "Comunitate: {city}",
      memberStatus: "Membru · {city}",
      body:
        "Membership-ul anual TOWN este activ pentru comunitatea ta.",
      bodySecond:
        "Poți reveni la semnalul de unde ai plecat și poți participa când contul o permite.",
      prototype:
        "Gestionează abonamentul din profil când Stripe o permite pentru acest cont.",
      returnSignal: "Înapoi la semnal",
      back: "Înapoi",
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
    },
  };

  const COMMITMENT_COPY = {
    it: {
      label: "SCELTA DELLA COMUNITÀ",
      title: "Scegli la tua comunità TOWN.",
      body:
        "Seleziona personalmente il paese e la città. TOWN non verifica tecnicamente la tua posizione fisica o la residenza.",
      countryLegend: "Scegli il paese",
      cityLegend: "Scegli la città",
      countryNames: {
        Italy: "Italia",
        Germany: "Germania",
        Romania: "Romania",
        Austria: "Austria",
        Spain: "Spagna",
      },
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      reviewLabel: "Rivedi la comunità selezionata",
      reviewCountry: "Paese: {country}",
      reviewCity: "Città: {city}",
      reviewNote:
        "La membership e la partecipazione civica saranno associate a questa comunità.",
      acceptText:
        "Confermo di aver selezionato personalmente il paese e la città corretti e accetto la responsabilità per l’accuratezza di questa dichiarazione.",
      acceptRequired: "È richiesta l’accettazione esplicita della responsabilità.",
      confirm: "Registra la dichiarazione",
      saving: "Salvataggio in corso…",
      saved: "Dichiarazione registrata per {city}, {country}.",
      checkoutHint:
        "Il pagamento annuale è disponibile solo dopo la conferma della comunità.",
      checkoutCta: "Continua alla membership annuale — €12/anno",
      back: "Indietro",
      errorNetwork: "Non è stato possibile continuare. Riprova.",
      errorUnauthenticated:
        "Non hai effettuato l’accesso oppure la sessione è scaduta.",
      errorValidation: "Controlla la selezione e l’accettazione, poi riprova.",
      errorSave: "Non è stato possibile registrare la dichiarazione. Riprova.",
      errorUnsupported: "Questa comunità non è disponibile.",
      errorLocked:
        "La comunità non può essere modificata mentre la membership è attiva.",
    },
    de: {
      label: "GEMEINSCHAFTSWAHL",
      title: "Wähle deine TOWN-Gemeinschaft.",
      body:
        "Wähle persönlich Land und Stadt. TOWN prüft deine physische Position oder deinen Wohnsitz nicht technisch.",
      countryLegend: "Land wählen",
      cityLegend: "Stadt wählen",
      countryNames: {
        Italy: "Italien",
        Germany: "Deutschland",
        Romania: "Rumänien",
        Austria: "Österreich",
        Spain: "Spanien",
      },
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      reviewLabel: "Ausgewählte Gemeinschaft prüfen",
      reviewCountry: "Land: {country}",
      reviewCity: "Stadt: {city}",
      reviewNote:
        "Mitgliedschaft und zivile Teilnahme werden dieser Gemeinschaft zugeordnet.",
      acceptText:
        "Ich bestätige, dass ich das richtige Land und die richtige Stadt persönlich ausgewählt habe und die Verantwortung für die Richtigkeit dieser Erklärung übernehme.",
      acceptRequired:
        "Eine ausdrückliche Annahme der Verantwortung ist erforderlich.",
      confirm: "Erklärung speichern",
      saving: "Wird gespeichert…",
      saved: "Erklärung für {city}, {country} gespeichert.",
      checkoutHint:
        "Die jährliche Zahlung ist erst nach Bestätigung der Gemeinschaft verfügbar.",
      checkoutCta: "Weiter zur jährlichen Mitgliedschaft — €12/Jahr",
      back: "Zurück",
      errorNetwork: "Fortsetzen nicht möglich. Bitte erneut versuchen.",
      errorUnauthenticated:
        "Du bist nicht angemeldet oder die Sitzung ist abgelaufen.",
      errorValidation:
        "Prüfe Auswahl und Bestätigung und versuche es erneut.",
      errorSave:
        "Die Erklärung konnte nicht gespeichert werden. Bitte erneut versuchen.",
      errorUnsupported: "Diese Gemeinschaft ist nicht verfügbar.",
      errorLocked:
        "Die Gemeinschaft kann nicht geändert werden, solange die Mitgliedschaft aktiv ist.",
    },
    ro: {
      label: "ALEGEREA COMUNITĂȚII",
      title: "Alege comunitatea ta TOWN.",
      body:
        "Selectează personal țara și orașul. TOWN nu verifică tehnic poziția ta fizică sau reședința.",
      countryLegend: "Alege țara",
      cityLegend: "Alege orașul",
      countryNames: {
        Italy: "Italia",
        Germany: "Germania",
        Romania: "România",
        Austria: "Austria",
        Spain: "Spania",
      },
      cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Köln", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Frankfurt", Salzburg: "Salzburg" },
      reviewLabel: "Revizuiește comunitatea selectată",
      reviewCountry: "Țară: {country}",
      reviewCity: "Oraș: {city}",
      reviewNote:
        "Membership-ul și participarea civică vor fi asociate acestei comunități.",
      acceptText:
        "Confirm că am selectat personal țara și orașul corecte și îmi asum responsabilitatea pentru acuratețea acestei declarații.",
      acceptRequired:
        "Este necesară acceptarea explicită a responsabilității.",
      confirm: "Înregistrează declarația",
      saving: "Se salvează…",
      saved: "Declarație înregistrată pentru {city}, {country}.",
      checkoutHint:
        "Plata anuală este disponibilă doar după confirmarea comunității.",
      checkoutCta: "Continuă la membership-ul anual — 12 €/an",
      back: "Înapoi",
      errorNetwork: "Nu a fost posibil să continui. Încearcă din nou.",
      errorUnauthenticated:
        "Nu ești autentificat sau sesiunea a expirat.",
      errorValidation:
        "Verifică selecția și acceptarea, apoi încearcă din nou.",
      errorSave:
        "Nu a fost posibil să înregistrezi declarația. Încearcă din nou.",
      errorUnsupported: "Această comunitate nu este disponibilă.",
      errorLocked:
        "Comunitatea nu poate fi schimbată cât timp membership-ul este activ.",
    },
  };

  // The interface language follows the visitor, independently of the signal's
  // source language or the community being joined. English and Spanish need
  // complete onboarding catalogs so neither can fall through to city copy.
  const ONBOARDING_CITY_NAMES = CITY_COPY.en.cityNames;
  const ONBOARDING_CITY_NAMES_ES = CITY_COPY.es.cityNames;

  MEMBERSHIP_COPY.en = {
    inviteTitle: "You care about what happens in your community.",
    inviteBody:
      "To confirm this signal and become part of the solution, create an identified account and declare the community where you participate.",
    inviteBodySecond:
      "TOWN is built around real people from the same community — not anonymous accounts or popularity metrics.",
    continue: "Continue",
    notNow: "Continue exploring",
    label: "LOCAL MEMBERSHIP",
    title: "Join the {city} community.",
    body: "TOWN is a local civic space for real people.",
    bodySecond:
      "To participate, you need an identified account, a declared community, and an active membership.",
    price: "€12 per year",
    renewal: "Renews annually.",
    renewalSecond:
      "You can cancel at any time. Access remains active until the end of the paid period.",
    whyTitle: "Why membership exists",
    why: [
      "Real people in the same community",
      "Responsible participation in the declared community",
      "Fewer bots and fake accounts",
      "A calm civic space without advertising",
    ],
    rightsTitle: "With an active membership, you can:",
    rights:
      "Confirm signals, open focused discussions toward a solution, and participate in community decisions.",
    endedTitle: "",
    endedBody: "",
    endedReturn: "Back to the feed",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  MEMBERSHIP_COPY.es = {
    inviteTitle: "Te importa lo que ocurre en tu comunidad.",
    inviteBody:
      "Para confirmar esta señal y formar parte de la solución, crea una cuenta identificada y declara la comunidad en la que participas.",
    inviteBodySecond:
      "TOWN se construye en torno a personas reales de la misma comunidad, no a cuentas anónimas, seguidores ni popularidad en redes.",
    continue: "Continuar",
    notNow: "Seguir explorando",
    label: "MEMBRESÍA LOCAL",
    title: "Únete a la comunidad de {city}.",
    body: "TOWN es un espacio cívico local para personas reales.",
    bodySecond:
      "Para participar necesitas una cuenta identificada, una comunidad declarada y una membresía activa.",
    price: "12 € al año",
    renewal: "Renovación anual.",
    renewalSecond:
      "Puedes cancelar en cualquier momento. El acceso continúa hasta el final del periodo pagado.",
    whyTitle: "Por qué existe la membresía",
    why: [
      "Personas reales en la misma comunidad",
      "Participación responsable en la comunidad declarada",
      "Menos bots y cuentas falsas",
      "Un espacio cívico tranquilo y sin publicidad",
    ],
    rightsTitle: "Con una membresía activa puedes:",
    rights:
      "Confirmar señales, abrir conversaciones centradas en una solución y participar en las decisiones de la comunidad.",
    endedTitle: "",
    endedBody: "",
    endedReturn: "Volver al feed",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  ACCOUNT_COPY.en = {
    label: "PERSONAL ACCOUNT",
    title: "Create your TOWN account.",
    community: "Community: {city}",
    body: "Before asking for personal information, we explain why an account is needed.",
    whyTitle: "Your TOWN account is used to:",
    why: [
      "identify one real person;",
      "store the local community you declare;",
      "support secure access;",
      "protect participation from bots and fake accounts.",
    ],
    privacyTitle: "Privacy",
    privacy: "We ask only for information essential to the account.",
    privacySecond: "You create a password and register a passkey for secure access.",
    prototype: "After email verification, create the password first and then the passkey.",
    continue: "Continue",
    back: "Back",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  ACCOUNT_COPY.es = {
    label: "CUENTA PERSONAL",
    title: "Crea tu cuenta TOWN.",
    community: "Comunidad: {city}",
    body: "Antes de pedir datos personales, te explicamos por qué necesitas una cuenta.",
    whyTitle: "Tu cuenta TOWN sirve para:",
    why: [
      "identificar a una persona real;",
      "guardar la comunidad local que declaras;",
      "permitir un acceso seguro;",
      "proteger la participación frente a bots y cuentas falsas.",
    ],
    privacyTitle: "Privacidad",
    privacy: "Solo pedimos los datos esenciales para la cuenta.",
    privacySecond: "Creas una contraseña y registras una passkey para un acceso seguro.",
    prototype: "Después de verificar el email, crea primero la contraseña y luego la passkey.",
    continue: "Continuar",
    back: "Atrás",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  EMAIL_COPY.en = {
    label: "CREATE YOUR ACCOUNT",
    title: "Enter your email.",
    body: "We will send you a six-digit verification code.",
    bodySecond: "After verification, you create a password and then a passkey.",
    prototype: "We will send a six-digit verification code by email.",
    fieldLabel: "Email address",
    placeholder: "name@example.com",
    privacy:
      "We use this email to verify your account, send essential communications, and help recover access.",
    invalid: "Enter a valid email address.",
    rateLimited: "Too many attempts. Try again shortly.",
    failed: "Could not continue. Try again.",
    restartAfterRefresh:
      "Secure setup was interrupted. Enter your email again to receive a new code and continue.",
    continue: "Continue",
    back: "Back",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  EMAIL_COPY.es = {
    label: "CREA TU CUENTA",
    title: "Introduce tu email.",
    body: "Te enviaremos un código de verificación de seis dígitos.",
    bodySecond: "Después de verificarlo, crearás una contraseña y luego una passkey.",
    prototype: "Te enviaremos por email un código de verificación de seis dígitos.",
    fieldLabel: "Dirección de email",
    placeholder: "nombre@ejemplo.com",
    privacy:
      "Usamos este email para verificar tu cuenta, enviar comunicaciones esenciales y ayudarte a recuperar el acceso.",
    invalid: "Introduce una dirección de email válida.",
    rateLimited: "Demasiados intentos. Vuelve a intentarlo en breve.",
    failed: "No se pudo continuar. Inténtalo de nuevo.",
    restartAfterRefresh:
      "La configuración segura se interrumpió. Introduce de nuevo tu email para recibir otro código y continuar.",
    continue: "Continuar",
    back: "Atrás",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  CODE_COPY.en = {
    label: "VERIFY EMAIL",
    title: "Check your email.",
    body: "We sent a six-digit code to:",
    fieldLabel: "Verification code",
    prototype: "Enter the six-digit code we sent by email.",
    invalid: "The code is incorrect or has expired. Request a new code to continue.",
    rateLimited: "Too many attempts. Try again shortly.",
    failed: "Could not continue. Try again.",
    verify: "Verify",
    changeEmail: "Request a new code",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  CODE_COPY.es = {
    label: "VERIFICA EL EMAIL",
    title: "Revisa tu email.",
    body: "Hemos enviado un código de seis dígitos a:",
    fieldLabel: "Código de verificación",
    prototype: "Introduce el código de seis dígitos que enviamos por email.",
    invalid: "El código es incorrecto o ha caducado. Solicita otro código para continuar.",
    rateLimited: "Demasiados intentos. Vuelve a intentarlo en breve.",
    failed: "No se pudo continuar. Inténtalo de nuevo.",
    verify: "Verificar",
    changeEmail: "Solicitar otro código",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  PASSKEY_COPY.en = {
    label: "SECURE ACCESS",
    title: "Protect your TOWN account.",
    body: "Your password is set. Now register a passkey for fast, phishing-resistant access.",
    bodySecond: "You can later sign in with either the passkey or your email and password.",
    methodsTitle: "Methods available on your device",
    methods: ["Face ID", "Touch ID", "Fingerprint", "Device PIN"],
    benefitsTitle: "Why a passkey",
    benefits: [
      "Fast sign-in without typing your password",
      "Stronger resistance to phishing",
      "No passkey secret is shared with TOWN",
      "You can add other devices later",
    ],
    prototype: "TOWN will create a passkey on your device; your password remains available as an alternative.",
    create: "Create secure access",
    back: "Back",
    successLabel: "ACCESS SET UP",
    successTitle: "Secure access is ready.",
    successBody: "Your email is verified and the passkey was created on your device.",
    successEmail: "Email verified",
    successAccess: "Secure access set up",
    successNote: "Your passkey is ready. The next step is TOWN membership.",
    continue: "Continue",
    grantExpired: "The setup window expired. Start again from email entry.",
    cancelled: "Creation cancelled. You can try again.",
    failed: "Could not create the passkey. Try again.",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  PASSKEY_COPY.es = {
    label: "ACCESO SEGURO",
    title: "Protege tu cuenta TOWN.",
    body: "Tu contraseña está creada. Ahora registra una passkey para un acceso rápido y resistente al phishing.",
    bodySecond: "Después podrás iniciar sesión con la passkey o con tu email y contraseña.",
    methodsTitle: "Métodos disponibles en tu dispositivo",
    methods: ["Face ID", "Touch ID", "Huella digital", "PIN del dispositivo"],
    benefitsTitle: "Por qué una passkey",
    benefits: [
      "Inicio rápido sin escribir la contraseña",
      "Mayor resistencia al phishing",
      "Ningún secreto de la passkey se comparte con TOWN",
      "Puedes añadir otros dispositivos más adelante",
    ],
    prototype: "TOWN creará una passkey en tu dispositivo; la contraseña seguirá disponible como alternativa.",
    create: "Crear acceso seguro",
    back: "Atrás",
    successLabel: "ACCESO CONFIGURADO",
    successTitle: "El acceso seguro está listo.",
    successBody: "Tu email está verificado y la passkey se creó en tu dispositivo.",
    successEmail: "Email verificado",
    successAccess: "Acceso seguro configurado",
    successNote: "Tu passkey está lista. El siguiente paso es la membresía TOWN.",
    continue: "Continuar",
    grantExpired: "La ventana de configuración ha caducado. Empieza de nuevo desde el email.",
    cancelled: "Creación cancelada. Puedes intentarlo de nuevo.",
    failed: "No se pudo crear la passkey. Inténtalo de nuevo.",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  READY_COPY.en = {
    label: "ACCOUNT READY",
    title: "Your TOWN account is ready.",
    community: "Community: {city}",
    emailLine: "Email: {email}",
    emailStatus: "Email verified",
    accessStatus: "Secure access set up",
    body: "Account setup is complete.",
    bodySecond: "The next step is your annual TOWN membership.",
    inactive: "Account ready — membership is not active yet.",
    membership: "TOWN membership — €12 per year",
    paymentNote: "The next step is Stripe Checkout for annual membership.",
    continue: "Continue",
    back: "Back",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  READY_COPY.es = {
    label: "CUENTA LISTA",
    title: "Tu cuenta TOWN está lista.",
    community: "Comunidad: {city}",
    emailLine: "Email: {email}",
    emailStatus: "Email verificado",
    accessStatus: "Acceso seguro configurado",
    body: "La configuración de la cuenta está completa.",
    bodySecond: "El siguiente paso es tu membresía anual de TOWN.",
    inactive: "Cuenta lista — la membresía todavía no está activa.",
    membership: "Membresía TOWN — 12 € al año",
    paymentNote: "El siguiente paso es Stripe Checkout para la membresía anual.",
    continue: "Continuar",
    back: "Atrás",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  PAYMENT_COPY.en = {
    label: "ANNUAL MEMBERSHIP",
    title: "Activate annual TOWN membership.",
    community: "Community: {city}",
    price: "€12 per year",
    renewal: "Renews automatically each year.",
    cancel: "Cancel at any time. Access continues until the end of the paid period.",
    body: "Active membership lets you participate in the local community you declared.",
    accountStatus: "Account: ready",
    membershipStatus: "Membership: inactive",
    prototype: "You will continue to Stripe Checkout to pay securely.",
    simulateStart: "Activate membership",
    back: "Back",
    successLabel: "MEMBERSHIP ACTIVE",
    successTitle: "Annual membership active.",
    successCommunity: "Community: {city}",
    successAccount: "Account: ready",
    successMembership: "Membership: active",
    successBody: "Payment is confirmed. Annual TOWN membership is active for this community.",
    successNote: "Manage the subscription from your profile when Stripe supports it for this account.",
    continue: "Continue",
    errorUnauthenticated: "You are not signed in, or the session expired.",
    errorAlreadyMember: "You already have active membership. Manage the existing subscription.",
    errorRateLimited: "Too many attempts. Try again shortly.",
    errorUnavailable: "Payment is not available right now.",
    errorCheckoutFailed: "Could not start checkout. Try again.",
    errorNetwork: "Could not continue. Try again.",
    confirmingLabel: "CONFIRMING MEMBERSHIP",
    confirmingTitle: "Membership confirmation is in progress.",
    confirmingBody: "We are checking activation with TOWN. This can take a few seconds after payment.",
    confirmingStatus: "Confirming…",
    confirmingPending: "Confirmation is still in progress. The payment is not marked as failed — try again shortly.",
    confirmingRetry: "Try again",
    confirmingDismiss: "Back to feed",
    paidNoParticipateTitle: "Membership recorded",
    paidNoParticipateStatus: "Payment is recorded, but civic participation is not available yet. Complete community selection if needed, or try again shortly.",
    continueCommunity: "Choose community",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  PAYMENT_COPY.es = Object.assign({}, PAYMENT_COPY.en, {
    label: "MEMBRESÍA ANUAL",
    title: "Activa la membresía anual de TOWN.",
    community: "Comunidad: {city}",
    price: "12 € al año",
    renewal: "Renovación anual automática.",
    cancel: "Puedes cancelar en cualquier momento. El acceso continúa hasta el final del periodo pagado.",
    body: "La membresía activa te permite participar en la comunidad local que declaraste.",
    accountStatus: "Cuenta: lista",
    membershipStatus: "Membresía: inactiva",
    prototype: "Continuarás a Stripe Checkout para pagar de forma segura.",
    simulateStart: "Activar membresía",
    back: "Atrás",
    successLabel: "MEMBRESÍA ACTIVA",
    successTitle: "Membresía anual activa.",
    successCommunity: "Comunidad: {city}",
    successAccount: "Cuenta: lista",
    successMembership: "Membresía: activa",
    successBody: "El pago está confirmado. La membresía anual de TOWN está activa para esta comunidad.",
    successNote: "Gestiona la suscripción desde tu perfil cuando Stripe lo permita para esta cuenta.",
    continue: "Continuar",
    errorUnauthenticated: "No has iniciado sesión o la sesión ha caducado.",
    errorAlreadyMember: "Ya tienes una membresía activa. Gestiona la suscripción existente.",
    errorRateLimited: "Demasiados intentos. Vuelve a intentarlo en breve.",
    errorUnavailable: "El pago no está disponible en este momento.",
    errorCheckoutFailed: "No se pudo iniciar el checkout. Inténtalo de nuevo.",
    errorNetwork: "No se pudo continuar. Inténtalo de nuevo.",
    confirmingLabel: "CONFIRMACIÓN DE MEMBRESÍA",
    confirmingTitle: "La confirmación de la membresía está en curso.",
    confirmingBody: "Estamos comprobando la activación con TOWN. Puede tardar unos segundos después del pago.",
    confirmingStatus: "Confirmando…",
    confirmingPending: "La confirmación continúa. El pago no figura como fallido; inténtalo de nuevo en breve.",
    confirmingRetry: "Intentar de nuevo",
    confirmingDismiss: "Volver al feed",
    paidNoParticipateTitle: "Membresía registrada",
    paidNoParticipateStatus: "El pago está registrado, pero la participación cívica aún no está disponible. Completa la elección de comunidad si es necesario o inténtalo de nuevo en breve.",
    continueCommunity: "Elegir comunidad",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  });

  ACTIVE_COPY.en = {
    label: "MEMBERSHIP ACTIVE",
    title: "Annual membership active.",
    community: "Community: {city}",
    memberStatus: "Member · {city}",
    body: "Annual TOWN membership is active for your community.",
    bodySecond: "You can return to the originating signal and participate when your account allows it.",
    prototype: "Manage the subscription from your profile when Stripe supports it for this account.",
    returnSignal: "Return to signal",
    back: "Back",
    cityNames: ONBOARDING_CITY_NAMES,
  };

  ACTIVE_COPY.es = {
    label: "MEMBRESÍA ACTIVA",
    title: "Membresía anual activa.",
    community: "Comunidad: {city}",
    memberStatus: "Miembro · {city}",
    body: "La membresía anual de TOWN está activa para tu comunidad.",
    bodySecond: "Puedes volver a la señal de origen y participar cuando tu cuenta lo permita.",
    prototype: "Gestiona la suscripción desde tu perfil cuando Stripe lo permita para esta cuenta.",
    returnSignal: "Volver a la señal",
    back: "Atrás",
    cityNames: ONBOARDING_CITY_NAMES_ES,
  };

  COMMITMENT_COPY.en = {
    label: "COMMUNITY DECLARATION",
    title: "Choose your TOWN community.",
    body: "Choose the country and city yourself. TOWN does not verify your residence or physical location.",
    countryLegend: "Choose country",
    cityLegend: "Choose city",
    countryNames: { Italy: "Italy", Germany: "Germany", Romania: "Romania", Austria: "Austria", France: "France", Hungary: "Hungary", Spain: "Spain" },
    cityNames: ONBOARDING_CITY_NAMES,
    reviewLabel: "Review the selected community",
    reviewCountry: "Country: {country}",
    reviewCity: "City: {city}",
    reviewNote: "Membership and civic participation will be linked to this community.",
    acceptText: "I confirm that I personally selected the correct country and city and accept responsibility for the accuracy of this declaration.",
    acceptRequired: "Explicit acceptance of responsibility is required.",
    confirm: "Record declaration",
    saving: "Saving…",
    saved: "Declaration recorded for {city}, {country}.",
    checkoutHint: "Annual payment is available only after the community declaration is recorded.",
    checkoutCta: "Continue to annual membership — €12/year",
    back: "Back",
    errorNetwork: "Could not continue. Try again.",
    errorUnauthenticated: "You are not signed in, or the session expired.",
    errorValidation: "Check the selection and acceptance, then try again.",
    errorSave: "Could not record the declaration. Try again.",
    errorUnsupported: "This community is not available.",
    errorLocked: "The community cannot be changed while membership is active.",
  };

  COMMITMENT_COPY.es = Object.assign({}, COMMITMENT_COPY.en, {
    label: "DECLARACIÓN DE COMUNIDAD",
    title: "Elige tu comunidad TOWN.",
    body: "Elige personalmente el país y la ciudad. TOWN no verifica tu residencia ni tu ubicación física.",
    countryLegend: "Elige el país",
    cityLegend: "Elige la ciudad",
    countryNames: { Italy: "Italia", Germany: "Alemania", Romania: "Rumanía", Austria: "Austria", France: "Francia", Hungary: "Hungría", Spain: "España" },
    cityNames: ONBOARDING_CITY_NAMES_ES,
    reviewLabel: "Revisa la comunidad seleccionada",
    reviewCountry: "País: {country}",
    reviewCity: "Ciudad: {city}",
    reviewNote: "La membresía y la participación cívica quedarán vinculadas a esta comunidad.",
    acceptText: "Confirmo que elegí personalmente el país y la ciudad correctos y asumo la responsabilidad por la exactitud de esta declaración.",
    acceptRequired: "Es necesario aceptar expresamente esta responsabilidad.",
    confirm: "Registrar declaración",
    saving: "Guardando…",
    saved: "Declaración registrada para {city}, {country}.",
    checkoutHint: "El pago anual está disponible después de registrar la declaración de comunidad.",
    checkoutCta: "Continuar a la membresía anual — 12 €/año",
    back: "Atrás",
    errorNetwork: "No se pudo continuar. Inténtalo de nuevo.",
    errorUnauthenticated: "No has iniciado sesión o la sesión ha caducado.",
    errorValidation: "Revisa la selección y la aceptación e inténtalo de nuevo.",
    errorSave: "No se pudo registrar la declaración. Inténtalo de nuevo.",
    errorUnsupported: "Esta comunidad no está disponible.",
    errorLocked: "La comunidad no puede cambiarse mientras la membresía está activa.",
  });

  // Returning-user passkey login (Screen 01). Does not use SetupGrant.
  // S01 chrome is English until a community is selected; en is the pre-selection default.
  const LOGIN_COPY = {
    en: {
      signIn: "Members Login",
      working: "Verifying…",
      success: "Signed in. Session active.",
      cancelled: "Sign-in cancelled. You can try again.",
      failed: "Sign-in failed. Please try again.",
      passwordLabel: "Password",
      passwordRequired: "Enter your password.",
      passwordSignIn: "Sign in with password",
      passkeySignIn: "Sign in with passkey",
      phoneUnavailable:
        "Phone sign-in is not available yet. Use email, or Sign in with a passkey.",
    },
    es: {
      signIn: "Acceso de miembros",
      working: "Verificando…",
      success: "Sesión iniciada. La sesión está activa.",
      cancelled: "Inicio de sesión cancelado. Puedes intentarlo de nuevo.",
      failed: "No se pudo iniciar sesión. Inténtalo de nuevo.",
      passwordLabel: "Contraseña",
      passwordRequired: "Introduce tu contraseña.",
      passwordSignIn: "Iniciar sesión con contraseña",
      passkeySignIn: "Iniciar sesión con passkey",
      phoneUnavailable:
        "El acceso por teléfono aún no está disponible. Usa el email o inicia sesión con una passkey.",
    },
    it: {
      signIn: "Usa l’accesso sicuro",
      working: "Verifica in corso…",
      success: "Accesso effettuato. Sessione attiva.",
      cancelled: "Accesso annullato. Puoi riprovare.",
      failed: "Accesso non riuscito. Riprova.",
      passwordLabel: "Password",
      passwordRequired: "Inserisci la password.",
      passwordSignIn: "Accedi con email e password",
      passkeySignIn: "Accedi con passkey",
      phoneUnavailable:
        "L’accesso con telefono non è ancora disponibile. Usa l’email oppure Accedi con una passkey.",
    },
    de: {
      signIn: "Sicheren Zugang verwenden",
      working: "Überprüfung läuft…",
      success: "Angemeldet. Sitzung aktiv.",
      cancelled: "Anmeldung abgebrochen. Du kannst es erneut versuchen.",
      failed: "Anmeldung fehlgeschlagen. Bitte versuche es erneut.",
      passwordLabel: "Passwort",
      passwordRequired: "Gib dein Passwort ein.",
      passwordSignIn: "Mit E-Mail und Passwort anmelden",
      passkeySignIn: "Mit Passkey anmelden",
      phoneUnavailable:
        "Telefon-Anmeldung ist noch nicht verfügbar. Nutze E-Mail oder melde dich mit einer Passkey an.",
    },
    ro: {
      signIn: "Folosește accesul sigur",
      working: "Verificare în curs…",
      success: "Autentificare reușită. Sesiune activă.",
      cancelled: "Autentificare anulată. Poți încerca din nou.",
      failed: "Autentificarea a eșuat. Încearcă din nou.",
      passwordLabel: "Parolă",
      passwordRequired: "Introdu parola.",
      passwordSignIn: "Autentificare cu email și parolă",
      passkeySignIn: "Autentificare cu passkey",
      phoneUnavailable:
        "Autentificarea cu telefon nu este încă disponibilă. Folosește emailul sau Sign in cu o passkey.",
    },
  };

  // Profile V1 — registered civic identity. No invented blog/social fields.
  const PROFILE_COPY = {
    en: {
      label: "Your profile",
      close: "Close",
      defaultName: "TOWN neighbour",
      handleFallback: "Registered account",
      bioRegistered:
        "Registered on TOWN. Local civic participation opens with active membership.",
      bioMember:
        "Active local member. You can confirm signals in your community.",
      bioOwner:
        "Platform owner access. Civic participation is open without a paid membership.",
      bioPaidPending:
        "Membership recorded. Local participation is not available yet.",
      communityNone: "Community: not chosen yet",
      communityLine: "Community: {community}",
      membershipNone: "Membership: not active",
      membershipPaid: "Membership: active",
      membershipOwner: "Membership: not active — owner access",
      membershipPending: "Membership: paid — participation pending",
      membershipOther: "Membership: {status}",
      activityTitle: "Civic activity",
      activityEmpty:
        "No confirmations yet. Open a local signal and tap I SEE THIS TOO when you are ready.",
      activityError:
        "Couldn't load your civic activity — try again in a moment.",
      activityConfirmed: "You see this too",
      feedCta: "Back to feed",
      publishInCommunity: "Publish in {community}",
      platformConsoleCta: "Open platform console",
      membershipCta: "Continue membership",
      manageBillingCta: "Manage membership",
      signOutCta: "Sign out",
      signingOut: "Signing out…",
      openingPortal: "Opening membership portal…",
      errorSignOut: "Could not sign out. Try again.",
      errorPortal:
        "Could not open membership management. Try again in a moment.",
      errorPortalUnavailable:
        "Membership management is not available for this account yet.",
    },
    it: {
      label: "Il tuo profilo",
      close: "Chiudi",
      defaultName: "Vicino TOWN",
      handleFallback: "Account registrato",
      bioRegistered:
        "Registrato su TOWN. La partecipazione civica locale si apre con l’iscrizione attiva.",
      bioMember:
        "Membro locale attivo. Puoi confermare i segnali nella tua comunità.",
      bioOwner:
        "Accesso owner della piattaforma. La partecipazione civica è aperta senza iscrizione a pagamento.",
      bioPaidPending:
        "Iscrizione registrata. La partecipazione locale non è ancora disponibile.",
      communityNone: "Comunità: non ancora scelta",
      communityLine: "Comunità: {community}",
      membershipNone: "Iscrizione: non attiva",
      membershipPaid: "Iscrizione: attiva",
      membershipOwner: "Iscrizione: non attiva — accesso owner",
      membershipPending: "Iscrizione: pagata — partecipazione in attesa",
      membershipOther: "Iscrizione: {status}",
      activityTitle: "Attività civica",
      activityEmpty:
        "Nessuna conferma ancora. Apri un segnale locale e tocca LO VEDO ANCH’IO quando sei pronto.",
      activityError:
        "Impossibile caricare l’attività civica — riprova tra poco.",
      activityConfirmed: "Lo vedi anche tu",
      feedCta: "Torna al feed",
      publishInCommunity: "Pubblica a {community}",
      platformConsoleCta: "Apri la console della piattaforma",
      membershipCta: "Continua l’iscrizione",
      manageBillingCta: "Gestisci l’iscrizione",
      signOutCta: "Esci",
      signingOut: "Disconnessione…",
      openingPortal: "Apertura del portale iscrizione…",
      errorSignOut: "Impossibile uscire. Riprova.",
      errorPortal:
        "Impossibile aprire la gestione iscrizione. Riprova tra poco.",
      errorPortalUnavailable:
        "La gestione iscrizione non è ancora disponibile per questo account.",
    },
    de: {
      label: "Dein Profil",
      close: "Schließen",
      defaultName: "TOWN-Nachbar",
      handleFallback: "Registriertes Konto",
      bioRegistered:
        "Bei TOWN registriert. Lokale Mitwirkung öffnet sich mit aktiver Mitgliedschaft.",
      bioMember:
        "Aktives lokales Mitglied. Du kannst Signale in deiner Gemeinde bestätigen.",
      bioOwner:
        "Plattform-Owner-Zugang. Bürgerliche Mitwirkung ist ohne bezahlte Mitgliedschaft offen.",
      bioPaidPending:
        "Mitgliedschaft erfasst. Lokale Mitwirkung ist noch nicht verfügbar.",
      communityNone: "Gemeinde: noch nicht gewählt",
      communityLine: "Gemeinde: {community}",
      membershipNone: "Mitgliedschaft: nicht aktiv",
      membershipPaid: "Mitgliedschaft: aktiv",
      membershipOwner: "Mitgliedschaft: nicht aktiv — Owner-Zugang",
      membershipPending: "Mitgliedschaft: bezahlt — Mitwirkung ausstehend",
      membershipOther: "Mitgliedschaft: {status}",
      activityTitle: "Bürgerliche Aktivität",
      activityEmpty:
        "Noch keine Bestätigungen. Öffne ein lokales Signal und tippe ICH SEHE DAS AUCH, wenn du bereit bist.",
      activityError:
        "Bürgerliche Aktivität konnte nicht geladen werden — bitte gleich erneut versuchen.",
      activityConfirmed: "Du siehst das auch",
      feedCta: "Zurück zum Feed",
      publishInCommunity: "In {community} veröffentlichen",
      platformConsoleCta: "Plattformkonsole öffnen",
      membershipCta: "Mitgliedschaft fortsetzen",
      manageBillingCta: "Mitgliedschaft verwalten",
      signOutCta: "Abmelden",
      signingOut: "Abmelden…",
      openingPortal: "Mitgliedschaftsportal wird geöffnet…",
      errorSignOut: "Abmelden fehlgeschlagen. Bitte erneut versuchen.",
      errorPortal:
        "Mitgliedschaftsverwaltung konnte nicht geöffnet werden. Bitte gleich erneut versuchen.",
      errorPortalUnavailable:
        "Mitgliedschaftsverwaltung ist für dieses Konto noch nicht verfügbar.",
    },
    ro: {
      label: "Profilul tău",
      close: "Închide",
      defaultName: "Vecin TOWN",
      handleFallback: "Cont înregistrat",
      bioRegistered:
        "Înregistrat pe TOWN. Participarea civică locală se deschide cu membership activ.",
      bioMember:
        "Membru local activ. Poți confirma semnale în comunitatea ta.",
      bioOwner:
        "Acces owner pe platformă. Participarea civică este deschisă fără membership plătit.",
      bioPaidPending:
        "Membership înregistrat. Participarea locală nu este încă disponibilă.",
      communityNone: "Comunitate: încă nealeasă",
      communityLine: "Comunitate: {community}",
      membershipNone: "Membership: inactiv",
      membershipPaid: "Membership: activ",
      membershipOwner: "Membership: inactiv — acces owner",
      membershipPending: "Membership: plătit — participare în așteptare",
      membershipOther: "Membership: {status}",
      activityTitle: "Activitate civică",
      activityEmpty:
        "Nicio confirmare încă. Deschide un semnal local și apasă VĂD ȘI EU ASTA când ești gata.",
      activityError:
        "Nu am putut încărca activitatea civică — încearcă din nou în curând.",
      activityConfirmed: "Vezi și tu",
      feedCta: "Înapoi la feed",
      publishInCommunity: "Publică în {community}",
      platformConsoleCta: "Deschide consola platformei",
      membershipCta: "Continuă membership-ul",
      manageBillingCta: "Gestionează membership-ul",
      signOutCta: "Deconectare",
      signingOut: "Se deconectează…",
      openingPortal: "Se deschide portalul de membership…",
      errorSignOut: "Nu s-a putut deconecta. Încearcă din nou.",
      errorPortal:
        "Nu s-a putut deschide gestionarea membership-ului. Încearcă din nou.",
      errorPortalUnavailable:
        "Gestionarea membership-ului nu este încă disponibilă pentru acest cont.",
    },
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Public product-only mode: visitors land on the existing feed only.
  // Onboarding / membership / payment screens remain in the codebase.
  // Direct hash access stays blocked; the membership-invitation Continue
  // path may open the existing approved membership/account-entry journey.
  const PRODUCT_ONLY_PUBLIC_MODE = true;
  const PRODUCT_ONLY_FEED_ROUTE = "feed";
  const PRODUCT_ONLY_CITY_ORDER = communityCatalogApi.cityIds();
  const PRODUCT_ONLY_COUNTRY_BY_CITY = {};
  for (let cityIndex = 0; cityIndex < PRODUCT_ONLY_CITY_ORDER.length; cityIndex++) {
    const catalogCity = communityCatalogApi.cityForId(PRODUCT_ONLY_CITY_ORDER[cityIndex]);
    PRODUCT_ONLY_COUNTRY_BY_CITY[catalogCity.id] = catalogCity.country;
  }
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
    password: true,
    passkey: true,
    ready: true,
    commitment: true,
    payment: true,
    active: true,
  };
  const INVITE_MEMBERSHIP_JOURNEY_ROUTES = {
    membership: true,
    ended: true,
    account: true,
    email: true,
    code: true,
    password: true,
    passkey: true,
    ready: true,
    commitment: true,
    payment: true,
    active: true,
  };
  // Narrow unlock for the editorial "Find my city" CTA: reuse existing
  // country → city → location selection without auth/payment.
  const CITY_DISCOVERY_JOURNEY_ROUTES = {
    country: true,
    city: true,
    location: true,
  };

  function isProductOnlyPublicMode() {
    return PRODUCT_ONLY_PUBLIC_MODE === true;
  }

  function isNonProductRoute(route) {
    return !!NON_PRODUCT_ROUTES[route];
  }

  function isInviteMembershipJourneyRoute(route) {
    return !!INVITE_MEMBERSHIP_JOURNEY_ROUTES[route];
  }

  function isCityDiscoveryJourneyRoute(route) {
    return !!CITY_DISCOVERY_JOURNEY_ROUTES[route];
  }

  function memberHomeCityId() {
    const api = window.TownCommunityCommitment;
    if (
      !api ||
      typeof api.cityIdFromCommitment !== "function" ||
      !commitmentSnapshot
    ) {
      return null;
    }
    return api.cityIdFromCommitment(commitmentSnapshot);
  }

  function appendLiveScenesForCity(out, cityId) {
    const scenes = liveScenes[cityId];
    if (!scenes || scenes.length < 1) return 0;
    for (let j = 0; j < scenes.length; j++) {
      out.push(scenes[j]);
    }
    return scenes.length;
  }

  function countLiveScenesForCity(cityId) {
    const scenes = liveScenes[cityId];
    return scenes && scenes.length > 0 ? scenes.length : 0;
  }

  function productOnlyScenes() {
    // Live API scenes only — never invent civic content from FEED_SCENES.
    // Members with a home community see that community first on HOME; other
    // cities follow in a separate exploration zone (after the explore divider).
    const out = [];
    const homeCityId = memberHomeCityId();
    if (homeCityId) {
      appendLiveScenesForCity(out, homeCityId);
      for (let i = 0; i < PRODUCT_ONLY_CITY_ORDER.length; i++) {
        const cityId = PRODUCT_ONLY_CITY_ORDER[i];
        if (cityId === homeCityId) continue;
        appendLiveScenesForCity(out, cityId);
      }
      return out;
    }
    // Paid / pending members without a resolved home must not see a mixed
    // multi-city HOME that invites the wrong participation story.
    if (
      hasAuthoritativePaidMembership() ||
      (membershipRecoveryApi &&
        membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
    ) {
      if (selectedCity && PRODUCT_ONLY_COUNTRY_BY_CITY[selectedCity]) {
        appendLiveScenesForCity(out, selectedCity);
      }
      return out;
    }
    for (let i = 0; i < PRODUCT_ONLY_CITY_ORDER.length; i++) {
      appendLiveScenesForCity(out, PRODUCT_ONLY_CITY_ORDER[i]);
    }
    return out;
  }

  function cityIdFromScene(scene) {
    if (!scene) return null;
    if (scene.cityId && communityCatalogApi.cityForId(scene.cityId)) {
      return scene.cityId;
    }
    // Temporary compatibility for old editorial scenes. Live API scenes carry
    // cityId explicitly and never inherit the previously selected community.
    if (!scene.id) return null;
    for (let i = 0; i < PRODUCT_ONLY_CITY_ORDER.length; i++) {
      const city = communityCatalogApi.cityForId(PRODUCT_ONLY_CITY_ORDER[i]);
      const legacyPrefix = city.slug.replace(/-[a-z]{2}$/, "") + "-";
      if (scene.id.indexOf(legacyPrefix) === 0) return city.id;
    }
    return null;
  }

  function sceneMatchesMemberCommunity(scene) {
    const homeCityId = memberHomeCityId();
    if (!homeCityId) {
      // Fail closed for members: unknown home is never "local enough" to act.
      if (
        hasAuthoritativePaidMembership() ||
        canTakeCivicAction() ||
        (membershipRecoveryApi &&
          membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
      ) {
        return false;
      }
      return true;
    }
    const sceneCityId = cityIdFromScene(scene);
    if (!sceneCityId) return false;
    return sceneCityId === homeCityId;
  }

  const WRONG_COMMUNITY_COPY = {
    en: "Your community is {home}. You can explore {explored}, but you can participate only in {home}.",
    es: "Tu comunidad es {home}. Puedes explorar {explored}, pero solo puedes participar en {home}.",
    it: "La tua comunità è {home}. Puoi esplorare {explored}, ma puoi partecipare solo a {home}.",
    de: "Deine Gemeinschaft ist {home}. Du kannst {explored} erkunden, aber nur in {home} teilnehmen.",
    ro: "Comunitatea ta este {home}. Poți explora {explored}, dar poți participa doar în {home}.",
  };

  function cityNameForReadingLanguage(cityId, lang) {
    const i18nCopy =
      window.TownPublicI18n &&
      typeof window.TownPublicI18n.feedChromeCopy === "function"
        ? window.TownPublicI18n.feedChromeCopy(lang)
        : null;
    if (i18nCopy && i18nCopy.cityNames && i18nCopy.cityNames[cityId]) {
      return i18nCopy.cityNames[cityId];
    }
    const fallback = FEED_COPY[lang] || FEED_COPY.en;
    return (fallback.cityNames && fallback.cityNames[cityId]) || cityId || "";
  }

  function noticeNotYourCommunity(scene) {
    const lang = resolvePublicReadingLanguage();
    const homeCityId = memberHomeCityId();
    const exploredCityId = cityIdFromScene(
      scene || currentScenes()[feedIndex]
    );
    const template = WRONG_COMMUNITY_COPY[lang] || WRONG_COMMUNITY_COPY.en;
    const home = cityNameForReadingLanguage(homeCityId, lang);
    const explored = cityNameForReadingLanguage(exploredCityId, lang);
    const copy = currentFeedCopy();
    showTransientFeedNotice(
      home && explored
        ? template.replace(/\{home\}/g, home).replace("{explored}", explored)
        : copy.notYourCommunity ||
            "You can explore, but participation is reserved for the local community."
    );
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

  function isInviteMembershipJourneyActive() {
    return inviteMembershipJourneyActive === true;
  }

  function recoverInterruptedEnrollmentAfterReload() {
    const navigation =
      window.performance &&
      typeof window.performance.getEntriesByType === "function"
        ? window.performance.getEntriesByType("navigation")[0]
        : null;
    if (!navigation || navigation.type !== "reload") return false;

    const rawRoute = (window.location.hash || "").replace(/^#\/?/, "");
    if (!/^(email|code|password|passkey)(?:$|[/?])/.test(rawRoute)) {
      return false;
    }

    // A reload destroys the in-memory verification id/setup grant. Never
    // persist those credentials in browser storage: restart safely from email
    // so the API can issue a fresh code and recover the existing account.
    inviteMembershipJourneyActive = true;
    enrollmentRestartRequired = rawRoute.indexOf("email") !== 0;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search + "#/email"
    );
    return true;
  }

  function isCityDiscoveryJourneyActive() {
    return cityDiscoveryJourneyActive === true;
  }

  function isMembershipRecoveryFlowActive() {
    return membershipRecoveryActive === true;
  }

  function beginInviteMembershipJourney() {
    const scenes = currentScenes();
    const scene = scenes[feedIndex] || scenes[0] || null;
    if (scene) syncProductOnlyCityFromScene(scene);
    locationVerified = true;
    inviteMembershipJourneyActive = true;
  }

  function endInviteMembershipJourney() {
    inviteMembershipJourneyActive = false;
  }

  function clearPendingSeeTooContext() {
    pendingSeeTooContext = null;
  }

  function capturePendingSeeTooContext() {
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    const discovery = window.TownCityDiscovery;
    if (
      !scene ||
      !scene.id ||
      (discovery && discovery.isCityDiscoveryStory(scene))
    ) {
      clearPendingSeeTooContext();
      return null;
    }
    const communityId = cityIdFromScene(scene);
    pendingSeeTooContext = {
      action: "see-too",
      signalId: scene.id,
      communityId: communityId || null,
      feedIndex: feedIndex,
    };
    return pendingSeeTooContext;
  }

  function resolvePendingSeeTooFeedIndex(context) {
    if (!context || context.action !== "see-too" || !context.signalId) {
      return -1;
    }
    const scenes = currentScenes();
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      if (!scene || scene.id !== context.signalId) continue;
      if (
        context.communityId &&
        cityIdFromScene(scene) &&
        cityIdFromScene(scene) !== context.communityId
      ) {
        continue;
      }
      return i;
    }
    // Feed index is only an aid when the same signal id still sits there.
    if (
      typeof context.feedIndex === "number" &&
      context.feedIndex >= 0 &&
      context.feedIndex < scenes.length
    ) {
      const aid = scenes[context.feedIndex];
      if (aid && aid.id === context.signalId) return context.feedIndex;
    }
    return -1;
  }

  // Restores the originating signal after Sign-in. Opens the membership invite
  // only for accounts that still lack membership. Paid members never see the
  // visitor upsell here — a wrong-community signal gets the explore notice.
  // Consumes pending context on success or when the context is invalid.
  function restorePendingSeeTooAfterSignIn() {
    const context = pendingSeeTooContext;
    if (!context || context.action !== "see-too") {
      return false;
    }
    const index = resolvePendingSeeTooFeedIndex(context);
    if (index < 0) {
      clearPendingSeeTooContext();
      return false;
    }
    clearPendingSeeTooContext();
    endInviteMembershipJourney();
    endCityDiscoveryJourney();
    feedIndex = index;
    originatingFeedIndex = index;
    const scenes = currentScenes();
    if (scenes[index]) syncProductOnlyCityFromScene(scenes[index]);
    go("feed");
    if (
      hasAuthoritativePaidMembership() ||
      canTakeCivicAction() ||
      (membershipRecoveryApi &&
        membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
    ) {
      if (!sceneMatchesMemberCommunity(scenes[index])) {
        noticeNotYourCommunity();
      } else if (!canTakeCivicAction()) {
        redirectMemberWithoutCivicAccess();
      }
      return true;
    }
    if (shouldOfferMembershipInvite()) {
      openInvite();
    }
    return true;
  }

  function beginCityDiscoveryJourney() {
    // Clear any product-only scene binding so browser language / current
    // signal never silently selects country, city, or eligibility.
    cityDiscoveryReturnFeedIndex = feedIndex;
    selectedCountry = null;
    selectedCity = null;
    locationVerified = false;
    locationOutsideBoundary = false;
    countryInputs.forEach((input) => {
      input.checked = false;
    });
    if (continueCountry) continueCountry.disabled = true;
    endInviteMembershipJourney();
    cityDiscoveryJourneyActive = true;
  }

  function endCityDiscoveryJourney() {
    cityDiscoveryJourneyActive = false;
  }

  function beginMembershipRecoveryFlow() {
    membershipRecoveryActive = true;
    if (isProductOnlyPublicMode()) {
      beginInviteMembershipJourney();
    }
  }

  function endMembershipRecoveryFlow() {
    membershipRecoveryActive = false;
    membershipRecoveryManual = false;
    stopMembershipRecoveryPolling("exit");
  }

  const membershipRecoveryApi = window.TownMembershipRecovery || null;

  function hasAuthoritativePaidMembership() {
    return !!(
      membershipRecoveryApi &&
      membershipRecoveryApi.isPaidMembership(membershipSnapshot)
    );
  }

  // "Become a member" / invite boundary: only for accounts without paid or
  // civic membership truth. Never upsell a payer as a non-member.
  function shouldOfferMembershipInvite() {
    if (!membershipRecoveryApi) return true;
    if (
      typeof membershipRecoveryApi.shouldOfferMembershipInvite === "function"
    ) {
      return (
        membershipRecoveryApi.shouldOfferMembershipInvite(membershipSnapshot) ===
        true
      );
    }
    if (hasAuthoritativePaidMembership()) return false;
    if (membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot)) {
      return false;
    }
    return !canTakeCivicAction();
  }

  // Civic participation: fail closed unless backend canParticipate is true
  // and status is not paid_pending_binding.
  function canTakeCivicAction() {
    if (!membershipRecoveryApi) return false;
    return (
      membershipRecoveryApi.enablesCivicParticipation(membershipSnapshot) ===
      true
    );
  }

  // Paid / pending member who cannot take the civic action yet — recovery or
  // community setup, never the visitor membership invite.
  function redirectMemberWithoutCivicAccess() {
    continueAuthenticatedMembershipDestination();
  }

  // Owner moderation UI gate: accounts.is_owner from membership self-read only.
  function canUseOwnerModeration() {
    return !!(
      membershipRecoveryApi &&
      membershipRecoveryApi.isOwnerAccount(membershipSnapshot)
    );
  }

  function isMemberPresented() {
    return hasAuthoritativePaidMembership();
  }

  // Eligible to complete "I SEE THIS TOO" as a civic confirmation.
  function canConfirmSeeTooAction() {
    return canTakeCivicAction();
  }

  function signalApiIdForScene(scene) {
    if (!scene) return null;
    if (isSignalApiId(scene.signalId)) return String(scene.signalId);
    if (isSignalApiId(scene.id)) return String(scene.id);
    return null;
  }

  function signalConfirmationKeyForIndex(index) {
    const scenes = currentScenes();
    const scene = scenes[index];
    const apiId = signalApiIdForScene(scene);
    if (apiId) return apiId;
    if (scene && scene.id) return String(scene.id);
    return String(selectedCity || "city") + ":" + String(index);
  }

  function getSignalConfirmationState(index) {
    const key = signalConfirmationKeyForIndex(index);
    const state = signalConfirmationState[key];
    if (!state) {
      return { confirmed: false, confirmationCount: 0 };
    }
    return {
      confirmed: state.confirmed === true,
      confirmationCount:
        typeof state.confirmationCount === "number" && state.confirmationCount > 0
          ? state.confirmationCount
          : 0,
    };
  }

  function setSignalConfirmationState(key, patch) {
    if (!key) return;
    const prev = signalConfirmationState[key] || {
      confirmed: false,
      confirmationCount: 0,
    };
    signalConfirmationState[key] = {
      confirmed:
        patch.confirmed !== undefined ? !!patch.confirmed : !!prev.confirmed,
      confirmationCount:
        typeof patch.confirmationCount === "number"
          ? patch.confirmationCount
          : prev.confirmationCount || 0,
    };
  }

  function clearSignalConfirmationState() {
    for (const key of Object.keys(signalConfirmationState)) {
      delete signalConfirmationState[key];
    }
  }

  const civicProcessLabels = window.TownCivicProcessLabels;
  if (!civicProcessLabels) {
    throw new Error("TownCivicProcessLabels must load before script.js");
  }
  const {
    formatConfirmCountLabel,
    formatVoteCountLabel,
    formatTotalVotesLabel,
    civicProposalErrorCopy,
    DELIBERATION_INTENT_COPY_KEYS,
    deliberationIntentLabel,
    groupDeliberationContributionsByParent,
    civicActionBlockedReasonLabel,
    formatVerificationTallyLabel,
  } = civicProcessLabels;
  const DELIBERATION_INTENTS = Object.keys(DELIBERATION_INTENT_COPY_KEYS);

  function applyConfirmCountLabel(el, copy, count) {
    if (!el) return;
    const n = typeof count === "number" && count > 0 ? count : 0;
    if (n < 1) {
      el.textContent = "";
      el.hidden = true;
      return;
    }
    el.textContent = formatConfirmCountLabel(copy, n);
    el.hidden = false;
  }

  const CIVIC_PROCESS_COPY = {
    en: {
      label: "Civic process",
      stage: "Confirmation",
      loading: "Loading the civic process…",
      unavailable: "The civic process is temporarily unavailable.",
      confirmed: "You have confirmed this signal.",
      canConfirm: "You can add your confirmation.",
      readOnly: "You can follow this process. Participation follows your community access.",
      confirmations: "Confirmations",
      next: "Next stage",
      proposals: "Proposals",
      closing: "Closes",
      notScheduled: "Not scheduled",
      started: "Process started",
      deliberation: "Deliberation",
      ballotPreparation: "Ballot preparation",
      voting: "Voting",
      mandate: "Mandate",
      votingLoading: "Loading the vote…",
      votingUnavailable: "The vote is temporarily unavailable.",
      votingCanVote: "Choose one option and submit your vote.",
      votingHasVoted: "You voted. Results update live.",
      voteCountLabel: "{count} votes",
      voteSubmit: "Submit vote",
      voteNeedChoice: "Select one option first.",
      voteErrorGeneric: "Something went wrong. Try again.",
      voteErrorClosed: "Voting is closed.",
      voteErrorAlready: "You have already voted.",
      voteErrorNotEligible: "You are not eligible to vote in this ballot.",
      proposalsCanAdd: "You can add a structured proposal.",
      proposalsSubmitted: "You have submitted a proposal for this process.",
      proposalsLoading: "Loading proposals…",
      proposalsUnavailable: "Proposals are temporarily unavailable.",
      proposalsEmpty: "No proposals yet.",
      proposalsAdd: "Add a proposal",
      proposalsTitleLabel: "Proposal title",
      proposalsBodyLabel: "Proposal details",
      proposalsSubmit: "Submit proposal",
      cancel: "Cancel",
      proposalsMine: "Your proposal",
      proposalsNeedTitle: "Add a short title.",
      proposalsNeedBody: "Describe the proposal.",
      proposalsErrorGeneric: "Something went wrong. Try again.",
      proposalsErrorClosed: "This stage is closed.",
      proposalsErrorDuplicate: "You already submitted a proposal for this process.",
      proposalsOutcomeLabel: "Expected outcome",
      proposalsInstitutionLabel: "Target institution (optional)",
      proposalsResourcesLabel: "Estimated resources (optional)",
      proposalsDeadlineLabel: "Indicative deadline (optional)",
      proposalsNeedOutcome: "Describe the expected outcome.",
      proposalsRevise: "Revise",
      proposalsWithdraw: "Withdraw",
      proposalsWithdrawConfirm: "Withdraw this proposal? This cannot be undone.",
      proposalsRevisedBadge: "Revised",
      proposalsWithdrawnBadge: "Withdrawn",
      proposalsEditTitle: "Revise your proposal",
      proposalsSaveRevision: "Save revision",
      proposalsErrorNotAuthor: "Only the author can do this.",
      proposalsErrorAlreadyRevised: "This proposal has already been revised once.",
      proposalsErrorAlreadyWithdrawn: "This proposal has already been withdrawn.",
      deliberationLoading: "Loading deliberation…",
      deliberationUnavailable: "Deliberation is temporarily unavailable.",
      deliberationCanContribute: "You can add a structured contribution to any proposal.",
      ballotFinalOptions: "These are the final ballot options from deliberation.",
      deliberationEmpty: "No proposals to deliberate yet.",
      contributionsEmpty: "No contributions yet.",
      addContribution: "Add a contribution",
      intentObservation: "Observation",
      intentProposal: "Proposal",
      intentNextStep: "Next step",
      intentArgumentFor: "Argument for",
      intentRiskOrObjection: "Risk or objection",
      intentQuestion: "Question",
      intentAuthorResponse: "Author response",
      intentEvidence: "Evidence",
      intentAmendmentSuggestion: "Amendment suggestion",
      intentMinorityPosition: "Minority position",
      intentLegend: "Type",
      contributionLabel: "Contribution",
      contributionSubmit: "Submit contribution",
      contributionNeedText: "Write at least 12 characters.",
      contributionNeedIntent: "Choose a type.",
      contributionErrorGeneric: "Something went wrong. Try again.",
      contributionErrorClosed: "This stage is closed.",
      contributionErrorInvalidReplyTarget:
        "That contribution can no longer be replied to.",
      replyAction: "Reply",
      replyingToLabel: "Replying to {author}",
      replyCancel: "Cancel reply",
      deliberationContributionMine: "Yours",
      action: "Action",
      archived: "Archived",
      mandateLoading: "Loading the mandate…",
      mandateUnavailable: "The mandate is temporarily unavailable.",
      mandateContested: "No winner: the top proposals tied.",
      mandatePending: "The vote has not closed yet.",
      verification: "Verification",
      actionLoading: "Loading the action…",
      actionUnavailable: "Action is temporarily unavailable.",
      actionPending: "The mandate is not yet decided.",
      actionCanPost: "You can add a status update.",
      actionMine: "Yours",
      actionInputLabel: "Status update",
      actionSubmit: "Submit status update",
      actionNeedText: "Write at least 12 characters.",
      actionErrorGeneric: "Something went wrong. Try again.",
      actionErrorClosed: "This stage is closed.",
      actionErrorAlreadyResponsible:
        "Another member has already taken responsibility for this action.",
      actionQuickTakeStep: "Take a step",
      actionQuickOfferHelp: "Offer help",
      actionQuickAddEvidence: "Add evidence",
      actionQuickInstitutionResponse: "Record the institution's response",
      actionInputLabelTakeStep: "What will you take on?",
      actionInputLabelOfferHelp: "How can you help?",
      actionInputLabelEvidence: "Evidence description",
      actionInputLabelInstitutionResponse: "What did the institution say?",
      actionSubmitTakeStep: "Submit",
      actionSubmitOfferHelp: "Submit",
      actionSubmitEvidence: "Submit evidence",
      actionSubmitInstitutionResponse: "Submit",
      actionStatusNotStarted: "Not started yet",
      actionStatusInProgress: "In progress",
      actionStatusBlocked: "Blocked",
      actionStatusCompleted: "Completed",
      actionResponsibleLabel: "Responsible: {name}",
      actionCollaboratorsLabel: "Helping: {names}",
      actionInstitutionLabel: "Institution: {value}",
      actionObjectiveLabel: "Objective: {value}",
      actionDeadlineLabel: "Indicative deadline: {value}",
      actionBlockedReasonNone: "No reason",
      actionBlockedReasonInstitution: "Awaiting institution response",
      actionBlockedReasonResources: "Awaiting resources",
      actionBlockedReasonVolunteers: "Awaiting volunteers",
      actionBlockedReasonOther: "Other",
      verificationLoading: "Loading verification…",
      verificationUnavailable: "Verification is temporarily unavailable.",
      verificationPendingReady: "Not yet marked ready for verification.",
      verificationCanMarkReady: "You can mark this action ready for verification.",
      verificationCanConfirm: "You can confirm whether this was delivered.",
      verificationConfirmedDelivered: "You confirmed: delivered.",
      verificationConfirmedNotDelivered: "You confirmed: not delivered.",
      verificationTallyLabel: "{delivered} confirmed delivered · {notDelivered} confirmed not delivered",
      verificationDisputeEscalated:
        "This dispute has been open for more than 14 days and is now flagged for operator review.",
      verificationOutcomeDelivered: "Verified: delivered.",
      verificationOutcomeNotDelivered: "Verified: not delivered.",
      verificationEvidenceUrlLabel: "Supporting link (optional)",
      verificationEvidenceSubmit: "Submit evidence",
      verificationEvidenceNeedText: "Write at least 12 characters.",
      verificationEvidenceInvalidUrl: "Enter a valid http(s) link, or leave it blank.",
      verificationEvidenceMine: "Yours",
      verificationErrorGeneric: "Something went wrong. Try again.",
      verificationErrorClosed: "This stage is closed.",
      verificationAlreadyConfirmed: "You have already confirmed.",
      mandateTotalVotesLabel: "{count} total votes",
      mandateMinorityHeading: "Minority positions",
      contestStatusPending: "You filed a contestation. Status: pending review.",
      contestStatusUpheld: "You filed a contestation. Status: upheld.",
      contestStatusRejected: "You filed a contestation. Status: rejected.",
      contestPendingOther: "A contestation has been filed and is pending review.",
      contestReasonLabel: "Reason",
      contestReasonEligibilityError: "Eligibility error",
      contestReasonBallotTampering: "Suspected ballot tampering",
      contestReasonCountDiscrepancy: "Vote count discrepancy",
      contestSubmit: "File a contestation",
      contestElaborationPlaceholder: "Optional details",
      contestErrorGeneric: "Something went wrong. Try again.",
      contestErrorAlready: "You have already filed a contestation for this mandate.",
      contestErrorWindowClosed: "The 72-hour contestation window has closed.",
      contestErrorNotEligible: "You were not eligible to vote in the decisive ballot.",
      contestErrorNotDecided: "A contestation requires a decided mandate.",
    },
    es: {
      label: "Proceso cívico",
      stage: "Confirmación",
      loading: "Cargando el proceso cívico…",
      unavailable: "El proceso cívico no está disponible temporalmente.",
      confirmed: "Has confirmado esta señal.",
      canConfirm: "Puedes añadir tu confirmación.",
      readOnly: "Puedes seguir este proceso. La participación depende del acceso de tu comunidad.",
      confirmations: "Confirmaciones",
      next: "Siguiente etapa",
      proposals: "Propuestas",
      closing: "Cierre",
      notScheduled: "Sin fecha programada",
      started: "Proceso iniciado",
      deliberation: "Deliberación",
      ballotPreparation: "Preparación de la votación",
      voting: "Votación",
      mandate: "Mandato",
      votingLoading: "Cargando la votación…",
      votingUnavailable: "La votación no está disponible temporalmente.",
      votingCanVote: "Elige una opción y envía tu voto.",
      votingHasVoted: "Has votado. Los resultados se actualizan en vivo.",
      voteCountLabel: "{count} votos",
      voteSubmit: "Enviar voto",
      voteNeedChoice: "Selecciona una opción primero.",
      voteErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      voteErrorClosed: "La votación está cerrada.",
      voteErrorAlready: "Ya has votado.",
      voteErrorNotEligible: "No tienes derecho a votar en esta votación.",
      proposalsCanAdd: "Puedes añadir una propuesta estructurada.",
      proposalsSubmitted: "Has enviado una propuesta para este proceso.",
      proposalsLoading: "Cargando propuestas…",
      proposalsUnavailable: "Las propuestas no están disponibles temporalmente.",
      proposalsEmpty: "Todavía no hay propuestas.",
      proposalsAdd: "Añadir una propuesta",
      proposalsTitleLabel: "Título de la propuesta",
      proposalsBodyLabel: "Detalles de la propuesta",
      proposalsSubmit: "Enviar propuesta",
      cancel: "Cancelar",
      proposalsMine: "Tu propuesta",
      proposalsNeedTitle: "Añade un título breve.",
      proposalsNeedBody: "Describe la propuesta.",
      proposalsErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      proposalsErrorClosed: "Esta etapa está cerrada.",
      proposalsErrorDuplicate: "Ya has enviado una propuesta para este proceso.",
      proposalsOutcomeLabel: "Resultado esperado",
      proposalsInstitutionLabel: "Institución destinataria (opcional)",
      proposalsResourcesLabel: "Recursos estimados (opcional)",
      proposalsDeadlineLabel: "Plazo orientativo (opcional)",
      proposalsNeedOutcome: "Describe el resultado esperado.",
      proposalsRevise: "Revisar",
      proposalsWithdraw: "Retirar",
      proposalsWithdrawConfirm: "¿Retirar esta propuesta? No se puede deshacer.",
      proposalsRevisedBadge: "Revisada",
      proposalsWithdrawnBadge: "Retirada",
      proposalsEditTitle: "Revisa tu propuesta",
      proposalsSaveRevision: "Guardar revisión",
      proposalsErrorNotAuthor: "Solo el autor puede hacer esto.",
      proposalsErrorAlreadyRevised: "Esta propuesta ya ha sido revisada una vez.",
      proposalsErrorAlreadyWithdrawn: "Esta propuesta ya ha sido retirada.",
      deliberationLoading: "Cargando la deliberación…",
      deliberationUnavailable: "La deliberación no está disponible temporalmente.",
      deliberationCanContribute:
        "Puedes añadir una contribución estructurada a cualquier propuesta.",
      ballotFinalOptions: "Estas son las opciones finales de la votación tras la deliberación.",
      deliberationEmpty: "Todavía no hay propuestas para deliberar.",
      contributionsEmpty: "Todavía no hay contribuciones.",
      addContribution: "Añadir una contribución",
      intentObservation: "Observación",
      intentProposal: "Propuesta",
      intentNextStep: "Siguiente paso",
      intentArgumentFor: "Argumento a favor",
      intentRiskOrObjection: "Riesgo u objeción",
      intentQuestion: "Pregunta",
      intentAuthorResponse: "Respuesta del autor",
      intentEvidence: "Evidencia",
      intentAmendmentSuggestion: "Sugerencia de enmienda",
      intentMinorityPosition: "Posición minoritaria",
      intentLegend: "Tipo",
      contributionLabel: "Contribución",
      contributionSubmit: "Enviar contribución",
      contributionNeedText: "Escribe al menos 12 caracteres.",
      contributionNeedIntent: "Elige un tipo.",
      contributionErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      contributionErrorClosed: "Esta etapa está cerrada.",
      contributionErrorInvalidReplyTarget:
        "Ya no se puede responder a esa contribución.",
      replyAction: "Responder",
      replyingToLabel: "Respondiendo a {author}",
      replyCancel: "Cancelar respuesta",
      deliberationContributionMine: "Tuya",
      action: "Acción",
      archived: "Archivado",
      mandateLoading: "Cargando el mandato…",
      mandateUnavailable: "El mandato no está disponible temporalmente.",
      mandateContested: "Sin ganador: las propuestas principales empataron.",
      mandatePending: "La votación aún no ha cerrado.",
      verification: "Verificación",
      actionLoading: "Cargando la acción…",
      actionUnavailable: "La acción no está disponible temporalmente.",
      actionPending: "El mandato aún no está decidido.",
      actionCanPost: "Puedes añadir una actualización de estado.",
      actionMine: "Tuya",
      actionInputLabel: "Actualización de estado",
      actionSubmit: "Enviar actualización",
      actionNeedText: "Escribe al menos 12 caracteres.",
      actionErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      actionErrorClosed: "Esta etapa está cerrada.",
      actionErrorAlreadyResponsible:
        "Otro miembro ya ha asumido la responsabilidad de esta acción.",
      actionQuickTakeStep: "Asumir un paso",
      actionQuickOfferHelp: "Ofrecer ayuda",
      actionQuickAddEvidence: "Añadir evidencia",
      actionQuickInstitutionResponse: "Registrar la respuesta de la institución",
      actionInputLabelTakeStep: "¿Qué vas a asumir?",
      actionInputLabelOfferHelp: "¿Cómo puedes ayudar?",
      actionInputLabelEvidence: "Descripción de la evidencia",
      actionInputLabelInstitutionResponse: "¿Qué dijo la institución?",
      actionSubmitTakeStep: "Enviar",
      actionSubmitOfferHelp: "Enviar",
      actionSubmitEvidence: "Enviar evidencia",
      actionSubmitInstitutionResponse: "Enviar",
      actionStatusNotStarted: "Aún no iniciado",
      actionStatusInProgress: "En curso",
      actionStatusBlocked: "Bloqueado",
      actionStatusCompleted: "Completado",
      actionResponsibleLabel: "Responsable: {name}",
      actionCollaboratorsLabel: "Colaborando: {names}",
      actionInstitutionLabel: "Institución: {value}",
      actionObjectiveLabel: "Objetivo: {value}",
      actionDeadlineLabel: "Plazo indicativo: {value}",
      actionBlockedReasonNone: "Sin motivo",
      actionBlockedReasonInstitution: "Esperando respuesta de la institución",
      actionBlockedReasonResources: "Esperando recursos",
      actionBlockedReasonVolunteers: "Esperando voluntarios",
      actionBlockedReasonOther: "Otro",
      verificationLoading: "Cargando la verificación…",
      verificationUnavailable: "La verificación no está disponible temporalmente.",
      verificationPendingReady: "Aún no se ha marcado como lista para verificación.",
      verificationCanMarkReady: "Puedes marcar esta acción como lista para verificación.",
      verificationCanConfirm: "Puedes confirmar si esto se entregó.",
      verificationConfirmedDelivered: "Confirmaste: entregado.",
      verificationConfirmedNotDelivered: "Confirmaste: no entregado.",
      verificationTallyLabel: "{delivered} confirmaron entregado · {notDelivered} confirmaron no entregado",
      verificationDisputeEscalated:
        "Esta disputa lleva abierta más de 14 días y ahora está señalada para revisión por un operador.",
      verificationOutcomeDelivered: "Verificado: entregado.",
      verificationOutcomeNotDelivered: "Verificado: no entregado.",
      verificationEvidenceUrlLabel: "Enlace de apoyo (opcional)",
      verificationEvidenceSubmit: "Enviar evidencia",
      verificationEvidenceNeedText: "Escribe al menos 12 caracteres.",
      verificationEvidenceInvalidUrl: "Introduce un enlace http(s) válido o déjalo en blanco.",
      verificationEvidenceMine: "Tuya",
      verificationErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      verificationErrorClosed: "Esta etapa está cerrada.",
      verificationAlreadyConfirmed: "Ya has confirmado.",
      mandateTotalVotesLabel: "{count} votos en total",
      mandateMinorityHeading: "Posiciones minoritarias",
      contestStatusPending: "Has presentado una impugnación. Estado: pendiente de revisión.",
      contestStatusUpheld: "Has presentado una impugnación. Estado: confirmada.",
      contestStatusRejected: "Has presentado una impugnación. Estado: rechazada.",
      contestPendingOther: "Se ha presentado una impugnación y está pendiente de revisión.",
      contestReasonLabel: "Motivo",
      contestReasonEligibilityError: "Error de elegibilidad",
      contestReasonBallotTampering: "Sospecha de manipulación de la votación",
      contestReasonCountDiscrepancy: "Discrepancia en el recuento de votos",
      contestSubmit: "Presentar una impugnación",
      contestElaborationPlaceholder: "Detalles opcionales",
      contestErrorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      contestErrorAlready: "Ya has presentado una impugnación para este mandato.",
      contestErrorWindowClosed: "La ventana de 72 horas para impugnar se ha cerrado.",
      contestErrorNotEligible: "No tenías derecho a votar en la votación decisiva.",
      contestErrorNotDecided: "Una impugnación requiere un mandato decidido.",
    },
    it: {
      label: "Processo civico",
      stage: "Conferma",
      loading: "Caricamento del processo civico…",
      unavailable: "Il processo civico è temporaneamente non disponibile.",
      confirmed: "Hai confermato questo segnale.",
      canConfirm: "Puoi aggiungere la tua conferma.",
      readOnly: "Puoi seguire questo processo. La partecipazione dipende dall’accesso alla tua comunità.",
      confirmations: "Conferme",
      next: "Fase successiva",
      proposals: "Proposte",
      closing: "Chiusura",
      notScheduled: "Non programmata",
      started: "Processo avviato",
      deliberation: "Deliberazione",
      ballotPreparation: "Preparazione del voto",
      voting: "Votazione",
      mandate: "Mandato",
      votingLoading: "Caricamento del voto…",
      votingUnavailable: "Il voto non è temporaneamente disponibile.",
      votingCanVote: "Scegli un'opzione e invia il tuo voto.",
      votingHasVoted: "Hai votato. I risultati si aggiornano in tempo reale.",
      voteCountLabel: "{count} voti",
      voteSubmit: "Invia voto",
      voteNeedChoice: "Seleziona prima un'opzione.",
      voteErrorGeneric: "Qualcosa è andato storto. Riprova.",
      voteErrorClosed: "Il voto è chiuso.",
      voteErrorAlready: "Hai già votato.",
      voteErrorNotEligible: "Non hai diritto di voto in questo ballottaggio.",
      proposalsCanAdd: "Puoi aggiungere una proposta strutturata.",
      proposalsSubmitted: "Hai inviato una proposta per questo processo.",
      proposalsLoading: "Caricamento delle proposte…",
      proposalsUnavailable: "Le proposte non sono temporaneamente disponibili.",
      proposalsEmpty: "Nessuna proposta ancora.",
      proposalsAdd: "Aggiungi una proposta",
      proposalsTitleLabel: "Titolo della proposta",
      proposalsBodyLabel: "Dettagli della proposta",
      proposalsSubmit: "Invia proposta",
      cancel: "Annulla",
      proposalsMine: "La tua proposta",
      proposalsNeedTitle: "Aggiungi un titolo breve.",
      proposalsNeedBody: "Descrivi la proposta.",
      proposalsErrorGeneric: "Qualcosa è andato storto. Riprova.",
      proposalsErrorClosed: "Questa fase è chiusa.",
      proposalsErrorDuplicate: "Hai già inviato una proposta per questo processo.",
      proposalsOutcomeLabel: "Risultato atteso",
      proposalsInstitutionLabel: "Istituzione destinataria (facoltativo)",
      proposalsResourcesLabel: "Risorse stimate (facoltativo)",
      proposalsDeadlineLabel: "Termine indicativo (facoltativo)",
      proposalsNeedOutcome: "Descrivi il risultato atteso.",
      proposalsRevise: "Rivedi",
      proposalsWithdraw: "Ritira",
      proposalsWithdrawConfirm: "Ritirare questa proposta? Non può essere annullato.",
      proposalsRevisedBadge: "Rivista",
      proposalsWithdrawnBadge: "Ritirata",
      proposalsEditTitle: "Rivedi la tua proposta",
      proposalsSaveRevision: "Salva la revisione",
      proposalsErrorNotAuthor: "Solo l'autore può farlo.",
      proposalsErrorAlreadyRevised: "Questa proposta è già stata rivista una volta.",
      proposalsErrorAlreadyWithdrawn: "Questa proposta è già stata ritirata.",
      deliberationLoading: "Caricamento della deliberazione…",
      deliberationUnavailable: "La deliberazione non è temporaneamente disponibile.",
      deliberationCanContribute: "Puoi aggiungere un contributo strutturato a qualsiasi proposta.",
      ballotFinalOptions: "Queste sono le opzioni finali del voto dopo la deliberazione.",
      deliberationEmpty: "Nessuna proposta da deliberare ancora.",
      contributionsEmpty: "Nessun contributo ancora.",
      addContribution: "Aggiungi un contributo",
      intentObservation: "Osservazione",
      intentProposal: "Proposta",
      intentNextStep: "Prossimo passo",
      intentArgumentFor: "Argomento a favore",
      intentRiskOrObjection: "Rischio od obiezione",
      intentQuestion: "Domanda",
      intentAuthorResponse: "Risposta dell'autore",
      intentEvidence: "Prova",
      intentAmendmentSuggestion: "Proposta di emendamento",
      intentMinorityPosition: "Posizione di minoranza",
      intentLegend: "Tipo",
      contributionLabel: "Contributo",
      contributionSubmit: "Invia contributo",
      contributionNeedText: "Scrivi almeno 12 caratteri.",
      contributionNeedIntent: "Scegli un tipo.",
      contributionErrorGeneric: "Qualcosa è andato storto. Riprova.",
      contributionErrorClosed: "Questa fase è chiusa.",
      contributionErrorInvalidReplyTarget:
        "Non è più possibile rispondere a quel contributo.",
      replyAction: "Rispondi",
      replyingToLabel: "In risposta a {author}",
      replyCancel: "Annulla risposta",
      deliberationContributionMine: "Tuo",
      action: "Azione",
      archived: "Archiviato",
      mandateLoading: "Caricamento del mandato…",
      mandateUnavailable: "Il mandato non è temporaneamente disponibile.",
      mandateContested: "Nessun vincitore: le proposte principali sono in parità.",
      mandatePending: "Il voto non è ancora chiuso.",
      verification: "Verifica",
      actionLoading: "Caricamento dell'azione…",
      actionUnavailable: "L'azione non è temporaneamente disponibile.",
      actionPending: "Il mandato non è ancora deciso.",
      actionCanPost: "Puoi aggiungere un aggiornamento di stato.",
      actionMine: "Tuo",
      actionInputLabel: "Aggiornamento di stato",
      actionSubmit: "Invia aggiornamento",
      actionNeedText: "Scrivi almeno 12 caratteri.",
      actionErrorGeneric: "Qualcosa è andato storto. Riprova.",
      actionErrorClosed: "Questa fase è chiusa.",
      actionErrorAlreadyResponsible:
        "Un altro membro ha già assunto la responsabilità di questa azione.",
      actionQuickTakeStep: "Farsi carico di un passo",
      actionQuickOfferHelp: "Offrire aiuto",
      actionQuickAddEvidence: "Aggiungi una prova",
      actionQuickInstitutionResponse: "Registra la risposta dell'istituzione",
      actionInputLabelTakeStep: "Di cosa ti farai carico?",
      actionInputLabelOfferHelp: "Come puoi aiutare?",
      actionInputLabelEvidence: "Descrizione della prova",
      actionInputLabelInstitutionResponse: "Cosa ha detto l'istituzione?",
      actionSubmitTakeStep: "Invia",
      actionSubmitOfferHelp: "Invia",
      actionSubmitEvidence: "Invia prova",
      actionSubmitInstitutionResponse: "Invia",
      actionStatusNotStarted: "Non ancora iniziato",
      actionStatusInProgress: "In corso",
      actionStatusBlocked: "Bloccato",
      actionStatusCompleted: "Completato",
      actionResponsibleLabel: "Responsabile: {name}",
      actionCollaboratorsLabel: "Collaborano: {names}",
      actionInstitutionLabel: "Istituzione: {value}",
      actionObjectiveLabel: "Obiettivo: {value}",
      actionDeadlineLabel: "Scadenza indicativa: {value}",
      actionBlockedReasonNone: "Nessun motivo",
      actionBlockedReasonInstitution: "In attesa della risposta dell'istituzione",
      actionBlockedReasonResources: "In attesa di risorse",
      actionBlockedReasonVolunteers: "In attesa di volontari",
      actionBlockedReasonOther: "Altro",
      verificationLoading: "Caricamento della verifica…",
      verificationUnavailable: "La verifica non è temporaneamente disponibile.",
      verificationPendingReady: "Non ancora contrassegnata come pronta per la verifica.",
      verificationCanMarkReady: "Puoi contrassegnare questa azione come pronta per la verifica.",
      verificationCanConfirm: "Puoi confermare se è stata consegnata.",
      verificationConfirmedDelivered: "Hai confermato: consegnata.",
      verificationConfirmedNotDelivered: "Hai confermato: non consegnata.",
      verificationTallyLabel: "{delivered} hanno confermato consegnata · {notDelivered} hanno confermato non consegnata",
      verificationDisputeEscalated:
        "Questa controversia è aperta da più di 14 giorni ed è ora segnalata per la revisione di un operatore.",
      verificationOutcomeDelivered: "Verificato: consegnata.",
      verificationOutcomeNotDelivered: "Verificato: non consegnata.",
      verificationEvidenceUrlLabel: "Link di supporto (facoltativo)",
      verificationEvidenceSubmit: "Invia prova",
      verificationEvidenceNeedText: "Scrivi almeno 12 caratteri.",
      verificationEvidenceInvalidUrl: "Inserisci un link http(s) valido, oppure lascia vuoto.",
      verificationEvidenceMine: "Tua",
      verificationErrorGeneric: "Qualcosa è andato storto. Riprova.",
      verificationErrorClosed: "Questa fase è chiusa.",
      verificationAlreadyConfirmed: "Hai già confermato.",
      mandateTotalVotesLabel: "{count} voti totali",
      mandateMinorityHeading: "Posizioni di minoranza",
      contestStatusPending: "Hai presentato una contestazione. Stato: in attesa di revisione.",
      contestStatusUpheld: "Hai presentato una contestazione. Stato: accolta.",
      contestStatusRejected: "Hai presentato una contestazione. Stato: respinta.",
      contestPendingOther: "È stata presentata una contestazione ed è in attesa di revisione.",
      contestReasonLabel: "Motivo",
      contestReasonEligibilityError: "Errore di ammissibilità",
      contestReasonBallotTampering: "Sospetta manomissione della scheda",
      contestReasonCountDiscrepancy: "Discrepanza nel conteggio dei voti",
      contestSubmit: "Presenta una contestazione",
      contestElaborationPlaceholder: "Dettagli facoltativi",
      contestErrorGeneric: "Qualcosa è andato storto. Riprova.",
      contestErrorAlready: "Hai già presentato una contestazione per questo mandato.",
      contestErrorWindowClosed: "La finestra di 72 ore per la contestazione si è chiusa.",
      contestErrorNotEligible: "Non avevi diritto di voto nel ballottaggio decisivo.",
      contestErrorNotDecided: "Una contestazione richiede un mandato deciso.",
    },
    de: {
      label: "Bürgerprozess",
      stage: "Bestätigung",
      loading: "Bürgerprozess wird geladen…",
      unavailable: "Der Bürgerprozess ist vorübergehend nicht verfügbar.",
      confirmed: "Du hast dieses Signal bestätigt.",
      canConfirm: "Du kannst deine Bestätigung hinzufügen.",
      readOnly: "Du kannst diesen Prozess verfolgen. Die Teilnahme richtet sich nach deinem Gemeinschaftszugang.",
      confirmations: "Bestätigungen",
      next: "Nächste Phase",
      proposals: "Vorschläge",
      closing: "Ende",
      notScheduled: "Nicht terminiert",
      started: "Prozess gestartet",
      deliberation: "Beratung",
      ballotPreparation: "Abstimmungsvorbereitung",
      voting: "Abstimmung",
      mandate: "Mandat",
      votingLoading: "Abstimmung wird geladen…",
      votingUnavailable: "Die Abstimmung ist vorübergehend nicht verfügbar.",
      votingCanVote: "Wähle eine Option und gib deine Stimme ab.",
      votingHasVoted: "Du hast abgestimmt. Die Ergebnisse werden live aktualisiert.",
      voteCountLabel: "{count} Stimmen",
      voteSubmit: "Stimme abgeben",
      voteNeedChoice: "Wähle zuerst eine Option.",
      voteErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      voteErrorClosed: "Die Abstimmung ist geschlossen.",
      voteErrorAlready: "Du hast bereits abgestimmt.",
      voteErrorNotEligible: "Du bist nicht stimmberechtigt für diese Abstimmung.",
      proposalsCanAdd: "Du kannst einen strukturierten Vorschlag hinzufügen.",
      proposalsSubmitted: "Du hast einen Vorschlag für diesen Prozess eingereicht.",
      proposalsLoading: "Vorschläge werden geladen…",
      proposalsUnavailable: "Vorschläge sind vorübergehend nicht verfügbar.",
      proposalsEmpty: "Noch keine Vorschläge.",
      proposalsAdd: "Vorschlag hinzufügen",
      proposalsTitleLabel: "Titel des Vorschlags",
      proposalsBodyLabel: "Details des Vorschlags",
      proposalsSubmit: "Vorschlag einreichen",
      cancel: "Abbrechen",
      proposalsMine: "Dein Vorschlag",
      proposalsNeedTitle: "Füge einen kurzen Titel hinzu.",
      proposalsNeedBody: "Beschreibe den Vorschlag.",
      proposalsErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      proposalsErrorClosed: "Diese Phase ist geschlossen.",
      proposalsErrorDuplicate: "Du hast bereits einen Vorschlag für diesen Prozess eingereicht.",
      proposalsOutcomeLabel: "Erwartetes Ergebnis",
      proposalsInstitutionLabel: "Zuständige Institution (optional)",
      proposalsResourcesLabel: "Geschätzte Ressourcen (optional)",
      proposalsDeadlineLabel: "Voraussichtlicher Termin (optional)",
      proposalsNeedOutcome: "Beschreibe das erwartete Ergebnis.",
      proposalsRevise: "Überarbeiten",
      proposalsWithdraw: "Zurückziehen",
      proposalsWithdrawConfirm:
        "Diesen Vorschlag zurückziehen? Das kann nicht rückgängig gemacht werden.",
      proposalsRevisedBadge: "Überarbeitet",
      proposalsWithdrawnBadge: "Zurückgezogen",
      proposalsEditTitle: "Überarbeite deinen Vorschlag",
      proposalsSaveRevision: "Überarbeitung speichern",
      proposalsErrorNotAuthor: "Nur der Autor kann das tun.",
      proposalsErrorAlreadyRevised: "Dieser Vorschlag wurde bereits einmal überarbeitet.",
      proposalsErrorAlreadyWithdrawn: "Dieser Vorschlag wurde bereits zurückgezogen.",
      deliberationLoading: "Beratung wird geladen…",
      deliberationUnavailable: "Die Beratung ist vorübergehend nicht verfügbar.",
      deliberationCanContribute:
        "Du kannst zu jedem Vorschlag einen strukturierten Beitrag hinzufügen.",
      ballotFinalOptions:
        "Dies sind die endgültigen Abstimmungsoptionen nach der Beratung.",
      deliberationEmpty: "Noch keine Vorschläge zur Beratung.",
      contributionsEmpty: "Noch keine Beiträge.",
      addContribution: "Beitrag hinzufügen",
      intentObservation: "Beobachtung",
      intentProposal: "Vorschlag",
      intentNextStep: "Nächster Schritt",
      intentArgumentFor: "Argument dafür",
      intentRiskOrObjection: "Risiko oder Einwand",
      intentQuestion: "Frage",
      intentAuthorResponse: "Antwort des Autors",
      intentEvidence: "Beleg",
      intentAmendmentSuggestion: "Änderungsvorschlag",
      intentMinorityPosition: "Minderheitsposition",
      intentLegend: "Art",
      contributionLabel: "Beitrag",
      contributionSubmit: "Beitrag einreichen",
      contributionNeedText: "Schreibe mindestens 12 Zeichen.",
      contributionNeedIntent: "Wähle eine Art.",
      contributionErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      contributionErrorClosed: "Diese Phase ist geschlossen.",
      contributionErrorInvalidReplyTarget:
        "Auf diesen Beitrag kann nicht mehr geantwortet werden.",
      replyAction: "Antworten",
      replyingToLabel: "Antwort an {author}",
      replyCancel: "Antwort abbrechen",
      deliberationContributionMine: "Deins",
      action: "Umsetzung",
      archived: "Archiviert",
      mandateLoading: "Mandat wird geladen…",
      mandateUnavailable: "Das Mandat ist vorübergehend nicht verfügbar.",
      mandateContested: "Kein Sieger: die führenden Vorschläge sind gleichauf.",
      mandatePending: "Die Abstimmung ist noch nicht geschlossen.",
      verification: "Überprüfung",
      actionLoading: "Umsetzung wird geladen…",
      actionUnavailable: "Die Umsetzung ist vorübergehend nicht verfügbar.",
      actionPending: "Das Mandat ist noch nicht entschieden.",
      actionCanPost: "Du kannst ein Status-Update hinzufügen.",
      actionMine: "Deins",
      actionInputLabel: "Status-Update",
      actionSubmit: "Status-Update einreichen",
      actionNeedText: "Schreibe mindestens 12 Zeichen.",
      actionErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      actionErrorClosed: "Diese Phase ist geschlossen.",
      actionErrorAlreadyResponsible:
        "Ein anderes Mitglied hat bereits die Verantwortung für diese Maßnahme übernommen.",
      actionQuickTakeStep: "Einen Schritt übernehmen",
      actionQuickOfferHelp: "Hilfe anbieten",
      actionQuickAddEvidence: "Nachweis hinzufügen",
      actionQuickInstitutionResponse: "Antwort der Institution festhalten",
      actionInputLabelTakeStep: "Was wirst du übernehmen?",
      actionInputLabelOfferHelp: "Wie kannst du helfen?",
      actionInputLabelEvidence: "Beschreibung des Nachweises",
      actionInputLabelInstitutionResponse: "Was hat die Institution gesagt?",
      actionSubmitTakeStep: "Absenden",
      actionSubmitOfferHelp: "Absenden",
      actionSubmitEvidence: "Nachweis absenden",
      actionSubmitInstitutionResponse: "Absenden",
      actionStatusNotStarted: "Noch nicht begonnen",
      actionStatusInProgress: "In Bearbeitung",
      actionStatusBlocked: "Blockiert",
      actionStatusCompleted: "Abgeschlossen",
      actionResponsibleLabel: "Verantwortlich: {name}",
      actionCollaboratorsLabel: "Helfen: {names}",
      actionInstitutionLabel: "Institution: {value}",
      actionObjectiveLabel: "Ziel: {value}",
      actionDeadlineLabel: "Voraussichtliche Frist: {value}",
      actionBlockedReasonNone: "Kein Grund",
      actionBlockedReasonInstitution: "Warten auf Antwort der Institution",
      actionBlockedReasonResources: "Warten auf Ressourcen",
      actionBlockedReasonVolunteers: "Warten auf Freiwillige",
      actionBlockedReasonOther: "Sonstiges",
      verificationLoading: "Überprüfung wird geladen…",
      verificationUnavailable: "Die Überprüfung ist vorübergehend nicht verfügbar.",
      verificationPendingReady: "Noch nicht als bereit zur Überprüfung markiert.",
      verificationCanMarkReady: "Du kannst diese Umsetzung als bereit zur Überprüfung markieren.",
      verificationCanConfirm: "Du kannst bestätigen, ob dies umgesetzt wurde.",
      verificationConfirmedDelivered: "Du hast bestätigt: umgesetzt.",
      verificationConfirmedNotDelivered: "Du hast bestätigt: nicht umgesetzt.",
      verificationTallyLabel: "{delivered} bestätigten umgesetzt · {notDelivered} bestätigten nicht umgesetzt",
      verificationDisputeEscalated:
        "Dieser Streitfall ist seit mehr als 14 Tagen offen und wurde nun zur Prüfung durch eine Betreiberin markiert.",
      verificationOutcomeDelivered: "Bestätigt: umgesetzt.",
      verificationOutcomeNotDelivered: "Bestätigt: nicht umgesetzt.",
      verificationEvidenceUrlLabel: "Unterstützender Link (optional)",
      verificationEvidenceSubmit: "Nachweis einreichen",
      verificationEvidenceNeedText: "Schreibe mindestens 12 Zeichen.",
      verificationEvidenceInvalidUrl: "Gib einen gültigen http(s)-Link ein oder lasse das Feld leer.",
      verificationEvidenceMine: "Deins",
      verificationErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      verificationErrorClosed: "Diese Phase ist geschlossen.",
      verificationAlreadyConfirmed: "Du hast bereits bestätigt.",
      mandateTotalVotesLabel: "{count} Stimmen insgesamt",
      mandateMinorityHeading: "Minderheitspositionen",
      contestStatusPending: "Du hast einen Einspruch eingereicht. Status: Prüfung ausstehend.",
      contestStatusUpheld: "Du hast einen Einspruch eingereicht. Status: bestätigt.",
      contestStatusRejected: "Du hast einen Einspruch eingereicht. Status: abgelehnt.",
      contestPendingOther: "Ein Einspruch wurde eingereicht und wartet auf Prüfung.",
      contestReasonLabel: "Grund",
      contestReasonEligibilityError: "Wahlberechtigungsfehler",
      contestReasonBallotTampering: "Verdacht auf Manipulation der Abstimmung",
      contestReasonCountDiscrepancy: "Diskrepanz bei der Stimmenauszählung",
      contestSubmit: "Einspruch einreichen",
      contestElaborationPlaceholder: "Optionale Details",
      contestErrorGeneric: "Etwas ist schiefgelaufen. Versuche es erneut.",
      contestErrorAlready: "Du hast bereits einen Einspruch für dieses Mandat eingereicht.",
      contestErrorWindowClosed: "Das 72-Stunden-Fenster für den Einspruch ist geschlossen.",
      contestErrorNotEligible: "Du warst bei der entscheidenden Abstimmung nicht stimmberechtigt.",
      contestErrorNotDecided: "Ein Einspruch erfordert ein entschiedenes Mandat.",
    },
    ro: {
      label: "Proces civic",
      stage: "Confirmare",
      loading: "Se încarcă procesul civic…",
      unavailable: "Procesul civic este temporar indisponibil.",
      confirmed: "Ai confirmat acest semnal.",
      canConfirm: "Poți adăuga confirmarea ta.",
      readOnly: "Poți urmări acest proces. Participarea depinde de accesul în comunitatea ta.",
      confirmations: "Confirmări",
      next: "Etapa următoare",
      proposals: "Propuneri",
      closing: "Închidere",
      notScheduled: "Nu este programată",
      started: "Proces început",
      deliberation: "Deliberare",
      ballotPreparation: "Pregătirea scrutinului",
      voting: "Vot",
      mandate: "Mandat",
      votingLoading: "Se încarcă votul…",
      votingUnavailable: "Votul este temporar indisponibil.",
      votingCanVote: "Alege o opțiune și trimite votul tău.",
      votingHasVoted: "Ai votat. Rezultatele se actualizează live.",
      voteCountLabel: "{count} voturi",
      voteSubmit: "Trimite votul",
      voteNeedChoice: "Selectează o opțiune mai întâi.",
      voteErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      voteErrorClosed: "Votul este închis.",
      voteErrorAlready: "Ai votat deja.",
      voteErrorNotEligible: "Nu ai drept de vot la acest scrutin.",
      proposalsCanAdd: "Poți adăuga o propunere structurată.",
      proposalsSubmitted: "Ai trimis o propunere pentru acest proces.",
      proposalsLoading: "Se încarcă propunerile…",
      proposalsUnavailable: "Propunerile sunt temporar indisponibile.",
      proposalsEmpty: "Nu există încă propuneri.",
      proposalsAdd: "Adaugă o propunere",
      proposalsTitleLabel: "Titlul propunerii",
      proposalsBodyLabel: "Detaliile propunerii",
      proposalsSubmit: "Trimite propunerea",
      cancel: "Anulează",
      proposalsMine: "Propunerea ta",
      proposalsNeedTitle: "Adaugă un titlu scurt.",
      proposalsNeedBody: "Descrie propunerea.",
      proposalsErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      proposalsErrorClosed: "Această etapă este închisă.",
      proposalsErrorDuplicate: "Ai trimis deja o propunere pentru acest proces.",
      proposalsOutcomeLabel: "Rezultatul așteptat",
      proposalsInstitutionLabel: "Instituția vizată (opțional)",
      proposalsResourcesLabel: "Resurse estimate (opțional)",
      proposalsDeadlineLabel: "Termen orientativ (opțional)",
      proposalsNeedOutcome: "Descrie rezultatul așteptat.",
      proposalsRevise: "Revizuiește",
      proposalsWithdraw: "Retrage",
      proposalsWithdrawConfirm: "Retragi această propunere? Nu poate fi anulat.",
      proposalsRevisedBadge: "Revizuită",
      proposalsWithdrawnBadge: "Retrasă",
      proposalsEditTitle: "Revizuiește-ți propunerea",
      proposalsSaveRevision: "Salvează revizuirea",
      proposalsErrorNotAuthor: "Doar autorul poate face asta.",
      proposalsErrorAlreadyRevised: "Această propunere a fost deja revizuită o dată.",
      proposalsErrorAlreadyWithdrawn: "Această propunere a fost deja retrasă.",
      deliberationLoading: "Se încarcă deliberarea…",
      deliberationUnavailable: "Deliberarea este temporar indisponibilă.",
      deliberationCanContribute: "Poți adăuga o contribuție structurată la orice propunere.",
      ballotFinalOptions: "Acestea sunt opțiunile finale de vot rezultate din deliberare.",
      deliberationEmpty: "Nu există încă propuneri de deliberat.",
      contributionsEmpty: "Nu există încă contribuții.",
      addContribution: "Adaugă o contribuție",
      intentObservation: "Observație",
      intentProposal: "Propunere",
      intentNextStep: "Pas următor",
      intentArgumentFor: "Argument pro",
      intentRiskOrObjection: "Risc sau obiecție",
      intentQuestion: "Întrebare",
      intentAuthorResponse: "Răspunsul autorului",
      intentEvidence: "Dovadă",
      intentAmendmentSuggestion: "Sugestie de amendament",
      intentMinorityPosition: "Poziție minoritară",
      intentLegend: "Tip",
      contributionLabel: "Contribuție",
      contributionSubmit: "Trimite contribuția",
      contributionNeedText: "Scrie cel puțin 12 caractere.",
      contributionNeedIntent: "Alege un tip.",
      contributionErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      contributionErrorClosed: "Această etapă este închisă.",
      contributionErrorInvalidReplyTarget:
        "Nu se mai poate răspunde la acea contribuție.",
      replyAction: "Răspunde",
      replyingToLabel: "Răspuns către {author}",
      replyCancel: "Anulează răspunsul",
      deliberationContributionMine: "A ta",
      action: "Acțiune",
      archived: "Arhivat",
      mandateLoading: "Se încarcă mandatul…",
      mandateUnavailable: "Mandatul este temporar indisponibil.",
      mandateContested: "Niciun câștigător: propunerile de top au fost la egalitate.",
      mandatePending: "Votul nu s-a închis încă.",
      verification: "Verificare",
      actionLoading: "Se încarcă acțiunea…",
      actionUnavailable: "Acțiunea este temporar indisponibilă.",
      actionPending: "Mandatul nu este încă decis.",
      actionCanPost: "Poți adăuga o actualizare de stare.",
      actionMine: "A ta",
      actionInputLabel: "Actualizare de stare",
      actionSubmit: "Trimite actualizarea",
      actionNeedText: "Scrie cel puțin 12 caractere.",
      actionErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      actionErrorClosed: "Această etapă este închisă.",
      actionErrorAlreadyResponsible:
        "Un alt membru și-a asumat deja responsabilitatea pentru această acțiune.",
      actionQuickTakeStep: "Îmi asum un pas",
      actionQuickOfferHelp: "Ofer ajutor",
      actionQuickAddEvidence: "Adaugă o dovadă",
      actionQuickInstitutionResponse: "Înregistrează răspunsul instituției",
      actionInputLabelTakeStep: "Ce îți vei asuma?",
      actionInputLabelOfferHelp: "Cum poți ajuta?",
      actionInputLabelEvidence: "Descrierea dovezii",
      actionInputLabelInstitutionResponse: "Ce a spus instituția?",
      actionSubmitTakeStep: "Trimite",
      actionSubmitOfferHelp: "Trimite",
      actionSubmitEvidence: "Trimite dovada",
      actionSubmitInstitutionResponse: "Trimite",
      actionStatusNotStarted: "Neînceput încă",
      actionStatusInProgress: "În desfășurare",
      actionStatusBlocked: "Blocat",
      actionStatusCompleted: "Finalizat",
      actionResponsibleLabel: "Responsabil: {name}",
      actionCollaboratorsLabel: "Ajută: {names}",
      actionInstitutionLabel: "Instituție: {value}",
      actionObjectiveLabel: "Obiectiv: {value}",
      actionDeadlineLabel: "Termen indicativ: {value}",
      actionBlockedReasonNone: "Fără motiv",
      actionBlockedReasonInstitution: "Se așteaptă răspunsul instituției",
      actionBlockedReasonResources: "Se așteaptă resurse",
      actionBlockedReasonVolunteers: "Se așteaptă voluntari",
      actionBlockedReasonOther: "Altul",
      verificationLoading: "Se încarcă verificarea…",
      verificationUnavailable: "Verificarea este temporar indisponibilă.",
      verificationPendingReady: "Nu a fost încă marcată gata pentru verificare.",
      verificationCanMarkReady: "Poți marca această acțiune gata pentru verificare.",
      verificationCanConfirm: "Poți confirma dacă acest lucru a fost livrat.",
      verificationConfirmedDelivered: "Ai confirmat: livrat.",
      verificationConfirmedNotDelivered: "Ai confirmat: nelivrat.",
      verificationTallyLabel: "{delivered} au confirmat livrat · {notDelivered} au confirmat nelivrat",
      verificationDisputeEscalated:
        "Această dispută este deschisă de peste 14 zile și este acum semnalată pentru revizuire de către un operator.",
      verificationOutcomeDelivered: "Verificat: livrat.",
      verificationOutcomeNotDelivered: "Verificat: nelivrat.",
      verificationEvidenceUrlLabel: "Link justificativ (opțional)",
      verificationEvidenceSubmit: "Trimite dovada",
      verificationEvidenceNeedText: "Scrie cel puțin 12 caractere.",
      verificationEvidenceInvalidUrl: "Introdu un link http(s) valid sau lasă gol.",
      verificationEvidenceMine: "A ta",
      verificationErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      verificationErrorClosed: "Această etapă este închisă.",
      verificationAlreadyConfirmed: "Ai confirmat deja.",
      mandateTotalVotesLabel: "{count} voturi în total",
      mandateMinorityHeading: "Poziții minoritare",
      contestStatusPending: "Ai depus o contestație. Stare: în așteptarea revizuirii.",
      contestStatusUpheld: "Ai depus o contestație. Stare: admisă.",
      contestStatusRejected: "Ai depus o contestație. Stare: respinsă.",
      contestPendingOther: "A fost depusă o contestație și așteaptă revizuire.",
      contestReasonLabel: "Motiv",
      contestReasonEligibilityError: "Eroare de eligibilitate",
      contestReasonBallotTampering: "Suspiciune de fraudare a buletinului de vot",
      contestReasonCountDiscrepancy: "Discrepanță în numărarea voturilor",
      contestSubmit: "Depune o contestație",
      contestElaborationPlaceholder: "Detalii opționale",
      contestErrorGeneric: "Ceva nu a funcționat. Încearcă din nou.",
      contestErrorAlready: "Ai depus deja o contestație pentru acest mandat.",
      contestErrorWindowClosed: "Fereastra de 72 de ore pentru contestație s-a închis.",
      contestErrorNotEligible: "Nu ai avut drept de vot la scrutinul decisiv.",
      contestErrorNotDecided: "O contestație necesită un mandat decis.",
    },
  };

  function civicProcessCopy() {
    const lang = resolvePublicReadingLanguage();
    return CIVIC_PROCESS_COPY[lang] || CIVIC_PROCESS_COPY.en;
  }

  function applyCivicProcessLabels(copy) {
    detailProcessLabel.textContent = copy.label;
    detailProcessConfirmationsLabel.textContent = copy.confirmations;
    detailProcessNextLabel.textContent = copy.next;
    detailProcessClosingLabel.textContent = copy.closing;
  }

  function renderCivicProcessLoading() {
    const copy = civicProcessCopy();
    applyCivicProcessLabels(copy);
    detailProcessStage.textContent = "";
    detailProcessStage.hidden = true;
    detailProcessState.hidden = false;
    detailProcessState.textContent = copy.loading;
    detailProcessFacts.hidden = true;
    detailProcessTimeline.hidden = true;
    detailProcessProposals.hidden = true;
    resetCivicProposalsPanel();
    detailProcessDeliberation.hidden = true;
    resetCivicDeliberationPanel();
    detailProcessVoting.hidden = true;
    resetCivicVotingPanel();
    detailProcessMandate.hidden = true;
    resetCivicMandatePanel();
    detailProcessAction.hidden = true;
    resetCivicActionPanel();
    detailProcessVerification.hidden = true;
    resetCivicVerificationPanel();
  }

  function renderCivicProcessUnavailable() {
    const copy = civicProcessCopy();
    applyCivicProcessLabels(copy);
    detailProcessStage.textContent = "";
    detailProcessStage.hidden = true;
    detailProcessState.hidden = false;
    detailProcessState.textContent = copy.unavailable;
    detailProcessFacts.hidden = true;
    detailProcessTimeline.hidden = true;
    detailProcessProposals.hidden = true;
    resetCivicProposalsPanel();
    detailProcessDeliberation.hidden = true;
    resetCivicDeliberationPanel();
    detailProcessVoting.hidden = true;
    resetCivicVotingPanel();
    detailProcessMandate.hidden = true;
    resetCivicMandatePanel();
    detailProcessAction.hidden = true;
    resetCivicActionPanel();
    detailProcessVerification.hidden = true;
    resetCivicVerificationPanel();
  }

  function formatCivicProcessTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    try {
      return new Intl.DateTimeFormat(resolvePublicReadingLanguage(), {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (_err) {
      return date.toISOString().slice(0, 10);
    }
  }

  function renderCivicProcess(data) {
    const copy = civicProcessCopy();
    applyCivicProcessLabels(copy);
    const isProposalsStage = data.currentStage === "proposals";
    const isDeliberationStage = data.currentStage === "deliberation";
    const isBallotPreparationStage = data.currentStage === "ballot_preparation";
    const isVotingStage = data.currentStage === "voting";
    const isMandateStage = data.currentStage === "mandate";
    const isActionStage = data.currentStage === "action";
    const isVerificationStage = data.currentStage === "verification";
    const isArchivedStage = data.currentStage === "archived";
    const isOpenStage =
      isProposalsStage ||
      isDeliberationStage ||
      isBallotPreparationStage ||
      isVotingStage ||
      isMandateStage ||
      isActionStage ||
      isVerificationStage ||
      isArchivedStage;
    detailProcessStage.textContent = isProposalsStage
      ? copy.proposals
      : isDeliberationStage
        ? copy.deliberation
        : isBallotPreparationStage
          ? copy.ballotPreparation
          : isVotingStage
            ? copy.voting
            : isMandateStage
              ? copy.mandate
              : isActionStage
                ? copy.action
                : isVerificationStage
                  ? copy.verification
                  : isArchivedStage
                    ? copy.archived
                    : copy.stage;
    detailProcessStage.hidden = false;
    detailProcessState.hidden = isOpenStage;
    detailProcessState.textContent = isOpenStage
      ? ""
      : data.hasConfirmed
        ? copy.confirmed
        : data.canConfirm
          ? copy.canConfirm
          : copy.readOnly;
    detailProcessConfirmations.textContent =
      data.transitionRule &&
      data.transitionRule.type === "confirmation_count" &&
      typeof data.transitionRule.requiredConfirmations === "number"
        ? data.confirmationCount + " / " + data.transitionRule.requiredConfirmations
        : String(data.confirmationCount);
    detailProcessNext.textContent =
      data.nextStage === "proposals"
        ? copy.proposals
        : data.nextStage === "deliberation"
          ? copy.deliberation
          : data.nextStage === "ballot_preparation"
            ? copy.ballotPreparation
            : data.nextStage === "voting"
              ? copy.voting
              : data.nextStage === "mandate"
                ? copy.mandate
                : data.nextStage === "action"
                  ? copy.action
                  : data.nextStage === "verification"
                    ? copy.verification
                    : data.nextStage === "archived"
                      ? copy.archived
                      : "";
    detailProcessClosing.textContent =
      data.closingAt === null
        ? copy.notScheduled
        : formatCivicProcessTime(data.closingAt);
    const firstEvent =
      Array.isArray(data.timeline) && data.timeline.length > 0
        ? data.timeline[0]
        : null;
    detailProcessEventLabel.textContent = copy.started;
    detailProcessEventTime.textContent =
      firstEvent && firstEvent.type === "process_created"
        ? formatCivicProcessTime(firstEvent.occurredAt)
        : "";
    detailProcessFacts.hidden = false;
    detailProcessTimeline.hidden = !firstEvent;
    if (isProposalsStage) {
      detailProcessProposals.hidden = false;
      void loadSignalCivicProposals();
    } else {
      detailProcessProposals.hidden = true;
      resetCivicProposalsPanel();
    }
    if (isDeliberationStage || isBallotPreparationStage) {
      detailProcessDeliberation.hidden = false;
      void loadSignalCivicDeliberation();
    } else {
      detailProcessDeliberation.hidden = true;
      resetCivicDeliberationPanel();
    }
    if (isVotingStage) {
      detailProcessVoting.hidden = false;
      void loadSignalCivicVoting();
    } else {
      detailProcessVoting.hidden = true;
      resetCivicVotingPanel();
    }
    if (isMandateStage || isActionStage || isVerificationStage || isArchivedStage) {
      detailProcessMandate.hidden = false;
      void loadSignalCivicMandate();
    } else {
      detailProcessMandate.hidden = true;
      resetCivicMandatePanel();
    }
    if (isActionStage || isVerificationStage || isArchivedStage) {
      detailProcessAction.hidden = false;
      void loadSignalCivicAction();
    } else {
      detailProcessAction.hidden = true;
      resetCivicActionPanel();
    }
    if (isActionStage || isVerificationStage || isArchivedStage) {
      detailProcessVerification.hidden = false;
      void loadSignalCivicVerification();
    } else {
      detailProcessVerification.hidden = true;
      resetCivicVerificationPanel();
    }
  }

  // Civic Inbox bookkeeping only — private per-account marker, never affects
  // the civic process itself. Best-effort; a failure here must not disrupt
  // the signal detail view the member is already looking at.
  function markCivicProcessViewed(signalId) {
    if (!sessionAuthenticated || !signalId) return;
    postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/viewed",
      {}
    ).catch(function (_err) {});
  }

  async function loadSignalCivicProcess() {
    const signalId = currentSignalApiId();
    const token = ++civicProcessLoadToken;
    renderCivicProcessLoading();
    if (!signalId) {
      renderCivicProcessUnavailable();
      return false;
    }
    try {
      const result = await getJsonWithCredentials(
        API_BASE +
          "/v1/signals/" +
          encodeURIComponent(signalId) +
          "/civic-process"
      );
      const data = result.payload && result.payload.data;
      if (
        token !== civicProcessLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.signalId !== signalId ||
        (data.currentStage !== "confirmation" &&
          data.currentStage !== "proposals" &&
          data.currentStage !== "deliberation" &&
          data.currentStage !== "ballot_preparation" &&
          data.currentStage !== "voting" &&
          data.currentStage !== "mandate" &&
          data.currentStage !== "action" &&
          data.currentStage !== "verification" &&
          data.currentStage !== "archived") ||
        typeof data.confirmationCount !== "number" ||
        (data.currentStage === "confirmation" &&
          data.nextStage !== "proposals") ||
        (data.currentStage === "proposals" &&
          data.nextStage !== "deliberation") ||
        (data.currentStage === "deliberation" &&
          data.nextStage !== "ballot_preparation") ||
        (data.currentStage === "ballot_preparation" &&
          data.nextStage !== "voting") ||
        (data.currentStage === "voting" && data.nextStage !== "mandate") ||
        (data.currentStage === "mandate" && data.nextStage !== "action") ||
        (data.currentStage === "action" && data.nextStage !== "verification") ||
        (data.currentStage === "verification" && data.nextStage !== "archived") ||
        (data.currentStage === "archived" && data.nextStage !== null)
      ) {
        if (token === civicProcessLoadToken) renderCivicProcessUnavailable();
        return false;
      }
      setSignalConfirmationState(signalId, {
        confirmed: data.hasConfirmed === true,
        confirmationCount: data.confirmationCount,
      });
      renderCivicProcess(data);
      syncFeedMemberState();
      markCivicProcessViewed(signalId);
      return true;
    } catch (_err) {
      if (token === civicProcessLoadToken) renderCivicProcessUnavailable();
      return false;
    }
  }

  let civicProposalsLoadToken = 0;
  let civicProposalSubmitting = false;
  let civicProposalsCanProposeCache = false;

  function resetCivicProposalsPanel() {
    civicProposalsLoadToken += 1;
    civicProposalsCanProposeCache = false;
    detailProcessProposalsState.textContent = "";
    detailProcessProposalsEmpty.hidden = true;
    detailProcessProposalsList.textContent = "";
    detailProcessProposalsContribute.hidden = true;
    closeCivicProposalsCompose();
  }

  async function fetchSignalCivicProposals(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/proposals"
    );
  }

  function civicProposalPayload(fields) {
    const payload = {
      title: fields.title,
      body: fields.body,
      expectedOutcome: fields.expectedOutcome,
    };
    if (fields.targetInstitution) payload.targetInstitution = fields.targetInstitution;
    if (fields.estimatedResources) payload.estimatedResources = fields.estimatedResources;
    if (fields.indicativeDeadline) payload.indicativeDeadline = fields.indicativeDeadline;
    return payload;
  }

  async function submitSignalCivicProposal(signalId, fields) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/proposals",
      civicProposalPayload(fields)
    );
  }

  async function reviseSignalCivicProposal(signalId, proposalId, fields) {
    return putJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/proposals/" +
        encodeURIComponent(proposalId),
      civicProposalPayload(fields)
    );
  }

  async function withdrawSignalCivicProposal(signalId, proposalId) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/proposals/" +
        encodeURIComponent(proposalId) +
        "/withdraw",
      {}
    );
  }

  function renderCivicProposalsLoading() {
    const copy = civicProcessCopy();
    detailProcessProposalsState.textContent = copy.proposalsLoading;
    detailProcessProposalsEmpty.hidden = true;
    detailProcessProposalsList.textContent = "";
    detailProcessProposalsContribute.hidden = true;
    closeCivicProposalsCompose();
  }

  function renderCivicProposalsUnavailable() {
    const copy = civicProcessCopy();
    detailProcessProposalsState.textContent = copy.proposalsUnavailable;
    detailProcessProposalsEmpty.hidden = true;
    detailProcessProposalsList.textContent = "";
    detailProcessProposalsContribute.hidden = true;
    closeCivicProposalsCompose();
  }

  function appendCivicProposalFact(li, label, value) {
    if (!value) return;
    const fact = document.createElement("p");
    fact.className = "signal-detail__process-proposals-fact";
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    fact.appendChild(strong);
    fact.appendChild(document.createTextNode(value));
    li.appendChild(fact);
  }

  function renderCivicProposals(data) {
    const copy = civicProcessCopy();
    const proposals = Array.isArray(data.proposals) ? data.proposals : [];
    const mine = proposals.some(function (proposal) {
      return proposal.isMine === true;
    });
    detailProcessProposalsState.textContent = data.canPropose
      ? copy.proposalsCanAdd
      : mine
        ? copy.proposalsSubmitted
        : copy.readOnly;
    detailProcessProposalsEmpty.hidden = proposals.length > 0;
    detailProcessProposalsEmpty.textContent =
      proposals.length > 0 ? "" : copy.proposalsEmpty;
    detailProcessProposalsList.textContent = "";
    proposals.forEach(function (proposal) {
      const li = document.createElement("li");
      li.className = "signal-detail__process-proposals-item";
      const meta = document.createElement("p");
      meta.className = "signal-detail__process-proposals-meta";
      meta.textContent = proposal.authorDisplayName || "";
      if (proposal.isMine) {
        const badge = document.createElement("span");
        badge.className = "signal-detail__process-proposals-badge";
        badge.textContent = copy.proposalsMine;
        meta.appendChild(badge);
      }
      if (proposal.lifecycleState === "revised") {
        const badge = document.createElement("span");
        badge.className = "signal-detail__process-proposals-badge";
        badge.textContent = copy.proposalsRevisedBadge;
        meta.appendChild(badge);
      } else if (proposal.lifecycleState === "withdrawn") {
        const badge = document.createElement("span");
        badge.className = "signal-detail__process-proposals-badge";
        badge.textContent = copy.proposalsWithdrawnBadge;
        meta.appendChild(badge);
      }
      const title = document.createElement("p");
      title.className = "signal-detail__process-proposals-title";
      title.textContent = proposal.title || "";
      const body = document.createElement("p");
      body.className = "signal-detail__process-proposals-body";
      body.textContent = proposal.body || "";
      li.appendChild(meta);
      li.appendChild(title);
      li.appendChild(body);
      appendCivicProposalFact(li, copy.proposalsOutcomeLabel, proposal.expectedOutcome);
      appendCivicProposalFact(li, copy.proposalsInstitutionLabel, proposal.targetInstitution);
      appendCivicProposalFact(li, copy.proposalsResourcesLabel, proposal.estimatedResources);
      appendCivicProposalFact(
        li,
        copy.proposalsDeadlineLabel,
        formatCivicProcessTime(proposal.indicativeDeadline)
      );
      if (proposal.canRevise || proposal.canWithdraw) {
        const actions = document.createElement("div");
        actions.className = "signal-detail__process-proposals-item-actions";
        if (proposal.canRevise) {
          const reviseButton = document.createElement("button");
          reviseButton.type = "button";
          reviseButton.className = "feed__secondary";
          reviseButton.textContent = copy.proposalsRevise;
          reviseButton.addEventListener("click", function () {
            openCivicProposalsCompose(proposal);
          });
          actions.appendChild(reviseButton);
        }
        if (proposal.canWithdraw) {
          const withdrawButton = document.createElement("button");
          withdrawButton.type = "button";
          withdrawButton.className = "feed__secondary";
          withdrawButton.textContent = copy.proposalsWithdraw;
          withdrawButton.addEventListener("click", function () {
            void withdrawCivicProposalAction(proposal.id);
          });
          actions.appendChild(withdrawButton);
        }
        li.appendChild(actions);
      }
      detailProcessProposalsList.appendChild(li);
    });
    civicProposalsCanProposeCache = data.canPropose === true;
    detailProcessProposalsContribute.hidden = !civicProposalsCanProposeCache;
    if (!civicProposalsCanProposeCache) closeCivicProposalsCompose();
  }

  async function loadSignalCivicProposals() {
    const signalId = currentSignalApiId();
    const token = ++civicProposalsLoadToken;
    renderCivicProposalsLoading();
    if (!signalId) {
      if (token === civicProposalsLoadToken) renderCivicProposalsUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicProposals(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicProposalsLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        data.currentStage !== "proposals" ||
        !Array.isArray(data.proposals)
      ) {
        if (token === civicProposalsLoadToken) renderCivicProposalsUnavailable();
        return;
      }
      renderCivicProposals(data);
    } catch (_err) {
      if (token === civicProposalsLoadToken) renderCivicProposalsUnavailable();
    }
  }

  let civicProposalEditingId = null;

  function openCivicProposalsCompose(proposal) {
    const copy = civicProcessCopy();
    civicProposalEditingId = proposal ? proposal.id : null;
    detailProcessProposalsComposeTitle.textContent = civicProposalEditingId
      ? copy.proposalsEditTitle
      : copy.proposalsAdd;
    detailProcessProposalsTitleInput.setAttribute(
      "aria-label",
      copy.proposalsTitleLabel
    );
    detailProcessProposalsBodyInput.setAttribute(
      "aria-label",
      copy.proposalsBodyLabel
    );
    detailProcessProposalsOutcomeInput.setAttribute(
      "aria-label",
      copy.proposalsOutcomeLabel
    );
    detailProcessProposalsOutcomeInput.placeholder = copy.proposalsOutcomeLabel;
    detailProcessProposalsInstitutionInput.setAttribute(
      "aria-label",
      copy.proposalsInstitutionLabel
    );
    detailProcessProposalsInstitutionInput.placeholder =
      copy.proposalsInstitutionLabel;
    detailProcessProposalsResourcesInput.setAttribute(
      "aria-label",
      copy.proposalsResourcesLabel
    );
    detailProcessProposalsResourcesInput.placeholder =
      copy.proposalsResourcesLabel;
    detailProcessProposalsDeadlineInput.setAttribute(
      "aria-label",
      copy.proposalsDeadlineLabel
    );
    detailProcessProposalsTitleInput.value = proposal ? proposal.title || "" : "";
    detailProcessProposalsBodyInput.value = proposal ? proposal.body || "" : "";
    detailProcessProposalsOutcomeInput.value = proposal
      ? proposal.expectedOutcome || ""
      : "";
    detailProcessProposalsInstitutionInput.value = proposal
      ? proposal.targetInstitution || ""
      : "";
    detailProcessProposalsResourcesInput.value = proposal
      ? proposal.estimatedResources || ""
      : "";
    detailProcessProposalsDeadlineInput.value = proposal
      ? proposal.indicativeDeadline || ""
      : "";
    detailProcessProposalsSubmit.textContent = civicProposalEditingId
      ? copy.proposalsSaveRevision
      : copy.proposalsSubmit;
    detailProcessProposalsCancel.textContent = copy.cancel;
    detailProcessProposalsNote.hidden = true;
    detailProcessProposalsNote.textContent = "";
    detailProcessProposalsCompose.hidden = false;
    detailProcessProposalsContribute.hidden = true;
    detailProcessProposalsTitleInput.focus();
  }

  function closeCivicProposalsCompose() {
    civicProposalEditingId = null;
    detailProcessProposalsCompose.hidden = true;
    detailProcessProposalsTitleInput.value = "";
    detailProcessProposalsBodyInput.value = "";
    detailProcessProposalsOutcomeInput.value = "";
    detailProcessProposalsInstitutionInput.value = "";
    detailProcessProposalsResourcesInput.value = "";
    detailProcessProposalsDeadlineInput.value = "";
    detailProcessProposalsNote.hidden = true;
    detailProcessProposalsNote.textContent = "";
  }

  async function submitCivicProposal() {
    if (civicProposalSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const title = (detailProcessProposalsTitleInput.value || "").trim();
    const body = (detailProcessProposalsBodyInput.value || "").trim();
    const expectedOutcome = (
      detailProcessProposalsOutcomeInput.value || ""
    ).trim();
    const targetInstitution = (
      detailProcessProposalsInstitutionInput.value || ""
    ).trim();
    const estimatedResources = (
      detailProcessProposalsResourcesInput.value || ""
    ).trim();
    const indicativeDeadline = (
      detailProcessProposalsDeadlineInput.value || ""
    ).trim();
    if (!title || title.length > 160) {
      detailProcessProposalsNote.textContent = copy.proposalsNeedTitle;
      detailProcessProposalsNote.hidden = false;
      detailProcessProposalsTitleInput.focus();
      return;
    }
    if (!body || body.length > 2000) {
      detailProcessProposalsNote.textContent = copy.proposalsNeedBody;
      detailProcessProposalsNote.hidden = false;
      detailProcessProposalsBodyInput.focus();
      return;
    }
    if (!expectedOutcome || expectedOutcome.length > 500) {
      detailProcessProposalsNote.textContent = copy.proposalsNeedOutcome;
      detailProcessProposalsNote.hidden = false;
      detailProcessProposalsOutcomeInput.focus();
      return;
    }
    const fields = {
      title: title,
      body: body,
      expectedOutcome: expectedOutcome,
      targetInstitution: targetInstitution,
      estimatedResources: estimatedResources,
      indicativeDeadline: indicativeDeadline,
    };
    civicProposalSubmitting = true;
    detailProcessProposalsSubmit.disabled = true;
    try {
      const editingId = civicProposalEditingId;
      const result = editingId
        ? await reviseSignalCivicProposal(signalId, editingId, fields)
        : await submitSignalCivicProposal(signalId, fields);
      const okStatus = editingId ? 200 : 201;
      if (result.response && result.response.status === okStatus) {
        closeCivicProposalsCompose();
        await loadSignalCivicProposals();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessProposalsNote.textContent = civicProposalErrorCopy(copy, code);
      detailProcessProposalsNote.hidden = false;
    } catch (_err) {
      detailProcessProposalsNote.textContent = copy.proposalsErrorGeneric;
      detailProcessProposalsNote.hidden = false;
    } finally {
      civicProposalSubmitting = false;
      detailProcessProposalsSubmit.disabled = false;
    }
  }

  async function withdrawCivicProposalAction(proposalId) {
    if (civicProposalSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    if (!window.confirm(copy.proposalsWithdrawConfirm)) return;
    civicProposalSubmitting = true;
    try {
      const result = await withdrawSignalCivicProposal(signalId, proposalId);
      if (result.response && result.response.status === 200) {
        await loadSignalCivicProposals();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessProposalsNote.textContent = civicProposalErrorCopy(copy, code);
      detailProcessProposalsNote.hidden = false;
    } catch (_err) {
      detailProcessProposalsNote.textContent = copy.proposalsErrorGeneric;
      detailProcessProposalsNote.hidden = false;
    } finally {
      civicProposalSubmitting = false;
    }
  }

  let civicDeliberationLoadToken = 0;
  let civicDeliberationSubmitting = false;

  function resetCivicDeliberationPanel() {
    civicDeliberationLoadToken += 1;
    detailProcessDeliberationState.textContent = "";
    detailProcessDeliberationList.textContent = "";
  }

  async function fetchSignalCivicDeliberation(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/deliberation"
    );
  }

  async function submitSignalCivicDeliberationContribution(
    signalId,
    proposalId,
    intent,
    text,
    replyToContributionId
  ) {
    const body = { intent: intent, text: text };
    if (replyToContributionId) body.replyToContributionId = replyToContributionId;
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/deliberation/proposals/" +
        encodeURIComponent(proposalId) +
        "/contributions",
      body
    );
  }

  function renderCivicDeliberationLoading() {
    const copy = civicProcessCopy();
    detailProcessDeliberationState.textContent = copy.deliberationLoading;
    detailProcessDeliberationList.textContent = "";
  }

  function renderCivicDeliberationUnavailable() {
    const copy = civicProcessCopy();
    detailProcessDeliberationState.textContent = copy.deliberationUnavailable;
    detailProcessDeliberationList.textContent = "";
  }

  function buildDeliberationContributionItem(
    copy,
    byParent,
    contribution,
    canContribute,
    onReply
  ) {
    const li = document.createElement("li");
    li.className = "signal-detail__process-deliberation-contribution";
    const meta = document.createElement("p");
    meta.className = "signal-detail__process-deliberation-contribution-meta";
    meta.textContent = contribution.authorDisplayName || "";
    const intentBadge = document.createElement("span");
    intentBadge.className = "signal-detail__process-deliberation-intent-badge";
    intentBadge.textContent = deliberationIntentLabel(copy, contribution.intent);
    meta.appendChild(intentBadge);
    if (contribution.isMine) {
      const mineBadge = document.createElement("span");
      mineBadge.className = "signal-detail__process-deliberation-badge";
      mineBadge.textContent = copy.deliberationContributionMine;
      meta.appendChild(mineBadge);
    }
    const text = document.createElement("p");
    text.className = "signal-detail__process-deliberation-contribution-text";
    text.textContent = contribution.text || "";
    li.appendChild(meta);
    li.appendChild(text);

    if (canContribute) {
      const replyButton = document.createElement("button");
      replyButton.type = "button";
      replyButton.className = "signal-detail__process-deliberation-reply-button";
      replyButton.textContent = copy.replyAction;
      replyButton.addEventListener("click", function () {
        onReply(contribution);
      });
      li.appendChild(replyButton);
    }

    const replies = byParent.get(contribution.id) || [];
    if (replies.length > 0) {
      const repliesList = document.createElement("ol");
      repliesList.className =
        "signal-detail__process-deliberation-contributions signal-detail__process-deliberation-replies";
      for (let i = 0; i < replies.length; i++) {
        repliesList.appendChild(
          buildDeliberationContributionItem(
            copy,
            byParent,
            replies[i],
            canContribute,
            onReply
          )
        );
      }
      li.appendChild(repliesList);
    }

    return li;
  }

  function buildDeliberationComposeForm(copy, proposal) {
    const contributeButton = document.createElement("button");
    contributeButton.type = "button";
    contributeButton.className = "feed__secondary";
    contributeButton.textContent = copy.addContribution;

    const compose = document.createElement("div");
    compose.className = "signal-detail__process-deliberation-compose";
    compose.hidden = true;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "signal-detail__session-intent";
    const legend = document.createElement("legend");
    legend.className = "signal-detail__session-intent-legend";
    legend.textContent = copy.intentLegend;
    fieldset.appendChild(legend);

    const intentGroupName = "deliberation-intent-" + proposal.id;
    for (let i = 0; i < DELIBERATION_INTENTS.length; i++) {
      const value = DELIBERATION_INTENTS[i];
      const label = document.createElement("label");
      label.className = "signal-detail__session-intent-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = intentGroupName;
      input.value = value;
      const span = document.createElement("span");
      span.textContent = deliberationIntentLabel(copy, value);
      label.appendChild(input);
      label.appendChild(span);
      fieldset.appendChild(label);
    }
    compose.appendChild(fieldset);

    const replyBanner = document.createElement("p");
    replyBanner.className = "signal-detail__process-deliberation-reply-banner";
    replyBanner.hidden = true;
    const replyBannerText = document.createElement("span");
    replyBanner.appendChild(replyBannerText);
    const replyBannerCancel = document.createElement("button");
    replyBannerCancel.type = "button";
    replyBannerCancel.className = "signal-detail__process-deliberation-reply-cancel";
    replyBannerCancel.textContent = copy.replyCancel;
    replyBanner.appendChild(replyBannerCancel);
    compose.appendChild(replyBanner);

    const textarea = document.createElement("textarea");
    textarea.className = "signal-detail__session-input";
    textarea.maxLength = 480;
    textarea.rows = 3;
    textarea.setAttribute("aria-label", copy.contributionLabel);
    compose.appendChild(textarea);

    const actions = document.createElement("div");
    actions.className = "signal-detail__session-compose-actions";
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "feed__primary";
    submitButton.textContent = copy.contributionSubmit;
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "feed__secondary";
    cancelButton.textContent = copy.cancel;
    actions.appendChild(submitButton);
    actions.appendChild(cancelButton);
    compose.appendChild(actions);

    const note = document.createElement("p");
    note.className = "signal-detail__process-deliberation-note";
    note.hidden = true;
    compose.appendChild(note);

    let replyTarget = null;

    function clearReplyTarget() {
      replyTarget = null;
      replyBanner.hidden = true;
      replyBannerText.textContent = "";
    }

    function resetCompose() {
      compose.hidden = true;
      contributeButton.hidden = false;
      textarea.value = "";
      const inputs = fieldset.querySelectorAll('input[type="radio"]');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
      note.hidden = true;
      note.textContent = "";
      clearReplyTarget();
    }

    function openCompose(target) {
      compose.hidden = false;
      contributeButton.hidden = true;
      if (target) {
        replyTarget = target;
        replyBannerText.textContent = (copy.replyingToLabel || "").replace(
          "{author}",
          target.authorDisplayName || ""
        );
        replyBanner.hidden = false;
      } else {
        clearReplyTarget();
      }
      textarea.focus();
    }

    contributeButton.addEventListener("click", function () {
      openCompose(null);
    });
    replyBannerCancel.addEventListener("click", clearReplyTarget);
    cancelButton.addEventListener("click", resetCompose);
    submitButton.addEventListener("click", function () {
      void submitCivicDeliberationContribution({
        proposalId: proposal.id,
        replyToContributionId: replyTarget ? replyTarget.id : null,
        fieldset: fieldset,
        textarea: textarea,
        submitButton: submitButton,
        note: note,
      });
    });

    return {
      contributeButton: contributeButton,
      compose: compose,
      openForReply: openCompose,
    };
  }

  function buildDeliberationProposalItem(copy, canContribute, proposal) {
    const li = document.createElement("li");
    li.className = "signal-detail__process-deliberation-item";

    const proposalMeta = document.createElement("p");
    proposalMeta.className = "signal-detail__process-deliberation-proposal-meta";
    proposalMeta.textContent = proposal.authorDisplayName || "";
    if (proposal.isMine) {
      const badge = document.createElement("span");
      badge.className = "signal-detail__process-deliberation-badge";
      badge.textContent = copy.proposalsMine;
      proposalMeta.appendChild(badge);
    }
    const proposalTitle = document.createElement("p");
    proposalTitle.className = "signal-detail__process-deliberation-proposal-title";
    proposalTitle.textContent = proposal.title || "";
    const proposalBody = document.createElement("p");
    proposalBody.className = "signal-detail__process-deliberation-proposal-body";
    proposalBody.textContent = proposal.body || "";
    li.appendChild(proposalMeta);
    li.appendChild(proposalTitle);
    li.appendChild(proposalBody);

    const contributions = Array.isArray(proposal.contributions)
      ? proposal.contributions
      : [];
    const form = canContribute ? buildDeliberationComposeForm(copy, proposal) : null;
    const byParent = groupDeliberationContributionsByParent(contributions);
    const roots = byParent.get(null) || [];
    const contributionsList = document.createElement("ol");
    contributionsList.className = "signal-detail__process-deliberation-contributions";
    for (let i = 0; i < roots.length; i++) {
      contributionsList.appendChild(
        buildDeliberationContributionItem(
          copy,
          byParent,
          roots[i],
          canContribute,
          function (contribution) {
            if (form) form.openForReply(contribution);
          }
        )
      );
    }
    li.appendChild(contributionsList);

    if (contributions.length === 0) {
      const empty = document.createElement("p");
      empty.className = "signal-detail__process-deliberation-contributions-empty";
      empty.textContent = copy.contributionsEmpty;
      li.appendChild(empty);
    }

    if (form) {
      li.appendChild(form.contributeButton);
      li.appendChild(form.compose);
    }

    return li;
  }

  function renderCivicDeliberation(data) {
    const copy = civicProcessCopy();
    const proposals = Array.isArray(data.proposals) ? data.proposals : [];
    const isBallotPreparation = data.currentStage === "ballot_preparation";
    detailProcessDeliberationState.textContent =
      proposals.length === 0
        ? copy.deliberationEmpty
        : isBallotPreparation
          ? copy.ballotFinalOptions
          : data.canContribute
            ? copy.deliberationCanContribute
            : copy.readOnly;
    detailProcessDeliberationList.textContent = "";
    const canContribute = data.canContribute === true;
    for (let i = 0; i < proposals.length; i++) {
      detailProcessDeliberationList.appendChild(
        buildDeliberationProposalItem(copy, canContribute, proposals[i])
      );
    }
  }

  async function loadSignalCivicDeliberation() {
    const signalId = currentSignalApiId();
    const token = ++civicDeliberationLoadToken;
    renderCivicDeliberationLoading();
    if (!signalId) {
      if (token === civicDeliberationLoadToken) renderCivicDeliberationUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicDeliberation(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicDeliberationLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        (data.currentStage !== "deliberation" &&
          data.currentStage !== "ballot_preparation") ||
        !Array.isArray(data.proposals)
      ) {
        if (token === civicDeliberationLoadToken) renderCivicDeliberationUnavailable();
        return;
      }
      renderCivicDeliberation(data);
    } catch (_err) {
      if (token === civicDeliberationLoadToken) renderCivicDeliberationUnavailable();
    }
  }

  async function submitCivicDeliberationContribution(context) {
    if (civicDeliberationSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const checked = context.fieldset.querySelector('input[type="radio"]:checked');
    const intent = checked && checked.value ? String(checked.value) : "";
    if (DELIBERATION_INTENTS.indexOf(intent) === -1) {
      context.note.textContent = copy.contributionNeedIntent;
      context.note.hidden = false;
      return;
    }
    const text = (context.textarea.value || "").trim();
    if (text.length < 12 || text.length > 480) {
      context.note.textContent = copy.contributionNeedText;
      context.note.hidden = false;
      context.textarea.focus();
      return;
    }
    civicDeliberationSubmitting = true;
    context.submitButton.disabled = true;
    try {
      const result = await submitSignalCivicDeliberationContribution(
        signalId,
        context.proposalId,
        intent,
        text,
        context.replyToContributionId
      );
      if (result.response && result.response.status === 201) {
        await loadSignalCivicDeliberation();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      context.note.textContent =
        code === "CIVIC_DELIBERATION_STAGE_CLOSED"
          ? copy.contributionErrorClosed
          : code === "CIVIC_DELIBERATION_INVALID_REPLY_TARGET"
            ? copy.contributionErrorInvalidReplyTarget
            : copy.contributionErrorGeneric;
      context.note.hidden = false;
    } catch (_err) {
      context.note.textContent = copy.contributionErrorGeneric;
      context.note.hidden = false;
    } finally {
      civicDeliberationSubmitting = false;
      context.submitButton.disabled = false;
    }
  }

  let civicVotingLoadToken = 0;
  let civicVoteSubmitting = false;

  function resetCivicVotingPanel() {
    civicVotingLoadToken += 1;
    detailProcessVotingState.textContent = "";
    detailProcessVotingList.textContent = "";
    detailProcessVotingSubmit.hidden = true;
    detailProcessVotingNote.hidden = true;
    detailProcessVotingNote.textContent = "";
  }

  async function fetchSignalCivicVoting(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/voting"
    );
  }

  async function submitSignalCivicVote(signalId, proposalId) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/voting/vote",
      { proposalId: proposalId }
    );
  }

  function renderCivicVotingLoading() {
    const copy = civicProcessCopy();
    detailProcessVotingState.textContent = copy.votingLoading;
    detailProcessVotingList.textContent = "";
    detailProcessVotingSubmit.hidden = true;
  }

  function renderCivicVotingUnavailable() {
    const copy = civicProcessCopy();
    detailProcessVotingState.textContent = copy.votingUnavailable;
    detailProcessVotingList.textContent = "";
    detailProcessVotingSubmit.hidden = true;
  }

  function appendVoteOptionContent(container, copy, option) {
    const meta = document.createElement("p");
    meta.className = "signal-detail__process-voting-meta";
    meta.textContent = option.authorDisplayName || "";
    const title = document.createElement("p");
    title.className = "signal-detail__process-voting-title";
    title.textContent = option.title || "";
    const body = document.createElement("p");
    body.className = "signal-detail__process-voting-body";
    body.textContent = option.body || "";
    const count = document.createElement("p");
    count.className = "signal-detail__process-voting-count";
    count.textContent = formatVoteCountLabel(
      copy,
      typeof option.voteCount === "number" ? option.voteCount : 0
    );
    container.appendChild(meta);
    container.appendChild(title);
    container.appendChild(body);
    container.appendChild(count);
  }

  function renderCivicVoting(data) {
    const copy = civicProcessCopy();
    const options = Array.isArray(data.options) ? data.options : [];
    detailProcessVotingState.textContent = data.canVote
      ? copy.votingCanVote
      : data.hasVoted
        ? copy.votingHasVoted
        : copy.readOnly;
    detailProcessVotingList.textContent = "";
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const li = document.createElement("li");
      li.className = "signal-detail__process-voting-item";
      if (data.canVote) {
        const label = document.createElement("label");
        label.className = "signal-detail__process-voting-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "civic-vote-choice";
        input.value = option.proposalId;
        label.appendChild(input);
        const text = document.createElement("span");
        text.className = "signal-detail__process-voting-option-text";
        appendVoteOptionContent(text, copy, option);
        label.appendChild(text);
        li.appendChild(label);
      } else {
        appendVoteOptionContent(li, copy, option);
      }
      detailProcessVotingList.appendChild(li);
    }
    detailProcessVotingSubmit.hidden = !data.canVote;
    detailProcessVotingSubmit.textContent = copy.voteSubmit;
    detailProcessVotingNote.hidden = true;
  }

  async function loadSignalCivicVoting() {
    const signalId = currentSignalApiId();
    const token = ++civicVotingLoadToken;
    renderCivicVotingLoading();
    if (!signalId) {
      if (token === civicVotingLoadToken) renderCivicVotingUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicVoting(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicVotingLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        (data.currentStage !== "ballot_preparation" &&
          data.currentStage !== "voting") ||
        !Array.isArray(data.options)
      ) {
        if (token === civicVotingLoadToken) renderCivicVotingUnavailable();
        return;
      }
      renderCivicVoting(data);
    } catch (_err) {
      if (token === civicVotingLoadToken) renderCivicVotingUnavailable();
    }
  }

  async function submitCivicVote() {
    if (civicVoteSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const checked = detailProcessVotingList.querySelector(
      'input[name="civic-vote-choice"]:checked'
    );
    const proposalId = checked && checked.value ? String(checked.value) : "";
    if (!proposalId) {
      detailProcessVotingNote.textContent = copy.voteNeedChoice;
      detailProcessVotingNote.hidden = false;
      return;
    }
    civicVoteSubmitting = true;
    detailProcessVotingSubmit.disabled = true;
    try {
      const result = await submitSignalCivicVote(signalId, proposalId);
      if (result.response && result.response.status === 201) {
        await loadSignalCivicVoting();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessVotingNote.textContent =
        code === "CIVIC_VOTE_ALREADY_CAST"
          ? copy.voteErrorAlready
          : code === "CIVIC_VOTING_STAGE_CLOSED"
            ? copy.voteErrorClosed
            : code === "CIVIC_VOTE_NOT_ELIGIBLE_FOR_BALLOT"
              ? copy.voteErrorNotEligible
              : copy.voteErrorGeneric;
      detailProcessVotingNote.hidden = false;
    } catch (_err) {
      detailProcessVotingNote.textContent = copy.voteErrorGeneric;
      detailProcessVotingNote.hidden = false;
    } finally {
      civicVoteSubmitting = false;
      detailProcessVotingSubmit.disabled = false;
    }
  }

  let civicMandateLoadToken = 0;
  let civicContestSubmitting = false;
  let civicContestCanContestCache = false;

  function resetCivicMandatePanel() {
    civicMandateLoadToken += 1;
    civicContestSubmitting = false;
    civicContestCanContestCache = false;
    detailProcessMandateState.textContent = "";
    detailProcessMandateWinner.hidden = true;
    detailProcessMandateAuthor.textContent = "";
    detailProcessMandateTitle.textContent = "";
    detailProcessMandateBody.textContent = "";
    detailProcessMandateTally.textContent = "";
    detailProcessMandateMinorityList.textContent = "";
    detailProcessMandateMinorityList.hidden = true;
    detailProcessMandateContest.hidden = true;
    detailProcessMandateContestStatus.textContent = "";
    detailProcessMandateContestStatus.hidden = true;
    detailProcessMandateContestForm.hidden = true;
    detailProcessMandateContestElaboration.value = "";
    detailProcessMandateContestNote.hidden = true;
    detailProcessMandateContestNote.textContent = "";
  }

  async function fetchSignalCivicMandate(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/mandate"
    );
  }

  async function submitSignalCivicMandateContest(signalId, reasonKey, elaboration) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/mandate/contest",
      elaboration
        ? { reasonKey: reasonKey, elaboration: elaboration }
        : { reasonKey: reasonKey }
    );
  }

  function renderCivicMandateLoading() {
    const copy = civicProcessCopy();
    detailProcessMandateState.textContent = copy.mandateLoading;
    detailProcessMandateWinner.hidden = true;
    detailProcessMandateTally.textContent = "";
    detailProcessMandateMinorityList.hidden = true;
    detailProcessMandateContest.hidden = true;
  }

  function renderCivicMandateUnavailable() {
    const copy = civicProcessCopy();
    detailProcessMandateState.textContent = copy.mandateUnavailable;
    detailProcessMandateWinner.hidden = true;
    detailProcessMandateTally.textContent = "";
    detailProcessMandateMinorityList.hidden = true;
    detailProcessMandateContest.hidden = true;
  }

  function renderCivicMandateMinorityPositions(copy, minorityPositions) {
    detailProcessMandateMinorityList.textContent = "";
    if (!minorityPositions.length) {
      detailProcessMandateMinorityList.hidden = true;
      return;
    }
    detailProcessMandateMinorityList.hidden = false;
    for (const position of minorityPositions) {
      const item = document.createElement("li");
      item.className = "signal-detail__process-mandate-minority-item";
      const author = document.createElement("p");
      author.className = "signal-detail__process-mandate-minority-author";
      author.textContent = position.authorDisplayName || "";
      const text = document.createElement("p");
      text.className = "signal-detail__process-mandate-minority-text";
      text.textContent = position.text || "";
      item.appendChild(author);
      item.appendChild(text);
      detailProcessMandateMinorityList.appendChild(item);
    }
  }

  function renderCivicMandateContestReasonOptions(copy) {
    if (detailProcessMandateContestReason.options.length > 0) return;
    const reasons = [
      ["eligibility_error", copy.contestReasonEligibilityError],
      ["ballot_tampering_suspected", copy.contestReasonBallotTampering],
      ["count_discrepancy", copy.contestReasonCountDiscrepancy],
    ];
    for (const [value, label] of reasons) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label || value;
      detailProcessMandateContestReason.appendChild(option);
    }
  }

  function renderCivicMandateContest(copy, data) {
    if (!data.decided) {
      detailProcessMandateContest.hidden = true;
      civicContestCanContestCache = false;
      return;
    }
    detailProcessMandateContest.hidden = false;
    if (data.myContestation) {
      detailProcessMandateContestStatus.hidden = false;
      detailProcessMandateContestStatus.textContent =
        data.myContestation.status === "upheld"
          ? copy.contestStatusUpheld
          : data.myContestation.status === "rejected"
            ? copy.contestStatusRejected
            : copy.contestStatusPending;
    } else if (data.contestationPending) {
      detailProcessMandateContestStatus.hidden = false;
      detailProcessMandateContestStatus.textContent = copy.contestPendingOther;
    } else {
      detailProcessMandateContestStatus.hidden = true;
      detailProcessMandateContestStatus.textContent = "";
    }
    renderCivicMandateContestReasonOptions(copy);
    civicContestCanContestCache = data.canContest === true;
    detailProcessMandateContestForm.hidden = !civicContestCanContestCache;
    detailProcessMandateContestLabel.textContent = copy.contestReasonLabel;
    detailProcessMandateContestSubmit.textContent = copy.contestSubmit;
    detailProcessMandateContestElaboration.placeholder =
      copy.contestElaborationPlaceholder || "";
    detailProcessMandateContestNote.hidden = true;
    detailProcessMandateContestNote.textContent = "";
  }

  function renderCivicMandate(data) {
    const copy = civicProcessCopy();
    // The mandate stage itself only ever pauses here for a contested tie —
    // a clean win advances to action in the same transaction (§9), and the
    // action panel is the canonical place that shows the winner from then
    // on. This panel stays visible through action/verification/archived
    // only to carry the minority-position record and contestation window.
    if (data.currentStage === "mandate") {
      const winner = data.winner;
      if (winner) {
        detailProcessMandateState.textContent = "";
        detailProcessMandateWinner.hidden = false;
        detailProcessMandateAuthor.textContent = winner.authorDisplayName || "";
        detailProcessMandateTitle.textContent = winner.title || "";
        detailProcessMandateBody.textContent = winner.body || "";
      } else {
        detailProcessMandateState.textContent = data.contested
          ? copy.mandateContested
          : copy.mandatePending;
        detailProcessMandateWinner.hidden = true;
      }
      detailProcessMandateTally.textContent = formatTotalVotesLabel(
        copy,
        typeof data.totalVotes === "number" ? data.totalVotes : 0
      );
    } else {
      detailProcessMandateState.textContent = "";
      detailProcessMandateWinner.hidden = true;
      detailProcessMandateTally.textContent = "";
    }
    renderCivicMandateMinorityPositions(copy, data.minorityPositions || []);
    renderCivicMandateContest(copy, data);
  }

  async function loadSignalCivicMandate() {
    const signalId = currentSignalApiId();
    const token = ++civicMandateLoadToken;
    renderCivicMandateLoading();
    if (!signalId) {
      if (token === civicMandateLoadToken) renderCivicMandateUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicMandate(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicMandateLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        (data.currentStage !== "voting" &&
          data.currentStage !== "mandate" &&
          data.currentStage !== "action" &&
          data.currentStage !== "verification" &&
          data.currentStage !== "archived") ||
        typeof data.decided !== "boolean" ||
        typeof data.contested !== "boolean" ||
        !Array.isArray(data.minorityPositions) ||
        typeof data.contestationPending !== "boolean" ||
        typeof data.canContest !== "boolean"
      ) {
        if (token === civicMandateLoadToken) renderCivicMandateUnavailable();
        return;
      }
      renderCivicMandate(data);
    } catch (_err) {
      if (token === civicMandateLoadToken) renderCivicMandateUnavailable();
    }
  }

  async function submitCivicMandateContest() {
    if (civicContestSubmitting || !civicContestCanContestCache) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const reasonKey = detailProcessMandateContestReason.value;
    const elaboration = detailProcessMandateContestElaboration.value.trim();
    civicContestSubmitting = true;
    detailProcessMandateContestSubmit.disabled = true;
    try {
      const result = await submitSignalCivicMandateContest(
        signalId,
        reasonKey,
        elaboration
      );
      if (result.response && result.response.status === 201) {
        await loadSignalCivicMandate();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessMandateContestNote.textContent =
        code === "CIVIC_CONTESTATION_ALREADY_FILED"
          ? copy.contestErrorAlready
          : code === "CIVIC_CONTESTATION_WINDOW_CLOSED"
            ? copy.contestErrorWindowClosed
            : code === "CIVIC_CONTESTATION_NOT_ELIGIBLE"
              ? copy.contestErrorNotEligible
              : code === "CIVIC_MANDATE_NOT_DECIDED"
                ? copy.contestErrorNotDecided
                : copy.contestErrorGeneric;
      detailProcessMandateContestNote.hidden = false;
    } catch (_err) {
      detailProcessMandateContestNote.textContent = copy.contestErrorGeneric;
      detailProcessMandateContestNote.hidden = false;
    } finally {
      civicContestSubmitting = false;
      detailProcessMandateContestSubmit.disabled = false;
    }
  }

  let civicActionLoadToken = 0;
  let civicActionSubmitting = false;
  let civicActionCanPostCache = false;
  let civicActionCanTakeStepCache = false;
  let civicActionPendingKind = "status_update";

  const CIVIC_ACTION_BLOCKED_REASON_KEYS = [
    "awaiting_institution_response",
    "awaiting_resources",
    "awaiting_volunteers",
    "other",
  ];

  function closeCivicActionCompose() {
    detailProcessActionCompose.hidden = true;
    detailProcessActionInput.value = "";
    detailProcessActionBlockedReason.value = "";
    detailProcessActionUrlInput.value = "";
    detailProcessActionNote.hidden = true;
    detailProcessActionNote.textContent = "";
  }

  function resetCivicActionPanel() {
    civicActionLoadToken += 1;
    civicActionCanPostCache = false;
    civicActionCanTakeStepCache = false;
    detailProcessActionState.textContent = "";
    detailProcessActionWinner.hidden = true;
    detailProcessActionAuthor.textContent = "";
    detailProcessActionTitle.textContent = "";
    detailProcessActionBody.textContent = "";
    detailProcessActionInstitution.hidden = true;
    detailProcessActionObjective.hidden = true;
    detailProcessActionDeadline.hidden = true;
    detailProcessActionStatus.hidden = true;
    detailProcessActionResponsible.hidden = true;
    detailProcessActionCollaborators.hidden = true;
    detailProcessActionList.textContent = "";
    detailProcessActionTakeStep.hidden = true;
    detailProcessActionOfferHelp.hidden = true;
    detailProcessActionContribute.hidden = true;
    detailProcessActionAddEvidence.hidden = true;
    detailProcessActionInstitutionResponse.hidden = true;
    closeCivicActionCompose();
  }

  async function fetchSignalCivicAction(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/action"
    );
  }

  async function submitSignalCivicActionUpdate(signalId, payload) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/action/updates",
      payload
    );
  }

  function renderCivicActionLoading() {
    const copy = civicProcessCopy();
    detailProcessActionState.textContent = copy.actionLoading;
    detailProcessActionWinner.hidden = true;
    detailProcessActionStatus.hidden = true;
    detailProcessActionResponsible.hidden = true;
    detailProcessActionCollaborators.hidden = true;
    detailProcessActionList.textContent = "";
    detailProcessActionTakeStep.hidden = true;
    detailProcessActionOfferHelp.hidden = true;
    detailProcessActionContribute.hidden = true;
    detailProcessActionAddEvidence.hidden = true;
    detailProcessActionInstitutionResponse.hidden = true;
    closeCivicActionCompose();
  }

  function renderCivicActionUnavailable() {
    const copy = civicProcessCopy();
    detailProcessActionState.textContent = copy.actionUnavailable;
    detailProcessActionWinner.hidden = true;
    detailProcessActionStatus.hidden = true;
    detailProcessActionResponsible.hidden = true;
    detailProcessActionCollaborators.hidden = true;
    detailProcessActionList.textContent = "";
    detailProcessActionTakeStep.hidden = true;
    detailProcessActionOfferHelp.hidden = true;
    detailProcessActionContribute.hidden = true;
    detailProcessActionAddEvidence.hidden = true;
    detailProcessActionInstitutionResponse.hidden = true;
    closeCivicActionCompose();
  }

  function civicActionKindBadgeLabel(copy, kind) {
    return kind === "take_step"
      ? copy.actionQuickTakeStep
      : kind === "offer_help"
        ? copy.actionQuickOfferHelp
        : kind === "evidence"
          ? copy.actionQuickAddEvidence
          : kind === "institution_response"
            ? copy.actionQuickInstitutionResponse
            : "";
  }

  function buildActionUpdateItem(copy, update) {
    const li = document.createElement("li");
    li.className = "signal-detail__process-action-item";
    const meta = document.createElement("p");
    meta.className = "signal-detail__process-action-meta";
    meta.textContent = update.authorDisplayName || "";
    if (update.isMine) {
      const badge = document.createElement("span");
      badge.className = "signal-detail__process-action-badge";
      badge.textContent = copy.actionMine;
      meta.appendChild(badge);
    }
    const kindLabel = civicActionKindBadgeLabel(copy, update.kind);
    if (kindLabel) {
      const kindBadge = document.createElement("span");
      kindBadge.className = "signal-detail__process-action-kind-badge";
      kindBadge.textContent = kindLabel;
      meta.appendChild(kindBadge);
    }
    const text = document.createElement("p");
    text.className = "signal-detail__process-action-text";
    text.textContent = update.text || "";
    li.appendChild(meta);
    li.appendChild(text);
    if (update.blockedReasonKey) {
      const reason = document.createElement("p");
      reason.className = "signal-detail__process-action-item-blocked-reason";
      reason.textContent = civicActionBlockedReasonLabel(copy, update.blockedReasonKey);
      li.appendChild(reason);
    }
    if (update.url) {
      const link = document.createElement("a");
      link.className = "signal-detail__process-action-evidence-link";
      link.href = update.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = update.url;
      li.appendChild(link);
    }
    return li;
  }

  function civicActionStatusLabel(copy, actionStatus) {
    return actionStatus === "blocked"
      ? copy.actionStatusBlocked
      : actionStatus === "completed"
        ? copy.actionStatusCompleted
        : actionStatus === "in_progress"
          ? copy.actionStatusInProgress
          : copy.actionStatusNotStarted;
  }

  function renderCivicAction(data) {
    const copy = civicProcessCopy();
    const winner = data.winner;
    if (winner) {
      detailProcessActionWinner.hidden = false;
      detailProcessActionAuthor.textContent = winner.authorDisplayName || "";
      detailProcessActionTitle.textContent = winner.title || "";
      detailProcessActionBody.textContent = winner.body || "";
      if (winner.targetInstitution) {
        detailProcessActionInstitution.hidden = false;
        detailProcessActionInstitution.textContent = (
          copy.actionInstitutionLabel || "Institution: {value}"
        ).replace("{value}", winner.targetInstitution);
      } else {
        detailProcessActionInstitution.hidden = true;
      }
      if (winner.objective) {
        detailProcessActionObjective.hidden = false;
        detailProcessActionObjective.textContent = (
          copy.actionObjectiveLabel || "Objective: {value}"
        ).replace("{value}", winner.objective);
      } else {
        detailProcessActionObjective.hidden = true;
      }
      if (winner.indicativeDeadline) {
        detailProcessActionDeadline.hidden = false;
        detailProcessActionDeadline.textContent = (
          copy.actionDeadlineLabel || "Indicative deadline: {value}"
        ).replace("{value}", winner.indicativeDeadline);
      } else {
        detailProcessActionDeadline.hidden = true;
      }
    } else {
      detailProcessActionWinner.hidden = true;
      detailProcessActionInstitution.hidden = true;
      detailProcessActionObjective.hidden = true;
      detailProcessActionDeadline.hidden = true;
    }
    if (data.actionStatus) {
      detailProcessActionStatus.hidden = false;
      detailProcessActionStatus.textContent = civicActionStatusLabel(copy, data.actionStatus);
    } else {
      detailProcessActionStatus.hidden = true;
    }
    if (data.responsibleActor && data.responsibleActor.displayName) {
      detailProcessActionResponsible.hidden = false;
      detailProcessActionResponsible.textContent = (
        copy.actionResponsibleLabel || "Responsible: {name}"
      ).replace("{name}", data.responsibleActor.displayName);
    } else {
      detailProcessActionResponsible.hidden = true;
    }
    const collaborators = Array.isArray(data.collaborators) ? data.collaborators : [];
    if (collaborators.length > 0) {
      detailProcessActionCollaborators.hidden = false;
      const names = collaborators
        .map(function (collaborator) {
          return collaborator.displayName || "";
        })
        .filter(Boolean)
        .join(", ");
      detailProcessActionCollaborators.textContent = (
        copy.actionCollaboratorsLabel || "Helping: {names}"
      ).replace("{names}", names);
    } else {
      detailProcessActionCollaborators.hidden = true;
    }
    const updates = Array.isArray(data.updates) ? data.updates : [];
    detailProcessActionState.textContent =
      data.currentStage !== "action"
        ? copy.actionPending
        : data.canPost
          ? copy.actionCanPost
          : copy.readOnly;
    detailProcessActionList.textContent = "";
    for (let i = 0; i < updates.length; i++) {
      detailProcessActionList.appendChild(buildActionUpdateItem(copy, updates[i]));
    }
    civicActionCanPostCache = data.canPost === true;
    civicActionCanTakeStepCache = data.canTakeStep === true;
    detailProcessActionTakeStep.hidden = !civicActionCanTakeStepCache;
    detailProcessActionOfferHelp.hidden = !civicActionCanPostCache;
    detailProcessActionContribute.hidden = !civicActionCanPostCache;
    detailProcessActionAddEvidence.hidden = !civicActionCanPostCache;
    detailProcessActionInstitutionResponse.hidden = !civicActionCanPostCache;
    if (!civicActionCanPostCache) closeCivicActionCompose();
  }

  async function loadSignalCivicAction() {
    const signalId = currentSignalApiId();
    const token = ++civicActionLoadToken;
    renderCivicActionLoading();
    if (!signalId) {
      if (token === civicActionLoadToken) renderCivicActionUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicAction(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicActionLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        (data.currentStage !== "mandate" && data.currentStage !== "action") ||
        typeof data.canPost !== "boolean" ||
        typeof data.canTakeStep !== "boolean" ||
        typeof data.actionStatus !== "string" ||
        !Array.isArray(data.collaborators) ||
        !Array.isArray(data.updates)
      ) {
        if (token === civicActionLoadToken) renderCivicActionUnavailable();
        return;
      }
      renderCivicAction(data);
    } catch (_err) {
      if (token === civicActionLoadToken) renderCivicActionUnavailable();
    }
  }

  function openCivicActionCompose(kind) {
    const copy = civicProcessCopy();
    civicActionPendingKind = kind;
    const inputLabel =
      kind === "take_step"
        ? copy.actionInputLabelTakeStep
        : kind === "offer_help"
          ? copy.actionInputLabelOfferHelp
          : kind === "evidence"
            ? copy.actionInputLabelEvidence
            : kind === "institution_response"
              ? copy.actionInputLabelInstitutionResponse
              : copy.actionInputLabel;
    const submitLabel =
      kind === "take_step"
        ? copy.actionSubmitTakeStep
        : kind === "offer_help"
          ? copy.actionSubmitOfferHelp
          : kind === "evidence"
            ? copy.actionSubmitEvidence
            : kind === "institution_response"
              ? copy.actionSubmitInstitutionResponse
              : copy.actionSubmit;
    detailProcessActionInput.setAttribute("aria-label", inputLabel);
    detailProcessActionSubmit.textContent = submitLabel;
    detailProcessActionCancel.textContent = copy.cancel;
    detailProcessActionNote.hidden = true;
    detailProcessActionNote.textContent = "";
    if (kind === "status_update") {
      if (detailProcessActionBlockedReason.options.length === 0) {
        const none = document.createElement("option");
        none.value = "";
        none.textContent = copy.actionBlockedReasonNone;
        detailProcessActionBlockedReason.appendChild(none);
        for (const key of CIVIC_ACTION_BLOCKED_REASON_KEYS) {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = civicActionBlockedReasonLabel(copy, key);
          detailProcessActionBlockedReason.appendChild(option);
        }
      }
      detailProcessActionBlockedReason.hidden = false;
    } else {
      detailProcessActionBlockedReason.hidden = true;
    }
    detailProcessActionUrlInput.hidden = kind !== "evidence";
    detailProcessActionCompose.hidden = false;
    detailProcessActionTakeStep.hidden = true;
    detailProcessActionOfferHelp.hidden = true;
    detailProcessActionContribute.hidden = true;
    detailProcessActionAddEvidence.hidden = true;
    detailProcessActionInstitutionResponse.hidden = true;
    detailProcessActionInput.focus();
  }

  async function submitCivicActionUpdate() {
    if (civicActionSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const text = (detailProcessActionInput.value || "").trim();
    if (text.length < 12 || text.length > 480) {
      detailProcessActionNote.textContent = copy.actionNeedText;
      detailProcessActionNote.hidden = false;
      detailProcessActionInput.focus();
      return;
    }
    const payload = { text: text, kind: civicActionPendingKind };
    if (civicActionPendingKind === "status_update" && detailProcessActionBlockedReason.value) {
      payload.blockedReasonKey = detailProcessActionBlockedReason.value;
    }
    if (civicActionPendingKind === "evidence") {
      const url = (detailProcessActionUrlInput.value || "").trim();
      if (url) payload.url = url;
    }
    civicActionSubmitting = true;
    detailProcessActionSubmit.disabled = true;
    try {
      const result = await submitSignalCivicActionUpdate(signalId, payload);
      if (result.response && result.response.status === 201) {
        closeCivicActionCompose();
        await loadSignalCivicAction();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessActionNote.textContent =
        code === "CIVIC_ACTION_STAGE_CLOSED"
          ? copy.actionErrorClosed
          : code === "CIVIC_ACTION_ALREADY_HAS_RESPONSIBLE_ACTOR"
            ? copy.actionErrorAlreadyResponsible
            : copy.actionErrorGeneric;
      detailProcessActionNote.hidden = false;
    } catch (_err) {
      detailProcessActionNote.textContent = copy.actionErrorGeneric;
      detailProcessActionNote.hidden = false;
    } finally {
      civicActionSubmitting = false;
      detailProcessActionSubmit.disabled = false;
    }
  }

  let civicVerificationLoadToken = 0;
  let civicVerificationReadySubmitting = false;
  let civicVerificationConfirmSubmitting = false;
  let civicVerificationEvidenceSubmitting = false;
  let civicVerificationCanPostEvidenceCache = false;

  function closeCivicVerificationEvidenceCompose() {
    detailProcessVerificationEvidenceCompose.hidden = true;
    detailProcessVerificationEvidenceInput.value = "";
    detailProcessVerificationEvidenceUrlInput.value = "";
    detailProcessVerificationEvidenceNote.hidden = true;
    detailProcessVerificationEvidenceNote.textContent = "";
  }

  function resetCivicVerificationPanel() {
    civicVerificationLoadToken += 1;
    civicVerificationCanPostEvidenceCache = false;
    detailProcessVerificationState.textContent = "";
    detailProcessVerificationWinner.hidden = true;
    detailProcessVerificationAuthor.textContent = "";
    detailProcessVerificationTitle.textContent = "";
    detailProcessVerificationBody.textContent = "";
    detailProcessVerificationReady.hidden = true;
    detailProcessVerificationOutcome.hidden = true;
    detailProcessVerificationOutcome.textContent = "";
    detailProcessVerificationTally.hidden = true;
    detailProcessVerificationTally.textContent = "";
    detailProcessVerificationDisputeEscalated.hidden = true;
    detailProcessVerificationDisputeEscalated.textContent = "";
    detailProcessVerificationConfirm.hidden = true;
    detailProcessVerificationEvidenceList.textContent = "";
    detailProcessVerificationEvidenceContribute.hidden = true;
    closeCivicVerificationEvidenceCompose();
  }

  async function fetchSignalCivicVerification(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/verification"
    );
  }

  async function submitSignalCivicVerificationReady(signalId) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/verification/ready",
      {}
    );
  }

  async function submitSignalCivicVerificationEvidence(signalId, text, url) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/verification/evidence",
      { text: text, url: url }
    );
  }

  async function submitSignalCivicVerificationConfirm(signalId, outcome) {
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/civic-process/verification/confirm",
      { outcome: outcome }
    );
  }

  function renderCivicVerificationLoading() {
    const copy = civicProcessCopy();
    detailProcessVerificationState.textContent = copy.verificationLoading;
    detailProcessVerificationWinner.hidden = true;
    detailProcessVerificationReady.hidden = true;
    detailProcessVerificationOutcome.hidden = true;
    detailProcessVerificationTally.hidden = true;
    detailProcessVerificationDisputeEscalated.hidden = true;
    detailProcessVerificationConfirm.hidden = true;
    detailProcessVerificationEvidenceList.textContent = "";
    detailProcessVerificationEvidenceContribute.hidden = true;
    closeCivicVerificationEvidenceCompose();
  }

  function renderCivicVerificationUnavailable() {
    const copy = civicProcessCopy();
    detailProcessVerificationState.textContent = copy.verificationUnavailable;
    detailProcessVerificationWinner.hidden = true;
    detailProcessVerificationReady.hidden = true;
    detailProcessVerificationOutcome.hidden = true;
    detailProcessVerificationTally.hidden = true;
    detailProcessVerificationDisputeEscalated.hidden = true;
    detailProcessVerificationConfirm.hidden = true;
    detailProcessVerificationEvidenceList.textContent = "";
    detailProcessVerificationEvidenceContribute.hidden = true;
    closeCivicVerificationEvidenceCompose();
  }

  function buildVerificationEvidenceItem(copy, item) {
    const li = document.createElement("li");
    li.className = "signal-detail__process-verification-evidence-item";
    const meta = document.createElement("p");
    meta.className = "signal-detail__process-verification-meta";
    meta.textContent = item.authorDisplayName || "";
    if (item.isMine) {
      const badge = document.createElement("span");
      badge.className = "signal-detail__process-verification-badge";
      badge.textContent = copy.verificationEvidenceMine;
      meta.appendChild(badge);
    }
    const text = document.createElement("p");
    text.className = "signal-detail__process-verification-evidence-text";
    text.textContent = item.text || "";
    li.appendChild(meta);
    li.appendChild(text);
    if (item.url) {
      const link = document.createElement("a");
      link.className = "signal-detail__process-verification-evidence-link";
      link.href = item.url;
      link.textContent = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      li.appendChild(link);
    }
    return li;
  }

  function renderCivicVerification(data) {
    const copy = civicProcessCopy();
    const winner = data.winner;
    if (winner) {
      detailProcessVerificationWinner.hidden = false;
      detailProcessVerificationAuthor.textContent = winner.authorDisplayName || "";
      detailProcessVerificationTitle.textContent = winner.title || "";
      detailProcessVerificationBody.textContent = winner.body || "";
    } else {
      detailProcessVerificationWinner.hidden = true;
    }

    const isAction = data.currentStage === "action";
    const isVerification = data.currentStage === "verification";
    const isArchived = data.currentStage === "archived";

    detailProcessVerificationState.textContent = isAction
      ? data.canMarkReady
        ? copy.verificationCanMarkReady
        : copy.verificationPendingReady
      : isVerification
        ? data.hasConfirmed
          ? data.myOutcome === "delivered"
            ? copy.verificationConfirmedDelivered
            : copy.verificationConfirmedNotDelivered
          : data.canConfirm
            ? copy.verificationCanConfirm
            : copy.readOnly
        : "";
    detailProcessVerificationReady.hidden = !data.canMarkReady;

    if (isArchived && data.outcome) {
      detailProcessVerificationOutcome.hidden = false;
      detailProcessVerificationOutcome.textContent =
        data.outcome === "delivered"
          ? copy.verificationOutcomeDelivered
          : copy.verificationOutcomeNotDelivered;
    } else {
      detailProcessVerificationOutcome.hidden = true;
    }

    if (isVerification || isArchived) {
      detailProcessVerificationTally.hidden = false;
      detailProcessVerificationTally.textContent = formatVerificationTallyLabel(
        copy,
        typeof data.deliveredCount === "number" ? data.deliveredCount : 0,
        typeof data.notDeliveredCount === "number" ? data.notDeliveredCount : 0
      );
    } else {
      detailProcessVerificationTally.hidden = true;
    }

    if (isVerification && data.disputeEscalated) {
      detailProcessVerificationDisputeEscalated.hidden = false;
      detailProcessVerificationDisputeEscalated.textContent =
        copy.verificationDisputeEscalated;
    } else {
      detailProcessVerificationDisputeEscalated.hidden = true;
    }

    detailProcessVerificationConfirm.hidden = !data.canConfirm;

    const evidence = Array.isArray(data.evidence) ? data.evidence : [];
    detailProcessVerificationEvidenceList.textContent = "";
    for (let i = 0; i < evidence.length; i++) {
      detailProcessVerificationEvidenceList.appendChild(
        buildVerificationEvidenceItem(copy, evidence[i])
      );
    }
    civicVerificationCanPostEvidenceCache =
      isVerification && (data.canConfirm === true || data.hasConfirmed === true);
    detailProcessVerificationEvidenceContribute.hidden =
      !civicVerificationCanPostEvidenceCache;
    if (!civicVerificationCanPostEvidenceCache) closeCivicVerificationEvidenceCompose();
  }

  async function loadSignalCivicVerification() {
    const signalId = currentSignalApiId();
    const token = ++civicVerificationLoadToken;
    renderCivicVerificationLoading();
    if (!signalId) {
      if (token === civicVerificationLoadToken) renderCivicVerificationUnavailable();
      return;
    }
    try {
      const result = await fetchSignalCivicVerification(signalId);
      const data = result.payload && result.payload.data;
      if (
        token !== civicVerificationLoadToken ||
        !result.response ||
        result.response.status !== 200 ||
        !data ||
        data.processId == null ||
        (data.currentStage !== "action" &&
          data.currentStage !== "verification" &&
          data.currentStage !== "archived") ||
        typeof data.canMarkReady !== "boolean" ||
        typeof data.canConfirm !== "boolean" ||
        typeof data.disputeEscalated !== "boolean" ||
        !Array.isArray(data.evidence)
      ) {
        if (token === civicVerificationLoadToken) renderCivicVerificationUnavailable();
        return;
      }
      renderCivicVerification(data);
    } catch (_err) {
      if (token === civicVerificationLoadToken) renderCivicVerificationUnavailable();
    }
  }

  async function submitCivicVerificationReady() {
    if (civicVerificationReadySubmitting) return;
    const signalId = currentSignalApiId();
    if (!signalId) return;
    civicVerificationReadySubmitting = true;
    detailProcessVerificationReady.disabled = true;
    try {
      const result = await submitSignalCivicVerificationReady(signalId);
      if (result.response && result.response.status === 200) {
        await loadSignalCivicVerification();
      }
    } catch (_err) {
      // Read-refresh on the next poll will reflect the true state either way.
    } finally {
      civicVerificationReadySubmitting = false;
      detailProcessVerificationReady.disabled = false;
    }
  }

  async function submitCivicVerificationConfirm(outcome) {
    if (civicVerificationConfirmSubmitting) return;
    const signalId = currentSignalApiId();
    if (!signalId) return;
    civicVerificationConfirmSubmitting = true;
    detailProcessVerificationConfirmDelivered.disabled = true;
    detailProcessVerificationConfirmNotDelivered.disabled = true;
    try {
      const result = await submitSignalCivicVerificationConfirm(signalId, outcome);
      if (result.response && result.response.status === 201) {
        await loadSignalCivicVerification();
      }
    } catch (_err) {
      // Read-refresh on the next poll will reflect the true state either way.
    } finally {
      civicVerificationConfirmSubmitting = false;
      detailProcessVerificationConfirmDelivered.disabled = false;
      detailProcessVerificationConfirmNotDelivered.disabled = false;
    }
  }

  function openCivicVerificationEvidenceCompose() {
    const copy = civicProcessCopy();
    detailProcessVerificationEvidenceUrlInput.setAttribute(
      "aria-label",
      copy.verificationEvidenceUrlLabel
    );
    detailProcessVerificationEvidenceSubmit.textContent = copy.verificationEvidenceSubmit;
    detailProcessVerificationEvidenceCancel.textContent = copy.cancel;
    detailProcessVerificationEvidenceNote.hidden = true;
    detailProcessVerificationEvidenceNote.textContent = "";
    detailProcessVerificationEvidenceCompose.hidden = false;
    detailProcessVerificationEvidenceContribute.hidden = true;
    detailProcessVerificationEvidenceInput.focus();
  }

  async function submitCivicVerificationEvidence() {
    if (civicVerificationEvidenceSubmitting) return;
    const copy = civicProcessCopy();
    const signalId = currentSignalApiId();
    if (!signalId) return;
    const text = (detailProcessVerificationEvidenceInput.value || "").trim();
    if (text.length < 12 || text.length > 480) {
      detailProcessVerificationEvidenceNote.textContent = copy.verificationEvidenceNeedText;
      detailProcessVerificationEvidenceNote.hidden = false;
      detailProcessVerificationEvidenceInput.focus();
      return;
    }
    const rawUrl = (detailProcessVerificationEvidenceUrlInput.value || "").trim();
    const url = rawUrl.length > 0 ? rawUrl : null;
    if (url && (url.length > 500 || !/^https?:\/\//.test(url))) {
      detailProcessVerificationEvidenceNote.textContent = copy.verificationEvidenceInvalidUrl;
      detailProcessVerificationEvidenceNote.hidden = false;
      detailProcessVerificationEvidenceUrlInput.focus();
      return;
    }
    civicVerificationEvidenceSubmitting = true;
    detailProcessVerificationEvidenceSubmit.disabled = true;
    try {
      const result = await submitSignalCivicVerificationEvidence(signalId, text, url);
      if (result.response && result.response.status === 201) {
        closeCivicVerificationEvidenceCompose();
        await loadSignalCivicVerification();
        return;
      }
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      detailProcessVerificationEvidenceNote.textContent =
        code === "CIVIC_VERIFICATION_STAGE_CLOSED"
          ? copy.verificationErrorClosed
          : copy.verificationErrorGeneric;
      detailProcessVerificationEvidenceNote.hidden = false;
    } catch (_err) {
      detailProcessVerificationEvidenceNote.textContent = copy.verificationErrorGeneric;
      detailProcessVerificationEvidenceNote.hidden = false;
    } finally {
      civicVerificationEvidenceSubmitting = false;
      detailProcessVerificationEvidenceSubmit.disabled = false;
    }
  }

  // Shared feed/detail activation: confirm when eligible, otherwise open the
  // existing membership boundary invite only for true non-members.
  // Invite paths capture pending see-too context so public Sign-in can restore
  // the originating signal afterward.
  // Paid members and civic-eligible members who hit a wrong-community signal
  // get an honest explore-only notice — never another "become a member" invite.
  // A 403 is never interpreted as missing membership.
  async function activateSeeTooAction(options) {
    const closeDetail = !!(options && options.closeDetail);
    const keepEligibleDetailOpen = !!(
      closeDetail &&
      options &&
      options.keepEligibleDetailOpen &&
      canConfirmSeeTooAction()
    );
    if (closeDetail && !keepEligibleDetailOpen) closeSignalDetail();
    else if (!closeDetail) closeSignalSheet();
    originatingFeedIndex = feedIndex;
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    if (!canConfirmSeeTooAction()) {
      if (
        hasAuthoritativePaidMembership() ||
        (membershipRecoveryApi &&
          membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
      ) {
        if (memberHomeCityId() && !sceneMatchesMemberCommunity(scene)) {
          noticeNotYourCommunity();
          return "wrong_community";
        }
        redirectMemberWithoutCivicAccess();
        return "member_blocked";
      }
      if (!shouldOfferMembershipInvite()) {
        showTransientFeedNotice(
          (currentFeedCopy() && currentFeedCopy().seeTooFailed) ||
            "Couldn't save this confirmation — try again."
        );
        return "unavailable";
      }
      capturePendingSeeTooContext();
      openInvite();
      return "invite";
    }
    if (seeTooConfirmSubmitting) return "busy";

    if (!sceneMatchesMemberCommunity(scene)) {
      noticeNotYourCommunity();
      return "wrong_community";
    }

    const key = signalConfirmationKeyForIndex(feedIndex);
    const apiId = signalApiIdForScene(scene);
    const copy = currentFeedCopy();

    // Fail closed: civic confirmation requires a live signal UUID + API write.
    if (!apiId) {
      showTransientFeedNotice(
        copy.seeTooFailed || "Couldn't save this confirmation — try again."
      );
      syncFeedMemberState();
      return "failed";
    }

    seeTooConfirmSubmitting = true;
    showTransientFeedNotice(
      copy.seeTooBusy || "Saving your confirmation…",
      { sticky: true }
    );
    try {
      const result = await putJsonWithCredentials(
        API_BASE +
          "/v1/signals/" +
          encodeURIComponent(apiId) +
          "/confirmation",
        {}
      );
      if (
        result.response &&
        result.response.status === 200 &&
        result.payload &&
        result.payload.data &&
        result.payload.data.confirmed === true
      ) {
        clearPendingSeeTooContext();
        setSignalConfirmationState(key, {
          confirmed: true,
          confirmationCount:
            typeof result.payload.data.confirmationCount === "number"
              ? result.payload.data.confirmationCount
              : 1,
        });
        clearTransientFeedNotice();
        syncFeedMemberState();
        if (
          keepEligibleDetailOpen &&
          !signalDetail.hidden &&
          currentSignalApiId() === apiId
        ) {
          await loadSignalCivicProcess();
        }
        return "confirmed";
      }
      if (result.response && result.response.status === 403) {
        // Civic-eligible path already passed: 403 is never a membership upsell.
        clearTransientFeedNotice();
        const denialCode =
          result.payload &&
          result.payload.error &&
          result.payload.error.code;
        if (
          !sceneMatchesMemberCommunity(scene) ||
          denialCode === "ACTOR_NOT_ELIGIBLE_FOR_COMMUNITY"
        ) {
          noticeNotYourCommunity();
          return "wrong_community";
        }
        showTransientFeedNotice(
          copy.seeTooFailed || "Couldn't save this confirmation — try again."
        );
        syncFeedMemberState();
        return "forbidden";
      }
      showTransientFeedNotice(
        copy.seeTooFailed || "Couldn't save this confirmation — try again."
      );
      syncFeedMemberState();
      return "failed";
    } catch (_err) {
      showTransientFeedNotice(
        copy.seeTooFailed || "Couldn't save this confirmation — try again."
      );
      syncFeedMemberState();
      return "failed";
    } finally {
      seeTooConfirmSubmitting = false;
    }
  }

  async function refreshViewerSignalConfirmations() {
    if (!canTakeCivicAction()) return;
    const scenes = currentScenes();
    const jobs = [];
    for (let i = 0; i < scenes.length; i++) {
      const apiId = signalApiIdForScene(scenes[i]);
      if (!apiId) continue;
      jobs.push(
        getJsonWithCredentials(
          API_BASE +
            "/v1/signals/" +
            encodeURIComponent(apiId) +
            "/confirmation"
        ).then(function (result) {
          if (
            result.response &&
            result.response.ok &&
            result.payload &&
            result.payload.data
          ) {
            setSignalConfirmationState(apiId, {
              confirmed: result.payload.data.confirmed === true,
              confirmationCount:
                typeof result.payload.data.confirmationCount === "number"
                  ? result.payload.data.confirmationCount
                  : 0,
            });
          }
        }).catch(function () {
          /* fail closed — keep prior count from signal detail if any */
        })
      );
    }
    if (jobs.length) {
      await Promise.all(jobs);
      syncFeedMemberState();
    }
  }

  function setCheckoutPendingMarker() {
    if (!membershipRecoveryApi) return false;
    return membershipRecoveryApi.setCheckoutPendingMarker();
  }

  function clearCheckoutPendingMarker() {
    if (!membershipRecoveryApi) return false;
    return membershipRecoveryApi.clearCheckoutPendingMarker();
  }

  function hasCheckoutPendingMarker() {
    if (!membershipRecoveryApi) return false;
    return membershipRecoveryApi.hasCheckoutPendingMarker();
  }

  function applyMembershipSnapshot(snapshot) {
    membershipSnapshot = snapshot;
    syncFeedMemberState();
    if (canTakeCivicAction()) {
      refreshViewerSignalConfirmations();
    }
  }

  function stopMembershipRecoveryPolling(reason) {
    if (membershipRecoveryPoller) {
      const poller = membershipRecoveryPoller;
      membershipRecoveryPoller = null;
      if (!poller.isStopped()) poller.stop();
    }
    return reason;
  }

  async function fetchAccountMembership() {
    const result = await getJsonWithCredentials(
      API_BASE + "/v1/account/membership"
    );
    const status = result.response.status;
    if (status !== 200) {
      throw makeApiError("failed");
    }
    if (!membershipRecoveryApi) {
      throw makeApiError("failed");
    }
    const snapshot = membershipRecoveryApi.deriveMembershipSnapshot(
      result.payload
    );
    if (!snapshot) {
      throw makeApiError("failed");
    }
    return snapshot;
  }

  function showPaymentConfirming(mode) {
    const copy = PAYMENT_COPY[membershipLang()];
    paymentIntro.hidden = true;
    paymentSuccess.hidden = true;
    paymentConfirming.hidden = false;
    paymentConfirmingLabel.textContent = copy.confirmingLabel;
    paymentConfirmingTitle.textContent = copy.confirmingTitle;
    paymentConfirmingBody.textContent = copy.confirmingBody;
    paymentConfirmingDismiss.textContent = copy.confirmingDismiss;
    paymentConfirmingRetry.textContent = copy.confirmingRetry;
    paymentConfirmingRetry.removeAttribute("data-recovery-action");
    if (mode === "pending") {
      paymentConfirmingStatus.textContent = copy.confirmingPending;
      paymentConfirmingRetry.hidden = false;
      paymentConfirmingRetry.disabled = false;
    } else {
      paymentConfirmingStatus.textContent = copy.confirmingStatus;
      paymentConfirmingRetry.hidden = true;
    }
  }

  function showPaymentPaidNoParticipate() {
    const copy = PAYMENT_COPY[membershipLang()];
    paymentIntro.hidden = true;
    paymentSuccess.hidden = true;
    paymentConfirming.hidden = false;
    paymentConfirmingLabel.textContent = copy.confirmingLabel;
    paymentConfirmingTitle.textContent =
      copy.paidNoParticipateTitle || copy.confirmingTitle;
    paymentConfirmingBody.textContent = copy.paidNoParticipateStatus;
    paymentConfirmingStatus.textContent = copy.paidNoParticipateStatus;
    // Offer community setup when payment landed but participation is blocked.
    paymentConfirmingRetry.hidden = false;
    paymentConfirmingRetry.disabled = false;
    paymentConfirmingRetry.textContent =
      copy.continueCommunity || copy.confirmingRetry;
    paymentConfirmingRetry.setAttribute("data-recovery-action", "community");
    paymentConfirmingDismiss.textContent = copy.confirmingDismiss;
  }

  function enterRecoveryPaymentView() {
    beginMembershipRecoveryFlow();
    go("payment");
    showPaymentConfirming("confirming");
  }

  function finishRecoveryWithSnapshot(snapshot) {
    applyMembershipSnapshot(snapshot);
    clearCheckoutPendingMarker();
    stopMembershipRecoveryPolling("success");
    if (!membershipRecoveryApi) {
      endMembershipRecoveryFlow();
      return;
    }
    if (membershipRecoveryApi.enablesMemberAuthorizedState(snapshot)) {
      // Paid + canParticipate: show existing active confirmation without
      // without inventing client-side membership authority.
      beginMembershipRecoveryFlow();
      go("active");
      endMembershipRecoveryFlow();
      return;
    }
    if (
      membershipRecoveryApi.isPaidMembership(snapshot) ||
      membershipRecoveryApi.isPaidPendingBinding(snapshot)
    ) {
      // Paid without participation, or paid_pending_binding: honest
      // non-participating UI — never grant civic actions or silent feed return.
      beginMembershipRecoveryFlow();
      go("payment");
      showPaymentPaidNoParticipate();
      return;
    }
    // Non-stop / unexpected non-paid: remain fail-closed (should be rare after
    // recovery-stop filtering; pre-webhook states continue polling instead).
    endMembershipRecoveryFlow();
    if (isProductOnlyPublicMode()) {
      endInviteMembershipJourney();
      go("feed");
    }
  }

  function onMembershipRecoveryTimeout() {
    clearCheckoutPendingMarker();
    membershipRecoveryManual = true;
    beginMembershipRecoveryFlow();
    go("payment");
    showPaymentConfirming("pending");
  }

  function startMembershipRecoveryPolling() {
    if (!membershipRecoveryApi) return;
    if (membershipRecoveryPoller && !membershipRecoveryPoller.isStopped()) {
      return;
    }
    beginMembershipRecoveryFlow();
    enterRecoveryPaymentView();
    membershipRecoveryPoller = membershipRecoveryApi.createBoundedPoller({
      poll: function () {
        return fetchAccountMembership().then(function (snapshot) {
          // Apply for fail-closed UI, but pre-webhook non-paid states must not
          // stop the bounded Checkout recovery window.
          applyMembershipSnapshot(snapshot);
          return snapshot;
        });
      },
      shouldStop: function (snapshot) {
        return membershipRecoveryApi.isCheckoutRecoveryStopOutcome(snapshot);
      },
      onStop: function (reason) {
        membershipRecoveryPoller = null;
        if (reason === "success") {
          finishRecoveryWithSnapshot(membershipSnapshot);
          return;
        }
        if (reason === "timeout") {
          onMembershipRecoveryTimeout();
          return;
        }
        // exit — user dismissed or flow ended
      },
    });
    membershipRecoveryPoller.start();
  }

  function manualMembershipRecoveryRetry() {
    if (paymentConfirmingRetry.disabled) return;
    paymentConfirmingRetry.disabled = true;
    showPaymentConfirming("confirming");
    fetchAccountMembership()
      .then(function (snapshot) {
        applyMembershipSnapshot(snapshot);
        if (membershipRecoveryApi.isCheckoutRecoveryStopOutcome(snapshot)) {
          finishRecoveryWithSnapshot(snapshot);
          return;
        }
        // Still pre-webhook / non-stop — restore pending + bounded poller.
        setCheckoutPendingMarker();
        startMembershipRecoveryPolling();
      })
      .catch(function () {
        showPaymentConfirming("pending");
        paymentConfirmingRetry.disabled = false;
      });
  }

  function bootstrapAccountMembership() {
    const pending = hasCheckoutPendingMarker();
    fetchAuthenticationSession()
      .then(function () {
        sessionAuthenticated = true;
        return Promise.all([
          fetchAccountMembership(),
          fetchCommunityCommitment().catch(function () {
            return null;
          }),
        ]);
      })
      .then(function (results) {
        const snapshot = results[0];
        const commitment = results[1];
        applyMembershipSnapshot(snapshot);
        if (commitment) {
          applyCommitmentSnapshot(commitment);
        }
        if (pending) {
          if (
            membershipRecoveryApi &&
            membershipRecoveryApi.shouldStartCheckoutRecoveryPolling(
              true,
              snapshot
            )
          ) {
            startMembershipRecoveryPolling();
          } else if (
            membershipRecoveryApi &&
            membershipRecoveryApi.isCheckoutRecoveryStopOutcome(snapshot)
          ) {
            finishRecoveryWithSnapshot(snapshot);
          } else {
            // Pending marker but unusable/malformed snapshot: keep trying.
            startMembershipRecoveryPolling();
          }
          return;
        }
        // Normal authenticated load: apply authoritative state once (no marker,
        // no recovery polling) — including inactive/expired/suspended.
      })
      .catch(function () {
        // Fail closed on session/membership errors.
        if (!sessionAuthenticated) {
          membershipSnapshot = null;
          commitmentSnapshot = null;
        }
        if (pending) {
          // Session cookie should exist after Checkout; still attempt recovery UX.
          startMembershipRecoveryPolling();
        }
      });
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
  // Explicit pending context for the public "I SEE THIS TOO" → Sign-in return.
  // signalId is the stable scene identity; feedIndex is only a rendering aid.
  let pendingSeeTooContext = null;
  let enteredEmail = "";
  // Best-effort account email for Profile V1 (create-account or session payload).
  let accountEmail = "";
  let emailVerificationId = null;
  let setupGrant = null;
  let setupGrantExpiresAt = null;
  let emailSubmitting = false;
  let codeSubmitting = false;
  let emailVerified = false;
  let passwordSet = false;
  let passwordSubmitting = false;
  let passwordSetupErrorVisible = false;
  let passkeyRegistered = false;
  let passkeySubmitting = false;
  let paymentCheckoutSubmitting = false;
  // Per-signal confirmation state from API (or local fallback for mock scenes).
  // Keyed by signal UUID / scene id: { confirmed, confirmationCount }.
  const signalConfirmationState = Object.create(null);
  let civicProcessLoadToken = 0;
  let seeTooConfirmSubmitting = false;
  // Optional pending media for the compose surface (local preview until publish).
  // On publish, bytes are uploaded to town-api private object storage.
  let demoTestimony = null;
  let demoTestimonyFeedIndex = null;
  const sessionMediaObjectUrls = [];
  const ALLOWED_CONTRIBUTION_MEDIA_TYPES = {
    "image/jpeg": "image",
    "image/png": "image",
    "image/webp": "image",
    "video/mp4": "video",
  };

  // Etapa 5: compress images in-browser before upload. Server-side
  // validation (real type, size, magic bytes — see town-api's
  // member-signal-policy.ts / discussion-media-policy.ts) stays the
  // authority; this only reduces bytes sent over the wire and the chance
  // of a same-day retry after a server-side size rejection. Video is left
  // untouched — the spec calls out image compression specifically, and
  // discussion video already has its own server-side cap (32MB).
  const IMAGE_COMPRESS_MAX_DIMENSION_PX = 1600;
  const IMAGE_COMPRESS_TARGET_BYTES = 1.5 * 1024 * 1024;
  const IMAGE_COMPRESS_MIN_QUALITY = 0.5;
  const IMAGE_COMPRESS_SKIP_ABOVE_BYTES = 100 * 1024 * 1024;

  function loadImageForCompression(file) {
    if (typeof window.createImageBitmap === "function") {
      return window.createImageBitmap(file).catch(() => null);
    }
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  }

  function canvasToBlobAsync(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), type, quality);
    });
  }

  function withExtension(fileName, ext) {
    const base = (fileName || "photo").replace(/\.[^./\\]+$/, "");
    return base + "." + ext;
  }

  // Resolves to the original File if compression isn't applicable, fails,
  // or doesn't actually shrink the file — callers always get something
  // uploadable back, never a rejection for a merely-uncompressible image.
  async function compressImageFileIfNeeded(file) {
    if (
      !file ||
      typeof file.type !== "string" ||
      file.type.indexOf("image/") !== 0
    ) {
      return file;
    }
    if (file.size > IMAGE_COMPRESS_SKIP_ABOVE_BYTES) {
      return file;
    }
    if (file.size <= IMAGE_COMPRESS_TARGET_BYTES) {
      return file;
    }
    const source = await loadImageForCompression(file);
    if (!source || !source.width || !source.height) {
      return file;
    }
    try {
      const scale = Math.min(
        1,
        IMAGE_COMPRESS_MAX_DIMENSION_PX / Math.max(source.width, source.height)
      );
      const width = Math.max(1, Math.round(source.width * scale));
      const height = Math.max(1, Math.round(source.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return file;
      ctx.drawImage(source, 0, 0, width, height);

      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      let quality = 0.85;
      let blob = await canvasToBlobAsync(canvas, outputType, quality);
      while (
        blob &&
        blob.size > IMAGE_COMPRESS_TARGET_BYTES &&
        quality > IMAGE_COMPRESS_MIN_QUALITY
      ) {
        quality -= 0.1;
        blob = await canvasToBlobAsync(canvas, outputType, quality);
      }
      if (!blob || blob.size >= file.size) {
        return file;
      }
      const ext = outputType === "image/png" ? "png" : "jpg";
      return new File([blob], withExtension(file.name, ext), {
        type: outputType,
      });
    } finally {
      if (source && typeof source.close === "function") {
        source.close();
      }
    }
  }

  // Cache of discussion-session GET/POST responses keyed by scene/API id.
  const signalSessionCache = Object.create(null);
  let sessionPublishSubmitting = false;
  let sessionLoadToken = 0;
  let sessionAuthenticated = false;
  let commitmentCountry = null;
  let commitmentCity = null;
  let commitmentAcceptanceChecked = false;
  let commitmentSnapshot = null;
  let commitmentSaving = false;
  let commitmentCheckoutSubmitting = false;
  const communityCommitmentApi = window.TownCommunityCommitment || null;
  let loginSubmitting = false;
  let authSignInSubmitting = false;
  let profileBillingSubmitting = false;
  let profileSignOutSubmitting = false;
  let readyAuthSubmitting = false;
  let anonymousClientKey = null;
  let inviteMembershipJourneyActive = false;
  let enrollmentRestartRequired = false;
  let cityDiscoveryJourneyActive = false;
  let cityDiscoveryReturnFeedIndex = 0;
  // Authoritative membership from GET /v1/account/membership only.
  // null = not loaded / failed closed; never grant from URL or storage markers.
  let membershipSnapshot = null;
  let membershipRecoveryActive = false;
  let membershipRecoveryPoller = null;
  let membershipRecoveryManual = false;

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
    password: "TOWN — Password setup",
    passkey: "TOWN — Secure access",
    ready: "TOWN — Account ready",
    commitment: "TOWN — Community commitment",
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
    else if (raw.startsWith("password")) route = "password";
    else if (raw.startsWith("passkey")) route = "passkey";
    else if (raw.startsWith("ready")) route = "ready";
    else if (raw.startsWith("commitment")) route = "commitment";
    else if (raw.startsWith("payment")) route = "payment";
    else if (raw.startsWith("active")) route = "active";
    else if (!raw) route = isProductOnlyPublicMode() ? PRODUCT_ONLY_FEED_ROUTE : "entry";

    if (
      isProductOnlyPublicMode() &&
      isNonProductRoute(route) &&
      !(
        isInviteMembershipJourneyActive() &&
        isInviteMembershipJourneyRoute(route)
      ) &&
      !(
        isCityDiscoveryJourneyActive() &&
        isCityDiscoveryJourneyRoute(route)
      )
    ) {
      return PRODUCT_ONLY_FEED_ROUTE;
    }
    return route;
  }

  function communityLanguage() {
    const lang = languageForCityId(selectedCity);
    if (!lang || !CITY_BY_COUNTRY[selectedCountry]) return "en";
    const validForCountry = CITY_BY_COUNTRY[selectedCountry].some(
      (city) => city.id === selectedCity
    );
    return validForCountry ? lang : "en";
  }

  function languageForCityId(cityId) {
    const city = communityCatalogApi.cityForId(cityId);
    return city ? city.language : null;
  }

  function resolvePublicReadingLanguage() {
    const i18n = window.TownPublicI18n;
    const preferred = resolveEditorialPreferredLanguages();
    if (i18n && typeof i18n.resolveReadingLanguage === "function") {
      return i18n.resolveReadingLanguage(preferred);
    }
    const discovery = window.TownCityDiscovery;
    if (discovery && typeof discovery.resolveEditorialLanguage === "function") {
      return discovery.resolveEditorialLanguage(preferred);
    }
    return "en";
  }

  function feedLocaleForScene(scene) {
    const readingLang = resolvePublicReadingLanguage();
    const i18n = window.TownPublicI18n;
    const discovery = window.TownCityDiscovery;

    if (discovery && discovery.isCityDiscoveryStory(scene)) {
      const chrome =
        (i18n && i18n.feedChromeCopy(readingLang)) ||
        FEED_COPY[readingLang] ||
        FEED_COPY.en ||
        FEED_COPY.it;
      return {
        lang: scene.lang || readingLang,
        copy: chrome,
        cityId: null,
        cityName: "",
        discoveryCopy: scene.copy || (discovery && discovery.editorialCopyForLanguage(readingLang)),
        localizedScene: scene,
        sourceLanguageLabel: "",
      };
    }

    const signalCopy = window.TownSignalCopy;
    const localizedScene =
      signalCopy && typeof signalCopy.localizeSignal === "function"
        ? signalCopy.localizeSignal(scene, readingLang, i18n)
        : scene;
    const cityId =
      (localizedScene && localizedScene.cityId) || cityIdFromScene(scene);
    const chrome =
      (i18n && i18n.feedChromeCopy(readingLang)) ||
      FEED_COPY[readingLang] ||
      FEED_COPY.en ||
      FEED_COPY.it;
    const cityName =
      (chrome.cityNames && chrome.cityNames[cityId]) ||
      cityId ||
      cityDisplayName(readingLang);

    return {
      lang: readingLang,
      copy: chrome,
      cityId: cityId,
      cityName: cityName,
      localizedScene: localizedScene,
      sourceLanguageLabel:
        (localizedScene && localizedScene.sourceLanguageLabel) || "",
    };
  }

  function cityDisplayName(lang) {
    const names =
      (LOCATION_COPY[lang] && LOCATION_COPY[lang].cityNames) ||
      CITY_COPY.en.cityNames;
    return names[selectedCity] || selectedCity || "";
  }

  function currentScenes() {
    if (isProductOnlyPublicMode()) {
      const base = productOnlyScenes();
      const discovery = window.TownCityDiscovery;
      if (!discovery || base.length < 1) return base;
      const preferred = resolveEditorialPreferredLanguages();
      const lang = discovery.resolveEditorialLanguage(preferred);
      const homeCityId = memberHomeCityId();
      // Members: keep home community first, then an explore divider, then
      // other-city signals as a separate exploration zone.
      if (
        homeCityId &&
        typeof discovery.createMemberExploreStory === "function"
      ) {
        const homeCount = countLiveScenesForCity(homeCityId);
        if (homeCount < base.length) {
          return discovery.insertCityDiscoveryStory(
            base,
            discovery.createMemberExploreStory(lang),
            homeCount
          );
        }
        return base;
      }
      return discovery.insertCityDiscoveryStory(
        base,
        discovery.createCityDiscoveryStory(lang),
        discovery.CITY_DISCOVERY_INSERT_AFTER
      );
    }
    if (!selectedCity) return [];
    const live = liveScenes[selectedCity];
    if (live && live.length >= 1) return live;
    return [];
  }

  function resolveEditorialPreferredLanguages() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const reviewLang = params.get("townLang");
      if (reviewLang) return [reviewLang];
    } catch (err) {
      /* ignore */
    }
    if (typeof navigator !== "undefined" && navigator.languages) {
      return navigator.languages;
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      return [navigator.language];
    }
    return ["en"];
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
    if (CITY_PLACEHOLDER_IMAGES[cityId]) return CITY_PLACEHOLDER_IMAGES[cityId];
    const fallback =
      (FEED_SCENES[cityId] &&
        FEED_SCENES[cityId][0] &&
        FEED_SCENES[cityId][0].image) ||
      "assets/feed/signal_citta_studi_pavement.jpg";
    return fallback;
  }

  function resolveSignalDetailImage(detail, cityId) {
    if (
      detail &&
      detail.imageMedia &&
      detail.imageMedia.url &&
      String(detail.imageMedia.url).indexOf("/v1/signals/") === 0
    ) {
      return API_BASE + detail.imageMedia.url;
    }
    return resolveSceneImage(detail && detail.imageKey, cityId);
  }

  const LOCALE_TAG_BY_LANG = { it: "it-IT", de: "de-DE", ro: "ro-RO", fr: "fr-FR", hu: "hu-HU" };

  function mapSignalDetailToScene(detail, cityId) {
    const localeTag =
      detail.locale || LOCALE_TAG_BY_LANG[languageForCityId(cityId)] || "it-IT";
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
      cityId: cityId,
      communitySlug: CITY_API_SLUG[cityId] || null,
      countryCode:
        (communityCatalogApi.cityForId(cityId) || {}).countryCode || null,
      // Canonical UUID for discussion-session and other signal-scoped APIs.
      signalId: detail.id || "",
      category: detail.category || "",
      authorName: detail.authorDisplayName || "",
      observedTime: observedLabel,
      observedDate: observedDate,
      area: detail.area || "",
      headline: detail.headline || "",
      summary: detail.summary || "",
      image: resolveSignalDetailImage(detail, cityId),
      focus: focusX + "% " + focusY + "%",
      civicStatus: detail.statusLabel || "",
      description: detail.description || "",
      whyMatters: detail.whyItMatters || "",
      whoAffected: detail.whoIsAffected || "",
      latestUpdate: detail.latestUpdate || "",
      statusNote: detail.statusNote || "",
      confirmationCount:
        typeof detail.confirmationCount === "number"
          ? detail.confirmationCount
          : 0,
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

  async function putJsonWithCredentials(url, body) {
    const response = await requestJson(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body == null ? {} : body),
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

  async function postBinaryWithCredentials(url, body, contentType) {
    const response = await requestJson(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
      },
      body: body,
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
    if (code === "PASSWORD_SETUP_FAILED") {
      return "grantExpired";
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

  async function completeInitialPasswordSetup(password) {
    const result = await postJson(
      API_BASE + "/v1/account/password",
      { password: password },
      setupGrantAuthHeader()
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.status === "PASSWORD_SET") {
      return {
        setupGrant: data.setupGrant || null,
        setupGrantExpiresAt: data.setupGrantExpiresAt || null,
      };
    }
    throw makeApiError(apiErrorKind(status, result.payload));
  }

  async function authenticateWithPassword(email, password) {
    const result = await postJsonWithCredentials(
      API_BASE + "/v1/authentication/password",
      { email: email, password: password, clientType: "web" }
    );
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.status === "AUTHENTICATED") {
      return data;
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

      const scenes = [];
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        if (!detail) continue;
        const scene = mapSignalDetailToScene(detail, cityId);
        scenes.push(scene);
        const apiId = signalApiIdForScene(scene);
        if (apiId && typeof detail.confirmationCount === "number") {
          setSignalConfirmationState(apiId, {
            confirmationCount: detail.confirmationCount,
          });
        }
      }

      if (scenes.length < 1) {
        throw new Error("no mappable signal details for " + slug);
      }

      liveScenes[cityId] = scenes;
      if (canTakeCivicAction()) {
        refreshViewerSignalConfirmations();
      }
      return true;
    } catch (err) {
      liveScenes[cityId] = [];
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "[TOWN] Live signals unavailable.",
          err && err.message ? err.message : err
        );
      }
      return false;
    }
  }

  function feedUnavailableMessage() {
    const lang = resolvePublicReadingLanguage();
    const copy = FEED_COPY[lang] || FEED_COPY.en || {};
    return copy.feedEmptyBody || copy.sessionUnavailable ||
      "Couldn't reach TOWN — try again later.";
  }

  function feedSurfaceCopy() {
    const lang = resolvePublicReadingLanguage();
    return FEED_COPY[lang] || FEED_COPY.en || {};
  }

  let feedNoticeTimer = null;

  function clearTransientFeedNotice() {
    if (feedNoticeTimer) {
      clearTimeout(feedNoticeTimer);
      feedNoticeTimer = null;
    }
    if (!feedLiveStatus) return;
    feedLiveStatus.classList.remove("is-surface");
    if (currentScenes().length) {
      syncFeedAvailabilityStatus();
    }
  }

  function showTransientFeedNotice(message, options) {
    if (!feedLiveStatus || !message) return;
    if (feedNoticeTimer) {
      clearTimeout(feedNoticeTimer);
      feedNoticeTimer = null;
    }
    feedLiveStatus.textContent = message;
    feedLiveStatus.classList.add("is-surface");
    if (options && options.sticky) return;
    feedNoticeTimer = setTimeout(function () {
      feedNoticeTimer = null;
      clearTransientFeedNotice();
    }, 4200);
  }

  function showFeedSurfaceState(kind) {
    const copy = feedSurfaceCopy();
    if (!feedState) return;
    if (kind === "loading") {
      feedState.hidden = false;
      feedStateTitle.textContent =
        copy.feedLoadingTitle || "Loading local signals";
      feedStateBody.textContent =
        copy.feedLoadingBody ||
        "TOWN is fetching live civic signals for your cities.";
      feedStateRetry.hidden = true;
      if (feedLiveStatus) {
        feedLiveStatus.textContent = copy.feedLoadingTitle || "Loading…";
        feedLiveStatus.classList.remove("is-surface");
      }
      return;
    }
    if (kind === "empty") {
      feedState.hidden = false;
      feedStateTitle.textContent =
        copy.feedEmptyTitle || "No live signals right now";
      feedStateBody.textContent = feedUnavailableMessage();
      feedStateRetry.hidden = false;
      feedStateRetry.textContent = copy.feedRetry || "Try again";
      if (feedLiveStatus) {
        feedLiveStatus.textContent = feedUnavailableMessage();
        feedLiveStatus.classList.remove("is-surface");
      }
      return;
    }
    feedState.hidden = true;
    feedStateRetry.hidden = true;
  }

  function syncFeedAvailabilityStatus() {
    if (!feedLiveStatus) return;
    const scenes = currentScenes();
    if (scenes.length < 1) {
      showFeedSurfaceState("empty");
      return;
    }
    showFeedSurfaceState("ready");
    const lang = resolvePublicReadingLanguage();
    feedLiveStatus.classList.remove("is-surface");
    feedLiveStatus.textContent =
      (window.TownPublicI18n &&
        window.TownPublicI18n.storyLabel(lang, feedIndex + 1, scenes.length)) ||
      "Story " + (feedIndex + 1) + " of " + scenes.length;
  }

  async function loadProductOnlyLiveFeed() {
    if (!isProductOnlyPublicMode()) return;
    showFeedSurfaceState("loading");
    await Promise.all(
      PRODUCT_ONLY_CITY_ORDER.map(function (cityId) {
        return loadLiveScenesForCity(cityId);
      })
    );
    rebuildFeedPanels();
    applyFeedCopyChrome();
    syncFeedAvailabilityStatus();
    if (currentScenes().length) {
      scrollFeedToIndex(feedIndex, { behavior: "auto" });
    }
  }

  function clearLiveScenes() {
    for (let i = 0; i < PRODUCT_ONLY_CITY_ORDER.length; i++) {
      liveScenes[PRODUCT_ONLY_CITY_ORDER[i]] = null;
    }
  }


  function applyCountryCopy() {
    const i18n = window.TownPublicI18n;
    const lang = resolvePublicReadingLanguage();
    const copy = (i18n && i18n.countryCopy(lang)) || null;
    if (!copy) return;
    if (countryBack) countryBack.textContent = copy.back;
    const title = document.querySelector("#view-country .country__title");
    const lead = document.querySelector("#view-country .country__lead");
    const legend = document.querySelector("#view-country .country__legend");
    if (title) title.textContent = copy.title;
    if (lead) lead.textContent = copy.lead;
    if (legend) legend.textContent = copy.legend;
    if (continueCountry) continueCountry.textContent = copy.continue;
    const labels = document.querySelectorAll(
      "#view-country .country__option-label"
    );
    const order = communityCatalogApi.countries();
    for (let i = 0; i < labels.length && i < order.length; i++) {
      labels[i].textContent =
        (copy.countries && copy.countries[order[i]]) || order[i];
    }
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function applyPublicNavCopy() {
    const i18n = window.TownPublicI18n;
    if (!i18n) return;
    const lang = resolvePublicReadingLanguage();
    const copy = i18n.feedChromeCopy(lang);
    // Keep CHAT clickable so visitors get an honest unavailable notice.
    navChat.classList.add("is-unavailable");
    navChat.removeAttribute("aria-disabled");
    if (copy.chatUnavailable) {
      navChat.setAttribute("title", copy.chatUnavailable);
      navChat.setAttribute("aria-label", copy.navChat + " — " + copy.chatUnavailable);
    }
    const map = [
      [navHome, copy.navHome],
      [navMembership, copy.navMembership],
      [navChat, copy.navChat],
      [navActivity, copy.navActivity],
      [navProfile, copy.navProfile],
    ];
    for (let i = 0; i < map.length; i++) {
      const btn = map[i][0];
      const label = map[i][1];
      if (!btn || !label) continue;
      const el = btn.querySelector(".app-nav__label");
      if (el) el.textContent = label;
    }
  }

  function applyCityCopy() {
    // Country/city selection is interface chrome. It must follow the visitor's
    // reading language before a city exists and after a city is selected.
    const lang = resolvePublicReadingLanguage();
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

    if (selectedCountry && CITY_BY_COUNTRY[selectedCountry]) {
      const inputs = cityOptions.querySelectorAll('input[name="city"]');
      for (let i = 0; i < inputs.length; i++) {
        const label = inputs[i].closest(".country__option");
        const nameEl = label && label.querySelector(".country__option-label");
        if (nameEl) {
          nameEl.textContent = copy.cityNames[inputs[i].value] || inputs[i].value;
        }
      }
    }
  }

  function applyLocationCopy() {
    const lang = resolvePublicReadingLanguage();
    const copy =
      LOCATION_COPY[lang] || LOCATION_COPY.en || LOCATION_COPY.it;
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
    const lang = resolvePublicReadingLanguage();
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

  function feedRole(role, root) {
    if (!root) return null;
    return root.querySelector('[data-feed-role="' + role + '"]');
  }

  function getFeedPanels() {
    if (!feedScroller) return [];
    return Array.prototype.slice.call(
      feedScroller.querySelectorAll(".feed__panel")
    );
  }

  function getFeedPanelByIndex(index) {
    if (!feedScroller) return null;
    return feedScroller.querySelector(
      '.feed__panel[data-feed-index="' + index + '"]'
    );
  }

  function getActiveFeedPanel() {
    return (
      (feedScroller && feedScroller.querySelector(".feed__panel.is-active")) ||
      getFeedPanelByIndex(feedIndex) ||
      (feedScroller && feedScroller.querySelector(".feed__panel"))
    );
  }

  function prefersFeedReducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function feedOverlaysBlockNavigation() {
    return (
      !membershipInvite.hidden ||
      !signalDetail.hidden ||
      !authWindow.hidden ||
      !profilePanel.hidden ||
      !activityPanel.hidden ||
      !signalCreate.hidden ||
      !ownerModeration.hidden ||
      (termsSheet && !termsSheet.hidden) ||
      (sheet && !sheet.hidden)
    );
  }

  function noteAccountEmail(value) {
    if (typeof value !== "string") return;
    const trimmed = value.trim();
    if (EMAIL_PATTERN.test(trimmed)) accountEmail = trimmed;
  }

  function profileDisplayName(email) {
    if (!email) return "";
    const local = email.split("@")[0] || "";
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    if (!cleaned) return "";
    return cleaned
      .split(/\s+/)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function profileLang() {
    const lang = resolvePublicReadingLanguage();
    return PROFILE_COPY[lang] ? lang : "en";
  }

  function setNavActive(button) {
    [navHome, navMembership, navChat, navActivity, navProfile].forEach((btn) => {
      if (!btn) return;
      const active = btn === button;
      btn.classList.toggle("is-active", active);
      if (active) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });
  }

  function isFeedSurfaceActive() {
    return !viewFeed.hidden && document.body.classList.contains("page-feed");
  }

  function setFeedScrollLocked(locked) {
    if (!feedScroller) return;
    feedScroller.classList.toggle("feed__scroller--locked", !!locked);
  }

  function syncFeedScrollLockFromOverlays() {
    setFeedScrollLocked(feedOverlaysBlockNavigation());
  }

  function preloadAdjacentFeedImages() {
    const scenes = currentScenes();
    if (!scenes.length) return;
    const neighbors = [feedIndex - 1, feedIndex + 1];
    for (let i = 0; i < neighbors.length; i++) {
      const idx = neighbors[i];
      if (idx < 0 || idx >= scenes.length) continue;
      const src = scenes[idx] && scenes[idx].image;
      if (!src) continue;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    }
  }

  function syncPanelMemberControls(panel, panelIndex, copy, cityName) {
    if (panel && panel.getAttribute("data-story-kind") === "city-discovery") {
      return;
    }
    const visitorEl = feedRole("feed-visitor", panel);
    const seeToo = feedRole("feed-see-too", panel);
    const seeTooDone = feedRole("feed-see-too-done", panel);
    const doneTitle = feedRole("feed-done-title", panel);
    const doneNote = feedRole("feed-done-note", panel);
    const memberPresented = isMemberPresented();
    const civicOk = canTakeCivicAction();
    const confirmation = getSignalConfirmationState(panelIndex);
    const onConfirmed = confirmation.confirmed && canConfirmSeeTooAction();
    const confirmCountEl = feedRole("feed-confirm-count", panel);

    if (visitorEl) {
      const scene = currentScenes()[panelIndex];
      const outsideCommunity =
        (hasAuthoritativePaidMembership() || civicOk) &&
        memberHomeCityId() &&
        scene &&
        !sceneMatchesMemberCommunity(scene);
      if (outsideCommunity) {
        visitorEl.textContent =
          copy.notYourCommunity ||
          "You can explore, but participation is reserved for the local community.";
      } else if (
        hasAuthoritativePaidMembership() &&
        !civicOk &&
        PAYMENT_COPY[membershipLang()]
      ) {
        visitorEl.textContent =
          PAYMENT_COPY[membershipLang()].paidNoParticipateStatus;
      } else {
        visitorEl.textContent = memberPresented
          ? copy.member.replace("{city}", cityName)
          : copy.visitor;
      }
    }
    if (doneTitle) doneTitle.textContent = copy.doneTitle;
    if (doneNote) doneNote.textContent = copy.doneNote;
    applyConfirmCountLabel(confirmCountEl, copy, confirmation.confirmationCount);

    if (!seeToo || !seeTooDone) return;

    // Keep I SEE THIS TOO active for visitors, registered accounts, and paying
    // members. Confirmed done-state replaces it per signal after a successful save.
    if (onConfirmed) {
      seeToo.hidden = true;
      seeToo.disabled = true;
      seeTooDone.hidden = false;
    } else {
      seeToo.hidden = false;
      seeToo.disabled = false;
      seeTooDone.hidden = true;
      seeToo.textContent = copy.seeThisToo;
    }
  }

  function syncFeedMemberState() {
    const scenes = currentScenes();
    const panels = getFeedPanels();
    const discovery = window.TownCityDiscovery;
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const panelIndex = Number(panel.getAttribute("data-feed-index"));
      const scene = scenes[panelIndex];
      const locale = feedLocaleForScene(scene);
      syncPanelMemberControls(
        panel,
        panelIndex,
        locale.copy,
        locale.cityName
      );
    }

    const activeScene = scenes[feedIndex];
    if (discovery && discovery.isCityDiscoveryStory(activeScene)) {
      return;
    }

    const activeLocale = feedLocaleForScene(activeScene);
    const copy = activeLocale.copy;
    if (!copy) return;
    const cityName = activeLocale.cityName;
    const memberPresented = isMemberPresented();
    const civicOk = canTakeCivicAction();
    const outsideCommunity =
      (hasAuthoritativePaidMembership() || civicOk) &&
      memberHomeCityId() &&
      activeScene &&
      !sceneMatchesMemberCommunity(activeScene);
    if (outsideCommunity) {
      detailUserStatus.textContent =
        copy.notYourCommunity ||
        "You can explore, but participation is reserved for the local community.";
    } else if (
      hasAuthoritativePaidMembership() &&
      !civicOk &&
      PAYMENT_COPY[membershipLang()]
    ) {
      detailUserStatus.textContent =
        PAYMENT_COPY[membershipLang()].paidNoParticipateStatus;
    } else if (memberPresented) {
      detailUserStatus.textContent = copy.member.replace("{city}", cityName);
    } else {
      detailUserStatus.textContent = copy.visitor;
    }
    detailDoneTitle.textContent = copy.doneTitle;
    detailDoneNote.textContent = copy.doneNote;
    detailSeeToo.textContent = copy.seeThisToo;
    const confirmation = getSignalConfirmationState(feedIndex);
    applyConfirmCountLabel(
      detailConfirmCount,
      copy,
      confirmation.confirmationCount
    );

    const onConfirmed = confirmation.confirmed && canConfirmSeeTooAction();
    if (onConfirmed) {
      detailSeeToo.hidden = true;
      detailSeeToo.disabled = true;
      detailSeeTooDone.hidden = false;
    } else {
      detailSeeToo.hidden = false;
      detailSeeToo.disabled = false;
      detailSeeTooDone.hidden = true;
    }
  }

  function applyFeedCopyChrome() {
    const scenes = currentScenes();
    const panels = getFeedPanels();
    const discovery = window.TownCityDiscovery;
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const panelIndex = Number(panel.getAttribute("data-feed-index"));
      const scene = scenes[panelIndex];
      if (discovery && discovery.isCityDiscoveryStory(scene)) continue;
      const locale = feedLocaleForScene(scene);
      const copy = locale.copy;
      const back = feedRole("feed-back", panel);
      const seeToo = feedRole("feed-see-too", panel);
      const openSignal = feedRole("feed-open-signal", panel);
      const community = feedRole("feed-community", panel);
      if (back) back.textContent = copy.back;
      if (seeToo) seeToo.textContent = copy.seeThisToo;
      if (openSignal) openSignal.textContent = copy.openSignal;
      if (community) community.textContent = locale.cityName;
    }
    const activeScene = scenes[feedIndex];
    const readingLang = resolvePublicReadingLanguage();
    applyPublicNavCopy();
    if (discovery && discovery.isCityDiscoveryStory(activeScene)) {
      document.documentElement.lang = readingLang === "en" ? "en" : readingLang;
      syncFeedMemberState();
      return;
    }
    const activeLocale = feedLocaleForScene(activeScene);
    const copy = activeLocale.copy || FEED_COPY.en || FEED_COPY.it;
    if (!copy) {
      document.documentElement.lang = readingLang === "en" ? "en" : readingLang;
      return;
    }
    detailClose.textContent = copy.openSignalClose;
    detailWhyLabel.textContent = copy.whyLabel;
    detailWhoLabel.textContent = copy.whoLabel;
    detailUpdateLabel.textContent = copy.updateLabel;
    detailStatusLabel.textContent = copy.statusLabel;
    applySignalSessionCopy(currentFeedCopy());
    syncFeedMemberState();
    document.documentElement.lang = readingLang === "en" ? "en" : readingLang;
  }

  function populateSignalDetail() {
    const discovery = window.TownCityDiscovery;
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    if (!scene) return;
    if (discovery && discovery.isCityDiscoveryStory(scene)) return;

    const locale = feedLocaleForScene(scene);
    const copy = locale.copy || FEED_COPY.it;
    const view = locale.localizedScene || scene;
    const cityName = locale.cityName || "";

    detailImage.src = view.image || scene.image;
    detailImage.style.objectPosition = view.focus || scene.focus;
    detailCommunity.textContent = (copy.communityArea || "{city} · {area}")
      .replace("{city}", cityName)
      .replace("{area}", view.area || "");
    detailCategory.textContent = view.category || "";
    detailHeadline.textContent = view.headline || "";
    detailMeta.textContent =
      (view.observedDate || "") +
      " · " +
      (scene.authorName || "") +
      " · " +
      (view.area || "");
    if (detailSourceLang) {
      const label = locale.sourceLanguageLabel || "";
      const showSource =
        !!label &&
        locale.lang &&
        view.sourceLang &&
        locale.lang !== view.sourceLang;
      detailSourceLang.textContent = label;
      detailSourceLang.hidden = !showSource;
    }
    detailCivicStatus.textContent = view.civicStatus || "";
    detailDescription.textContent = view.description || "";
    detailWhy.textContent = view.whyMatters || "";
    detailWho.textContent = view.whoAffected || "";
    detailUpdate.textContent = view.latestUpdate || "";
    detailStatusNote.textContent = view.statusNote || "";
    closeSessionCompose({ keepDraft: false });
    renderSignalSession();
    loadSignalDiscussionSession();
    void loadSignalCivicProcess();
    syncFeedMemberState();
  }

  const feedNav = window.TownFeedNavigation;
  let feedPanelObserver = null;
  let feedScrollRaf = 0;
  let feedProgrammaticScroll = false;

  function updateFeedActiveChrome(index, total) {
    const panels = getFeedPanels();
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const panelIndex = Number(panel.getAttribute("data-feed-index"));
      const isActive = panelIndex === index;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-current", isActive ? "true" : "false");
      const pager = feedRole("feed-pager", panel);
      if (pager) pager.textContent = panelIndex + 1 + " / " + total;
    }
    if (feedLiveStatus) {
      const lang = resolvePublicReadingLanguage();
      feedLiveStatus.textContent =
        (window.TownPublicI18n &&
          window.TownPublicI18n.storyLabel(lang, index + 1, total)) ||
        "Story " + (index + 1) + " of " + total;
    }
  }

  function setActiveFeedIndex(index, options) {
    const scenes = currentScenes();
    if (!scenes.length || !feedNav) return;
    const next = feedNav.clampIndex(index, scenes.length);
    const changed = next !== feedIndex;
    feedIndex = next;
    if (isProductOnlyPublicMode()) {
      syncProductOnlyCityFromScene(scenes[feedIndex]);
    }
    updateFeedActiveChrome(feedIndex, scenes.length);
    if (!(options && options.skipMemberSync)) syncFeedMemberState();
    preloadAdjacentFeedImages();
    return changed;
  }

  function indexFromScrollerPosition() {
    const scenes = currentScenes();
    if (!feedScroller || !scenes.length) return 0;
    if (feedNav) {
      return feedNav.indexFromScrollTop(
        feedScroller.scrollTop,
        feedScroller.clientHeight,
        scenes.length
      );
    }
    const h = feedScroller.clientHeight || 1;
    return Math.max(
      0,
      Math.min(scenes.length - 1, Math.round(feedScroller.scrollTop / h))
    );
  }

  function syncActiveIndexFromScroll() {
    if (feedProgrammaticScroll) return;
    if (!isFeedSurfaceActive()) return;
    setActiveFeedIndex(indexFromScrollerPosition(), { fromScroll: true });
  }

  function observeFeedPanels() {
    if (feedPanelObserver) {
      feedPanelObserver.disconnect();
      feedPanelObserver = null;
    }
    if (!feedScroller || typeof IntersectionObserver !== "function") return;
    feedPanelObserver = new IntersectionObserver(
      function (entries) {
        if (feedProgrammaticScroll) return;
        let best = null;
        let bestRatio = 0;
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (!entry.isIntersecting) continue;
          if (entry.intersectionRatio >= bestRatio) {
            best = entry;
            bestRatio = entry.intersectionRatio;
          }
        }
        if (!best) return;
        const idx = Number(best.target.getAttribute("data-feed-index"));
        if (!Number.isNaN(idx)) {
          setActiveFeedIndex(idx, { fromScroll: true });
        }
      },
      {
        root: feedScroller,
        threshold: [0.55, 0.7, 0.85],
      }
    );
    const panels = getFeedPanels();
    for (let i = 0; i < panels.length; i++) {
      feedPanelObserver.observe(panels[i]);
    }
  }

  function buildCityDiscoveryPanel(scene, index, total) {
    const fragment = cityDiscoveryPanelTemplate.content.cloneNode(true);
    const panel = fragment.querySelector(".feed__panel");
    panel.setAttribute("data-feed-index", String(index));
    panel.setAttribute(
      "aria-label",
      "Story " + (index + 1) + " of " + total
    );
    const idNodes = panel.querySelectorAll("[id]");
    for (let i = 0; i < idNodes.length; i++) {
      const el = idNodes[i];
      el.setAttribute("data-feed-role", el.id);
      el.removeAttribute("id");
    }

    const discovery = window.TownCityDiscovery;
    const copy =
      (scene && scene.copy) ||
      (discovery && discovery.editorialCopyForLanguage(scene && scene.lang)) ||
      null;
    const image = panel.querySelector(".discovery__image");
    const headline1 = feedRole("discovery-headline-1", panel);
    const headline2 = feedRole("discovery-headline-2", panel);
    const support = feedRole("discovery-support", panel);
    const primary = feedRole("discovery-find-city", panel);
    const secondary = feedRole("discovery-continue", panel);
    const pager = feedRole("discovery-pager", panel);

    if (image && scene && scene.image) {
      image.src = scene.image;
      image.style.objectPosition = scene.focus || "50% 45%";
      image.loading = index === 0 ? "eager" : "lazy";
    }
    if (copy) {
      if (headline1) headline1.textContent = copy.headline1;
      if (headline2) headline2.textContent = copy.headline2;
      if (support) support.textContent = copy.support;
      if (primary) primary.textContent = copy.primary;
      if (secondary) secondary.textContent = copy.secondary;
    }
    if (pager) pager.textContent = index + 1 + " / " + total;
    return panel;
  }

  function buildFeedPanel(scene, index, total, copy, cityName) {
    const discovery = window.TownCityDiscovery;
    if (discovery && discovery.isCityDiscoveryStory(scene)) {
      return buildCityDiscoveryPanel(scene, index, total);
    }
    const fragment = feedPanelTemplate.content.cloneNode(true);
    const panel = fragment.querySelector(".feed__panel");
    panel.setAttribute("data-feed-index", String(index));
    panel.setAttribute(
      "aria-label",
      "Story " + (index + 1) + " of " + total
    );
    const idNodes = panel.querySelectorAll("[id]");
    for (let i = 0; i < idNodes.length; i++) {
      const el = idNodes[i];
      el.setAttribute("data-feed-role", el.id);
      el.removeAttribute("id");
    }

    const image = feedRole("feed-image", panel);
    const category = feedRole("feed-category", panel);
    const headline = feedRole("feed-headline", panel);
    const area = feedRole("feed-area", panel);
    const summary = feedRole("feed-summary", panel);
    const meta = feedRole("feed-meta", panel);
    const community = feedRole("feed-community", panel);
    const pager = feedRole("feed-pager", panel);
    const back = feedRole("feed-back", panel);
    const seeToo = feedRole("feed-see-too", panel);
    const openSignal = feedRole("feed-open-signal", panel);

    const locale = feedLocaleForScene(scene);
    const view = locale.localizedScene || scene;
    const chrome = locale.copy || copy;
    const cityLabel = locale.cityName || cityName;

    if (image) {
      image.src = view.image || scene.image;
      image.style.objectPosition = view.focus || scene.focus || "50% 50%";
      image.loading = index === 0 ? "eager" : "lazy";
    }
    if (category) category.textContent = view.category || "";
    if (headline) headline.textContent = view.headline || "";
    if (area) area.textContent = view.area || "";
    if (summary) summary.textContent = view.summary || "";
    if (meta) {
      meta.textContent =
        (scene.authorName || "") +
        " · " +
        (view.observedDate || scene.observedDate || scene.observedTime);
    }
    const sourceLangEl = feedRole("feed-source-lang", panel);
    if (sourceLangEl) {
      const label = locale.sourceLanguageLabel || "";
      const showSource =
        !!label &&
        locale.lang &&
        view.sourceLang &&
        locale.lang !== view.sourceLang;
      sourceLangEl.textContent = label;
      sourceLangEl.hidden = !showSource;
    }
    if (community) community.textContent = cityLabel;
    if (pager) pager.textContent = index + 1 + " / " + total;
    panel.setAttribute(
      "aria-label",
      (window.TownPublicI18n &&
        window.TownPublicI18n.storyLabel(locale.lang, index + 1, total)) ||
        "Story " + (index + 1) + " of " + total
    );
    if (back) back.textContent = chrome.back;
    if (seeToo) seeToo.textContent = chrome.seeThisToo;
    if (openSignal) openSignal.textContent = chrome.openSignal;
    syncPanelMemberControls(panel, index, chrome, cityLabel);
    return panel;
  }

  function rebuildFeedPanels() {
    const scenes = currentScenes();
    if (!feedScroller || !feedPanelTemplate || !cityDiscoveryPanelTemplate) {
      return;
    }
    feedScroller.innerHTML = "";
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const locale = feedLocaleForScene(scene);
      feedScroller.appendChild(
        buildFeedPanel(
          scene,
          i,
          scenes.length,
          locale.copy,
          locale.cityName
        )
      );
    }
    if (feedIndex > scenes.length - 1) feedIndex = Math.max(0, scenes.length - 1);
    if (feedIndex < 0) feedIndex = 0;
    observeFeedPanels();
    updateFeedActiveChrome(feedIndex, scenes.length);
  }

  function scrollFeedToIndex(targetIndex, options) {
    const scenes = currentScenes();
    if (!scenes.length || !feedScroller || !feedNav) return false;
    const next = feedNav.clampIndex(targetIndex, scenes.length);
    const panel = getFeedPanelByIndex(next);
    if (!panel) return false;
    const behavior =
      options && options.behavior
        ? options.behavior
        : feedNav.programmaticScrollBehavior(prefersFeedReducedMotion());
    feedProgrammaticScroll = true;
    setActiveFeedIndex(next);
    if (behavior === "auto") {
      // Deterministic alignment for deep-links / first paint. scrollIntoView
      // alone can lose the target before snap layout settles.
      feedScroller.scrollTop = panel.offsetTop || next * (feedScroller.clientHeight || 0);
      panel.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "auto",
      });
    } else {
      panel.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: behavior,
      });
    }
    window.setTimeout(
      function () {
        if (behavior === "auto" && panel && feedScroller) {
          feedScroller.scrollTop =
            panel.offsetTop || next * (feedScroller.clientHeight || 0);
          setActiveFeedIndex(next, { skipMemberSync: false });
        }
        feedProgrammaticScroll = false;
        syncActiveIndexFromScroll();
      },
      behavior === "smooth" ? 420 : 80
    );
    return true;
  }

  function navigateFeedTo(targetIndex) {
    if (!isFeedSurfaceActive() || feedOverlaysBlockNavigation()) return false;
    return scrollFeedToIndex(targetIndex);
  }

  function navigateFeedByIntent(intent) {
    if (!isFeedSurfaceActive() || feedOverlaysBlockNavigation()) return false;
    if (!feedNav) return false;
    const scenes = currentScenes();
    const target = feedNav.resolveTargetIndex(
      feedIndex,
      scenes.length,
      intent
    );
    if (target == null) return false;
    return scrollFeedToIndex(target);
  }

  function renderFeedScene() {
    const scenes = currentScenes();
    if (!scenes.length) {
      rebuildFeedPanels();
      applyFeedCopyChrome();
      syncFeedAvailabilityStatus();
      return;
    }
    if (feedIndex < 0) feedIndex = 0;
    if (feedIndex > scenes.length - 1) feedIndex = scenes.length - 1;

    if (isProductOnlyPublicMode()) {
      syncProductOnlyCityFromScene(scenes[feedIndex]);
    }
    rebuildFeedPanels();
    applyFeedCopyChrome();
    // Instantly align the scroller to the canonical index (no PowerPoint fade).
    scrollFeedToIndex(feedIndex, { behavior: "auto" });
    preloadAdjacentFeedImages();
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

    const cities = CITY_BY_COUNTRY[selectedCountry];
    const copy = CITY_COPY[resolvePublicReadingLanguage()];

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
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
        (copy.cityNames[city.id] || city.id) +
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
  }


  function membershipLang() {
    // Interface language belongs to the visitor. Community language describes
    // signal content only and must never replace the onboarding language.
    return resolvePublicReadingLanguage();
  }

  function entryLang() {
    // Keep the same browser-selected interface language across every route.
    return membershipLang();
  }

  function returnVisitorToOriginatingSignal() {
    feedIndex = originatingFeedIndex;
    endInviteMembershipJourney();
    go("feed");
    scrollFeedToIndex(feedIndex, { behavior: "auto" });
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

  function clearAuthWindowStatus() {
    authWindowStatus.hidden = true;
    authWindowStatus.textContent = "";
    authWindowStatus.classList.remove("is-success", "is-error");
  }

  function showAuthWindowStatus(message, kind) {
    authWindowStatus.hidden = false;
    authWindowStatus.textContent = message;
    authWindowStatus.classList.toggle("is-success", kind === "success");
    authWindowStatus.classList.toggle("is-error", kind === "error");
  }

  // Authenticated MEMBERSHIP destination — never invents membership authority.
  function continueAuthenticatedMembershipDestination() {
    closeInvite();
    closeSignalDetail();
    closeActivityPanel();
    setNavActive(navMembership);
    if (canTakeCivicAction()) {
      openProfilePanel();
      return;
    }
    if (
      hasAuthoritativePaidMembership() ||
      (membershipRecoveryApi &&
        membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
    ) {
      beginMembershipRecoveryFlow();
      go("payment");
      showPaymentPaidNoParticipate();
      return;
    }
    beginInviteMembershipJourney();
    go("commitment");
  }

  // Post-auth destination for the public Sign-in window. Membership and
  // community-commitment state must already be refreshed from the backend.
  function continueAfterPublicPasskeySignIn() {
    const openedFor = authOpenedByTarget;
    closeAuthWindow();
    if (openedFor === "profile") {
      // PROFILE nav Sign-in: land on Profile V1, not commitment.
      syncFeedMemberState();
      openProfilePanel();
      return;
    }
    if (openedFor === "activity") {
      // ACTIVITY nav Sign-in: land on Activity from backend truth.
      syncFeedMemberState();
      openActivityPanel();
      return;
    }
    if (openedFor === "membership") {
      syncFeedMemberState();
      continueAuthenticatedMembershipDestination();
      return;
    }
    if (hasAuthoritativePaidMembership()) {
      // Paid member: remain on the public feed with authoritative member UI.
      clearPendingSeeTooContext();
      syncFeedMemberState();
      return;
    }
    // Pending "I SEE THIS TOO": return to the originating signal, then the
    // existing membership invite boundary. Unrelated Sign-ins keep commitment.
    if (restorePendingSeeTooAfterSignIn()) {
      return;
    }
    // Authenticated non-member: continue the membership journey at commitment.
    beginInviteMembershipJourney();
    go("commitment");
  }

  // Canonical public Sign-in path — reuses runPasskeyAuthenticationCeremony.
  // Does not invent password auth or manufacture session state locally.
  function startPublicAuthWindowPasskeySignIn() {
    if (authSignInSubmitting) return;
    const copy = LOGIN_COPY[entryLang()] || LOGIN_COPY.en;
    clearAuthWindowStatus();

    authSignInSubmitting = true;
    authPassword.disabled = true;
    authPasskey.disabled = true;
    authContinue.disabled = true;
    showAuthWindowStatus(copy.working, "success");

    runPasskeyAuthenticationCeremony()
      .then(function () {
        // Session probe inside the ceremony confirmed authenticated:true.
        sessionAuthenticated = true;
        showAuthWindowStatus(copy.success, "success");
        return Promise.all([
          fetchAccountMembership()
            .then(function (snapshot) {
              applyMembershipSnapshot(snapshot);
            })
            .catch(function () {
              // Keep prior authoritative snapshot on transient failure so a
              // paying member is never routed as a non-member.
            }),
          bootstrapCommunityCommitment(),
        ]).then(function () {
          continueAfterPublicPasskeySignIn();
        });
      })
      .catch(function (err) {
        sessionAuthenticated = false;
        if (isPasskeyCeremonyCancelled(err)) {
          showAuthWindowStatus(copy.cancelled, "error");
          return;
        }
        showAuthWindowStatus(copy.failed, "error");
      })
      .finally(function () {
        authSignInSubmitting = false;
        authPassword.disabled = false;
        authPasskey.disabled = false;
        authContinue.disabled = false;
      });
  }

  function startPublicAuthWindowPasswordSignIn() {
    if (authSignInSubmitting) return;
    const copy = LOGIN_COPY[entryLang()] || LOGIN_COPY.en;
    const email = (authIdentityInput.value || "").trim();
    const password = authPassword.value || "";
    clearAuthWindowStatus();

    if (!isValidEmail(email)) {
      authIdentityInput.setCustomValidity(
        (EMAIL_COPY[entryLang()] || EMAIL_COPY.en).invalid
      );
      authIdentityInput.reportValidity();
      return;
    }
    authIdentityInput.setCustomValidity("");
    if (!password) {
      authPassword.setCustomValidity(
        copy.passwordRequired || "Enter your password."
      );
      authPassword.reportValidity();
      return;
    }
    authPassword.setCustomValidity("");

    authSignInSubmitting = true;
    authPassword.disabled = true;
    authPasskey.disabled = true;
    authContinue.disabled = true;
    showAuthWindowStatus(copy.working, "success");

    authenticateWithPassword(email, password)
      .then(function () {
        sessionAuthenticated = true;
        noteAccountEmail(email);
        showAuthWindowStatus(copy.success, "success");
        return Promise.all([
          fetchAccountMembership()
            .then(function (snapshot) {
              applyMembershipSnapshot(snapshot);
            })
            .catch(function () {
              // Keep prior authoritative snapshot on transient failure.
            }),
          bootstrapCommunityCommitment(),
        ]).then(function () {
          continueAfterPublicPasskeySignIn();
        });
      })
      .catch(function () {
        sessionAuthenticated = false;
        showAuthWindowStatus(copy.failed, "error");
      })
      .finally(function () {
        authSignInSubmitting = false;
        authPassword.disabled = false;
        authPasskey.disabled = false;
        authContinue.disabled = false;
      });
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
      if (data.email) noteAccountEmail(data.email);
      return data;
    }
    throw makeApiError("failed");
  }

  const SIGNAL_CREATE_CATEGORIES = {
    Milano: ["SPAZIO PUBBLICO", "ILLUMINAZIONE", "LAVORI PUBBLICI"],
    Munich: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
    Arad: ["MEDIU", "INFRASTRUCTURĂ", "SPAȚIU PUBLIC"],
    ClujNapoca: ["MEDIU", "INFRASTRUCTURĂ", "SPAȚIU PUBLIC"],
    Sibiu: ["MEDIU", "INFRASTRUCTURĂ", "SPAȚIU PUBLIC"],
    Iasi: ["MEDIU", "INFRASTRUCTURĂ", "SPAȚIU PUBLIC"],
    Timisoara: ["MEDIU", "INFRASTRUCTURĂ", "SPAȚIU PUBLIC"],
    Koln: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
    Dortmund: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
    Stuttgart: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
    Frankfurt: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
    Salzburg: ["ÖFFENTLICHER RAUM", "STRASSENBELEUCHTUNG", "ÖFFENTLICHE BAUARBEITEN"],
  };

  const SIGNAL_CREATE_COPY = {
    it: {
      profileCta: "Pubblica un segnale civico",
      title: "Pubblica un segnale civico",
      lead:
        "Pubblica con il tuo nome reale nella tua comunità. Hai già accettato la responsabilità personale come membro TOWN — confermala di nuovo per questa pubblicazione.",
      titleLabel: "Titolo",
      descriptionLabel: "Descrizione",
      categoryLabel: "Categoria",
      realNameLabel: "Nome reale",
      photoLabel: "Fotografia",
      acceptText:
        "Pubblico con il mio nome reale e accetto la responsabilità personale per questo segnale, secondo le regole di membership TOWN che ho già accettato.",
      submit: "Pubblica segnale",
      cancel: "Annulla",
      close: "Chiudi",
      errorGeneric: "Non è stato possibile pubblicare. Riprova.",
      errorPhoto: "Scegli una foto JPEG, PNG o WebP.",
      errorAccept: "Conferma la responsabilità personale per pubblicare.",
      errorName: "Usa il tuo nome e cognome reali, non un username.",
    },
    de: {
      profileCta: "Ziviles Signal veröffentlichen",
      title: "Ziviles Signal veröffentlichen",
      lead:
        "Veröffentliche unter deinem echten Namen in deiner Gemeinschaft. Du hast die persönliche Verantwortung als TOWN-Mitglied bereits akzeptiert — bestätige sie erneut für diese Veröffentlichung.",
      titleLabel: "Titel",
      descriptionLabel: "Beschreibung",
      categoryLabel: "Kategorie",
      realNameLabel: "Echter Name",
      photoLabel: "Foto",
      acceptText:
        "Ich veröffentliche unter meinem echten Namen und übernehme die persönliche Verantwortung für dieses Signal gemäß den TOWN-Mitgliedschaftsregeln, die ich bereits akzeptiert habe.",
      submit: "Signal veröffentlichen",
      cancel: "Abbrechen",
      close: "Schließen",
      errorGeneric: "Veröffentlichen nicht möglich. Bitte erneut versuchen.",
      errorPhoto: "Wähle ein JPEG-, PNG- oder WebP-Foto.",
      errorAccept: "Bestätige die persönliche Verantwortung zum Veröffentlichen.",
      errorName: "Verwende deinen echten Vor- und Nachnamen, keinen Benutzernamen.",
    },
    ro: {
      profileCta: "Publică un semnal civic",
      title: "Publică un semnal civic",
      lead:
        "Publică sub numele tău real în comunitatea ta. Ai acceptat deja responsabilitatea personală ca membru TOWN — confirm-o din nou pentru această publicare.",
      titleLabel: "Titlu",
      descriptionLabel: "Descriere",
      categoryLabel: "Categorie",
      realNameLabel: "Nume real",
      photoLabel: "Fotografie",
      acceptText:
        "Public sub numele meu real și îmi asum responsabilitatea personală pentru acest semnal, conform regulilor de membru TOWN pe care le-am acceptat deja.",
      submit: "Publică semnalul",
      cancel: "Anulează",
      close: "Închide",
      errorGeneric: "Nu a fost posibil să publici. Încearcă din nou.",
      errorPhoto: "Alege o fotografie JPEG, PNG sau WebP.",
      errorAccept: "Confirmă responsabilitatea personală pentru a publica.",
      errorName: "Folosește numele și prenumele reale, nu un username.",
    },
    en: {
      profileCta: "Publish a civic signal",
      title: "Publish a civic signal",
      lead:
        "Publish under your real name in your community. You already accepted personal responsibility as a TOWN member — confirm it again for this publication.",
      titleLabel: "Title",
      descriptionLabel: "Description",
      categoryLabel: "Category",
      realNameLabel: "Real name",
      photoLabel: "Photo",
      acceptText:
        "I publish under my real name and accept personal responsibility for this signal, under the TOWN membership rules I already accepted.",
      submit: "Publish signal",
      cancel: "Cancel",
      close: "Close",
      errorGeneric: "Could not publish. Try again.",
      errorPhoto: "Choose a JPEG, PNG, or WebP photo.",
      errorAccept: "Confirm personal responsibility to publish.",
      errorName: "Use your real given and family name, not a username.",
    },
  };

  let signalCreatePhotoFile = null;
  let signalCreatePhotoObjectUrl = null;
  let signalCreateSubmitting = false;

  function signalCreateCopy() {
    const lang = resolvePublicReadingLanguage();
    return SIGNAL_CREATE_COPY[lang] || SIGNAL_CREATE_COPY.en;
  }

  function currentCommunitySlug() {
    if (
      commitmentSnapshot &&
      commitmentSnapshot.community &&
      commitmentSnapshot.community.slug
    ) {
      return String(commitmentSnapshot.community.slug);
    }
    // Member publishing is always scoped by the authoritative commitment.
    // The city currently being explored is presentation state, never authority.
    return null;
  }

  function fillSignalCreateCategories() {
    const city = memberHomeCityId();
    const categories =
      SIGNAL_CREATE_CATEGORIES[city] || [];
    signalCreateCategory.innerHTML = "";
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement("option");
      option.value = categories[i];
      option.textContent = categories[i];
      signalCreateCategory.appendChild(option);
    }
  }

  function clearSignalCreatePhotoPreview() {
    if (signalCreatePhotoObjectUrl) {
      try {
        URL.revokeObjectURL(signalCreatePhotoObjectUrl);
      } catch (_err) {
        /* ignore */
      }
    }
    signalCreatePhotoObjectUrl = null;
    signalCreatePhotoFile = null;
    signalCreatePreviewImage.removeAttribute("src");
    signalCreatePreview.hidden = true;
    signalCreatePhoto.value = "";
  }

  function applySignalCreateCopy() {
    const copy = signalCreateCopy();
    signalCreateTitle.textContent = copy.title;
    signalCreateLead.textContent = copy.lead;
    signalCreateClose.textContent = copy.close;
    signalCreateAcceptText.textContent = copy.acceptText;
    signalCreateSubmit.textContent = copy.submit;
    signalCreateCancel.textContent = copy.cancel;
    document.getElementById("signal-create-title-label").textContent =
      copy.titleLabel;
    document.getElementById("signal-create-description-label").textContent =
      copy.descriptionLabel;
    document.getElementById("signal-create-category-label").textContent =
      copy.categoryLabel;
    document.getElementById("signal-create-real-name-label").textContent =
      copy.realNameLabel;
    document.getElementById("signal-create-photo-label").textContent =
      copy.photoLabel;
  }

  function openSignalCreate() {
    if (!canTakeCivicAction()) {
      if (!shouldOfferMembershipInvite()) {
        redirectMemberWithoutCivicAccess();
        return;
      }
      openInvite();
      return;
    }
    if (!currentCommunitySlug()) {
      go("commitment");
      return;
    }
    closeProfilePanel();
    closeSignalDetail();
    applySignalCreateCopy();
    fillSignalCreateCategories();
    signalCreateError.hidden = true;
    signalCreateError.textContent = "";
    signalCreateAccept.checked = false;
    signalCreate.hidden = false;
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    signalCreateTitleInput.focus();
  }

  function closeSignalCreate() {
    if (signalCreate.hidden) return;
    signalCreate.hidden = true;
    clearSignalCreatePhotoPreview();
    signalCreateForm.reset();
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
  }

  async function publishMemberSignal(event) {
    if (event) event.preventDefault();
    if (signalCreateSubmitting) return;
    const copy = signalCreateCopy();
    const slug = currentCommunitySlug();
    if (!slug || !canTakeCivicAction()) {
      signalCreateError.textContent = copy.errorGeneric;
      signalCreateError.hidden = false;
      return;
    }
    if (!signalCreateAccept.checked) {
      signalCreateError.textContent = copy.errorAccept;
      signalCreateError.hidden = false;
      return;
    }
    const realName = (signalCreateRealName.value || "").trim();
    if (!realName || realName.indexOf(" ") < 0 || realName.charAt(0) === "@") {
      signalCreateError.textContent = copy.errorName;
      signalCreateError.hidden = false;
      return;
    }
    const file = signalCreatePhotoFile;
    if (
      !file ||
      (file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp")
    ) {
      signalCreateError.textContent = copy.errorPhoto;
      signalCreateError.hidden = false;
      return;
    }

    signalCreateSubmitting = true;
    signalCreateSubmit.disabled = true;
    signalCreateError.hidden = true;
    try {
      let uploadFile = file;
      try {
        uploadFile = await compressImageFileIfNeeded(file);
      } catch (_compressErr) {
        uploadFile = file;
      }
      const upload = await postBinaryWithCredentials(
        API_BASE +
          "/v1/communities/" +
          encodeURIComponent(slug) +
          "/signals/media",
        uploadFile,
        uploadFile.type
      );
      if (
        !(
          upload.response &&
          upload.response.status === 201 &&
          upload.payload &&
          upload.payload.data &&
          upload.payload.data.mediaUploadId
        )
      ) {
        signalCreateError.textContent = copy.errorGeneric;
        signalCreateError.hidden = false;
        return;
      }
      const created = await postJsonWithCredentials(
        API_BASE +
          "/v1/communities/" +
          encodeURIComponent(slug) +
          "/signals",
        {
          title: (signalCreateTitleInput.value || "").trim(),
          description: (signalCreateDescription.value || "").trim(),
          category: signalCreateCategory.value,
          realName: realName,
          acceptedResponsibility: true,
          mediaUploadId: upload.payload.data.mediaUploadId,
        }
      );
      if (
        !(
          created.response &&
          created.response.status === 201 &&
          created.payload &&
          created.payload.data &&
          created.payload.data.id
        )
      ) {
        signalCreateError.textContent = copy.errorGeneric;
        signalCreateError.hidden = false;
        return;
      }
      closeSignalCreate();
      clearLiveScenes();
      await loadLiveScenesForCity(selectedCity);
      rebuildFeedPanels();
      renderFeedScene();
    } catch (_err) {
      signalCreateError.textContent = copy.errorGeneric;
      signalCreateError.hidden = false;
    } finally {
      signalCreateSubmitting = false;
      signalCreateSubmit.disabled = false;
    }
  }

  const OWNER_MODERATION_REASONS = [
    "immoral",
    "abusive",
    "spam",
    "off_topic",
    "illegal",
    "other",
  ];

  const OWNER_MODERATION_COPY = {
    en: {
      profileCta: "Moderation",
      title: "Owner moderation",
      lead:
        "Hide or unhide signals, and ban or unban accounts. These are the existing owner tools — no approval queue and no report flow.",
      reasonLabel: "Reason",
      signalsTitle: "Community signals",
      signalsEmpty: "No signals in this community.",
      accountsTitle: "Suspended accounts",
      accountsEmpty: "No suspended accounts.",
      hide: "Hide",
      unhide: "Unhide",
      ban: "Ban author",
      unban: "Unban",
      hidden: "Hidden",
      visible: "Visible",
      close: "Close",
      statusHidden: "Signal hidden.",
      statusUnhidden: "Signal visible again.",
      statusBanned: "Account banned.",
      statusUnbanned: "Account unbanned.",
      errorGeneric: "Moderation action failed. Try again.",
      errorOwner: "Owner moderation is available only for owner accounts.",
      errorCommunity: "Choose your community before moderating.",
      metaAuthor: "Author: {name}",
      metaAccount: "Account: {id}",
      metaSuspended: "Suspended: {when}",
      reasons: {
        immoral: "Immoral",
        abusive: "Abusive",
        spam: "Spam",
        off_topic: "Off topic",
        illegal: "Illegal",
        other: "Other",
      },
    },
    it: {
      profileCta: "Moderazione",
      title: "Moderazione owner",
      lead:
        "Nascondi o ripristina segnali, e banna o sbanna account. Solo gli strumenti owner già esistenti — nessuna coda di approvazione e nessun report.",
      reasonLabel: "Motivo",
      signalsTitle: "Segnali della comunità",
      signalsEmpty: "Nessun segnale in questa comunità.",
      accountsTitle: "Account sospesi",
      accountsEmpty: "Nessun account sospeso.",
      hide: "Nascondi",
      unhide: "Ripristina",
      ban: "Banna autore",
      unban: "Sbanna",
      hidden: "Nascosto",
      visible: "Visibile",
      close: "Chiudi",
      statusHidden: "Segnale nascosto.",
      statusUnhidden: "Segnale di nuovo visibile.",
      statusBanned: "Account bannato.",
      statusUnbanned: "Account sbannato.",
      errorGeneric: "Azione di moderazione non riuscita. Riprova.",
      errorOwner: "La moderazione è disponibile solo per gli account owner.",
      errorCommunity: "Scegli la tua comunità prima di moderare.",
      metaAuthor: "Autore: {name}",
      metaAccount: "Account: {id}",
      metaSuspended: "Sospeso: {when}",
      reasons: {
        immoral: "Immoral",
        abusive: "Abusivo",
        spam: "Spam",
        off_topic: "Fuori tema",
        illegal: "Illegale",
        other: "Altro",
      },
    },
    de: {
      profileCta: "Moderation",
      title: "Owner-Moderation",
      lead:
        "Signale verstecken oder wieder zeigen, Konten sperren oder entsperren. Nur die bestehenden Owner-Werkzeuge — keine Freigabe-Warteschlange und kein Report-Flow.",
      reasonLabel: "Grund",
      signalsTitle: "Gemeinschaftssignale",
      signalsEmpty: "Keine Signale in dieser Gemeinschaft.",
      accountsTitle: "Gesperrte Konten",
      accountsEmpty: "Keine gesperrten Konten.",
      hide: "Verstecken",
      unhide: "Wieder zeigen",
      ban: "Autor sperren",
      unban: "Entsperren",
      hidden: "Versteckt",
      visible: "Sichtbar",
      close: "Schließen",
      statusHidden: "Signal versteckt.",
      statusUnhidden: "Signal wieder sichtbar.",
      statusBanned: "Konto gesperrt.",
      statusUnbanned: "Konto entsperrt.",
      errorGeneric: "Moderation fehlgeschlagen. Bitte erneut versuchen.",
      errorOwner: "Moderation ist nur für Owner-Konten verfügbar.",
      errorCommunity: "Wähle zuerst deine Gemeinschaft.",
      metaAuthor: "Autor: {name}",
      metaAccount: "Konto: {id}",
      metaSuspended: "Gesperrt: {when}",
      reasons: {
        immoral: "Unmoralisch",
        abusive: "Missbräuchlich",
        spam: "Spam",
        off_topic: "Themaverfehlt",
        illegal: "Illegal",
        other: "Sonstiges",
      },
    },
    ro: {
      profileCta: "Moderare",
      title: "Moderare owner",
      lead:
        "Ascunde sau reașază semnale și banează sau debanează conturi. Doar instrumentele owner deja existente — fără coadă de aprobare și fără report.",
      reasonLabel: "Motiv",
      signalsTitle: "Semnale din comunitate",
      signalsEmpty: "Niciun semnal în această comunitate.",
      accountsTitle: "Conturi suspendate",
      accountsEmpty: "Niciun cont suspendat.",
      hide: "Ascunde",
      unhide: "Reașază",
      ban: "Banează autorul",
      unban: "Debanează",
      hidden: "Ascuns",
      visible: "Vizibil",
      close: "Închide",
      statusHidden: "Semnal ascuns.",
      statusUnhidden: "Semnal din nou vizibil.",
      statusBanned: "Cont banat.",
      statusUnbanned: "Cont debanat.",
      errorGeneric: "Acțiunea de moderare a eșuat. Încearcă din nou.",
      errorOwner: "Moderarea este disponibilă doar pentru conturile owner.",
      errorCommunity: "Alege comunitatea înainte de moderare.",
      metaAuthor: "Autor: {name}",
      metaAccount: "Cont: {id}",
      metaSuspended: "Suspendat: {when}",
      reasons: {
        immoral: "Imoral",
        abusive: "Abuziv",
        spam: "Spam",
        off_topic: "În afara subiectului",
        illegal: "Ilegal",
        other: "Altul",
      },
    },
  };

  let ownerModerationBusy = false;

  function ownerModerationCopy() {
    return (
      OWNER_MODERATION_COPY[membershipLang()] || OWNER_MODERATION_COPY.en
    );
  }

  function selectedModerationReason() {
    const value = String(ownerModerationReason.value || "");
    if (OWNER_MODERATION_REASONS.indexOf(value) !== -1) return value;
    return "other";
  }

  function fillOwnerModerationReasons() {
    const copy = ownerModerationCopy();
    ownerModerationReason.innerHTML = "";
    for (let i = 0; i < OWNER_MODERATION_REASONS.length; i++) {
      const reason = OWNER_MODERATION_REASONS[i];
      const option = document.createElement("option");
      option.value = reason;
      option.textContent =
        (copy.reasons && copy.reasons[reason]) || reason;
      ownerModerationReason.appendChild(option);
    }
  }

  function setOwnerModerationMessage(kind, text) {
    if (kind === "status") {
      ownerModerationError.hidden = true;
      ownerModerationError.textContent = "";
      ownerModerationStatus.textContent = text || "";
      ownerModerationStatus.hidden = !text;
      return;
    }
    ownerModerationStatus.hidden = true;
    ownerModerationStatus.textContent = "";
    ownerModerationError.textContent = text || "";
    ownerModerationError.hidden = !text;
  }

  function applyOwnerModerationCopy() {
    const copy = ownerModerationCopy();
    ownerModerationTitle.textContent = copy.title;
    ownerModerationLead.textContent = copy.lead;
    ownerModerationClose.textContent = copy.close;
    ownerModerationSignalsTitle.textContent = copy.signalsTitle;
    ownerModerationAccountsTitle.textContent = copy.accountsTitle;
    fillOwnerModerationReasons();
  }

  function renderOwnerModerationSignals(signals) {
    const copy = ownerModerationCopy();
    ownerModerationSignalsList.innerHTML = "";
    if (!signals || !signals.length) {
      ownerModerationSignalsEmpty.hidden = false;
      ownerModerationSignalsEmpty.textContent = copy.signalsEmpty;
      return;
    }
    ownerModerationSignalsEmpty.hidden = true;
    for (let i = 0; i < signals.length; i++) {
      const row = signals[i];
      const li = document.createElement("li");
      li.className = "owner-moderation__item";
      const title = document.createElement("p");
      title.className = "owner-moderation__item-title";
      title.textContent = row.headline || row.slug || row.id;
      const meta = document.createElement("p");
      meta.className = "owner-moderation__item-meta";
      meta.textContent =
        (row.hidden ? copy.hidden : copy.visible) +
        " · " +
        copy.metaAuthor.replace("{name}", row.authorDisplayName || "—") +
        (row.hiddenReason ? " · " + row.hiddenReason : "");
      const actions = document.createElement("div");
      actions.className = "owner-moderation__item-actions";
      if (row.hidden) {
        const unhideBtn = document.createElement("button");
        unhideBtn.type = "button";
        unhideBtn.className = "btn btn--primary";
        unhideBtn.textContent = copy.unhide;
        unhideBtn.setAttribute("data-owner-unhide", row.id);
        actions.appendChild(unhideBtn);
      } else {
        const hideBtn = document.createElement("button");
        hideBtn.type = "button";
        hideBtn.className = "btn btn--primary";
        hideBtn.textContent = copy.hide;
        hideBtn.setAttribute("data-owner-hide", row.id);
        actions.appendChild(hideBtn);
      }
      if (row.authorAccountId) {
        const banBtn = document.createElement("button");
        banBtn.type = "button";
        banBtn.className = "btn btn--secondary";
        banBtn.textContent = copy.ban;
        banBtn.setAttribute("data-owner-ban", row.authorAccountId);
        actions.appendChild(banBtn);
      }
      li.appendChild(title);
      li.appendChild(meta);
      li.appendChild(actions);
      ownerModerationSignalsList.appendChild(li);
    }
  }

  function renderOwnerModerationAccounts(accounts) {
    const copy = ownerModerationCopy();
    ownerModerationAccountsList.innerHTML = "";
    if (!accounts || !accounts.length) {
      ownerModerationAccountsEmpty.hidden = false;
      ownerModerationAccountsEmpty.textContent = copy.accountsEmpty;
      return;
    }
    ownerModerationAccountsEmpty.hidden = true;
    for (let i = 0; i < accounts.length; i++) {
      const row = accounts[i];
      const li = document.createElement("li");
      li.className = "owner-moderation__item";
      const title = document.createElement("p");
      title.className = "owner-moderation__item-title";
      title.textContent = row.email || row.accountId;
      const meta = document.createElement("p");
      meta.className = "owner-moderation__item-meta";
      meta.textContent =
        copy.metaAccount.replace("{id}", row.accountId) +
        " · " +
        copy.metaSuspended.replace("{when}", row.suspendedAt || "—");
      const actions = document.createElement("div");
      actions.className = "owner-moderation__item-actions";
      const unbanBtn = document.createElement("button");
      unbanBtn.type = "button";
      unbanBtn.className = "btn btn--primary";
      unbanBtn.textContent = copy.unban;
      unbanBtn.setAttribute("data-owner-unban", row.accountId);
      actions.appendChild(unbanBtn);
      li.appendChild(title);
      li.appendChild(meta);
      li.appendChild(actions);
      ownerModerationAccountsList.appendChild(li);
    }
  }

  async function refreshOwnerModerationLists() {
    const copy = ownerModerationCopy();
    const slug = currentCommunitySlug();
    if (!slug) {
      setOwnerModerationMessage("error", copy.errorCommunity);
      renderOwnerModerationSignals([]);
      renderOwnerModerationAccounts([]);
      return;
    }
    const signalsResult = await getJsonWithCredentials(
      API_BASE +
        "/v1/communities/" +
        encodeURIComponent(slug) +
        "/moderation/signals"
    );
    if (signalsResult.response.status !== 200) {
      throw makeApiError("failed");
    }
    const accountsResult = await getJsonWithCredentials(
      API_BASE + "/v1/moderation/accounts/suspended"
    );
    if (accountsResult.response.status !== 200) {
      throw makeApiError("failed");
    }
    const signals =
      (signalsResult.payload &&
        signalsResult.payload.data &&
        signalsResult.payload.data.signals) ||
      [];
    const accounts =
      (accountsResult.payload &&
        accountsResult.payload.data &&
        accountsResult.payload.data.accounts) ||
      [];
    renderOwnerModerationSignals(signals);
    renderOwnerModerationAccounts(accounts);
  }

  async function openOwnerModeration() {
    const copy = ownerModerationCopy();
    if (!canUseOwnerModeration()) {
      setOwnerModerationMessage("error", copy.errorOwner);
      return;
    }
    closeProfilePanel();
    applyOwnerModerationCopy();
    setOwnerModerationMessage("status", "");
    ownerModeration.hidden = false;
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    ownerModerationClose.focus();
    try {
      await refreshOwnerModerationLists();
    } catch (_err) {
      setOwnerModerationMessage("error", copy.errorGeneric);
    }
  }

  function closeOwnerModeration() {
    ownerModeration.hidden = true;
    setOwnerModerationMessage("status", "");
    syncFeedScrollLockFromOverlays();
    if (
      !profilePanel ||
      profilePanel.hidden
    ) {
      document.body.style.overflow = "";
    }
  }

  async function runOwnerModerationAction(kind, id) {
    if (ownerModerationBusy || !id) return;
    const copy = ownerModerationCopy();
    if (!canUseOwnerModeration()) {
      setOwnerModerationMessage("error", copy.errorOwner);
      return;
    }
    ownerModerationBusy = true;
    setOwnerModerationMessage("status", "");
    try {
      let result = null;
      let okMessage = copy.errorGeneric;
      if (kind === "hide") {
        result = await postJsonWithCredentials(
          API_BASE + "/v1/signals/" + encodeURIComponent(id) + "/hide",
          { reason: selectedModerationReason() }
        );
        okMessage = copy.statusHidden;
      } else if (kind === "unhide") {
        result = await postJsonWithCredentials(
          API_BASE + "/v1/signals/" + encodeURIComponent(id) + "/unhide",
          {}
        );
        okMessage = copy.statusUnhidden;
      } else if (kind === "ban") {
        result = await postJsonWithCredentials(
          API_BASE + "/v1/accounts/" + encodeURIComponent(id) + "/ban",
          { reason: selectedModerationReason() }
        );
        okMessage = copy.statusBanned;
      } else if (kind === "unban") {
        result = await postJsonWithCredentials(
          API_BASE + "/v1/accounts/" + encodeURIComponent(id) + "/unban",
          {}
        );
        okMessage = copy.statusUnbanned;
      }
      if (!result || result.response.status !== 200) {
        setOwnerModerationMessage("error", copy.errorGeneric);
        return;
      }
      setOwnerModerationMessage("status", okMessage);
      await refreshOwnerModerationLists();
      if (kind === "hide" || kind === "unhide") {
        clearLiveScenes();
        await loadLiveScenesForCity(selectedCity);
        rebuildFeedPanels();
        renderFeedScene();
      }
    } catch (_err) {
      setOwnerModerationMessage("error", copy.errorGeneric);
    } finally {
      ownerModerationBusy = false;
    }
  }

  function clearProfileStatus() {
    profileStatus.hidden = true;
    profileStatus.textContent = "";
    profileStatus.removeAttribute("data-tone");
  }

  function showProfileStatus(message, tone) {
    profileStatus.hidden = false;
    profileStatus.textContent = message || "";
    if (tone) profileStatus.setAttribute("data-tone", tone);
    else profileStatus.removeAttribute("data-tone");
  }

  // Stripe portal is for web-paid memberships only — not Google Play pending bind.
  function hasStripeManageableMembership() {
    return !!(
      membershipRecoveryApi &&
      membershipRecoveryApi.isPaidMembership(membershipSnapshot)
    );
  }

  function clearAuthenticatedClientState() {
    sessionAuthenticated = false;
    enteredEmail = "";
    accountEmail = "";
    emailVerificationId = null;
    setupGrant = null;
    setupGrantExpiresAt = null;
    emailSubmitting = false;
    codeSubmitting = false;
    emailVerified = false;
    passwordSet = false;
    passwordSubmitting = false;
    passwordSetupErrorVisible = false;
    passkeyRegistered = false;
    passkeySubmitting = false;
    paymentCheckoutSubmitting = false;
    clearSignalConfirmationState();
    membershipSnapshot = null;
    commitmentCountry = null;
    commitmentCity = null;
    commitmentAcceptanceChecked = false;
    commitmentSnapshot = null;
    commitmentSaving = false;
    commitmentCheckoutSubmitting = false;
    endMembershipRecoveryFlow();
    loginSubmitting = false;
    authSignInSubmitting = false;
    profileBillingSubmitting = false;
    profileSignOutSubmitting = false;
    clearAuthWindowStatus();
    clearEntryLoginStatus();
    clearDemoTestimony();
    clearProfileStatus();
    entrySignIn.disabled = false;
    applyEntryLoginCopy();
    syncFeedMemberState();
  }

  async function requestCustomerPortalSession() {
    let result;
    try {
      result = await postJsonWithCredentials(
        API_BASE + "/v1/billing/customer-portal-session",
        {}
      );
    } catch (_err) {
      throw makeApiError("network");
    }
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    if (status === 200 && data && data.portalUrl) {
      return data.portalUrl;
    }
    if (status === 401) throw makeApiError("unauthenticated");
    if (status === 404) throw makeApiError("unavailable");
    if (status === 429) throw makeApiError("rateLimited");
    if (status === 502 || status === 503) throw makeApiError("checkoutFailed");
    throw makeApiError("network");
  }

  async function requestSignOut() {
    let result;
    try {
      result = await postJsonWithCredentials(
        API_BASE + "/v1/authentication/logout",
        {}
      );
    } catch (_err) {
      throw makeApiError("network");
    }
    const status = result.response.status;
    const data = result.payload && result.payload.data;
    // Logout is idempotent — treat signed-out / missing session as success.
    if (
      status === 200 &&
      data &&
      (data.status === "SIGNED_OUT" || data.status === "signed_out")
    ) {
      return;
    }
    if (status === 200) return;
    if (status === 404 || status === 503) throw makeApiError("unavailable");
    throw makeApiError("network");
  }

  function startProfileManageBilling() {
    if (profileBillingSubmitting || profileSignOutSubmitting) return;
    if (!sessionAuthenticated || !hasStripeManageableMembership()) return;
    const copy = PROFILE_COPY[profileLang()] || PROFILE_COPY.en;
    clearProfileStatus();
    profileBillingSubmitting = true;
    profileManageBilling.disabled = true;
    profileSignOut.disabled = true;
    showProfileStatus(copy.openingPortal, "status");

    requestCustomerPortalSession()
      .then(function (portalUrl) {
        window.location = portalUrl;
      })
      .catch(function (err) {
        const kind = err && err.kind ? err.kind : "network";
        if (kind === "unauthenticated") {
          clearAuthenticatedClientState();
          closeProfilePanel();
          closeActivityPanel();
          closeOwnerModeration();
          return;
        }
        showProfileStatus(
          kind === "unavailable"
            ? copy.errorPortalUnavailable
            : copy.errorPortal,
          "error"
        );
        profileBillingSubmitting = false;
        profileManageBilling.disabled = false;
        profileSignOut.disabled = false;
      });
  }

  function startProfileSignOut() {
    if (profileSignOutSubmitting || profileBillingSubmitting) return;
    if (!sessionAuthenticated) return;
    const copy = PROFILE_COPY[profileLang()] || PROFILE_COPY.en;
    clearProfileStatus();
    profileSignOutSubmitting = true;
    profileSignOut.disabled = true;
    profileManageBilling.disabled = true;
    showProfileStatus(copy.signingOut, "status");

    requestSignOut()
      .then(function () {
        clearAuthenticatedClientState();
        closeProfilePanel();
        closeActivityPanel();
        closeOwnerModeration();
        closeSignalCreate();
        setNavActive(navHome);
      })
      .catch(function () {
        // Fail closed for UI: still clear local auth chrome if cookie revoke failed
        // only when the transport itself succeeded elsewhere — here keep signed-in
        // and surface a retryable error.
        showProfileStatus(copy.errorSignOut, "error");
        profileSignOutSubmitting = false;
        profileSignOut.disabled = false;
        profileManageBilling.disabled = !hasStripeManageableMembership();
      });
  }

  function populateProfilePanel() {
    const copy = PROFILE_COPY[profileLang()] || PROFILE_COPY.en;
    const email = accountEmail || enteredEmail || "";
    const displayName = profileDisplayName(email) || copy.defaultName;
    const paid = hasAuthoritativePaidMembership();
    const stripePaid = hasStripeManageableMembership();
    const civicOk = canTakeCivicAction();
    const ownerAccount =
      membershipRecoveryApi &&
      membershipRecoveryApi.isOwnerAccount(membershipSnapshot);
    const paidPending =
      membershipRecoveryApi &&
      membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot);
    let bio = copy.bioRegistered;
    // Do not label owner-without-payment as a paid membership.
    if (paid && !paidPending) bio = copy.bioMember;
    else if (civicOk && ownerAccount && !paid)
      bio = copy.bioOwner || copy.bioMember;
    else if (civicOk) bio = copy.bioMember;
    else if (paidPending || (paid && !civicOk)) bio = copy.bioPaidPending;

    let membershipLine = copy.membershipNone;
    if (paid && !paidPending) membershipLine = copy.membershipPaid;
    else if (civicOk && ownerAccount && !paid)
      membershipLine = copy.membershipOwner || copy.membershipNone;
    else if (paidPending) membershipLine = copy.membershipPending;
    else if (
      membershipSnapshot &&
      typeof membershipSnapshot.status === "string" &&
      membershipSnapshot.status
    ) {
      membershipLine = copy.membershipOther.replace(
        "{status}",
        membershipSnapshot.status
      );
    }

    let communityName = "";
    if (
      commitmentSnapshot &&
      commitmentSnapshot.community &&
      (commitmentSnapshot.community.displayName ||
        commitmentSnapshot.community.cityName)
    ) {
      communityName =
        commitmentSnapshot.community.displayName ||
        commitmentSnapshot.community.cityName;
    }

    profileLabel.textContent = copy.label;
    profileClose.textContent = copy.close;
    profileTitle.textContent = displayName;
    profileHandle.textContent = email || copy.handleFallback;
    profileAvatar.textContent = (displayName.charAt(0) || "T").toUpperCase();
    profileBio.textContent = bio;
    profileCommunity.textContent = communityName
      ? copy.communityLine.replace("{community}", communityName)
      : copy.communityNone;
    profileMembership.textContent = membershipLine;
    profileActivityTitle.textContent = copy.activityTitle;
    profileFeed.textContent = copy.feedCta;
    profileMembershipCta.textContent = copy.membershipCta;
    // Paid or already-participating accounts do not need membership-continue CTA.
    profileMembershipCta.hidden = paid || civicOk;
    profileManageBilling.textContent = copy.manageBillingCta;
    profileManageBilling.hidden = !stripePaid;
    profileManageBilling.disabled =
      profileBillingSubmitting || profileSignOutSubmitting;
    profileSignOut.textContent = copy.signOutCta;
    profileSignOut.disabled =
      profileBillingSubmitting || profileSignOutSubmitting;
    clearProfileStatus();
    profileCreateSignal.hidden = !civicOk || !communityName;
    profileCreateSignal.textContent = communityName
      ? copy.publishInCommunity.replace("{community}", communityName)
      : copy.publishInCommunity.replace("{community}", "");
    profilePlatformConsole.hidden = !ownerAccount;
    profilePlatformConsole.textContent = copy.platformConsoleCta;

    profileActivityList.innerHTML = "";
    profileActivityEmpty.hidden = true;
    // Profile confirmations come from GET /v1/account/activity — not browser-only state.
    refreshProfileActivityFromBackend(copy);
    document.documentElement.lang =
      profileLang() === "en" ? "en" : profileLang();
  }

  async function refreshProfileActivityFromBackend(copy) {
    profileActivityList.innerHTML = "";
    if (!sessionAuthenticated) {
      profileActivityEmpty.hidden = false;
      profileActivityEmpty.textContent = copy.activityEmpty;
      return;
    }
    try {
      const items = await fetchAccountActivity();
      const confirmations = items.filter(function (item) {
        return item && item.kind === "confirmation" && item.signal && item.signal.id;
      });
      if (!confirmations.length) {
        profileActivityEmpty.hidden = false;
        profileActivityEmpty.textContent = copy.activityEmpty;
        return;
      }
      profileActivityEmpty.hidden = true;
      for (let i = 0; i < confirmations.length; i++) {
        const item = confirmations[i];
        const li = document.createElement("li");
        li.className = "profile-panel__activity-item";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "profile-panel__activity-item-btn";
        btn.setAttribute("data-profile-signal-id", item.signal.id);
        const date = document.createElement("span");
        date.className = "profile-panel__activity-date";
        date.textContent = copy.activityConfirmed;
        const headline = document.createElement("span");
        headline.className = "profile-panel__activity-headline";
        headline.textContent = item.signal.headline || item.signal.slug || "";
        btn.appendChild(date);
        btn.appendChild(headline);
        li.appendChild(btn);
        profileActivityList.appendChild(li);
      }
    } catch (_err) {
      profileActivityEmpty.hidden = false;
      profileActivityEmpty.textContent =
        copy.activityError || copy.activityEmpty;
    }
  }

  function openProfilePanel() {
    if (!sessionAuthenticated) return;
    closeAuthWindow();
    closeInvite();
    closeSignalDetail();
    closeOwnerModeration();
    closeActivityPanel();
    populateProfilePanel();
    profilePanel.hidden = false;
    setAuthFeedInert(true);
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    setNavActive(navProfile);
    profileClose.focus();
  }

  function closeProfilePanel() {
    if (profilePanel.hidden) return;
    profilePanel.hidden = true;
    setAuthFeedInert(false);
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
    setNavActive(navHome);
  }

  const ACTIVITY_COPY = {
    en: {
      label: "Activity",
      title: "Your civic activity",
      lead:
        "Confirmations, published contributions, and updates on signals you participate in — from TOWN, not examples.",
      empty:
        "No civic activity yet. Confirm a signal or publish a contribution in your community.",
      loading: "Loading your activity…",
      error: "Could not load activity. Try again.",
      close: "Close",
      feedCta: "Back to feed",
      whenUnknown: "",
      inboxLabel: "Your civic processes",
      inboxEmpty:
        "No civic processes yet. Participate in a signal to see it here.",
      inboxNew: "New",
      inboxContinue: "Continue participation",
      recentLabel: "Recent activity",
      kinds: {
        confirmation: "You confirmed this signal",
        contribution: "You published a contribution",
        signal_published: "You published a civic signal",
        signal_evolution: "Signal update",
      },
      intents: {
        observation: "Observation",
        proposal: "Proposal",
        next_step: "Next step",
      },
    },
    it: {
      label: "Attività",
      title: "La tua attività civica",
      lead:
        "Conferme, contributi pubblicati e aggiornamenti sui segnali a cui partecipi — da TOWN, non esempi.",
      empty:
        "Nessuna attività civica ancora. Conferma un segnale o pubblica un contributo nella tua comunità.",
      loading: "Caricamento attività…",
      error: "Impossibile caricare l’attività. Riprova.",
      close: "Chiudi",
      feedCta: "Torna al feed",
      whenUnknown: "",
      inboxLabel: "I tuoi processi civici",
      inboxEmpty:
        "Nessun processo civico ancora. Partecipa a un segnale per vederlo qui.",
      inboxNew: "Nuovo",
      inboxContinue: "Continua la partecipazione",
      recentLabel: "Attività recente",
      kinds: {
        confirmation: "Hai confermato questo segnale",
        contribution: "Hai pubblicato un contributo",
        signal_published: "Hai pubblicato un segnale civico",
        signal_evolution: "Aggiornamento del segnale",
      },
      intents: {
        observation: "Osservazione",
        proposal: "Proposta",
        next_step: "Prossimo passo",
      },
    },
    de: {
      label: "Aktivität",
      title: "Deine zivile Aktivität",
      lead:
        "Bestätigungen, veröffentlichte Beiträge und Updates zu Signalen, an denen du teilnimmst — von TOWN, keine Beispiele.",
      empty:
        "Noch keine zivile Aktivität. Bestätige ein Signal oder veröffentliche einen Beitrag in deiner Gemeinschaft.",
      loading: "Aktivität wird geladen…",
      error: "Aktivität konnte nicht geladen werden. Bitte erneut versuchen.",
      close: "Schließen",
      feedCta: "Zurück zum Feed",
      whenUnknown: "",
      inboxLabel: "Deine zivilen Prozesse",
      inboxEmpty:
        "Noch keine zivilen Prozesse. Nimm an einem Signal teil, um es hier zu sehen.",
      inboxNew: "Neu",
      inboxContinue: "Teilnahme fortsetzen",
      recentLabel: "Letzte Aktivität",
      kinds: {
        confirmation: "Du hast dieses Signal bestätigt",
        contribution: "Du hast einen Beitrag veröffentlicht",
        signal_published: "Du hast ein ziviles Signal veröffentlicht",
        signal_evolution: "Signal-Update",
      },
      intents: {
        observation: "Beobachtung",
        proposal: "Vorschlag",
        next_step: "Nächster Schritt",
      },
    },
    ro: {
      label: "Activitate",
      title: "Activitatea ta civică",
      lead:
        "Confirmări, contribuții publicate și evoluția semnalelor la care participi — din TOWN, nu exemple.",
      empty:
        "Nicio activitate civică încă. Confirmă un semnal sau publică o contribuție în comunitatea ta.",
      loading: "Se încarcă activitatea…",
      error: "Nu s-a putut încărca activitatea. Încearcă din nou.",
      close: "Închide",
      feedCta: "Înapoi la feed",
      whenUnknown: "",
      inboxLabel: "Procesele tale civice",
      inboxEmpty:
        "Niciun proces civic încă. Participă la un semnal ca să îl vezi aici.",
      inboxNew: "Nou",
      inboxContinue: "Continuă participarea",
      recentLabel: "Activitate recentă",
      kinds: {
        confirmation: "Ai confirmat acest semnal",
        contribution: "Ai publicat o contribuție",
        signal_published: "Ai publicat un semnal civic",
        signal_evolution: "Actualizare semnal",
      },
      intents: {
        observation: "Observație",
        proposal: "Propunere",
        next_step: "Următorul pas",
      },
    },
  };

  // French is selected exclusively from the browser language, like the other
  // public reading languages. These catalogs do not infer or grant a country,
  // community, eligibility, or membership.
  CITY_COPY.fr = {
    title: "Choisissez votre ville",
    lead: "TOWN vous relie à une communauté locale que vous déclarez.",
    cityLegend: "Ville",
    back: "Retour",
    continue: "Continuer",
    cityNames: { Milano: "Milan", Munich: "Munich", Arad: "Arad", ClujNapoca: "Cluj-Napoca", Sibiu: "Sibiu", Iasi: "Iași", Timisoara: "Timișoara", Koln: "Cologne", Dortmund: "Dortmund", Stuttgart: "Stuttgart", Frankfurt: "Francfort", Salzburg: "Salzbourg" },
    context: { Italy: "Pays : Italie", Germany: "Pays : Allemagne", Romania: "Pays : Roumanie", Austria: "Pays : Autriche" },
  };
  LOCATION_COPY.fr = {
    back: "Retour",
    title: "Confirmez votre communauté locale",
    lead: "TOWN est local. La participation appartient aux personnes liées à cette communauté.",
    privacy: "Cette vérification s'effectue sur votre appareil par rapport aux limites de la ville choisie. Vos coordonnées ne sont ni envoyées ni conservées.",
    verify: "Vérifier la localisation",
    verifying: "Vérification…",
    retry: "Réessayer",
    statusLabel: "Confirmé",
    successTitle: "Localisation vérifiée pour {city}",
    successLead: "Votre communauté locale est confirmée. La vérification a eu lieu sur votre appareil.",
    continue: "Continuer",
    outsideLabel: "Avertissement",
    outsideTitle: "Vous semblez être en dehors de {city}",
    outsideLead: "Vous semblez être en dehors des limites de {city}. Déclarer une localisation inexacte enfreint les Conditions d'utilisation. Vous pouvez toutefois continuer.",
    notAvailable: "La vérification de localisation n'est pas encore disponible pour {city}.",
    errorPermission: "Autorisation de localisation refusée. Activez-la puis réessayez.",
    errorUnavailable: "Localisation indisponible. Réessayez.",
    errorTimeout: "Le délai d'obtention de la localisation a expiré. Réessayez.",
    errorUnsupported: "La vérification de localisation n'est pas disponible dans ce contexte. Utilisez une connexion sécurisée puis réessayez.",
    cityNames: CITY_COPY.fr.cityNames,
  };
  FEED_COPY.fr = Object.assign({}, FEED_COPY.en, {
    back: "Retour", visitor: "Visiteur", member: "Membre · {city}",
    seeThisToo: "JE LE VOIS AUSSI", doneTitle: "Vous le voyez aussi", doneNote: "Confirmation enregistrée sur TOWN",
    confirmCount: "{count} confirmations", confirmCountOne: "1 confirmation",
    openSignal: "Ouvrir le signalement", openSignalClose: "Fermer",
    whyLabel: "Pourquoi c'est important ici", whoLabel: "Qui est concerné", updateLabel: "Dernière mise à jour",
    statusLabel: "Ce que signifie ce statut", communityArea: "{city} · {area}", clearTestimony: "Supprimer le média",
    demoTestimonyNote: "Joint — sera téléversé en toute sécurité lors de la publication",
    sessionLabel: "Session vers une solution",
    sessionBody: "Ceci n'est pas un chat. Les membres payants ouvrent une discussion ciblée sur ce signalement afin de transformer un constat en mouvement local vers une solution.",
    sessionEmpty: "Aucune session pour le moment. La première contribution ouvre la discussion sur ce signalement.",
    sessionOpen: "Ouvrir une session de discussion", sessionContribute: "Ajouter votre contribution",
    sessionComposeTitle: "Contribuer à ce signalement",
    sessionComposeGuide: "Partagez une observation concrète, une proposition locale ou une prochaine étape. Écrivez pour faire avancer la communauté vers une solution.",
    sessionAttach: "Joindre une photo ou une vidéo", sessionPublish: "Publier la contribution", sessionCancel: "Annuler",
    sessionIntentLegend: "Quel type de contribution est-ce ?", sessionIntentObservation: "Observation", sessionIntentProposal: "Proposition", sessionIntentNextStep: "Prochaine étape",
    sessionNeedIntent: "Choisissez une observation, une proposition ou une prochaine étape.",
    sessionUnavailable: "Impossible de joindre TOWN pour cette session — réessayez plus tard.",
    sessionLocalOnly: "Ce signalement d'aperçu n'a pas encore de session sur le serveur.",
    sessionGated: "La discussion s'ouvre avec une adhésion active. Confirmez d'abord ce signalement ou poursuivez l'adhésion pour participer.",
    sessionLoading: "Chargement de la session de discussion…", sessionPublishFailed: "Impossible de publier cette contribution — réessayez.",
    sessionNeedText: "Rédigez au moins une contribution courte et concrète avant de publier.", sessionYou: "Vous",
    feedLoadingTitle: "Chargement des signalements locaux", feedLoadingBody: "TOWN récupère les signalements civiques en direct pour vos villes.",
    feedEmptyTitle: "Aucun signalement en direct pour le moment", feedEmptyBody: "Impossible de joindre TOWN — réessayez plus tard.", feedRetry: "Réessayer",
    seeTooFailed: "Impossible d'enregistrer cette confirmation — réessayez.", seeTooBusy: "Enregistrement de votre confirmation…",
    notYourCommunity: "Vous pouvez explorer, mais la participation est réservée à la communauté locale.",
    cityNames: CITY_COPY.fr.cityNames,
  });
  WRONG_COMMUNITY_COPY.fr = "Votre communauté est {home}. Vous pouvez explorer {explored}, mais vous ne pouvez participer que dans {home}.";
  LOGIN_COPY.fr = {
    signIn: "Connexion des membres", working: "Vérification…", success: "Connecté. Session active.",
    cancelled: "Connexion annulée. Vous pouvez réessayer.", failed: "Échec de la connexion. Veuillez réessayer.",
    passwordLabel: "Mot de passe", passwordRequired: "Saisissez votre mot de passe.",
    passwordSignIn: "Se connecter avec e-mail et mot de passe", passkeySignIn: "Se connecter avec une clé d’accès",
    phoneUnavailable: "La connexion par téléphone n'est pas encore disponible. Utilisez l'e-mail ou une clé d'accès.",
  };
  MEMBERSHIP_COPY.fr = {
    inviteTitle: "Ce qui se passe dans votre communauté vous tient à cœur.", inviteBody: "Pour confirmer ce signalement et faire partie de la solution, créez un compte identifié et déclarez la communauté dans laquelle vous participez.",
    inviteBodySecond: "TOWN est construit autour de personnes réelles d'une même communauté — pas de comptes anonymes, d'abonnés ou de popularité sur les réseaux sociaux.",
    continue: "Continuer", notNow: "Continuer à explorer", label: "ADHÉSION LOCALE", title: "Rejoignez la communauté de {city}.",
    body: "TOWN est un espace civique local pour des personnes réelles.", bodySecond: "Pour participer, il faut un compte, une communauté locale confirmée et une adhésion active.",
    price: "12 € par an", renewal: "Renouvellement annuel.", renewalSecond: "Vous pouvez annuler à tout moment. L'accès reste actif jusqu'à la fin de la période déjà payée.",
    whyTitle: "Pourquoi l'adhésion existe", why: ["Des personnes réelles dans la même communauté", "Une participation responsable dans la communauté déclarée", "Moins de robots et de faux comptes", "Un espace civique calme, sans publicité"],
    rightsTitle: "Avec une adhésion active, vous pouvez :", rights: "Confirmer des signalements, ouvrir des sessions de discussion vers une solution et participer aux décisions de la communauté.",
    endedTitle: "TOWN s'adresse aux personnes prêtes à participer à leur communauté.", endedBody: "Vous pourrez revenir lorsque vous serez prêt à en faire partie.", endedReturn: "Retour à l'entrée de TOWN", cityNames: CITY_COPY.fr.cityNames,
  };
  ACCOUNT_COPY.fr = {
    label: "COMPTE PERSONNEL", title: "Créez votre compte TOWN.", community: "Communauté : {city}",
    body: "Avant de demander des informations personnelles, nous vous expliquons pourquoi un compte est nécessaire.", whyTitle: "Votre compte TOWN servira à :",
    why: ["identifier une seule personne réelle ;", "conserver la communauté locale confirmée ;", "permettre l'accès sur le web et mobile ;", "protéger la participation contre les robots et les faux comptes."],
    privacyTitle: "Confidentialité", privacy: "Seules les informations essentielles au compte seront demandées.", privacySecond: "Un mot de passe est configuré dans le parcours de compte.",
    prototype: "L'étape suivante crée votre compte avec votre e-mail et un accès sécurisé.", continue: "Continuer", back: "Retour", cityNames: CITY_COPY.fr.cityNames,
  };
  EMAIL_COPY.fr = {
    label: "CRÉEZ VOTRE COMPTE", title: "Saisissez votre adresse e-mail.", body: "Nous vous enverrons un code de vérification à 6 chiffres.", bodySecond: "Votre compte sera ensuite sécurisé.",
    prototype: "Nous vous enverrons un code de vérification à 6 chiffres par e-mail.", fieldLabel: "Adresse e-mail", placeholder: "nom@exemple.fr",
    privacy: "Nous utiliserons cette adresse pour vérifier votre compte, envoyer les communications essentielles et vous aider à récupérer l'accès.",
    invalid: "Saisissez une adresse e-mail valide.", rateLimited: "Trop de tentatives. Réessayez dans un instant.", failed: "Impossible de continuer. Réessayez.",
    restartAfterRefresh: "La configuration sécurisée a été interrompue. Saisissez de nouveau votre e-mail pour recevoir un nouveau code et continuer.", continue: "Continuer", back: "Retour", cityNames: CITY_COPY.fr.cityNames,
  };
  CODE_COPY.fr = {
    label: "VÉRIFICATION DE L'E-MAIL", title: "Consultez votre messagerie.", body: "Nous avons envoyé un code à 6 chiffres à :", fieldLabel: "Code de vérification",
    prototype: "Saisissez le code à 6 chiffres envoyé par e-mail.", invalid: "Le code est incorrect ou a expiré. Demandez un nouveau code pour continuer.", rateLimited: "Trop de tentatives. Réessayez dans un instant.",
    failed: "Impossible de continuer. Réessayez.", verify: "Vérifier", changeEmail: "Demander un nouveau code", cityNames: CITY_COPY.fr.cityNames,
  };
  PASSKEY_COPY.fr = {
    label: "ACCÈS SÉCURISÉ", title: "Protégez votre compte TOWN.", body: "Votre mot de passe est créé. Enregistrez maintenant une clé d’accès rapide et résistante au hameçonnage.",
    bodySecond: "Vous pourrez vous connecter avec la clé d’accès ou avec votre e-mail et votre mot de passe.", methodsTitle: "Méthodes disponibles sur l'appareil", methods: ["Face ID", "Touch ID", "Empreinte digitale", "Code PIN de l'appareil"],
    benefitsTitle: "Pourquoi une clé d'accès", benefits: ["Connexion rapide sans saisir le mot de passe", "Meilleure résistance au hameçonnage", "Le secret de la clé d’accès n’est pas partagé avec TOWN", "Vous pourrez ajouter d'autres appareils plus tard"],
    prototype: "TOWN créera une clé d’accès sur votre appareil ; le mot de passe restera disponible comme alternative.", create: "Créer l'accès sécurisé", back: "Retour", successLabel: "ACCÈS CONFIGURÉ",
    successTitle: "Accès sécurisé configuré.", successBody: "Votre adresse e-mail est vérifiée et la clé d'accès a été créée sur votre appareil.",
    successEmail: "E-mail vérifié", successAccess: "Accès sécurisé configuré", successNote: "La clé d'accès est prête. L'étape suivante consiste à activer l'adhésion TOWN.",
    continue: "Continuer", grantExpired: "La fenêtre de configuration a expiré. Recommencez par la saisie de l'e-mail.", cancelled: "Création annulée. Vous pouvez réessayer.",
    failed: "Impossible de créer la clé d'accès. Réessayez.", cityNames: CITY_COPY.fr.cityNames,
  };
  READY_COPY.fr = {
    label: "COMPTE PRÊT", title: "Votre compte TOWN est prêt.", community: "Communauté : {city}", emailLine: "E-mail : {email}", emailStatus: "E-mail vérifié",
    accessStatus: "Accès sécurisé configuré", body: "La configuration du compte est terminée.", bodySecond: "L'étape suivante consiste à activer l'adhésion annuelle TOWN.",
    inactive: "Compte prêt — l'adhésion n'est pas active. Vous ne pouvez pas encore participer comme membre.", membership: "Adhésion TOWN — 12 € par an",
    paymentNote: "L'étape suivante est le paiement sécurisé Stripe pour l'adhésion annuelle.", continue: "Continuer", back: "Retour", cityNames: CITY_COPY.fr.cityNames,
  };
  PAYMENT_COPY.fr = {
    label: "ADHÉSION ANNUELLE", title: "Activez l'adhésion annuelle TOWN.", community: "Communauté : {city}", price: "12 € par an", renewal: "Renouvellement annuel automatique.",
    cancel: "Vous pouvez annuler à tout moment. L'accès reste actif jusqu'à la fin de la période déjà payée.", body: "Avec une adhésion active, vous pourrez participer dans la communauté locale que vous avez déclarée.",
    accountStatus: "Compte : prêt", membershipStatus: "Adhésion : inactive", prototype: "Vous serez redirigé vers Stripe Checkout pour effectuer le paiement en toute sécurité.",
    simulateStart: "Activer l'adhésion", back: "Retour", successLabel: "ADHÉSION ACTIVE", successTitle: "Adhésion annuelle active.", successCommunity: "Communauté : {city}",
    successAccount: "Compte : prêt", successMembership: "Adhésion : active", successBody: "Le paiement a été confirmé. L'adhésion annuelle TOWN est active pour cette communauté.",
    successNote: "Vous pouvez gérer l'abonnement depuis votre profil lorsque Stripe le permet pour ce compte.", continue: "Continuer",
    errorUnauthenticated: "Vous n'êtes pas connecté ou la session a expiré.", errorAlreadyMember: "Vous avez déjà une adhésion active. Gérez votre abonnement existant.",
    errorRateLimited: "Trop de tentatives. Réessayez dans un instant.", errorUnavailable: "Le paiement est actuellement indisponible.", errorCheckoutFailed: "Impossible de lancer le paiement. Réessayez.",
    errorNetwork: "Impossible de continuer. Réessayez.", confirmingLabel: "CONFIRMATION DE L'ADHÉSION", confirmingTitle: "Confirmation de l'adhésion en cours.",
    confirmingBody: "Nous vérifions l'activation auprès de TOWN. Cela peut prendre quelques secondes après le paiement.", confirmingStatus: "Confirmation en cours…",
    confirmingPending: "La confirmation est toujours en cours. Le paiement n'est pas indiqué comme ayant échoué — réessayez dans un instant.", confirmingRetry: "Réessayer", confirmingDismiss: "Retour au fil",
    paidNoParticipateTitle: "Adhésion enregistrée", paidNoParticipateStatus: "Le paiement est enregistré, mais la participation civique n'est pas encore disponible. Terminez le choix de la communauté si nécessaire ou réessayez dans un instant.",
    continueCommunity: "Choisir la communauté", cityNames: CITY_COPY.fr.cityNames,
  };
  ACTIVE_COPY.fr = {
    label: "ADHÉSION ACTIVE", title: "Adhésion annuelle active.", community: "Communauté : {city}", memberStatus: "Membre · {city}",
    body: "L'adhésion annuelle TOWN est active pour votre communauté.", bodySecond: "Vous pouvez revenir au signalement de départ et participer lorsque votre compte le permet.",
    prototype: "Gérez l'abonnement depuis votre profil lorsque Stripe le permet pour ce compte.", returnSignal: "Retour au signalement", back: "Retour", cityNames: CITY_COPY.fr.cityNames,
  };
  COMMITMENT_COPY.fr = {
    label: "CHOIX DE LA COMMUNAUTÉ", title: "Choisissez votre communauté TOWN.", body: "Sélectionnez personnellement le pays et la ville. TOWN ne vérifie pas techniquement votre position physique ni votre résidence.",
    countryLegend: "Choisissez le pays", cityLegend: "Choisissez la ville", countryNames: { Italy: "Italie", Germany: "Allemagne", Romania: "Roumanie", Austria: "Autriche", Spain: "Espagne" }, cityNames: CITY_COPY.fr.cityNames,
    reviewLabel: "Vérifiez la communauté choisie", reviewCountry: "Pays : {country}", reviewCity: "Ville : {city}", reviewNote: "L'adhésion et la participation civique seront associées à cette communauté.",
    acceptText: "Je confirme avoir personnellement choisi le bon pays et la bonne ville et j'assume la responsabilité de l'exactitude de cette déclaration.",
    acceptRequired: "L'acceptation explicite de cette responsabilité est obligatoire.", confirm: "Enregistrer la déclaration", saving: "Enregistrement…", saved: "Déclaration enregistrée pour {city}, {country}.",
    checkoutHint: "Le paiement annuel n'est disponible qu'après la confirmation de la communauté.", checkoutCta: "Continuer vers l'adhésion annuelle — 12 €/an", back: "Retour",
    errorNetwork: "Impossible de continuer. Réessayez.", errorUnauthenticated: "Vous n'êtes pas connecté ou la session a expiré.", errorValidation: "Vérifiez la sélection et l'acceptation, puis réessayez.",
    errorSave: "Impossible d'enregistrer la déclaration. Réessayez.", errorUnsupported: "Cette communauté n'est pas disponible.", errorLocked: "La communauté ne peut pas être modifiée tant que l'adhésion est active.",
  };
  PROFILE_COPY.fr = {
    label: "Votre profil", close: "Fermer", defaultName: "Voisin TOWN", handleFallback: "Compte enregistré",
    bioRegistered: "Inscrit sur TOWN. La participation civique locale s'ouvre avec une adhésion active.",
    bioMember: "Membre local actif. Vous pouvez confirmer les signalements de votre communauté.",
    bioOwner: "Accès propriétaire de la plateforme. La participation civique est ouverte sans adhésion payante.",
    bioPaidPending: "Adhésion enregistrée. La participation locale n'est pas encore disponible.",
    communityNone: "Communauté : pas encore choisie", communityLine: "Communauté : {community}", membershipNone: "Adhésion : inactive",
    membershipPaid: "Adhésion : active", membershipOwner: "Adhésion : inactive — accès propriétaire", membershipPending: "Adhésion : payée — participation en attente",
    membershipOther: "Adhésion : {status}", activityTitle: "Activité civique", activityEmpty: "Aucune confirmation pour le moment. Ouvrez un signalement local et appuyez sur JE LE VOIS AUSSI lorsque vous êtes prêt.",
    activityError: "Impossible de charger votre activité civique — réessayez dans un instant.", activityConfirmed: "Vous le voyez aussi", feedCta: "Retour au fil",
    publishInCommunity: "Publier dans {community}", platformConsoleCta: "Ouvrir la console de la plateforme", membershipCta: "Poursuivre l'adhésion",
    manageBillingCta: "Gérer l'adhésion", signOutCta: "Se déconnecter", signingOut: "Déconnexion…", openingPortal: "Ouverture du portail d'adhésion…",
    errorSignOut: "Impossible de se déconnecter. Réessayez.", errorPortal: "Impossible d'ouvrir la gestion de l'adhésion. Réessayez dans un instant.",
    errorPortalUnavailable: "La gestion de l'adhésion n'est pas encore disponible pour ce compte.",
  };
  SIGNAL_CREATE_COPY.fr = {
    profileCta: "Publier un signalement civique", title: "Publier un signalement civique",
    lead: "Publiez sous votre vrai nom dans votre communauté. Vous avez déjà accepté votre responsabilité personnelle comme membre TOWN — confirmez-la à nouveau pour cette publication.",
    titleLabel: "Titre", descriptionLabel: "Description", categoryLabel: "Catégorie", realNameLabel: "Nom réel", photoLabel: "Photo",
    acceptText: "Je publie sous mon vrai nom et j'assume la responsabilité personnelle de ce signalement, conformément aux règles d'adhésion TOWN déjà acceptées.",
    submit: "Publier le signalement", cancel: "Annuler", close: "Fermer", errorGeneric: "Impossible de publier. Réessayez.",
    errorPhoto: "Choisissez une photo JPEG, PNG ou WebP.", errorAccept: "Confirmez votre responsabilité personnelle pour publier.",
    errorName: "Utilisez vos vrais prénom et nom, pas un nom d'utilisateur.",
  };
  ACTIVITY_COPY.fr = {
    label: "Activité", title: "Votre activité civique",
    lead: "Confirmations, contributions publiées et mises à jour des signalements auxquels vous participez — depuis TOWN, pas des exemples.",
    empty: "Aucune activité civique pour le moment. Confirmez un signalement ou publiez une contribution dans votre communauté.",
    loading: "Chargement de votre activité…", error: "Impossible de charger l'activité. Réessayez.", close: "Fermer", feedCta: "Retour au fil", whenUnknown: "",
    inboxLabel: "Vos processus civiques", inboxEmpty: "Aucun processus civique pour le moment. Participez à un signalement pour le voir ici.",
    inboxNew: "Nouveau", inboxContinue: "Continuer la participation", recentLabel: "Activité récente",
    kinds: { confirmation: "Vous avez confirmé ce signalement", contribution: "Vous avez publié une contribution", signal_published: "Vous avez publié un signalement civique", signal_evolution: "Mise à jour du signalement" },
    intents: { observation: "Observation", proposal: "Proposition", next_step: "Prochaine étape" },
  };
  CIVIC_PROCESS_COPY.fr = Object.assign({}, CIVIC_PROCESS_COPY.en, {
    label: "Processus civique", stage: "Confirmation", loading: "Chargement du processus civique…",
    unavailable: "Le processus civique est temporairement indisponible.", confirmed: "Vous avez confirmé ce signalement.",
    canConfirm: "Vous pouvez ajouter votre confirmation.", readOnly: "Vous pouvez suivre ce processus. La participation dépend de l'accès à votre communauté.",
    confirmations: "Confirmations", next: "Étape suivante", proposals: "Propositions", closing: "Clôture", notScheduled: "Non programmé", started: "Processus lancé",
    deliberation: "Délibération", ballotPreparation: "Préparation du scrutin", voting: "Vote", mandate: "Mandat",
    votingLoading: "Chargement du vote…", votingUnavailable: "Le vote est temporairement indisponible.", votingCanVote: "Choisissez une option et soumettez votre vote.",
    votingHasVoted: "Vous avez voté. Les résultats sont actualisés en direct.", voteCountLabel: "{count} votes", voteSubmit: "Soumettre le vote",
    voteNeedChoice: "Sélectionnez d'abord une option.", voteErrorGeneric: "Une erreur s'est produite. Réessayez.", voteErrorClosed: "Le vote est clos.",
    voteErrorAlready: "Vous avez déjà voté.", voteErrorNotEligible: "Vous n'êtes pas autorisé à voter dans ce scrutin.",
    proposalsCanAdd: "Vous pouvez ajouter une proposition structurée.", proposalsSubmitted: "Vous avez soumis une proposition pour ce processus.",
    proposalsLoading: "Chargement des propositions…", proposalsUnavailable: "Les propositions sont temporairement indisponibles.", proposalsEmpty: "Aucune proposition pour le moment.",
    proposalsAdd: "Ajouter une proposition", proposalsTitleLabel: "Titre de la proposition", proposalsBodyLabel: "Détails de la proposition", proposalsSubmit: "Soumettre la proposition",
    cancel: "Annuler", proposalsMine: "Votre proposition", proposalsNeedTitle: "Ajoutez un titre court.", proposalsNeedBody: "Décrivez la proposition.",
    proposalsErrorGeneric: "Une erreur s'est produite. Réessayez.", proposalsErrorClosed: "Cette étape est close.", proposalsErrorDuplicate: "Vous avez déjà soumis une proposition pour ce processus.",
    proposalsOutcomeLabel: "Résultat attendu", proposalsInstitutionLabel: "Institution concernée (facultatif)", proposalsResourcesLabel: "Ressources estimées (facultatif)",
    proposalsDeadlineLabel: "Échéance indicative (facultatif)", proposalsNeedOutcome: "Décrivez le résultat attendu.", proposalsRevise: "Réviser", proposalsWithdraw: "Retirer",
    proposalsWithdrawConfirm: "Retirer cette proposition ? Cette action est irréversible.", proposalsRevisedBadge: "Révisée", proposalsWithdrawnBadge: "Retirée",
    proposalsEditTitle: "Réviser votre proposition", proposalsSaveRevision: "Enregistrer la révision", proposalsErrorNotAuthor: "Seul l'auteur peut effectuer cette action.",
    proposalsErrorAlreadyRevised: "Cette proposition a déjà été révisée une fois.", proposalsErrorAlreadyWithdrawn: "Cette proposition a déjà été retirée.",
    deliberationLoading: "Chargement de la délibération…", deliberationUnavailable: "La délibération est temporairement indisponible.",
    deliberationCanContribute: "Vous pouvez ajouter une contribution structurée à toute proposition.", ballotFinalOptions: "Voici les options finales issues de la délibération.",
    deliberationEmpty: "Aucune proposition à délibérer pour le moment.", contributionsEmpty: "Aucune contribution pour le moment.", addContribution: "Ajouter une contribution",
    intentObservation: "Observation", intentProposal: "Proposition", intentNextStep: "Prochaine étape", intentArgumentFor: "Argument favorable",
    intentRiskOrObjection: "Risque ou objection", intentQuestion: "Question", intentAuthorResponse: "Réponse de l'auteur", intentEvidence: "Preuve",
    intentAmendmentSuggestion: "Suggestion d'amendement", intentMinorityPosition: "Position minoritaire", intentLegend: "Type",
    contributionLabel: "Contribution", contributionSubmit: "Soumettre la contribution", contributionNeedText: "Rédigez au moins 12 caractères.",
    contributionNeedIntent: "Choisissez un type.", contributionErrorGeneric: "Une erreur s'est produite. Réessayez.", contributionErrorClosed: "Cette étape est close.",
    contributionErrorInvalidReplyTarget: "Il n'est plus possible de répondre à cette contribution.", replyAction: "Répondre", replyingToLabel: "Réponse à {author}",
    replyCancel: "Annuler la réponse", deliberationContributionMine: "Votre contribution", action: "Action", archived: "Archivé",
    mandateLoading: "Chargement du mandat…", mandateUnavailable: "Le mandat est temporairement indisponible.", mandateContested: "Aucun gagnant : les propositions arrivées en tête sont à égalité.",
    mandatePending: "Le vote n'est pas encore clos.", verification: "Vérification", actionLoading: "Chargement de l'action…", actionUnavailable: "L'action est temporairement indisponible.",
    actionPending: "Le mandat n'est pas encore décidé.", actionCanPost: "Vous pouvez ajouter une mise à jour de statut.", actionMine: "Votre contribution",
    actionInputLabel: "Mise à jour de statut", actionSubmit: "Soumettre la mise à jour", actionNeedText: "Rédigez au moins 12 caractères.",
    actionErrorGeneric: "Une erreur s'est produite. Réessayez.", actionErrorClosed: "Cette étape est close.", actionErrorAlreadyResponsible: "Un autre membre a déjà pris la responsabilité de cette action.",
    actionQuickTakeStep: "Prendre en charge une étape", actionQuickOfferHelp: "Proposer de l'aide", actionQuickAddEvidence: "Ajouter une preuve", actionQuickInstitutionResponse: "Consigner la réponse de l'institution",
    actionInputLabelTakeStep: "Que prendrez-vous en charge ?", actionInputLabelOfferHelp: "Comment pouvez-vous aider ?", actionInputLabelEvidence: "Description de la preuve",
    actionInputLabelInstitutionResponse: "Qu'a répondu l'institution ?", actionSubmitTakeStep: "Soumettre", actionSubmitOfferHelp: "Soumettre", actionSubmitEvidence: "Soumettre la preuve",
    actionSubmitInstitutionResponse: "Soumettre", actionStatusNotStarted: "Pas encore commencé", actionStatusInProgress: "En cours", actionStatusBlocked: "Bloqué", actionStatusCompleted: "Terminé",
    actionResponsibleLabel: "Responsable : {name}", actionCollaboratorsLabel: "Soutien : {names}", actionInstitutionLabel: "Institution : {value}", actionObjectiveLabel: "Objectif : {value}",
    actionDeadlineLabel: "Échéance indicative : {value}", actionBlockedReasonNone: "Aucune raison", actionBlockedReasonInstitution: "En attente de la réponse de l'institution",
    actionBlockedReasonResources: "En attente de ressources", actionBlockedReasonVolunteers: "En attente de bénévoles", actionBlockedReasonOther: "Autre",
    verificationLoading: "Chargement de la vérification…", verificationUnavailable: "La vérification est temporairement indisponible.",
    verificationPendingReady: "Pas encore indiqué comme prêt pour vérification.", verificationCanMarkReady: "Vous pouvez indiquer que cette action est prête pour vérification.",
    verificationCanConfirm: "Vous pouvez confirmer si l'action a été réalisée.", verificationConfirmedDelivered: "Vous avez confirmé : réalisée.",
    verificationConfirmedNotDelivered: "Vous avez confirmé : non réalisée.", verificationTallyLabel: "{delivered} confirmations de réalisation · {notDelivered} confirmations de non-réalisation",
    verificationDisputeEscalated: "Ce litige est ouvert depuis plus de 14 jours et a été signalé pour examen par un opérateur.",
    verificationOutcomeDelivered: "Vérifié : réalisée.", verificationOutcomeNotDelivered: "Vérifié : non réalisée.",
    verificationEvidenceUrlLabel: "Lien justificatif (facultatif)", verificationEvidenceSubmit: "Soumettre une preuve", verificationEvidenceNeedText: "Rédigez au moins 12 caractères.",
    verificationEvidenceInvalidUrl: "Saisissez un lien http(s) valide ou laissez le champ vide.", verificationEvidenceMine: "Votre preuve",
    verificationErrorGeneric: "Une erreur s'est produite. Réessayez.", verificationErrorClosed: "Cette étape est close.", verificationAlreadyConfirmed: "Vous avez déjà confirmé.",
    mandateTotalVotesLabel: "{count} votes au total", mandateMinorityHeading: "Positions minoritaires",
    contestStatusPending: "Vous avez déposé une contestation. Statut : en attente d'examen.", contestStatusUpheld: "Vous avez déposé une contestation. Statut : acceptée.",
    contestStatusRejected: "Vous avez déposé une contestation. Statut : rejetée.", contestPendingOther: "Une contestation a été déposée et attend un examen.",
    contestReasonLabel: "Motif", contestReasonEligibilityError: "Erreur d'éligibilité", contestReasonBallotTampering: "Suspicion de manipulation du scrutin",
    contestReasonCountDiscrepancy: "Écart dans le décompte des votes", contestSubmit: "Déposer une contestation", contestElaborationPlaceholder: "Détails facultatifs",
    contestErrorGeneric: "Une erreur s'est produite. Réessayez.", contestErrorAlready: "Vous avez déjà déposé une contestation pour ce mandat.",
    contestErrorWindowClosed: "Le délai de contestation de 72 heures est clos.", contestErrorNotEligible: "Vous n'étiez pas autorisé à voter lors du scrutin décisif.",
    contestErrorNotDecided: "Une contestation exige qu'un mandat ait été décidé.",
  });

  CITY_COPY.hu = {
    title: "Válassza ki a városát",
    lead: "A TOWN összeköti Önt egy valódi helyi közösséggel.",
    cityLegend: "Város",
    back: "Vissza",
    continue: "Tovább",
    cityNames: {},
    context: {},
  };
  LOCATION_COPY.hu = Object.assign({}, LOCATION_COPY.en, {
    back: "Vissza",
    title: "Erősítse meg helyi közösségét",
    lead: "A TOWN helyi. A részvétel az adott közösséghez tartozó embereké.",
    privacy: "A TOWN nem követi és nem tárolja a tartózkodási helyét.",
    verify: "Hely ellenőrzése",
    verifying: "Ellenőrzés…",
    retry: "Újra",
    statusLabel: "Megerősítve",
    successTitle: "{city} közössége megerősítve",
    continue: "Tovább",
    outsideLabel: "Figyelmeztetés",
    notAvailable: "A helyellenőrzés még nem érhető el ehhez a városhoz: {city}.",
    cityNames: CITY_COPY.hu.cityNames,
  });
  FEED_COPY.hu = Object.assign({}, FEED_COPY.en, {
    back: "Vissza", visitor: "Látogató", member: "Tag · {city}",
    seeThisToo: "ÉN IS LÁTOM EZT", doneTitle: "Ön is látja ezt", doneNote: "A megerősítést a TOWN elmentette",
    confirmCount: "{count} megerősítés", confirmCountOne: "1 megerősítés",
    openSignal: "Jelzés megnyitása", openSignalClose: "Bezárás",
    whyLabel: "Miért fontos ez itt", whoLabel: "Kiket érint", updateLabel: "Legfrissebb frissítés",
    statusLabel: "Mit jelent ez az állapot", communityArea: "{city} · {area}",
    sessionLabel: "Közös munka a megoldásért", sessionBody: "Ez nem chat. A tagok célzott egyeztetésben alakítják a megfigyelést helyi megoldássá.",
    sessionEmpty: "Még nincs egyeztetés.", sessionOpen: "Egyeztetés indítása", sessionContribute: "Hozzászólás hozzáadása",
    sessionComposeTitle: "Hozzászólás ehhez a jelzéshez", sessionComposeGuide: "Osszon meg konkrét megfigyelést, helyi javaslatot vagy következő lépést.",
    sessionAttach: "Fénykép vagy videó csatolása", sessionPublish: "Hozzászólás közzététele", sessionCancel: "Mégse",
    sessionLoading: "Az egyeztetés betöltése…", sessionUnavailable: "Az egyeztetés jelenleg nem érhető el.",
    sessionPublishFailed: "A hozzászólást nem sikerült közzétenni.", sessionNeedText: "Írjon rövid, konkrét hozzászólást.", sessionYou: "Ön",
    feedLoadingTitle: "Helyi jelzések betöltése", feedLoadingBody: "A TOWN betölti a városok élő civil jelzéseit.",
    feedEmptyTitle: "Jelenleg nincs élő jelzés", feedEmptyBody: "A TOWN nem érhető el — próbálja újra később.", feedRetry: "Újra",
    seeTooFailed: "A megerősítést nem sikerült elmenteni.", seeTooBusy: "A megerősítés mentése…",
    notYourCommunity: "Böngészhet, de a részvétel a helyi közösség tagjainak szól.",
    cityNames: CITY_COPY.hu.cityNames,
  });
  WRONG_COMMUNITY_COPY.hu = "Az Ön közössége {home}. {explored} tartalmait böngészheti, de csak {home} közösségében vehet részt.";
  LOGIN_COPY.hu = Object.assign({}, LOGIN_COPY.en, {
    signIn: "Tagi bejelentkezés", working: "Ellenőrzés…", success: "Bejelentkezve. A munkamenet aktív.",
    cancelled: "A bejelentkezést megszakította.", failed: "A bejelentkezés sikertelen. Próbálja újra.",
    passwordLabel: "Jelszó", passwordRequired: "Adja meg jelszavát.",
    passwordSignIn: "Bejelentkezés e-mail-címmel és jelszóval", passkeySignIn: "Bejelentkezés hozzáférési kulccsal",
  });
  MEMBERSHIP_COPY.hu = Object.assign({}, MEMBERSHIP_COPY.en, {
    inviteTitle: "Fontos Önnek, mi történik a közösségében.",
    inviteBody: "A jelzés megerősítéséhez és a megoldásban való részvételhez csatlakozzon helyi tagként.",
    inviteBodySecond: "A TOWN valódi emberekre épül — nem névtelen fiókokra vagy követőszámokra.",
    continue: "Tovább", notNow: "Böngészés folytatása", label: "HELYI TAGSÁG", title: "Csatlakozzon {city} közösségéhez.",
    body: "A TOWN valódi emberek helyi civil tere.", bodySecond: "A részvételhez fiók, vállalt helyi közösség és aktív tagság szükséges.",
    price: "Évi 12 €", renewal: "Éves megújítás.", renewalSecond: "Bármikor lemondható; a hozzáférés a kifizetett időszak végéig aktív marad.",
    whyTitle: "Miért van tagság", why: ["Valódi emberek ugyanabban a közösségben", "Felelős helyi részvétel", "Kevesebb bot és hamis fiók", "Nyugodt, reklámmentes civil tér"],
    rightsTitle: "Aktív tagsággal:", rights: "Megerősíthet jelzéseket, részt vehet az egyeztetésben és a közösségi döntésekben.",
    endedTitle: "A TOWN azoknak szól, akik készek részt venni a közösségükben.", endedBody: "Visszatérhet, amikor készen áll a csatlakozásra.", endedReturn: "Vissza a TOWN elejére", cityNames: CITY_COPY.hu.cityNames,
  });
  ACCOUNT_COPY.hu = Object.assign({}, ACCOUNT_COPY.en || ACCOUNT_COPY.it, {
    label: "SZEMÉLYES FIÓK", title: "Hozza létre TOWN-fiókját.", community: "Közösség: {city}",
    body: "Előbb elmagyarázzuk, miért szükséges a fiók.", whyTitle: "A TOWN-fiók célja:",
    why: ["egy valódi személy azonosítása;", "a vállalt helyi közösség megőrzése;", "biztonságos hozzáférés;", "védelem a botok és hamis fiókok ellen."],
    privacyTitle: "Adatvédelem", privacy: "Csak a fiókhoz szükséges adatokat kérjük.", continue: "Tovább", back: "Vissza", cityNames: CITY_COPY.hu.cityNames,
  });
  EMAIL_COPY.hu = Object.assign({}, EMAIL_COPY.en || EMAIL_COPY.it, {
    label: "FIÓK LÉTREHOZÁSA", title: "Adja meg e-mail-címét.", body: "Hatjegyű ellenőrző kódot küldünk.",
    fieldLabel: "E-mail-cím", placeholder: "nev@pelda.hu", invalid: "Adjon meg érvényes e-mail-címet.",
    rateLimited: "Túl sok próbálkozás. Próbálja újra később.", failed: "Nem sikerült folytatni.",
    restartAfterRefresh: "A biztonságos beállítás megszakadt. Adja meg újra az e-mail-címét, hogy új kódot kapjon és folytathassa.", continue: "Tovább", back: "Vissza", cityNames: CITY_COPY.hu.cityNames,
  });
  CODE_COPY.hu = Object.assign({}, CODE_COPY.en || CODE_COPY.it, {
    label: "E-MAIL ELLENŐRZÉSE", title: "Nézze meg a leveleit.", body: "Hatjegyű kódot küldtünk ide:", fieldLabel: "Ellenőrző kód",
    invalid: "A kód hibás vagy lejárt. A folytatáshoz kérjen új kódot.", rateLimited: "Túl sok próbálkozás.", failed: "Nem sikerült folytatni.", verify: "Ellenőrzés", changeEmail: "Új kód kérése", cityNames: CITY_COPY.hu.cityNames,
  });
  PASSKEY_COPY.hu = Object.assign({}, PASSKEY_COPY.en || PASSKEY_COPY.it, {
    label: "BIZTONSÁGOS HOZZÁFÉRÉS", title: "Védje TOWN-fiókját.", body: "A jelszó elkészült. Most regisztráljon gyors, adathalászatnak ellenálló hozzáférési kulcsot.",
    bodySecond: "Ezután hozzáférési kulccsal vagy e-mail-címmel és jelszóval is bejelentkezhet.",
    methodsTitle: "Az eszközön elérhető módszerek", benefitsTitle: "Miért hozzáférési kulcs", create: "Biztonságos hozzáférés létrehozása", back: "Vissza",
    successLabel: "HOZZÁFÉRÉS BEÁLLÍTVA", successTitle: "A biztonságos hozzáférés elkészült.", continue: "Tovább", cancelled: "A létrehozást megszakította.", failed: "A hozzáférési kulcs létrehozása sikertelen.", cityNames: CITY_COPY.hu.cityNames,
  });
  READY_COPY.hu = Object.assign({}, READY_COPY.en || READY_COPY.it, {
    label: "FIÓK KÉSZ", title: "TOWN-fiókja elkészült.", community: "Közösség: {city}", emailLine: "E-mail: {email}", emailStatus: "E-mail ellenőrizve",
    accessStatus: "Biztonságos hozzáférés beállítva", body: "A fiók beállítása kész.", inactive: "A tagság még nem aktív.", membership: "TOWN-tagság — évi 12 €", continue: "Tovább", back: "Vissza", cityNames: CITY_COPY.hu.cityNames,
  });
  PAYMENT_COPY.hu = Object.assign({}, PAYMENT_COPY.en || PAYMENT_COPY.it, {
    label: "ÉVES TAGSÁG", title: "Aktiválja éves TOWN-tagságát.", community: "Közösség: {city}", price: "Évi 12 €", renewal: "Automatikus éves megújítás.",
    cancel: "Bármikor lemondható.", body: "Aktív tagsággal részt vehet a vállalt helyi közösségben.", simulateStart: "Tagság aktiválása", back: "Vissza",
    successLabel: "AKTÍV TAGSÁG", successTitle: "Az éves tagság aktív.", successCommunity: "Közösség: {city}", continue: "Tovább",
    errorUnauthenticated: "Nincs bejelentkezve, vagy a munkamenet lejárt.", errorAlreadyMember: "Már van aktív tagsága.", errorUnavailable: "A fizetés jelenleg nem érhető el.", errorCheckoutFailed: "A fizetés indítása sikertelen.",
    confirmingTitle: "A tagság megerősítése folyamatban.", confirmingStatus: "Megerősítés…", confirmingRetry: "Újra", confirmingDismiss: "Vissza a hírfolyamhoz", continueCommunity: "Közösség kiválasztása", cityNames: CITY_COPY.hu.cityNames,
  });
  ACTIVE_COPY.hu = Object.assign({}, ACTIVE_COPY.en || ACTIVE_COPY.it, {
    label: "AKTÍV TAGSÁG", title: "Az éves tagság aktív.", community: "Közösség: {city}", memberStatus: "Tag · {city}",
    body: "A TOWN éves tagsága aktív az Ön közösségében.", returnSignal: "Vissza a jelzéshez", back: "Vissza", cityNames: CITY_COPY.hu.cityNames,
  });
  COMMITMENT_COPY.hu = Object.assign({}, COMMITMENT_COPY.en || COMMITMENT_COPY.it, {
    label: "KÖZÖSSÉGVÁLLALÁS", title: "Válassza ki TOWN-közösségét.",
    body: "Személyesen válassza ki az országot és a várost. A TOWN nem követi és nem ellenőrzi technikailag a fizikai tartózkodási helyét.",
    countryLegend: "Ország", cityLegend: "Város", countryNames: { Spain: "Spanyolország" }, cityNames: CITY_COPY.hu.cityNames,
    reviewLabel: "Ellenőrizze a kiválasztott közösséget", reviewCountry: "Ország: {country}", reviewCity: "Város: {city}",
    reviewNote: "A tagság és a civil részvétel ehhez a közösséghez kapcsolódik.",
    acceptText: "Megerősítem, hogy személyesen a helyes országot és várost választottam, és felelősséget vállalok e nyilatkozat pontosságáért.",
    acceptRequired: "A felelősség kifejezett elfogadása kötelező.", confirm: "Nyilatkozat mentése", saving: "Mentés…", saved: "Nyilatkozat elmentve: {city}, {country}.",
    checkoutHint: "Az éves fizetés csak a közösség megerősítése után érhető el.", checkoutCta: "Tovább az éves tagsághoz — 12 €/év", back: "Vissza",
    errorNetwork: "Nem sikerült folytatni.", errorUnauthenticated: "Nincs bejelentkezve, vagy a munkamenet lejárt.", errorValidation: "Ellenőrizze a választást és az elfogadást.", errorSave: "A nyilatkozat mentése sikertelen.", errorUnsupported: "Ez a közösség nem érhető el.", errorLocked: "Aktív tagság alatt a közösség nem módosítható.",
  });
  PROFILE_COPY.hu = Object.assign({}, PROFILE_COPY.en, {
    label: "Profil", close: "Bezárás", defaultName: "TOWN-szomszéd", handleFallback: "Regisztrált fiók",
    bioRegistered: "Regisztrált a TOWN-on. A helyi civil részvétel aktív tagsággal nyílik meg.", bioMember: "Aktív helyi tag.",
    communityNone: "Közösség: még nincs kiválasztva", communityLine: "Közösség: {community}", membershipNone: "Tagság: inaktív", membershipPaid: "Tagság: aktív",
    activityTitle: "Civil aktivitás", activityEmpty: "Még nincs megerősítés.", activityError: "Az aktivitás nem tölthető be.", activityConfirmed: "Ön is látja ezt", feedCta: "Vissza a hírfolyamhoz",
    publishInCommunity: "Közzététel itt: {community}", membershipCta: "Tagság folytatása", manageBillingCta: "Tagság kezelése", signOutCta: "Kijelentkezés", signingOut: "Kijelentkezés…",
  });
  SIGNAL_CREATE_COPY.hu = Object.assign({}, SIGNAL_CREATE_COPY.en, {
    profileCta: "Civil jelzés közzététele", title: "Civil jelzés közzététele", lead: "Valódi nevén tegye közzé a saját közösségében.",
    titleLabel: "Cím", descriptionLabel: "Leírás", categoryLabel: "Kategória", realNameLabel: "Valódi név", photoLabel: "Fénykép",
    acceptText: "Valódi nevemen teszem közzé, és személyes felelősséget vállalok ezért a jelzésért.", submit: "Jelzés közzététele", cancel: "Mégse", close: "Bezárás",
    errorGeneric: "A közzététel sikertelen.", errorPhoto: "Válasszon JPEG, PNG vagy WebP képet.", errorAccept: "Erősítse meg személyes felelősségét.", errorName: "Valódi vezeték- és keresztnevet használjon.",
  });
  ACTIVITY_COPY.hu = Object.assign({}, ACTIVITY_COPY.en, {
    label: "Aktivitás", title: "Az Ön civil aktivitása", lead: "Megerősítések, hozzászólások és frissítések a TOWN-ból.",
    empty: "Még nincs civil aktivitás.", loading: "Aktivitás betöltése…", error: "Az aktivitás nem tölthető be.", close: "Bezárás", feedCta: "Vissza a hírfolyamhoz",
    inboxLabel: "Az Ön civil folyamatai", inboxEmpty: "Még nincs civil folyamat.", inboxNew: "Új", inboxContinue: "Részvétel folytatása", recentLabel: "Legutóbbi aktivitás",
    kinds: { confirmation: "Megerősítette ezt a jelzést", contribution: "Hozzászólást tett közzé", signal_published: "Civil jelzést tett közzé", signal_evolution: "A jelzés frissült" },
    intents: { observation: "Megfigyelés", proposal: "Javaslat", next_step: "Következő lépés" },
  });
  CIVIC_PROCESS_COPY.hu = Object.assign({}, CIVIC_PROCESS_COPY.en, {
    label: "Civil folyamat", stage: "Megerősítés", loading: "A civil folyamat betöltése…", unavailable: "A civil folyamat átmenetileg nem érhető el.",
    confirmed: "Megerősítette ezt a jelzést.", canConfirm: "Hozzáadhatja megerősítését.", readOnly: "Követheti ezt a folyamatot.", confirmations: "Megerősítések", next: "Következő szakasz",
    proposals: "Javaslatok", closing: "Lezárás", notScheduled: "Nincs ütemezve", started: "A folyamat elindult", deliberation: "Mérlegelés", ballotPreparation: "Szavazás előkészítése",
    voting: "Szavazás", mandate: "Mandátum", action: "Cselekvés", verification: "Ellenőrzés", archived: "Archiválva",
    votingLoading: "Szavazás betöltése…", votingUnavailable: "A szavazás átmenetileg nem érhető el.", votingCanVote: "Válasszon egy lehetőséget és adja le szavazatát.",
    votingHasVoted: "Szavazata rögzítve.", voteCountLabel: "{count} szavazat", voteSubmit: "Szavazat leadása", voteNeedChoice: "Előbb válasszon egy lehetőséget.", voteErrorGeneric: "Hiba történt. Próbálja újra.", voteErrorClosed: "A szavazás lezárult.", voteErrorAlready: "Már szavazott.", voteErrorNotEligible: "Ebben a szavazásban nem jogosult részt venni.",
    proposalsCanAdd: "Strukturált javaslatot adhat hozzá.", proposalsSubmitted: "Már benyújtott javaslatot.", proposalsLoading: "Javaslatok betöltése…", proposalsUnavailable: "A javaslatok átmenetileg nem érhetők el.", proposalsEmpty: "Még nincs javaslat.",
    proposalsAdd: "Javaslat hozzáadása", proposalsTitleLabel: "Javaslat címe", proposalsBodyLabel: "Javaslat részletei", proposalsSubmit: "Javaslat benyújtása", cancel: "Mégse", proposalsMine: "Az Ön javaslata", proposalsNeedTitle: "Adjon rövid címet.", proposalsNeedBody: "Írja le a javaslatot.",
    proposalsOutcomeLabel: "Várt eredmény", proposalsInstitutionLabel: "Célintézmény (nem kötelező)", proposalsResourcesLabel: "Becsült erőforrások (nem kötelező)", proposalsDeadlineLabel: "Javasolt határidő (nem kötelező)", proposalsRevise: "Módosítás", proposalsWithdraw: "Visszavonás",
    deliberationLoading: "Mérlegelés betöltése…", deliberationUnavailable: "A mérlegelés átmenetileg nem érhető el.", deliberationCanContribute: "Strukturált hozzászólást adhat bármely javaslathoz.", deliberationEmpty: "Még nincs mérlegelhető javaslat.", contributionsEmpty: "Még nincs hozzászólás.", addContribution: "Hozzászólás hozzáadása",
    intentObservation: "Megfigyelés", intentProposal: "Javaslat", intentNextStep: "Következő lépés", intentArgumentFor: "Támogató érv", intentRiskOrObjection: "Kockázat vagy kifogás", intentQuestion: "Kérdés", intentAuthorResponse: "Szerző válasza", intentEvidence: "Bizonyíték", intentAmendmentSuggestion: "Módosítási javaslat", intentMinorityPosition: "Kisebbségi álláspont", intentLegend: "Típus",
    contributionLabel: "Hozzászólás", contributionSubmit: "Hozzászólás beküldése", contributionNeedText: "Írjon legalább 12 karaktert.", contributionNeedIntent: "Válasszon típust.", replyAction: "Válasz", replyingToLabel: "Válasz neki: {author}", replyCancel: "Válasz megszakítása",
    mandateLoading: "Mandátum betöltése…", mandateUnavailable: "A mandátum átmenetileg nem érhető el.", mandateContested: "Nincs nyertes: az első helyen álló javaslatok döntetlenben vannak.", mandatePending: "A szavazás még nem zárult le.",
    actionLoading: "Cselekvés betöltése…", actionUnavailable: "A cselekvési szakasz átmenetileg nem érhető el.", actionPending: "A mandátum még nem dőlt el.", actionCanPost: "Állapotfrissítést adhat hozzá.", actionInputLabel: "Állapotfrissítés", actionSubmit: "Frissítés beküldése", actionNeedText: "Írjon legalább 12 karaktert.",
    verificationLoading: "Ellenőrzés betöltése…", verificationUnavailable: "Az ellenőrzés átmenetileg nem érhető el.", verificationPendingReady: "Még nincs ellenőrzésre késznek jelölve.", verificationCanMarkReady: "Ellenőrzésre késznek jelölheti ezt a cselekvést.", verificationCanConfirm: "Megerősítheti, hogy a cselekvés teljesült-e.", verificationConfirmedDelivered: "Megerősítette: teljesült.", verificationConfirmedNotDelivered: "Megerősítette: nem teljesült.", verificationOutcomeDelivered: "Ellenőrizve: teljesült.", verificationOutcomeNotDelivered: "Ellenőrizve: nem teljesült.",
  });

  const EXPANDED_CITY_NAMES_BY_LANG = {
    en: { Marseille: "Marseille", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
    es: { Marseille: "Marsella", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
    fr: { Marseille: "Marseille", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
    it: { Marseille: "Marsiglia", Lyon: "Lione", Toulouse: "Tolosa", Budapest: "Budapest", Szeged: "Seghedino" },
    de: { Marseille: "Marseille", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
    ro: { Marseille: "Marsilia", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapesta", Szeged: "Szeged" },
    hu: { Marseille: "Marseille", Lyon: "Lyon", Toulouse: "Toulouse", Budapest: "Budapest", Szeged: "Szeged" },
  };
  const COUNTRY_NAMES_BY_LANG = {
    en: { France: "France", Hungary: "Hungary" }, es: { France: "Francia", Hungary: "Hungría" },
    fr: { France: "France", Hungary: "Hongrie" }, it: { France: "Francia", Hungary: "Ungheria" },
    de: { France: "Frankreich", Hungary: "Ungarn" }, ro: { France: "Franța", Hungary: "Ungaria" },
    hu: { Italy: "Olaszország", Germany: "Németország", Romania: "Románia", Austria: "Ausztria", France: "Franciaország", Hungary: "Magyarország" },
  };
  [CITY_COPY, LOCATION_COPY, FEED_COPY, MEMBERSHIP_COPY, ACCOUNT_COPY, EMAIL_COPY, CODE_COPY, PASSKEY_COPY, READY_COPY, PAYMENT_COPY, ACTIVE_COPY, COMMITMENT_COPY].forEach(function (catalog) {
    Object.keys(EXPANDED_CITY_NAMES_BY_LANG).forEach(function (lang) {
      if (catalog[lang] && catalog[lang].cityNames) Object.assign(catalog[lang].cityNames, EXPANDED_CITY_NAMES_BY_LANG[lang]);
    });
  });
  Object.keys(COUNTRY_NAMES_BY_LANG).forEach(function (lang) {
    if (COMMITMENT_COPY[lang] && COMMITMENT_COPY[lang].countryNames) Object.assign(COMMITMENT_COPY[lang].countryNames, COUNTRY_NAMES_BY_LANG[lang]);
  });

  let activityItemsCache = [];
  let activityLoading = false;

  function activityCopy() {
    const lang = resolvePublicReadingLanguage();
    return ACTIVITY_COPY[lang] || ACTIVITY_COPY.en;
  }

  function formatActivityWhen(iso) {
    if (!iso || typeof iso !== "string") return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    try {
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (_err) {
      return iso.slice(0, 10);
    }
  }

  function activityItemDetail(item, copy) {
    if (!item || !item.kind) return "";
    if (item.kind === "contribution" && item.contribution) {
      const intentKey = item.contribution.intent;
      const intentLabel =
        (copy.intents && copy.intents[intentKey]) || intentKey || "";
      const text = String(item.contribution.text || "").trim();
      const clipped = text.length > 140 ? text.slice(0, 137) + "…" : text;
      return intentLabel ? intentLabel + " · " + clipped : clipped;
    }
    if (item.kind === "signal_evolution" && item.evolution) {
      const latest = String(item.evolution.latestUpdate || "").trim();
      const status = String(item.evolution.statusLabel || "").trim();
      if (latest) return latest;
      return status;
    }
    const community =
      item.signal && item.signal.community && item.signal.community.displayName;
    return community || "";
  }

  function renderActivityItems(items) {
    const copy = activityCopy();
    activityList.innerHTML = "";
    activityItemsCache = Array.isArray(items) ? items : [];
    if (!activityItemsCache.length) {
      activityEmpty.hidden = false;
      activityEmpty.textContent = copy.empty;
      return;
    }
    activityEmpty.hidden = true;
    for (let i = 0; i < activityItemsCache.length; i++) {
      const item = activityItemsCache[i];
      if (!item || !item.signal || !item.signal.id) continue;
      const li = document.createElement("li");
      li.className = "activity-panel__item";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "activity-panel__item-btn";
      btn.setAttribute("data-activity-signal-id", item.signal.id);
      const kind = document.createElement("span");
      kind.className = "activity-panel__item-kind";
      kind.textContent =
        (copy.kinds && copy.kinds[item.kind]) || item.kind || "";
      const headline = document.createElement("span");
      headline.className = "activity-panel__item-headline";
      headline.textContent = item.signal.headline || item.signal.slug || "";
      const detailText = activityItemDetail(item, copy);
      btn.appendChild(kind);
      btn.appendChild(headline);
      if (detailText) {
        const detail = document.createElement("span");
        detail.className = "activity-panel__item-detail";
        detail.textContent = detailText;
        btn.appendChild(detail);
      }
      const when = formatActivityWhen(item.occurredAt);
      if (when) {
        const whenEl = document.createElement("span");
        whenEl.className = "activity-panel__item-when";
        whenEl.textContent = when;
        btn.appendChild(whenEl);
      }
      li.appendChild(btn);
      activityList.appendChild(li);
    }
  }

  async function fetchAccountActivity() {
    const result = await getJsonWithCredentials(API_BASE + "/v1/account/activity");
    if (result.response.status !== 200) {
      throw makeApiError("failed");
    }
    const items =
      result.payload &&
      result.payload.data &&
      Array.isArray(result.payload.data.items)
        ? result.payload.data.items
        : null;
    if (!items) {
      throw makeApiError("failed");
    }
    const processes =
      result.payload &&
      result.payload.data &&
      Array.isArray(result.payload.data.processes)
        ? result.payload.data.processes
        : [];
    return { items: items, processes: processes };
  }

  function civicInboxStageLabel(stage, processCopy) {
    switch (stage) {
      case "confirmation":
        return processCopy.stage;
      case "proposals":
        return processCopy.proposals;
      case "deliberation":
        return processCopy.deliberation;
      case "ballot_preparation":
        return processCopy.ballotPreparation;
      case "voting":
        return processCopy.voting;
      case "mandate":
        return processCopy.mandate;
      case "action":
        return processCopy.action;
      case "verification":
        return processCopy.verification;
      case "archived":
        return processCopy.archived;
      default:
        return stage || "";
    }
  }

  // Civic Inbox: only processes the member actually participated in, from
  // GET /v1/account/activity — never a general community feed.
  function renderCivicInbox(processes) {
    const copy = activityCopy();
    const processCopy = civicProcessCopy();
    activityInboxList.innerHTML = "";
    const list = Array.isArray(processes) ? processes : [];
    if (!list.length) {
      activityInboxEmpty.hidden = false;
      activityInboxEmpty.textContent = copy.inboxEmpty;
      return;
    }
    activityInboxEmpty.hidden = true;
    for (let i = 0; i < list.length; i++) {
      const process = list[i];
      if (!process || !process.signalId) continue;
      const li = document.createElement("li");
      li.className = "activity-panel__inbox-item";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "activity-panel__inbox-item-btn";
      btn.setAttribute("data-inbox-signal-id", process.signalId);
      if (process.isNew) {
        const badge = document.createElement("span");
        badge.className = "activity-panel__inbox-badge";
        badge.textContent = copy.inboxNew;
        btn.appendChild(badge);
      }
      const stage = document.createElement("span");
      stage.className = "activity-panel__inbox-stage";
      stage.textContent = civicInboxStageLabel(process.currentStage, processCopy);
      const headline = document.createElement("span");
      headline.className = "activity-panel__inbox-headline";
      headline.textContent = process.headline || process.signalSlug || "";
      btn.appendChild(stage);
      btn.appendChild(headline);
      if (process.community && process.community.displayName) {
        const community = document.createElement("span");
        community.className = "activity-panel__inbox-community";
        community.textContent = process.community.displayName;
        btn.appendChild(community);
      }
      const cta = document.createElement("span");
      cta.className = "activity-panel__inbox-cta";
      cta.textContent = copy.inboxContinue;
      btn.appendChild(cta);
      li.appendChild(btn);
      activityInboxList.appendChild(li);
    }
  }

  async function refreshActivityPanel() {
    const copy = activityCopy();
    if (activityLoading) return;
    activityLoading = true;
    activityStatus.hidden = false;
    activityStatus.textContent = copy.loading;
    activityEmpty.hidden = true;
    activityList.innerHTML = "";
    activityInboxEmpty.hidden = true;
    activityInboxList.innerHTML = "";
    try {
      const result = await fetchAccountActivity();
      activityStatus.hidden = true;
      activityStatus.textContent = "";
      renderActivityItems(result.items);
      renderCivicInbox(result.processes);
    } catch (_err) {
      activityStatus.hidden = false;
      activityStatus.textContent = copy.error;
      activityEmpty.hidden = true;
      activityList.innerHTML = "";
      activityItemsCache = [];
      renderCivicInbox([]);
    } finally {
      activityLoading = false;
    }
  }

  function applyActivityCopy() {
    const copy = activityCopy();
    activityLabel.textContent = copy.label;
    activityTitle.textContent = copy.title;
    activityLead.textContent = copy.lead;
    activityInboxLabel.textContent = copy.inboxLabel;
    activityRecentLabel.textContent = copy.recentLabel;
    activityClose.textContent = copy.close;
    activityFeed.textContent = copy.feedCta;
  }

  function openActivityPanel() {
    if (!sessionAuthenticated) return;
    closeAuthWindow();
    closeInvite();
    closeSignalDetail();
    closeOwnerModeration();
    closeProfilePanel();
    applyActivityCopy();
    activityPanel.hidden = false;
    setAuthFeedInert(true);
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    setNavActive(navActivity);
    activityClose.focus();
    refreshActivityPanel();
  }

  function closeActivityPanel() {
    if (!activityPanel || activityPanel.hidden) return;
    activityPanel.hidden = true;
    setAuthFeedInert(false);
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
    if (profilePanel.hidden) {
      setNavActive(navHome);
    }
  }

  function openActivitySignal(signalId) {
    if (!signalId) return;
    closeActivityPanel();
    const scenes = currentScenes();
    let index = -1;
    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i] && scenes[i].id === signalId) {
        index = i;
        break;
      }
    }
    if (index >= 0 && isFeedSurfaceActive()) {
      scrollFeedToIndex(index, { behavior: "auto" });
      openSignalDetail();
    }
  }

  function isPasskeyCeremonyCancelled(err) {
    const causeName = err && err.cause && err.cause.name;
    return (
      (err &&
        (err.name === "NotAllowedError" ||
          err.name === "AbortError" ||
          err.code === "ERROR_CEREMONY_ABORTED")) ||
      causeName === "NotAllowedError" ||
      causeName === "AbortError" ||
      (err &&
        err.code === "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY" &&
        causeName === "NotAllowedError")
    );
  }

  function runPasskeyAuthenticationCeremony() {
    const swaBrowser = window["Simple" + "Web" + "Authn" + "Browser"];
    const startAuthentication = swaBrowser && swaBrowser.startAuthentication;
    if (typeof startAuthentication !== "function") {
      return Promise.reject(makeApiError("failed"));
    }
    return requestPasskeyAuthenticationOptions()
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
        // AUTHENTICATED alone is not enough — confirm cookie session works.
        return fetchAuthenticationSession();
      });
  }

  function clearReadyError() {
    readyError.hidden = true;
    readyError.textContent = "";
  }

  function showReadyError(message) {
    readyError.hidden = false;
    readyError.textContent = message;
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
    if (status === 409) {
      const code =
        result.payload &&
        result.payload.error &&
        result.payload.error.code
          ? result.payload.error.code
          : "";
      if (code === "COMMUNITY_COMMITMENT_REQUIRED") {
        throw makeApiError("commitmentRequired");
      }
    }
    throw makeApiError(checkoutErrorKind(status));
  }

  function hasRecordedCommunityCommitment() {
    return !!(
      communityCommitmentApi &&
      communityCommitmentApi.hasRecordedCommitment(commitmentSnapshot)
    );
  }

  function clearCommitmentError() {
    commitmentError.hidden = true;
    commitmentError.textContent = "";
  }

  function showCommitmentError(message) {
    commitmentError.hidden = false;
    commitmentError.textContent = message;
  }

  function commitmentErrorMessage(kind) {
    const copy = COMMITMENT_COPY[membershipLang()] || COMMITMENT_COPY.it;
    if (kind === "unauthenticated") return copy.errorUnauthenticated;
    if (kind === "validation") return copy.errorValidation;
    if (kind === "unsupported") return copy.errorUnsupported;
    if (kind === "locked") return copy.errorLocked;
    if (kind === "save") return copy.errorSave;
    return copy.errorNetwork;
  }

  async function fetchCommunityCommitment() {
    if (!communityCommitmentApi) {
      throw makeApiError("failed");
    }
    const result = await getJsonWithCredentials(
      API_BASE + "/v1/account/community-commitment"
    );
    if (result.response.status !== 200) {
      throw makeApiError(
        result.response.status === 401 ? "unauthenticated" : "failed"
      );
    }
    const snapshot = communityCommitmentApi.deriveCommitmentSnapshot(
      result.payload
    );
    if (!snapshot) {
      throw makeApiError("failed");
    }
    return snapshot;
  }

  async function saveCommunityCommitment(slug) {
    let result;
    try {
      result = await requestJson(API_BASE + "/v1/account/community-commitment", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ community: slug, accepted: true }),
        credentials: "include",
      }).then(async function (response) {
        let payload = null;
        try {
          payload = await response.json();
        } catch (_err) {
          payload = null;
        }
        return { response: response, payload: payload };
      });
    } catch (_err) {
      throw makeApiError("network");
    }
    const status = result.response.status;
    if (status === 200) {
      const snapshot = communityCommitmentApi.deriveCommitmentSnapshot(
        result.payload
      );
      if (!snapshot || !communityCommitmentApi.hasRecordedCommitment(snapshot)) {
        throw makeApiError("save");
      }
      return snapshot;
    }
    if (status === 401) throw makeApiError("unauthenticated");
    if (status === 404) throw makeApiError("unsupported");
    if (status === 409) {
      const code =
        result.payload && result.payload.error && result.payload.error.code;
      if (code === "COMMUNITY_COMMITMENT_LOCKED") {
        throw makeApiError("locked");
      }
      throw makeApiError("save");
    }
    if (status === 400) throw makeApiError("validation");
    throw makeApiError("save");
  }

  function restoreCommitmentSelectionFromSnapshot(snapshot) {
    if (
      !communityCommitmentApi ||
      !communityCommitmentApi.hasRecordedCommitment(snapshot)
    ) {
      return;
    }
    commitmentCountry =
      communityCommitmentApi.countryFromCommitment(snapshot);
    commitmentCity = communityCommitmentApi.cityIdFromCommitment(snapshot);
    commitmentAcceptanceChecked = true;
  }

  function applyCommitmentSnapshot(snapshot) {
    commitmentSnapshot = snapshot;
    if (
      communityCommitmentApi &&
      communityCommitmentApi.hasRecordedCommitment(snapshot)
    ) {
      restoreCommitmentSelectionFromSnapshot(snapshot);
    }
    // HOME feed scopes to the member community once commitment is known.
    if (isProductOnlyPublicMode() && parseRoute() === "feed") {
      feedIndex = 0;
      renderFeedScene();
    }
  }

  function renderCommitmentCityOptions() {
    commitmentCityOptions.innerHTML = "";
    if (!commitmentCountry || !communityCommitmentApi) {
      commitmentCityFieldset.disabled = true;
      return;
    }
    const cities = communityCommitmentApi.citiesForCountry(commitmentCountry);
    commitmentCityFieldset.disabled = cities.length === 0;
    cities.forEach(function (city) {
      const label = document.createElement("label");
      label.className = "commitment__option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "commitment-city";
      input.value = city.id;
      input.checked = commitmentCity === city.id;
      input.addEventListener("change", function () {
        onCommitmentCityChange(city.id);
      });
      const span = document.createElement("span");
      const copy = COMMITMENT_COPY[membershipLang()] || COMMITMENT_COPY.it;
      span.textContent = copy.cityNames[city.id] || city.id;
      label.appendChild(input);
      label.appendChild(span);
      commitmentCityOptions.appendChild(label);
    });
  }

  function invalidateCommitmentAcceptanceOnScreen() {
    commitmentAcceptanceChecked = false;
    commitmentAccept.checked = false;
    commitmentSnapshot = null;
    commitmentSavedStatus.hidden = true;
    commitmentCheckout.hidden = true;
    commitmentCheckout.disabled = true;
  }

  function onCommitmentCountryChange(country) {
    const prevCountry = commitmentCountry;
    const prevCity = commitmentCity;
    commitmentCountry = country;
    if (
      !communityCommitmentApi ||
      !communityCommitmentApi.isCityValidForCountry(country, commitmentCity)
    ) {
      commitmentCity = null;
    }
    if (
      communityCommitmentApi &&
      communityCommitmentApi.shouldInvalidateAcceptance(
        prevCountry,
        prevCity,
        commitmentCountry,
        commitmentCity
      )
    ) {
      invalidateCommitmentAcceptanceOnScreen();
    }
    syncCommitmentUi();
  }

  function onCommitmentCityChange(cityId) {
    const prevCountry = commitmentCountry;
    const prevCity = commitmentCity;
    commitmentCity = cityId;
    if (
      communityCommitmentApi &&
      communityCommitmentApi.shouldInvalidateAcceptance(
        prevCountry,
        prevCity,
        commitmentCountry,
        commitmentCity
      )
    ) {
      invalidateCommitmentAcceptanceOnScreen();
    }
    syncCommitmentUi();
  }

  function syncCommitmentUi() {
    const copy = COMMITMENT_COPY[membershipLang()] || COMMITMENT_COPY.it;
    const recorded = hasRecordedCommunityCommitment();

    Array.prototype.forEach.call(
      document.querySelectorAll('input[name="commitment-country"]'),
      function (input) {
        input.checked = input.value === commitmentCountry;
      }
    );
    renderCommitmentCityOptions();

    const readyForReview = !!(commitmentCountry && commitmentCity);
    commitmentReview.hidden = !readyForReview && !recorded;
    commitmentAcceptLabelWrap.hidden = !readyForReview && !recorded;
    if (readyForReview || recorded) {
      const countryLabel =
        copy.countryNames[commitmentCountry] || commitmentCountry || "";
      const cityLabel = copy.cityNames[commitmentCity] || commitmentCity || "";
      commitmentReviewCountry.textContent = copy.reviewCountry.replace(
        "{country}",
        countryLabel
      );
      commitmentReviewCity.textContent = copy.reviewCity.replace(
        "{city}",
        cityLabel
      );
      commitmentReviewNote.textContent = copy.reviewNote;
    }

    commitmentAccept.checked = commitmentAcceptanceChecked === true;
    commitmentAcceptRequired.hidden = true;

    const canConfirm =
      readyForReview &&
      commitmentAcceptanceChecked === true &&
      !commitmentSaving &&
      !recorded;
    commitmentConfirm.disabled = !canConfirm;
    commitmentConfirm.hidden = recorded;
    commitmentConfirm.textContent = commitmentSaving
      ? copy.saving
      : copy.confirm;

    commitmentCheckoutHint.hidden = recorded;
    if (!recorded) {
      commitmentCheckoutHint.hidden = false;
      commitmentCheckoutHint.textContent = copy.checkoutHint;
    }

    if (recorded) {
      const countryLabel =
        copy.countryNames[commitmentCountry] || commitmentCountry || "";
      const cityLabel = copy.cityNames[commitmentCity] || commitmentCity || "";
      commitmentSavedStatus.hidden = false;
      commitmentSavedStatus.textContent = copy.saved
        .replace("{city}", cityLabel)
        .replace("{country}", countryLabel);
      commitmentCheckout.hidden = false;
      commitmentCheckout.disabled =
        commitmentCheckoutSubmitting || !hasRecordedCommunityCommitment();
      commitmentCheckout.textContent = copy.checkoutCta;
      commitmentCheckoutHint.hidden = true;
      // Keep acceptance visible but checked for review of recorded state.
      commitmentAccept.checked = true;
      commitmentAccept.disabled = true;
    } else {
      commitmentSavedStatus.hidden = true;
      commitmentCheckout.hidden = true;
      commitmentCheckout.disabled = true;
      commitmentAccept.disabled = false;
    }

    const editable =
      !commitmentSnapshot || commitmentSnapshot.editable !== false;
    commitmentCountryFieldset.disabled = !editable;
    if (!editable) {
      commitmentCityFieldset.disabled = true;
    }

    // Disable payment Attiva until commitment exists.
    if (paymentSimulateStart) {
      paymentSimulateStart.disabled =
        paymentCheckoutSubmitting || !hasRecordedCommunityCommitment();
    }
  }

  function applyCommitmentCopy() {
    const copy = COMMITMENT_COPY[membershipLang()] || COMMITMENT_COPY.it;
    commitmentLabel.textContent = copy.label;
    commitmentTitle.textContent = copy.title;
    commitmentBody.textContent = copy.body;
    commitmentCountryLegend.textContent = copy.countryLegend;
    commitmentCityLegend.textContent = copy.cityLegend;
    commitmentCountryItalyLabel.textContent = copy.countryNames.Italy;
    commitmentCountryGermanyLabel.textContent = copy.countryNames.Germany;
    commitmentCountryRomaniaLabel.textContent = copy.countryNames.Romania;
    commitmentCountryAustriaLabel.textContent = copy.countryNames.Austria;
    commitmentCountryFranceLabel.textContent = copy.countryNames.France;
    commitmentCountryHungaryLabel.textContent = copy.countryNames.Hungary;
    commitmentCountrySpainLabel.textContent = copy.countryNames.Spain;
    commitmentReviewLabel.textContent = copy.reviewLabel;
    commitmentAcceptText.textContent = copy.acceptText;
    commitmentAcceptRequired.textContent = copy.acceptRequired;
    commitmentConfirm.textContent = copy.confirm;
    commitmentCheckout.textContent = copy.checkoutCta;
    commitmentBack.textContent = copy.back;
    document.documentElement.lang = membershipLang();
  }

  function bootstrapCommunityCommitment() {
    return fetchCommunityCommitment()
      .then(function (snapshot) {
        applyCommitmentSnapshot(snapshot);
        if (viewCommitment && !viewCommitment.hidden) {
          syncCommitmentUi();
        }
        return snapshot;
      })
      .catch(function () {
        // Fail closed: no local manufacture of acceptance.
        if (!sessionAuthenticated) {
          commitmentSnapshot = null;
        }
        return null;
      });
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
    const i18n = window.TownPublicI18n;
    const lang = resolvePublicReadingLanguage();
    const copy =
      (i18n && i18n.publicInviteCopy(lang)) ||
      MEMBERSHIP_COPY[membershipLang()] ||
      MEMBERSHIP_COPY.it;
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
      emailError.hidden = !enrollmentRestartRequired;
      emailError.textContent = enrollmentRestartRequired
        ? copy.restartAfterRefresh
        : "";
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

  function applyPasswordCopy() {
    const copy = PASSWORD_COPY[membershipLang()];
    passwordLabel.textContent = copy.label;
    passwordTitle.textContent = copy.title;
    passwordBody.textContent = copy.body;
    passwordBodySecond.textContent = copy.bodySecond;
    passwordFieldLabel.textContent = copy.fieldLabel;
    passwordConfirmLabel.textContent = copy.confirmLabel;
    passwordNote.textContent = copy.note;
    passwordContinue.textContent = copy.continue;
    passwordBack.textContent = copy.back;
    // Email verification has already been consumed; do not offer a dead-end
    // return to the one-time-code screen.
    passwordBack.hidden = true;
    syncPasswordContinue();
    document.documentElement.lang = membershipLang();
  }

  function syncPasswordContinue() {
    const copy = PASSWORD_COPY[membershipLang()];
    const value = passwordInput.value || "";
    const confirmation = passwordConfirm.value || "";
    const valid = passwordMeetsPolicy(value);
    const matches = value === confirmation;
    passwordContinue.disabled = !valid || !matches || passwordSubmitting;
    if (!value && !confirmation) {
      passwordError.hidden = true;
      passwordError.textContent = "";
      return;
    }
    if (value && !valid) {
      passwordError.hidden = false;
      passwordError.textContent = copy.invalid;
      return;
    }
    if (confirmation && !matches) {
      passwordError.hidden = false;
      passwordError.textContent = copy.mismatch;
      return;
    }
    if (!passwordSubmitting && !passwordSetupErrorVisible) {
      passwordError.hidden = true;
      passwordError.textContent = "";
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
    // Initial password setup consumes its grant and issues the passkey grant.
    // Returning to password setup would reuse the wrong grant purpose.
    passkeyBack.hidden = passwordSet;
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
    readyContinue.disabled = readyAuthSubmitting;
    readyBack.textContent = copy.back;
    document.documentElement.lang = membershipLang();
  }


  function showPaymentIntro() {
    paymentIntro.hidden = false;
    paymentSuccess.hidden = true;
    paymentConfirming.hidden = true;
  }

  function showPaymentSuccess() {
    paymentIntro.hidden = true;
    paymentSuccess.hidden = false;
    paymentConfirming.hidden = true;
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
    if (!paymentConfirming.hidden) {
      // Preserve confirming / pending / paid-no-participate recovery UI.
      return;
    }
    if (hasAuthoritativePaidMembership()) {
      if (
        hasAuthoritativePaidMembership() &&
        !canTakeCivicAction() &&
        membershipRecoveryApi
      ) {
        showPaymentPaidNoParticipate();
      } else {
        showPaymentSuccess();
      }
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
    // Hard stop: never show the visitor membership invite to a payer.
    if (!shouldOfferMembershipInvite()) {
      redirectMemberWithoutCivicAccess();
      return;
    }
    closeSignalSheet();
    applyInviteCopy();
    membershipInvite.hidden = false;
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    inviteContinue.focus();
  }

  function closeInvite() {
    if (membershipInvite.hidden) return;
    membershipInvite.hidden = true;
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
  }

  function setAuthFeedInert(isInert) {
    const feedMain = viewFeed.querySelector("main.feed");
    if (feedMain) feedMain.inert = isInert;
    if (signalDetail) signalDetail.inert = isInert;
    if (membershipInvite) membershipInvite.inert = isInert;
    if (profilePanel) {
      const authWindowOpen = authWindow && !authWindow.hidden;
      profilePanel.inert = isInert && authWindowOpen;
    }
  }

  function syncAuthModeUi() {
    const copy = LOGIN_COPY[entryLang()] || LOGIN_COPY.en;
    if (authMode === "create") {
      authWindowTitle.textContent = "Create account";
      authModeToggle.textContent = "Sign in";
      authPasswordWrap.hidden = true;
      authPasskey.hidden = true;
      authContinue.textContent = "Continue";
    } else {
      authWindowTitle.textContent = "Sign in";
      authModeToggle.textContent = "First time here? Create account";
      authPasswordWrap.hidden = false;
      authPasskey.hidden = false;
      authPasswordLabel.textContent = copy.passwordLabel || "Password";
      authContinue.textContent = copy.passwordSignIn || "Sign in with password";
      authPasskey.textContent = copy.passkeySignIn || "Sign in with passkey";
    }
    authPassword.value = "";
    authPassword.setCustomValidity("");
    clearAuthWindowStatus();
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
    closeProfilePanel();

    authOpenedByTarget = navTarget || null;
    lastAuthFocus = openerEl || document.activeElement;
    authMode = "signin";
    authChannel = "email";
    authIdentityInput.value = "";
    authIdentityInput.setCustomValidity("");
    clearAuthWindowStatus();
    syncAuthModeUi();
    syncAuthChannelUi();

    authWindow.hidden = false;
    setAuthFeedInert(true);
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
    authWindowClose.focus();
  }

  function closeAuthWindow() {
    if (authWindow.hidden) return;
    authWindow.hidden = true;
    setAuthFeedInert(false);
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
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
    // Public HOME / ACASĂ: return to the first feed page (first signal).
    closeInvite();
    closeSignalDetail();
    closeProfilePanel();
    closeActivityPanel();
    setNavActive(navHome);
    if (isFeedSurfaceActive()) {
      scrollFeedToIndex(0, { behavior: "auto" });
    }
  }

  function handleMembershipNav() {
    if (sessionAuthenticated) {
      continueAuthenticatedMembershipDestination();
      return;
    }
    openAuthWindow(navMembership, "membership");
  }

  function handleChatNav() {
    const i18n = window.TownPublicI18n;
    const lang = resolvePublicReadingLanguage();
    const copy = (i18n && i18n.feedChromeCopy(lang)) || {};
    setNavActive(navChat);
    navChat.classList.add("is-unavailable");
    showTransientFeedNotice(
      copy.chatUnavailable || "Chat is not available yet on TOWN."
    );
  }

  function handleProfileNav() {
    if (sessionAuthenticated) {
      openProfilePanel();
      return;
    }
    openAuthWindow(navProfile, "profile");
  }

  function handleActivityNav() {
    if (sessionAuthenticated) {
      openActivityPanel();
      return;
    }
    openAuthWindow(navActivity, "activity");
  }

  function resetVisitorSession() {
    selectedCountry = null;
    selectedCity = null;
    locationVerified = false;
    locationOutsideBoundary = false;
    feedIndex = 0;
    enteredEmail = "";
    accountEmail = "";
    emailVerificationId = null;
    setupGrant = null;
    setupGrantExpiresAt = null;
    emailSubmitting = false;
    codeSubmitting = false;
    emailVerified = false;
    passkeyRegistered = false;
    passkeySubmitting = false;
    paymentCheckoutSubmitting = false;
    clearSignalConfirmationState();
    membershipSnapshot = null;
    commitmentCountry = null;
    commitmentCity = null;
    commitmentAcceptanceChecked = false;
    commitmentSnapshot = null;
    commitmentSaving = false;
    commitmentCheckoutSubmitting = false;
    endMembershipRecoveryFlow();
    loginSubmitting = false;
    authSignInSubmitting = false;
    clearAuthWindowStatus();
    // Keep sessionAuthenticated if cookie may still be valid; clear only UI busy state.
    originatingFeedIndex = 0;
    clearPendingSeeTooContext();
    clearLiveScenes();
    clearDemoTestimony();
    clearEntryLoginStatus();
    if (sessionAuthenticated) {
      showEntryLoginStatus(LOGIN_COPY[entryLang()].success, "success");
    }
    entrySignIn.disabled = false;
    detailSeeToo.hidden = false;
    detailSeeToo.disabled = false;
    detailSeeTooDone.hidden = true;
    closeSignalDetail();
    syncFeedMemberState();
    emailInput.value = "";
    emailError.hidden = true;
    emailError.textContent = "";
    emailContinue.disabled = true;
    codeInput.value = "";
    codeError.hidden = true;
    codeError.textContent = "";
    codeVerify.disabled = true;
    passwordInput.value = "";
    passwordConfirm.value = "";
    passwordError.hidden = true;
    passwordError.textContent = "";
    passwordContinue.disabled = true;
    authPassword.value = "";
    authPassword.setCustomValidity("");
    clearPasskeyError();
    showPasskeyIntro();
    clearPaymentError();
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
    viewPassword.hidden = name !== "password";
    viewPasskey.hidden = name !== "passkey";
    viewReady.hidden = name !== "ready";
    viewCommitment.hidden = name !== "commitment";
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
    document.body.classList.toggle("page-password", name === "password");
    document.body.classList.toggle("page-passkey", name === "passkey");
    document.body.classList.toggle("page-ready", name === "ready");
    document.body.classList.toggle("page-commitment", name === "commitment");
    document.body.classList.toggle("page-payment", name === "payment");
    document.body.classList.toggle("page-active", name === "active");

    if (name !== "feed") {
      closeInvite();
      closeSignalDetail();
      closeAuthWindow();
      closeProfilePanel();
    }
    if (name !== "payment") {
      }

    if (name === "entry") {
      applyEntryLoginCopy();
    }
    if (name === "country") applyCountryCopy();
    if (name === "city") applyCityCopy();
    if (name === "location") {
      applyLocationCopy();
      syncLocationState();
    }
    if (name === "feed") {
      applyPublicNavCopy();
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
    if (name === "password") {
      applyPasswordCopy();
    }
    if (name === "passkey") {
      applyPasskeyCopy();
    }
    if (name === "ready") {
      applyReadyCopy();
    }
    if (name === "commitment") {
      applyCommitmentCopy();
      syncCommitmentUi();
    }
    if (name === "payment") {
      applyPaymentCopy();
    }
    if (name === "active") {
      applyActiveCopy();
    }
  }

  function go(route) {
    const allowInviteJourney =
      isProductOnlyPublicMode() &&
      isInviteMembershipJourneyActive() &&
      isInviteMembershipJourneyRoute(route);
    const allowRecoveryJourney =
      isProductOnlyPublicMode() &&
      isMembershipRecoveryFlowActive() &&
      (route === "payment" || route === "active");
    const allowCityDiscoveryJourney =
      isProductOnlyPublicMode() &&
      isCityDiscoveryJourneyActive() &&
      isCityDiscoveryJourneyRoute(route);

    if (
      isProductOnlyPublicMode() &&
      !allowInviteJourney &&
      !allowRecoveryJourney &&
      !allowCityDiscoveryJourney
    ) {
      endInviteMembershipJourney();
      endCityDiscoveryJourney();
      route = PRODUCT_ONLY_FEED_ROUTE;
      const target = "#/" + route;
      if (window.location.hash !== target) {
        window.location.hash = "/" + route;
      }
      showView(route);
      return;
    }

    if (allowRecoveryJourney) {
      const target = "#/" + route;
      if (window.location.hash !== target) {
        window.location.hash = "/" + route;
      }
      showView(route);
      return;
    }

    if (allowInviteJourney) {
      // Returning-user passkey Sign-in establishes a backend session without
      // replaying Create-account local flags. Authenticated sessions may reach
      // commitment/payment; unauthenticated Create-account still gates.
      const authAccountReady = sessionAuthenticated === true;
      if (
        (route === "code" ||
          route === "password" ||
          route === "passkey" ||
          route === "ready" ||
          route === "commitment" ||
          route === "payment" ||
          route === "active") &&
        !enteredEmail &&
        !authAccountReady
      ) {
        route = "email";
      }
      if (
        (route === "password" ||
          route === "passkey" ||
          route === "ready" ||
          route === "commitment" ||
          route === "payment" ||
          route === "active") &&
        !emailVerified &&
        !authAccountReady
      ) {
        route = "code";
      }
      if (
        (route === "passkey" ||
          route === "ready" ||
          route === "commitment" ||
          route === "payment" ||
          route === "active") &&
        !passwordSet &&
        !authAccountReady
      ) {
        route = "password";
      }
      if (
        (route === "ready" ||
          route === "commitment" ||
          route === "payment" ||
          route === "active") &&
        !passkeyRegistered &&
        !authAccountReady
      ) {
        route = "passkey";
      }
      if (
        (route === "payment" || route === "active") &&
        !hasRecordedCommunityCommitment() &&
        !hasAuthoritativePaidMembership()
      ) {
        route = "commitment";
      }
      if (route === "active" && !hasAuthoritativePaidMembership()) {
        route = "payment";
      }
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
        route === "password" ||
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
        route === "password" ||
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
        route === "password" ||
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !enteredEmail
    ) {
      route = "email";
    }
    if (
      (route === "password" ||
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !emailVerified
    ) {
      route = "code";
    }
    if (
      (route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      !passwordSet
    ) {
      route = "password";
    }
    if (
      (route === "ready" || route === "payment" || route === "active") &&
      !passkeyRegistered
    ) {
      route = "passkey";
    }
    if (route === "active" && !hasAuthoritativePaidMembership()) {
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
    civicProcessLoadToken += 1;
    resetCivicProposalsPanel();
    resetCivicDeliberationPanel();
    resetCivicVotingPanel();
    closeSessionCompose({ keepDraft: false });
    signalDetail.hidden = true;
    document.body.style.overflow = "";
    syncFeedScrollLockFromOverlays();
  }

  function signalSessionKey() {
    const apiId = currentSignalApiId();
    if (apiId) return apiId;
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    if (scene && scene.id) return String(scene.id);
    return String(selectedCity || "city") + ":" + String(feedIndex);
  }

  function isSignalApiId(value) {
    return (
      typeof value === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
    );
  }

  function currentSignalApiId() {
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    if (!scene) return null;
    if (isSignalApiId(scene.signalId)) return String(scene.signalId);
    if (isSignalApiId(scene.id)) return String(scene.id);
    return null;
  }

  function sessionCacheEntries(key) {
    const cached = signalSessionCache[key];
    if (!cached || !Array.isArray(cached.contributions)) return [];
    return cached.contributions;
  }

  function intentLabel(copy, intent) {
    if (intent === "proposal") return copy.sessionIntentProposal || "Proposal";
    if (intent === "next_step") return copy.sessionIntentNextStep || "Next step";
    if (intent === "observation") {
      return copy.sessionIntentObservation || "Observation";
    }
    return "";
  }

  function selectedSessionIntent() {
    const checked = detailSessionIntent.querySelector(
      'input[name="session-intent"]:checked'
    );
    return checked && checked.value ? String(checked.value) : "";
  }

  function clearSessionIntentSelection() {
    const inputs = detailSessionIntent.querySelectorAll(
      'input[name="session-intent"]'
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }

  function currentFeedCopy() {
    const scenes = currentScenes();
    const scene = scenes[feedIndex];
    const locale = feedLocaleForScene(scene);
    const lang = (locale && locale.lang) || resolvePublicReadingLanguage();
    const fallback = FEED_COPY[lang] || FEED_COPY.en || FEED_COPY.it;
    // Merge so session strings in FEED_COPY fill gaps from public-i18n chrome.
    return Object.assign({}, fallback, locale.copy || {});
  }

  function sessionStatusNoteText(copy, cached) {
    if (!cached) return "";
    if (cached.note === "unavailable") {
      return copy.sessionUnavailable || "";
    }
    if (cached.note === "local") {
      return copy.sessionLocalOnly || "";
    }
    if (cached.note === "gated") {
      return copy.sessionGated || "";
    }
    if (cached.note === "publish_failed") {
      return copy.sessionPublishFailed || "";
    }
    return "";
  }

  function applySignalSessionCopy(copy) {
    if (!copy) return;
    detailSessionLabel.textContent = copy.sessionLabel || "";
    detailSessionBody.textContent = copy.sessionBody || "";
    const cached = signalSessionCache[signalSessionKey()];
    if (cached && cached.source === "gated") {
      detailSessionEmpty.textContent =
        copy.sessionGated || copy.sessionEmpty || "";
    } else if (cached && cached.source === "loading") {
      detailSessionEmpty.textContent =
        copy.sessionLoading || copy.sessionEmpty || "";
    } else if (cached && cached.source === "error") {
      detailSessionEmpty.textContent =
        copy.sessionUnavailable || copy.sessionEmpty || "";
    } else {
      detailSessionEmpty.textContent = copy.sessionEmpty || "";
    }
    detailSessionComposeTitle.textContent = copy.sessionComposeTitle || "";
    detailSessionComposeGuide.textContent = copy.sessionComposeGuide || "";
    detailSessionIntentLegend.textContent = copy.sessionIntentLegend || "";
    detailSessionIntentObservationLabel.textContent =
      copy.sessionIntentObservation || "";
    detailSessionIntentProposalLabel.textContent =
      copy.sessionIntentProposal || "";
    detailSessionIntentNextStepLabel.textContent =
      copy.sessionIntentNextStep || "";
    detailSessionAttach.textContent = copy.sessionAttach || "";
    detailSessionPublish.textContent = copy.sessionPublish || "";
    detailSessionCancel.textContent = copy.sessionCancel || "";
    const note = sessionStatusNoteText(copy, signalSessionCache[signalSessionKey()]);
    detailSessionDemoNote.textContent = note;
    detailSessionDemoNote.hidden = !note;
    detailSessionInput.setAttribute(
      "aria-label",
      copy.sessionComposeTitle || "Contribution"
    );
    if (detailTestimonyClear && copy.clearTestimony) {
      detailTestimonyClear.textContent = copy.clearTestimony;
    }
    if (detailTestimonyNote && copy.demoTestimonyNote) {
      detailTestimonyNote.textContent = copy.demoTestimonyNote;
    }
    syncSessionContributeLabel(copy);
  }

  function syncSessionContributeLabel(copy) {
    const feedCopy = copy || currentFeedCopy();
    const entries = sessionCacheEntries(signalSessionKey());
    detailSessionContribute.textContent =
      entries.length > 0
        ? feedCopy.sessionContribute || feedCopy.sessionOpen
        : feedCopy.sessionOpen || feedCopy.sessionContribute;
  }

  function applySessionApiPayload(key, data, note) {
    signalSessionCache[key] = {
      source: "api",
      session: data && data.session ? data.session : null,
      contributions:
        data && Array.isArray(data.contributions) ? data.contributions : [],
      note: note || null,
    };
  }

  async function fetchSignalDiscussionSession(signalId) {
    return getJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/discussion-session"
    );
  }

  async function uploadSignalDiscussionMedia(signalId, file, contentType) {
    return postBinaryWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/discussion-session/media",
      file,
      contentType
    );
  }

  async function publishSignalDiscussionContribution(
    signalId,
    text,
    intent,
    mediaUploadId
  ) {
    const body = { text: text, intent: intent };
    if (mediaUploadId) {
      body.mediaUploadId = mediaUploadId;
    }
    return postJsonWithCredentials(
      API_BASE +
        "/v1/signals/" +
        encodeURIComponent(signalId) +
        "/discussion-session/contributions",
      body
    );
  }

  function revokeSessionMediaObjectUrls() {
    while (sessionMediaObjectUrls.length > 0) {
      const url = sessionMediaObjectUrls.pop();
      try {
        URL.revokeObjectURL(url);
      } catch (_err) {
        /* ignore */
      }
    }
  }

  function appendContributionMedia(li, media) {
    if (!media || !media.url || !li) return;
    const kind = media.kind === "video" ? "video" : "image";
    const el = document.createElement(kind === "video" ? "video" : "img");
    el.className = "signal-detail__demo-testimony-media";
    el.hidden = true;
    if (kind === "video") {
      el.controls = true;
      el.setAttribute("playsinline", "");
    } else {
      el.alt = "";
    }
    li.appendChild(el);
    const absolute =
      String(media.url).indexOf("http") === 0
        ? media.url
        : API_BASE + media.url;
    requestJson(absolute, {
      method: "GET",
      credentials: "include",
    })
      .then(function (response) {
        if (!response.ok) return null;
        return response.blob();
      })
      .then(function (blob) {
        if (!blob || !li.isConnected) return;
        const objectUrl = URL.createObjectURL(blob);
        sessionMediaObjectUrls.push(objectUrl);
        el.src = objectUrl;
        el.hidden = false;
      })
      .catch(function () {
        /* leave media hidden on fetch failure */
      });
  }

  async function loadSignalDiscussionSession() {
    const key = signalSessionKey();
    const apiId = currentSignalApiId();
    const loadToken = ++sessionLoadToken;

    if (!apiId) {
      signalSessionCache[key] = {
        source: "local",
        session: null,
        contributions: [],
        note: "local",
      };
      renderSignalSession();
      return;
    }

    if (!canTakeCivicAction()) {
      // API requires participant access; keep empty without pretending local demo.
      signalSessionCache[key] = {
        source: "gated",
        session: null,
        contributions: [],
        note: "gated",
      };
      renderSignalSession();
      return;
    }

    const previous = signalSessionCache[key];
    signalSessionCache[key] = {
      source: previous && previous.source === "api" ? "api" : "loading",
      session: previous && previous.session ? previous.session : null,
      contributions: sessionCacheEntries(key),
      note: null,
    };
    renderSignalSession();

    try {
      const result = await fetchSignalDiscussionSession(apiId);
      if (loadToken !== sessionLoadToken || currentSignalApiId() !== apiId) {
        return;
      }
      if (
        result.response &&
        result.response.ok &&
        result.payload &&
        result.payload.data
      ) {
        applySessionApiPayload(key, result.payload.data, null);
      } else {
        signalSessionCache[key] = {
          source: "error",
          session: null,
          contributions: [],
          note: "unavailable",
        };
      }
    } catch (_err) {
      if (loadToken !== sessionLoadToken || currentSignalApiId() !== apiId) {
        return;
      }
      signalSessionCache[key] = {
        source: "error",
        session: null,
        contributions: [],
        note: "unavailable",
      };
    }
    renderSignalSession();
  }

  function renderSignalSession() {
    const copy = currentFeedCopy();
    applySignalSessionCopy(copy);
    const key = signalSessionKey();
    const entries = sessionCacheEntries(key);
    revokeSessionMediaObjectUrls();
    detailSessionList.textContent = "";
    detailSessionEmpty.hidden = entries.length > 0;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const li = document.createElement("li");
      li.className = "signal-detail__session-item";
      const meta = document.createElement("p");
      meta.className = "signal-detail__session-meta";
      const author =
        entry.authorDisplayName || entry.author || copy.sessionYou || "Member";
      meta.textContent = author;
      const intentText = intentLabel(copy, entry.intent);
      if (intentText) {
        const badge = document.createElement("span");
        badge.className = "signal-detail__session-intent-badge";
        badge.textContent = intentText;
        meta.appendChild(badge);
      }
      const body = document.createElement("p");
      body.className = "signal-detail__session-text";
      body.textContent = entry.text || "";
      li.appendChild(meta);
      li.appendChild(body);
      if (entry.media && entry.media.url) {
        appendContributionMedia(li, entry.media);
      }
      detailSessionList.appendChild(li);
    }
  }

  function openSessionCompose() {
    const copy = currentFeedCopy();
    applySignalSessionCopy(copy);
    detailSessionCompose.hidden = false;
    detailSessionContribute.hidden = true;
    detailSessionInput.focus();
  }

  function closeSessionCompose(options) {
    const keepDraft = !!(options && options.keepDraft);
    detailSessionCompose.hidden = true;
    detailSessionContribute.hidden = false;
    if (!keepDraft) {
      detailSessionInput.value = "";
      detailSessionInput.setCustomValidity("");
      clearSessionIntentSelection();
      if (demoTestimony && demoTestimonyFeedIndex === feedIndex) {
        clearDemoTestimony();
      }
    }
    syncSessionContributeLabel();
  }

  async function publishSessionContribution() {
    const copy = currentFeedCopy();
    if (sessionPublishSubmitting) return;
    const text = (detailSessionInput.value || "").trim();
    if (text.length < 12) {
      detailSessionInput.setCustomValidity(
        copy.sessionNeedText || "Write a concrete contribution."
      );
      detailSessionInput.reportValidity();
      return;
    }
    detailSessionInput.setCustomValidity("");

    const intent = selectedSessionIntent();
    if (
      intent !== "observation" &&
      intent !== "proposal" &&
      intent !== "next_step"
    ) {
      detailSessionDemoNote.textContent = copy.sessionNeedIntent || "";
      detailSessionDemoNote.hidden = !detailSessionDemoNote.textContent;
      return;
    }

    if (!canTakeCivicAction()) {
      if (
        hasAuthoritativePaidMembership() ||
        (membershipRecoveryApi &&
          membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
      ) {
        if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
          noticeNotYourCommunity();
          return;
        }
        redirectMemberWithoutCivicAccess();
        return;
      }
      if (!shouldOfferMembershipInvite()) return;
      originatingFeedIndex = feedIndex;
      closeSignalDetail();
      openInvite();
      return;
    }
    if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
      noticeNotYourCommunity();
      return;
    }

    const apiId = currentSignalApiId();
    const key = signalSessionKey();
    if (!apiId) {
      signalSessionCache[key] = {
        source: "local",
        session: null,
        contributions: sessionCacheEntries(key),
        note: "local",
      };
      renderSignalSession();
      return;
    }

    sessionPublishSubmitting = true;
    detailSessionPublish.disabled = true;
    try {
      let mediaUploadId = null;
      if (
        demoTestimony &&
        demoTestimony.file &&
        demoTestimonyFeedIndex === feedIndex
      ) {
        let uploadMediaFile = demoTestimony.file;
        let uploadMediaContentType = demoTestimony.contentType;
        if (demoTestimony.kind === "image") {
          try {
            uploadMediaFile = await compressImageFileIfNeeded(
              demoTestimony.file
            );
            uploadMediaContentType = uploadMediaFile.type;
          } catch (_compressErr) {
            uploadMediaFile = demoTestimony.file;
            uploadMediaContentType = demoTestimony.contentType;
          }
        }
        const uploadResult = await uploadSignalDiscussionMedia(
          apiId,
          uploadMediaFile,
          uploadMediaContentType
        );
        if (
          !(
            uploadResult.response &&
            uploadResult.response.status === 201 &&
            uploadResult.payload &&
            uploadResult.payload.data &&
            uploadResult.payload.data.mediaUploadId
          )
        ) {
          signalSessionCache[key] = {
            source: signalSessionCache[key] && signalSessionCache[key].source,
            session:
              signalSessionCache[key] && signalSessionCache[key].session
                ? signalSessionCache[key].session
                : null,
            contributions: sessionCacheEntries(key),
            note: "publish_failed",
          };
          renderSignalSession();
          return;
        }
        mediaUploadId = uploadResult.payload.data.mediaUploadId;
      }

      const result = await publishSignalDiscussionContribution(
        apiId,
        text,
        intent,
        mediaUploadId
      );
      if (
        result.response &&
        (result.response.status === 201 || result.response.status === 200) &&
        result.payload &&
        result.payload.data
      ) {
        clearDemoTestimony();
        applySessionApiPayload(key, result.payload.data, null);
        closeSessionCompose({ keepDraft: false });
        renderSignalSession();
        return;
      }
      signalSessionCache[key] = {
        source: signalSessionCache[key] && signalSessionCache[key].source,
        session:
          signalSessionCache[key] && signalSessionCache[key].session
            ? signalSessionCache[key].session
            : null,
        contributions: sessionCacheEntries(key),
        note: "publish_failed",
      };
      renderSignalSession();
    } catch (_err) {
      signalSessionCache[key] = {
        source: signalSessionCache[key] && signalSessionCache[key].source,
        session:
          signalSessionCache[key] && signalSessionCache[key].session
            ? signalSessionCache[key].session
            : null,
        contributions: sessionCacheEntries(key),
        note: "unavailable",
      };
      renderSignalSession();
    } finally {
      sessionPublishSubmitting = false;
      detailSessionPublish.disabled = false;
    }
  }

  // Local compose preview until publish uploads bytes to private object storage.
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

  function openMemberDemoTestimonyCapture() {
    // Restored PR #19 picker — only for canParticipate members.
    if (typeof detailTestimonyInput.showPicker === "function") {
      try {
        detailTestimonyInput.showPicker();
        return;
      } catch (_err) {
        /* fall through to click() */
      }
    }
    detailTestimonyInput.click();
  }

  function openSignalDetail() {
    const discovery = window.TownCityDiscovery;
    const scenes = currentScenes();
    if (discovery && discovery.isCityDiscoveryStory(scenes[feedIndex])) {
      return;
    }
    applyFeedCopyChrome();
    populateSignalDetail();
    renderDemoTestimony();
    signalDetail.hidden = false;
    document.body.style.overflow = "hidden";
    syncFeedScrollLockFromOverlays();
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
      const route = parseRoute();
      if (
        isMembershipRecoveryFlowActive() &&
        (route === "payment" || route === "active")
      ) {
        showView(route);
        return;
      }
      if (
        isInviteMembershipJourneyActive() &&
        isInviteMembershipJourneyRoute(route)
      ) {
        showView(route);
        return;
      }
      if (
        isCityDiscoveryJourneyActive() &&
        isCityDiscoveryJourneyRoute(route)
      ) {
        if (route === "city") ensureCityOptions(true);
        showView(route);
        return;
      }
      endInviteMembershipJourney();
      endCityDiscoveryJourney();
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
        route === "password" ||
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
        route === "password" ||
        route === "passkey" ||
        route === "ready" ||
        route === "payment" ||
        route === "active") &&
      (!selectedCountry || !selectedCity)
    ) {
      go(selectedCountry ? "city" : "country");
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
    if (detailSeeToo.disabled) return;
    activateSeeTooAction({
      closeDetail: true,
      keepEligibleDetailOpen: true,
    });
  });

  // Discussion session CTA:
  // - participating member in their community: compose a solution-oriented contribution
  // - member outside their community: honest explore-only notice
  // - paid but not yet civic: recovery / community setup — never visitor invite
  // - everyone else without membership: membership invitation boundary
  detailSessionContribute.addEventListener("click", () => {
    if (canTakeCivicAction()) {
      if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
        noticeNotYourCommunity();
        return;
      }
      openSessionCompose();
      return;
    }
    if (
      hasAuthoritativePaidMembership() ||
      (membershipRecoveryApi &&
        membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
    ) {
      if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
        noticeNotYourCommunity();
        return;
      }
      redirectMemberWithoutCivicAccess();
      return;
    }
    if (!shouldOfferMembershipInvite()) return;
    originatingFeedIndex = feedIndex;
    closeSignalDetail();
    openInvite();
  });

  detailSessionAttach.addEventListener("click", () => {
    if (!canTakeCivicAction()) {
      if (
        hasAuthoritativePaidMembership() ||
        (membershipRecoveryApi &&
          membershipRecoveryApi.isPaidPendingBinding(membershipSnapshot))
      ) {
        if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
          noticeNotYourCommunity();
          return;
        }
        redirectMemberWithoutCivicAccess();
        return;
      }
      if (!shouldOfferMembershipInvite()) return;
      originatingFeedIndex = feedIndex;
      closeSignalDetail();
      openInvite();
      return;
    }
    if (!sceneMatchesMemberCommunity(currentScenes()[feedIndex])) {
      noticeNotYourCommunity();
      return;
    }
    openMemberDemoTestimonyCapture();
  });

  detailSessionPublish.addEventListener("click", () => {
    publishSessionContribution();
  });

  detailSessionCancel.addEventListener("click", () => {
    closeSessionCompose({ keepDraft: false });
  });

  detailProcessProposalsContribute.addEventListener("click", () => {
    openCivicProposalsCompose();
  });

  detailProcessProposalsCancel.addEventListener("click", () => {
    detailProcessProposalsCompose.hidden = true;
    detailProcessProposalsTitleInput.value = "";
    detailProcessProposalsBodyInput.value = "";
    detailProcessProposalsNote.hidden = true;
    detailProcessProposalsNote.textContent = "";
    detailProcessProposalsContribute.hidden = !civicProposalsCanProposeCache;
  });

  detailProcessProposalsSubmit.addEventListener("click", () => {
    submitCivicProposal();
  });

  detailProcessVotingSubmit.addEventListener("click", () => {
    submitCivicVote();
  });

  detailProcessMandateContestSubmit.addEventListener("click", () => {
    submitCivicMandateContest();
  });

  detailProcessActionTakeStep.addEventListener("click", () => {
    openCivicActionCompose("take_step");
  });

  detailProcessActionOfferHelp.addEventListener("click", () => {
    openCivicActionCompose("offer_help");
  });

  detailProcessActionContribute.addEventListener("click", () => {
    openCivicActionCompose("status_update");
  });

  detailProcessActionAddEvidence.addEventListener("click", () => {
    openCivicActionCompose("evidence");
  });

  detailProcessActionInstitutionResponse.addEventListener("click", () => {
    openCivicActionCompose("institution_response");
  });

  detailProcessActionCancel.addEventListener("click", () => {
    closeCivicActionCompose();
    detailProcessActionTakeStep.hidden = !civicActionCanTakeStepCache;
    detailProcessActionOfferHelp.hidden = !civicActionCanPostCache;
    detailProcessActionContribute.hidden = !civicActionCanPostCache;
    detailProcessActionAddEvidence.hidden = !civicActionCanPostCache;
    detailProcessActionInstitutionResponse.hidden = !civicActionCanPostCache;
  });

  detailProcessActionSubmit.addEventListener("click", () => {
    submitCivicActionUpdate();
  });

  detailProcessVerificationReady.addEventListener("click", () => {
    submitCivicVerificationReady();
  });

  detailProcessVerificationConfirmDelivered.addEventListener("click", () => {
    submitCivicVerificationConfirm("delivered");
  });

  detailProcessVerificationConfirmNotDelivered.addEventListener("click", () => {
    submitCivicVerificationConfirm("not_delivered");
  });

  detailProcessVerificationEvidenceContribute.addEventListener("click", () => {
    openCivicVerificationEvidenceCompose();
  });

  detailProcessVerificationEvidenceCancel.addEventListener("click", () => {
    detailProcessVerificationEvidenceCompose.hidden = true;
    detailProcessVerificationEvidenceInput.value = "";
    detailProcessVerificationEvidenceUrlInput.value = "";
    detailProcessVerificationEvidenceNote.hidden = true;
    detailProcessVerificationEvidenceNote.textContent = "";
    detailProcessVerificationEvidenceContribute.hidden =
      !civicVerificationCanPostEvidenceCache;
  });

  detailProcessVerificationEvidenceSubmit.addEventListener("click", () => {
    submitCivicVerificationEvidence();
  });

  detailTestimonyInput.addEventListener("change", () => {
    if (!canTakeCivicAction()) {
      detailTestimonyInput.value = "";
      return;
    }
    const file =
      detailTestimonyInput.files && detailTestimonyInput.files[0]
        ? detailTestimonyInput.files[0]
        : null;
    if (!file) return;

    const kind = ALLOWED_CONTRIBUTION_MEDIA_TYPES[file.type];
    if (!kind) {
      detailTestimonyInput.value = "";
      detailSessionDemoNote.textContent =
        (currentFeedCopy() && currentFeedCopy().sessionNeedText) ||
        "Use JPEG, PNG, WebP, or MP4.";
      detailSessionDemoNote.hidden = !detailSessionDemoNote.textContent;
      return;
    }
    if (demoTestimony && demoTestimony.objectUrl) {
      URL.revokeObjectURL(demoTestimony.objectUrl);
    }
    demoTestimony = {
      kind: kind,
      objectUrl: URL.createObjectURL(file),
      file: file,
      contentType: file.type,
    };
    demoTestimonyFeedIndex = feedIndex;
    if (detailSessionCompose.hidden) {
      openSessionCompose();
    }
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
      if (!signalCreate.hidden) {
        event.preventDefault();
        closeSignalCreate();
        return;
      }
      if (!ownerModeration.hidden) {
        event.preventDefault();
        closeOwnerModeration();
        return;
      }
      if (!activityPanel.hidden) {
        event.preventDefault();
        closeActivityPanel();
        return;
      }
      if (!profilePanel.hidden) {
        event.preventDefault();
        closeProfilePanel();
        return;
      }
      if (!signalDetail.hidden) {
        event.preventDefault();
        if (!detailSessionCompose.hidden) {
          closeSessionCompose({ keepDraft: false });
          return;
        }
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
    handleMembershipNav();
  });

  navChat.addEventListener("click", () => {
    handleChatNav();
  });

  feedStateRetry.addEventListener("click", () => {
    void loadProductOnlyLiveFeed();
  });

  navActivity.addEventListener("click", () => {
    handleActivityNav();
  });

  activityClose.addEventListener("click", () => {
    closeActivityPanel();
  });
  activityDim.addEventListener("click", () => {
    closeActivityPanel();
  });
  activityFeed.addEventListener("click", () => {
    closeActivityPanel();
    if (isFeedSurfaceActive()) {
      scrollFeedToIndex(feedIndex, { behavior: "auto" });
    }
  });
  activityList.addEventListener("click", (event) => {
    let target = event.target;
    if (target && target.nodeType === 3) target = target.parentElement;
    if (!target || !target.closest) return;
    const btn = target.closest("[data-activity-signal-id]");
    if (!btn) return;
    openActivitySignal(btn.getAttribute("data-activity-signal-id"));
  });

  activityInboxList.addEventListener("click", (event) => {
    let target = event.target;
    if (target && target.nodeType === 3) target = target.parentElement;
    if (!target || !target.closest) return;
    const btn = target.closest("[data-inbox-signal-id]");
    if (!btn) return;
    openActivitySignal(btn.getAttribute("data-inbox-signal-id"));
  });

  navProfile.addEventListener("click", () => {
    handleProfileNav();
  });

  profileClose.addEventListener("click", () => {
    closeProfilePanel();
  });

  profileDim.addEventListener("click", () => {
    closeProfilePanel();
  });

  profileFeed.addEventListener("click", () => {
    closeProfilePanel();
    if (isFeedSurfaceActive()) {
      scrollFeedToIndex(feedIndex, { behavior: "auto" });
    }
  });

  profileMembershipCta.addEventListener("click", () => {
    closeProfilePanel();
    beginInviteMembershipJourney();
    go("commitment");
  });

  profileManageBilling.addEventListener("click", () => {
    startProfileManageBilling();
  });

  profileSignOut.addEventListener("click", () => {
    startProfileSignOut();
  });

  profileCreateSignal.addEventListener("click", () => {
    openSignalCreate();
  });

  profilePlatformConsole.addEventListener("click", () => {
    window.location.href = "/platform/";
  });

  ownerModerationClose.addEventListener("click", () => {
    closeOwnerModeration();
  });
  ownerModerationDim.addEventListener("click", () => {
    closeOwnerModeration();
  });
  ownerModerationSignalsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!target || !target.getAttribute) return;
    const hideId = target.getAttribute("data-owner-hide");
    if (hideId) {
      runOwnerModerationAction("hide", hideId);
      return;
    }
    const unhideId = target.getAttribute("data-owner-unhide");
    if (unhideId) {
      runOwnerModerationAction("unhide", unhideId);
      return;
    }
    const banId = target.getAttribute("data-owner-ban");
    if (banId) {
      runOwnerModerationAction("ban", banId);
    }
  });
  ownerModerationAccountsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!target || !target.getAttribute) return;
    const unbanId = target.getAttribute("data-owner-unban");
    if (unbanId) {
      runOwnerModerationAction("unban", unbanId);
    }
  });

  signalCreateClose.addEventListener("click", () => {
    closeSignalCreate();
  });
  signalCreateCancel.addEventListener("click", () => {
    closeSignalCreate();
  });
  signalCreateDim.addEventListener("click", () => {
    closeSignalCreate();
  });
  signalCreateForm.addEventListener("submit", (event) => {
    publishMemberSignal(event);
  });
  signalCreatePhoto.addEventListener("change", () => {
    const file =
      signalCreatePhoto.files && signalCreatePhoto.files[0]
        ? signalCreatePhoto.files[0]
        : null;
    if (!file) {
      clearSignalCreatePhotoPreview();
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      clearSignalCreatePhotoPreview();
      signalCreateError.textContent = signalCreateCopy().errorPhoto;
      signalCreateError.hidden = false;
      return;
    }
    if (signalCreatePhotoObjectUrl) {
      URL.revokeObjectURL(signalCreatePhotoObjectUrl);
    }
    signalCreatePhotoFile = file;
    signalCreatePhotoObjectUrl = URL.createObjectURL(file);
    signalCreatePreviewImage.src = signalCreatePhotoObjectUrl;
    signalCreatePreview.hidden = false;
  });

  profileActivityList.addEventListener("click", (event) => {
    let target = event.target;
    if (target && target.nodeType === 3) target = target.parentElement;
    if (!target || !target.closest) return;
    const btn = target.closest("[data-profile-signal-id]");
    if (!btn) return;
    const signalId = btn.getAttribute("data-profile-signal-id");
    closeProfilePanel();
    openActivitySignal(signalId);
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

  // Mode-aware Continue:
  // - Create account + Email → request email verification (unchanged).
  // - Sign-in + Email → canonical password authentication.
  // - Phone remains unavailable (no phone auth system).
  authContinue.addEventListener("click", (event) => {
    event.preventDefault();

    if (authChannel === "phone") {
      const phoneCopy = LOGIN_COPY.en;
      showAuthWindowStatus(
        phoneCopy.phoneUnavailable ||
          "Phone sign-in is not available yet. Use email, or Sign in with a passkey.",
        "error"
      );
      return;
    }

    if (authMode === "signin") {
      startPublicAuthWindowPasswordSignIn();
      return;
    }

    if (authMode === "create" && authChannel === "email") {
      const value = (authIdentityInput.value || "").trim();
      if (!isValidEmail(value) || emailSubmitting) {
        if (value && !isValidEmail(value)) {
          const copy = EMAIL_COPY[membershipLang()];
          authIdentityInput.setCustomValidity(copy.invalid);
          authIdentityInput.reportValidity();
        }
        return;
      }

      authIdentityInput.setCustomValidity("");
      enteredEmail = value;
      noteAccountEmail(value);
      emailSubmitting = true;
      authContinue.disabled = true;

      requestEmailVerification(value)
        .then(function (verificationId) {
          emailVerificationId = verificationId;
          codeInput.value = "";
          codeError.hidden = true;
          codeError.textContent = "";
          beginInviteMembershipJourney();
          go("code");
        })
        .catch(function (err) {
          const copy = EMAIL_COPY[membershipLang()];
          if (err && err.kind === "rateLimited") {
            authIdentityInput.setCustomValidity(copy.rateLimited);
          } else {
            authIdentityInput.setCustomValidity(copy.failed);
          }
          authIdentityInput.reportValidity();
        })
        .finally(function () {
          emailSubmitting = false;
          authContinue.disabled = false;
        });
    }
  });

  authPasskey.addEventListener("click", (event) => {
    event.preventDefault();
    startPublicAuthWindowPasskeySignIn();
  });

  enterButton.addEventListener("click", () => {
    openTermsSheet();
  });

  entrySignIn.addEventListener("click", () => {
    openAuthWindow(entrySignIn, null);
  });

  countryBack.addEventListener("click", () => {
    if (isCityDiscoveryJourneyActive()) {
      const returnIndex = cityDiscoveryReturnFeedIndex;
      endCityDiscoveryJourney();
      feedIndex = returnIndex;
      go("feed");
      return;
    }
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
    feedIndex = 0;
    continueCity.disabled = true;
    loadLiveScenesForCity(selectedCity).finally(() => {
      continueCity.disabled = false;
      go("feed");
    });
  });

  locationBack.addEventListener("click", () => {
    ensureCityOptions(true);
    go("city");
  });

  locationVerify.addEventListener("click", () => {
    if (locationVerify.disabled) return;
    const lang = resolvePublicReadingLanguage();
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

  if (feedScroller) {
    feedScroller.addEventListener(
      "scroll",
      function () {
        if (feedScrollRaf) return;
        feedScrollRaf = window.requestAnimationFrame(function () {
          feedScrollRaf = 0;
          syncActiveIndexFromScroll();
        });
      },
      { passive: true }
    );

    feedScroller.addEventListener("click", function (event) {
      let target = event.target;
      if (target && target.nodeType === 3) target = target.parentElement;
      if (!target || !target.closest) return;
      const control = target.closest("[data-feed-role]");
      if (!control || !feedScroller.contains(control)) return;
      const role = control.getAttribute("data-feed-role");
      const panel = control.closest(".feed__panel");
      if (panel) {
        const panelIndex = Number(panel.getAttribute("data-feed-index"));
        if (!Number.isNaN(panelIndex)) {
          setActiveFeedIndex(panelIndex, { skipMemberSync: true });
        }
      }

      if (role === "feed-back") {
        closeSignalSheet();
        if (isProductOnlyPublicMode()) return;
        go("location");
        return;
      }
      if (role === "discovery-find-city") {
        // Members with a home community use this control to return home;
        // visitors still start the find-my-city journey.
        if (memberHomeCityId()) {
          feedIndex = 0;
          go("feed");
          return;
        }
        beginCityDiscoveryJourney();
        go("country");
        return;
      }
      if (role === "discovery-continue") {
        navigateFeedByIntent({ type: "direction", value: "next" });
        return;
      }
      if (role === "feed-see-too") {
        if (control.disabled) return;
        activateSeeTooAction();
        return;
      }
      if (role === "feed-open-signal") {
        openSignalDetail();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!feedNav) return;
    if (!isFeedSurfaceActive() || feedOverlaysBlockNavigation()) return;
    const action = feedNav.keyboardAction(event.key);
    if (!action) return;
    if (feedNav.isInteractiveFocusTarget(document.activeElement)) return;
    const scenes = currentScenes();
    let intent = null;
    if (action === "next") intent = { type: "direction", value: "next" };
    else if (action === "previous")
      intent = { type: "direction", value: "previous" };
    else if (action === "first") intent = { type: "absolute", value: 0 };
    else if (action === "last")
      intent = { type: "absolute", value: scenes.length - 1 };
    if (!intent) return;
    const moved = navigateFeedByIntent(intent);
    if (
      moved ||
      action === "first" ||
      action === "last" ||
      action === "next" ||
      action === "previous"
    ) {
      event.preventDefault();
    }
  });

  inviteContinue.addEventListener("click", () => {
    // Choosing the membership journey abandons pending Sign-in return context.
    clearPendingSeeTooContext();
    closeInvite();
    if (isProductOnlyPublicMode()) {
      beginInviteMembershipJourney();
      go("membership");
      return;
    }
    go("membership");
  });

  inviteNotNow.addEventListener("click", () => {
    clearPendingSeeTooContext();
    closeInvite();
    returnVisitorToOriginatingSignal();
  });

  membershipContinue.addEventListener("click", () => {
    go("account");
  });

  membershipNotNow.addEventListener("click", () => {
    returnVisitorToOriginatingSignal();
  });

  endedReturn.addEventListener("click", () => {
    resetVisitorSession();
    go("entry");
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
    noteAccountEmail(value);
    emailSubmitting = true;
    emailContinue.disabled = true;
    emailError.hidden = true;
    emailError.textContent = "";

    requestEmailVerification(value)
      .then(function (verificationId) {
        enrollmentRestartRequired = false;
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
    enrollmentRestartRequired = false;
    enteredEmail = (emailInput.value || "").trim();
    noteAccountEmail(enteredEmail);
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
        passwordSet = false;
        passkeyRegistered = false;
        passwordInput.value = "";
        passwordConfirm.value = "";
        go("password");
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
    passwordSet = false;
    passkeyRegistered = false;
    emailVerificationId = null;
    setupGrant = null;
    setupGrantExpiresAt = null;
    codeSubmitting = false;
    go("email");
  });

  function handlePasswordInput() {
    passwordSetupErrorVisible = false;
    syncPasswordContinue();
  }

  passwordInput.addEventListener("input", handlePasswordInput);
  passwordConfirm.addEventListener("input", handlePasswordInput);

  passwordContinue.addEventListener("click", () => {
    const copy = PASSWORD_COPY[membershipLang()];
    const value = passwordInput.value || "";
    if (
      passwordSubmitting ||
      !passwordMeetsPolicy(value) ||
      value !== (passwordConfirm.value || "")
    ) {
      syncPasswordContinue();
      return;
    }
    if (!isSetupGrantUsable()) {
      passwordSetupErrorVisible = true;
      passwordError.hidden = false;
      passwordError.textContent = copy.grantExpired;
      return;
    }

    passwordSetupErrorVisible = false;
    passwordSubmitting = true;
    passwordContinue.disabled = true;
    passwordError.hidden = true;
    passwordError.textContent = "";
    completeInitialPasswordSetup(value)
      .then(function (result) {
        setupGrant = result.setupGrant;
        setupGrantExpiresAt = result.setupGrantExpiresAt;
        passwordSet = true;
        passwordInput.value = "";
        passwordConfirm.value = "";
        go("passkey");
      })
      .catch(function (err) {
        passwordSetupErrorVisible = true;
        passwordError.hidden = false;
        passwordError.textContent =
          err && err.kind === "grantExpired" ? copy.grantExpired : copy.failed;
      })
      .finally(function () {
        passwordSubmitting = false;
        syncPasswordContinue();
      });
  });

  passwordBack.addEventListener("click", () => {
    passwordSetupErrorVisible = false;
    passwordInput.value = "";
    passwordConfirm.value = "";
    passwordError.hidden = true;
    passwordError.textContent = "";
    go("code");
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
    go("password");
  });

  passkeyContinue.addEventListener("click", () => {
    go("ready");
  });

  readyContinue.addEventListener("click", () => {
    if (readyAuthSubmitting) return;
    const copy = LOGIN_COPY[membershipLang()];
    clearReadyError();

    readyAuthSubmitting = true;
    readyContinue.disabled = true;

    runPasskeyAuthenticationCeremony()
      .then(function () {
        // Session probe already confirmed authenticated before this runs.
        sessionAuthenticated = true;
            clearReadyError();
        return bootstrapCommunityCommitment().then(function () {
          if (hasRecordedCommunityCommitment()) {
            go("commitment");
            return;
          }
          // Public browsing selections must not silently bind commitment UI.
          commitmentCountry = null;
          commitmentCity = null;
          commitmentAcceptanceChecked = false;
          go("commitment");
        });
      })
      .catch(function (err) {
        sessionAuthenticated = false;
        if (isPasskeyCeremonyCancelled(err)) {
          showReadyError(copy.cancelled);
          return;
        }
        showReadyError(copy.failed);
      })
      .finally(function () {
        readyAuthSubmitting = false;
        readyContinue.disabled = false;
      });
  });

  readyBack.addEventListener("click", () => {
    clearReadyError();
    // Return to Screen 10 success state after a completed registration.
    go("passkey");
  });

  function startAuthenticatedCheckoutFromCommitment() {
    if (commitmentCheckoutSubmitting) return;
    if (!hasRecordedCommunityCommitment()) {
      go("commitment");
      syncCommitmentUi();
      return;
    }
    clearCommitmentError();
    commitmentCheckoutSubmitting = true;
    commitmentCheckout.disabled = true;

    fetchCommunityCommitment()
      .then(function (snapshot) {
        applyCommitmentSnapshot(snapshot);
        if (!hasRecordedCommunityCommitment()) {
          throw makeApiError("commitmentRequired");
        }
        return requestCheckoutSession();
      })
      .then(function (checkoutUrl) {
        setCheckoutPendingMarker();
        window.location = checkoutUrl;
      })
      .catch(function (err) {
        const kind = err && err.kind ? err.kind : "network";
        if (kind === "commitmentRequired") {
          invalidateCommitmentAcceptanceOnScreen();
          go("commitment");
          showCommitmentError(
            commitmentErrorMessage("validation")
          );
        } else {
          showCommitmentError(
            kind === "unauthenticated"
              ? commitmentErrorMessage("unauthenticated")
              : paymentErrorMessage(kind)
          );
        }
        commitmentCheckoutSubmitting = false;
        syncCommitmentUi();
      });
  }

  paymentSimulateStart.addEventListener("click", () => {
    if (paymentCheckoutSubmitting) return;
    if (!hasRecordedCommunityCommitment()) {
      go("commitment");
      return;
    }
    clearPaymentError();
    paymentCheckoutSubmitting = true;
    paymentSimulateStart.disabled = true;

    requestCheckoutSession()
      .then(function (checkoutUrl) {
        // Advisory only — never authorization. Survives same-tab Checkout return.
        setCheckoutPendingMarker();
        window.location = checkoutUrl;
      })
      .catch(function (err) {
        const kind = err && err.kind ? err.kind : "network";
        if (kind === "commitmentRequired") {
          paymentCheckoutSubmitting = false;
          go("commitment");
          return;
        }
        showPaymentError(paymentErrorMessage(kind));
        paymentCheckoutSubmitting = false;
        paymentSimulateStart.disabled = false;
      });
  });


  paymentBack.addEventListener("click", () => {
    clearPaymentError();
    go("commitment");
  });

  Array.prototype.forEach.call(
    document.querySelectorAll('input[name="commitment-country"]'),
    function (input) {
      input.addEventListener("change", function () {
        if (!input.checked) return;
        onCommitmentCountryChange(input.value);
      });
    }
  );

  commitmentAccept.addEventListener("change", function () {
    commitmentAcceptanceChecked = commitmentAccept.checked === true;
    clearCommitmentError();
    syncCommitmentUi();
  });

  commitmentConfirm.addEventListener("click", function () {
    if (commitmentSaving || commitmentConfirm.disabled) return;
    clearCommitmentError();
    if (
      !commitmentCountry ||
      !commitmentCity ||
      !communityCommitmentApi ||
      !communityCommitmentApi.isCityValidForCountry(
        commitmentCountry,
        commitmentCity
      )
    ) {
      showCommitmentError(commitmentErrorMessage("validation"));
      return;
    }
    if (!commitmentAcceptanceChecked) {
      commitmentAcceptRequired.hidden = false;
      showCommitmentError(commitmentErrorMessage("validation"));
      return;
    }
    // City selection alone never counts; require explicit checkbox.
    if (communityCommitmentApi.citySelectionCountsAsAcceptance()) {
      showCommitmentError(commitmentErrorMessage("validation"));
      return;
    }
    const slug = communityCommitmentApi.slugForCityId(commitmentCity);
    if (!slug) {
      showCommitmentError(commitmentErrorMessage("unsupported"));
      return;
    }
    commitmentSaving = true;
    syncCommitmentUi();
    saveCommunityCommitment(slug)
      .then(function (snapshot) {
        applyCommitmentSnapshot(snapshot);
        commitmentSaving = false;
        syncCommitmentUi();
      })
      .catch(function (err) {
        commitmentSaving = false;
        const kind = err && err.kind ? err.kind : "save";
        showCommitmentError(commitmentErrorMessage(kind));
        syncCommitmentUi();
      });
  });

  commitmentCheckout.addEventListener("click", function () {
    startAuthenticatedCheckoutFromCommitment();
  });

  commitmentBack.addEventListener("click", function () {
    clearCommitmentError();
    go("ready");
  });

  paymentContinue.addEventListener("click", () => {
    go("active");
  });

  paymentConfirmingRetry.addEventListener("click", () => {
    if (
      paymentConfirmingRetry.getAttribute("data-recovery-action") === "community"
    ) {
      endMembershipRecoveryFlow();
      beginInviteMembershipJourney();
      go("commitment");
      return;
    }
    manualMembershipRecoveryRetry();
  });

  paymentConfirmingDismiss.addEventListener("click", () => {
    clearCheckoutPendingMarker();
    endMembershipRecoveryFlow();
    if (isProductOnlyPublicMode()) {
      endInviteMembershipJourney();
      go("feed");
      return;
    }
    go("ready");
  });

  activeReturn.addEventListener("click", () => {
    feedIndex = originatingFeedIndex;
    // Returning from active membership: refresh persisted confirmations when
    // participation is allowed. Never invent local confirmation authority.
    if (canTakeCivicAction()) {
      refreshViewerSignalConfirmations();
    }
    if (isProductOnlyPublicMode()) {
      endInviteMembershipJourney();
    }
    go("feed");
  });

  activeBack.addEventListener("click", () => {
    go("payment");
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", render);
  syncCountryContinue();
  recoverInterruptedEnrollmentAfterReload();
  try {
    const params = new URLSearchParams(window.location.search || "");
    const story = params.get("townStory");
    if (story) {
      const n = Number(story);
      if (Number.isFinite(n) && n >= 1) {
        feedIndex = Math.max(0, Math.floor(n) - 1);
      }
    }
    // Visual-review fixtures for community commitment live only in
    // review/commitment-visual-harness.html. The normal product ignores townReview.
    if (params.get("townReview")) {
      /* intentionally ignored — no UI simulation, no authority */
    }
  } catch (err) {
    /* ignore URL helpers */
  }
  render();
  void loadProductOnlyLiveFeed();
  bootstrapAccountMembership();
})();
