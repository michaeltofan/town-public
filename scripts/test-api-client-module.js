const assert = require("node:assert/strict");
const path = require("node:path");

function fakeResponse({ ok = true, status = 200, jsonBody = {}, jsonThrows = false } = {}) {
  return {
    ok,
    status,
    json: async () => {
      if (jsonThrows) throw new Error("invalid json");
      return jsonBody;
    },
  };
}

const calls = [];
let nextResponse = fakeResponse();
// requestJson binds global.fetch once at module load, so the mock must stay
// the same function reference and read mutable state (nextResponse) instead
// of being reassigned between test cases.
global.fetch = async (url, init) => {
  calls.push({ url, init });
  return nextResponse;
};

require(path.join(__dirname, "..", "api-client.js"));

const client = globalThis.TownApiClient;
assert(client, "TownApiClient is exported");
assert.equal(typeof client.requestJson, "function");

(async () => {
  calls.length = 0;
  nextResponse = fakeResponse({ jsonBody: { data: { ok: true } } });
  const data = await client.fetchJson("https://api.example.com/v1/thing");
  assert.deepEqual(data, { data: { ok: true } });
  assert.equal(calls[0].url, "https://api.example.com/v1/thing");
  assert.equal(calls[0].init.method, "GET");
  assert.equal(calls[0].init.headers.Accept, "application/json");

  nextResponse = fakeResponse({ ok: false, status: 404 });
  await assert.rejects(
    () => client.fetchJson("https://api.example.com/v1/missing"),
    /HTTP 404/
  );

  calls.length = 0;
  nextResponse = fakeResponse({ jsonBody: { created: true } });
  const posted = await client.postJson("https://api.example.com/v1/things", { a: 1 }, { "X-Extra": "1" });
  assert.deepEqual(posted.payload, { created: true });
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.body, JSON.stringify({ a: 1 }));
  assert.equal(calls[0].init.headers["X-Extra"], "1");
  assert.equal(calls[0].init.credentials, undefined, "postJson does not send credentials");

  calls.length = 0;
  await client.postJsonWithCredentials("https://api.example.com/v1/session", { email: "a@b.com" });
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.credentials, "include");

  calls.length = 0;
  await client.getJsonWithCredentials("https://api.example.com/v1/account");
  assert.equal(calls[0].init.method, "GET");
  assert.equal(calls[0].init.credentials, "include");

  calls.length = 0;
  await client.postBinaryWithCredentials("https://api.example.com/v1/upload", new Uint8Array([1, 2, 3]), "image/jpeg");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers["Content-Type"], "image/jpeg");
  assert.equal(calls[0].init.credentials, "include");

  nextResponse = fakeResponse({ jsonThrows: true });
  const malformed = await client.postJson("https://api.example.com/v1/x", {});
  assert.equal(malformed.payload, null, "malformed JSON response resolves to a null payload, not a throw");

  assert.equal(Object.isFrozen(client), true);

  console.log("PASSED: 15 api client module assertions");
})();
