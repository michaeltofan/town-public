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

echo "== Product-only public feed checks =="
require_file "index.html"
require_file "script.js"
require_contains "script.js" "PRODUCT_ONLY_PUBLIC_MODE"
require_contains "script.js" "isProductOnlyPublicMode"
require_contains "script.js" "productOnlyScenes"
require_contains "script.js" "PRODUCT_ONLY_CITY_ORDER"
require_contains "script.js" 'PRODUCT_ONLY_FEED_ROUTE = "feed"'

# Feed and signal-detail structure/copy must remain.
require_contains "index.html" 'id="view-feed"'
require_contains "index.html" 'id="signal-detail"'
require_contains "index.html" 'id="feed-see-too"'
require_contains "index.html" 'id="feed-open-signal"'
require_contains "index.html" 'id="feed-back"'
require_contains "index.html" 'id="membership-invite"'
require_contains "index.html" "I SEE THIS TOO"
require_contains "index.html" "Open signal"

# Dormant non-feed markup must remain present.
for view in \
  view-entry \
  view-country \
  view-city \
  view-location \
  view-membership \
  view-ended \
  view-account \
  view-email \
  view-code \
  view-passkey \
  view-ready \
  view-payment \
  view-active
do
  require_contains "index.html" "id=\"$view\""
done

# All three cities' existing scene data must remain and be listed for product-only.
for scene in \
  milano-signal-1 milano-signal-2 milano-signal-3 \
  munich-signal-1 munich-signal-2 munich-signal-3 \
  arad-signal-1 arad-signal-2 arad-signal-3
do
  require_contains "script.js" "$scene"
done

echo "== Routing behavior (static analysis) =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

if "const PRODUCT_ONLY_PUBLIC_MODE = true" not in js:
    fail("PRODUCT_ONLY_PUBLIC_MODE must be enabled")

if "function isProductOnlyPublicMode()" not in js:
    fail("missing isProductOnlyPublicMode()")

if "function productOnlyScenes()" not in js:
    fail("missing productOnlyScenes()")

# Empty/default navigation resolves to feed.
if 'route = isProductOnlyPublicMode() ? PRODUCT_ONLY_FEED_ROUTE : "entry"' not in js:
    fail("empty hash must resolve to feed in product-only mode")

# Non-product routes normalize to feed.
if "isNonProductRoute(route)" not in js or "return PRODUCT_ONLY_FEED_ROUTE" not in js:
    fail("non-product routes must normalize to feed")

# go() must short-circuit to feed in product-only mode unless an approved journey is active.
go_match = re.search(r"function go\(route\) \{([\s\S]*?)\n  function ", js)
if not go_match:
    fail("could not locate go()")
go_body = go_match.group(1)
if "isProductOnlyPublicMode()" not in go_body or "PRODUCT_ONLY_FEED_ROUTE" not in go_body:
    fail("go() must force feed in product-only mode")
if "allowCityDiscoveryJourney" not in go_body:
    fail("go() must recognize the city-discovery journey unlock")
if "allowInviteJourney" not in go_body:
    fail("go() must preserve invite membership journey unlock")

# Direct country/city hash access stays blocked until city-discovery journey begins.
if "isCityDiscoveryJourneyActive()" not in js or "isCityDiscoveryJourneyRoute(route)" not in js:
    fail("city-discovery journey gates must exist for country/city reuse")
if "beginCityDiscoveryJourney" not in js:
    fail("missing beginCityDiscoveryJourney()")
if "CITY_DISCOVERY_JOURNEY_ROUTES" not in js:
    fail("missing CITY_DISCOVERY_JOURNEY_ROUTES")

# Feed remains usable without onboarding state.
if "function currentScenes()" not in js or "productOnlyScenes()" not in js:
    fail("currentScenes must use productOnlyScenes in product-only mode")

# All three cities represented via existing FEED_SCENES, no Milano-only hardcode for public product.
if 'PRODUCT_ONLY_CITY_ORDER = ["Milano", "Munich", "Arad"]' not in js:
    fail("product-only city order must include Milano, Munich, and Arad")

for city in ("Milano", "Munich", "Arad"):
    if f"{city}: [" not in js:
        fail(f"FEED_SCENES must still define {city}")

