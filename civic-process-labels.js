(function (global) {
  "use strict";

  function formatConfirmCountLabel(copy, count) {
    const n = typeof count === "number" && count > 0 ? count : 0;
    if (n === 1) {
      return copy.confirmCountOne || "1 confirmation";
    }
    return (copy.confirmCount || "{count} confirmations").replace(
      "{count}",
      String(n)
    );
  }

  function formatVoteCountLabel(copy, count) {
    return (copy.voteCountLabel || "{count} votes").replace(
      "{count}",
      String(count)
    );
  }


  function formatTotalVotesLabel(copy, count) {
    return (copy.mandateTotalVotesLabel || "{count} total votes").replace(
      "{count}",
      String(count)
    );
  }


  function civicProposalErrorCopy(copy, code) {
    return code === "CIVIC_PROPOSAL_ALREADY_SUBMITTED"
      ? copy.proposalsErrorDuplicate
      : code === "CIVIC_PROPOSAL_STAGE_CLOSED"
        ? copy.proposalsErrorClosed
        : code === "CIVIC_PROPOSAL_NOT_AUTHOR"
          ? copy.proposalsErrorNotAuthor
          : code === "CIVIC_PROPOSAL_ALREADY_REVISED"
            ? copy.proposalsErrorAlreadyRevised
            : code === "CIVIC_PROPOSAL_ALREADY_WITHDRAWN"
              ? copy.proposalsErrorAlreadyWithdrawn
              : copy.proposalsErrorGeneric;
  }


  const DELIBERATION_INTENT_COPY_KEYS = {
    observation: "intentObservation",
    proposal: "intentProposal",
    next_step: "intentNextStep",
    argument_for: "intentArgumentFor",
    risk_or_objection: "intentRiskOrObjection",
    question: "intentQuestion",
    author_response: "intentAuthorResponse",
    evidence: "intentEvidence",
    amendment_suggestion: "intentAmendmentSuggestion",
    minority_position: "intentMinorityPosition",
  };

  function deliberationIntentLabel(copy, intent) {
    const key = DELIBERATION_INTENT_COPY_KEYS[intent];
    return key ? copy[key] || "" : "";
  }


  global.TownCivicProcessLabels = Object.freeze({
    formatConfirmCountLabel,
    formatVoteCountLabel,
    formatTotalVotesLabel,
    civicProposalErrorCopy,
    DELIBERATION_INTENT_COPY_KEYS,
    deliberationIntentLabel,
  });
})(typeof window !== "undefined" ? window : globalThis);
