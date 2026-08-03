/**
 * Member civic signal create — publish under real name with photo.
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

assert(html.includes('id="signal-create"'), "create sheet present");
assert(html.includes('id="profile-create-signal"'), "profile CTA present");
assert(html.includes('id="signal-create-accept"'), "responsibility checkbox present");
assert(html.includes('accept="image/jpeg,image/png,image/webp"'), "photo accept types");
assert(js.includes("function openSignalCreate"), "open helper");
assert(js.includes("function publishMemberSignal"), "publish helper");
assert(
  js.includes("const city = memberHomeCityId();"),
  "categories come from the committed community"
);
const slugHelper = js.match(
  /function currentCommunitySlug\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!slugHelper, "community slug helper readable");
assert(
  slugHelper &&
    slugHelper[1].includes("commitmentSnapshot.community.slug") &&
    !slugHelper[1].includes("selectedCity"),
  "publishing scope never falls back to explored city"
);
assert(js.includes("/signals/media"), "media upload path");
assert(js.includes('acceptedResponsibility: true'), "reaffirms existing responsibility");
assert(js.includes("realName: realName"), "publishes real name");
assert(!js.includes("pending_review"), "does not use pending_review approval");
assert(
  js.includes("membership rules I already accepted") ||
    js.includes("regulilor de membru TOWN pe care le-am acceptat"),
  "copy references existing membership rules"
);
assert(js.includes("resolveSignalDetailImage"), "member photo URL resolver");

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " member signal create assertions");
