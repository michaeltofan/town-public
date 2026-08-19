/**
 * Focused regression tests for public auth-window Create account + passkey Sign-in.
 * Source-structure assertions (same style as other town-public script tests).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

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

assert(html.includes('id="auth-password"'), "password control present in HTML");
assert(html.includes('id="auth-passkey"'), "passkey control present");
assert(html.includes('id="auth-window-status"'), "auth status surface present");
assert(html.includes('id="auth-window"'), "public auth window present");

const continueBody = sliceHandler(
  'authContinue.addEventListener("click"',
  'authPasskey.addEventListener("click"'
);
const passkeyBody = sliceHandler(
  'authPasskey.addEventListener("click"',
  'enterButton.addEventListener("click"'
);

assert(
  continueBody.includes("requestEmailVerification"),
  "Create account Continue still requests email verification"
);
assert(
  continueBody.includes('authMode === "create"') &&
    continueBody.includes('authChannel === "email"'),
  "Create account path still gated on create + email"
);
assert(
    continueBody.includes("startPublicAuthWindowPasswordSignIn") &&
    continueBody.includes('authMode === "signin"'),
  "Sign-in Continue invokes password authentication"
);
assert(
  !/authMode === "signin"\s*\{\s*return;\s*\}/.test(continueBody),
  "Sign-in Continue does not early-return without action"
);
assert(
  passkeyBody.includes("startPublicAuthWindowPasskeySignIn"),
  "Sign in with passkey invokes canonical public Sign-in helper"
);

const helperMatch = js.match(
  /function startPublicAuthWindowPasskeySignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!helperMatch, "startPublicAuthWindowPasskeySignIn helper exists");
const helper = helperMatch ? helperMatch[1] : "";
assert(
  helper.includes("runPasskeyAuthenticationCeremony"),
  "helper starts canonical passkey ceremony"
);
assert(
  helper.includes("fetchAccountMembership") &&
    helper.includes("applyMembershipSnapshot"),
  "successful auth loads membership state"
);
assert(
  helper.includes("bootstrapCommunityCommitment"),
  "successful auth restores community-commitment state"
);
assert(
  helper.includes("continueAfterPublicPasskeySignIn"),
  "successful auth continues to post-auth destination"
);

const outerCatchIdx = helper.indexOf(".catch(function (err)");
const catchBody = outerCatchIdx >= 0 ? helper.slice(outerCatchIdx) : "";
assert(outerCatchIdx >= 0, "helper has catch for ceremony failure");
assert(
  catchBody.includes("sessionAuthenticated = false"),
  "no authenticated state when ceremony fails"
);
assert(
  catchBody.includes("isPasskeyCeremonyCancelled") &&
    catchBody.includes("showAuthWindowStatus"),
  "cancellation/failure produce visible recoverable feedback"
);
assert(
  !catchBody.includes("continueAfterPublicPasskeySignIn"),
  "failed ceremony does not continue membership journey"
);

const postMatch = js.match(
  /function continueAfterPublicPasskeySignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!postMatch, "continueAfterPublicPasskeySignIn exists");
const post = postMatch ? postMatch[1] : "";
assert(post.includes("closeAuthWindow"), "closes auth window on success");
assert(
  post.includes("hasAuthoritativePaidMembership"),
  "routes from authoritative membership"
);
assert(
  post.includes("restorePendingSeeTooAfterSignIn"),
  "pending see-too continuity is consulted before default non-member routing"
);
assert(
  post.includes("beginInviteMembershipJourney") &&
    post.includes('go("commitment")'),
  "non-members without pending see-too continue into membership journey"
);
assert(
  !post.includes("requestCheckoutSession") && !post.includes("checkoutUrl"),
  "does not initiate Checkout"
);

const inertMatch = js.match(
  /function setAuthFeedInert\(isInert\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!inertMatch, "setAuthFeedInert helper exists");
const inertBody = inertMatch ? inertMatch[1] : "";
assert(
  inertBody.includes("profilePanel.inert = isInert && authWindowOpen"),
  "closing auth always restores Profile interaction before post-auth routing"
);
assert(
  html.includes('auth-input.js?v=auth-input-1') &&
    html.includes('script.js?v=madrid-es-4') &&
    html.includes('api-base.js?v=madrid-pilot-1'),
  "app bundle and API base carry the Pilot Madrid cache key"
);

assert(
  js.includes("const PRODUCT_ONLY_PUBLIC_MODE = true"),
  "product-only mode remains enabled"
);
assert(
  js.includes("openAuthWindow") &&
    js.includes("startPublicAuthWindowPasskeySignIn"),
  "product-only routing still exposes functional public Sign-in"
);

// Visitor / membership / participation boundaries remain intact
assert(
  js.includes("canTakeCivicAction") &&
    js.includes("enablesCivicParticipation"),
  "civic participation still fail-closed on backend canParticipate"
);
assert(
  js.includes("hasAuthoritativePaidMembership") &&
    js.includes("isMemberPresented"),
  "membership presentation still derives from authoritative snapshot"
);
assert(js.includes("authenticateWithPassword"), "password Sign-in handler is wired");
assert(
  js.includes('/v1/authentication/password'),
  "password Sign-in uses the canonical endpoint"
);

const ceremonyMatch = js.match(
  /function runPasskeyAuthenticationCeremony\(\)\s*\{([\s\S]*?)\n  \}/
);
const ceremony = ceremonyMatch ? ceremonyMatch[1] : "";
assert(
  ceremony.includes("fetchAuthenticationSession"),
  "canonical ceremony still probes backend session"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " public auth Sign-in assertions");
