#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0

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

echo "== Open Signal localization =="
require_contains "script.js" 'openSignal: "Apri il segnale"'
require_contains "script.js" 'openSignal: "Signal öffnen"'
require_contains "script.js" 'openSignal: "Deschide semnalul"'
require_contains "script.js" "function feedLocaleForScene"
require_contains "script.js" "function languageForCityId"
require_contains "script.js" "feedLocaleForScene(scene)"
require_contains "script.js" 'feedRole("feed-open-signal"'
require_contains "script.js" "openSignal.textContent = copy.openSignal"
require_contains "script.js" "openSignalDetail()"

# Old incomplete Italian CTA must not remain.
if grep -qF 'openSignal: "Apri segnale"' script.js; then
  echo "FAIL: obsolete Italian CTA 'Apri segnale' still present"
  fail=1
else
  echo "OK: obsolete Italian CTA removed"
fi

python3 - <<'PY'
from pathlib import Path
import re

js = Path("script.js").read_text(encoding="utf-8")

# Canonical FEED_COPY labels per supported locale.
expected = {
    "it": "Apri il segnale",
    "de": "Signal öffnen",
    "ro": "Deschide semnalul",
}

for lang, label in expected.items():
    block = re.search(rf"{lang}:\s*\{{(.*?)\n\s*\}},", js, re.S)
    # FEED_COPY blocks are nested; locate openSignal near each language marker more carefully.
    pass

# Extract FEED_COPY openSignal values by language using nearby cityNames anchors.
feed_copy = re.search(r"const FEED_COPY = \{([\s\S]*?)\n  \};", js)
if not feed_copy:
    raise SystemExit("FAIL: FEED_COPY not found")
body = feed_copy.group(1)

def open_signal_for(lang_key: str) -> str:
    m = re.search(
        rf"{lang_key}:\s*\{{([\s\S]*?)cityNames:",
        body,
    )
    if not m:
        raise SystemExit(f"FAIL: FEED_COPY.{lang_key} block not found")
    om = re.search(r'openSignal:\s*"([^"]+)"', m.group(1))
    if not om:
        raise SystemExit(f"FAIL: openSignal missing for {lang_key}")
    return om.group(1)

it = open_signal_for("it")
de = open_signal_for("de")
ro = open_signal_for("ro")

if it != "Apri il segnale":
    raise SystemExit(f"FAIL: Italian openSignal is {it!r}")
if de != "Signal öffnen":
    raise SystemExit(f"FAIL: German openSignal is {de!r}")
if ro != "Deschide semnalul":
    raise SystemExit(f"FAIL: Romanian openSignal is {ro!r}")

# German/Romanian must not share Italian CTA.
if de == it or ro == it:
    raise SystemExit("FAIL: German/Romanian openSignal incorrectly equals Italian")

# Per-scene locale must drive panel copy (not a single global language for all panels).
if "function feedLocaleForScene(" not in js:
    raise SystemExit("FAIL: missing feedLocaleForScene")
if "function languageForCityId(" not in js:
    raise SystemExit("FAIL: missing languageForCityId")
if "rebuildFeedPanels" not in js or "feedLocaleForScene(scene)" not in js:
    raise SystemExit("FAIL: rebuildFeedPanels must localize each scene panel")
if "openSignal.textContent = copy.openSignal" not in js:
    raise SystemExit("FAIL: openSignal label must still be applied to panels")
if 'role === "feed-open-signal"' not in js or "openSignalDetail()" not in js:
    raise SystemExit("FAIL: open-signal click must still open signal detail")

# Keep city→language mapping for existing product communities.
for fragment in (
    'if (cityId === "Milano") return "it"',
    'if (cityId === "Munich") return "de"',
    'if (cityId === "Arad") return "ro"',
):
    if fragment not in js:
        raise SystemExit(f"FAIL: missing city language mapping: {fragment}")

print("OK: Open Signal localized for it/de/ro; panels use per-scene locale")
PY

if [[ "$fail" -ne 0 ]]; then
  echo "CHECKS FAILED"
  exit 1
fi

echo "CHECKS PASSED"
