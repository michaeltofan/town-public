(function (global) {
  "use strict";

  function makeApiError(kind) {
    const err = new Error(kind);
    err.kind = kind;
    return err;
  }

  function checkoutErrorKind(status) {
    if (status === 401) return "unauthenticated";
    if (status === 409) return "alreadyMember";
    if (status === 429) return "rateLimited";
    if (status === 503 || status === 404) return "unavailable";
    if (status === 502) return "checkoutFailed";
    return "network";
  }

  function geolocationErrorMessage(copy, err) {
    const code = err && err.code;
    if (code === "unsupported") return copy.errorUnsupported;
    if (code === 1) return copy.errorPermission;
    if (code === 2) return copy.errorUnavailable;
    if (code === 3) return copy.errorTimeout;
    return copy.errorUnavailable;
  }

  function isSignalApiId(value) {
    return (
      typeof value === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
    );
  }

  global.TownAppUtils = Object.freeze({
    makeApiError,
    checkoutErrorKind,
    geolocationErrorMessage,
    isSignalApiId,
  });
})(typeof window !== "undefined" ? window : globalThis);
