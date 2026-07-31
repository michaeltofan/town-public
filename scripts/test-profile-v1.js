/**
 * Focused regression: Profile V1 for registered accounts.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
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

assert(html.includes('id="profile-panel"'), "profile panel markup present");
assert(html.includes('id="profile-activity-list"'), "activity list present");
assert(css.includes(".profile-panel"), "profile styles present");
assert(js.includes("const PROFILE_COPY"), "profile copy present");
assert(js.includes("function openProfilePanel"), "openProfilePanel exists");
assert(js.includes("function handleProfileNav"), "handleProfileNav exists");
assert(js.includes("function populateProfilePanel"), "populateProfilePanel exists");

const profileNav = js.match(
  /function handleProfileNav\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!profileNav, "handleProfileNav body readable");
const navBody = profileNav ? profileNav[1] : "";
assert(
  navBody.includes("sessionAuthenticated") &&
    navBody.includes("openProfilePanel()"),
  "authenticated PROFILE opens profile panel"
);
assert(
  navBody.includes('openAuthWindow(navProfile, "profile")'),
  "unauthenticated PROFILE opens Sign-in with profile intent"
);

const post = js.match(
  /function continueAfterPublicPasskeySignIn\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!post, "continueAfterPublicPasskeySignIn readable");
const postBody = post ? post[1] : "";
assert(
  postBody.includes('openedFor === "profile"') &&
    postBody.includes("openProfilePanel()"),
  "Sign-in opened from PROFILE returns to profile"
);
assert(
  postBody.includes("beginInviteMembershipJourney") &&
    postBody.includes('go("commitment")'),
  "unrelated non-member Sign-in still continues to commitment"
);

const populate = js.match(
  /function populateProfilePanel\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!populate, "populateProfilePanel body readable");
const body = populate ? populate[1] : "";
assert(
  body.includes("hasAuthoritativePaidMembership") &&
    body.includes("commitmentSnapshot"),
  "profile uses membership + community truth"
);
assert(
  body.includes("refreshProfileActivityFromBackend"),
  "profile activity loads confirmations from backend activity"
);
assert(
  !body.includes("subscribers") && !body.includes("Substack"),
  "profile does not invent Substack social fields"
);

assert(
  js.includes('navProfile.addEventListener("click"') &&
    js.includes("handleProfileNav()"),
  "PROFILE click wired to handleProfileNav"
);
assert(
  js.includes("closeProfilePanel()") &&
    js.includes('event.key === "Escape"'),
  "profile can be dismissed"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " Profile V1 assertions");
