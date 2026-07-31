/**
 * Focused regression: I SEE THIS TOO stays active for visitor, registered,
 * and paying-member presentations (unless already confirmed on that signal).
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

function sliceHandler(startNeedle, endNeedle) {
  const start = js.indexOf(startNeedle);
  const end = js.indexOf(endNeedle, start + 1);
  assert(start >= 0 && end > start, "locate " + startNeedle);
  return start >= 0 && end > start ? js.slice(start, end) : "";
}

const panelMatch = js.match(
  /function syncPanelMemberControls\([\s\S]*?\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!panelMatch, "syncPanelMemberControls body readable");
const panel = panelMatch ? panelMatch[1] : "";
assert(panel.includes("onConfirmed"), "feed panel still supports confirmed done-state");
assert(
  !/else if\s*\(\s*memberPresented\s*\)\s*\{[\s\S]*?seeToo\.hidden\s*=\s*true/.test(
    panel
  ),
  "feed panel does not hide see-too solely because member is presented"
);
assert(
  panel.includes("seeToo.hidden = false") &&
    panel.includes("seeToo.disabled = false"),
  "feed panel keeps see-too visible and enabled when not confirmed"
);
assert(
  panel.includes("feed-confirm-count") || panel.includes("confirmCountEl"),
  "feed panel wires confirmation count label"
);

const detailGateIdx = js.indexOf(
  "applyConfirmCountLabel(\n      detailConfirmCount,"
);
assert(detailGateIdx >= 0, "signal-detail see-too gate located");
const detailGate = js.slice(detailGateIdx, detailGateIdx + 550);
assert(
  detailGate.includes("if (onConfirmed)") &&
    detailGate.includes("detailSeeToo.hidden = false") &&
    !detailGate.includes("else if (memberPresented)"),
  "signal detail does not hide see-too solely because member is presented"
);
assert(
  detailGate.includes("detailSeeToo.disabled = false"),
  "signal detail keeps see-too visible and enabled when not confirmed"
);

assert(
  js.includes("function canConfirmSeeTooAction"),
  "canConfirmSeeTooAction helper exists"
);
assert(
  js.includes("async function activateSeeTooAction"),
  "activateSeeTooAction helper exists"
);
assert(
  js.includes("function putJsonWithCredentials"),
  "credentialed PUT helper exists"
);
assert(
  js.includes("/confirmation"),
  "confirmation API path wired"
);
assert(
  js.includes("signalConfirmationState"),
  "per-signal confirmation state store present"
);
assert(
  js.includes("refreshViewerSignalConfirmations"),
  "refresh helper restores confirmations after reload"
);

const confirmMatch = js.match(
  /function canConfirmSeeTooAction\(\)\s*\{([\s\S]*?)\n  \}/
);
const confirm = confirmMatch ? confirmMatch[1] : "";
assert(
  confirm.includes("canTakeCivicAction") &&
    confirm.includes("membershipSimulated"),
  "confirm eligibility uses civic participation / prototype simulate gate"
);

const activateMatch = js.match(
  /async function activateSeeTooAction\(options\)\s*\{([\s\S]*?)\n  \}/
);
assert(!!activateMatch, "activateSeeTooAction body readable");
const activate = activateMatch ? activateMatch[1] : "";
assert(
  activate.includes("canConfirmSeeTooAction") &&
    activate.includes("putJsonWithCredentials"),
  "eligible members persist see-too via confirmation PUT"
);
assert(
  activate.includes("openInvite()"),
  "non-eligible roles still open the membership invite boundary"
);
assert(
  !activate.includes("membershipSimulated = true"),
  "activation does not auto-activate membership"
);

assert(html.includes('id="feed-confirm-count"'), "feed count element present");
assert(html.includes('id="detail-confirm-count"'), "detail count element present");
assert(
  js.includes('doneNote: "Confirmation saved on TOWN"'),
  "done note no longer claims prototype-only persistence"
);

const feedSeeToo = sliceHandler(
  'if (role === "feed-see-too")',
  'if (role === "feed-open-signal")'
);
assert(
  feedSeeToo.includes("activateSeeTooAction"),
  "feed see-too uses shared activation helper"
);
assert(
  !feedSeeToo.includes("isMemberPresented()"),
  "feed see-too is not blocked for presented members"
);

const detailSeeToo = sliceHandler(
  'detailSeeToo.addEventListener("click"',
  'detailSessionContribute.addEventListener("click"'
);
assert(
  detailSeeToo.includes("activateSeeTooAction"),
  "detail see-too uses shared activation helper"
);
assert(
  !detailSeeToo.includes("isMemberPresented()"),
  "detail see-too is not blocked for presented members"
);

if (failed > 0) {
  console.error("FAILED: " + failed + " assertion(s); passed " + passed);
  process.exit(1);
}
console.log("PASSED: " + passed + " see-too active-all-roles assertions");
