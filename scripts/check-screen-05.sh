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
require_contains "index.html" "Choose your city"
require_contains "index.html" "view-location"

echo "== Screen 05 structural checks =="
require_file "script.js"
require_file "assets/feed/signal_citta_studi_pavement.jpg"
require_file "assets/feed/signal_porta_romana_lighting.jpg"
require_file "assets/feed/signal_lorenteggio_works.jpg"
require_contains "index.html" "view-feed"
require_contains "index.html" "feed-see-too"
require_contains "index.html" "feed-open-signal"
require_contains "index.html" "membership-invite"
require_contains "script.js" "LO VEDO ANCH’IO"
require_contains "script.js" "ICH SEHE DAS AUCH"
require_contains "script.js" "Apri segnale"
require_contains "script.js" "Signal öffnen"
require_contains "script.js" "FEED_SCENES"
require_contains "script.js" 'go("feed")'

echo "== Guardrails =="
if grep -Eiq 'infinite scroll|IntersectionObserver|wheel\.|addEventListener\("wheel"|endless' index.html script.js; then
  echo "FAIL: infinite/endless scroll mechanics present"
  fail=1
else
  echo "OK: no infinite scroll mechanics"
fi

if grep -Eiq 'navigator\.geolocation|getCurrentPosition|followers|trending|dashboard|comment thread|bookmark' index.html script.js; then
  echo "FAIL: forbidden pattern present"
  fail=1
else
  echo "OK: no forbidden patterns"
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
    "view-feed",
    "feed-see-too",
    "feed-open-signal",
    "membership-invite",
    "signal-sheet",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "Marciapiede danneggiato",
    "Der Gehweg ist hier kaum noch sicher",
    "Visitatore",
    "Besucher",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 05 feed markup and approved copy present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
