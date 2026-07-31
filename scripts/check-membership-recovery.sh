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

echo "== Membership recovery files =="
require_file "membership-recovery.js"
require_file "script.js"
require_file "index.html"
require_file "scripts/test-membership-recovery.js"

echo "== Wiring =="
require_contains "index.html" "membership-recovery.js"
require_contains "index.html" 'id="payment-confirming"'
require_contains "index.html" 'id="payment-confirming-retry"'
require_contains "index.html" 'id="payment-confirming-dismiss"'
require_contains "script.js" "TownMembershipRecovery"
require_contains "script.js" "/v1/account/membership"
require_contains "script.js" "fetchAccountMembership"
require_contains "script.js" "bootstrapAccountMembership"
require_contains "script.js" "setCheckoutPendingMarker"
require_contains "script.js" "clearCheckoutPendingMarker"
require_contains "script.js" "startMembershipRecoveryPolling"
require_contains "script.js" "manualMembershipRecoveryRetry"
require_contains "script.js" "canTakeCivicAction"
require_contains "membership-recovery.js" "town.checkoutPending"
require_contains "membership-recovery.js" "isCheckoutRecoveryStopOutcome"
require_contains "membership-recovery.js" "isPreWebhookMembershipStatus"
require_contains "membership-recovery.js" "shouldStartCheckoutRecoveryPolling"
require_contains "script.js" "isCheckoutRecoveryStopOutcome"
require_contains "script.js" "shouldStartCheckoutRecoveryPolling"

echo "== Guardrails =="
# localStorage remains forbidden everywhere in the public surface.
if grep -Eiq 'localStorage' index.html script.js membership-recovery.js; then
  echo "FAIL: localStorage present"
  fail=1
else
  echo "OK: no localStorage"
fi

# sessionStorage is allowed only for the advisory checkout-pending marker.
# This updates the prior blanket ban because same-tab Checkout return requires a
# non-authoritative marker; the marker must never grant membership/participation.
if grep -n 'sessionStorage' index.html script.js membership-recovery.js \
  | grep -Ev 'CHECKOUT_PENDING|town\.checkoutPending|checkoutPending|Advisory only|advisory checkout|Advisory checkout-pending'; then
  echo "FAIL: non-advisory sessionStorage usage present"
  fail=1
else
  echo "OK: sessionStorage limited to advisory checkout-pending marker"
fi

if grep -Eiq 'sk_live|pk_live|checkout\.stripe' index.html script.js membership-recovery.js; then
  echo "FAIL: Stripe secrets or hosted checkout URL literals present"
  fail=1
else
  echo "OK: no Stripe secrets or hosted checkout URL literals"
fi

