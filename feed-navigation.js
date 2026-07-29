/**
 * TOWN feed navigation — pure helpers for discrete vertical story movement.
 * Shared by production wiring (script.js) and deterministic checks.
 * No dependencies. Finite discrete scenes only — not an unbounded list.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownFeedNavigation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SWIPE_MIN_DISTANCE = 56;
  const SWIPE_DOMINANCE = 1.55;
  const WHEEL_THRESHOLD = 48;
  const WHEEL_TINY_DELTA = 8;
  const NAV_LOCK_MS = 320;
  const NAV_LOCK_REDUCED_MS = 80;

  /**
   * Clamp an index into [0, length - 1]. Empty lists return 0.
   */
  function clampIndex(index, length) {
    if (!length || length < 1) return 0;
    if (index < 0) return 0;
    if (index > length - 1) return length - 1;
    return index | 0;
  }

  /**
   * Compute the next scene index for a signed step without wrapping.
   * delta > 0 advances; delta < 0 returns. Returns null when unchanged.
   */
  function nextIndex(current, length, delta) {
    if (!length || length < 1) return null;
    const from = clampIndex(current, length);
    if (!delta) return null;
    const target = clampIndex(from + (delta > 0 ? 1 : -1), length);
    return target === from ? null : target;
  }

  /**
   * Classify a completed pointer/touch stroke.
   * Returns: "next" | "previous" | null
   * Upward stroke → next; downward stroke → previous.
   */
  function classifySwipe(dx, dy, options) {
    const minDistance =
      options && options.minDistance != null
        ? options.minDistance
        : SWIPE_MIN_DISTANCE;
    const dominance =
      options && options.dominance != null
        ? options.dominance
        : SWIPE_DOMINANCE;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absY < minDistance) return null;
    if (absY < absX * dominance) return null;
    return dy < 0 ? "next" : "previous";
  }

  /**
   * Fold a wheel/trackpad delta into an accumulator.
   * Returns { accumulator, direction } where direction is "next"|"previous"|null.
   * Downward (positive deltaY) → next; upward → previous.
   */
  function accumulateWheel(accumulator, deltaY, options) {
    const tiny =
      options && options.tinyDelta != null
        ? options.tinyDelta
        : WHEEL_TINY_DELTA;
    const threshold =
      options && options.threshold != null
        ? options.threshold
        : WHEEL_THRESHOLD;
    if (!deltaY || Math.abs(deltaY) < tiny) {
      return { accumulator: accumulator, direction: null };
    }
    // Direction change resets accumulation so opposite gestures do not cancel oddly.
    if (accumulator !== 0 && Math.sign(accumulator) !== Math.sign(deltaY)) {
      accumulator = 0;
    }
    accumulator += deltaY;
    if (Math.abs(accumulator) < threshold) {
      return { accumulator: accumulator, direction: null };
    }
    const direction = accumulator > 0 ? "next" : "previous";
    return { accumulator: 0, direction: direction };
  }

  /**
   * Map a keyboard event-like object to a feed action.
   * Returns: "next" | "previous" | "first" | "last" | null
   */
  function keyboardAction(key, options) {
    const spaceNext = !(options && options.spaceNext === false);
    switch (key) {
      case "ArrowDown":
      case "PageDown":
        return "next";
      case "ArrowUp":
      case "PageUp":
        return "previous";
      case "Home":
        return "first";
      case "End":
        return "last";
      case " ":
      case "Spacebar":
      case "Space":
        return spaceNext ? "next" : null;
      default:
        return null;
    }
  }

  /**
   * True when keyboard navigation should yield to the focused control.
   * Accepts a tagName + optional flags so Node tests need no DOM.
   */
  function isInteractiveFocusTarget(target) {
    if (!target) return false;
    if (target.isContentEditable) return true;
    const tag = String(target.tagName || "").toUpperCase();
    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      tag === "BUTTON" ||
      tag === "A"
    ) {
      return true;
    }
    if (target.closest) {
      return !!target.closest(
        'button, a, input, textarea, select, [contenteditable="true"], [role="button"], [role="link"], [role="textbox"]'
      );
    }
    return false;
  }

  function directionToDelta(direction) {
    if (direction === "next") return 1;
    if (direction === "previous") return -1;
    return 0;
  }

  function lockDurationMs(prefersReducedMotion) {
    return prefersReducedMotion ? NAV_LOCK_REDUCED_MS : NAV_LOCK_MS;
  }

  /**
   * Minimal lock/cooldown state machine for one-story-per-gesture.
   */
  function createNavLock(nowFn) {
    const now = typeof nowFn === "function" ? nowFn : () => Date.now();
    let until = 0;
    return {
      isLocked: function () {
        return now() < until;
      },
      lock: function (ms) {
        until = now() + Math.max(0, ms || 0);
      },
      unlock: function () {
        until = 0;
      },
    };
  }

  /**
   * Resolve a navigation intent into a clamped target index.
   * intent: { type: "delta"|"absolute", value }
   */
  function resolveTargetIndex(current, length, intent) {
    if (!length || length < 1) return null;
    if (!intent) return null;
    if (intent.type === "absolute") {
      const target = clampIndex(intent.value, length);
      return target === clampIndex(current, length) ? null : target;
    }
    if (intent.type === "delta") {
      return nextIndex(current, length, intent.value);
    }
    if (intent.type === "direction") {
      return nextIndex(current, length, directionToDelta(intent.value));
    }
    return null;
  }

  return {
    SWIPE_MIN_DISTANCE: SWIPE_MIN_DISTANCE,
    SWIPE_DOMINANCE: SWIPE_DOMINANCE,
    WHEEL_THRESHOLD: WHEEL_THRESHOLD,
    WHEEL_TINY_DELTA: WHEEL_TINY_DELTA,
    NAV_LOCK_MS: NAV_LOCK_MS,
    NAV_LOCK_REDUCED_MS: NAV_LOCK_REDUCED_MS,
    clampIndex: clampIndex,
    nextIndex: nextIndex,
    classifySwipe: classifySwipe,
    accumulateWheel: accumulateWheel,
    keyboardAction: keyboardAction,
    isInteractiveFocusTarget: isInteractiveFocusTarget,
    directionToDelta: directionToDelta,
    lockDurationMs: lockDurationMs,
    createNavLock: createNavLock,
    resolveTargetIndex: resolveTargetIndex,
  };
});
