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

echo "== Feed navigation files =="
require_file "feed-navigation.js"
require_file "script.js"
require_file "index.html"
require_file "styles.css"
require_file "scripts/test-feed-navigation.js"

echo "== Production wiring =="
require_contains "index.html" 'src="feed-navigation.js"'
require_contains "script.js" 'TownFeedNavigation'
require_contains "script.js" "navigateFeedTo"
require_contains "script.js" "navigateFeedByIntent"
require_contains "script.js" "preloadAdjacentFeedImages"
require_contains "script.js" '"wheel"'
require_contains "script.js" 'addEventListener("pointerdown"'
require_contains "script.js" "keyboardAction"
require_contains "script.js" "classifySwipe"
require_contains "script.js" "accumulateWheel"
require_contains "script.js" "prefers-reduced-motion"
require_contains "styles.css" "touch-action"
require_contains "styles.css" "feed--nav-from-next"
require_contains "styles.css" "prefers-reduced-motion"

echo "== Guardrails (finite discrete nav only) =="
if grep -Eiq 'IntersectionObserver|endless feed|infinite.?scroll' index.html script.js feed-navigation.js; then
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

# Wheel is allowed only as discrete one-story navigation through TownFeedNavigation.
if grep -q '"wheel"' script.js && ! grep -qF 'TownFeedNavigation' script.js; then
  echo "FAIL: wheel listener must use discrete TownFeedNavigation"
  fail=1
fi

echo "== Shared prev/next path =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
if "function navigateFeedTo(" not in js:
    raise SystemExit("Missing shared navigateFeedTo")
if "feedPrev.addEventListener(\"click\"" not in js:
    raise SystemExit("Missing Previous click handler")
if "feedNext.addEventListener(\"click\"" not in js:
    raise SystemExit("Missing Next click handler")
# Prev/Next must call the shared navigator, not mutate feedIndex inline alone.
prev_block = re.search(
    r'feedPrev\.addEventListener\("click",\s*\(\)\s*=>\s*\{(.*?)\}\);',
    js,
    re.S,
)
next_block = re.search(
    r'feedNext\.addEventListener\("click",\s*\(\)\s*=>\s*\{(.*?)\}\);',
    js,
    re.S,
)
if not prev_block or "navigateFeedByIntent" not in prev_block.group(1):
    raise SystemExit("Previous must use navigateFeedByIntent")
if not next_block or "navigateFeedByIntent" not in next_block.group(1):
    raise SystemExit("Next must use navigateFeedByIntent")
if "preloadAdjacentFeedImages" not in js:
    raise SystemExit("Missing adjacent image preload")
if '"wheel"' not in js or "accumulateWheel" not in js:
    raise SystemExit("Missing discrete wheel navigation wiring")
print("OK: Previous/Next share navigateFeedByIntent; preload and wheel present")
PY

echo "== Deterministic navigation logic =="
node scripts/test-feed-navigation.js

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
