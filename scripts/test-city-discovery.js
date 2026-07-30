/**
 * Deterministic tests for city-discovery editorial helpers.
 */
"use strict";

const path = require("path");
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
  const ok = Object.is(actual, expected);
  assert(
    ok,
    message +
      " (expected " +
      JSON.stringify(expected) +
      ", got " +
      JSON.stringify(actual) +
      ")"
  );
}

const baseSignals = [
  { id: "milano-signal-1" },
  { id: "milano-signal-2" },
  { id: "milano-signal-3" },
  { id: "munich-signal-1" },
  { id: "munich-signal-2" },
  { id: "munich-signal-3" },
  { id: "arad-signal-1" },
  { id: "arad-signal-2" },
  { id: "arad-signal-3" },
];

const story = discovery.createCityDiscoveryStory("en");
const sequence = discovery.insertCityDiscoveryStory(baseSignals, story, 5);

assertEqual(sequence.length, 10, "sequence has five signals + editorial + four remaining");
assertEqual(sequence[0].id, "milano-signal-1", "signal 1 preserved");
assertEqual(sequence[4].id, "munich-signal-2", "signal 5 preserved");
assert(
  discovery.isCityDiscoveryStory(sequence[5]),
  "editorial appears after exactly five signals"
);
assertEqual(sequence[6].id, "munich-signal-3", "original sixth signal follows editorial");
assertEqual(sequence[9].id, "arad-signal-3", "final signal preserved");

const early = discovery.insertCityDiscoveryStory(baseSignals.slice(0, 3), story, 5);
assertEqual(early.length, 4, "editorial appends when fewer than five signals exist");
assert(discovery.isCityDiscoveryStory(early[3]), "editorial is last when short feed");

for (let i = 0; i < 5; i++) {
  assert(
    !discovery.isCityDiscoveryStory(sequence[i]),
    "editorial does not appear at index " + i
  );
}

assertEqual(
  discovery.resolveEditorialLanguage(["es-ES", "en"]),
  "es",
  "es-ES resolves to Spanish"
);
assertEqual(
  discovery.resolveEditorialLanguage(["ro-RO"]),
  "ro",
  "ro-RO resolves to Romanian"
);
assertEqual(
  discovery.resolveEditorialLanguage(["it-IT"]),
  "it",
  "it-IT resolves to Italian"
);
assertEqual(
  discovery.resolveEditorialLanguage(["de-DE"]),
  "de",
  "de-DE resolves to German"
);
assertEqual(
  discovery.resolveEditorialLanguage(["en-GB"]),
  "en",
  "en-GB resolves to English"
);
assertEqual(
  discovery.resolveEditorialLanguage(["fr-FR", "ja"]),
  "en",
  "unsupported locale resolves to English"
);
assertEqual(
  discovery.resolveEditorialLanguage([]),
  "en",
  "empty preferences resolve to English"
);
assertEqual(
  discovery.resolveEditorialLanguage(null),
  "en",
  "null preferences resolve to English"
);

assertEqual(
  discovery.editorialCopyForLanguage("es").primary,
  "Encontrar mi ciudad",
  "Spanish primary CTA copy"
);
assertEqual(
  discovery.editorialCopyForLanguage("ro").secondary,
  "Continuă explorarea",
  "Romanian secondary CTA copy"
);

const state = {
  selectedCountry: "Italy",
  selectedCity: "Milano",
  locationVerified: true,
  membershipSimulated: false,
  eligibility: "inside",
};
const resolved = discovery.resolveLocaleWithoutSideEffects(["de-DE"], state);
assertEqual(resolved.lang, "de", "locale resolves independently");
assertEqual(resolved.selectedCountry, "Italy", "locale does not mutate country");
assertEqual(resolved.selectedCity, "Milano", "locale does not mutate city");
assertEqual(resolved.locationVerified, true, "locale does not mutate eligibility flag");
assertEqual(
  resolved.membershipSimulated,
  false,
  "locale does not mutate membership"
);
assertEqual(resolved.eligibility, "inside", "locale does not mutate eligibility");

const again = discovery.insertCityDiscoveryStory(sequence, story, 5);
assertEqual(again.length, 10, "insertion is idempotent");
assert(discovery.isCityDiscoveryStory(again[5]), "idempotent insert keeps editorial slot");

const continueIndex = discovery.CITY_DISCOVERY_INSERT_AFTER + 1;
assertEqual(
  sequence[continueIndex].id,
  "munich-signal-3",
  "Continue exploring target is original sixth signal"
);

const prevIndex = discovery.CITY_DISCOVERY_INSERT_AFTER - 1;
assertEqual(
  sequence[prevIndex].id,
  "munich-signal-2",
  "backward navigation neighbor before editorial is fifth signal"
);

assertEqual(
  discovery.normalizeLanguageTag("ES-es"),
  "es",
  "normalizes language tags deterministically"
);
assertEqual(
  discovery.normalizeLanguageTag("@@@"),
  null,
  "rejects unsafe locale tags"
);

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed) process.exit(1);
