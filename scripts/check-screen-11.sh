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
require_contains "index.html" "view-passkey"
require_contains "index.html" "view-code"
require_contains "index.html" "view-email"

echo "== Screen 11 structural checks =="
require_file "script.js"
require_contains "index.html" "view-ready"
require_contains "index.html" "ready-continue"
require_contains "index.html" "ready-back"
require_contains "index.html" "ready-inactive"
require_contains "index.html" "ready-error"
require_contains "index.html" "view-payment"
require_contains "script.js" "READY_COPY"
require_contains "script.js" "Il tuo account TOWN è pronto."
require_contains "script.js" "Dein TOWN-Konto ist bereit."
require_contains "script.js" 'go("ready")'
require_contains "script.js" 'go("payment")'
require_contains "script.js" "runPasskeyAuthenticationCeremony"
require_contains "script.js" "fetchAuthenticationSession"
require_contains "styles.css" ".ready__error"

echo "== Guardrails =="
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|membershipActive\s*=\s*true' index.html script.js; then
  echo "FAIL: forbidden payment/storage/dashboard pattern present"
  fail=1
else
  echo "OK: no payment form, browser storage, dashboard, or hard membership activation"
fi

echo "== Post-registration Continue → passkey auth behavioral checks =="
python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")
html = Path("index.html").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

# Isolate readyContinue click handler body
ready_start = js.find('readyContinue.addEventListener("click"')
ready_back_start = js.find('readyBack.addEventListener("click"')
if ready_start < 0 or ready_back_start < 0 or ready_back_start <= ready_start:
    fail("missing readyContinue / readyBack handlers in expected order")
ready_body = js[ready_start:ready_back_start]

# Must NOT directly navigate to payment without auth
if re.search(r'readyContinue\.addEventListener\("click"[^)]*\)\s*=>\s*\{\s*membershipSimulated\s*=\s*false;\s*go\("payment"\);', js):
    fail('obsolete direct readyContinue → go("payment") path still present')

# Direct unauthenticated transition must not exist inside readyContinue
if 'runPasskeyAuthenticationCeremony' not in ready_body:
    fail("readyContinue must start runPasskeyAuthenticationCeremony")
if "requestCheckoutSession" in ready_body or "checkoutUrl" in ready_body:
    fail("readyContinue must not start Checkout automatically")
if "localStorage" in ready_body or "sessionStorage" in ready_body:
    fail("readyContinue must not persist tokens in browser storage")

# Success path: ceremony → set sessionAuthenticated → go(payment)
ceremony_idx = ready_body.find("runPasskeyAuthenticationCeremony")
auth_flag_idx = ready_body.find("sessionAuthenticated = true")
go_payment_idx = ready_body.find('go("payment")')
if ceremony_idx < 0 or auth_flag_idx < 0 or go_payment_idx < 0:
    fail("readyContinue success path must auth, set sessionAuthenticated, then go(payment)")
if not (ceremony_idx < auth_flag_idx < go_payment_idx):
    fail("readyContinue must navigate to payment only after authenticated session confirmation")

# Failure / cancellation must not navigate
catch_idx = ready_body.find(".catch")
if catch_idx < 0:
    fail("readyContinue must handle auth failure/cancellation")
catch_body = ready_body[catch_idx:]
if 'go("payment")' in catch_body:
    fail("failed/cancelled auth must not navigate to payment")
if "sessionAuthenticated = true" in catch_body:
    fail("failed/cancelled auth must not set authenticated state")
if "showReadyError" not in catch_body:
    fail("readyContinue failures must show a bounded ready error")
if "isWebAuthnCancellation" not in catch_body:
    fail("readyContinue must map WebAuthn cancellation distinctly")

# Duplicate-submit guard + control restore
if "readyAuthSubmitting" not in ready_body:
    fail("readyContinue must guard duplicate submissions")
if "readyContinue.disabled" not in ready_body:
    fail("readyContinue must disable during ceremony")
if ".finally" not in ready_body:
    fail("readyContinue must restore control after failure/cancellation")

# Shared ceremony must probe session after AUTHENTICATED verification
ceremony_fn = re.search(
    r"function runPasskeyAuthenticationCeremony\(\)\s*\{([\s\S]*?)\n  \}",
    js,
)
if not ceremony_fn:
    fail("missing runPasskeyAuthenticationCeremony helper")
ceremony_src = ceremony_fn.group(1)
for required in (
    "requestPasskeyAuthenticationOptions",
    "startAuthentication",
    "verifyPasskeyAuthentication",
    "fetchAuthenticationSession",
):
    if required not in ceremony_src:
        fail(f"runPasskeyAuthenticationCeremony must include {required}")
# Session probe must follow verification (not precede it)
verify_idx = ceremony_src.find("verifyPasskeyAuthentication")
probe_idx = ceremony_src.find("fetchAuthenticationSession")
if not (0 <= verify_idx < probe_idx):
    fail("session probe must follow authentication verification")

# Returning-user entry login remains wired through the same helper
entry_start = js.find('entrySignIn.addEventListener("click"')
country_start = js.find('countryBack.addEventListener("click"')
if entry_start < 0 or country_start < 0:
    fail("missing entrySignIn handler")
entry_body = js[entry_start:country_start]
if "runPasskeyAuthenticationCeremony" not in entry_body:
    fail("entrySignIn (Members Login) must reuse runPasskeyAuthenticationCeremony")
if "sessionAuthenticated = true" not in entry_body:
    fail("entrySignIn must still set sessionAuthenticated on success")

# Registration remains a separate ceremony (no session pretend)
reg_verify = re.search(
    r"async function verifyPasskeyRegistration\([\s\S]*?\n  \}",
    js,
)
if not reg_verify:
    fail("missing verifyPasskeyRegistration")
reg_src = reg_verify.group(0)
if "ACCOUNT_READY" not in reg_src:
    fail("registration verify must still expect ACCOUNT_READY")
if "sessionAuthenticated" in reg_src or "AUTHENTICATED" in reg_src:
    fail("registration must not pretend to create an authenticated session")

# Minimal ready error surface present
if 'id="ready-error"' not in html:
    fail("ready screen needs ready-error status surface")

print("OK: Screen 11 post-registration passkey auth connection present")
PY

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
    "view-ready",
    "ready-label",
    "ready-inactive",
    "ready-membership",
    "ready-payment-note",
    "ready-error",
    "view-payment",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "ACCOUNT PRONTO",
    "KONTO BEREIT",
    "€12",
    "membership non è attiva",
    "Mitgliedschaft ist nicht aktiv",
    "runPasskeyAuthenticationCeremony",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
print("OK: Screen 11 Account Ready + post-registration auth present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
