/** Spanish public/member localization contract — Pilot Madrid. */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const i18n = require(path.join(root, "public-i18n.js"));
const commitment = require(path.join(root, "community-commitment.js"));

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

function evalAssignment(name, lang, context) {
  const marker = name + "." + lang + " =";
  const at = source.indexOf(marker);
  assert(at >= 0, marker + " exists");
  let i = at + marker.length;
  while (i < source.length && /\s/.test(source[i])) i += 1;
  const exprStart = i;
  let depth = 0;
  let quote = null;
  let escaped = false;
  let started = false;
  for (; i < source.length; i += 1) {
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
    if (char === "(" || char === "{" || char === "[") {
      depth += 1;
      started = true;
    } else if (char === ")" || char === "}" || char === "]") {
      depth -= 1;
    } else if (char === ";" && started && depth === 0) {
      context[name][lang] = vm.runInNewContext(
        "(" + source.slice(exprStart, i) + ")",
        context
      );
      return;
    }
  }
  throw new Error("FAIL: could not evaluate " + marker);
}

const names = [
  "CITY_COPY",
  "LOCATION_COPY",
  "FEED_COPY",
  "MEMBERSHIP_COPY",
  "ACCOUNT_COPY",
  "EMAIL_COPY",
  "CODE_COPY",
  "PASSKEY_COPY",
  "READY_COPY",
  "PAYMENT_COPY",
  "ACTIVE_COPY",
  "COMMITMENT_COPY",
  "LOGIN_COPY",
  "PROFILE_COPY",
  "CIVIC_PROCESS_COPY",
  "SIGNAL_CREATE_COPY",
  "ACTIVITY_COPY",
  "WRONG_COMMUNITY_COPY",
];
const context = {};
for (const name of names) context[name] = objectLiteral(name);

// ONBOARDING city name aliases used by EN/ES installers.
context.ONBOARDING_CITY_NAMES = context.CITY_COPY.en.cityNames;
context.ONBOARDING_CITY_NAMES_ES = context.CITY_COPY.es.cityNames;

for (const name of [
  "MEMBERSHIP_COPY",
  "ACCOUNT_COPY",
  "EMAIL_COPY",
  "CODE_COPY",
  "PASSKEY_COPY",
  "READY_COPY",
  "PAYMENT_COPY",
  "ACTIVE_COPY",
  "COMMITMENT_COPY",
]) {
  evalAssignment(name, "en", context);
  evalAssignment(name, "es", context);
}

evalAssignment("PROFILE_COPY", "es", context);
evalAssignment("SIGNAL_CREATE_COPY", "es", context);
evalAssignment("ACTIVITY_COPY", "es", context);

// Apply EXPANDED_CITY_NAMES_BY_LANG like the app.
const expandedStart = source.indexOf("const EXPANDED_CITY_NAMES_BY_LANG =");
assert(expandedStart >= 0, "expanded city names exist");
const expandedLiteralStart = source.indexOf("{", expandedStart);
let depth = 0;
let quote = null;
let escaped = false;
let expandedLiteralEnd = -1;
for (let i = expandedLiteralStart; i < source.length; i += 1) {
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
    expandedLiteralEnd = i;
    break;
  }
}
context.EXPANDED_CITY_NAMES_BY_LANG = vm.runInNewContext(
  "(" + source.slice(expandedLiteralStart, expandedLiteralEnd + 1) + ")"
);
[
  "CITY_COPY",
  "LOCATION_COPY",
  "FEED_COPY",
  "MEMBERSHIP_COPY",
  "ACCOUNT_COPY",
  "EMAIL_COPY",
  "CODE_COPY",
  "PASSKEY_COPY",
  "READY_COPY",
  "PAYMENT_COPY",
  "ACTIVE_COPY",
  "COMMITMENT_COPY",
].forEach(function (name) {
  const catalog = context[name];
  Object.keys(context.EXPANDED_CITY_NAMES_BY_LANG).forEach(function (lang) {
    if (catalog[lang] && catalog[lang].cityNames) {
      Object.assign(
        catalog[lang].cityNames,
        context.EXPANDED_CITY_NAMES_BY_LANG[lang]
      );
    }
  });
});

function sameTopLevelKeys(base, translated, name) {
  const missing = Object.keys(base).filter((key) => !(key in translated));
  assert(
    missing.length === 0,
    name + ".es covers every base key" + (missing.length ? " (" + missing.join(",") + ")" : "")
  );
}

for (const name of names) {
  if (name === "WRONG_COMMUNITY_COPY") {
    assert(typeof context[name].es === "string", name + ".es exists");
    continue;
  }
  const catalog = context[name];
  const base = catalog.en || catalog.it;
  assert(catalog.es && typeof catalog.es === "object", name + ".es exists");
  sameTopLevelKeys(base, catalog.es, name);
}

assert(i18n.resolveReadingLanguage(["es-ES", "es"]) === "es", "es-ES resolves to Spanish");
assert(i18n.resolveReadingLanguage(["es"]) === "es", "es resolves to Spanish");
assert(i18n.sourceLanguageForCity("Madrid") === "es", "Madrid source language is Spanish");
assert(commitment.countryForCityId("Madrid") === "Spain", "Madrid maps to Spain");
assert(
  context.CITY_COPY.es.cityNames.Madrid === "Madrid",
  "Spanish cityNames include Madrid"
);
assert(
  context.CITY_COPY.es.context.Spain === "País: España",
  "Spanish city context labels Spain"
);
assert(
  context.PROFILE_COPY.es.feedCta === "Volver al feed",
  "PROFILE_COPY.es includes feedCta"
);
assert(
  /señal/i.test(context.SIGNAL_CREATE_COPY.es.title),
  "signal create uses señal terminology"
);
assert(
  /function membershipCatalog\(catalog\) \{[\s\S]*?catalog\[lang\] \|\| catalog\.en \|\| catalog\.it/.test(
    source
  ),
  "membershipCatalog falls back en then it"
);
assert(
  !/\w+_COPY\[membershipLang\(\)\]/.test(source),
  "no bare COPY[membershipLang()] lookups remain"
);
assert(
  /function membershipLang\(\) \{[\s\S]*?return resolvePublicReadingLanguage\(\);[\s\S]*?\n  \}/.test(
    source
  ),
  "member journey keeps the browser language, including Spanish"
);

const country = i18n.countryCopy("es");
assert(country.countries.Spain === "España", "public-i18n country Spain is Spanish");
const chrome = i18n.feedChromeCopy("es");
assert(chrome.cityNames.Madrid === "Madrid", "feed chrome Spanish cityNames include Madrid");
assert(chrome.cityNames.Malaga === "Málaga", "feed chrome uses Spanish Malaga accent");

console.log("SPANISH LOCALIZATION TESTS PASSED");
