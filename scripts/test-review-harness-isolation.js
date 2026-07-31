"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const productScript = fs.readFileSync(path.join(root, "script.js"), "utf8");
const productHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const harnessJs = fs.readFileSync(
  path.join(root, "review/commitment-visual-harness.js"),
  "utf8"
);
const harnessHtml = fs.readFileSync(
  path.join(root, "review/commitment-visual-harness.html"),
  "utf8"
);
const boundary = fs.readFileSync(
  path.join(root, "screen-commitment-boundary.html"),
  "utf8"
);

function assertIncludes(haystack, needle, message) {
  assert.ok(haystack.includes(needle), message);
}

function assertExcludes(haystack, needle, message) {
  assert.ok(!haystack.includes(needle), message);
}

// 1. Normal product ignores townReview simulation
assertIncludes(
  productScript,
  "intentionally ignored — no UI simulation, no authority",
  "product must explicitly ignore townReview"
);
assertExcludes(
  productScript,
  'enteredEmail = "review@towncivic.org"',
  "product must not assign review email"
);
assertExcludes(
  productScript,
  "review@towncivic.org",
  "product must not contain review email fixture"
);
assert.ok(
  !/params\.get\("townReview"\)[\s\S]{0,200}sessionAuthenticated\s*=\s*true/.test(
    productScript
  ),
  "product must not set sessionAuthenticated from townReview"
);
assert.ok(
  !/params\.get\("townReview"\)[\s\S]{0,400}commitmentSnapshot\s*=\s*\{/.test(
    productScript
  ),
  "product must not manufacture commitmentSnapshot from townReview"
);

// 2. Product entrypoint does not load harness
assertExcludes(
  productHtml,
  "commitment-visual-harness",
  "index.html must not load harness"
);
assertExcludes(productHtml, "townReview", "index.html must not mention townReview");
assertExcludes(
  productHtml,
  "screen-commitment-boundary",
  "index.html must not link boundary"
);

// 3. Boundary redirects only to harness
assertIncludes(
  boundary,
  "review/commitment-visual-harness.html",
  "boundary must point at harness"
);
assertExcludes(
  boundary,
  "index.html?townReview",
  "boundary must not enter product with townReview"
);

// 4. Harness makes no real API calls / does not load product script
assertExcludes(
  harnessHtml,
  'src="../script.js"',
  "harness must not load product script.js"
);
assertExcludes(
  harnessHtml,
  'src="script.js"',
  "harness must not load product script.js"
);
assert.ok(
  !/<script[^>]+script\.js/.test(harnessHtml),
  "harness must not include a product script.js tag"
);
assertExcludes(
  harnessJs,
  "/v1/account/",
  "harness must not reference account API"
);
assertExcludes(
  harnessJs,
  "/v1/billing/",
  "harness must not reference billing API"
);
assertExcludes(
  harnessJs,
  "/v1/authentication/",
  "harness must not reference authentication API"
);
assertExcludes(
  harnessJs,
  "api-staging.towncivic.org",
  "harness must not reference API_BASE host"
);
assertIncludes(
  harnessJs,
  "network fetch is disabled",
  "harness must disable fetch"
);
assertIncludes(harnessJs, "XHR is disabled", "harness must disable XHR");

// 5. All eight approved fixture keys remain
const fixtures = [
  "commitment-no-country",
  "commitment-country-only",
  "commitment-city-no-accept",
  "commitment-accept-pending",
  "commitment-rejected",
  "commitment-recorded",
  "commitment-no-acceptance-existing",
  "commitment-restored",
];
for (const name of fixtures) {
  assertIncludes(harnessJs, `"${name}"`, `fixture ${name} must remain`);
}

// 6. Harness does not grant membership/participation markers
assertExcludes(harnessJs, "membershipSimulated", "no membership simulation");
assertExcludes(harnessJs, "canParticipate", "no participation grant");
assertExcludes(harnessJs, "sessionAuthenticated", "no session flag grant");

console.log("OK: review harness isolation tests passed");
