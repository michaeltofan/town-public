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
    echo "FAIL: forbidden '$pattern' present in $file"
    fail=1
  else
    echo "OK: absent '$pattern' from $file"
  fi
}

echo "== Review harness isolation files =="
require_file "review/commitment-visual-harness.html"
require_file "review/commitment-visual-harness.js"
require_file "scripts/test-review-harness-isolation.js"
require_file "screen-commitment-boundary.html"
require_file "script.js"
require_file "index.html"

echo "== Production entry ignores townReview simulation =="
require_absent "script.js" 'enteredEmail = "review@towncivic.org"'
require_absent "script.js" "review@towncivic.org"
if grep -E 'params\.get\("townReview"\)' -A20 script.js | grep -q 'sessionAuthenticated = true'; then
  echo "FAIL: product still sets sessionAuthenticated from townReview"
  fail=1
else
  echo "OK: townReview does not set sessionAuthenticated in product"
fi
if grep -E 'params\.get\("townReview"\)' -A40 script.js | grep -q 'commitmentSnapshot = {'; then
  echo "FAIL: product still manufactures commitmentSnapshot from townReview"
  fail=1
else
  echo "OK: townReview does not manufacture commitmentSnapshot in product"
fi
require_contains "script.js" "intentionally ignored — no UI simulation, no authority"
require_contains "script.js" "review/commitment-visual-harness.html"

echo "== Product does not load the review harness =="
require_absent "index.html" "commitment-visual-harness"
require_absent "index.html" "townReview"
require_absent "index.html" "screen-commitment-boundary"

echo "== Boundary points at isolated harness, not product index =="
require_contains "screen-commitment-boundary.html" "review/commitment-visual-harness.html"
require_absent "screen-commitment-boundary.html" "index.html?townReview"

echo "== Harness does not load product script or call APIs =="
require_absent "review/commitment-visual-harness.html" 'src="../script.js"'
require_absent "review/commitment-visual-harness.html" 'src="script.js"'
require_absent "review/commitment-visual-harness.html" "membership-recovery.js"
require_absent "review/commitment-visual-harness.js" "/v1/account/"
require_absent "review/commitment-visual-harness.js" "/v1/billing/"
require_absent "review/commitment-visual-harness.js" "/v1/authentication/"
require_absent "review/commitment-visual-harness.js" "api-staging.towncivic.org"
require_absent "review/commitment-visual-harness.js" "fetch("
require_contains "review/commitment-visual-harness.js" "network fetch is disabled"
require_contains "review/commitment-visual-harness.js" "REVIEW-ONLY"

echo "== Eight approved fixture names preserved =="
for name in \
  commitment-no-country \
  commitment-country-only \
  commitment-city-no-accept \
  commitment-accept-pending \
  commitment-rejected \
  commitment-recorded \
  commitment-no-acceptance-existing \
  commitment-restored; do
  require_contains "review/commitment-visual-harness.js" "\"$name\""
done

echo "== Deterministic isolation unit tests =="
node scripts/test-review-harness-isolation.js

if [[ "$fail" -ne 0 ]]; then
  echo "FAIL: review harness isolation checks failed"
  exit 1
fi
echo "OK: review harness isolation checks passed"
