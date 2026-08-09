"use strict";

const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const publicI18n = fs.readFileSync("public-i18n.js", "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error("FAIL: " + message);
  passed += 1;
  console.log("OK: " + message);
}

function functionBody(name) {
  const match = source.match(
    new RegExp("function " + name + "\\([^)]*\\) \\{([\\s\\S]*?)\\n  \\}")
  );
  return match ? match[1] : "";
}

const membershipLanguage = functionBody("membershipLang");
assert(!!membershipLanguage, "membership language resolver exists");
assert(
  membershipLanguage.includes("return resolvePublicReadingLanguage();"),
  "onboarding uses the browser-selected reading language"
);
assert(
  !membershipLanguage.includes("communityLanguage"),
  "community content language cannot replace interface language"
);

for (const lang of ["en", "es"]) {
  for (const catalog of [
    "MEMBERSHIP_COPY",
    "ACCOUNT_COPY",
    "EMAIL_COPY",
    "CODE_COPY",
    "PASSKEY_COPY",
    "READY_COPY",
    "PAYMENT_COPY",
    "ACTIVE_COPY",
    "COMMITMENT_COPY",
  ]) {
    assert(
      source.includes(catalog + "." + lang + " ="),
      catalog + " has explicit " + lang + " onboarding copy"
    );
  }
}

assert(
  /const LOGIN_COPY = \{[\s\S]*?\n    es: \{/.test(source),
  "returning-member login has explicit Spanish interface copy"
);

const returnToSignal = functionBody("returnVisitorToOriginatingSignal");
assert(!!returnToSignal, "visitor return helper exists");
assert(
  returnToSignal.includes("feedIndex = originatingFeedIndex"),
  "visitor returns to the originating signal index"
);
assert(
  returnToSignal.includes('go("feed")') && !returnToSignal.includes('go("ended")'),
  "visitor returns to the feed instead of an experience-end screen"
);

const membershipNotNow = source.match(
  /membershipNotNow\.addEventListener\("click", \(\) => \{([\s\S]*?)\n  \}\);/
);
assert(
  membershipNotNow &&
    membershipNotNow[1].includes("returnVisitorToOriginatingSignal"),
  "membership secondary action returns to the originating signal"
);

for (const honestCopy of [
  "identified account",
  "cuenta identificada",
  "account identificato",
  "identifiziertes Konto",
  "cont identificat",
  "compte identifié",
  "azonosított fiókot",
]) {
  assert(
    source.includes(honestCopy) || publicI18n.includes(honestCopy),
    "honest account/community copy exists: " + honestCopy
  );
}

for (const falseClaim of [
  "verified local member",
  "miembro local verificado",
  "membro locale verificato",
  "verifiziertes lokales Mitglied",
  "membru local verificat",
  "membre local vérifié",
  "ellenőrzött helyi tagként",
]) {
  assert(
    !source.includes(falseClaim) && !publicI18n.includes(falseClaim),
    "unsupported local-verification claim removed: " + falseClaim
  );
}

console.log("PASSED: " + passed + " onboarding continuity assertions");
