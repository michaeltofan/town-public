"use strict";

const path = require("path");
const assert = require("assert");
const commitment = require(path.join(__dirname, "..", "community-commitment.js"));

function assertEqual(actual, expected, message) {
  assert.strictEqual(actual, expected, message);
}

function assertOk(value, message) {
  assert.ok(value, message);
}

// 1. Country required before city
assertEqual(commitment.canSelectCity(null), false, "null country blocks city");
assertEqual(commitment.canSelectCity(""), false, "empty country blocks city");
assertOk(commitment.canSelectCity("Italy"), "Italy unlocks city");
assertEqual(
  commitment.isCityValidForCountry("Italy", "Munich"),
  false,
  "city must match country"
);
assertOk(
  commitment.isCityValidForCountry("Italy", "Milano"),
  "Milano valid for Italy"
);

// 2. Browser language does not choose country/city — helper has no language API
assertEqual(
  typeof commitment.resolveReadingLanguage,
  "undefined",
  "no language→country inference"
);

// 3. City selection alone does not count as acceptance
assertEqual(
  commitment.citySelectionCountsAsAcceptance(),
  false,
  "city alone is never acceptance"
);

// 4/5. Checkout unavailable before recorded commitment
assertEqual(
  commitment.checkoutAvailable(null),
  false,
  "null snapshot blocks checkout"
);
assertEqual(
  commitment.checkoutAvailable({
    status: "none",
    accepted: false,
    community: null,
  }),
  false,
  "none status blocks checkout"
);

// 6. Changing country/city invalidates on-screen acceptance
assertOk(
  commitment.shouldInvalidateAcceptance("Italy", "Milano", "Germany", "Milano"),
  "country change invalidates"
);
assertOk(
  commitment.shouldInvalidateAcceptance("Italy", "Milano", "Italy", "Munich"),
  "city change invalidates"
);
assertEqual(
  commitment.shouldInvalidateAcceptance("Italy", "Milano", "Italy", "Milano"),
  false,
  "same selection keeps acceptance"
);

// 7/9. Valid acceptance payload derivation
const recorded = commitment.deriveCommitmentSnapshot({
  data: {
    status: "recorded",
    accepted: true,
    acceptedAt: "2026-07-30T12:00:00.000Z",
    commitmentVersion: "community-commitment-v1",
    editable: true,
    community: {
      slug: "milano-it",
      displayName: "Milano",
      cityName: "Milano",
      countryCode: "IT",
    },
  },
});
assertOk(commitment.hasRecordedCommitment(recorded), "recorded snapshot valid");
assertOk(commitment.checkoutAvailable(recorded), "checkout available after record");
assertEqual(
  commitment.countryFromCommitment(recorded),
  "Italy",
  "restore country from backend"
);
assertEqual(
  commitment.cityIdFromCommitment(recorded),
  "Milano",
  "restore city from backend"
);

// 12. Local simulated state cannot manufacture acceptance
assertEqual(
  commitment.localStateGrantsCommitment(true),
  false,
  "local marker never grants"
);
assertEqual(
  commitment.localStateGrantsCommitment("1"),
  false,
  "string marker never grants"
);

// 13. Community association without acceptance → none
const none = commitment.deriveCommitmentSnapshot({
  data: {
    status: "none",
    accepted: false,
    acceptedAt: null,
    commitmentVersion: null,
    editable: true,
    community: null,
  },
});
assertEqual(commitment.hasRecordedCommitment(none), false, "none is not recorded");

// Slug mapping for authenticated PUT body
assertEqual(commitment.slugForCityId("Milano"), "milano-it");
assertEqual(commitment.slugForCityId("Munich"), "munich-de");
assertEqual(commitment.slugForCityId("Arad"), "arad-ro");
assertEqual(commitment.slugForCityId("ClujNapoca"), "cluj-napoca-ro");
assertEqual(commitment.slugForCityId("Sibiu"), "sibiu-ro");
assertEqual(commitment.slugForCityId("Iasi"), "iasi-ro");
assertEqual(commitment.slugForCityId("Timisoara"), "timisoara-ro");

