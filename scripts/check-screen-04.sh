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
require_contains "index.html" "view-feed"
require_contains "script.js" "Simula la verifica"
require_contains "script.js" "Prüfung simulieren"
require_contains "script.js" "Conferma la tua comunità locale"
require_contains "script.js" "Bestätige deine lokale Gemeinschaft"
require_contains "script.js" "locationVerified"
require_contains "script.js" 'go("location")'
require_contains "script.js" "Mock-only verification"

echo "== Guardrails =="
if grep -Eiq 'navigator\.geolocation|getCurrentPosition|watchPosition' index.html script.js; then
  echo "FAIL: geolocation API usage present"
  fail=1
else
  echo "OK: no geolocation API usage"
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
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "Posizione verificata per",
    "Standort für",
    "Solo prototipo",
    "Nur Prototyp",
    "locationVerified = true",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 04 markup and copy present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
