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
require_contains "index.html" "Enter My Town"

echo "== Screen 03 structural checks =="
require_file "script.js"
require_file "assets/cities/milano.png"
require_file "assets/cities/munich.png"
require_contains "index.html" "view-city"
require_contains "index.html" "Choose your city"
require_contains "index.html" "one verified local community"
require_contains "index.html" "continue-city"
require_contains "index.html" "view-location"
require_contains "script.js" "Milano"
require_contains "script.js" "Munich"
require_contains "script.js" "Seleziona la tua città"
require_contains "script.js" "Wähle deine Stadt"
require_contains "script.js" "Continua"
require_contains "script.js" "Weiter"
require_contains "script.js" 'go("city")'
require_contains "script.js" 'go("boundary")'

echo "== Guardrails =="
if grep -qiE 'followers|trending|dashboard' index.html script.js; then
  echo "FAIL: forbidden implementation pattern present"
  fail=1
else
  echo "OK: no forbidden later-screen / social patterns"
fi

if grep -qiE 'language selector|language menu|choose language' index.html script.js; then
  echo "FAIL: language selector present"
  fail=1
else
  echo "OK: no language selector"
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
    "view-boundary",
    "view-location",
    "continue-city",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in ("Italy", "Germany", "Milano", "Munich", "Indietro", "Zurück"):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 03 markup and language copy present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
