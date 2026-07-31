/**
 * Focused regression tests for "I SEE THIS TOO" → public Sign-in continuity.
 * Source-structure assertions (same style as test-public-auth-signin.js).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

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

function sliceHandler(startNeedle, endNeedle) {
  const start = js.indexOf(startNeedle);
  const end = js.indexOf(endNeedle, start + 1);
  assert(start >= 0 && end > start, "locate " + startNeedle);
  return start >= 0 && end > start ? js.slice(start, end) : "";
}

assert(
  js.includes("let pendingSeeTooContext = null") ||
    js.includes("pendingSeeTooContext = null"),
  "pending see-too context state exists"
);
assert(
  js.includes("function capturePendingSeeTooContext"),
  "capturePendingSeeTooContext helper exists"
);
assert(
  js.includes("function clearPendingSeeTooContext"),
  "clearPendingSeeTooContext helper exists"
);
assert(
  js.includes("function restorePendingSeeTooAfterSignIn"),
  "restorePendingSeeTooAfterSignIn helper exists"
);
assert(
  js.includes("function resolvePendingSeeTooFeedIndex"),
  "resolvePendingSeeTooFeedIndex helper exists"
);

const captureMatch = js.match(
  /function capturePendingSeeTooContext\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!captureMatch, "capturePendingSeeTooContext body readable");
const capture = captureMatch ? captureMatch[1] : "";
assert(capture.includes('action: "see-too"'), "records see-too action intent");
assert(capture.includes("signalId: scene.id"), "records stable scene.id identity");
assert(
  capture.includes("communityId") && capture.includes("cityIdFromScene"),
  "records community identity from scene"
);
assert(
  capture.includes("feedIndex: feedIndex"),
  "stores feed index only as rendering aid"
);

const feedSeeToo = sliceHandler(
  'if (role === "feed-see-too")',
  'if (role === "feed-open-signal")'
);
assert(
  feedSeeToo.includes("capturePendingSeeTooContext"),
  "feed I SEE THIS TOO records pending context"
);
assert(
  feedSeeToo.includes("openInvite()"),
  "feed I SEE THIS TOO still opens membership invite"
);

const detailSeeToo = sliceHandler(
  'detailSeeToo.addEventListener("click"',
  'detailAddTestimony.addEventListener("click"'
);
assert(
  detailSeeToo.includes("capturePendingSeeTooContext"),
  "signal-detail I SEE THIS TOO records pending context"
);
assert(
  detailSeeToo.includes("openInvite()"),
  "signal-detail I SEE THIS TOO still opens membership invite"
);

const testimony = sliceHandler(
  'detailAddTestimony.addEventListener("click"',
  'document.addEventListener("keydown"'
);
assert(
  !testimony.includes("capturePendingSeeTooContext"),
  "testimony CTA does not invent see-too pending context"
);

const postMatch = js.match(
  /function continueAfterPublicPasskeySignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!postMatch, "continueAfterPublicPasskeySignIn exists");
const post = postMatch ? postMatch[1] : "";
assert(
  post.includes("hasAuthoritativePaidMembership"),
  "paid-member branch still consulted first"
);
assert(
  post.includes("clearPendingSeeTooContext") &&
    post.indexOf("clearPendingSeeTooContext") <
      post.indexOf("syncFeedMemberState"),
  "paid-member Sign-in clears pending context and stays on feed"
);
assert(
  post.includes("restorePendingSeeTooAfterSignIn"),
  "pending see-too path is consulted after Sign-in"
);
assert(
  post.includes("beginInviteMembershipJourney") &&
    post.includes('go("commitment")'),
  "Sign-in without pending see-too still goes to commitment"
);

const restoreMatch = js.match(
  /function restorePendingSeeTooAfterSignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!restoreMatch, "restorePendingSeeTooAfterSignIn body readable");
const restore = restoreMatch ? restoreMatch[1] : "";
assert(
  restore.includes("resolvePendingSeeTooFeedIndex"),
  "restore resolves origin by signal identity"
);
assert(restore.includes('go("feed")'), "restore returns to feed");
assert(restore.includes("openInvite()"), "restore presents membership invite");
assert(
  restore.includes("clearPendingSeeTooContext"),
  "restore consumes pending context"
);
assert(
  !restore.includes("signalConfirmed = true"),
  "restore does not auto-confirm the signal"
);
assert(
  !restore.includes("membershipSimulated = true"),
  "restore does not activate membership"
);

const resolveMatch = js.match(
  /function resolvePendingSeeTooFeedIndex\(context\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!resolveMatch, "resolvePendingSeeTooFeedIndex body readable");
const resolve = resolveMatch ? resolveMatch[1] : "";
assert(
  resolve.includes("context.signalId") && resolve.includes("scene.id"),
  "resolution prefers stable signal id over index alone"
);
assert(
  resolve.includes("context.feedIndex") &&
    resolve.includes("aid.id === context.signalId"),
  "feed index aid requires matching signal id"
);

const inviteContinue = sliceHandler(
  'inviteContinue.addEventListener("click"',
  'inviteNotNow.addEventListener("click"'
);
assert(
  inviteContinue.includes("clearPendingSeeTooContext"),
  "invite Continue clears pending see-too context"
);

const inviteNotNow = sliceHandler(
  'inviteNotNow.addEventListener("click"',
  'membershipContinue.addEventListener("click"'
);
assert(
  inviteNotNow.includes("clearPendingSeeTooContext"),
  "invite Not now clears pending see-too context"
);

assert(
  js.includes("clearPendingSeeTooContext()") &&
    /originatingFeedIndex = 0;\s*clearPendingSeeTooContext\(\)/.test(js),
  "visitor session reset clears pending see-too context"
);

const readyContinue = sliceHandler(
  'readyContinue.addEventListener("click"',
  'readyBack.addEventListener("click"'
);
assert(
  !readyContinue.includes("restorePendingSeeTooAfterSignIn") &&
    !readyContinue.includes("pendingSeeTooContext"),
  "readyContinue account-creation path is unchanged by see-too pending context"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " see-too Sign-in continuity assertions");
