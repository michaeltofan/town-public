/** Madrid pilot first-visit intro — structural contract. */
"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function ok(condition, message) {
  assert.ok(condition, message);
  console.log("OK:", message);
}

ok(html.includes('id="madrid-pilot-intro"'), "intro markup exists");
ok(html.includes('id="madrid-pilot-intro-continue"'), "intro continue button exists");
ok(html.includes("script.js?v=madrid-es-3"), "cache key bumped for intro ship");
ok(css.includes("invite--madrid-intro"), "intro styles exist");
ok(js.includes('MADRID_PILOT_INTRO_STORAGE_KEY = "town.madridPilotIntro.dismissed.v1"'), "dismissal key is versioned");
ok(js.includes("function maybeShowMadridPilotIntro"), "show helper exists");
ok(js.includes("function dismissMadridPilotIntro"), "dismiss helper exists");
ok(js.includes("dismissMadridPilotIntro();"), "openSignalDetail dismisses intro");
ok(js.includes("maybeShowMadridPilotIntro();"), "feed view may show intro");
ok(
  js.includes("TOWN no es TikTok ni Facebook."),
  "Spanish framing copy present"
);
ok(
  js.includes("TOWN no responde por desviaciones de conducta"),
  "individual responsibility disclaimer present"
);
ok(
  js.includes("openMadridPilotIntroFirstSignal"),
  "CTA opens first signal after dismiss"
);
ok(
  /madridPilotIntro\s*&&\s*!madridPilotIntro\.hidden/.test(js) ||
    js.includes("(madridPilotIntro && !madridPilotIntro.hidden)"),
  "intro participates in feed overlay lock"
);

console.log("PASSED: madrid pilot intro assertions");
