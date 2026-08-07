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

console.log("OK: community-commitment helper tests passed");
