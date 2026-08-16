const assert = require("node:assert/strict");
const path = require("node:path");

require(path.join(__dirname, "..", "civic-process-labels.js"));

const labels = globalThis.TownCivicProcessLabels;
assert(labels, "TownCivicProcessLabels is exported");

const copy = {
  confirmCountOne: "1 confirmation",
  confirmCount: "{count} confirmations",
  voteCountLabel: "{count} votes",
  mandateTotalVotesLabel: "{count} total votes",
  proposalsErrorDuplicate: "duplicate",
  proposalsErrorNotAuthor: "not author",
  proposalsErrorGeneric: "generic error",
  intentProposal: "Proposal",
};

assert.equal(labels.formatConfirmCountLabel(copy, 0), "0 confirmations");
assert.equal(labels.formatConfirmCountLabel(copy, 1), "1 confirmation");
assert.equal(labels.formatConfirmCountLabel(copy, 3), "3 confirmations");

assert.equal(labels.formatVoteCountLabel(copy, 5), "5 votes");
assert.equal(labels.formatTotalVotesLabel(copy, 42), "42 total votes");

assert.equal(
  labels.civicProposalErrorCopy(copy, "CIVIC_PROPOSAL_ALREADY_SUBMITTED"),
  copy.proposalsErrorDuplicate
);
assert.equal(
  labels.civicProposalErrorCopy(copy, "CIVIC_PROPOSAL_NOT_AUTHOR"),
  copy.proposalsErrorNotAuthor
);
assert.equal(
  labels.civicProposalErrorCopy(copy, "UNKNOWN_CODE"),
  copy.proposalsErrorGeneric
);

assert.equal(labels.DELIBERATION_INTENT_COPY_KEYS.proposal, "intentProposal");
assert.equal(labels.deliberationIntentLabel(copy, "proposal"), copy.intentProposal);
assert.equal(labels.deliberationIntentLabel(copy, "not_a_real_intent"), "");

assert.equal(Object.isFrozen(labels), true);

console.log("PASSED: 13 civic process labels module assertions");
