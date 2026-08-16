const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "image-compression.js"));

const imageCompression = globalThis.TownImageCompression;
assert(imageCompression, "TownImageCompression is exported");

assert.equal(imageCompression.withExtension("photo.png", "jpg"), "photo.jpg");
assert.equal(imageCompression.withExtension("archive.tar.gz", "jpg"), "archive.tar.jpg");
assert.equal(imageCompression.withExtension("no-extension", "jpg"), "no-extension.jpg");
assert.equal(imageCompression.withExtension("", "jpg"), "photo.jpg");
assert.equal(imageCompression.withExtension(null, "jpg"), "photo.jpg");

(async () => {
  const fakeBlob = { size: 123, type: "image/jpeg" };
  const fakeCanvas = {
    toBlob(callback, type, quality) {
      assert.equal(type, "image/jpeg");
      assert.equal(quality, 0.8);
      callback(fakeBlob);
    },
  };
  const blob = await imageCompression.canvasToBlobAsync(fakeCanvas, "image/jpeg", 0.8);
  assert.equal(blob, fakeBlob);

  const failingCanvas = { toBlob: (callback) => callback(null) };
  const nullBlob = await imageCompression.canvasToBlobAsync(failingCanvas);
  assert.equal(nullBlob, null);

  assert.equal(Object.isFrozen(imageCompression), true);

  console.log("PASSED: 8 image compression module assertions");
})();
