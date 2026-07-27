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

require_absent() {
  local file="$1"
  local pattern="$2"
  if grep -qF "$pattern" "$file"; then
    echo "FAIL: '$pattern' unexpectedly found in $file"
    fail=1
  else
    echo "OK: absent '$pattern'"
  fi
}

echo "== Prior screens preserved =="
require_file "index.html"
require_contains "index.html" "view-code"
require_contains "index.html" "view-email"
require_contains "index.html" "view-account"

echo "== Screen 10 structural checks =="
require_file "script.js"
require_file "assets/vendor/swa-browser-13.3.0.umd.min.js"
require_file "assets/vendor/swa-browser-13.3.0.VERSION.txt"
require_contains "index.html" "view-passkey"
require_contains "index.html" "passkey-create"
require_contains "index.html" "passkey-error"
require_contains "index.html" "passkey-success"
require_contains "index.html" "view-ready"
require_contains "index.html" "assets/vendor/swa-browser-13.3.0.umd.min.js"
require_contains "assets/vendor/swa-browser-13.3.0.VERSION.txt" "@simplewebauthn/browser@13.3.0"
require_contains "assets/vendor/swa-browser-13.3.0.umd.min.js" "[@simplewebauthn/browser@13.3.0]"
require_contains "script.js" "PASSKEY_COPY"
require_contains "script.js" "Proteggi il tuo account TOWN."
require_contains "script.js" "Schütze dein TOWN-Konto."
require_contains "script.js" "passkeyRegistered"
require_contains "script.js" "/v1/account/passkeys/registration/options"
require_contains "script.js" "/v1/account/passkeys/registration/verify"
require_contains "script.js" "SetupGrant "
require_contains "script.js" "startRegistration"
require_contains "script.js" "ACCOUNT_READY"
require_contains "script.js" 'go("passkey")'
require_contains "script.js" 'go("ready")'
require_absent "index.html" "passkey-simulate"
require_absent "index.html" "passkey-notice"
require_absent "script.js" "passkeySimulated"
require_absent "script.js" "openPasskeyNotice"
require_absent "script.js" "passkeySimulate"

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|localStorage|sessionStorage|dashboard|followers|trending|/v1/auth|/session|credentials:\s*['\''"]include' index.html script.js; then
  echo "FAIL: forbidden storage/payment/session pattern present"
  fail=1
else
  echo "OK: no storage, payment, or session/login patterns"
fi
if grep -Eiq 'unpkg\.com|cdn\.jsdelivr|cdnjs\.cloudflare|simplewebauthn/browser@' index.html script.js; then
  echo "FAIL: runtime CDN reference to SimpleWebAuthn present"
  fail=1
else
  echo "OK: no runtime CDN SimpleWebAuthn fetch"
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
    "passkey-error",
    "passkey-continue",
    "view-ready",
    "swa-browser-13.3.0.umd.min.js",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")
for absent in (
    "passkey-simulate",
    "passkey-notice",
):
    if absent in html:
        raise SystemExit(f"Unexpected HTML fragment still present: {absent}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACCESSO SICURO",
    "SICHERER ZUGANG",
    "Face ID",
    "Touch ID",
    "TOWN creerà una passkey sul tuo dispositivo",
    "TOWN erstellt einen Passkey auf deinem Gerät",
    "TOWN va crea o passkey pe dispozitivul tău",
    "/v1/account/passkeys/registration/options",
    "/v1/account/passkeys/registration/verify",
    "Authorization: \"SetupGrant \"",
    "startRegistration",
    "ACCOUNT_READY",
    '"Simple" + "Web" + "Authn" + "Browser"',
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
for absent in (
    "passkeySimulated",
    "openPasskeyNotice",
    "passkeySimulate",
    "Simula configurazione",
    "Einrichtung simulieren",
    "Simulează configurarea",
    "la creazione reale della passkey non è attiva",
    "Die echte Passkey-Erstellung ist in diesem Prototyp noch nicht verfügbar",
    "crearea reală a passkey-ului nu este activă",
    "Non è stata creata una passkey reale",
    "Es wurde kein echter Passkey erstellt",
    "Nu a fost creată o passkey reală",
    "SimpleWebAuthnBrowser",
):
    if absent in js:
        raise SystemExit(f"Unexpected JS fragment still present: {absent}")
print("OK: Screen 10 real passkey registration ceremony present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
