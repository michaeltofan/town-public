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
require_contains "index.html" "view-ready"
require_contains "index.html" "view-passkey"
require_contains "index.html" "view-code"

echo "== Screen 12 structural checks =="
require_file "script.js"
require_contains "index.html" "view-payment"
require_contains "index.html" "payment-simulate-start"
require_contains "index.html" "payment-error"
require_contains "index.html" "payment-notice"
require_contains "index.html" "payment-simulate-confirm"
require_contains "index.html" "payment-success"
require_contains "index.html" "view-active"
require_contains "script.js" "PAYMENT_COPY"
require_contains "script.js" "Attiva l’iscrizione annuale a TOWN."
require_contains "script.js" "Aktiviere die jährliche TOWN-Mitgliedschaft."
require_contains "script.js" "membershipSimulated"
require_contains "script.js" "/v1/billing/checkout-session"
require_contains "script.js" "requestCheckoutSession"
require_contains "script.js" "postJsonWithCredentials"
require_contains "script.js" "checkoutUrl"
require_contains "script.js" 'go("payment")'
require_contains "script.js" 'go("active")'
require_contains "script.js" "/v1/account/membership"
require_contains "script.js" "setCheckoutPendingMarker"
require_contains "index.html" "membership-recovery.js"
require_contains "index.html" "payment-confirming"

echo "== Guardrails =="
# Card forms, secrets, and hosted Stripe Checkout URL literals remain forbidden.
# Intended billing uses POST /v1/billing/checkout-session via postJsonWithCredentials
# (requestJson / window.fetch.bind) and redirects to the returned checkoutUrl —
# do not treat that API field name as the forbidden checkout.stripe pattern.
# sessionStorage is forbidden in script.js/index.html; the advisory checkout-pending
# marker lives only in membership-recovery.js (see check-membership-recovery.sh).
if grep -Eiq 'card number|paymentIntent|type="password"|fetch\(|XMLHttpRequest|localStorage|sessionStorage|dashboard|followers|trending|sk_live|pk_live|checkout\.stripe' index.html script.js; then
  echo "FAIL: forbidden payment/checkout pattern present"
  fail=1
else
  echo "OK: no payment form, hosted Stripe checkout URL, or storage patterns in index/script"
fi
if grep -Eiq '<input[^>]+(card|billing|cvv|cvc)' index.html; then
  echo "FAIL: card/billing inputs present"
  fail=1
else
  echo "OK: no card/billing inputs"
fi
if grep -qF '/v1/billing/checkout-session' script.js \
  && grep -qF 'postJsonWithCredentials' script.js \
  && grep -qF 'requestCheckoutSession' script.js \
  && grep -qF 'checkoutUrl' script.js \
  && grep -qF 'credentials: "include"' script.js; then
  echo "OK: real checkout-session wiring present (credentialed POST)"
else
  echo "FAIL: checkout-session wiring incomplete"
  fail=1
fi

echo "== Checkout remains a separate Activate-membership action =="
python3 - <<'PY'
from pathlib import Path

js = Path("script.js").read_text(encoding="utf-8")

def fail(msg):
    raise SystemExit("FAIL: " + msg)

ready_start = js.find('readyContinue.addEventListener("click"')
ready_back = js.find('readyBack.addEventListener("click"')
if ready_start < 0 or ready_back <= ready_start:
    fail("missing readyContinue handler")
ready_body = js[ready_start:ready_back]
if "requestCheckoutSession" in ready_body or "checkoutUrl" in ready_body:
    fail("readyContinue must not start Checkout; Activate membership remains separate")
if "runPasskeyAuthenticationCeremony" not in ready_body:
    fail("readyContinue must authenticate before membership screen")
if 'go("commitment")' not in ready_body:
    fail('authenticated readyContinue must reach go("commitment") before Checkout')
if 'go("payment")' in ready_body:
    fail("readyContinue must not skip commitment by going directly to payment")

pay_start = js.find('paymentSimulateStart.addEventListener("click"')
pay_confirm = js.find('paymentSimulateConfirm.addEventListener("click"')
if pay_start < 0:
    fail("missing paymentSimulateStart (Activate membership) handler")
# Handler may be followed by commitment helpers; bound by next payment* listener or commitmentCheckout
pay_end = js.find('paymentSimulateConfirm.addEventListener("click"', pay_start + 1)
if pay_end <= pay_start:
    pay_end = js.find("commitmentCheckout.addEventListener", pay_start + 1)
if pay_end <= pay_start:
    fail("unable to isolate paymentSimulateStart handler")
pay_body = js[pay_start:pay_end]
if "requestCheckoutSession" not in pay_body:
    fail("Activate membership must still call requestCheckoutSession")
if 'go("commitment")' not in js:
    fail("commitment route must exist before Checkout")
if "commitment-checkout" not in Path("index.html").read_text(encoding="utf-8"):
    fail("commitment Checkout CTA missing from HTML")
print("OK: Checkout remains gated; readyContinue authenticates then opens commitment")
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
    "view-payment",
    "payment-intro",
    "payment-success",
    "payment-error",
    "payment-notice",
    "payment-continue",
    "view-active",
):
    if fragment not in html:
        raise SystemExit(f"Missing fragment: {fragment}")

js = Path("script.js").read_text(encoding="utf-8")
for fragment in (
    "MEMBERSHIP ANNUALE",
    "JÄHRLICHE MITGLIEDSCHAFT",
    "/v1/billing/checkout-session",
    "requestCheckoutSession",
    "Attiva membership",
    "Mitgliedschaft aktivieren",
    "Activează membership-ul",
    "Non hai effettuato l’accesso oppure la sessione è scaduta.",
    "Hai già una membership attiva. Gestisci l’abbonamento esistente.",
    "Troppi tentativi. Riprova tra poco.",
    "Il pagamento non è disponibile in questo momento.",
    "Non è stato possibile avviare il checkout. Riprova.",
    "solo prototipo",
    "nur Prototyp",
    "Nessun pagamento reale",
    "keine echte Zahlung",
):
    if fragment not in js:
        raise SystemExit(f"Missing JS fragment: {fragment}")
if "window.location = checkoutUrl" not in js and "window.location=checkoutUrl" not in js:
    raise SystemExit("Missing checkoutUrl redirect")
print("OK: Screen 12 real Stripe checkout-session wiring present")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
