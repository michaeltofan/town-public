/**
 * Owner participate preview must stay removed from the live product path.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(!js.includes("PARTICIPATE_PREVIEW"), "preview storage/query constants removed");
assert(
  !js.includes("townParticipatePreview"),
  "preview query param removed"
);
assert(
  !js.includes("ownerParticipatePreviewAllowsCivicAction"),
  "preview civic unlock helper removed"
);
assert(
  !js.includes("isOwnerParticipatePreviewEnabled"),
  "preview enabled helper removed"
);
assert(
  !js.includes("applyOwnerParticipatePreviewFromUrl"),
  "preview URL boot helper removed"
);

const localStorageHits = js
  .split("\n")
  .map((line, index) => ({ line: line.trim(), index: index + 1 }))
  .filter(({ line }) => line.includes("localStorage"));
assert(
  localStorageHits.every(({ line }) =>
    line.includes("MADRID_PILOT_INTRO_STORAGE_KEY")
  ),
  "localStorage only for Madrid pilot intro dismissal (not product unlock)"
);
assert(
  localStorageHits.length >= 2,
  "Madrid intro localStorage get/set present"
);

const civicMatch = js.match(
  /function canTakeCivicAction\(\)\s*\{([\s\S]*?)\n  \}/
);
const civic = civicMatch ? civicMatch[1] : "";
assert(!!civicMatch, "canTakeCivicAction found");
assert(
  civic.includes("enablesCivicParticipation"),
  "civic action still uses backend membership gate"
);
assert(
  !civic.includes("ownerParticipatePreview"),
  "civic action has no client preview bypass"
);
assert(
  !civic.includes("localStorage"),
  "civic action has no localStorage unlock"
);

console.log("PASSED: " + passed + " owner participate preview removal assertions");
