"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  buildUniqueEmail,
  extractVerificationCode,
  recipientMatches,
} = require("../e2e/helpers/resend-verification");
const {
  PUBLIC_ORIGIN,
  candidatePath,
} = require("../e2e/helpers/candidate-staging-origin");

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
assert.equal(PUBLIC_ORIGIN, "https://towncivic.org");
assert.equal(path.basename(candidatePath("https://towncivic.org/?candidate=1")), "index.html");

const root = path.join(__dirname, "..");
const workflow = fs.readFileSync(path.join(root, ".github/workflows/e2e.yml"), "utf8");
const spec = fs.readFileSync(path.join(root, "e2e/account-enrollment.spec.js"), "utf8");
const recoverySpec = fs.readFileSync(
  path.join(root, "e2e/account-enrollment-recovery.spec.js"),
  "utf8"
);
const productScript = fs.readFileSync(path.join(root, "script.js"), "utf8");

assert.match(workflow, /github\.event_name == 'workflow_dispatch'/);
assert.match(workflow, /github\.ref == 'refs\/heads\/main'/);
assert.match(workflow, /secrets\.TOWN_E2E_EMAIL_BASE/);
assert.match(workflow, /secrets\.TOWN_RESEND_API_KEY/);
// trace/screenshot stay off (they can leak real credential/session detail into
// artifacts). video is a deliberate exception: this spec is the source for
// the single human-reviewed enrollment-journey recording, on-demand only via
// the staging-account-enrollment job — never part of push/PR CI.
assert.match(spec, /test\.use\(\{ trace: "off", screenshot: "off", video: "on" \}\)/);
assert.match(spec, /WebAuthn\.addVirtualAuthenticator/);
assert.match(spec, /installCandidateAtProductionOrigin/);
assert.equal(
  spec.includes('page.goto(`${PUBLIC_ORIGIN}/#/feed`)'),
  true
);
assert.equal(
  spec.includes(
    '[data-feed-index]:visible [data-feed-role="feed-see-too"]:visible'
  ),
  true
);
assert.equal(spec.includes("#membership-invite"), true);
assert.equal(spec.includes("#invite-continue"), true);
assert.equal(
  spec.includes('page.goto(`${PUBLIC_ORIGIN}/#/membership`)'),
  false
);
assert.equal(spec.includes('success: page.locator("#view-ready")'), true);
assert.equal(spec.includes('page.locator("#passkey-success")'), false);
assert.equal(spec.includes('page.locator("#passkey-continue")'), false);
assert.equal(spec.includes('visibleError: page.locator("#passkey-error")'), true);
assert.equal(spec.includes('visibleError: page.locator("#ready-error")'), true);
assert.equal(spec.includes("no matching API response captured"), true);
assert.match(spec, /\/v1\/account\/passkeys\/registration\/verify/);
assert.match(spec, /\/v1\/authentication\/passkeys\/verify/);
assert.match(spec, /\/v1\/authentication\/session/);
assert.match(spec, /\/v1\/account\/community-commitment/);
assert.match(workflow, /account-enrollment-recovery\.spec\.js/);
assert.match(recoverySpec, /page\.reload\(\)/);
assert.match(recoverySpec, /INVALID_OR_EXPIRED_CHALLENGE/);
assert.match(productScript, /function recoverInterruptedEnrollmentAfterReload\(\)/);
assert.match(productScript, /restartAfterRefresh/);
assert.equal(
  productScript
    .slice(
      productScript.indexOf("function recoverInterruptedEnrollmentAfterReload"),
      productScript.indexOf("function isCityDiscoveryJourneyActive")
    )
    .includes("Storage"),
  false
);

console.log("PASSED: 35 staging account enrollment E2E assertions");
