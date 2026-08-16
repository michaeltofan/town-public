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

assert.equal(utils.formatObservedDate("2027-03-05", "en-US"), "March 5, 2027");
assert.equal(utils.formatObservedDate("", "en-US"), "");
assert.equal(utils.formatObservedDate(null, "en-US"), "");

assert.equal(utils.profileDisplayName("jane.doe@example.com"), "Jane Doe");
assert.equal(utils.profileDisplayName("bob_smith-jr@example.com"), "Bob Smith Jr");
assert.equal(utils.profileDisplayName(""), "");
assert.equal(utils.profileDisplayName(null), "");

assert.equal(utils.formatActivityWhen(""), "");
assert.equal(utils.formatActivityWhen(null), "");
assert.equal(utils.formatActivityWhen("not-a-date"), "");
assert.equal(typeof utils.formatActivityWhen("2027-03-05T12:00:00Z"), "string");
assert(utils.formatActivityWhen("2027-03-05T12:00:00Z").length > 0);

const activityCopy = { intents: { proposal: "Proposal" } };
assert.equal(
  utils.activityItemDetail(
    { kind: "contribution", contribution: { intent: "proposal", text: "a".repeat(200) } },
    activityCopy
  ),
  "Proposal · " + "a".repeat(137) + "…"
);
assert.equal(
  utils.activityItemDetail(
    { kind: "signal_evolution", evolution: { latestUpdate: "Latest", statusLabel: "Status" } },
    activityCopy
  ),
  "Latest"
);
assert.equal(
  utils.activityItemDetail(
    { kind: "signal_evolution", evolution: { latestUpdate: "", statusLabel: "Status" } },
    activityCopy
  ),
  "Status"
);
assert.equal(
  utils.activityItemDetail(
    { kind: "other", signal: { community: { displayName: "Milano" } } },
    activityCopy
  ),
  "Milano"
);
assert.equal(utils.activityItemDetail(null, activityCopy), "");
assert.equal(utils.activityItemDetail({}, activityCopy), "");

assert.equal(utils.isPasskeyCeremonyCancelled({ name: "NotAllowedError" }), true);
assert.equal(utils.isPasskeyCeremonyCancelled({ name: "AbortError" }), true);
assert.equal(utils.isPasskeyCeremonyCancelled({ code: "ERROR_CEREMONY_ABORTED" }), true);
assert.equal(utils.isPasskeyCeremonyCancelled({ cause: { name: "NotAllowedError" } }), true);
assert.equal(
  utils.isPasskeyCeremonyCancelled({
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: { name: "NotAllowedError" },
  }),
  true
);
assert.equal(utils.isPasskeyCeremonyCancelled({ name: "SomeOtherError" }), false);
assert(!utils.isPasskeyCeremonyCancelled(null), "null error is not a cancelled ceremony");

const sessionCopy = {
  sessionUnavailable: "Unavailable",
  sessionLocalOnly: "Local only",
  sessionGated: "Gated",
  sessionPublishFailed: "Publish failed",
};
assert.equal(utils.sessionStatusNoteText(sessionCopy, null), "");
assert.equal(utils.sessionStatusNoteText(sessionCopy, { note: "unavailable" }), sessionCopy.sessionUnavailable);
assert.equal(utils.sessionStatusNoteText(sessionCopy, { note: "local" }), sessionCopy.sessionLocalOnly);
assert.equal(utils.sessionStatusNoteText(sessionCopy, { note: "gated" }), sessionCopy.sessionGated);
assert.equal(utils.sessionStatusNoteText(sessionCopy, { note: "publish_failed" }), sessionCopy.sessionPublishFailed);
assert.equal(utils.sessionStatusNoteText(sessionCopy, { note: "other" }), "");

assert.equal(Object.isFrozen(utils), true);

console.log("PASSED: 47 app utils module assertions");
