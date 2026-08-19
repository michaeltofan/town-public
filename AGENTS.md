# Agent guidance — town-public

Public surface for **TOWN**. Platform console: `https://towncivic.org/platform/`.

## Super agent activ: supraveghere Pilot Madrid

Playbook: [`agents/madrid-pilot-supervisor.md`](agents/madrid-pilot-supervisor.md)

```bash
node scripts/supervise-madrid-pilot.js
```

Verifică **stare operațională** (health/ready, activity 401≠500, feed `madrid-es`,
civic-process pe semnale, routing host→API). Nu presupune din badge-uri Railway.
Nu muta platforma în faza 1.

## Distincții

- **Agent intern Madrid** = ghidul de discuții din produs (`madrid-discussion-guide.js`)
- **Super agent** = operator AI read-only peste pilot + API (acest playbook)
- **Construit ≠ operațional**

## Honesty

- Feed doar din API live
- Fără membership simulat în client
- Backup/restore în Monitor = atestări operator, nu job-uri rulate de consolă
