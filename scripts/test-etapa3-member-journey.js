/**
 * Etapa 3 member journey regressions: nav destinations, feed states,
 * recovery honesty, participation feedback, and de-prototyped copy.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const i18n = fs.readFileSync(path.join(root, "public-i18n.js"), "utf8");
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

function fnBody(name) {
  const match = js.match(
    new RegExp(
      "(?:async\\s+)?function " +
        name +
        "\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n  \\}"
    )
  );
  assert(!!match, name + " body readable");
  return match ? match[1] : "";
}

assert(html.includes('id="feed-state"'), "feed loading/empty state markup present");
assert(html.includes('id="feed-state-retry"'), "feed retry control present");
assert(css.includes(".feed__state"), "feed state styles present");
assert(css.includes(".feed__live.is-surface"), "transient notice surface styles present");

assert(js.includes("function handleMembershipNav"), "membership nav handler exists");
assert(js.includes("function handleChatNav"), "chat nav honesty handler exists");
assert(
  js.includes("function continueAuthenticatedMembershipDestination"),
  "authenticated membership destination helper exists"
);
assert(
  js.includes("function showFeedSurfaceState"),
  "feed surface state helper exists"
);
assert(
  js.includes("function showTransientFeedNotice"),
  "transient feed notice helper exists"
);

const membershipNav = fnBody("handleMembershipNav");
assert(
  membershipNav.includes("sessionAuthenticated") &&
    membershipNav.includes("continueAuthenticatedMembershipDestination") &&
    membershipNav.includes('openAuthWindow(navMembership, "membership")'),
  "MEMBERSHIP nav auth-gates then continues destination"
);

const chatNav = fnBody("handleChatNav");
assert(
  chatNav.includes("chatUnavailable") &&
    !chatNav.includes("openAuthWindow") &&
    chatNav.includes("showTransientFeedNotice"),
  "CHAT nav shows unavailable notice instead of auth window"
);

const continueAuth = fnBody("continueAfterPublicPasskeySignIn");
assert(
  continueAuth.includes('openedFor === "membership"') &&
    continueAuth.includes("continueAuthenticatedMembershipDestination"),
  "post-auth membership target lands on membership destination"
);

const activate = fnBody("activateSeeTooAction");
assert(
  !activate.includes("Legacy simulate") &&
    activate.includes("showTransientFeedNotice") &&
    activate.includes("seeTooFailed"),
  "see-too fails closed with visible feedback (no local simulate confirm)"
);
assert(
  activate.includes("putJsonWithCredentials") && activate.includes("openInvite()"),
  "see-too still uses API confirm + invite boundary"
);

assert(
  js.includes('note: "gated"') && js.includes("sessionGated:"),
  "gated discussion session explains membership requirement"
);
assert(
  js.includes("activityError:") &&
    js.includes("copy.activityError || copy.activityEmpty"),
  "profile activity distinguishes load error from empty"
);
assert(
  js.includes("phoneUnavailable") &&
    js.includes('authChannel === "phone"') &&
    js.includes("showAuthWindowStatus"),
  "phone auth channel surfaces an unavailable message"
);
assert(
  js.includes('data-recovery-action", "community"') &&
    js.includes("continueCommunity"),
  "paid-no-participate recovery offers community continuation"
);
assert(
  js.includes('showFeedSurfaceState("loading")') &&
    js.includes('showFeedSurfaceState("empty")'),
  "product feed boot uses loading and empty states"
);

assert(
  !/Confirmation recorded in the prototype/i.test(i18n) &&
    i18n.includes('doneNote: "Confirmation saved on TOWN"'),
  "i18n doneNote no longer claims prototype persistence"
);
assert(
  !/nur Prototyp|doar prototip|solo prototipo/i.test(js),
  "READY/ACCOUNT copy no longer ships stop-ship prototype phrases"
);
assert(
  js.includes('navMembership.addEventListener("click"') &&
    js.includes("handleMembershipNav()"),
  "MEMBERSHIP click wires handleMembershipNav"
);
assert(
  js.includes('navChat.addEventListener("click"') &&
    js.includes("handleChatNav()"),
  "CHAT click wires handleChatNav"
);
assert(
  js.includes('feedStateRetry.addEventListener("click"') &&
    js.includes("loadProductOnlyLiveFeed"),
  "feed retry reloads live signals"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " Etapa 3 member journey assertions");
