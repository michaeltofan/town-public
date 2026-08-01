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
assert(html.includes('id="gate"'), "access gate present");
assert(html.includes('id="platform-sign-in-form"'), "dedicated Sign-in form present");
assert(html.includes('id="platform-email"'), "email field present");
assert(html.includes('id="platform-password"'), "password field present");
assert(html.includes('id="platform-sign-out"'), "Sign-out control present");
assert(
  !html.includes("Sign in on the main TOWN site"),
  "gate no longer redirects operators to the public Sign-in surface"
);
assert(html.includes('data-section="status"'), "status nav present");
assert(html.includes('data-section="accounts"'), "accounts nav present");
assert(html.includes('data-section="moderation"'), "moderation nav present");
assert(html.includes('data-section="investigate"'), "investigate nav present");
assert(html.includes('data-section="audit"'), "audit nav present");
assert(html.includes('data-section="operators"'), "operators nav present");
assert(html.includes('data-section="memberships"'), "memberships nav present");
assert(html.includes('id="memberships-grant"'), "membership grant form present");
assert(html.includes('id="memberships-search"'), "membership search form present");
assert(html.includes('id="operator-grant-role"'), "operator grant role select present");
assert(
  (html.match(/id="operator-role"/g) || []).length === 1,
  "operator-role id is unique for session chip"
);

assert(js.includes("/v1/platform/session"), "session path");
assert(js.includes("/v1/platform/status"), "status path");
assert(js.includes("components.api"), "status renders API component");
assert(js.includes("components.database"), "status renders database component");
assert(js.includes("components.email"), "status renders email component");
assert(js.includes("components.stripe"), "status renders Stripe component");
assert(html.includes('id="status-components"'), "status components grid present");
assert(html.includes('id="status-errors"'), "recent errors panel present");
assert(js.includes("/v1/platform/errors"), "recent errors path");
assert(js.includes("loadRecentErrors"), "recent errors loader");
assert(html.includes('id="status-uptime-summary"'), "uptime summary present");
assert(html.includes('id="status-alerts"'), "alerts panel present");
assert(js.includes("/v1/platform/uptime"), "uptime path");
assert(js.includes("/v1/platform/alerts"), "alerts path");
assert(js.includes("loadUptime"), "uptime loader");
assert(js.includes("loadAlerts"), "alerts loader");
assert(js.includes("/acknowledge"), "alert acknowledge path");
assert(js.includes("/v1/platform/accounts"), "accounts path");
assert(js.includes("/v1/platform/memberships"), "memberships path");
assert(js.includes("/v1/platform/memberships/grant"), "membership grant path");
assert(js.includes("/schedule-cancellation"), "membership schedule-cancellation path");
assert(js.includes("/v1/platform/signals"), "signals path");
assert(js.includes("/v1/platform/submissions"), "submissions path");
assert(js.includes("/v1/platform/discussions"), "discussions path");
assert(js.includes('action === "reject"'), "submission reject action");
assert(js.includes("Submission restored"), "submission restore messaging");
assert(js.includes('action === "hide"'), "discussion hide action");
assert(js.includes("Contribution unhidden"), "discussion unhide messaging");
assert(html.includes('id="submissions-search"'), "submissions search present");
assert(html.includes('id="discussions-search"'), "discussions search present");
assert(html.includes('id="submission-detail"'), "submission detail present");
assert(html.includes('id="discussion-detail"'), "discussion detail present");
assert(js.includes("/v1/platform/audit"), "audit path");
assert(js.includes("/v1/platform/operators"), "operators path");
assert(js.includes("/v1/authentication/password"), "password Sign-in path");
assert(js.includes("/v1/authentication/logout"), "logout path");
assert(js.includes("function startPlatformPasswordSignIn"), "dedicated password Sign-in helper");
assert(
  js.includes("not authorized for platform access"),
  "authenticated non-operator stays gated with clear copy"
);
assert(js.includes("credentials: \"include\""), "cookie credentials");
assert(js.includes("idempotencyKey"), "membership idempotency key present");
assert(js.includes("Provider-managed"), "provider-managed messaging present");
assert(js.includes("promptReason"), "moderation reason prompt present");
assert(!js.includes("/admin"), "avoids /admin path");
assert(!js.includes("/users"), "avoids /users path");

assert(css.includes("--font-display"), "display font token");
assert(css.includes("@keyframes rise"), "motion present");
assert(css.includes("@keyframes drift"), "atmosphere motion present");
assert(css.includes(".gate-form"), "gate form styles present");

console.log("PASSED: " + passed + " platform console assertions");
