(() => {
  const continueButton = document.getElementById("continue-country");
  const options = Array.from(
    document.querySelectorAll('input[name="country"]')
  );

  if (!continueButton || options.length === 0) {
    return;
  }

  function selectedCountry() {
    const chosen = options.find((input) => input.checked);
    return chosen ? chosen.value : null;
  }

  function syncContinue() {
    const country = selectedCountry();
    continueButton.disabled = !country;
  }

  options.forEach((input) => {
    input.addEventListener("change", syncContinue);
  });

  continueButton.addEventListener("click", () => {
    const country = selectedCountry();
    if (!country) return;
    const url = new URL("screen-03-boundary.html", window.location.href);
    url.searchParams.set("country", country);
    window.location.href = url.href;
  });

  syncContinue();
})();
