"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAIL: " + message);
    process.exitCode = 1;
    return;
  }
  passed += 1;
  console.log("OK: " + message);
}

function functionBody(name) {
  const start = js.indexOf("function " + name + "(");
  assert(start >= 0, name + " exists");
  if (start < 0) return "";
  const next = js.indexOf("\n  function ", start + 10);
  return js.slice(start, next < 0 ? js.length : next);
}

assert(html.includes('id="view-password"'), "password setup view exists");
assert(html.includes('id="password-input"'), "initial password input exists");
assert(html.includes('id="password-confirm"'), "password confirmation exists");
assert(html.includes('minlength="15"'), "browser reflects the API minimum length");
assert(html.includes('maxlength="128"'), "browser reflects the API maximum length");
assert(html.includes('id="auth-password"'), "returning-member password input exists");
assert(html.includes('id="auth-passkey"'), "returning-member passkey option remains");

const setup = functionBody("completeInitialPasswordSetup");
assert(setup.includes('/v1/account/password'), "initial password uses canonical API route");
assert(setup.includes("setupGrantAuthHeader"), "initial password uses SetupGrant");
assert(setup.includes('status === "PASSWORD_SET"'), "password setup requires PASSWORD_SET");

const passwordAuth = functionBody("authenticateWithPassword");
assert(passwordAuth.includes('/v1/authentication/password'), "password sign-in uses canonical API route");
assert(passwordAuth.includes('clientType: "web"'), "password sign-in requests a web session");
assert(passwordAuth.includes("postJsonWithCredentials"), "password sign-in accepts the HttpOnly session cookie");
assert(passwordAuth.includes('status === "AUTHENTICATED"'), "password sign-in requires authenticated result");

const passwordSignIn = functionBody("startPublicAuthWindowPasswordSignIn");
assert(passwordSignIn.includes("authenticateWithPassword"), "password control invokes password authentication");
assert(passwordSignIn.includes("fetchAccountMembership"), "password sign-in refreshes membership truth");
assert(passwordSignIn.includes("bootstrapCommunityCommitment"), "password sign-in restores commitment truth");
assert(passwordSignIn.includes("continueAfterPublicPasskeySignIn"), "both sign-in methods share post-auth routing");

assert(js.includes('go("password")'), "verified email continues to password setup");
assert(js.includes('go("passkey")'), "password setup continues to passkey registration");
assert(js.includes("passwordSet = true"), "passkey route opens only after password setup success");
assert(js.includes("passwordBack.hidden = true"), "consumed email code cannot be replayed through Back");
assert(js.includes("passkeyBack.hidden = passwordSet"), "consumed password grant cannot be replayed through Back");
assert(js.includes("passwordCodePointLength"), "password policy counts Unicode code points");
assert(js.includes("const PASSWORD_COPY"), "password setup copy exists");
for (const language of ["en", "es", "it", "de", "ro", "fr", "hu"]) {
  assert(
    new RegExp("(?:^|\\n)\\s{4}" + language + ": \\{").test(
      js.slice(js.indexOf("const PASSWORD_COPY"), js.indexOf("const PASSKEY_COPY"))
    ),
    "password setup copy exists for " + language
  );
}

for (const falseClaim of [
  "No password is required",
  "Non serve una password",
  "Nu este nevoie de o parolă",
  "kein Passwort erforderlich",
  "no requiere contraseña",
]) {
  assert(!js.includes(falseClaim), "removed false claim: " + falseClaim);
}

const securitySlice = setup + passwordAuth + passwordSignIn;
assert(!securitySlice.includes("localStorage"), "passwords are not written to localStorage");
assert(!securitySlice.includes("sessionStorage"), "passwords are not written to sessionStorage");

if (process.exitCode) process.exit(process.exitCode);
console.log("PASSED: " + passed + " password + passkey contract assertions");
