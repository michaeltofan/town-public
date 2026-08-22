#!/usr/bin/env bash
# Idempotent bootstrap for the town-public Cloud Agent environment.
#
# The site itself is static (served with `python3 -m http.server`), so the only
# dependencies to install are the Playwright end-to-end harness under e2e/,
# which is deliberately kept out of the site root so the Railway static deploy
# stays intact.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root/e2e"

npm ci
npx playwright install --with-deps chromium
