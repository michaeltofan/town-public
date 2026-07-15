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

echo "== Screen 01 still present (not redesigned away) =="
require_file "index.html"
require_contains "index.html" "Return to your real local community."
require_contains "index.html" "Enter My Town"
require_contains "index.html" "welcome-street.png"

echo "== Screen 02 structural checks =="
require_file "script.js"
require_file "assets/flags/italy.png"
require_file "assets/flags/germany.png"
require_contains "index.html" "Choose your country"
require_contains "index.html" "real local community"
require_contains "index.html" "Italy"
require_contains "index.html" "Germany"
require_contains "index.html" "country-back"
require_contains "index.html" "continue-country"
require_contains "script.js" 'go("country")'
require_contains "script.js" "location.hash"
require_contains "script.js" "continueCountry.disabled"

echo "== Guardrails =="
for pattern in Stripe pricing followers trending dashboard; do
  if grep -Fqi "$pattern" index.html script.js; then
    echo "FAIL: forbidden pattern: $pattern"
    fail=1
  else
    echo "OK: no forbidden pattern '$pattern'"
  fi
done

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
    "Enter My Town",
    "Choose your country",
    "Italy",
    "Germany",
    "continue-country",
    "view-country",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")
print("OK: index.html parsed with Screen 01 + 02")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
