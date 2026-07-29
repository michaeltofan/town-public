#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0

require_file() {
  if [[ ! -f "$1" ]]; then
    echo "FAIL: missing required file: $1"
    fail=1
  else
    echo "OK: found $1"
  fi
}

require_contains() {
  local file="$1"
  local pattern="$2"
  if ! grep -qF "$pattern" "$file"; then
    echo "FAIL: '$pattern' not found in $file"
    fail=1
  else
    echo "OK: contains '$pattern'"
  fi
}

require_absent() {
  local file="$1"
  local pattern="$2"
  if grep -qF "$pattern" "$file"; then
    echo "FAIL: obsolete pattern still present: '$pattern' in $file"
    fail=1
  else
    echo "OK: absent obsolete '$pattern'"
  fi
}

echo "== Native feed navigation files =="
require_file "feed-navigation.js"
require_file "script.js"
require_file "index.html"
require_file "styles.css"
require_file "scripts/test-feed-navigation.js"

echo "== Production structure =="
require_contains "index.html" 'id="feed-scroller"'
require_contains "index.html" 'id="feed-panel-template"'
require_contains "index.html" 'class="feed__panel"'
require_contains "index.html" 'id="feed-pager"'
require_contains "script.js" "TownFeedNavigation"
require_contains "script.js" "rebuildFeedPanels"
require_contains "script.js" "scrollFeedToIndex"
require_contains "script.js" "navigateFeedByIntent"
require_contains "script.js" "IntersectionObserver"
require_contains "script.js" "indexFromScrollTop"
require_contains "script.js" "preloadAdjacentFeedImages"
require_contains "script.js" "keyboardAction"
require_contains "script.js" "prefers-reduced-motion"
require_contains "styles.css" "scroll-snap-type: y mandatory"
require_contains "styles.css" "scroll-snap-align: start"
require_contains "styles.css" "overflow-y: auto"
require_contains "styles.css" "touch-action: pan-y"

echo "== Obsolete synthetic mechanism removed =="
require_absent "script.js" "classifySwipe"
require_absent "script.js" "accumulateWheel"
require_absent "script.js" "createNavLock"
require_absent "script.js" "feed--nav-from-next"
require_absent "script.js" 'addEventListener("pointerdown"'
require_absent "feed-navigation.js" "classifySwipe"
require_absent "feed-navigation.js" "accumulateWheel"
require_absent "feed-navigation.js" "NAV_LOCK_MS"
require_absent "styles.css" "feed--nav-from-next"
require_absent "index.html" "feed-prev"
require_absent "index.html" "feed-next"
require_absent "index.html" "feed__scene-nav"
require_absent "styles.css" "feed__scene-nav"
require_absent "styles.css" ".feed__nav"
require_absent "script.js" 'feed-prev'
require_absent "script.js" 'feed-next'
require_absent "script.js" "copy.previous"
require_absent "script.js" "copy.next"

# No synthetic wheel interception / preventDefault navigation.
if grep -n 'preventDefault' script.js | grep -Eiq 'wheel|deltaY|accumulateWheel'; then
  echo "FAIL: wheel preventDefault / synthetic wheel navigation still present"
  fail=1
else
  echo "OK: no synthetic wheel interception"
fi

echo "== Guardrails (finite native scroll only) =="
if grep -Eiq 'infinite.?scroll|endless feed' index.html script.js feed-navigation.js; then
  echo "FAIL: infinite/endless scroll mechanics present"
  fail=1
else
  echo "OK: no infinite scroll mechanics"
fi

if grep -Eiq 'followers|trending|dashboard|comment thread|bookmark' index.html script.js feed-navigation.js; then
  echo "FAIL: forbidden pattern present"
  fail=1
else
  echo "OK: no forbidden engagement patterns"
fi

echo "== Active index + keyboard path =="
python3 - <<'PY'
from pathlib import Path

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")
css = Path("styles.css").read_text(encoding="utf-8")
nav = Path("feed-navigation.js").read_text(encoding="utf-8")

for fragment in (
    "function rebuildFeedPanels(",
    "function scrollFeedToIndex(",
    "function setActiveFeedIndex(",
    "function navigateFeedByIntent(",
    "data-feed-role",
    "feed__panel",
):
    if fragment not in js and fragment not in html:
        raise SystemExit(f"Missing production fragment: {fragment}")

if "scroll-snap-type: y mandatory" not in css:
    raise SystemExit("Missing CSS scroll-snap-type")
if "scroll-snap-align: start" not in css:
    raise SystemExit("Missing CSS scroll-snap-align")
if "touch-action: pan-y" not in css:
    raise SystemExit("Missing touch-action: pan-y")

# Keyboard navigation must remain; visible Previous/Next buttons must be gone.
if "keyboardAction" not in js or "navigateFeedByIntent" not in js:
    raise SystemExit("Keyboard navigation must remain wired through navigateFeedByIntent")
for obsolete in ("feed-prev", "feed-next", "feed__scene-nav", "id=\"feed-prev\"", "id=\"feed-next\""):
    if obsolete in html or obsolete in js:
        # Allow keyboard intent values "previous"/"next" in JS helpers, but not button ids.
        if obsolete in ("feed-prev", "feed-next") and obsolete in js:
            raise SystemExit(f"Visible control wiring still present: {obsolete}")
        if obsolete in html:
            raise SystemExit(f"Visible control markup still present: {obsolete}")

# Rejected synthetic APIs must stay gone from helpers.
for obsolete in ("classifySwipe", "accumulateWheel", "createNavLock", "SWIPE_MIN_DISTANCE", "WHEEL_THRESHOLD"):
    if obsolete in nav:
        raise SystemExit(f"Obsolete helper still exported: {obsolete}")
    if obsolete in js:
        raise SystemExit(f"Obsolete helper still used in script.js: {obsolete}")

# Active index follows scroll / intersection, not content replacement of a single image.
if "feedImage.src = scene.image" in js:
    raise SystemExit("Single-image scene replacement still present")
if "rebuildFeedPanels" not in js:
    raise SystemExit("Missing multi-panel rebuild")

print("OK: native panels, scroll snap, keyboard navigator; visible Prev/Next removed")
PY

echo "== Deterministic navigation helpers =="
node scripts/test-feed-navigation.js

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
