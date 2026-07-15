(() => {
  const learnMoreButton = document.getElementById("learn-more");
  const enterButton = document.getElementById("enter-town");
  const sheet = document.getElementById("learn-more-sheet");
  const accessNote = document.getElementById("access-note");

  if (!learnMoreButton || !enterButton || !sheet || !accessNote) {
    return;
  }

  let lastFocus = null;
  let noteTimer = null;

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
    const focusable = getFocusable();
    (focusable[0] || sheet.querySelector(".sheet__panel")).focus?.();
    const closeBtn = sheet.querySelector(".sheet__close");
    if (closeBtn) {
      closeBtn.focus();
    }
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
    if (event.target.closest("[data-close-sheet]")) {
      closeSheet();
    }
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

  // Primary action stays on Screen 01 — no later journey screens.
  enterButton.addEventListener("click", () => {
    accessNote.classList.add("is-emphasized");
    accessNote.setAttribute("tabindex", "-1");
    accessNote.focus({ preventScroll: false });
    accessNote.scrollIntoView({ block: "nearest", behavior: "smooth" });

    if (noteTimer) {
      clearTimeout(noteTimer);
    }
    noteTimer = setTimeout(() => {
      accessNote.classList.remove("is-emphasized");
      accessNote.removeAttribute("tabindex");
    }, 3200);
  });
})();
