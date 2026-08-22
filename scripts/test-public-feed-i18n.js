/**
 * Public feed browser-language localization tests.
 */
"use strict";

const path = require("path");
const i18n = require(path.join(__dirname, "..", "public-i18n.js"));
const signals = require(path.join(__dirname, "..", "signal-copy.js"));
const discovery = require(path.join(__dirname, "..", "city-discovery.js"));

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

function assertEqual(actual, expected, message) {
  assert(
    Object.is(actual, expected),
    message +
      " (expected " +
      JSON.stringify(expected) +
      ", got " +
      JSON.stringify(actual) +
      ")"
  );
}

const langs = ["es", "fr", "en", "it", "de", "ro"];
const ids = [
  "milano-signal-1",
  "milano-signal-2",
  "milano-signal-3",
  "munich-signal-1",
  "munich-signal-2",
  "munich-signal-3",
  "arad-signal-1",
  "arad-signal-2",
  "arad-signal-3",
];

assertEqual(i18n.resolveReadingLanguage(["es-ES"]), "es", "es-ES → Spanish");
assertEqual(i18n.resolveReadingLanguage(["en-GB"]), "en", "en-GB → English");
assertEqual(i18n.resolveReadingLanguage(["it-IT"]), "it", "it-IT → Italian");
assertEqual(i18n.resolveReadingLanguage(["de-DE"]), "de", "de-DE → German");
assertEqual(i18n.resolveReadingLanguage(["ro-RO"]), "ro", "ro-RO → Romanian");
assertEqual(
  i18n.resolveReadingLanguage(["fr-FR"]),
  "fr",
  "fr-FR → French"
);
assertEqual(i18n.resolveReadingLanguage(["@@@"]), "en", "malformed → English");
assertEqual(i18n.resolveReadingLanguage(null), "en", "absent → English");
// Discovery resolver must agree with the shared public reading-language rules.
assertEqual(
  discovery.resolveEditorialLanguage(["es-ES"]),
  "es",
  "discovery resolver agrees on es-ES"
);
assertEqual(
  discovery.resolveEditorialLanguage(["fr-CA"]),
  "fr",
  "discovery resolver agrees on fr-CA"
);

assertEqual(ids.length, 9, "nine public signal IDs");
assertEqual(signals.allSignalIds().length, 9, "signal catalog has nine IDs");

for (let i = 0; i < ids.length; i++) {
  assertEqual(signals.allSignalIds()[i], ids[i], "signal order " + ids[i]);
}

for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  for (let j = 0; j < langs.length; j++) {
    const lang = langs[j];
    assert(
      signals.hasCompleteLocale(id, lang),
      id + " complete in " + lang
    );
  }
}

const base = ids.map(function (id) {
  return { id: id, headline: "source" };
});
const story = discovery.createCityDiscoveryStory("es");
const sequence = discovery.insertCityDiscoveryStory(base, story, 5);
assertEqual(sequence.length, 10, "sequence length with editorial");
assert(
  discovery.isCityDiscoveryStory(sequence[5]),
  "story 6 is editorial city-discovery"
);
assertEqual(sequence[6].id, "munich-signal-3", "story 7 is original sixth signal");

const milanoEs = signals.localizeSignal(
  { id: "milano-signal-1", authorName: "Marta Rinaldi", image: "x.jpg" },
  "es",
  i18n
);
assert(
  milanoEs.headline.indexOf("Acera") !== -1 ||
    milanoEs.headline.indexOf("acera") !== -1 ||
    milanoEs.headline.indexOf("Padova") !== -1,
  "Spanish Milano signal has localized headline"
);
assertEqual(milanoEs.sourceLang, "it", "Milano keeps Italian source language");
assertEqual(milanoEs.cityId, "Milano", "Milano city identity preserved");
assert(
  milanoEs.sourceLanguageLabel.indexOf("italiano") !== -1,
  "Spanish reading shows original-in-Italian label"
);

