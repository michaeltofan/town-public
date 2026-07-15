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
require_contains "index.html" "view-code"
require_contains "index.html" "view-email"
require_contains "index.html" "view-account"

echo "== Screen 10 structural checks =="
require_file "script.js"
require_contains "index.html" "view-passkey"
require_contains "index.html" "passkey-create"
require_contains "index.html" "passkey-notice"
require_contains "index.html" "passkey-simulate"
require_contains "index.html" "passkey-success"
require_contains "index.html" "Screen 11 boundary"
require_contains "script.js" "PASSKEY_COPY"
require_contains "script.js" "Proteggi il tuo account TOWN."
require_contains "script.js" "Schütze dein TOWN-Konto."
require_contains "script.js" "openPasskeyNotice"
require_contains "script.js" "passkeySimulated"
require_contains "script.js" 'go("passkey")'
require_contains "script.js" 'go("boundary")'

echo "== Guardrails =="
if grep -Eiq 'Stripe|card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|WebAuthn|navigator\.credentials|PublicKeyCredential' index.html script.js; then
  echo "FAIL: forbidden WebAuthn/auth/storage/payment pattern present"
  fail=1
else
  echo "OK: no WebAuthn, real credentials, storage, or payment patterns"
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
    "view-passkey",
    "passkey-intro",
    "passkey-success",
    "passkey-notice",
    "passkey-simulate",
    "passkey-continue",
    "Screen 11 boundary",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACCESSO SICURO",
    "SICHERER ZUGANG",
    "Simula configurazione",
    "Einrichtung simulieren",
    "Face ID",
    "Touch ID",
    "non è attiva",
    "nicht aktiv",
    "Confine Screen 11",
    "Screen-11-Grenze",
    "Account Ready",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 10 passkey introduction mock present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
