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
require_contains "index.html" "view-email"
require_contains "index.html" "view-account"
require_contains "index.html" "view-membership"

echo "== Screen 09 structural checks =="
require_file "script.js"
require_contains "index.html" "view-code"
require_contains "index.html" "code-input"
require_contains "index.html" "code-verify"
require_contains "index.html" "code-change-email"
require_contains "index.html" "view-passkey"
require_contains "script.js" "CODE_COPY"
require_contains "script.js" "PROTOTYPE_CODE"
require_contains "script.js" "123456"
require_contains "script.js" "Controlla la tua email."
require_contains "script.js" "Prüfe deine E-Mails."
require_contains "script.js" "syncCodeVerify"
require_contains "script.js" 'go("code")'
require_contains "script.js" 'go("passkey")'

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|WebAuthn|navigator\.credentials' index.html script.js; then
  echo "FAIL: forbidden auth/storage/payment/social pattern present"
  fail=1
else
  echo "OK: no real code send, WebAuthn, storage, or payment patterns"
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
    "view-code",
    'id="code-input"',
    "code-prototype",
    "code-error",
    "code-email",
    "view-passkey",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "VERIFICA EMAIL",
    "E-MAIL BESTÄTIGEN",
    "inserisci 123456",
    "Gib im Prototyp 123456",
    "Il codice non è corretto.",
    "Der Code ist nicht korrekt.",
    "Cambia email",
    "E-Mail-Adresse ändern",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 09 verification code mock present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
