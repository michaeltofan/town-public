/**
 * Smoke assertions for member Activity UI — backend truth only.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

let passed = 0;
function assert(cond, message) {
  if (!cond) {
    console.error("FAIL:", message);
    process.exit(1);
  }
  passed += 1;
  console.log("OK:", message);
}

assert(html.includes('id="activity-panel"'), "activity panel present");
assert(html.includes('id="activity-list"'), "activity list present");
assert(html.includes('id="nav-activity"'), "activity nav present");
assert(html.includes("script.js?v=member-activity-1"), "cache buster bumped");

assert(js.includes("function handleActivityNav"), "activity nav handler");
assert(js.includes("function openActivityPanel"), "open helper");
assert(js.includes("function fetchAccountActivity"), "fetch helper");
assert(js.includes("/v1/account/activity"), "uses account activity endpoint");
assert(js.includes('kind === "confirmation"'), "renders confirmations");
assert(js.includes("contribution"), "renders contributions");
assert(js.includes("signal_evolution"), "renders signal evolution");
assert(js.includes("openedFor === \"activity\"") || js.includes("openedFor === 'activity'"), "post-auth lands on activity");
assert(!js.includes('handleProtectedNav(navActivity, "activity")'), "does not always-open auth for activity");

// Must not invent demo activity or browser-only activity store.
assert(!js.includes("demoActivity"), "no demo activity store");
assert(!js.includes("fakeActivity"), "no fake activity");
assert(!js.includes("localStorage") || !/activity.*localStorage|localStorage.*activity/i.test(js), "activity not driven by localStorage key");

assert(css.includes(".activity-panel"), "activity styles present");
assert(js.includes("refreshProfileActivityFromBackend"), "profile confirmations also use backend");

console.log("PASSED: " + passed + " member activity assertions");
