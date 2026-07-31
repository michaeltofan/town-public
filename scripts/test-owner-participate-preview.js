/**
 * Staging-only owner participate preview — product-test unlock for paid members.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

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

assert(
  js.includes('const PARTICIPATE_PREVIEW_STORAGE_KEY = "town.participatePreview"'),
  "preview storage key defined"
);
assert(
  js.includes('const PARTICIPATE_PREVIEW_QUERY = "townParticipatePreview"'),
  "preview query param defined"
);
assert(
  js.includes("function isStagingApiBase"),
  "staging API gate helper exists"
);
assert(
  js.includes("function isOwnerParticipatePreviewEnabled"),
  "preview enabled helper exists"
);
assert(
  js.includes("function ownerParticipatePreviewAllowsCivicAction"),
  "preview civic gate helper exists"
);
assert(
  js.includes("function applyOwnerParticipatePreviewFromUrl"),
  "URL apply helper exists"
);
assert(
  js.includes("applyOwnerParticipatePreviewFromUrl()"),
  "URL preview applied at boot"
);

const canMatch = js.match(
  /function canTakeCivicAction\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!canMatch, "canTakeCivicAction found");
const canBody = canMatch ? canMatch[1] : "";
assert(
  canBody.includes("ownerParticipatePreviewAllowsCivicAction"),
  "canTakeCivicAction consults owner preview"
);
assert(
  canBody.includes("enablesCivicParticipation"),
  "backend canParticipate path remains"
);

const previewMatch = js.match(
  /function ownerParticipatePreviewAllowsCivicAction\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!previewMatch, "ownerParticipatePreviewAllowsCivicAction found");
const previewBody = previewMatch ? previewMatch[1] : "";
assert(
  previewBody.includes("isOwnerParticipatePreviewEnabled"),
  "preview requires local flag"
);
assert(
  previewBody.includes("sessionAuthenticated"),
  "preview requires signed-in session"
);
assert(
  previewBody.includes("isPaidMembership") &&
    previewBody.includes("isPaidPendingBinding"),
  "preview requires paid or paid_pending_binding snapshot"
);
const enabledMatch = js.match(
  /function isOwnerParticipatePreviewEnabled\(\)\s*\{([\s\S]*?)\n  \}/
);
const enabledBody = enabledMatch ? enabledMatch[1] : "";
assert(
  enabledBody.includes("isStagingApiBase"),
  "enabled helper refuses non-staging API"
);

assert(
  js.includes('indexOf("api-staging.towncivic.org")'),
  "staging host check present"
);
assert(
  js.includes("PARTICIPATE_PREVIEW_QUERY"),
  "preview uses named query constant"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " owner participate preview assertions");
