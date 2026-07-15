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
require_contains "index.html" "view-membership"

echo "== Screen 07 structural checks =="
require_file "script.js"
require_contains "index.html" "view-account"
require_contains "index.html" "account-continue"
require_contains "index.html" "account-back"
require_contains "index.html" "Screen 08 boundary"
require_contains "script.js" "ACCOUNT_COPY"
require_contains "script.js" "Crea il tuo account TOWN."
require_contains "script.js" "Erstelle dein TOWN-Konto."
require_contains "script.js" "applyAccountCopy"
require_contains "script.js" 'go("account")'
require_contains "script.js" 'go("boundary")'

echo "== Guardrails =="
if grep -Eiq 'Stripe|card number|paymentIntent|type="password"|type="email"|passkey|dashboard|followers|trending' index.html script.js; then
  echo "FAIL: forbidden account/payment/social pattern present"
  fail=1
else
  echo "OK: no email/password fields or payment/social patterns"
fi
if grep -Eiq '<input[^>]+(email|password)|inputmode="email"' index.html; then
  echo "FAIL: account data input present on Screen 07"
  fail=1
else
  echo "OK: no account data inputs"
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
    "view-account",
    "account-label",
    "account-why-list",
    "account-privacy",
    "account-prototype",
    "Screen 08 boundary",
    "boundary-back",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACCOUNT PERSONALE",
    "PERSÖNLICHES KONTO",
    "non è richiesta una password",
    "kein Passwort erforderlich",
    "sistema reale di account non è attivo",
    "reale Kontosystem nicht aktiv",
    "Confine Screen 08",
    "Screen-08-Grenze",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 07 account setup introduction present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
