/** French public/member localization contract. */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const i18n = require(path.join(root, "public-i18n.js"));
const signals = require(path.join(root, "signal-copy.js"));

function assert(condition, message) {
  if (!condition) throw new Error("FAIL: " + message);
  console.log("OK: " + message);
}

function objectLiteral(name) {
  const marker = "const " + name + " =";
  const markerAt = source.indexOf(marker);
  assert(markerAt >= 0, name + " catalog exists");
  const start = source.indexOf("{", markerAt + marker.length);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}" && --depth === 0) {
      return vm.runInNewContext("(" + source.slice(start, i + 1) + ")");
    }
  }
  throw new Error("FAIL: unterminated " + name + " catalog");
}

const names = [
  "CITY_COPY", "LOCATION_COPY", "FEED_COPY", "MEMBERSHIP_COPY",
  "ACCOUNT_COPY", "EMAIL_COPY", "CODE_COPY", "PASSKEY_COPY", "READY_COPY",
  "PAYMENT_COPY", "ACTIVE_COPY", "COMMITMENT_COPY", "LOGIN_COPY",
  "PROFILE_COPY", "CIVIC_PROCESS_COPY", "SIGNAL_CREATE_COPY", "ACTIVITY_COPY",
  "WRONG_COMMUNITY_COPY",
];
const context = {};
for (const name of names) context[name] = objectLiteral(name);

const frenchStart = source.indexOf("CITY_COPY.fr =");
const frenchEnd = source.indexOf("\n  let activityItemsCache", frenchStart);
assert(frenchStart >= 0 && frenchEnd > frenchStart, "French catalog installer exists");
vm.runInNewContext(source.slice(frenchStart, frenchEnd), context);

function sameTopLevelKeys(base, translated, name) {
  const missing = Object.keys(base).filter((key) => !(key in translated));
  assert(missing.length === 0, name + ".fr covers every base key");
}

for (const name of names) {
  if (name === "WRONG_COMMUNITY_COPY") {
    assert(typeof context[name].fr === "string", name + ".fr exists");
    continue;
  }
  const catalog = context[name];
  const base = catalog.en || catalog.it;
  assert(catalog.fr && typeof catalog.fr === "object", name + ".fr exists");
  sameTopLevelKeys(base, catalog.fr, name);
}

assert(i18n.resolveReadingLanguage(["fr-FR"]) === "fr", "fr-FR resolves to French");
assert(i18n.resolveReadingLanguage(["fr-CA"]) === "fr", "all fr-* tags resolve to French");
for (const id of signals.allSignalIds()) {
  assert(signals.hasCompleteLocale(id, "fr"), id + " has complete French signal copy");
}
assert(
  source.includes('if (resolvePublicReadingLanguage() === "fr") return "fr";'),
  "member journey keeps French browser copy"
);

console.log("FRENCH LOCALIZATION TESTS PASSED");
