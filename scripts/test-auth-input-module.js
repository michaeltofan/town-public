const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "auth-input.js"));

const authInput = globalThis.TownAuthInput;
assert(authInput, "TownAuthInput is exported");
assert.equal(authInput.digitsOnly(" a1-2b34567 "), "123456");
assert.equal(authInput.digitsOnly(null), "");
assert.equal(authInput.passwordCodePointLength("e\u0301"), 1);
assert.equal(authInput.passwordMeetsPolicy("123456789012345"), true);
assert.equal(authInput.passwordMeetsPolicy("12345678901234"), false);
assert.equal(authInput.passwordMeetsPolicy("x".repeat(128)), true);
assert.equal(authInput.passwordMeetsPolicy("x".repeat(129)), false);
assert.equal(Object.isFrozen(authInput), true);

console.log("PASSED: 9 auth input module assertions");