echo "== Static contract analysis =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
helper = Path("membership-recovery.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

# Checkout redirect must record advisory marker immediately before navigation.
checkout = re.search(
    r'paymentSimulateStart\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);',
    js,
)
if not checkout:
    fail("missing paymentSimulateStart handler")
body = checkout.group(1)
if "setCheckoutPendingMarker()" not in body:
    fail("checkout redirect must record advisory pending marker")
if "window.location = checkoutUrl" not in body and "window.location=checkoutUrl" not in body:
    fail("checkout must still redirect to checkoutUrl")
if "membershipSimulated = true" in body:
    fail("checkout redirect must not set membershipSimulated")
if "signalConfirmed = true" in body:
    fail("checkout redirect must not set signalConfirmed")

# Bootstrap must call authoritative membership endpoint.
if "function bootstrapAccountMembership()" not in js:
    fail("missing bootstrapAccountMembership")
boot_fn = re.search(
    r"function bootstrapAccountMembership\(\) \{([\s\S]*?)\n  \}",
    js,
)
if not boot_fn:
    fail("could not extract bootstrapAccountMembership")
boot_body = boot_fn.group(1)
if "fetchAuthenticationSession()" not in boot_body:
    fail("bootstrap must restore authentication session")
if "fetchAccountMembership()" not in boot_body:
    fail("bootstrap must call GET /v1/account/membership")
if "hasCheckoutPendingMarker()" not in boot_body:
    fail("bootstrap must consider advisory pending marker")
if "shouldStartCheckoutRecoveryPolling" not in boot_body:
    fail("bootstrap must separate normal-load apply from recovery polling start")

if 'API_BASE + "/v1/account/membership"' not in js:
    fail("production must call /v1/account/membership")

# Pending recovery must not treat inactive as a stop outcome.
start_poll = re.search(
    r"function startMembershipRecoveryPolling\(\) \{([\s\S]*?)\n  \}",
    js,
)
if not start_poll:
    fail("missing startMembershipRecoveryPolling")
if "isCheckoutRecoveryStopOutcome" not in start_poll.group(1):
    fail("recovery poller must stop only on checkout recovery stop outcomes")
if re.search(
    r"shouldStop:\s*function[^{]*\{[^}]*isTerminalMembershipOutcome",
    start_poll.group(1),
):
    fail("recovery poller must not use legacy terminal classification for inactive")

# Production civic authorization must not read membershipSimulated.
civic = re.search(
    r"function canTakeCivicAction\(\) \{([\s\S]*?)\n  \}",
    js,
)
if not civic:
    fail("missing canTakeCivicAction")
if "membershipSimulated" in civic.group(1):
    fail("canTakeCivicAction must not read membershipSimulated")

fetch_m = re.search(
    r"async function fetchAccountMembership\(\) \{([\s\S]*?)\n  \}",
    js,
)
if not fetch_m:
    fail("missing fetchAccountMembership")
if "membershipSimulated" in fetch_m.group(1):
    fail("fetchAccountMembership must not read membershipSimulated")

finish = re.search(
    r"function finishRecoveryWithSnapshot\(snapshot\) \{([\s\S]*?)\n  \}",
    js,
)
if not finish:
    fail("missing finishRecoveryWithSnapshot")
if "membershipSimulated = true" in finish.group(1):
    fail("recovery must not set membershipSimulated")
if "isPaidPendingBinding" not in finish.group(1):
    fail("paid_pending_binding must receive honest non-participating finish UI")

# Helper: inactive must not be a checkout recovery stop outcome.
if "PRE_WEBHOOK_MEMBERSHIP_STATUSES" not in helper:
    fail("helper must classify pre-webhook statuses separately")
if "CHECKOUT_RECOVERY_STOP_STATUSES" not in helper:
    fail("helper must classify checkout recovery stop outcomes separately")
if "inactive: true" in helper.split("CHECKOUT_RECOVERY_STOP_STATUSES")[1].split("}")[0]:
    fail("inactive must not be a checkout recovery stop status")

# Marker helpers must never grant authorization.
if "function markerGrantsAuthorization" not in helper:
    fail("helper must expose markerGrantsAuthorization")
if "return false" not in helper.split("function markerGrantsAuthorization")[1].split("function ")[0]:
    fail("markerGrantsAuthorization must return false")

# Testimony: visitors keep membership invite; participating members use demo capture.
testimony = re.search(
    r'detailAddTestimony\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);',
    js,
)
if not testimony:
    fail("missing detailAddTestimony handler")
tbody = testimony.group(1)
if "canTakeCivicAction()" not in tbody:
    fail("testimony CTA must gate on canTakeCivicAction")
if "openMemberDemoTestimonyCapture()" not in tbody:
    fail("participating members must reach restored demo capture")
for fragment in (
    "originatingFeedIndex = feedIndex",
    "closeSignalDetail()",
    "openInvite()",
):
    if fragment not in tbody:
        fail(f"non-participating testimony path missing '{fragment}'")
for forbidden in ("membershipSimulated", "signalConfirmed"):
    if forbidden in tbody:
        fail(f"testimony CTA must not contain '{forbidden}'")

invite = re.search(
    r'inviteContinue\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);',
    js,
)
if not invite:
    fail("missing inviteContinue handler")
ibody = invite.group(1)
if "beginInviteMembershipJourney()" not in ibody or 'go("membership")' not in ibody:
    fail("invite Continue journey must remain intact")
if "membershipSimulated" in ibody:
    fail("invite Continue must not consult membershipSimulated")

if 'id="payment-confirming"' not in html:
    fail("payment confirming recovery UI missing")

print("OK: membership recovery contract and visitor boundaries preserved")
PY

echo "== Deterministic recovery helper tests =="
node scripts/test-membership-recovery.js

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
