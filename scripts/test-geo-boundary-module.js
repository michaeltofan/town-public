const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "geo-boundary.js"));

const geo = globalThis.TownGeoBoundary;
assert(geo, "TownGeoBoundary is exported");

// A 10x10 square ring in lon/lat order, GeoJSON winding (closed ring).
const square = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 10],
  [0, 0],
];

assert.deepEqual(geo.ringBBox(square), [0, 0, 10, 10]);

assert.equal(geo.pointInRing(5, 5, square), true, "center is inside the ring");
assert.equal(geo.pointInRing(20, 20, square), false, "far outside is outside the ring");

const polygonCoords = [square];
assert.equal(geo.pointInPolygonCoords(5, 5, polygonCoords), true);
assert.equal(geo.pointInPolygonCoords(-1, -1, polygonCoords), false);
assert.equal(geo.pointInPolygonCoords(5, 5, null), false, "missing coords fail closed");

// A ring with a 2x2 hole cut out of its center.
const hole = [
  [4, 4],
  [6, 4],
  [6, 6],
  [4, 6],
  [4, 4],
];
const polygonWithHole = [square, hole];
assert.equal(geo.pointInPolygonCoords(1, 1, polygonWithHole), true, "outside the hole, inside the exterior");
assert.equal(geo.pointInPolygonCoords(5, 5, polygonWithHole), false, "inside the hole is excluded");

const polygonFeature = { geometry: { type: "Polygon", coordinates: polygonCoords } };
assert.equal(geo.featureContainsPoint(polygonFeature, 5, 5), true);
assert.equal(geo.featureContainsPoint(polygonFeature, 20, 20), false);
assert.equal(geo.featureContainsPoint({ geometry: null }, 5, 5), false, "missing geometry fails closed");

const multiPolygonFeature = {
  geometry: { type: "MultiPolygon", coordinates: [polygonCoords, [[[20, 20], [30, 20], [30, 30], [20, 30], [20, 20]]]] },
};
assert.equal(geo.featureContainsPoint(multiPolygonFeature, 5, 5), true, "inside the first polygon");
assert.equal(geo.featureContainsPoint(multiPolygonFeature, 25, 25), true, "inside the second polygon");
assert.equal(geo.featureContainsPoint(multiPolygonFeature, 15, 15), false, "in the gap between polygons");

const featureCollection = { type: "FeatureCollection", features: [polygonFeature] };
assert.equal(geo.geojsonContainsPoint(featureCollection, 5, 5), true);
assert.equal(geo.geojsonContainsPoint(featureCollection, 20, 20), false);
assert.equal(geo.geojsonContainsPoint({ type: "Feature", ...polygonFeature }, 5, 5), true);
assert.equal(geo.geojsonContainsPoint(polygonFeature.geometry, 5, 5), true, "bare geometry object is accepted");
assert.equal(geo.geojsonContainsPoint(null, 5, 5), false, "missing geojson fails closed");

assert.equal(Object.isFrozen(geo), true);

console.log("PASSED: 20 geo boundary module assertions");
