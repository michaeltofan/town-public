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

echo "== Prior screens preserved =="
require_file "index.html"
require_contains "index.html" "Return to your real local community."
require_contains "index.html" "Choose your country"
require_contains "index.html" "Choose your city"
require_contains "index.html" "view-city"

echo "== Screen 04 structural checks =="
require_file "script.js"
require_contains "index.html" "view-location"
require_contains "index.html" "location-verify"
require_contains "index.html" "location-success"
require_contains "index.html" "location-outside"
require_contains "index.html" "location-message"
require_contains "index.html" "view-feed"
require_contains "script.js" "Verifica la posizione"
require_contains "script.js" "Standort prüfen"
require_contains "script.js" "Conferma la tua comunità locale"
require_contains "script.js" "Bestätige deine lokale Gemeinschaft"
require_contains "script.js" "locationVerified"
require_contains "script.js" 'go("location")'
require_contains "script.js" "navigator.geolocation"
require_contains "script.js" "getCurrentPosition"
require_contains "script.js" "non vengono inviate né memorizzate"
require_contains "script.js" "viola i Termini di utilizzo"
require_contains "script.js" "non è ancora disponibile"
require_contains "script.js" "assets/boundaries/milano_boundary_simplified.geojson"
require_contains "script.js" "assets/boundaries/munich_boundary_simplified.geojson"
require_contains "script.js" "assets/boundaries/arad_boundary_simplified.geojson"
require_file "assets/boundaries/.gitkeep"

echo "== Guardrails =="
if ! grep -Fq 'navigator.geolocation' script.js; then
  echo "FAIL: intended navigator.geolocation usage missing"
  fail=1
else
  echo "OK: navigator.geolocation present"
fi

if ! grep -Fq 'getCurrentPosition' script.js; then
  echo "FAIL: intended getCurrentPosition usage missing"
  fail=1
else
  echo "OK: getCurrentPosition present"
fi

if grep -Eiq 'watchPosition' index.html script.js; then
  echo "FAIL: watchPosition continuous tracking present"
  fail=1
else
  echo "OK: no watchPosition usage"
fi

if grep -Eiq 'language selector|language menu|followers|trending|dashboard|feed is implemented' index.html script.js; then
  echo "FAIL: forbidden pattern present"
  fail=1
else
  echo "OK: no forbidden patterns"
fi

echo "== HTML smoke =="
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Checker(HTMLParser):
    def error(self, message):
        raise SystemExit(message)

html = Path("index.html").read_text(encoding="utf-8")
Checker().feed(html)
Checker().close()
for fragment in (
    "view-entry",
    "view-country",
    "view-city",
    "view-location",
    "view-feed",
    "location-verify",
    "location-outside",
    "location-message",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "Posizione verificata per",
    "Standort für",
    "Verifica la posizione",
    "Standort prüfen",
    "viola i Termini di utilizzo",
    "non è ancora disponibile",
    "locationVerified = true",
    "navigator.geolocation",
    "getCurrentPosition",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")

if "watchPosition" in js or "watchPosition" in html:
    raise SystemExit("watchPosition must not be present")
if "Mock-only verification" in js:
    raise SystemExit("Mock-only verification must be removed")
if "Simula la verifica" in js:
    raise SystemExit("Mock verify CTA must be removed")
print("OK: Screen 04 markup and copy present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
