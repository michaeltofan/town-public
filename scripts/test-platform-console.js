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
assert(html.includes('id="platform-sign-in"'), "dedicated Sign-in control present");
assert(html.includes('id="platform-sign-out"'), "Sign-out control present");
assert(html.includes("Sign in with passkey"), "passkey Sign-in label present");
assert(
  html.includes("swa-browser-13.3.0.umd.min.js"),
  "WebAuthn browser helper loaded on platform"
);
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
assert(html.includes('id="operator-grant-role"'), "operator grant role select present");
assert(
  (html.match(/id="operator-role"/g) || []).length === 1,
  "operator-role id is unique for session chip"
);

assert(js.includes("/v1/platform/session"), "session path");
assert(js.includes("/v1/platform/status"), "status path");
assert(js.includes("/v1/platform/accounts"), "accounts path");
assert(js.includes("/v1/platform/signals"), "signals path");
assert(js.includes("/v1/platform/audit"), "audit path");
assert(js.includes("/v1/platform/operators"), "operators path");
assert(
  js.includes("/v1/authentication/passkeys/options"),
  "passkey options path"
);
assert(
  js.includes("/v1/authentication/passkeys/verify"),
  "passkey verify path"
);
assert(js.includes("/v1/authentication/logout"), "logout path");
assert(js.includes("function startPlatformPasskeySignIn"), "dedicated Sign-in helper");
assert(js.includes("function runPasskeyAuthenticationCeremony"), "passkey ceremony helper");
assert(
  js.includes("not authorized for platform access"),
  "authenticated non-operator stays gated with clear copy"
);
assert(js.includes("credentials: \"include\""), "cookie credentials");
assert(!js.includes("/admin"), "avoids /admin path");
assert(!js.includes("/users"), "avoids /users path");
assert(
  !js.includes("Sign in on TOWN with an authorized account"),
  "JS copy no longer sends operators to the public site"
);

assert(css.includes("--font-display"), "display font token");
assert(css.includes("@keyframes rise"), "motion present");
assert(css.includes("@keyframes drift"), "atmosphere motion present");
assert(css.includes(".button:disabled"), "disabled Sign-in state styled");

console.log("PASSED: " + passed + " platform console assertions");