const munichEs = signals.localizeSignal(
  { id: "munich-signal-1", authorName: "Anna Weber" },
  "es",
  i18n
);
assertEqual(munichEs.sourceLang, "de", "Munich keeps German source language");
assertEqual(munichEs.cityId, "Munich", "Munich city identity preserved");

const aradEs = signals.localizeSignal(
  { id: "arad-signal-1", authorName: "Redacția TOWN Arad" },
  "es",
  i18n
);
assertEqual(aradEs.sourceLang, "ro", "Arad keeps Romanian source language");
assertEqual(aradEs.cityId, "Arad", "Arad city identity preserved");

// Missing nested field falls back to English without throwing.
const broken = {
  id: "milano-signal-1",
  sourceLang: "it",
  cityId: "Milano",
  en: signals.SIGNAL_COPY["milano-signal-1"].en,
  es: Object.assign({}, signals.SIGNAL_COPY["milano-signal-1"].es, {
    headline: "",
  }),
};
signals.SIGNAL_COPY["milano-signal-1-test"] = broken;
const fallback = signals.localizeSignal(
  { id: "milano-signal-1-test" },
  "es",
  i18n
);
assertEqual(
  fallback.headline,
  signals.SIGNAL_COPY["milano-signal-1"].en.headline,
  "empty nested Spanish field falls back to English"
);
delete signals.SIGNAL_COPY["milano-signal-1-test"];

const chromeEs = i18n.feedChromeCopy("es");
assertEqual(chromeEs.openSignal, "Abrir señal", "Spanish feed chrome");
assertEqual(
  chromeEs.confirmCount,
  "{count} confirmaciones",
  "Spanish feed chrome localizes confirmation count"
);
assertEqual(
  chromeEs.confirmCountOne,
  "1 confirmación",
  "Spanish feed chrome localizes single confirmation"
);
const chromeFr = i18n.feedChromeCopy("fr");
assertEqual(chromeFr.openSignal, "Ouvrir le signalement", "French feed chrome");
assertEqual(
  chromeFr.confirmCount,
  "{count} confirmations",
  "French feed chrome localizes confirmation count"
);

const state = {
  selectedCountry: "Italy",
  selectedCity: "Milano",
  locationVerified: true,
  membershipSimulated: true,
  eligibility: "inside",
  sessionAuthenticated: true,
};
const resolved = i18n.resolveLocaleWithoutSideEffects(["es-ES"], state);
assertEqual(resolved.lang, "es", "locale resolves");
assertEqual(resolved.selectedCountry, "Italy", "no country mutation");
assertEqual(resolved.selectedCity, "Milano", "no city mutation");
assertEqual(resolved.locationVerified, true, "no eligibility mutation");
assertEqual(resolved.membershipSimulated, true, "no membership mutation");
assertEqual(
  resolved.sessionAuthenticated,
  true,
  "no authentication mutation"
);

for (let j = 0; j < langs.length; j++) {
  const lang = langs[j];
  const chrome = i18n.feedChromeCopy(lang);
  assert(!!chrome.visitor, "visitor chrome present for " + lang);
  assert(!!chrome.openSignal, "openSignal chrome present for " + lang);
  assert(!!chrome.seeThisToo, "seeThisToo chrome present for " + lang);
  assert(!!chrome.confirmCount, "confirmCount chrome present for " + lang);
  assert(!!chrome.confirmCountOne, "confirmCountOne chrome present for " + lang);
  assert(!!chrome.chatWelcomeTitle, "chatWelcomeTitle present for " + lang);
  assert(
    String(chrome.chatWelcomeLinkLabel || "").indexOf("datos.madrid.es") !== -1,
    "chat welcome link mentions Madrid open data for " + lang
  );
  assert(
    String(chrome.visitor).indexOf("undefined") === -1,
    "no undefined visitor for " + lang
  );
}

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed) process.exit(1);
