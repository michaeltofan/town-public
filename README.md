# town-public

Public web surface for **TOWN**.

## Current phase (staging) — Etapa 3 member journey

This is a **staging** product surface, even on `towncivic.org`.

- Site: `https://towncivic.org`
- API: `https://api-staging.towncivic.org` (`ACTIVE_API_BASE` in `api-base.js`)
- Production API (`api.towncivic.org`) is **not provisioned** yet

Do not treat this host as a finished production member product.

## Live surfaces

| Surface | URL | Notes |
| --- | --- | --- |
| Public feed | `https://towncivic.org/` | Product-only mode; loads live signals from staging API. Fail-closed loading/empty states (no fictional civic feed). |
| Platform console | `https://towncivic.org/platform/` | Operator email+password; requires platform role on staging API. |

Member journey (Etapa 3) on the public surface:

- HOME → live feed (loading / empty / retry)
- MEMBERSHIP → auth when needed, then commitment / recovery / profile by membership truth
- PROFILE / ACTIVITY → session-authenticated destinations
- CHAT → honest “not available yet” (no fake auth destination)
- I SEE THIS TOO → invite or API confirmation with visible failure feedback
- Stripe return → bounded membership recovery; paid-without-participate stays fail-closed

### First-member staging proof (current)

Already proven live against `api-staging` (2026-08-02):

1. Community commitment → participate on the platform **owner** path
2. Signal confirmation + discussion contribution + activity
3. Stripe **test** Checkout (`cs_test_…`) with test card `4242…` (0 €)
4. Webhook → membership `active`, `source: stripe`, `accessUntil` ~+1 year

Next for real €12: provision `api.towncivic.org` + Stripe **live**, then flip
`ACTIVE_API_BASE` in `api-base.js`. Do not flip while production DNS/API is absent.
Staging cutover details live in `town-api` → `docs/operations/PRODUCTION_CUTOVER_V1.md`.

## Honesty rules (foundation)

- Feed uses live `/v1/communities/:slug/signals` data only
- No client-side "simulate membership" authority
- No client-side participate-preview unlock
- No local fake see-too confirmation when the API signal id is missing
- Platform Monitor backup/restore rows are **operator attestations**, not executed jobs

## Checks

```bash
node scripts/test-api-base.js
node scripts/test-platform-console.js
node scripts/test-owner-participate-preview.js
node scripts/test-see-too-active-all-roles.js
node scripts/test-etapa3-member-journey.js
bash scripts/check-product-only-feed.sh
bash scripts/check-screen-12.sh
bash scripts/check-screen-13.sh
(cd e2e && npm ci && npx playwright test)
```

Playwright lives under `e2e/` so the site root stays static for Railway.
GitHub Actions (`.github/workflows/e2e.yml`) runs smoke + live E2E against
`towncivic.org`. Do not use `secrets.*` in workflow `if:` expressions — that
fails the whole run at parse time. Platform login skips cleanly when
`TOWN_PLATFORM_EMAIL` / `TOWN_PLATFORM_PASSWORD` are unset.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/` or `http://localhost:4173/platform/`.
Uses the same staging API. Browser auth against staging from `localhost` may fail CORS/cookie policy unless the API allowlists that origin.

## Platform operator console

One console. One API.

- Console: `https://towncivic.org/platform/`
- API: `https://api-staging.towncivic.org`

Sign in with email + password on an account granted as platform operator
(bootstrap CLI or Operators panel). Prefer this URL over Railway public hosts.
