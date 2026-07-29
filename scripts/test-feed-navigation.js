/**
 * Deterministic tests for TownFeedNavigation helpers used by native feed scrolling.
 * Gesture classification / wheel accumulation / nav locks are intentionally absent.
 */
"use strict";

const path = require("path");
const nav = require(path.join(__dirname, "..", "feed-navigation.js"));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
    console.log("OK: " + message);
  } else {
    failed += 1;
    console.error("FAIL: " + message);
  }
}

function assertEqual(actual, expected, message) {
  const ok = Object.is(actual, expected);
  assert(
    ok,
    message +
      " (expected " +
      JSON.stringify(expected) +
      ", got " +
      JSON.stringify(actual) +
      ")"
  );
}

assert(
  typeof nav.classifySwipe !== "function",
  "obsolete classifySwipe is removed"
);
assert(
  typeof nav.accumulateWheel !== "function",
  "obsolete accumulateWheel is removed"
);
assert(
  typeof nav.createNavLock !== "function",
  "obsolete createNavLock is removed"
);

assertEqual(nav.keyboardAction("ArrowDown"), "next", "ArrowDown navigates next");
assertEqual(nav.keyboardAction("ArrowUp"), "previous", "ArrowUp navigates previous");
assertEqual(nav.keyboardAction("PageDown"), "next", "PageDown navigates next");
assertEqual(nav.keyboardAction("PageUp"), "previous", "PageUp navigates previous");
assertEqual(nav.keyboardAction("Home"), "first", "Home reaches first story");
assertEqual(nav.keyboardAction("End"), "last", "End reaches last story");
assertEqual(nav.keyboardAction(" "), "next", "Space navigates next");

assert(
  nav.isInteractiveFocusTarget({ tagName: "INPUT" }),
  "keyboard input inside input is treated as interactive"
);
assert(
  nav.isInteractiveFocusTarget({ tagName: "TEXTAREA" }),
  "keyboard input inside textarea is treated as interactive"
);
assert(
  nav.isInteractiveFocusTarget({ tagName: "BUTTON" }),
  "keyboard input inside button is treated as interactive"
);
assert(
  nav.isInteractiveFocusTarget({ tagName: "A" }),
  "keyboard input inside link is treated as interactive"
);
assert(
  nav.isInteractiveFocusTarget({ tagName: "SELECT" }),
  "keyboard input inside select is treated as interactive"
);
assert(
  nav.isInteractiveFocusTarget({ tagName: "DIV", isContentEditable: true }),
  "keyboard input inside editable element is treated as interactive"
);
assert(
  !nav.isInteractiveFocusTarget({ tagName: "DIV" }),
  "non-interactive focus does not block keyboard navigation"
);

assertEqual(nav.nextIndex(0, 3, -1), null, "first boundary does not wrap on previous");
assertEqual(nav.nextIndex(2, 3, 1), null, "last boundary does not wrap on next");
assertEqual(nav.nextIndex(0, 3, 1), 1, "from first, next advances to story 2");
assertEqual(nav.nextIndex(1, 3, -1), 0, "from second, previous returns to story 1");
assertEqual(
  nav.resolveTargetIndex(1, 3, { type: "absolute", value: 0 }),
  0,
  "Home maps to first index"
);
assertEqual(
  nav.resolveTargetIndex(1, 3, { type: "absolute", value: 2 }),
  2,
  "End maps to last index"
);
assertEqual(
  nav.resolveTargetIndex(0, 3, { type: "delta", value: 1 }),
  1,
  "Next button delta advances one story"
);
assertEqual(
  nav.resolveTargetIndex(1, 3, { type: "delta", value: -1 }),
  0,
  "Previous button delta returns one story"
);

assertEqual(nav.clampIndex(-2, 3), 0, "clamp keeps counter at first story");
assertEqual(nav.clampIndex(9, 3), 2, "clamp keeps counter at last story");

assertEqual(
  nav.indexFromScrollTop(0, 800, 3),
  0,
  "scroll top at first panel selects index 0"
);
assertEqual(
  nav.indexFromScrollTop(800, 800, 3),
  1,
  "scroll top at second panel selects index 1"
);
assertEqual(
  nav.indexFromScrollTop(1600, 800, 3),
  2,
  "scroll top at last panel selects index 2"
);
assertEqual(
  nav.indexFromScrollTop(5000, 800, 3),
  2,
  "overscrolled position clamps to last panel"
);

assertEqual(
  nav.programmaticScrollBehavior(true),
  "auto",
  "reduced-motion uses instant programmatic scroll"
);
assertEqual(
  nav.programmaticScrollBehavior(false),
  "smooth",
  "default motion may use smooth programmatic scroll"
);

if (failed) {
  console.error(
    "FEED NAVIGATION TESTS FAILED: " + failed + " failure(s), " + passed + " passed"
  );
  process.exit(1);
}
console.log("FEED NAVIGATION TESTS PASSED: " + passed + " assertions");
