(function (global) {
  "use strict";

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
  }

  function passwordCodePointLength(value) {
    return Array.from(String(value || "").normalize("NFC")).length;
  }

  function passwordMeetsPolicy(value) {
    const length = passwordCodePointLength(value);
    return length >= 15 && length <= 128;
  }

  global.TownAuthInput = Object.freeze({
    digitsOnly,
    passwordCodePointLength,
    passwordMeetsPolicy,
  });
})(typeof window !== "undefined" ? window : globalThis);
