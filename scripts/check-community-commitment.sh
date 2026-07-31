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

echo "== Community commitment files =="
require_file "community-commitment.js"
require_file "scripts/test-community-commitment.js"
require_file "index.html"
require_file "script.js"

echo "== Wiring =="
require_contains "index.html" 'id="view-commitment"'
require_contains "index.html" 'id="commitment-accept"'
require_contains "index.html" 'id="commitment-confirm"'
require_contains "index.html" 'id="commitment-checkout"'
require_contains "index.html" "community-commitment.js"
require_contains "script.js" "TownCommunityCommitment"
require_contains "script.js" "/v1/account/community-commitment"
require_contains "script.js" "COMMITMENT_COPY"
require_contains "script.js" "saveCommunityCommitment"
require_contains "script.js" "bootstrapCommunityCommitment"
require_contains "script.js" "go(\"commitment\")"
require_contains "script.js" "checkoutCta"
require_contains "script.js" "Continua alla membership annuale"
require_contains "community-commitment.js" "citySelectionCountsAsAcceptance"
require_contains "community-commitment.js" "localStateGrantsCommitment"
require_contains "script.js" "intentionally ignored — no UI simulation, no authority"
require_file "review/commitment-visual-harness.html"
require_file "review/commitment-visual-harness.js"

echo "== Guardrails =="
if grep -Eiq 'geolocation|getCurrentPosition|navigator\.geolocation' community-commitment.js; then
  echo "FAIL: geolocation present in community-commitment helper"
  fail=1
else
  echo "OK: no geolocation in community-commitment helper"
fi
if grep -Eiq 'localStorage' community-commitment.js script.js index.html; then
  # sessionStorage remains allowed only in membership-recovery for checkout pending
  if grep -Eiq 'localStorage' community-commitment.js; then
    echo "FAIL: localStorage in community-commitment.js"
    fail=1
  else
    echo "OK: community-commitment.js has no localStorage"
  fi
fi
if grep -Eiq 'verified location|verified residence|GPS verification|device attestation' script.js community-commitment.js index.html; then
  echo "FAIL: technical verification wording present"
  fail=1
else
  echo "OK: no technical verification wording"
fi
if grep -qF 'membershipSimulated = true' script.js && grep -qF 'commitmentSnapshot' script.js; then
  echo "OK: simulated membership remains separate from commitment"
fi

echo "== Helper unit tests =="
node scripts/test-community-commitment.js

echo "== Static journey assertions =="
python3 - <<'PY'
from pathlib import Path
import re
import sys

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)

if 'go("commitment")' not in js:
    fail("ready/payment journey must route through commitment")
if "readyContinue" in js and 'go("payment")' in js:
    # readyContinue must not jump directly to payment anymore
    ready = re.search(r"readyContinue\.addEventListener\([\s\S]*?\n  \}\);", js)
    if not ready:
        fail("readyContinue listener missing")
    body = ready.group(0)
    if 'go("payment")' in body and 'go("commitment")' not in body:
        fail("readyContinue must open commitment, not payment directly")
    print("OK: readyContinue routes via commitment")

if 'id="commitment-accept"' not in html:
    fail("acceptance checkbox missing")
if "checked" in re.search(r'id="commitment-accept"[^>]*>', html).group(0):
    fail("acceptance checkbox must start unchecked")
print("OK: acceptance checkbox present and unchecked by default")

if "/v1/account/community-commitment" not in js:
    fail("commitment API path missing")
if "method: \"PUT\"" not in js and "method: 'PUT'" not in js:
    fail("commitment write must use PUT")
print("OK: authenticated PUT commitment wiring present")

if "COMMUNITY_COMMITMENT_REQUIRED" not in js:
    fail("missing-commitment Checkout error handling absent")
print("OK: missing-commitment Checkout error handled")

# No GPS on commitment path helpers
helper = Path("community-commitment.js").read_text(encoding="utf-8")
if re.search(r"geolocation|getCurrentPosition", helper, re.I):
    fail("GPS introduced in commitment helper")
print("OK: no GPS in commitment helper")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "FAIL: community commitment checks failed"
  exit 1
fi
echo "OK: community commitment checks passed"
