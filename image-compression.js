(function (global) {
  "use strict";

  function loadImageForCompression(file) {
    if (typeof window.createImageBitmap === "function") {
      return window.createImageBitmap(file).catch(() => null);
    }
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  }

  function canvasToBlobAsync(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), type, quality);
    });
  }

  function withExtension(fileName, ext) {
    const base = (fileName || "photo").replace(/\.[^./\\]+$/, "");
    return base + "." + ext;
  }

  global.TownImageCompression = Object.freeze({
    loadImageForCompression,
    canvasToBlobAsync,
    withExtension,
  });
})(typeof window !== "undefined" ? window : globalThis);
