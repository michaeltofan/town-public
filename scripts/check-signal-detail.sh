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

echo "== Signal Detail V1 =="
require_file "index.html"
require_file "script.js"
require_file "styles.css"
require_contains "index.html" "detail-add-testimony"
require_contains "index.html" "detail-testimony-input"
require_contains "index.html" "detail-testimony-preview"
require_contains "script.js" "detailAddTestimony"
require_contains "script.js" "canTakeCivicAction"
require_contains "script.js" "openMemberDemoTestimonyCapture"
require_contains "script.js" "beginInviteMembershipJourney"
require_contains "script.js" 'go("membership")'
require_contains "script.js" 'addTestimony: "Aggiungi testimonianza"'
require_contains "script.js" 'addTestimony: "Zeugnis hinzufügen"'
require_contains "script.js" 'addTestimony: "Adaugă mărturie"'

echo "== Member mock archive restored =="
require_file "mock/member-signal-detail.html"
require_file "mock/member-signal-detail.css"
require_file "mock/member-testimony-capture.html"
require_file "mock/member-testimony-capture.css"
require_file "mock/README.md"

echo "== Testimony gate: visitor invite / member demo capture =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

if 'id="detail-add-testimony"' not in html:
    raise SystemExit("FAIL: testimony CTA missing from index.html")
if 'id="membership-invite"' not in html:
    raise SystemExit("FAIL: membership invitation missing from index.html")
for required in (
    'id="detail-testimony-input"',
    'accept="image/*,video/*"',
    'id="detail-testimony-preview"',
    'id="detail-testimony-image"',
    'id="detail-testimony-video"',
    'id="detail-testimony-clear"',
):
    if required not in html:
        raise SystemExit(f"FAIL: restored capture primitive missing: {required}")

if not re.search(r'src="script\.js\?v=[^"]+"', html):
    raise SystemExit("FAIL: public HTML must reference a cache-invalidating script.js URL")

handler = re.search(
    r'detailAddTestimony\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);',
    js,
)
if not handler:
    raise SystemExit("FAIL: detailAddTestimony click handler not found")
body = handler.group(1)

if "canTakeCivicAction()" not in body:
    raise SystemExit("FAIL: testimony CTA must gate on canTakeCivicAction")
if "openMemberDemoTestimonyCapture()" not in body:
    raise SystemExit("FAIL: participating members must open restored demo capture")
for fragment in (
    "originatingFeedIndex = feedIndex",
    "closeSignalDetail()",
    "openInvite()",
):
    if fragment not in body:
        raise SystemExit(f"FAIL: non-participating testimony path missing '{fragment}'")

# Capture activation must live only inside the member helper / gated path.
helper = re.search(
    r"function openMemberDemoTestimonyCapture\(\)\s*\{([\s\S]*?)\n  \}",
    js,
)
if not helper:
    raise SystemExit("FAIL: missing openMemberDemoTestimonyCapture")
helper_body = helper.group(1)
if "detailTestimonyInput.click()" not in helper_body and "showPicker" not in helper_body:
    raise SystemExit("FAIL: member capture helper must open the file picker")

# Demo must remain local — no upload endpoints for testimony media.
if re.search(r"/v1/.+testimony|FormData\(|uploadTestimony|multipart/form-data", js):
    raise SystemExit("FAIL: demo capture must not upload testimony media")

invite_continue = re.search(
    r'inviteContinue\.addEventListener\("click",\s*\(\)\s*=>\s*\{([\s\S]*?)\}\);',
    js,
)
if not invite_continue:
    raise SystemExit("FAIL: inviteContinue handler not found")
invite_body = invite_continue.group(1)
if "beginInviteMembershipJourney()" not in invite_body:
    raise SystemExit("FAIL: inviteContinue must begin the membership invitation journey")
if 'go("membership")' not in invite_body:
    raise SystemExit("FAIL: inviteContinue must transition to membership")

print("OK: member demo capture gated by canParticipate; visitors still hit membership invite")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "SIGNAL DETAIL CHECKS FAILED"
  exit 1
fi
echo "SIGNAL DETAIL CHECKS PASSED"
