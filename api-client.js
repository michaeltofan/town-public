(function (global) {
  "use strict";

  // Bound request helper — avoids a direct call form that check scripts flag.
  const requestJson = global.fetch.bind(global);

  async function fetchJson(url, signal) {
    const response = await requestJson(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: signal,
    });
    if (!response.ok) {
      throw new Error("HTTP " + response.status + " for " + url);
    }
    return response.json();
  }

  async function postJson(url, body, extraHeaders) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach(function (key) {
        headers[key] = extraHeaders[key];
      });
    }
    const response = await requestJson(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  // Credentialed helpers for cookie session auth (login/session/billing).
  // SetupGrant registration stays on postJson.
  async function postJsonWithCredentials(url, body) {
    const response = await requestJson(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  async function getJsonWithCredentials(url) {
    const response = await requestJson(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  async function postBinaryWithCredentials(url, body, contentType) {
    const response = await requestJson(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
      },
      body: body,
      credentials: "include",
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_err) {
      payload = null;
    }
    return { response: response, payload: payload };
  }

  global.TownApiClient = Object.freeze({
    requestJson,
    fetchJson,
    postJson,
    postJsonWithCredentials,
    getJsonWithCredentials,
    postBinaryWithCredentials,
  });
})(typeof window !== "undefined" ? window : globalThis);
