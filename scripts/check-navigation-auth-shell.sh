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

echo "== Navigation + shared auth shell (visual review) =="
require_file "index.html"
require_file "styles.css"
require_file "script.js"

require_contains "index.html" 'id="app-nav"'
require_contains "index.html" 'id="auth-window"'
require_contains "index.html" "HOME"
require_contains "index.html" "MEMBERSHIP"
require_contains "index.html" "CHAT"
require_contains "index.html" "ACTIVITY"
require_contains "index.html" "PROFILE"
require_contains "index.html" "Sign in"
require_contains "index.html" "First time here? Create account"
require_contains "index.html" "Email"
require_contains "index.html" "Phone"
require_contains "index.html" "Continue"
require_contains "index.html" "Sign in with passkey"
require_contains "index.html" "Sign in with password"
require_contains "index.html" 'id="signal-detail"'
require_contains "index.html" 'id="membership-invite"'
require_contains "index.html" "I SEE THIS TOO"
require_contains "script.js" "PRODUCT_ONLY_PUBLIC_MODE"
require_contains "script.js" "openAuthWindow"
require_contains "script.js" "closeAuthWindow"
require_contains "styles.css" ".app-nav"
require_contains "styles.css" ".auth-window"
require_contains "styles.css" "safe-area-inset-bottom"

echo "== Structural analysis =="
python3 - <<'PY'
from pathlib import Path
import re

html = Path("index.html").read_text(encoding="utf-8")
js = Path("script.js").read_text(encoding="utf-8")
css = Path("styles.css").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

# Exactly one shared auth dialog
if html.count('id="auth-window"') != 1:
    fail("expected exactly one auth-window dialog")
if html.count('id="app-nav"') != 1:
    fail("expected exactly one app-nav")

# Nav must be sibling of main.feed inside view-feed, not inside feed__chrome
feed_view = re.search(
    r'<div id="view-feed">([\s\S]*?)<div id="view-membership"',
    html,
)
if not feed_view:
    fail("could not isolate view-feed region")
region = feed_view.group(1)
if 'id="app-nav"' not in region:
    fail("app-nav must live inside view-feed")
chrome = re.search(r'<div class="feed__chrome">([\s\S]*?)</div>\s*</main>', region)
if chrome and 'id="app-nav"' in chrome.group(1):
    fail("app-nav must not be placed inside feed__chrome")
if not re.search(r'<main class="feed"[\s\S]*?</main>\s*(?:<!--[\s\S]*?-->\s*)?<nav class="app-nav"', region):
    fail("app-nav must be a sibling of main.feed")

# Exact nav order
labels = re.findall(
    r'class="app-nav__label">([^<]+)</span>',
    html,
)
if labels != ["HOME", "MEMBERSHIP", "CHAT", "ACTIVITY", "PROFILE"]:
    fail(f"nav labels/order incorrect: {labels}")

# Single nav list serves desktop + mobile (no second nav system)
if html.count('class="app-nav__list"') != 1:
    fail("expected one shared nav list for desktop and mobile")
if "hamburger" in html.lower() or "hamburger" in css.lower():
    fail("hamburger menu must not be introduced")

# Auth dialog accessibility contract
auth_block = re.search(
    r'<div\s+class="auth-window"[\s\S]*?</div>\s*</div>\s*</div>\s*<!-- Screen 06 stage 2',
    html,
)
if not auth_block:
    # Fallback: locate by id
    auth_block_match = re.search(
        r'id="auth-window"([\s\S]*?)id="view-membership"',
        html,
    )
    if not auth_block_match:
        fail("could not locate auth-window markup")
    auth_html = auth_block_match.group(0)
else:
    auth_html = auth_block.group(0)

for token in (
    'role="dialog"',
    'aria-modal="true"',
    'aria-labelledby="auth-window-title"',
    "Email",
    "Phone",
    "Continue",
    "Sign in with passkey",
    "Sign in with password",
    'id="auth-window-close"',
    'id="auth-window-dim"',
):
    if token not in auth_html and token not in html:
        fail(f"auth dialog missing {token}")

# Protected items open shared dialog; HOME closes it / stays on feed
for target in ("membership", "chat", "activity", "profile"):
    if f'handleProtectedNav(nav{target.title() if target != "membership" else "Membership"}, "{target}")' not in js and \
       f'handleProtectedNav(nav{"".join(p.capitalize() for p in target.split("-"))}, "{target}")' not in js:
        # Direct check of wiring patterns used in this slice
        pass

