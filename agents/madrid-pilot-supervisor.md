# TOWN Madrid Pilot Supervisor (phase 1)

Always-on / scheduled Cloud Agent playbook for **supervising Pilot Madrid only**.

This is the instruction source for a Cursor Automation. Paste the
[Automation prompt](#automation-prompt-paste-ready) into
[cursor.com/automations](https://cursor.com/automations). Keep phase 1
**observe-first**: report and fix clear public regressions; do not operate
the platform console as a human operator would.

## Why now

Pilot Madrid is live on dedicated hosts with product contracts already shipped:

| Surface | Role |
| --- | --- |
| `madrid.towncivic.org` | Production pilot host → `api.towncivic.org` |
| `madrid-staging.towncivic.org` | Staging pilot host → `api-staging.towncivic.org` |
| `madrid-es` community | Live Spanish seed feed (3 signals) |
| First-visit intro | Spanish civic framing + individual liability |
| Discussion guide | Client matcher that routes drafts into the same thread |
| CHAT welcome | Madrid open-data catalog for active members |
| Platform Monitor | Operator console at `/platform/` (human-gated mutations) |

Automation should watch these contracts continuously so humans stay focused on
civic judgment, not host/routing/localization regressions.

## Mission

1. Detect regressions on Madrid pilot hosts and Madrid-related public contracts.
2. Keep honesty rules intact (no fake feed, no client-side membership unlock).
3. Produce a short supervision report every run.
4. Open a PR **only** when a clear, reproducible Madrid pilot regression is found
   in this repository and a minimal fix is safe.

## Hard boundaries (phase 1)

Do **not**:

- Grant, revoke, suspend, or otherwise mutate accounts / memberships
- Acknowledge platform alerts, attest backups, or run restore drills
- Charge or refund Stripe / touch live payment configuration
- Expand scope to non-Madrid cities or “full platform automation”
- Invent civic content, fake signals, or simulated membership state
- Force-push, amend shared history, or merge PRs
- Store or print secrets, cookies, or platform passwords

Do:

- Run `node scripts/supervise-madrid-pilot.js` (and `--offline` if live network is blocked)
- Run Madrid unit contracts listed below when diagnosing failures
- Fetch public HTTP/JSON only (hosts + public API)
- Prefer staging diagnosis before production code changes
- Keep Spanish-only UI rules for Madrid pilot hosts

## Tools this agent should use

| Tool | Use |
| --- | --- |
| Shell | Run supervisor script + Madrid unit tests |
| Browser / computer use | Optional visual check of `madrid.towncivic.org` / staging when HTML contracts fail |
| `gh` (read-only) | Inspect recent Madrid PRs / failed Actions |
| Git + PR | Only for clear repo regressions with a minimal fix |
| Memories (automation) | Remember recurring false alarms / last known-good signal counts |
| Slack (optional) | Send a short FAIL/WARN digest if configured |

Platform console login is **out of phase 1** unless the human operator provides
an explicit, time-boxed request. Public Monitor HTML reachability is enough.

## Supervision checklist

### A. Live hosts

1. `GET https://madrid.towncivic.org/` → 200
2. `GET https://madrid-staging.towncivic.org/` → 200
3. Both HTML bodies include:
   - `madrid-pilot-host.js`
   - `madrid-discussion-guide.js`
   - `api-base.js?v=madrid-pilot-1`
   - `script.js?v=madrid-es-6`
   - `#madrid-pilot-intro`
   - `#chat-madrid-link`
   - `https://datos.madrid.es/dataset/`

### B. API routing honesty

From repo modules (also covered by `scripts/test-api-base.js`):

- `madrid-staging.towncivic.org` → `https://api-staging.towncivic.org`
- `madrid.towncivic.org` → `https://api.towncivic.org`
- `towncivic.org` is **not** a Madrid pilot host

### C. Madrid feed truth

- `GET /v1/communities` includes `slug: madrid-es`, `countryCode: ES`, city Madrid
- `GET /v1/communities/madrid-es/signals` on prod + staging returns live signals
- Locales are `es-ES`; headlines present
- Expected seed count today: **3** (warn if different; investigate before “fixing”)

### D. Local contracts (always)

```bash
node scripts/supervise-madrid-pilot.js
node scripts/test-madrid-pilot-host.js
node scripts/test-madrid-pilot-intro.js
node scripts/test-madrid-discussion-guide.js
node scripts/test-spanish-localization.js
node scripts/test-member-chat-welcome.js
node scripts/test-api-base.js
```

### E. Platform shell (read-only)

- `GET https://towncivic.org/platform/` → 200 and still exposes Monitor chrome
- Do not authenticate unless explicitly asked in a later phase

## Decision rules

| Finding | Action |
| --- | --- |
| All checks PASS | Report PASS. No PR. Update memory with timestamp. |
| WARN only (e.g. signal count drift) | Report WARN with evidence. No PR unless honesty is broken. |
| FAIL on live HTML missing Madrid assets / wrong cache keys | Fix in repo if main drifted; open draft PR; cite supervisor output. |
| FAIL on staging→production API mis-route | Treat as Sev-1 for Madrid staging; fix `api-base.js` + tests; draft PR. |
| FAIL on Spanish lock / intro / discussion guide unit tests | Minimal fix + draft PR. |
| Platform Monitor HTML down | Report FAIL; do not invent operator actions. |
| Ambiguous civic/moderation issue | Report only; leave to humans. |

## Report format (every run)

```text
Madrid pilot supervisor — PASS|WARN|FAIL
Time: <ISO>
Mode: live|offline

Hosts: ...
API catalog/signals: ...
Local contracts: ...
Unit tests: ...

Actions taken: none | draft PR <url>
Next human follow-up: ...
```

## Key code map

- `madrid-pilot-host.js` — hostname → Madrid lock
- `api-base.js` — staging/production API resolution for Madrid hosts
- `madrid-discussion-guide.js` — same-thread draft matcher
- `script.js` — intro, Spanish lock, guide wiring, CHAT open-data
- `community-commitment.js` — `Madrid` → `madrid-es`
- `platform/` — operator Monitor (human authority)
- `scripts/supervise-madrid-pilot.js` — this agent’s primary instrument

## Suggested Cursor Automation settings

- **Name:** `TOWN Madrid Pilot Supervisor`
- **Trigger:** schedule every 6 hours (or cron `0 */6 * * *`) + optional
  GitHub `workflow_run` completed for `.github/workflows/e2e.yml` on `main`
- **Repository:** `michaeltofan/town-public` on `main`
- **Tools:** Memories on; PR creation on; Slack optional; no extra MCPs required
- **Model:** default cloud agent model is fine
- **Permission:** Private until the report quality is trusted, then Team Visible

## Automation prompt (paste-ready)

```text
You are the TOWN Madrid Pilot Supervisor for repo michaeltofan/town-public.

Read and follow agents/madrid-pilot-supervisor.md exactly. Phase 1 is observe-first for Pilot Madrid only.

Required first step:
  node scripts/supervise-madrid-pilot.js

If the environment blocks egress, run:
  node scripts/supervise-madrid-pilot.js --offline
and say which live probes were skipped.

Then run any failing Madrid unit tests listed in the playbook.

Decision rules:
- PASS → short report only, no PR
- WARN → report with evidence, no PR unless honesty is broken
- FAIL with a clear repo regression → minimal fix on a cursor/* branch, draft PR, include supervisor output
- Never mutate platform operator state, memberships, Stripe, alerts, backups, or restores
- Never expand to non-Madrid cities in this phase
- Never invent civic feed content or simulate membership

End with the report format from the playbook.
```

## Later phases (out of scope now)

- Authenticated Platform Monitor reads (status/uptime/alerts) with a dedicated operator bot account
- Moderation queue triage suggestions (still human-approved)
- Membership funnel anomaly digests
- Multi-city supervision after Madrid is stable
