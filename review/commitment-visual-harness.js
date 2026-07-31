/**
 * REVIEW-ONLY visual harness for community-commitment screens.
 *
 * Not loaded by the normal product (index.html / script.js).
 * Never calls account, session, commitment, membership, or Checkout APIs.
 * Never grants authentication, membership, or participation authority.
 */
(function () {
  "use strict";

  const COPY = {
    label: "SCELTA DELLA COMUNITÀ",
    title: "Scegli la tua comunità TOWN.",
    body:
      "Seleziona personalmente il paese e la città. TOWN non verifica tecnicamente la tua posizione fisica o la residenza.",
    countryLegend: "Scegli il paese",
    cityLegend: "Scegli la città",
    countryNames: {
      Italy: "Italia",
      Germany: "Germania",
      Romania: "Romania",
    },
    cityNames: { Milano: "Milano", Munich: "München", Arad: "Arad" },
    reviewLabel: "Rivedi la comunità selezionata",
    reviewCountry: "Paese: {country}",
    reviewCity: "Città: {city}",
    reviewNote:
      "La membership e la partecipazione civica saranno associate a questa comunità.",
    acceptText:
      "Confermo di aver selezionato personalmente il paese e la città corretti e accetto la responsabilità per l’accuratezza di questa dichiarazione.",
    confirm: "Registra la dichiarazione",
    saving: "Salvataggio in corso…",
    saved: "Dichiarazione registrata per {city}, {country}.",
    checkoutHint:
      "Il pagamento annuale è disponibile solo dopo la conferma della comunità.",
    checkoutCta: "Continua alla membership annuale — €12/anno",
    back: "Indietro",
    errorSave: "Non è stato possibile registrare la dichiarazione. Riprova.",
  };

  const CITY_BY_COUNTRY = {
    Italy: "Milano",
    Germany: "Munich",
    Romania: "Arad",
  };

  const FIXTURES = {
    "commitment-no-country": {
      country: null,
      city: null,
      accepted: false,
      saving: false,
      recorded: false,
      rejected: false,
    },
    "commitment-country-only": {
      country: "Italy",
      city: null,
      accepted: false,
      saving: false,
      recorded: false,
      rejected: false,
    },
    "commitment-city-no-accept": {
      country: "Italy",
      city: "Milano",
      accepted: false,
      saving: false,
      recorded: false,
      rejected: false,
    },
    "commitment-accept-pending": {
      country: "Italy",
      city: "Milano",
      accepted: true,
      saving: true,
      recorded: false,
      rejected: false,
    },
    "commitment-rejected": {
      country: "Italy",
      city: "Milano",
      accepted: true,
      saving: false,
      recorded: false,
      rejected: true,
    },
    "commitment-recorded": {
      country: "Italy",
      city: "Milano",
      accepted: true,
      saving: false,
      recorded: true,
      rejected: false,
    },
    "commitment-no-acceptance-existing": {
      country: null,
      city: null,
      accepted: false,
      saving: false,
      recorded: false,
      rejected: false,
    },
    "commitment-restored": {
      country: "Germany",
      city: "Munich",
      accepted: true,
      saving: false,
      recorded: true,
      rejected: false,
    },
  };

  function qs(id) {
    return document.getElementById(id);
  }

  function fixtureName() {
    try {
      return new URLSearchParams(window.location.search || "").get("townReview");
    } catch (_err) {
      return null;
    }
  }

  function renderCities(country, selectedCity) {
    const root = qs("commitment-city-options");
    root.innerHTML = "";
    if (!country || !CITY_BY_COUNTRY[country]) return;
    const cityId = CITY_BY_COUNTRY[country];
    const label = document.createElement("label");
    label.className = "commitment__option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "commitment-city";
    input.value = cityId;
    input.checked = selectedCity === cityId;
    // Visual-only: selection is fixed by the fixture.
    input.disabled = true;
    const span = document.createElement("span");
    span.textContent = COPY.cityNames[cityId] || cityId;
    label.appendChild(input);
    label.appendChild(span);
    root.appendChild(label);
  }

  function applyFixture(name) {
    const state = FIXTURES[name] || FIXTURES["commitment-no-country"];
    const copy = COPY;
    const recorded = state.recorded === true;
    const readyForReview = !!(state.country && state.city);

    qs("commitment-label").textContent = copy.label;
    qs("commitment-title").textContent = copy.title;
    qs("commitment-body").textContent = copy.body;
    qs("commitment-country-legend").textContent = copy.countryLegend;
    qs("commitment-city-legend").textContent = copy.cityLegend;
    qs("commitment-country-italy-label").textContent = copy.countryNames.Italy;
    qs("commitment-country-germany-label").textContent =
      copy.countryNames.Germany;
    qs("commitment-country-romania-label").textContent =
      copy.countryNames.Romania;
    qs("commitment-accept-text").textContent = copy.acceptText;
    qs("commitment-review-label").textContent = copy.reviewLabel;
    qs("commitment-review-note").textContent = copy.reviewNote;
    qs("commitment-checkout-hint").textContent = copy.checkoutHint;
    qs("commitment-back").textContent = copy.back;
    qs("commitment-checkout").textContent = copy.checkoutCta;

    Array.prototype.forEach.call(
      document.querySelectorAll('input[name="commitment-country"]'),
      function (input) {
        input.checked = input.value === state.country;
        // Visual-only fixture: inputs are non-interactive.
        input.disabled = true;
      }
    );

    qs("commitment-country-fieldset").disabled = false;
    qs("commitment-city-fieldset").disabled = !state.country;
    renderCities(state.country, state.city);

    qs("commitment-review").hidden = !readyForReview && !recorded;
    qs("commitment-accept-label-wrap").hidden = !readyForReview && !recorded;
    if (readyForReview || recorded) {
      const countryLabel =
        copy.countryNames[state.country] || state.country || "";
      const cityLabel = copy.cityNames[state.city] || state.city || "";
      qs("commitment-review-country").textContent = copy.reviewCountry.replace(
        "{country}",
        countryLabel
      );
      qs("commitment-review-city").textContent = copy.reviewCity.replace(
        "{city}",
        cityLabel
      );
    }

    const accept = qs("commitment-accept");
    accept.checked = state.accepted === true || recorded;
    accept.disabled = recorded;

    const confirm = qs("commitment-confirm");
    const checkout = qs("commitment-checkout");
    // Match production syncCommitmentUi gating for the same commitment fields.
    const canConfirm =
      readyForReview &&
      state.accepted === true &&
      !state.saving &&
      !recorded;
    confirm.hidden = recorded;
    confirm.disabled = !canConfirm;
    confirm.textContent = state.saving ? copy.saving : copy.confirm;

    qs("commitment-checkout-hint").hidden = recorded;
    if (!recorded) {
      qs("commitment-checkout-hint").hidden = false;
      qs("commitment-checkout-hint").textContent = copy.checkoutHint;
    }

    if (recorded) {
      const countryLabel =
        copy.countryNames[state.country] || state.country || "";
      const cityLabel = copy.cityNames[state.city] || state.city || "";
      qs("commitment-saved-status").hidden = false;
      qs("commitment-saved-status").textContent = copy.saved
        .replace("{city}", cityLabel)
        .replace("{country}", countryLabel);
      checkout.hidden = false;
      checkout.disabled = false;
      checkout.textContent = copy.checkoutCta;
      qs("commitment-checkout-hint").hidden = true;
      accept.checked = true;
      accept.disabled = true;
    } else {
      qs("commitment-saved-status").hidden = true;
      checkout.hidden = true;
      checkout.disabled = true;
      accept.disabled = true;
    }

    // Rejected retry affordance matches product: confirm visible/enabled, checkout hidden.
    if (state.rejected && !recorded) {
      confirm.hidden = false;
      confirm.disabled = false;
      confirm.textContent = copy.confirm;
    }

    const err = qs("commitment-error");
    if (state.rejected) {
      err.hidden = false;
      err.textContent = copy.errorSave;
    } else {
      err.hidden = true;
      err.textContent = "";
    }

    // Guard: never wire network actions in this harness.
    confirm.onclick = function (event) {
      event.preventDefault();
    };
    checkout.onclick = function (event) {
      event.preventDefault();
    };
    qs("commitment-back").onclick = function (event) {
      event.preventDefault();
    };
  }

  // Hard isolation: refuse any network API surface this harness might inherit.
  if (typeof window.fetch === "function") {
    window.fetch = function () {
      return Promise.reject(
        new Error("review harness: network fetch is disabled")
      );
    };
  }
  if (typeof XMLHttpRequest !== "undefined") {
    XMLHttpRequest.prototype.open = function () {
      throw new Error("review harness: XHR is disabled");
    };
  }

  document.documentElement.lang = "it";
  document.body.classList.add("page-commitment");
  qs("view-commitment").hidden = false;
  applyFixture(fixtureName());
})();
