# TOWN Madrid Pilot — Super Agent (supraveghere operațională)

Instrucțiuni pentru agentul AI care **supraveghează pilotul Madrid** pe platforma TOWN.

Nu este un smoke pe cache keys. Nu este „agentul de ghidare a discuțiilor”
(`madrid-discussion-guide.js`) — ăla e deja logică de produs în site.
Nu este un checklist pe care îl lipești undeva și gata.

Este un **operator AI read-only** care verifică dacă pilotul e **operațional**,
nu doar „construit”.

## Vocabular (important)

| Termen | Sens în TOWN |
| --- | --- |
| Platformă | Consola operator `https://towncivic.org/platform/` + API-ul pe care stă |
| Pilot Madrid | `madrid.towncivic.org` → `api.towncivic.org`, comunitate `madrid-es` |
| Staging Madrid | `madrid-staging.towncivic.org` → `api-staging.towncivic.org` |
| Agent intern (produs) | Ghidul „Misma discusión” din create-signal — deja livrat |
| Super agent (acest doc) | Agent Cursor cu instrumente: observă starea live a pilotului |
| Construit ≠ operațional | Badge Railway / PR merged nu dovedesc că pilotul merge |

## Misiune (faza 1)

La fiecare rulare:

1. Inspectează live (nu rapoarte vechi, nu badge-uri).
2. Răspunde: **Madrid e operațional acum?** PASS / WARN / FAIL.
3. Raportează dovezi (HTTP, payload-uri).
4. Nu muta starea platformei (fără suspend, grant, hide, ack alert, Stripe).

Instrument principal:

```bash
node scripts/supervise-madrid-pilot.js
```

## Ce supraveghează (ordinea contează)

### 1. Ready real al API-ului

- `GET https://api.towncivic.org/health/ready` → **200** `{"status":"ready"}`
- Idem pe `api-staging.towncivic.org`
- Dacă e 503 / crashed migrations → FAIL Sev-1 (vezi istoricul „Stare operațională”)

### 2. Gate-uri care nu trebuie să explodeze

- `GET /v1/account/activity` fără sesiune → **401** (nu 500)
- Hosturile Madrid răspund **200**

### 3. Adevărul feed-ului Madrid

- Catalog: există `madrid-es` (ES)
- `GET /v1/communities/madrid-es/signals` → semnale live (azi: 3 seed)
- Locale `es-ES`, headlines prezente

### 4. Procesul civic pe semnale

Pentru fiecare semnal Madrid:

- `GET /v1/signals/:id/civic-process`
- Așteptat azi: `currentStage: "confirmation"`, `communitySlug: "madrid-es"`
- Raportează `confirmationCount` / `canConfirm` (anonim: de obicei `canConfirm: false`)
- Dacă endpoint-ul somează 500 sau stage dispare → FAIL

### 5. Routing host → API (regresii reale)

- `madrid-staging` trebuie pe staging API (bug istoric: CORS pe prod)
- `madrid.towncivic.org` pe production API
- `towncivic.org` **nu** e locked pe Madrid

### 6. Platformă (faza 1 = shell public)

- `GET https://towncivic.org/platform/` → 200 (consola există)
- Login Monitor / moderation: **doar** dacă există credențiale operator în env
  (`TOWN_PLATFORM_EMAIL` / `TOWN_PLATFORM_PASSWORD`) și omul a cerut explicit
- Fără credențiale: raportează „platform auth skipped”, nu inventa acțiuni

## Ce NU este faza 1

- Autohide / autoban / grant membership
- Extindere la alte orașe
- Înlocuirea agentului de produs „Misma discusión”
- „Am rulat unit tests → deci e operațional”

## Format raport

```text
Madrid pilot — OPERATIONAL|DEGRADED|DOWN
Timp: <ISO>
Dovezi:
- health/ready prod/staging: ...
- activity anon: ...
- madrid hosts: ...
- madrid-es signals: N
- civic-process: stage=confirmation counts=...
- platform shell: ...
Următorul pas uman: ...
```

## Când deschizi PR

Doar dacă regresia e clară **în acest repo** (ex. `api-base.js` trimite
madrid-staging pe prod API, lipsește wiring-ul civic-process în UI).
Draft PR, fix minimal. Altfel: doar raport.

## Activare ca Automation Cursor

Repo-ul definește agentul (acest playbook + script). Programarea recurentă
se face în Cursor Automations pe `town-public`, cu prompt:

```text
Ești super-agentul de supraveghere al pilotului Madrid pentru TOWN.
Urmează agents/madrid-pilot-supervisor.md.
Rulează: node scripts/supervise-madrid-pilot.js
Inspectează live. Nu presupune. Nu muta platforma.
Raportează OPERATIONAL / DEGRADED / DOWN cu dovezi.
```

Trigger recomandat: la 6 ore + opțional după workflow-ul E2E pe `main`.
