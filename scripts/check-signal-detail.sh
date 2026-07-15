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
require_contains "index.html" "view-feed"
require_contains "index.html" "view-active"
require_contains "index.html" "feed-open-signal"
require_contains "index.html" "membership-invite"

echo "== Signal Detail V1 structural checks =="
require_file "script.js"
require_contains "index.html" "signal-detail"
require_contains "index.html" "detail-close"
require_contains "index.html" "detail-see-too"
require_contains "index.html" "detail-see-too-done"
require_contains "index.html" "detail-civic-status"
require_contains "index.html" "detail-why"
require_contains "index.html" "detail-who"
require_contains "index.html" "detail-update"
require_contains "script.js" "populateSignalDetail"
require_contains "script.js" "openSignalDetail"
require_contains "script.js" "closeSignalDetail"
require_contains "script.js" "civicStatus"
require_contains "script.js" "whyMatters"
require_contains "script.js" "whoAffected"
require_contains "script.js" "latestUpdate"
require_contains "script.js" "statusNote"
require_contains "script.js" "Perché conta qui"
require_contains "script.js" "Warum das hier zählt"
require_contains "script.js" "milano-signal-1"
require_contains "script.js" "milano-signal-2"
require_contains "script.js" "milano-signal-3"
require_contains "script.js" "munich-signal-1"
require_contains "script.js" "munich-signal-2"
require_contains "script.js" "munich-signal-3"

echo "== Guardrails =="
if grep -Eiq 'fetch\(|XMLHttpRequest|localStorage|sessionStorage|navigator\.geolocation|WebAuthn|navigator\.credentials|checkout\.stripe|sk_live|pk_live|dashboard|followers|trending|comment thread|confetti' index.html script.js; then
  echo "FAIL: forbidden backend/social/celebration pattern present"
  fail=1
else
  echo "OK: no backend, storage, social metrics, or celebration patterns"
fi

if grep -Eiq 'signal-sheet|Screen 14|view-screen-14|go\("boundary"\)' index.html script.js; then
  echo "FAIL: placeholder sheet leftover or later screen started"
  fail=1
else
  echo "OK: placeholder sheet removed and no later screen"
fi

echo "== HTML/JS smoke =="
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
import re

class Checker(HTMLParser):
    def error(self, message):
        raise SystemExit(message)

html = Path("index.html").read_text(encoding="utf-8")
Checker().feed(html)
Checker().close()
for fragment in (
    "signal-detail",
    "detail-image",
    "detail-headline",
    "detail-civic-status",
    "detail-description",
    "detail-why",
    "detail-who",
    "detail-update",
    "detail-status-note",
    "detail-see-too",
    "detail-close",
    "view-feed",
    "view-active",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "Stato civico: osservato",
    "Stato civico: segnalato",
    "Stato civico: aperto",
    "Bürgerlicher Status: beobachtet",
    "Bürgerlicher Status: gemeldet",
    "Bürgerlicher Status: offen",
    "Perché conta qui",
    "Chi è coinvolto",
    "Ultimo aggiornamento",
    "Warum das hier zählt",
    "Wen es betrifft",
    "Letzte Aktualisierung",
    "populateSignalDetail",
    "openSignalDetail",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")

# Six complete detail payloads
for city, count in (("Milano", 3), ("Munich", 3)):
    block = re.search(rf"{city}:\s*\[(.*?)\n\s*\],", js, re.S)
    if not block:
        raise SystemExit(f"Missing FEED_SCENES city block: {city}")
    body = block.group(1)
    for key in ("civicStatus", "description", "whyMatters", "whoAffected", "latestUpdate", "statusNote", "observedDate"):
        if body.count(key + ":") < count:
            raise SystemExit(f"{city} missing enough {key} fields")

css = Path("styles.css").read_text(encoding="utf-8")
for fragment in (".signal-detail", ".signal-detail__headline", ".signal-detail__veil"):
    if fragment not in css:
        raise SystemExit(f"Missing CSS fragment: {fragment}")

print("OK: Signal Detail V1 present for all six feed signals")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
