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
require_contains "index.html" "view-account"
require_contains "index.html" "view-membership"
require_contains "index.html" "view-feed"

echo "== Screen 08 structural checks =="
require_file "script.js"
require_contains "index.html" "view-email"
require_contains "index.html" "email-input"
require_contains "index.html" "email-continue"
require_contains "index.html" "email-back"
require_contains "index.html" "view-code"
require_contains "script.js" "EMAIL_COPY"
require_contains "script.js" "Inserisci la tua email."
require_contains "script.js" "Gib deine E-Mail-Adresse ein."
require_contains "script.js" "EMAIL_PATTERN"
require_contains "script.js" "syncEmailContinue"
require_contains "script.js" 'go("email")'
require_contains "script.js" 'go("code")'

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|WebAuthn|navigator\.credentials' index.html script.js; then
  echo "FAIL: forbidden auth/storage/payment/social pattern present"
  fail=1
else
  echo "OK: no real email send, storage, auth, or payment patterns"
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
    "view-email",
    'id="email-input"',
    'type="email"',
    "email-error",
    "email-privacy",
    "view-code",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "CREA IL TUO ACCOUNT",
    "KONTO ERSTELLEN",
    "Non serve una password.",
    "Du brauchst kein Passwort.",
    "non viene inviata alcuna email",
    "keine E-Mail gesendet",
    "Inserisci un indirizzo email valido.",
    "Gib eine gültige E-Mail-Adresse ein.",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 08 email entry mock present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
