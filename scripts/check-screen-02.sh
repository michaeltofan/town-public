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
require_contains "script.js" "country.html"

echo "== Screen 02 structural checks =="
require_file "country.html"
require_file "country.js"
require_file "screen-03-boundary.html"
require_file "assets/flags/italy.png"
require_file "assets/flags/germany.png"

require_contains "country.html" "Choose your country"
require_contains "country.html" "real local community"
require_contains "country.html" "Italy"
require_contains "country.html" "Germany"
require_contains "country.html" "Continue"
require_contains "country.html" "Back"
require_contains "country.html" 'disabled'
require_contains "screen-03-boundary.html" "Screen 03 boundary"

echo "== Guardrails =="
if grep -qiE 'select city|city selection' country.html country.js; then
  echo "FAIL: city selection appears in Screen 02 implementation"
  fail=1
else
  echo "OK: no city selection in Screen 02"
fi

for pattern in Stripe pricing followers trending dashboard; do
  if grep -Fqi "$pattern" country.html country.js screen-03-boundary.html; then
    echo "FAIL: forbidden pattern in Screen 02 files: $pattern"
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

for name in ("index.html", "country.html", "screen-03-boundary.html"):
    html = Path(name).read_text(encoding="utf-8")
    Checker().feed(html)
    Checker().close()
    print(f"OK: {name} parsed")

country = Path("country.html").read_text(encoding="utf-8")
for fragment in ("Italy", "Germany", "Continue", "country-italy", "country-germany"):
    if fragment not in country:
        raise SystemExit(f"Missing fragment in country.html: {fragment}")
print("OK: country.html required fragments present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
