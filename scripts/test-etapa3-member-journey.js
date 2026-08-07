/**
 * Etapa 3 member journey regressions: nav destinations, feed states,
 * recovery honesty, participation feedback, and de-prototyped copy.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const i18n = fs.readFileSync(path.join(root, "public-i18n.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
    console.log("OK: " + message);
  } else {
    failed += 1;
    console.error("FAIL: " + message);
  }
}

function fnBody(name) {
  const match = js.match(
    new RegExp(
      "(?:async\\s+)?function " +
        name +
        "\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n  \\}"
    )
  );
  assert(!!match, name + " body readable");
  return match ? match[1] : "";
}

assert(html.includes('id="feed-state"'), "feed loading/empty state markup present");
assert(html.includes('id="feed-state-retry"'), "feed retry control present");
assert(css.includes(".feed__state"), "feed state styles present");
assert(css.includes(".feed__live.is-surface"), "transient notice surface styles present");

assert(html.includes('id="detail-civic-process"'), "civic-process panel markup present");
assert(html.includes('id="detail-process-confirmations"'), "civic confirmation total present");
assert(html.includes('id="detail-process-timeline"'), "civic timeline markup present");
assert(css.includes(".signal-detail__process-facts"), "civic-process panel styles present");
assert(
  js.includes('"/civic-process"') &&
    js.includes("async function loadSignalCivicProcess()") &&
    js.includes("getJsonWithCredentials"),
  "signal detail reads the canonical civic-process endpoint"
);
assert(
  js.includes('data.currentStage !== "confirmation"') &&
    js.includes('data.currentStage !== "proposals"') &&
    js.includes('data.currentStage !== "deliberation"') &&
    js.includes('data.currentStage !== "ballot_preparation"') &&
    js.includes('data.currentStage === "confirmation" &&') &&
    js.includes('data.nextStage !== "proposals"') &&
    js.includes('data.currentStage === "proposals" &&') &&
    js.includes('data.nextStage !== "deliberation"') &&
    js.includes('data.currentStage === "deliberation" &&') &&
    js.includes('data.nextStage !== "ballot_preparation"') &&
    js.includes('data.currentStage === "ballot_preparation" &&') &&
    js.includes('data.nextStage !== "voting"'),
  "client accepts only the truthful confirmation, proposals, deliberation, and ballot_preparation stage contract"
);
assert(
  js.includes(
    '(data.currentStage === "voting" && data.nextStage !== "mandate") ||',
  ) &&
    js.includes(
      '(data.currentStage === "mandate" && data.nextStage !== "action")',
    ),
  "client accepts the mandate stage and its honest next stage of action",
);
assert(
  js.includes(
    '(data.currentStage === "action" && data.nextStage !== "verification")',
  ),
  "client accepts the action stage and its honest next stage of verification",
);
assert(
  js.includes(
    'data.currentStage !== "action" &&\n          data.currentStage !== "verification" &&\n          data.currentStage !== "archived") ||',
  ) &&
    js.includes(
      '(data.currentStage === "verification" && data.nextStage !== "archived")',
    ) &&
    js.includes('(data.currentStage === "archived" && data.nextStage !== null)'),
  "client accepts verification and archived as valid stages, with archived as a truly terminal stage (nextStage null)",
);
assert(
  js.includes('isDeliberationStage = data.currentStage === "deliberation";'),
  "deliberation stage renders without falling back to unavailable"
);
assert(
  js.includes(
    'isBallotPreparationStage = data.currentStage === "ballot_preparation";',
  ),
  "ballot_preparation stage renders without falling back to unavailable"
);
assert(
  js.includes("void loadSignalCivicProcess();"),
  "opening signal detail loads its civic process"
);
assert(
  !js.includes("confirmationThreshold") &&
    !js.includes("transitionThreshold") &&
    !js.includes("confirmationProgressPercent"),
  "client does not invent thresholds or progress percentages"
);
assert(
  html.includes("script.js?v=civic-process-inbox-1"),
  "civic-process UI has a fresh browser cache key"
);

assert(html.includes('id="detail-process-proposals"'), "civic proposals panel markup present");
assert(html.includes('id="detail-process-proposals-list"'), "civic proposals list markup present");
assert(html.includes('id="detail-process-proposals-compose"'), "civic proposals compose markup present");
assert(css.includes(".signal-detail__process-proposals"), "civic proposals panel styles present");
assert(
  js.includes('"/civic-process/proposals"') &&
    js.includes("async function loadSignalCivicProposals()") &&
    js.includes("async function submitCivicProposal()"),
  "signal detail reads and writes the canonical civic proposals endpoint"
);
assert(
  js.includes("void loadSignalCivicProposals();"),
  "reaching the proposals stage loads its proposals"
);
assert(
  js.includes('data.currentStage !== "proposals" ||') &&
    js.includes("!Array.isArray(data.proposals)"),
  "client fails closed when the proposals contract does not match"
);
assert(
  js.includes("civicProposalsCanProposeCache = data.canPropose === true;") &&
    js.includes("detailProcessProposalsContribute.hidden = !civicProposalsCanProposeCache;"),
  "proposal compose visibility follows backend canPropose truth only"
);
assert(
  !js.includes("proposalThreshold") &&
    !js.includes("deliberationThreshold") &&
    !js.includes("proposalsProgressPercent"),
  "client does not invent proposal thresholds or progress percentages"
);

assert(
  html.includes('id="detail-process-deliberation"'),
  "civic deliberation panel markup present",
);
assert(
  html.includes('id="detail-process-deliberation-list"'),
  "civic deliberation list markup present",
);
assert(
  css.includes(".signal-detail__process-deliberation"),
  "civic deliberation panel styles present",
);
assert(
  js.includes('"/civic-process/deliberation"') &&
    js.includes("async function loadSignalCivicDeliberation()") &&
    js.includes("async function submitCivicDeliberationContribution("),
  "signal detail reads and writes the canonical civic deliberation endpoint",
);
assert(
  js.includes("void loadSignalCivicDeliberation();"),
  "reaching the deliberation stage loads its deliberation",
);
assert(
  js.includes('data.currentStage !== "deliberation" &&') &&
    js.includes('data.currentStage !== "ballot_preparation")') &&
    js.includes("!Array.isArray(data.proposals)") &&
    js.includes("data.processId == null"),
  "client fails closed when the deliberation/ballot_preparation contract does not match",
);
assert(
  js.includes("isDeliberationStage || isBallotPreparationStage") &&
    js.includes("ballotFinalOptions"),
  "ballot_preparation reuses the deliberation panel as the final read-only ballot",
);
assert(
  js.includes("canContribute = data.canContribute === true;") &&
    !js.includes("canContribute = true;"),
  "deliberation contribute visibility follows backend canContribute truth only",
);
assert(
  js.includes("/contributions\"") &&
    js.includes(
      '"/civic-process/deliberation/proposals/" +\n        encodeURIComponent(proposalId) +',
    ),
  "deliberation contribution submits scoped to a specific proposal",
);
assert(
  (function () {
    const fn = js.match(
      /function intentLabel\(copy, intent\)[\s\S]*?\n {2}\}/,
    );
    return !!fn && fn[0].includes("sessionIntent");
  })(),
  "discussion-session intent label helper is untouched (no name collision with deliberation)",
);

assert(
  html.includes('id="detail-process-voting"'),
  "civic voting panel markup present",
);
assert(
  html.includes('id="detail-process-voting-list"'),
  "civic voting list markup present",
);
assert(
  css.includes(".signal-detail__process-voting"),
  "civic voting panel styles present",
);
assert(
  js.includes('"/civic-process/voting"') &&
    js.includes('"/civic-process/voting/vote"') &&
    js.includes("async function loadSignalCivicVoting()") &&
    js.includes("async function submitCivicVote()"),
  "signal detail reads and writes the canonical civic voting endpoint",
);
assert(
  js.includes("void loadSignalCivicVoting();"),
  "reaching the voting stage loads the vote",
);
assert(
  js.includes(
    '(data.currentStage !== "ballot_preparation" &&\n          data.currentStage !== "voting") ||',
  ) && js.includes("!Array.isArray(data.options)"),
  "client fails closed when the voting contract does not match",
);
assert(
  js.includes("detailProcessVotingSubmit.hidden = !data.canVote;") &&
    !js.includes("detailProcessVotingSubmit.hidden = false;"),
  "vote submission visibility follows backend canVote truth only",
);
assert(
  !js.includes("data.myChoice") &&
    !js.includes("copy.yourVote") &&
    js.includes("data.hasVoted"),
  "voting is a real secret ballot: no myChoice highlighting, only hasVoted",
);
assert(
  !js.includes("voteThreshold") &&
    !js.includes("quorumCount") &&
    !js.includes("winningProposal"),
  "client does not invent a quorum, threshold, or winner",
);

assert(
  html.includes('id="detail-process-mandate"'),
  "civic mandate panel markup present",
);
assert(
  html.includes('id="detail-process-mandate-winner"'),
  "civic mandate winner markup present",
);
assert(
  css.includes(".signal-detail__process-mandate"),
  "civic mandate panel styles present",
);
assert(
  js.includes('"/civic-process/mandate"') &&
    js.includes("async function loadSignalCivicMandate()"),
  "signal detail reads the canonical civic mandate endpoint",
);
assert(
  js.includes("void loadSignalCivicMandate();"),
  "reaching the mandate stage loads the mandate result",
);
assert(
  js.includes('data.currentStage !== "voting" &&') &&
    js.includes('data.currentStage !== "mandate" &&') &&
    js.includes('data.currentStage !== "action" &&') &&
    js.includes('data.currentStage !== "verification" &&') &&
    js.includes('data.currentStage !== "archived") ||') &&
    js.includes('typeof data.decided !== "boolean"') &&
    js.includes('typeof data.contested !== "boolean"'),
  "client fails closed when the mandate contract does not match",
);
assert(
  js.includes("data.contested\n          ? copy.mandateContested") &&
    js.includes(": copy.mandatePending"),
  "mandate panel reports a tie as contested with no invented tie-break",
);
assert(
  !js.includes("mandateTieBreak") &&
    !js.includes("coinFlip") &&
    !js.includes("earliestVoteWins"),
  "client does not invent a tie-break rule for the mandate",
);
assert(
  js.includes("async function submitCivicMandateContest()") &&
    js.includes('"/civic-process/mandate/contest"'),
  "mandate contestation (§10) is filed via the canonical contest endpoint",
);
assert(
  js.includes("renderCivicMandateMinorityPositions") &&
    js.includes("data.minorityPositions"),
  "mandate surfaces minority positions as a permanent record (§11)",
);
assert(
  js.includes("data.canContest === true") &&
    !js.includes("civicContestCanContestCache = true;"),
  "contestation form visibility follows backend canContest truth only",
);

assert(
  html.includes('id="detail-process-action"'),
  "civic action panel markup present",
);
assert(
  html.includes('id="detail-process-action-list"'),
  "civic action status update list markup present",
);
assert(
  html.includes('id="detail-process-action-compose"'),
  "civic action compose markup present",
);
assert(
  css.includes(".signal-detail__process-action"),
  "civic action panel styles present",
);
assert(
  js.includes('"/civic-process/action"') &&
    js.includes('"/civic-process/action/updates"') &&
    js.includes("async function loadSignalCivicAction()") &&
    js.includes("async function submitCivicActionUpdate()"),
  "signal detail reads and writes the canonical civic action endpoint",
);
assert(
  js.includes("void loadSignalCivicAction();"),
  "reaching the action stage loads the action status log",
);
assert(
  js.includes(
    '(data.currentStage !== "mandate" && data.currentStage !== "action") ||',
  ) &&
    js.includes('typeof data.canPost !== "boolean"') &&
    js.includes("!Array.isArray(data.updates)"),
  "client fails closed when the action contract does not match",
);
assert(
  js.includes("civicActionCanPostCache = data.canPost === true;") &&
    js.includes("detailProcessActionContribute.hidden = !civicActionCanPostCache;"),
  "action compose visibility follows backend canPost truth only",
);
assert(
  !js.includes("completionPercent") &&
    !js.includes("completionThreshold") &&
    !js.includes("progressPercent"),
  "client does not invent a completion percentage or threshold for action",
);
assert(
  js.includes("isActionStage || isVerificationStage || isArchivedStage") &&
    js.includes("void loadSignalCivicAction();"),
  "action status log remains a readable historical record through verification and archived",
);
assert(
  js.includes("civicActionCanTakeStepCache = data.canTakeStep === true;") &&
    js.includes("detailProcessActionTakeStep.hidden = !civicActionCanTakeStepCache;"),
  "responsible-actor claim visibility follows backend canTakeStep truth only (§12)",
);
assert(
  js.includes("data.responsibleActor") && js.includes("data.collaborators"),
  "action surfaces the derived responsible actor and collaborators, never a stored assignment (§12)",
);
assert(
  js.includes('civicActionKindBadgeLabel(copy, kind)') &&
    js.includes("take_step") &&
    js.includes("offer_help") &&
    js.includes("institution_response"),
  "action updates support the owner's typed contextual kinds as subtypes, not new tables (§12)",
);
assert(
  js.includes("civicActionStatusLabel(copy, actionStatus)") &&
    js.includes('actionStatus === "blocked"') &&
    js.includes('actionStatus === "completed"'),
  "action status (not_started/in_progress/blocked/completed) is derived, never a stored field (§12)",
);
assert(
  html.includes('id="detail-process-action-institution"') &&
    html.includes('id="detail-process-action-objective"') &&
    html.includes('id="detail-process-action-deadline"'),
  "action surfaces target institution, objective, and indicative deadline from the winning proposal (§12)",
);

assert(
  html.includes('id="detail-process-verification"'),
  "civic verification panel markup present",
);
assert(
  html.includes('id="detail-process-verification-evidence-list"'),
  "civic verification evidence list markup present",
);
assert(
  html.includes('id="detail-process-verification-evidence-compose"'),
  "civic verification evidence compose markup present",
);
assert(
  html.includes('id="detail-process-verification-ready"'),
  "civic verification mark-ready control present",
);
assert(
  html.includes('id="detail-process-verification-confirm-delivered"') &&
    html.includes('id="detail-process-verification-confirm-not-delivered"'),
  "civic verification delivered/not-delivered confirm controls present",
);
assert(
  css.includes(".signal-detail__process-verification"),
  "civic verification panel styles present",
);
assert(
  js.includes('"/civic-process/verification"') &&
    js.includes('"/civic-process/verification/ready"') &&
    js.includes('"/civic-process/verification/evidence"') &&
    js.includes('"/civic-process/verification/confirm"') &&
    js.includes("async function loadSignalCivicVerification()") &&
    js.includes("async function submitCivicVerificationReady()") &&
    js.includes("async function submitCivicVerificationEvidence()") &&
    js.includes("async function submitCivicVerificationConfirm("),
  "signal detail reads and writes the canonical civic verification endpoints",
);
assert(
  js.includes("void loadSignalCivicVerification();"),
  "reaching the action stage loads the verification status",
);
assert(
  js.includes(
    '(data.currentStage !== "action" &&\n          data.currentStage !== "verification" &&\n          data.currentStage !== "archived") ||',
  ) &&
    js.includes('typeof data.canMarkReady !== "boolean"') &&
    js.includes('typeof data.canConfirm !== "boolean"') &&
    js.includes('typeof data.disputeEscalated !== "boolean"') &&
    js.includes("!Array.isArray(data.evidence)"),
  "client fails closed when the verification contract does not match",
);
assert(
  js.includes("detailProcessVerificationReady.hidden = !data.canMarkReady;") &&
    js.includes("detailProcessVerificationConfirm.hidden = !data.canConfirm;"),
  "mark-ready and confirm controls follow backend canMarkReady/canConfirm truth only",
);
assert(
  js.includes(
    "civicVerificationCanPostEvidenceCache =\n      isVerification && (data.canConfirm === true || data.hasConfirmed === true);",
  ),
  "evidence compose visibility is derived from an eligible actor in the verification stage only",
);
assert(
  !js.includes("verificationTieBreak") &&
    !js.includes("majorityOf") &&
    !js.includes("autoResolve"),
  "client does not invent a resolution for an unconfirmed verification dispute",
);
assert(
  html.includes('id="detail-process-verification-dispute-escalated"') &&
    js.includes("isVerification && data.disputeEscalated") &&
    js.includes("copy.verificationDisputeEscalated"),
  "verification honestly flags a dispute open more than 14 days, with no invented resolution (§13)",
);

assert(js.includes("function handleMembershipNav"), "membership nav handler exists");
assert(js.includes("function handleChatNav"), "chat nav honesty handler exists");
assert(
  js.includes("function continueAuthenticatedMembershipDestination"),
  "authenticated membership destination helper exists"
);
assert(
  js.includes("function showFeedSurfaceState"),
  "feed surface state helper exists"
);
assert(
  js.includes("function showTransientFeedNotice"),
  "transient feed notice helper exists"
);

const membershipNav = fnBody("handleMembershipNav");
assert(
  membershipNav.includes("sessionAuthenticated") &&
    membershipNav.includes("continueAuthenticatedMembershipDestination") &&
    membershipNav.includes('openAuthWindow(navMembership, "membership")'),
  "MEMBERSHIP nav auth-gates then continues destination"
);

const chatNav = fnBody("handleChatNav");
assert(
  chatNav.includes("chatUnavailable") &&
    !chatNav.includes("openAuthWindow") &&
    chatNav.includes("showTransientFeedNotice"),
  "CHAT nav shows unavailable notice instead of auth window"
);

const continueAuth = fnBody("continueAfterPublicPasskeySignIn");
assert(
  continueAuth.includes('openedFor === "membership"') &&
    continueAuth.includes("continueAuthenticatedMembershipDestination"),
  "post-auth membership target lands on membership destination"
);

const activate = fnBody("activateSeeTooAction");
assert(
  activate.includes("keepEligibleDetailOpen") &&
    activate.includes("await loadSignalCivicProcess()"),
  "eligible detail confirmation stays visible and refreshes canonical process truth"
);
assert(
  js.includes("keepEligibleDetailOpen: true"),
  "detail confirmation opts into in-place civic-process continuity"
);
assert(
  !activate.includes("Legacy simulate") &&
    activate.includes("showTransientFeedNotice") &&
    activate.includes("seeTooFailed"),
  "see-too fails closed with visible feedback (no local simulate confirm)"
);
assert(
  activate.includes("putJsonWithCredentials") && activate.includes("openInvite()"),
  "see-too still uses API confirm + invite boundary for non-members"
);
assert(
  activate.includes("sceneMatchesMemberCommunity") &&
    !activate.slice(activate.indexOf('status === 403')).includes("openInvite()"),
  "see-too does not re-invite paid members on wrong-community 403"
);

assert(
  js.includes('note: "gated"') && js.includes("sessionGated:"),
  "gated discussion session explains membership requirement"
);
assert(
  js.includes("activityError:") &&
    js.includes("copy.activityError || copy.activityEmpty"),
  "profile activity distinguishes load error from empty"
);
assert(
  js.includes("phoneUnavailable") &&
    js.includes('authChannel === "phone"') &&
    js.includes("showAuthWindowStatus"),
  "phone auth channel surfaces an unavailable message"
);
assert(
  js.includes('data-recovery-action", "community"') &&
    js.includes("continueCommunity"),
  "paid-no-participate recovery offers community continuation"
);
assert(
  js.includes('showFeedSurfaceState("loading")') &&
    js.includes('showFeedSurfaceState("empty")'),
  "product feed boot uses loading and empty states"
);

assert(
  !/Confirmation recorded in the prototype/i.test(i18n) &&
    i18n.includes('doneNote: "Confirmation saved on TOWN"'),
  "i18n doneNote no longer claims prototype persistence"
);
assert(
  !/nur Prototyp|doar prototip|solo prototipo/i.test(js),
  "READY/ACCOUNT copy no longer ships stop-ship prototype phrases"
);
assert(
  js.includes('navMembership.addEventListener("click"') &&
    js.includes("handleMembershipNav()"),
  "MEMBERSHIP click wires handleMembershipNav"
);
assert(
  js.includes('navChat.addEventListener("click"') &&
    js.includes("handleChatNav()"),
  "CHAT click wires handleChatNav"
);
assert(
  js.includes('feedStateRetry.addEventListener("click"') &&
    js.includes("loadProductOnlyLiveFeed"),
  "feed retry reloads live signals"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " Etapa 3 member journey assertions");

