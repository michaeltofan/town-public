(() => {
  const viewEntry = document.getElementById("view-entry");
  const viewCountry = document.getElementById("view-country");
  const viewBoundary = document.getElementById("view-boundary");
  const learnMoreButton = document.getElementById("learn-more");
  const enterButton = document.getElementById("enter-town");
  const sheet = document.getElementById("learn-more-sheet");
  const continueButton = document.getElementById("continue-country");
  const countryBack = document.getElementById("country-back");
  const boundaryBack = document.getElementById("boundary-back");
  const boundaryCountry = document.getElementById("boundary-country");
  const countryInputs = Array.from(
    document.querySelectorAll('input[name="country"]')
  );

  if (
    !viewEntry ||
    !viewCountry ||
    !viewBoundary ||
    !learnMoreButton ||
    !enterButton ||
    !sheet ||
    !continueButton ||
    !countryBack ||
    !boundaryBack ||
    !boundaryCountry
  ) {
    return;
  }

  let lastFocus = null;
  let selectedCountry = null;

  const titles = {
    entry: "TOWN — Entry",
    country: "TOWN — Choose your country",
    boundary: "TOWN — Screen 03 boundary",
  };

  function parseRoute() {
    const raw = window.location.hash.replace(/^#\/?/, "");
    if (raw.startsWith("country")) return "country";
    if (raw.startsWith("boundary")) return "boundary";
    return "entry";
  }

  function showView(name) {
    viewEntry.hidden = name !== "entry";
    viewCountry.hidden = name !== "country";
    viewBoundary.hidden = name !== "boundary";
    document.title = titles[name] || titles.entry;
    document.body.classList.toggle("page-country", name === "country");
    document.body.classList.toggle("page-boundary", name === "boundary");

    if (name === "boundary") {
      if (selectedCountry) {
        boundaryCountry.hidden = false;
        boundaryCountry.textContent = "Selected country: " + selectedCountry;
      } else {
        boundaryCountry.hidden = true;
        boundaryCountry.textContent = "";
      }
    }
  }

  function go(route) {
    if (route === "entry") {
      if (window.location.hash) {
        history.pushState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      showView("entry");
      return;
    }

    const hash = "#/" + route;
    if (window.location.hash !== hash) {
      window.location.hash = "/" + route;
    } else {
      showView(route);
    }
  }

  function syncContinue() {
    const chosen = countryInputs.find((input) => input.checked);
    selectedCountry = chosen ? chosen.value : null;
    continueButton.disabled = !selectedCountry;
  }

  function render() {
    showView(parseRoute());
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
    input.addEventListener("change", syncContinue);
  });

  continueButton.addEventListener("click", () => {
    if (!selectedCountry) return;
    go("boundary");
  });

  boundaryBack.addEventListener("click", () => {
    go("country");
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", render);
  syncContinue();
  render();
})();