for fragment in (
    'handleProtectedNav(navMembership, "membership")',
    'handleProtectedNav(navChat, "chat")',
    'handleProtectedNav(navActivity, "activity")',
    'handleProtectedNav(navProfile, "profile")',
    "handleHomeNav()",
    "closeAuthWindow()",
    "openAuthWindow(",
):
    if fragment not in js:
        fail(f"missing nav/auth wiring: {fragment}")

# HOME must not open another screen / route
home_handler = re.search(
    r"function handleHomeNav\(\) \{([\s\S]*?)\n  \}",
    js,
)
if not home_handler:
    fail("missing handleHomeNav")
home_body = home_handler.group(1)
if "go(" in home_body or "location.hash" in home_body:
    fail("HOME must not navigate to another route")
if "openAuthWindow" in home_body:
    fail("HOME must not open the auth window")
if "closeAuthWindow" not in home_body:
    fail("HOME must close the auth window when selected")

# No dormant route exposure from nav/auth
nav_auth_fns = re.search(
    r"function openAuthWindow\([\s\S]*?function handleHomeNav\([\s\S]*?\n  \}",
    js,
)
if not nav_auth_fns:
    fail("could not isolate auth/nav functions")
block = nav_auth_fns.group(0)
if re.search(r'\bgo\(["\']', block):
    fail("auth/nav must not call go() to dormant routes")
for route in (
    "membership",
    "account",
    "email",
    "code",
    "passkey",
    "ready",
    "payment",
    "active",
    "ended",
    "entry",
):
    if f'go("{route}")' in block or f"go('{route}')" in block:
        fail(f"nav/auth must not expose dormant route {route}")

# Auth controls make no API calls in this visual slice
for fn_name, pattern in (
    ("authContinue", r'authContinue\.addEventListener\("click",([\s\S]*?)\}\);'),
    ("authPasskey", r'authPasskey\.addEventListener\("click",([\s\S]*?)\}\);'),
    ("authPassword", r'authPassword\.addEventListener\("click",([\s\S]*?)\}\);'),
):
    m = re.search(pattern, js)
    if not m:
        fail(f"missing {fn_name} click handler")
    body = m.group(1)
    for forbidden in (
        "requestJson",
        "fetchJson",
        "API_BASE",
        "requestEmailVerification",
        "requestPasskey",
        "fetchAuthenticationSession",
        "verifyPasskey",
        "startAuthentication",
        "go(",
        "localStorage",
        "sessionStorage",
    ):
        if forbidden in body:
            fail(f"{fn_name} must remain visual-only (found {forbidden})")
    if "preventDefault" not in body:
        fail(f"{fn_name} should prevent default and remain inert")

# Dialog Escape / backdrop / focus restoration / focus containment
if "event.key === \"Escape\"" not in js or "closeAuthWindow()" not in js:
    fail("Escape must close auth window")
esc = re.search(r'document\.addEventListener\("keydown", \(event\) => \{([\s\S]*?)\}\);', js)
if not esc:
    fail("missing keydown listener")
esc_body = esc.group(1)
if "authWindow" not in esc_body.split("signalDetail")[0]:
    # Auth Escape handling should be checked before other overlays
    if "if (!authWindow.hidden)" not in esc_body:
        fail("auth Escape handling missing")
if 'authWindowDim.addEventListener("click"' not in js:
    fail("backdrop click must close auth window")
if "lastAuthFocus" not in js or "restore.focus" not in js:
    fail("focus restoration on close missing")
if "getAuthFocusable" not in js or 'event.key === "Tab"' not in js:
    fail("Tab focus containment missing")

# Competing overlays closed before auth
open_auth = re.search(r"function openAuthWindow\([\s\S]*?\n  \}", js)
if not open_auth:
    fail("missing openAuthWindow")
open_body = open_auth.group(0)
if "closeInvite()" not in open_body or "closeSignalDetail()" not in open_body:
    fail("openAuthWindow must close invite and signal detail first")

# Nine existing feed scenes remain
for scene in (
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
    if scene not in js:
        fail(f"missing scene {scene}")

# Product-only routing remains enabled
if "const PRODUCT_ONLY_PUBLIC_MODE = true" not in js:
    fail("product-only mode must remain enabled")

# Responsive: desktop rail vs mobile bottom, same breakpoint family
if "@media (min-width: 721px)" not in css:
    fail("desktop rail breakpoint missing")
if "@media (max-width: 720px)" not in css:
    fail("mobile bottom-nav breakpoint missing")
if "env(safe-area-inset-bottom" not in css:
    fail("mobile safe-area inset missing")

# No package.json dependency additions in this visual slice
pkg = Path("package.json")
if pkg.exists():
    fail("do not add package.json / external dependency for this slice")

print("OK: navigation rail/bar, shared auth window, and visual-only guards verified")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
