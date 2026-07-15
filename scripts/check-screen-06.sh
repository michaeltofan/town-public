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
require_contains "index.html" "view-city"
require_contains "index.html" "view-location"
require_contains "index.html" "view-feed"

echo "== Screen 06 structural checks =="
require_file "script.js"
require_contains "index.html" "membership-invite"
require_contains "index.html" "view-membership"
require_contains "index.html" "view-ended"
require_contains "index.html" "Screen 07 boundary"
require_contains "script.js" "MEMBERSHIP_COPY"
require_contains "script.js" "Ti sta a cuore"
require_contains "script.js" "Dir ist wichtig"
require_contains "script.js" "€12"
require_contains "script.js" "openInvite"
require_contains "script.js" 'go("membership")'
require_contains "script.js" 'go("ended")'

echo "== Guardrails =="
if grep -Eiq 'Stripe|card number|paymentIntent|passkey|email verification|password|dashboard|followers|trending' index.html script.js; then
  echo "FAIL: forbidden account/payment/social pattern present"
  fail=1
else
  echo "OK: no account/payment/social patterns"
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
    "membership-invite",
    "view-membership",
    "view-ended",
    "Screen 07 boundary",
    "invite-continue",
    "membership-not-now",
    "ended-return",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "Non ora",
    "Noch nicht",
    "Torna all’ingresso TOWN",
    "Zurück zum TOWN-Eingang",
    "MEMBERSHIP LOCALE",
    "LOKALE MITGLIEDSCHAFT",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 06 membership invitation present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
