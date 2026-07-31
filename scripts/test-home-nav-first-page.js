/**
 * Focused regression: HOME / ACASĂ returns to the first public feed page.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const i18n = fs.readFileSync(path.join(root, "public-i18n.js"), "utf8");

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

assert(i18n.includes('navHome: "ACASĂ"'), "Romanian nav label is ACASĂ");
assert(js.includes('getElementById("nav-home")'), "HOME control is wired");
assert(js.includes("function handleHomeNav"), "handleHomeNav exists");

const homeMatch = js.match(/function handleHomeNav\(\)\s*\{([\s\S]*?)\n  \}/);
assert(!!homeMatch, "handleHomeNav body readable");
const home = homeMatch ? homeMatch[1] : "";

assert(home.includes("closeAuthWindow()"), "closes auth window");
assert(home.includes("closeInvite()"), "closes membership invite overlay");
assert(home.includes("closeSignalDetail()"), "closes signal detail overlay");
assert(
  home.includes("scrollFeedToIndex(0") && home.includes('behavior: "auto"'),
  "scrolls to the first feed page"
);
assert(home.includes("isFeedSurfaceActive()"), "only scrolls when feed is active");
assert(!home.includes("openAuthWindow"), "does not open auth window");
assert(!/\bgo\s*\(/.test(home), "does not route away via go()");
assert(
  home.includes('navHome.classList.add("is-active")'),
  "keeps HOME as the active nav item"
);

assert(
  js.includes('navHome.addEventListener("click"') &&
    js.includes("handleHomeNav()"),
  "HOME click invokes handleHomeNav"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " HOME/ACASĂ first-page assertions");
