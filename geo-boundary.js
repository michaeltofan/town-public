(function (global) {
  "use strict";

  function ringBBox(ring) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < ring.length; i++) {
      const x = ring[i][0];
      const y = ring[i][1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return [minX, minY, maxX, maxY];
  }

  function pointInRing(lon, lat, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0];
      const yi = ring[i][1];
      const xj = ring[j][0];
      const yj = ring[j][1];
      const denom = yj - yi || 0;
      const intersect =
        yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / denom + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function pointInPolygonCoords(lon, lat, polygonCoords) {
    if (!polygonCoords || !polygonCoords.length || !polygonCoords[0]) {
      return false;
    }
    const exterior = polygonCoords[0];
    const bbox = ringBBox(exterior);
    if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
      return false;
    }
    if (!pointInRing(lon, lat, exterior)) return false;
    for (let h = 1; h < polygonCoords.length; h++) {
      if (pointInRing(lon, lat, polygonCoords[h])) return false;
    }
    return true;
  }

  function featureContainsPoint(feature, lon, lat) {
    const geometry = feature && feature.geometry;
    if (!geometry || !geometry.type || !geometry.coordinates) return false;
    if (geometry.type === "Polygon") {
      return pointInPolygonCoords(lon, lat, geometry.coordinates);
    }
    if (geometry.type === "MultiPolygon") {
      for (let i = 0; i < geometry.coordinates.length; i++) {
        if (pointInPolygonCoords(lon, lat, geometry.coordinates[i])) {
          return true;
        }
      }
    }
    return false;
  }

  function geojsonContainsPoint(geojson, lon, lat) {
    if (!geojson) return false;
    if (geojson.type === "FeatureCollection") {
      const features = geojson.features || [];
      for (let i = 0; i < features.length; i++) {
        if (featureContainsPoint(features[i], lon, lat)) return true;
      }
      return false;
    }
    if (geojson.type === "Feature") {
      return featureContainsPoint(geojson, lon, lat);
    }
    return featureContainsPoint({ geometry: geojson }, lon, lat);
  }

  global.TownGeoBoundary = Object.freeze({
    ringBBox,
    pointInRing,
    pointInPolygonCoords,
    featureContainsPoint,
    geojsonContainsPoint,
  });
})(typeof window !== "undefined" ? window : globalThis);
