# town-public

Public web surface for **TOWN**.

## Current phase — production live + staging isolated

- Live site: `https://towncivic.org` → `https://api.towncivic.org`
- Staging site: `https://town-public-staging-staging.up.railway.app` → `https://api-staging.towncivic.org`
- Routing is host-aware in `api-base.js` so staging cannot hit live member/payment data

## Live surfaces

| Surface | URL | Notes |
| --- | --- | --- |
| Public feed | `https://towncivic.org/` | Product-only mode; loads live signals from production API. Fail-closed loading/empty states (no fictional civic feed). |
| Platform console | `https://towncivic.org/platform/` | Operator email+password; requires platform role on production API. |

Member journey (Etapa 3) on the public surface:

- HOME → member community first; other cities only in a separate explore zone
- MEMBERSHIP → auth when needed, then commitment / recovery / profile by membership truth
- PROFILE / ACTIVITY → session-authenticated destinations
- CHAT → membership welcome (intro + Madrid open-data link) when civic participation is active; otherwise honest “not available yet”
- I SEE THIS TOO → confirm in-community; explore-only notice outside; invite only without membership
- Stripe return → bounded membership recovery; paid-without-participate stays fail-closed
- A community-mismatch 403 is never treated as “not a member”

### First-member staging proof (current)

Already proven live against `api-staging` (2026-08-02):

1. Community commitment → participate on the platform **owner** path
2. Signal confirmation + discussion contribution + activity
3. Stripe **test** Checkout (`cs_test_…`) with test card `4242…` (0 €)
4. Webhook → membership `active`, `source: stripe`, `accessUntil` ~+1 year

Production API + Stripe live are provisioned. First real €12 membership payment
is proven on `api.towncivic.org`.

## Honesty rules (foundation)

- Feed uses live `/v1/communities/:slug/signals` data only
- No client-side "simulate membership" authority
- No client-side participate-preview unlock
- No local fake see-too confirmation when the API signal id is missing
- Platform Monitor backup/restore rows are **operator attestations**, not executed jobs

## Madrid pilot supervision

Operator utility digest for Pilot Madrid (civic progress + actions), not uptime theatre.

Playbook: [`agents/madrid-pilot-supervisor.md`](agents/madrid-pilot-supervisor.md)

```bash
node scripts/supervise-madrid-pilot.js
```

## Checks

```bash
node scripts/supervise-madrid-pilot.js --offline --skip-units
node scripts/test-api-base.js
node scripts/test-security-headers-config.js
node scripts/test-member-local-feed.js
node scripts/test-platform-console.js
node scripts/test-owner-participate-preview.js
node scripts/test-see-too-active-all-roles.js
node scripts/test-etapa3-member-journey.js
node scripts/test-member-chat-welcome.js
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
- API: `https://api.towncivic.org`

Sign in with email + password on an account granted as platform operator
(bootstrap CLI or Operators panel). Prefer this URL over Railway public hosts.
