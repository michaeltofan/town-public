"use strict";

const path = require("path");
const assert = require("assert");
const pilotHost = require(path.join(__dirname, "..", "madrid-pilot-host.js"));

function assertEqual(actual, expected, message) {
  assert.strictEqual(actual, expected, message);
}

// 1. Madrid pilot hosts resolve to the Madrid city id
assertEqual(
  pilotHost.resolvePilotCityId("madrid-staging.towncivic.org"),
  "Madrid",
  "staging pilot host resolves to Madrid"
);
assertEqual(
  pilotHost.resolvePilotCityId("madrid.towncivic.org"),
  "Madrid",
  "production pilot host resolves to Madrid"
);

// 2. Case-insensitive, trailing-dot tolerant
assertEqual(
  pilotHost.resolvePilotCityId("MADRID-STAGING.TOWNCIVIC.ORG"),
  "Madrid",
  "hostname match is case-insensitive"
);
assertEqual(
  pilotHost.resolvePilotCityId("madrid-staging.towncivic.org."),
  "Madrid",
  "trailing dot is tolerated"
);

// 3. The live site itself is never locked to Madrid
assertEqual(
  pilotHost.resolvePilotCityId("towncivic.org"),
  null,
  "apex host is not a pilot host"
);
assertEqual(
  pilotHost.resolvePilotCityId("www.towncivic.org"),
  null,
  "www host is not a pilot host"
);
assertEqual(
  pilotHost.resolvePilotCityId("staging.towncivic.org"),
  null,
  "general staging host is not a pilot host"
);

// 4. Unrelated / malformed / empty hostnames never match
assertEqual(
  pilotHost.resolvePilotCityId("evil-madrid.towncivic.org"),
  null,
  "lookalike host does not match"
);
assertEqual(
  pilotHost.resolvePilotCityId("madrid.towncivic.org.evil.com"),
  null,
  "suffix trick does not match"
);
assertEqual(pilotHost.resolvePilotCityId(""), null, "empty hostname does not match");
assertEqual(
  pilotHost.resolvePilotCityId(undefined),
  null,
  "undefined hostname does not match"
);

// 5. isMadridPilotHost mirrors resolvePilotCityId
assertEqual(
  pilotHost.isMadridPilotHost("madrid-staging.towncivic.org"),
  true,
  "isMadridPilotHost true on pilot host"
);
assertEqual(
  pilotHost.isMadridPilotHost("towncivic.org"),
  false,
  "isMadridPilotHost false on apex host"
);

console.log("PASSED: madrid-pilot-host.js assertions");
