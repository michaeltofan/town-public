/**
 * Madrid pilot free-access surface: skip Stripe CTA wiring on pilot hosts.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    failed += 1;
    console.error("FAIL:", msg);
  } else {
    console.log("OK:", msg);
  }
}

assert(js.includes("function isMadridPilotHostSurface"), "host surface helper");
assert(
  js.includes("function isMadridPilotFreeAccessSurface"),
  "free access surface helper"
);
assert(
  js.includes("function enterMadridPilotAfterCommitment"),
  "enter pilot after commitment"
);
assert(
  js.includes("Madrid pilot: after free self-enroll, never send neighbours to Stripe"),
  "checkout path skips Stripe on Madrid"
);
assert(
  js.includes("90 días") || js.includes("90 dias") || js.includes("90 días gratis"),
  "invite/CTA mentions free 90 days"
);
assert(
  js.includes('Entrar al piloto — confirmar señales (90 días gratis)'),
  "pilot enter CTA copy"
);
assert(
  /isMadridPilotFreeAccessSurface\(\)[\s\S]*requestCheckoutSession/.test(js) ||
    js.includes("isMadridPilotFreeAccessSurface()") &&
      js.includes("requestCheckoutSession()"),
  "Madrid path gates before checkout session"
);

// Ensure Stripe checkout still exists for non-Madrid.
assert(js.includes("function startAuthenticatedCheckoutFromCommitment"), "checkout fn");
assert(js.includes("requestCheckoutSession()"), "stripe checkout still present");

if (failed) {
  console.error(failed + " failure(s)");
  process.exit(1);
}
console.log("All Madrid free-access UI assertions passed");
