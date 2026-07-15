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
require_contains "index.html" "view-passkey"
require_contains "index.html" "view-code"
require_contains "index.html" "view-email"

echo "== Screen 11 structural checks =="
require_file "script.js"
require_contains "index.html" "view-ready"
require_contains "index.html" "ready-continue"
require_contains "index.html" "ready-back"
require_contains "index.html" "ready-inactive"
require_contains "index.html" "view-payment"
require_contains "script.js" "READY_COPY"
require_contains "script.js" "Il tuo account TOWN è pronto."
require_contains "script.js" "Dein TOWN-Konto ist bereit."
require_contains "script.js" 'go("ready")'
require_contains "script.js" 'go("payment")'

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|WebAuthn|navigator\.credentials|membershipActive\s*=\s*true' index.html script.js; then
  echo "FAIL: forbidden payment/auth/activation pattern present"
  fail=1
else
  echo "OK: no payment form, auth, dashboard, or hard membership activation"
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
    "view-ready",
    "ready-label",
    "ready-inactive",
    "ready-membership",
    "ready-payment-note",
    "view-payment",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACCOUNT PRONTO",
    "KONTO BEREIT",
    "€12",
    "membership non è attiva",
    "Mitgliedschaft ist nicht aktiv",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 11 Account Ready mock present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
