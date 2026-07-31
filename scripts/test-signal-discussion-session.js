/**
 * Signal discussion session — solution-oriented contributions for paying members.
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

assert(html.includes('id="detail-session"'), "session section present");
assert(
  html.includes('id="detail-session-contribute"'),
  "session contribute CTA present"
);
assert(
  html.includes('id="detail-session-compose"'),
  "session compose surface present"
);
assert(html.includes('id="detail-session-input"'), "session textarea present");
assert(
  html.includes('id="detail-session-intent"'),
  "intent fieldset present"
);
assert(
  html.includes('name="session-intent"'),
  "intent radio inputs present"
);
assert(
  !html.includes('id="detail-add-testimony"'),
  "old testimony-only CTA removed"
);
assert(
  html.includes('id="detail-testimony-input"'),
  "optional media input kept for session attach"
);

assert(js.includes("function publishSessionContribution"), "publish helper");
assert(js.includes("function openSessionCompose"), "compose open helper");
assert(js.includes("function renderSignalSession"), "session render helper");
assert(js.includes("function loadSignalDiscussionSession"), "session load helper");
assert(
  js.includes("function fetchSignalDiscussionSession"),
  "GET discussion-session helper"
);
assert(
  js.includes("function publishSignalDiscussionContribution"),
  "POST contribution helper"
);
assert(js.includes("signalSessionCache"), "session response cache present");
assert(
  js.includes("/discussion-session/contributions"),
  "contribution publish path wired"
);
assert(js.includes("intent: intent"), "publish body includes intent");
assert(js.includes("signalId: detail.id"), "scene keeps API signal UUID");

const handler = js.match(
  /detailSessionContribute\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);/
);
assert(!!handler, "session contribute handler found");
const body = handler ? handler[1] : "";
assert(body.includes("canTakeCivicAction()"), "gates on canTakeCivicAction");
assert(body.includes("openSessionCompose()"), "members open compose");
assert(body.includes("openInvite()"), "non-members keep invite");

assert(
  js.includes('sessionLabel: "Session toward a solution"'),
  "EN solution framing"
);
assert(
  js.includes('sessionLabel: "Sesiune către o soluție"'),
  "RO solution framing"
);
assert(
  js.includes("sessionBody:") &&
    js.includes("not a chat") &&
    /sessionBody:[\s\S]*?not a chat/i.test(js),
  "explicitly not framed as chat"
);
assert(
  js.includes("sessionUnavailable:") && js.includes("sessionLocalOnly:"),
  "honest fallback copy present"
);

assert(
  !/\/v1\/[^"'`\s]*(comment|testimony)/.test(js) &&
    !/uploadTestimony|multipart\/form-data/.test(js),
  "no comment/testimony upload wiring"
);

assert(css.includes("signal-detail__session"), "session styles present");
assert(css.includes("signal-detail__session-intent"), "intent styles present");
assert(css.includes("town-session-in"), "session enter motion present");

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " signal discussion session assertions");
