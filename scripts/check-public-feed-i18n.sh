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

echo "== Public feed i18n files =="
require_file "public-i18n.js"
require_file "signal-copy.js"
require_file "city-discovery.js"
require_file "script.js"
require_file "index.html"
require_file "scripts/test-public-feed-i18n.js"

echo "== Wiring =="
require_contains "index.html" "public-i18n.js"
require_contains "index.html" "signal-copy.js"
require_contains "index.html" 'id="feed-source-lang"'
require_contains "index.html" 'id="detail-source-lang"'
require_contains "script.js" "resolvePublicReadingLanguage"
require_contains "script.js" "TownPublicI18n"
require_contains "script.js" "TownSignalCopy"
require_contains "script.js" "localizeSignal"
require_contains "public-i18n.js" "resolveReadingLanguage"
require_contains "signal-copy.js" "milano-signal-1"
require_contains "signal-copy.js" "munich-signal-3"
require_contains "signal-copy.js" "arad-signal-3"

echo "== Static analysis =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
i18n = Path("public-i18n.js").read_text(encoding="utf-8")
signals = Path("signal-copy.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

if "function resolvePublicReadingLanguage()" not in js:
    fail("missing resolvePublicReadingLanguage")
if "TownSignalCopy" not in js or "localizeSignal" not in js:
    fail("signals must be localized through TownSignalCopy")
if "languageForCityId(cityId) || communityLanguage()" in js and "feedLocaleForScene" in js:
    # Ensure feedLocaleForScene no longer selects reading language from city.
    body = re.search(r"function feedLocaleForScene\(scene\) \{([\s\S]*?)\n  function ", js)
    if not body:
        fail("could not locate feedLocaleForScene")
    if "languageForCityId" in body.group(1) and "resolvePublicReadingLanguage" not in body.group(1):
        fail("feedLocaleForScene must use reading language, not city language")
if "resolvePublicReadingLanguage()" not in js:
    fail("reading language must be used in feed path")

feed_ui = i18n.split("const FEED_UI_COPY = {", 1)[1].split("\n  const ", 1)[0]
for lang in ("en", "es", "fr", "it", "de", "ro"):
    if f"\n    {lang}: {{" not in "\n" + feed_ui and f"\n    {lang}:{{" not in "\n" + feed_ui:
        # JSON-like object keys in source
        if f"    {lang}: {{" not in feed_ui:
            fail(f"FEED_UI_COPY missing {lang}")

for sid in (
    "milano-signal-1",
    "milano-signal-2",
    "milano-signal-3",
    "munich-signal-1",
    "munich-signal-2",
    "munich-signal-3",
    "arad-signal-1",
    "arad-signal-2",
    "arad-signal-3",
):
    if sid not in signals:
        fail(f"missing signal catalog {sid}")

if "seeThisToo: \"I SEE THIS TOO\"" not in js:
    fail("FEED_COPY.en must remain present")
if "public-i18n.js" not in html or "signal-copy.js" not in html:
    fail("index must load i18n modules")
if "feed__source-lang" not in Path("styles.css").read_text(encoding="utf-8"):
    fail("source-language style missing")

# Protected boundaries remain.
for fragment in (
    "PRODUCT_ONLY_PUBLIC_MODE = true",
    "beginInviteMembershipJourney",
    "requestCheckoutSession",
    "openSignalDetail",
    "CITY_DISCOVERY_JOURNEY_ROUTES",
):
    if fragment not in js:
        fail(f"protected boundary missing: {fragment}")

print("OK: public feed i18n wiring and catalogs verified")
PY

echo "== Unit tests =="
node scripts/test-public-feed-i18n.js
node scripts/test-onboarding-language-continuity.js

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
