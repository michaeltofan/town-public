/**
 * Deterministic tests for TownFeedNavigation pure helpers.
 * Exercises the same production module loaded by the feed.
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
  assert(ok, message + " (expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual) + ")");
}

// --- Swipe ---
assertEqual(nav.classifySwipe(0, -80), "next", "upward swipe moves to next story");
assertEqual(nav.classifySwipe(0, 80), "previous", "downward swipe returns to previous story");
assertEqual(nav.classifySwipe(0, -20), null, "small touch movement does not navigate");
assertEqual(nav.classifySwipe(0, 20), null, "small downward touch movement does not navigate");
assertEqual(nav.classifySwipe(70, -80), null, "diagonal movement does not accidentally navigate");
assertEqual(nav.classifySwipe(-70, 80), null, "diagonal downward movement does not navigate");

// --- Wheel / trackpad ---
{
  let state = nav.accumulateWheel(0, 60);
  assertEqual(state.direction, "next", "downward wheel intent advances one story");
  assertEqual(state.accumulator, 0, "wheel accumulator resets after navigation");
}
{
  let state = nav.accumulateWheel(0, 20);
  assertEqual(state.direction, null, "sub-threshold wheel does not navigate yet");
  state = nav.accumulateWheel(state.accumulator, 20);
  assertEqual(state.direction, null, "second small wheel still below threshold");
  state = nav.accumulateWheel(state.accumulator, 20);
  assertEqual(state.direction, "next", "accumulated wheel crosses threshold once");
}
{
  // Momentum: after a navigation, further deltas in a fresh accumulator must
  // not skip an extra story without re-crossing the threshold.
  let state = nav.accumulateWheel(0, 120);
  assertEqual(state.direction, "next", "large wheel delta advances exactly one story");
  state = nav.accumulateWheel(0, 30);
  assertEqual(state.direction, null, "trackpad/wheel momentum does not skip two stories");
  state = nav.accumulateWheel(state.accumulator, 10);
  assertEqual(state.direction, null, "continued momentum remains below a fresh threshold");
}
{
  let state = nav.accumulateWheel(0, 5);
  assertEqual(state.direction, null, "tiny wheel delta ignored");
  assertEqual(state.accumulator, 0, "tiny wheel delta does not accumulate");
}
{
  let state = nav.accumulateWheel(0, -60);
  assertEqual(state.direction, "previous", "upward wheel intent returns one story");
}

// --- Keyboard ---
assertEqual(nav.keyboardAction("ArrowDown"), "next", "ArrowDown navigates next");
assertEqual(nav.keyboardAction("ArrowUp"), "previous", "ArrowUp navigates previous");
assertEqual(nav.keyboardAction("PageDown"), "next", "PageDown navigates next");
assertEqual(nav.keyboardAction("PageUp"), "previous", "PageUp navigates previous");
assertEqual(nav.keyboardAction("Home"), "first", "Home reaches first story");
assertEqual(nav.keyboardAction("End"), "last", "End reaches last story");
assertEqual(nav.keyboardAction(" "), "next", "Space navigates next");
assertEqual(nav.keyboardAction(" "), "next", "Spacebar alias covered via space");

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

// --- Boundaries (no wrap) ---
assertEqual(nav.nextIndex(0, 3, -1), null, "first boundary does not wrap on previous");
assertEqual(nav.nextIndex(2, 3, 1), null, "last boundary does not wrap on next");
assertEqual(nav.nextIndex(0, 3, 1), 1, "from first, next advances to story 2");
assertEqual(nav.nextIndex(1, 3, -1), 0, "from second, previous returns to story 1");
assertEqual(nav.resolveTargetIndex(1, 3, { type: "absolute", value: 0 }), 0, "Home maps to first index");
assertEqual(nav.resolveTargetIndex(1, 3, { type: "absolute", value: 2 }), 2, "End maps to last index");
assertEqual(nav.resolveTargetIndex(0, 3, { type: "absolute", value: 0 }), null, "Home on first is a no-op");
assertEqual(nav.resolveTargetIndex(2, 3, { type: "absolute", value: 2 }), null, "End on last is a no-op");

// --- Previous / Next button deltas stay on shared resolver ---
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

// --- Counter / content sync helper: clamp keeps pager math honest ---
assertEqual(nav.clampIndex(-2, 3), 0, "clamp keeps counter at first story");
assertEqual(nav.clampIndex(9, 3), 2, "clamp keeps counter at last story");

// --- Reduced motion lock still allows navigation (shorter lock only) ---
assertEqual(nav.lockDurationMs(true), nav.NAV_LOCK_REDUCED_MS, "reduced-motion uses short lock");
assertEqual(nav.lockDurationMs(false), nav.NAV_LOCK_MS, "default motion uses full lock");
{
  let t = 1000;
  const lock = nav.createNavLock(() => t);
  assert(!lock.isLocked(), "nav lock starts unlocked");
  lock.lock(nav.lockDurationMs(true));
  assert(lock.isLocked(), "reduced-motion lock engages");
  t += nav.NAV_LOCK_REDUCED_MS + 1;
  assert(!lock.isLocked(), "reduced-motion lock releases and navigation can continue");
}

if (failed) {
  console.error("FEED NAVIGATION TESTS FAILED: " + failed + " failure(s), " + passed + " passed");
  process.exit(1);
}
console.log("FEED NAVIGATION TESTS PASSED: " + passed + " assertions");
