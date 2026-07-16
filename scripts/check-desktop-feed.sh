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

echo "== Prior product preserved =="
require_file "index.html"
require_contains "index.html" "view-feed"
require_contains "index.html" "signal-detail"
require_contains "index.html" "view-active"
require_contains "index.html" "membership-invite"
require_contains "script.js" "milano-signal-1"
require_contains "script.js" "milano-signal-2"
require_contains "script.js" "milano-signal-3"
require_contains "script.js" "munich-signal-1"
require_contains "script.js" "munich-signal-2"
require_contains "script.js" "munich-signal-3"

echo "== Desktop feed structure =="
require_contains "index.html" "feed-area"
require_contains "index.html" "feed-open-signal"
require_contains "index.html" "feed-prev"
require_contains "index.html" "feed-next"
require_contains "index.html" "feed-pager"
require_contains "script.js" "feedArea"
require_contains "script.js" "observedDate || scene.observedTime"
require_contains "styles.css" "Desktop Feed Experience V1"
require_contains "styles.css" "#f4efe6"
require_contains "styles.css" "min-width: 960px"

echo "== Guardrails =="
if grep -Eiq 'infinite scroll|IntersectionObserver|dashboard|followers|trending|fetch\(|XMLHttpRequest|localStorage|sessionStorage|Screen 14|view-screen-14' index.html script.js; then
  echo "FAIL: forbidden pattern present"
  fail=1
else
  echo "OK: no infinite scroll, dashboard, backend, or later screen"
fi

echo "== Smoke =="
python3 - <<'PY'
from pathlib import Path
import re

html = Path("index.html").read_text(encoding="utf-8")
js = Path("script.js").read_text(encoding="utf-8")
css = Path("styles.css").read_text(encoding="utf-8")

for fragment in (
    'id="feed-area"',
    'id="feed-community"',
    'id="feed-headline"',
    'id="feed-summary"',
    'id="feed-meta"',
    'id="signal-detail"',
):
    if fragment not in html:
        raise SystemExit(f"Missing HTML: {fragment}")

if "feedArea.textContent = scene.area" not in js:
    raise SystemExit("Missing feed area wiring")

# Exactly three scenes per city preserved
for city in ("Milano", "Munich"):
    block = re.search(rf"{city}:\s*\[(.*?)\n\s*\],", js, re.S)
    if not block:
        raise SystemExit(f"Missing city block {city}")
    ids = re.findall(r'id:\s*"[^"]+"', block.group(1))
    if len(ids) != 3:
        raise SystemExit(f"{city} must keep exactly 3 scenes, found {len(ids)}")

if "Desktop Feed Experience V1" not in css:
    raise SystemExit("Missing desktop feed CSS marker")
if "@media (min-width: 960px)" not in css:
    raise SystemExit("Missing desktop breakpoint")
if "linear-gradient(\n        90deg," not in css and "90deg," not in css:
    raise SystemExit("Missing left-weighted desktop veil")

print("OK: Desktop Feed Experience V1 structure present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
