/** Hungarian public/member localization contract. */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const i18n = require(path.join(root, "public-i18n.js"));
const commitment = require(path.join(root, "community-commitment.js"));
const signals = require(path.join(root, "signal-copy.js"));

function assert(condition, message) {
  if (!condition) throw new Error("FAIL: " + message);
  console.log("OK: " + message);
}

function objectLiteral(name) {
  const marker = "const " + name + " =";
  const markerAt = source.indexOf(marker);
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
    if (char === '"' || char === "'" || char === "`") quote = char;
    else if (char === "{") depth += 1;
    else if (char === "}" && --depth === 0) {
      return vm.runInNewContext("(" + source.slice(start, i + 1) + ")");
    }
  }
  throw new Error("FAIL: unterminated " + name);
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

const installerStart = source.indexOf("CITY_COPY.fr =");
const installerEnd = source.indexOf("\n  let activityItemsCache", installerStart);
vm.runInNewContext(source.slice(installerStart, installerEnd), context);

for (const name of names) {
  if (name === "WRONG_COMMUNITY_COPY") {
    assert(typeof context[name].hu === "string", name + ".hu exists");
    continue;
  }
  const catalog = context[name];
  const base = catalog.en || catalog.it;
  assert(catalog.hu && typeof catalog.hu === "object", name + ".hu exists");
  const missing = Object.keys(base).filter((key) => !(key in catalog.hu));
  assert(missing.length === 0, name + ".hu covers every base key");
}

assert(i18n.resolveReadingLanguage(["hu-HU"]) === "hu", "hu-HU resolves to Hungarian");
assert(i18n.resolveReadingLanguage(["hu"]) === "hu", "hu resolves to Hungarian");
assert(i18n.sourceLanguageForCity("Budapest") === "hu", "Budapest source is Hungarian");
assert(i18n.sourceLanguageForCity("Marseille") === "fr", "Marseille source is French");
assert(commitment.countryForCityId("Budapest") === "Hungary", "language never replaces Hungary selection");
assert(commitment.countryForCityId("Marseille") === "France", "language never replaces France selection");
assert(
  /function membershipLang\(\) \{[\s\S]*?return resolvePublicReadingLanguage\(\);[\s\S]*?\n  \}/.test(source),
  "member journey keeps the browser language, including Hungarian"
);
for (const id of signals.allSignalIds()) {
  assert(signals.hasCompleteLocale(id, "hu"), id + " has complete Hungarian signal copy");
}

console.log("HUNGARIAN LOCALIZATION TESTS PASSED");
