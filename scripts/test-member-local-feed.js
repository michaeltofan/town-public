/**
 * Member-local HOME feed + explore zone + wrong-community participate guards.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const signalCopy = fs.readFileSync(path.join(root, "signal-copy.js"), "utf8");
const recovery = fs.readFileSync(
  path.join(root, "membership-recovery.js"),
  "utf8"
);
const discovery = fs.readFileSync(path.join(root, "city-discovery.js"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(
  js.includes("function memberHomeCityId()"),
  "memberHomeCityId helper exists"
);
assert(
  js.includes("function sceneMatchesMemberCommunity("),
  "sceneMatchesMemberCommunity helper exists"
);
assert(
  js.includes("function noticeNotYourCommunity("),
  "noticeNotYourCommunity helper exists"
);
assert(
  js.includes("Your community is {home}. You can explore {explored}") &&
    js.includes("Comunitatea ta este {home}. Poți explora {explored}"),
  "wrong-community notice names home and explored communities"
);
assert(
  js.includes("function shouldOfferMembershipInvite("),
  "shouldOfferMembershipInvite helper exists"
);
assert(
  recovery.includes("function shouldOfferMembershipInvite("),
  "membership-recovery exposes shouldOfferMembershipInvite"
);
assert(
  discovery.includes("createMemberExploreStory") &&
    discovery.includes("MEMBER_EXPLORE_COPY"),
  "city-discovery exposes member explore-zone story"
);

const productOnlyMatch = js.match(
  /function productOnlyScenes\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!productOnlyMatch, "productOnlyScenes body readable");
const productOnly = productOnlyMatch[1];
assert(
  productOnly.includes("memberHomeCityId()"),
  "product-only feed consults member home city"
);
assert(
  productOnly.includes("appendLiveScenesForCity(out, homeCityId)"),
  "committed members get home community first on HOME"
);
assert(
  productOnly.includes("if (cityId === homeCityId) continue"),
  "other cities are appended after home as exploration content"
);
assert(
  productOnly.includes("hasAuthoritativePaidMembership()"),
  "paid members without home do not fall back to mixed all-city HOME"
);

const currentScenesMatch = js.match(
  /function currentScenes\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!currentScenesMatch, "currentScenes body readable");
const currentScenesBody = currentScenesMatch[1];
assert(
  currentScenesBody.includes("createMemberExploreStory"),
  "member HOME inserts explore-zone divider before other cities"
);
assert(
  currentScenesBody.includes("countLiveScenesForCity(homeCityId)"),
  "explore divider is placed after the home community block"
);

const matchBody = js.match(
  /function sceneMatchesMemberCommunity\(scene\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!matchBody, "sceneMatchesMemberCommunity body readable");
assert(
  matchBody[1].includes("hasAuthoritativePaidMembership()") &&
    matchBody[1].includes("return false"),
  "unknown home fails closed for members"
);

const activateMatch = js.match(
  /async function activateSeeTooAction\(options\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!activateMatch, "activateSeeTooAction body readable");
const activate = activateMatch[1];
assert(
  activate.includes("sceneMatchesMemberCommunity"),
  "see-too checks member community before confirm"
);
assert(
  activate.includes("noticeNotYourCommunity"),
  "wrong-community see-too shows explore-only notice"
);
assert(
  activate.includes('return "wrong_community"'),
  "wrong-community see-too returns dedicated result"
);
assert(
  activate.includes("shouldOfferMembershipInvite"),
  "see-too invite path consults membership invite gate"
);
assert(
  activate.includes("redirectMemberWithoutCivicAccess") ||
    activate.includes('return "member_blocked"'),
  "paid non-civic path does not use visitor invite"
);
const forbiddenIdx = activate.indexOf('status === 403');
assert(forbiddenIdx >= 0, "see-too still handles API 403");
const inviteAfter403 = activate.slice(forbiddenIdx).includes("openInvite()");
assert(
  !inviteAfter403,
  "civic-eligible 403 path does not open membership invite"
);
assert(
  activate.includes("ACTOR_NOT_ELIGIBLE_FOR_COMMUNITY"),
  "community-mismatch 403 code maps to explore-only notice"
);

assert(
  js.includes("notYourCommunity:"),
  "FEED_COPY includes notYourCommunity"
);
assert(
  (js.match(/notYourCommunity:/g) || []).length >= 5,
  "notYourCommunity present across feed locales"
);
assert(
  js.includes(
    "Poți explora, dar participarea este rezervată comunității locale."
  ),
  "Romanian explore-only copy matches product wording"
);

assert(
  js.includes("detailSessionContribute.addEventListener"),
  "discussion contribute handler present"
);
const contributeHandler = js.slice(
  js.indexOf("detailSessionContribute.addEventListener"),
  js.indexOf("detailSessionAttach.addEventListener")
);
assert(
  contributeHandler.includes("sceneMatchesMemberCommunity"),
  "discussion contribute guards wrong community"
);
assert(
  contributeHandler.includes("noticeNotYourCommunity"),
  "discussion contribute uses explore-only notice"
);
assert(
  contributeHandler.includes("shouldOfferMembershipInvite"),
  "discussion contribute invite is membership-gated"
);

const openInviteMatch = js.match(
  /function openInvite\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!openInviteMatch, "openInvite body readable");
assert(
  openInviteMatch[1].includes("shouldOfferMembershipInvite"),
  "openInvite hard-stops for existing members"
);

assert(
  js.includes("applyCommitmentSnapshot") &&
    js.includes("renderFeedScene()") &&
    /function applyCommitmentSnapshot\([\s\S]*?renderFeedScene\(\)/.test(js),
  "commitment apply refreshes HOME feed scope"
);

const authSignInMatch = js.match(
  /function startPublicAuthWindowPasskeySignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!authSignInMatch, "public auth sign-in helper readable");
assert(
  !authSignInMatch[1].includes("membershipSnapshot = null"),
  "public Sign-in does not wipe membership snapshot on fetch failure"
);
assert(
  js.includes(
    "Keep prior authoritative snapshot on transient failure so a\n              // paying member is never routed as a non-member."
  ),
  "sign-in membership fetch failure preserves prior membership truth"
);

assert(
  !/latestUpdate":\s*"[^"]*prototyp/i.test(signalCopy),
  "signal-copy latestUpdate has no prototype wording"
);
assert(
  !/latestUpdate":\s*"[^"]*prototip/i.test(signalCopy),
  "signal-copy latestUpdate has no prototip wording"
);

const feedScenesStart = js.indexOf("const FEED_SCENES");
const feedScenesEnd = js.indexOf("const apiBaseHelper");
const feedScenes = js.slice(feedScenesStart, feedScenesEnd);
assert(
  !/prototyp|prototip/i.test(feedScenes),
  "FEED_SCENES catalog has no prototype wording"
);

const feedLocaleMatch = js.match(
  /function feedLocaleForScene\(scene\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!feedLocaleMatch, "feedLocaleForScene body readable");
assert(
  feedLocaleMatch[1].includes("feedChromeCopy(readingLang)") &&
    feedLocaleMatch[1].includes("lang: readingLang") &&
    !feedLocaleMatch[1].includes("sourceLanguageForCity") &&
    !feedLocaleMatch[1].includes("const detailLang"),
  "signal detail chrome always follows the browser reading language"
);

const civicCopyMatch = js.match(
  /function civicProcessCopy\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!civicCopyMatch, "civicProcessCopy body readable");
assert(
  civicCopyMatch[1].includes("resolvePublicReadingLanguage()") &&
    !civicCopyMatch[1].includes("feedLocaleForScene(scene)"),
  "civic process always follows the browser reading language"
);

console.log("PASSED: " + passed + " member-local-feed assertions");
