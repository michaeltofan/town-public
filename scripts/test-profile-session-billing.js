/**
 * Profile exposes existing session logout + Stripe customer portal APIs.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

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

assert(html.includes('id="profile-sign-out"'), "sign-out control present");
assert(
  html.includes('id="profile-manage-billing"'),
  "manage-billing control present"
);
assert(html.includes('id="profile-status"'), "profile status line present");
assert(
  /script\.js\?v=civic-process-voting-1/.test(html),
  "cache buster bumped"
);
assert(css.includes(".profile-panel__status"), "profile status styles present");

assert(js.includes("function requestSignOut"), "logout helper present");
assert(
  js.includes("function requestCustomerPortalSession"),
  "portal helper present"
);
assert(
  js.includes("function startProfileSignOut"),
  "sign-out start helper present"
);
assert(
  js.includes("function startProfileManageBilling"),
  "billing start helper present"
);
assert(
  js.includes("function clearAuthenticatedClientState"),
  "authenticated client clear helper present"
);
assert(
  js.includes("function hasStripeManageableMembership"),
  "stripe-manageable membership gate present"
);

assert(
  js.includes('API_BASE + "/v1/authentication/logout"'),
  "wires POST /v1/authentication/logout"
);
assert(
  js.includes('API_BASE + "/v1/billing/customer-portal-session"'),
  "wires POST /v1/billing/customer-portal-session"
);
assert(js.includes("data.portalUrl"), "reads portalUrl from API");
assert(
  js.includes('data.status === "SIGNED_OUT"'),
  "accepts SIGNED_OUT logout status"
);

assert(
  js.includes('profileManageBilling.addEventListener("click"'),
  "manage billing click wired"
);
assert(
  js.includes('profileSignOut.addEventListener("click"'),
  "sign out click wired"
);
assert(
  js.includes("profileManageBilling.hidden = !stripePaid"),
  "manage billing hidden unless Stripe-paid"
);
assert(
  js.includes("isPaidMembership(membershipSnapshot)"),
  "portal gated on isPaidMembership, not paid_pending_binding alone"
);

const populate = js.match(
  /function populateProfilePanel\(\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!populate, "populateProfilePanel readable");
const body = populate ? populate[1] : "";
assert(
  body.includes("manageBillingCta") && body.includes("signOutCta"),
  "profile copy drives manage billing + sign out labels"
);
assert(
  body.includes("profileManageBilling.hidden = !stripePaid"),
  "populate hides portal CTA without Stripe-paid membership"
);

assert(
  js.includes('manageBillingCta: "Manage membership"') ||
    js.includes('manageBillingCta: "Gestionează membership-ul"'),
  "localized manage-billing copy present"
);
assert(
  js.includes('signOutCta: "Sign out"') ||
    js.includes('signOutCta: "Deconectare"'),
  "localized sign-out copy present"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " profile session/billing assertions");
