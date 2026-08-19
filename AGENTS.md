# Agent guidance — town-public

Public web surface for **TOWN** (`https://towncivic.org`).

## Active automation focus

**Pilot Madrid supervision (phase 1)** is the current always-on scope.

- Playbook: [`agents/madrid-pilot-supervisor.md`](agents/madrid-pilot-supervisor.md)
- Instrument: `node scripts/supervise-madrid-pilot.js`
- Hosts: `madrid.towncivic.org` (prod) · `madrid-staging.towncivic.org` (staging)
- Community slug: `madrid-es`

If you are running as the Madrid Pilot Supervisor automation, follow that playbook
and do not expand beyond Madrid observe/fix contracts unless a human explicitly
widens scope.

## Honesty rules (all agents)

- Feed uses live `/v1/communities/:slug/signals` only — no fictional civic feed
- No client-side “simulate membership” authority
- No client-side participate-preview unlock
- Platform Monitor backup/restore rows are **operator attestations**, not executed jobs
- Staging hosts must never hit production member/payment APIs (`api-base.js`)

## Madrid pilot invariants

- Madrid pilot hosts lock the product to city id `Madrid` and UI language `es`
- `madrid-staging.towncivic.org` → `api-staging.towncivic.org`
- `madrid.towncivic.org` → `api.towncivic.org`
- `towncivic.org` itself is **not** a Madrid pilot host
- Discussion guide + first-visit intro are Madrid-host features
- CHAT welcome may show the Madrid open-data catalog for eligible members

## Default checks

Prefer the README “Checks” section. For Madrid-only supervision, start with:

```bash
node scripts/supervise-madrid-pilot.js
```

## PR discipline

- One logical change per commit/PR when possible
- Draft PRs for automation-opened fixes
- Do not merge, force-push, or amend shared history
- Do not commit secrets
