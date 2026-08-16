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

  function groupDeliberationContributionsByParent(contributions) {
    const byParent = new Map();
    for (let i = 0; i < contributions.length; i++) {
      const contribution = contributions[i];
      const key = contribution.replyToContributionId || null;
      const bucket = byParent.get(key);
      if (bucket) {
        bucket.push(contribution);
      } else {
        byParent.set(key, [contribution]);
      }
    }
    return byParent;
  }

  function civicActionBlockedReasonLabel(copy, key) {
    return key === "awaiting_institution_response"
      ? copy.actionBlockedReasonInstitution
      : key === "awaiting_resources"
        ? copy.actionBlockedReasonResources
        : key === "awaiting_volunteers"
          ? copy.actionBlockedReasonVolunteers
          : copy.actionBlockedReasonOther;
  }

  function formatVerificationTallyLabel(copy, delivered, notDelivered) {
    return (
      copy.verificationTallyLabel ||
      "{delivered} confirmed delivered · {notDelivered} confirmed not delivered"
    )
      .replace("{delivered}", String(delivered))
      .replace("{notDelivered}", String(notDelivered));
  }

  global.TownCivicProcessLabels = Object.freeze({
    formatConfirmCountLabel,
    formatVoteCountLabel,
    formatTotalVotesLabel,
    civicProposalErrorCopy,
    DELIBERATION_INTENT_COPY_KEYS,
    deliberationIntentLabel,
    groupDeliberationContributionsByParent,
    civicActionBlockedReasonLabel,
    formatVerificationTallyLabel,
  });
})(typeof window !== "undefined" ? window : globalThis);
