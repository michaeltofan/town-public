const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "civic-process-labels.js"));

const labels = globalThis.TownCivicProcessLabels;
assert(labels, "TownCivicProcessLabels is exported");

assert.equal(
  labels.formatConfirmCountLabel({ confirmCountOne: "1 confirmation" }, 1),
  "1 confirmation"
);
assert.equal(
  labels.formatConfirmCountLabel({ confirmCount: "{count} confirmations" }, 3),
  "3 confirmations"
);
assert.equal(
  labels.formatConfirmCountLabel({}, 0),
  "0 confirmations"
);
assert.equal(
  labels.formatConfirmCountLabel({}, -5),
  "0 confirmations"
);

assert.equal(
  labels.formatVoteCountLabel({ voteCountLabel: "{count} votes" }, 7),
  "7 votes"
);
assert.equal(labels.formatVoteCountLabel({}, 2), "2 votes");

assert.equal(
  labels.formatTotalVotesLabel(
    { mandateTotalVotesLabel: "{count} total votes" },
    42
  ),
  "42 total votes"
);
assert.equal(labels.formatTotalVotesLabel({}, 5), "5 total votes");

assert.equal(
  labels.formatVerificationTallyLabel(
    {
      verificationTallyLabel:
        "{delivered} confirmed delivered · {notDelivered} confirmed not delivered",
    },
    4,
    1
  ),
  "4 confirmed delivered · 1 confirmed not delivered"
);
assert.equal(
  labels.formatVerificationTallyLabel({}, 0, 0),
  "0 confirmed delivered · 0 confirmed not delivered"
);

assert.equal(Object.isFrozen(labels), true);

console.log("PASSED: 10 civic process labels module assertions");
