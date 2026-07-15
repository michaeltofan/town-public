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
require_contains "index.html" "view-payment"
require_contains "index.html" "view-ready"
require_contains "index.html" "view-feed"
require_contains "index.html" "feed-see-too"

echo "== Screen 13 structural checks =="
require_file "script.js"
require_contains "index.html" "view-active"
require_contains "index.html" "active-return"
require_contains "index.html" "active-back"
require_contains "index.html" "feed-see-too-done"
require_contains "script.js" "ACTIVE_COPY"
require_contains "script.js" "originatingFeedIndex"
require_contains "script.js" "signalConfirmed"
require_contains "script.js" "Membership attiva — solo prototipo."
require_contains "script.js" "Mitgliedschaft aktiv — nur Prototyp."
require_contains "script.js" "Torna al segnale"
require_contains "script.js" "Zurück zum Signal"
require_contains "script.js" "Lo vedi anche tu"
require_contains "script.js" "Du siehst das auch"
require_contains "script.js" "Conferma registrata nel prototipo"
require_contains "script.js" "Bestätigung im Prototyp registriert"
require_contains "script.js" "Membro · {city}"
require_contains "script.js" "Mitglied · {city}"
require_contains "script.js" 'go("active")'
require_contains "script.js" "syncFeedMemberState"

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|sk_live|pk_live|checkout\.stripe|confetti|trophy|WebAuthn|navigator\.credentials' index.html script.js; then
  echo "FAIL: forbidden payment/auth/social/celebration pattern present"
  fail=1
else
  echo "OK: no payment, auth, storage, celebration, or dashboard patterns"
fi

if grep -Eiq 'view-boundary|Screen 14|go\("boundary"\)' index.html script.js; then
  echo "FAIL: Screen 13 boundary leftover or Screen 14 started"
  fail=1
else
  echo "OK: no Screen 13 boundary leftover and no Screen 14"
fi

if grep -qiE 'language selector|language menu|choose language' index.html script.js; then
  echo "FAIL: language selector present"
  fail=1
else
  echo "OK: no language selector"
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
    "view-active",
    "active-return",
    "active-back",
    "active-member-status",
    "feed-see-too-done",
    "feed-done-title",
    "feed-done-note",
    "view-payment",
    "view-feed",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACTIVE_COPY",
    "Membership attiva — solo prototipo.",
    "Mitgliedschaft aktiv — nur Prototyp.",
    "Torna al segnale",
    "Zurück zum Signal",
    "originatingFeedIndex = feedIndex",
    "signalConfirmed = true",
    "feedIndex = originatingFeedIndex",
    "Lo vedi anche tu",
    "Du siehst das auch",
    "Conferma registrata nel prototipo",
    "Bestätigung im Prototyp registriert",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")

css = Path("styles.css").read_text(encoding="utf-8")
for fragment in (".active__", ".feed__done", "page-active"):
    if fragment not in css:
        raise SystemExit(f"Missing CSS fragment: {fragment}")

print("OK: Screen 13 membership active confirmation present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
