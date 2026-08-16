const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "app-utils.js"));

const utils = globalThis.TownAppUtils;
assert(utils, "TownAppUtils is exported");

const err = utils.makeApiError("network");
assert(err instanceof Error);
assert.equal(err.kind, "network");
assert.equal(err.message, "network");

assert.equal(utils.checkoutErrorKind(401), "unauthenticated");
assert.equal(utils.checkoutErrorKind(409), "alreadyMember");
assert.equal(utils.checkoutErrorKind(429), "rateLimited");
assert.equal(utils.checkoutErrorKind(503), "unavailable");
assert.equal(utils.checkoutErrorKind(404), "unavailable");
assert.equal(utils.checkoutErrorKind(502), "checkoutFailed");
assert.equal(utils.checkoutErrorKind(500), "network");

const geoCopy = {
  errorUnsupported: "Not supported",
  errorPermission: "Permission denied",
  errorUnavailable: "Unavailable",
  errorTimeout: "Timed out",
};
assert.equal(utils.geolocationErrorMessage(geoCopy, { code: "unsupported" }), geoCopy.errorUnsupported);
assert.equal(utils.geolocationErrorMessage(geoCopy, { code: 1 }), geoCopy.errorPermission);
assert.equal(utils.geolocationErrorMessage(geoCopy, { code: 2 }), geoCopy.errorUnavailable);
assert.equal(utils.geolocationErrorMessage(geoCopy, { code: 3 }), geoCopy.errorTimeout);
assert.equal(utils.geolocationErrorMessage(geoCopy, { code: 999 }), geoCopy.errorUnavailable);

assert.equal(utils.isSignalApiId("3fa85f64-5717-4562-b3fc-2c963f66afa6"), true);
assert.equal(utils.isSignalApiId("not-a-uuid"), false);
assert.equal(utils.isSignalApiId(""), false);
assert.equal(utils.isSignalApiId(null), false);
assert.equal(utils.isSignalApiId(123), false);

assert.equal(Object.isFrozen(utils), true);

console.log("PASSED: 18 app utils module assertions");
