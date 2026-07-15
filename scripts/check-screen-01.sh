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

echo "== Screen 01 structural checks =="
require_file "index.html"
require_file "styles.css"
require_file "script.js"
require_file "assets/welcome-street.png"

require_contains "index.html" "TOWN"
require_contains "index.html" "Return to your real local community."
require_contains "index.html" "Enter My Town"
require_contains "index.html" "Learn more"
require_contains "index.html" "account"
require_contains "index.html" "confirmed location"
require_contains "index.html" "active membership"
require_contains "index.html" "What is TOWN?"

# Guardrails: unfinished journey / marketing patterns must not appear
forbidden_patterns=(
  "Select Country"
  "Select City"
  "Stripe"
  "pricing"
  "followers"
  "trending"
  "dashboard"
  "phone mockup"
)

screen_files=(index.html styles.css script.js README.md)
for pattern in "${forbidden_patterns[@]}"; do
  hit=0
  for file in "${screen_files[@]}"; do
    if grep -Fqi "$pattern" "$file"; then
      echo "FAIL: forbidden pattern present in $file: $pattern"
      hit=1
      fail=1
    fi
  done
  if [[ "$hit" -eq 0 ]]; then
    echo "OK: no forbidden pattern '$pattern'"
  fi
done

echo "== HTML well-formed smoke =="
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Checker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.errors = []
    def error(self, message):
        self.errors.append(message)

html = Path("index.html").read_text(encoding="utf-8")
parser = Checker()
parser.feed(html)
parser.close()
if parser.errors:
    raise SystemExit("HTML parse issues: " + "; ".join(parser.errors))
required = ["TOWN", "Enter My Town", "Learn more", "assets/welcome-street.png"]
missing = [r for r in required if r not in html]
if missing:
    raise SystemExit("Missing required markup fragments: " + ", ".join(missing))
print("OK: index.html parsed and required fragments present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
