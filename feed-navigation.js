/**
 * TOWN feed navigation helpers — keyboard mapping and index math only.
 * Motion is browser-native scrolling + CSS scroll snap (not synthetic gestures).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownFeedNavigation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function clampIndex(index, length) {
    if (!length || length < 1) return 0;
    if (index < 0) return 0;
    if (index > length - 1) return length - 1;
    return index | 0;
  }

  function nextIndex(current, length, delta) {
    if (!length || length < 1) return null;
    const from = clampIndex(current, length);
    if (!delta) return null;
    const target = clampIndex(from + (delta > 0 ? 1 : -1), length);
    return target === from ? null : target;
  }

  function keyboardAction(key) {
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
        return "next";
      default:
        return null;
    }
  }

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
      const delta = intent.value === "next" ? 1 : intent.value === "previous" ? -1 : 0;
      return nextIndex(current, length, delta);
    }
    return null;
  }

  /**
   * Nearest panel index from scroll position (deterministic fallback).
   */
  function indexFromScrollTop(scrollTop, viewportHeight, length) {
    if (!length || length < 1 || !viewportHeight) return 0;
    const raw = Math.round(scrollTop / viewportHeight);
    return clampIndex(raw, length);
  }

  function programmaticScrollBehavior(prefersReducedMotion) {
    return prefersReducedMotion ? "auto" : "smooth";
  }

  return {
    clampIndex: clampIndex,
    nextIndex: nextIndex,
    keyboardAction: keyboardAction,
    isInteractiveFocusTarget: isInteractiveFocusTarget,
    resolveTargetIndex: resolveTargetIndex,
    indexFromScrollTop: indexFromScrollTop,
    programmaticScrollBehavior: programmaticScrollBehavior,
  };
});
