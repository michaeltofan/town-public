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
    formatVerificationTallyLabel,
  });
})(typeof window !== "undefined" ? window : globalThis);