// City-expansion: a country can offer more than one city, and every one of
// them must be individually valid — not just the first/original city.
const romaniaCities = commitment.citiesForCountry("Romania").map((c) => c.id);
assertEqual(
  romaniaCities.sort().join(","),
  ["Arad", "ClujNapoca", "Iasi", "Sibiu", "Timisoara"].sort().join(","),
  "Romania offers all five cities"
);
for (const cityId of ["Arad", "ClujNapoca", "Sibiu", "Iasi", "Timisoara"]) {
  assertOk(
    commitment.isCityValidForCountry("Romania", cityId),
    cityId + " valid for Romania"
  );
  assertEqual(
    commitment.countryForCityId(cityId),
    "Romania",
    cityId + " maps back to Romania"
  );
}
assertEqual(
  commitment.isCityValidForCountry("Romania", "Milano"),
  false,
  "Milano is not valid for Romania"
);

// Countries with a single city are unaffected by the multi-city change.
const italyCities = commitment.citiesForCountry("Italy").map((c) => c.id);
assertEqual(italyCities.join(","), "Milano", "Italy still offers only Milano");

// German/Austrian city-expansion: Germany gains four cities alongside
// Munich, and Austria is a genuinely new country (Salzburg is not German).
assertEqual(commitment.slugForCityId("Koln"), "koln-de");
assertEqual(commitment.slugForCityId("Dortmund"), "dortmund-de");
assertEqual(commitment.slugForCityId("Stuttgart"), "stuttgart-de");
assertEqual(commitment.slugForCityId("Frankfurt"), "frankfurt-de");
assertEqual(commitment.slugForCityId("Salzburg"), "salzburg-at");

const germanyCities = commitment.citiesForCountry("Germany").map((c) => c.id);
assertEqual(
  germanyCities.sort().join(","),
  ["Munich", "Koln", "Dortmund", "Stuttgart", "Frankfurt"].sort().join(","),
  "Germany offers all five cities"
);
for (const cityId of ["Munich", "Koln", "Dortmund", "Stuttgart", "Frankfurt"]) {
  assertOk(
    commitment.isCityValidForCountry("Germany", cityId),
    cityId + " valid for Germany"
  );
  assertEqual(
    commitment.countryForCityId(cityId),
    "Germany",
    cityId + " maps back to Germany"
  );
}

const austriaCities = commitment.citiesForCountry("Austria").map((c) => c.id);
assertEqual(austriaCities.join(","), "Salzburg", "Austria offers only Salzburg");
assertOk(
  commitment.isCityValidForCountry("Austria", "Salzburg"),
  "Salzburg valid for Austria"
);
assertEqual(
  commitment.countryForCityId("Salzburg"),
  "Austria",
  "Salzburg maps back to Austria, not Germany"
);
assertEqual(
  commitment.isCityValidForCountry("Germany", "Salzburg"),
  false,
  "Salzburg is not valid for Germany"
);

// France and Hungary are real membership countries with selectable cities.
assertEqual(commitment.slugForCityId("Marseille"), "marseille-fr");
assertEqual(commitment.slugForCityId("Lyon"), "lyon-fr");
assertEqual(commitment.slugForCityId("Toulouse"), "toulouse-fr");
assertEqual(commitment.slugForCityId("Budapest"), "budapest-hu");
assertEqual(commitment.slugForCityId("Szeged"), "szeged-hu");
assertEqual(
  commitment.citiesForCountry("France").map((c) => c.id).join(","),
  "Marseille,Lyon,Toulouse",
  "France offers Marseille, Lyon, and Toulouse"
);
assertEqual(
  commitment.citiesForCountry("Hungary").map((c) => c.id).join(","),
  "Budapest,Szeged",
  "Hungary offers Budapest and Szeged"
);
assertOk(commitment.isCityValidForCountry("France", "Marseille"));
assertOk(commitment.isCityValidForCountry("Hungary", "Budapest"));
assertEqual(commitment.isCityValidForCountry("France", "Budapest"), false);
assertEqual(commitment.isCityValidForCountry("Hungary", "Lyon"), false);

// One explicit identity contract for every production community.
assertEqual(commitment.countries().length, 6, "six selectable countries");
assertEqual(commitment.cityIds().length, 17, "seventeen selectable cities");
for (const cityId of commitment.cityIds()) {
  const city = commitment.cityForId(cityId);
  assertOk(city, cityId + " resolves from the canonical catalog");
  assertOk(city.slug, cityId + " has an API community slug");
  assertOk(city.countryCode, cityId + " has a country code");
  assertOk(city.language, cityId + " has a content language");
  assertOk(city.image, cityId + " has a city image");
  assertEqual(
    commitment.countryForCityId(cityId),
    city.country,
    cityId + " has one country authority"
  );
}

console.log("OK: community-commitment helper tests passed");
