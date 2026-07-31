/**
 * Optional session media attach gated by canParticipate; uploads via discussion-session/media.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

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
  fs.existsSync(path.join(root, "mock/member-signal-detail.html")),
  "member-signal-detail mock restored"
);
assert(
  fs.existsSync(path.join(root, "mock/member-testimony-capture.html")),
  "member-testimony-capture mock restored"
);
assert(
  fs.readFileSync(path.join(root, "mock/member-testimony-capture.html"), "utf8")
    .includes("Registra un video"),
  "capture mock still includes video choice"
);
assert(
  fs.readFileSync(path.join(root, "mock/member-signal-detail.html"), "utf8")
    .includes("Testimonianze dei membri"),
  "member detail mock still includes testimonies section"
);

assert(html.includes('id="detail-testimony-input"'), "file input restored");
assert(
  html.includes('accept="image/jpeg,image/png,image/webp,video/mp4"'),
  "accepts allowed photo and video types"
);
assert(html.includes('id="detail-testimony-preview"'), "preview restored");
assert(
  html.includes('id="detail-session-attach"'),
  "session attach control present"
);

assert(
  js.includes("function openMemberDemoTestimonyCapture"),
  "member capture helper exists"
);
assert(js.includes("function clearDemoTestimony"), "clearDemoTestimony restored");
assert(js.includes("function renderDemoTestimony"), "renderDemoTestimony restored");
assert(js.includes("URL.createObjectURL"), "local object URL preview restored");

const handler = js.match(
  /detailSessionAttach\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);/
);
assert(!!handler, "session attach handler found");
const body = handler ? handler[1] : "";
assert(body.includes("canTakeCivicAction()"), "attach gates on canTakeCivicAction");
assert(
  body.includes("openMemberDemoTestimonyCapture()"),
  "participating path opens demo capture"
);
assert(body.includes("openInvite()"), "non-participating path keeps invite");

assert(
  js.includes("function uploadSignalDiscussionMedia"),
  "secure media upload helper present"
);
assert(
  js.includes("/discussion-session/media"),
  "discussion media upload path wired"
);
assert(
  !/\/v1\/.+testimony|FormData\(|uploadTestimony|multipart\/form-data/.test(js),
  "capture does not use testimony/multipart upload paths"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " member-capture canParticipate assertions");
