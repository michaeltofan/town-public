# town-public

Public web surface for **TOWN**.

## Current phase (staging)

This is a **staging** product surface, even on `towncivic.org`.

- Site: `https://towncivic.org`
- API: `https://api-staging.towncivic.org` (`ACTIVE_API_BASE` in `api-base.js`)
- Production API (`api.towncivic.org`) is **not provisioned** yet

Do not treat this host as a finished production member product.

## Live surfaces

| Surface | URL | Notes |
| --- | --- | --- |
| Public feed | `https://towncivic.org/` | Product-only mode; loads live signals from staging API. Fail-closed when signals are unavailable (no fictional civic feed). |
| Platform console | `https://towncivic.org/platform/` | Operator email+password; requires platform role on staging API. |

Onboarding / membership / payment screens remain in the codebase and can open from the membership invitation journey. They are not a separate marketed production funnel yet.

## Honesty rules (foundation)

- Feed uses live `/v1/communities/:slug/signals` data only
- No client-side “simulate membership” authority
- No client-side participate-preview unlock
- Platform Monitor backup/restore rows are **operator attestations**, not executed jobs

## Checks

```bash
npm run test:smoke
node scripts/test-see-too-active-all-roles.js
bash scripts/check-product-only-feed.sh
bash scripts/check-screen-12.sh
bash scripts/check-screen-13.sh
npm run test:e2e
```

Playwright E2E hits the live staging site (`towncivic.org`). Platform login E2E needs
`TOWN_PLATFORM_EMAIL` / `TOWN_PLATFORM_PASSWORD` (or local artifact).

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
