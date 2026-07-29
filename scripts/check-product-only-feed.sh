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

# go() must short-circuit to feed in product-only mode.
go_match = re.search(r"function go\(route\) \{([\s\S]*?)\n  function ", js)
if not go_match:
    fail("could not locate go()")
go_body = go_match.group(1)
if "isProductOnlyPublicMode()" not in go_body or "PRODUCT_ONLY_FEED_ROUTE" not in go_body:
    fail("go() must force feed in product-only mode")

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

# Feed controls cannot expose non-product full-screen views.
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
if not invite_continue or "isProductOnlyPublicMode()" not in invite_continue.group(1):
    fail("invite continue must not expose membership view in product-only mode")
if not invite_not_now or "isProductOnlyPublicMode()" not in invite_not_now.group(1):
    fail("invite not-now must not expose ended view in product-only mode")

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
    'id="feed-prev"',
    'id="feed-next"',
    'id="signal-detail"',
    'id="detail-close"',
    'id="membership-invite"',
):
    if fragment not in html:
        fail(f"feed/signal-detail structure removed: {fragment}")

print("OK: product-only routing, three-city scenes, and dormant screens verified")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
