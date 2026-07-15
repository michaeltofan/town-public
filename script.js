(() => {
  const viewEntry = document.getElementById("view-entry");
  const viewCountry = document.getElementById("view-country");
  const viewCity = document.getElementById("view-city");
  const viewLocation = document.getElementById("view-location");
  const viewBoundary = document.getElementById("view-boundary");
  const learnMoreButton = document.getElementById("learn-more");
  const enterButton = document.getElementById("enter-town");
  const sheet = document.getElementById("learn-more-sheet");
  const continueCountry = document.getElementById("continue-country");
  const countryBack = document.getElementById("country-back");
  const cityBack = document.getElementById("city-back");
  const continueCity = document.getElementById("continue-city");
  const cityOptions = document.getElementById("city-options");
  const cityTitle = document.getElementById("city-title");
  const cityLead = document.getElementById("city-lead");
  const cityLegend = document.getElementById("city-legend");
  const cityContext = document.getElementById("city-context");
  const locationBack = document.getElementById("location-back");
  const locationIdle = document.getElementById("location-idle");
  const locationSuccess = document.getElementById("location-success");
  const locationTitle = document.getElementById("location-title");
  const locationCity = document.getElementById("location-city");
  const locationLead = document.getElementById("location-lead");
  const locationPrivacy = document.getElementById("location-privacy");
  const locationVerify = document.getElementById("location-verify");
  const locationStatusLabel = document.getElementById("location-status-label");
  const locationSuccessTitle = document.getElementById("location-success-title");
  const locationSuccessLead = document.getElementById("location-success-lead");
  const locationContinue = document.getElementById("location-continue");
  const boundaryBack = document.getElementById("boundary-back");
  const boundaryMeta = document.getElementById("boundary-meta");
  const countryInputs = Array.from(
    document.querySelectorAll('input[name="country"]')
  );

  if (
    !viewEntry ||
    !viewCountry ||
    !viewCity ||
    !viewLocation ||
    !viewBoundary ||
    !learnMoreButton ||
    !enterButton ||
    !sheet ||
    !continueCountry ||
    !countryBack ||
    !cityBack ||
    !continueCity ||
    !cityOptions ||
    !cityTitle ||
    !cityLead ||
    !cityLegend ||
    !cityContext ||
    !locationBack ||
    !locationIdle ||
    !locationSuccess ||
    !locationTitle ||
    !locationCity ||
    !locationLead ||
    !locationPrivacy ||
    !locationVerify ||
    !locationStatusLabel ||
    !locationSuccessTitle ||
    !locationSuccessLead ||
    !locationContinue ||
    !boundaryBack ||
    !boundaryMeta
  ) {
    return;
  }

  const CITY_BY_COUNTRY = {
    Italy: { id: "Milano", image: "assets/cities/milano.png" },
    Germany: { id: "Munich", image: "assets/cities/munich.png" },
  };

  const CITY_COPY = {
    en: {
      title: "Choose your city",
      lead: "TOWN connects you to one verified local community.",
      cityLegend: "City",
      back: "Back",
      continue: "Continue",
      cityNames: { Milano: "Milano", Munich: "Munich" },
      context: {
        Italy: "Country: Italy",
        Germany: "Country: Germany",
      },
    },
    it: {
      title: "Seleziona la tua città",
      lead: "TOWN ti collega a una sola comunità locale verificata.",
      cityLegend: "Città",
      back: "Indietro",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "Munich" },
      context: {
        Italy: "Paese: Italia",
        Germany: "Paese: Germania",
      },
    },
    de: {
      title: "Wähle deine Stadt",
      lead: "TOWN verbindet dich mit einer einzigen verifizierten lokalen Gemeinschaft.",
      cityLegend: "Stadt",
      back: "Zurück",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
      context: {
        Italy: "Land: Italien",
        Germany: "Land: Deutschland",
      },
    },
  };

  const LOCATION_COPY = {
    it: {
      back: "Indietro",
      title: "Conferma la tua comunità locale",
      lead: "TOWN è locale. La partecipazione appartiene a chi è connesso a questa comunità.",
      privacy:
        "Questo prototipo non esegue una verifica GPS reale. In questa fase non vengono raccolti né memorizzati dati di posizione reali.",
      verify: "Simula la verifica",
      statusLabel: "Solo prototipo",
      successTitle: "Posizione verificata per {city}",
      successLead:
        "La tua comunità locale è confermata in questo prototipo. Non è stato usato alcun GPS reale.",
      continue: "Continua",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
    de: {
      back: "Zurück",
      title: "Bestätige deine lokale Gemeinschaft",
      lead: "TOWN ist lokal. Teilnahme gehört zu den Menschen, die mit dieser Gemeinschaft verbunden sind.",
      privacy:
        "Dieser Prototyp führt keine echte GPS-Prüfung durch. In diesem Schritt werden keine echten Standortdaten erfasst oder gespeichert.",
      verify: "Prüfung simulieren",
      statusLabel: "Nur Prototyp",
      successTitle: "Standort für {city} bestätigt",
      successLead:
        "Deine lokale Gemeinschaft ist in diesem Prototyp bestätigt. Es wurde kein echtes GPS verwendet.",
      continue: "Weiter",
      cityNames: { Milano: "Milano", Munich: "München" },
    },
  };

  let lastFocus = null;
  let selectedCountry = null;
  let selectedCity = null;
  let locationVerified = false;

  const titles = {
    entry: "TOWN — Entry",
    country: "TOWN — Choose your country",
    city: "TOWN — Choose your city",
    location: "TOWN — Confirm local community",
    boundary: "TOWN — Screen 05 boundary",
  };

  function parseRoute() {
    const raw = (window.location.hash || "").replace(/^#\/?/, "");
    if (raw.startsWith("country")) return "country";
    if (raw.startsWith("city")) return "city";
    if (raw.startsWith("location")) return "location";
    if (raw.startsWith("boundary")) return "boundary";
    return "entry";
  }

  function communityLanguage() {
    if (selectedCountry === "Italy" && selectedCity === "Milano") return "it";
    if (selectedCountry === "Germany" && selectedCity === "Munich") return "de";
    return "en";
  }

  function cityDisplayName(lang) {
    const names =
      (LOCATION_COPY[lang] && LOCATION_COPY[lang].cityNames) ||
      CITY_COPY.en.cityNames;
    return names[selectedCity] || selectedCity || "";
  }

  function applyCityCopy() {
    const lang = communityLanguage();
    const copy = CITY_COPY[lang];
    cityTitle.textContent = copy.title;
    cityLead.textContent = copy.lead;
    cityLegend.textContent = copy.cityLegend;
    cityBack.textContent = copy.back;
    continueCity.textContent = copy.continue;
    document.documentElement.lang = lang === "en" ? "en" : lang;

    if (selectedCountry) {
      cityContext.hidden = false;
      cityContext.textContent = copy.context[selectedCountry] || "";
    } else {
      cityContext.hidden = true;
      cityContext.textContent = "";
    }

    const label = cityOptions.querySelector(".country__option-label");
    if (label && selectedCountry) {
      const cityId = CITY_BY_COUNTRY[selectedCountry].id;
      label.textContent = copy.cityNames[cityId];
    }
  }

  function applyLocationCopy() {
    const lang = communityLanguage();
    const copy = LOCATION_COPY[lang] || LOCATION_COPY.it;
    const cityName = cityDisplayName(lang);

    locationBack.textContent = copy.back;
    locationTitle.textContent = copy.title;
    locationCity.textContent = cityName;
    locationLead.textContent = copy.lead;
    locationPrivacy.textContent = copy.privacy;
    locationVerify.textContent = copy.verify;
    locationStatusLabel.textContent = copy.statusLabel;
    locationSuccessTitle.textContent = copy.successTitle.replace(
      "{city}",
      cityName
    );
    locationSuccessLead.textContent = copy.successLead;
    locationContinue.textContent = copy.continue;
    document.documentElement.lang = lang === "en" ? "en" : lang;
  }

  function syncLocationState() {
    locationIdle.hidden = locationVerified;
    locationSuccess.hidden = !locationVerified;
  }

  function renderCityOptions(options) {
    const preserve = options && options.preserveSelection;
    const previousCity = preserve ? selectedCity : null;

    cityOptions.innerHTML = "";
    if (!preserve) {
      selectedCity = null;
      continueCity.disabled = true;
    }

    if (!selectedCountry || !CITY_BY_COUNTRY[selectedCountry]) {
      return;
    }

    const city = CITY_BY_COUNTRY[selectedCountry];
    const copy = CITY_COPY[communityLanguage()];
    const optionId = "city-" + city.id.toLowerCase();

    const label = document.createElement("label");
    label.className = "country__option";
    label.innerHTML =
      '<input type="radio" name="city" value="' +
      city.id +
      '" id="' +
      optionId +
      '" />' +
      '<span class="country__option-face">' +
      '<img class="country__flag city__thumb" src="' +
      city.image +
      '" alt="" width="28" height="20" decoding="async" />' +
      '<span class="country__option-label">' +
      copy.cityNames[city.id] +
      "</span>" +
      "</span>";

    cityOptions.appendChild(label);

    const input = label.querySelector("input");
    input.addEventListener("change", () => {
      selectedCity = input.checked ? input.value : null;
      continueCity.disabled = !selectedCity;
      applyCityCopy();
    });

    if (preserve && previousCity === city.id) {
      input.checked = true;
      selectedCity = previousCity;
      continueCity.disabled = false;
    }
  }

  function showView(name) {
    viewEntry.hidden = name !== "entry";
    viewCountry.hidden = name !== "country";
    viewCity.hidden = name !== "city";
    viewLocation.hidden = name !== "location";
    viewBoundary.hidden = name !== "boundary";
    document.title = titles[name] || titles.entry;
    document.body.classList.toggle("page-country", name === "country");
    document.body.classList.toggle("page-city", name === "city");
    document.body.classList.toggle("page-location", name === "location");
    document.body.classList.toggle("page-boundary", name === "boundary");

    if (name === "city") {
      applyCityCopy();
    }

    if (name === "location") {
      applyLocationCopy();
      syncLocationState();
    }

    if (name === "boundary") {
      if (selectedCountry && selectedCity) {
        boundaryMeta.hidden = false;
        boundaryMeta.textContent =
          "Selected: " +
          selectedCountry +
          " · " +
          selectedCity +
          (locationVerified ? " · verified (mock)" : "");
      } else {
        boundaryMeta.hidden = true;
        boundaryMeta.textContent = "";
      }
    }
  }

  function go(route) {
    if (route === "city" && !selectedCountry) {
      route = "country";
    }
    if (
      (route === "location" || route === "boundary") &&
      (!selectedCountry || !selectedCity)
    ) {
      route = selectedCountry ? "city" : "country";
    }
    if (route === "boundary" && !locationVerified) {
      route = "location";
    }

    if (route === "entry") {
      const base = window.location.href.split("#")[0];
      if (window.location.hash) {
        history.pushState(null, "", base);
      }
      showView("entry");
      return;
    }

    const target = "#/" + route;
    if (window.location.hash !== target) {
      window.location.hash = "/" + route;
    }
    showView(route);
  }

  function syncCountryContinue() {
    const chosen = countryInputs.find((input) => input.checked);
    const nextCountry = chosen ? chosen.value : null;
    if (nextCountry !== selectedCountry) {
      selectedCountry = nextCountry;
      selectedCity = null;
      locationVerified = false;
      renderCityOptions();
    } else {
      selectedCountry = nextCountry;
    }
    continueCountry.disabled = !selectedCountry;
  }

  function ensureCityOptions(preserveSelection) {
    if (!selectedCountry) return;
    if (cityOptions.childElementCount === 0) {
      renderCityOptions({ preserveSelection: !!preserveSelection });
    } else if (preserveSelection && selectedCity) {
      const input = cityOptions.querySelector(
        'input[value="' + selectedCity + '"]'
      );
      if (input) {
        input.checked = true;
        continueCity.disabled = false;
      }
    }
  }

  function render() {
    const route = parseRoute();
    if (
      (route === "city" || route === "location" || route === "boundary") &&
      !selectedCountry
    ) {
      syncCountryContinue();
    }
    if (route === "city") {
      ensureCityOptions(true);
    }
    if (route === "city" && !selectedCountry) {
      go("country");
      return;
    }
    if (
      (route === "location" || route === "boundary") &&
      (!selectedCountry || !selectedCity)
    ) {
      go(selectedCountry ? "city" : "country");
      return;
    }
    showView(route);
  }

  const focusableSelector =
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return Array.from(sheet.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
    );
  }

  function openSheet() {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = sheet.querySelector(".sheet__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  learnMoreButton.addEventListener("click", openSheet);
  sheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-sheet]")) closeSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) {
      event.preventDefault();
      closeSheet();
      return;
    }
    if (event.key !== "Tab" || sheet.hidden) return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  enterButton.addEventListener("click", () => {
    closeSheet();
    go("country");
  });

  countryBack.addEventListener("click", () => {
    go("entry");
  });

  countryInputs.forEach((input) => {
    input.addEventListener("change", syncCountryContinue);
  });

  continueCountry.addEventListener("click", () => {
    if (!selectedCountry) return;
    locationVerified = false;
    renderCityOptions();
    applyCityCopy();
    go("city");
  });

  cityBack.addEventListener("click", () => {
    go("country");
  });

  continueCity.addEventListener("click", () => {
    if (!selectedCountry || !selectedCity) return;
    locationVerified = false;
    go("location");
  });

  locationBack.addEventListener("click", () => {
    ensureCityOptions(true);
    go("city");
  });

  locationVerify.addEventListener("click", () => {
    // Mock-only verification. No device location access or network calls.
    locationVerified = true;
    applyLocationCopy();
    syncLocationState();
  });

  locationContinue.addEventListener("click", () => {
    if (!locationVerified) return;
    go("boundary");
  });

  boundaryBack.addEventListener("click", () => {
    go("location");
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", render);
  syncCountryContinue();
  render();
})();
