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
    echo "FAIL: forbidden pattern still present: '$pattern' in $file"
    fail=1
  else
    echo "OK: absent '$pattern'"
  fi
}

echo "== City-discovery files =="
require_file "city-discovery.js"
require_file "scripts/test-city-discovery.js"
require_file "script.js"
require_file "index.html"
require_file "styles.css"

echo "== Editorial markup and wiring =="
require_contains "index.html" 'id="city-discovery-panel-template"'
require_contains "index.html" 'city-discovery.js'
require_contains "index.html" "discovery-find-city"
require_contains "index.html" "discovery-continue"
require_contains "script.js" "TownCityDiscovery"
require_contains "script.js" "beginCityDiscoveryJourney"
require_contains "script.js" "CITY_DISCOVERY_JOURNEY_ROUTES"
require_contains "script.js" 'go("country")'
require_contains "script.js" "insertCityDiscoveryStory"
require_contains "styles.css" "feed__panel--discovery"
require_contains "city-discovery.js" "Explore towns everywhere."
require_contains "city-discovery.js" "Explora ciudades de todas partes."
require_contains "city-discovery.js" "Explorează orașe de pretutindeni."
require_contains "city-discovery.js" "Esplora città da ogni luogo."
require_contains "city-discovery.js" "Entdecke Städte aus aller Welt."

echo "== Guardrails =="
require_absent "city-discovery.js" "geolocation"
require_absent "city-discovery.js" "getCurrentPosition"
require_absent "city-discovery.js" "stripe"
require_absent "city-discovery.js" "Milano"
require_absent "city-discovery.js" "München"
require_absent "city-discovery.js" "Munich"
require_absent "city-discovery.js" "Arad"
require_absent "script.js" "navigator.language → city"
require_absent "city-discovery.js" "fetch("

echo "== Static sequence + journey analysis =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")
discovery = Path("city-discovery.js").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

if "CITY_DISCOVERY_INSERT_AFTER = 5" not in discovery:
    fail("editorial must insert after exactly five signals")

if "beginCityDiscoveryJourney()" not in js:
    fail("missing beginCityDiscoveryJourney")

if "CITY_DISCOVERY_JOURNEY_ROUTES" not in js:
    fail("missing city discovery journey routes")

# Primary CTA must open existing country selection, not invent a new flow.
if "discovery-find-city" not in js or 'go("country")' not in js:
    fail("primary CTA must navigate to existing country entry point")

# Journey may unlock country/city/location only.
routes_match = re.search(
    r"const CITY_DISCOVERY_JOURNEY_ROUTES = \{([\s\S]*?)\};",
    js,
)
if not routes_match:
    fail("could not locate CITY_DISCOVERY_JOURNEY_ROUTES")
routes_body = routes_match.group(1)
for required in ("country:", "city:", "location:"):
    if required not in routes_body:
        fail(f"city discovery journey must include {required[:-1]}")
for forbidden in ("membership:", "payment:", "email:", "passkey:", "account:"):
    if forbidden in routes_body:
        fail(f"city discovery journey must not unlock {forbidden[:-1]}")

# Direct non-product access remains gated unless journey active.
if "isCityDiscoveryJourneyActive()" not in js or "isCityDiscoveryJourneyRoute(route)" not in js:
    fail("parseRoute/go/render must gate city discovery routes")

# Existing auth / stripe / signal-detail boundaries remain present.
for fragment in (
    "beginInviteMembershipJourney",
    "PRODUCT_ONLY_PUBLIC_MODE = true",
    "openSignalDetail",
    "isProductOnlyPublicMode",
    "inviteContinue",
):
    if fragment not in js:
        fail(f"protected boundary missing: {fragment}")

if "stripe" not in js.lower() and "checkout" not in js.lower():
    fail("payment/checkout boundary references should remain present")

if 'id="signal-detail"' not in html:
    fail("signal detail markup must remain")

# Locale helper must not send language to APIs.
if "resolveEditorialLanguage" in js and "fetch(" in discovery:
    fail("city-discovery module must not fetch")

# Editorial feed chrome must not assume a non-existent FEED_COPY.en catalog.
if "copy: FEED_COPY.en" in js or "FEED_COPY.en," in js:
    fail("discovery locale must not read missing FEED_COPY.en")
if "isCityDiscoveryStory(activeScene)" not in js:
    fail("syncFeedMemberState must skip signal-detail chrome on editorial story")

print("OK: city-discovery sequence, journey unlock, and boundaries verified")
PY

echo "== Deterministic city-discovery tests =="
node scripts/test-city-discovery.js

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
