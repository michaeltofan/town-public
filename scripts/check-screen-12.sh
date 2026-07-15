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
require_contains "index.html" "view-ready"
require_contains "index.html" "view-passkey"
require_contains "index.html" "view-code"

echo "== Screen 12 structural checks =="
require_file "script.js"
require_contains "index.html" "view-payment"
require_contains "index.html" "payment-simulate-start"
require_contains "index.html" "payment-notice"
require_contains "index.html" "payment-simulate-confirm"
require_contains "index.html" "payment-success"
require_contains "index.html" "Screen 13 boundary"
require_contains "script.js" "PAYMENT_COPY"
require_contains "script.js" "Attiva l’iscrizione annuale a TOWN."
require_contains "script.js" "Aktiviere die jährliche TOWN-Mitgliedschaft."
require_contains "script.js" "membershipSimulated"
require_contains "script.js" "openPaymentNotice"
require_contains "script.js" 'go("payment")'
require_contains "script.js" 'go("boundary")'

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|sk_live|pk_live|checkout\.stripe' index.html script.js; then
  echo "FAIL: forbidden payment/checkout pattern present"
  fail=1
else
  echo "OK: no payment form, Stripe checkout, or storage patterns"
fi
if grep -Eiq '<input[^>]+(card|billing|cvv|cvc)' index.html; then
  echo "FAIL: card/billing inputs present"
  fail=1
else
  echo "OK: no card/billing inputs"
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
    "view-payment",
    "payment-intro",
    "payment-success",
    "payment-notice",
    "payment-continue",
    "Screen 13 boundary",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "MEMBERSHIP ANNUALE",
    "JÄHRLICHE MITGLIEDSCHAFT",
    "Stripe non è integrato",
    "Stripe ist nicht integriert",
    "Simula attivazione",
    "Aktivierung simulieren",
    "solo prototipo",
    "nur Prototyp",
    "Confine Screen 13",
    "Screen-13-Grenze",
    "Nessun pagamento reale",
    "keine echte Zahlung",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 12 membership payment boundary mock present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
