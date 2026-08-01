/**
 * Smoke assertions for the separate TOWN platform operator console.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "platform/index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "platform/platform.js"), "utf8");
const css = fs.readFileSync(path.join(root, "platform/platform.css"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(html.includes("TOWN Platform"), "brand title present");
assert(html.includes('id="console"'), "console shell present");
assert(html.includes('data-section="status"'), "status nav present");
assert(html.includes('data-section="accounts"'), "accounts nav present");
assert(html.includes('data-section="moderation"'), "moderation nav present");
assert(html.includes('data-section="investigate"'), "investigate nav present");
assert(html.includes('data-section="audit"'), "audit nav present");
assert(html.includes('data-section="operators"'), "operators nav present");

assert(js.includes("/v1/platform/session"), "session path");
assert(js.includes("/v1/platform/status"), "status path");
assert(js.includes("/v1/platform/accounts"), "accounts path");
assert(js.includes("/v1/platform/signals"), "signals path");
assert(js.includes("/v1/platform/audit"), "audit path");
assert(js.includes("/v1/platform/operators"), "operators path");
assert(js.includes("credentials: \"include\""), "cookie credentials");
assert(!js.includes("/admin"), "avoids /admin path");
assert(!js.includes("/users"), "avoids /users path");

assert(css.includes("--font-display"), "display font token");
assert(css.includes("@keyframes rise"), "motion present");
assert(css.includes("@keyframes drift"), "atmosphere motion present");

console.log("PASSED: " + passed + " platform console assertions");
