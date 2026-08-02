/**
 * Member-local HOME feed + wrong-community participate guards.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const signalCopy = fs.readFileSync(path.join(root, "signal-copy.js"), "utf8");

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
  productOnly.includes("[homeCityId]"),
  "committed members see home community only on HOME"
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
const forbiddenIdx = activate.indexOf('status === 403');
assert(forbiddenIdx >= 0, "see-too still handles API 403");
const inviteAfter403 = activate.slice(forbiddenIdx).includes("openInvite()");
assert(
  !inviteAfter403,
  "civic-eligible 403 path does not open membership invite"
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
  js.includes("applyCommitmentSnapshot") &&
    js.includes("renderFeedScene()") &&
    /function applyCommitmentSnapshot\([\s\S]*?renderFeedScene\(\)/.test(js),
  "commitment apply refreshes HOME feed scope"
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

console.log("PASSED: " + passed + " member-local-feed assertions");