# Signal detail remains reachable from the feed (event-delegated openSignalDetail).
if 'role === "feed-open-signal"' not in js or "openSignalDetail()" not in js:
    fail("feed must still open signal detail")
if 'id="signal-detail"' not in html:
    fail("signal-detail markup missing")

# Feed controls cannot expose non-product full-screen views via back navigation.
feed_back = re.search(
    r'role === "feed-back"\) \{([\s\S]*?)return;\n\s*\}',
    js,
)
if not feed_back:
    fail("missing feed-back delegated handler")
if "isProductOnlyPublicMode()" not in feed_back.group(1):
    fail("feed-back must not navigate to location in product-only mode")

invite_continue = re.search(
    r'inviteContinue\.addEventListener\("click", \(\) => \{([\s\S]*?)\}\);',
    js,
)
invite_not_now = re.search(
    r'inviteNotNow\.addEventListener\("click", \(\) => \{([\s\S]*?)\}\);',
    js,
)
if not invite_continue:
    fail("missing inviteContinue handler")
invite_continue_body = invite_continue.group(1)
if "beginInviteMembershipJourney()" not in invite_continue_body:
    fail("invite continue must begin the approved membership invitation journey")
if "go(\"membership\")" not in invite_continue_body:
    fail("invite continue must enter existing membership screen")
if "membershipSimulated" in invite_continue_body:
    fail("invite continue must not consult membershipSimulated")
if "signalConfirmed" in invite_continue_body:
    fail("invite continue must not confirm or mutate the signal")
if re.search(r"isProductOnlyPublicMode\(\)\s*return", invite_continue_body):
    fail("invite continue must not silently no-op in product-only mode")

if not invite_not_now or "isProductOnlyPublicMode()" not in invite_not_now.group(1):
    fail("invite not-now must keep existing product-only visitor exit behaviour")

if "function beginInviteMembershipJourney()" not in js:
    fail("missing beginInviteMembershipJourney()")
if "INVITE_MEMBERSHIP_JOURNEY_ROUTES" not in js:
    fail("missing INVITE_MEMBERSHIP_JOURNEY_ROUTES")
if "isInviteMembershipJourneyActive()" not in js:
    fail("missing invite membership journey gate")

# Direct non-product hash routes remain protected unless an approved journey is active.
if "isInviteMembershipJourneyRoute(route)" not in js:
    fail("parseRoute/go must gate invite journey routes explicitly")
if "isCityDiscoveryJourneyRoute(route)" not in js:
    fail("parseRoute/go must gate city-discovery journey routes explicitly")

# First paint should prefer feed, not entry.
if re.search(r'<div id="view-entry"(?! hidden)', html):
    fail("view-entry must be hidden by default in product-only public surface")
if re.search(r'<div id="view-feed" hidden>', html):
    fail("view-feed must not be hidden by default in product-only public surface")

# Feed copy / structure not removed.
for fragment in (
    "I SEE THIS TOO",
    "Open signal",
    'id="feed-see-too"',
    'id="feed-open-signal"',
    'id="signal-detail"',
    'id="detail-close"',
    'id="membership-invite"',
    'id="detail-session-contribute"',
    'id="detail-session"',
):
    if fragment not in html:
        fail(f"feed/signal-detail structure removed: {fragment}")
for removed in ('id="feed-prev"', 'id="feed-next"', "feed__scene-nav"):
    if removed in html:
        fail(f"visible feed navigation control must remain removed: {removed}")

# Restored demo capture primitives must remain present (gated in script.js).
for required in (
    'id="detail-testimony-input"',
    'id="detail-testimony-preview"',
):
    if required not in html:
        fail(f"restored member demo capture primitive missing: {required}")
if "canTakeCivicAction()" not in js or "openMemberDemoTestimonyCapture" not in js:
    fail("demo capture must stay gated behind canTakeCivicAction")
for mock in (
    "mock/member-signal-detail.html",
    "mock/member-testimony-capture.html",
):
    if not Path(mock).is_file():
        fail(f"member design mock missing: {mock}")

# Cache-invalidating script reference required for deployed handler updates.
if not re.search(r'src="script\.js\?v=[^"]+"', html):
    fail("index.html must reference a cache-invalidating script.js URL")

print("OK: product-only routing, invite membership journey, and dormant screens verified")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
