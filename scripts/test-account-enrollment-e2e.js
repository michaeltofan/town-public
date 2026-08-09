"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  buildUniqueEmail,
  extractVerificationCode,
  recipientMatches,
} = require("../e2e/helpers/resend-verification");

assert.equal(
  buildUniqueEmail("town+{tag}@example.com", "GH_123/2"),
  "town+gh-123-2@example.com"
);
assert.throws(() => buildUniqueEmail("town@example.com", "gh-1"), /\{tag\}/);
assert.equal(recipientMatches({ to: ["ONE@example.com"] }, "one@example.com"), true);
assert.equal(
  extractVerificationCode({ subject: "TOWN verification", html: "<p>Your code is <b>482915</b>.</p>" }),
  "482915"
);
assert.throws(
  () => extractVerificationCode({ text: "Codes 482915 and 123456" }),
  /exactly one/
);

const root = path.join(__dirname, "..");
const workflow = fs.readFileSync(path.join(root, ".github/workflows/e2e.yml"), "utf8");
const spec = fs.readFileSync(path.join(root, "e2e/account-enrollment.spec.js"), "utf8");

assert.match(workflow, /github\.event_name == 'workflow_dispatch'/);
assert.match(workflow, /github\.ref == 'refs\/heads\/main'/);
assert.match(workflow, /secrets\.TOWN_E2E_EMAIL_BASE/);
assert.match(workflow, /secrets\.TOWN_RESEND_API_KEY/);
assert.match(spec, /test\.use\(\{ trace: "off", screenshot: "off", video: "off" \}\)/);
assert.match(spec, /WebAuthn\.addVirtualAuthenticator/);
assert.match(spec, /\/v1\/account\/community-commitment/);

console.log("PASSED: 12 staging account enrollment E2E assertions");
