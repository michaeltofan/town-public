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
require_contains "index.html" "view-email"
require_contains "script.js" "ACCOUNT_COPY"
require_contains "script.js" "Crea il tuo account TOWN."
require_contains "script.js" "Erstelle dein TOWN-Konto."
require_contains "script.js" "applyAccountCopy"
require_contains "script.js" 'go("account")'
require_contains "script.js" 'go("email")'

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|dashboard|followers|trending' index.html script.js; then
  echo "FAIL: forbidden account/payment/social pattern present"
  fail=1
else
  echo "OK: no password fields or payment/social patterns"
fi
if grep -Eiq '<input' index.html | grep -Eiq 'view-account' ; then
  :
fi
python3 - <<'PY'
from pathlib import Path
import re
html = Path("index.html").read_text(encoding="utf-8")
# Screen 07 view must not contain form inputs
m = re.search(r'id="view-account".*?</div>\s*<!-- Screen 08', html, re.S)
if not m:
    # fallback: between view-account and view-email
    m = re.search(r'id="view-account".*?id="view-email"', html, re.S)
chunk = m.group(0) if m else ""
if "<input" in chunk:
    raise SystemExit("FAIL: account data input present on Screen 07")
print("OK: no account data inputs on Screen 07")
PY

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
    "view-email",
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
