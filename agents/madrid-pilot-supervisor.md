# Simț Madrid — parte din TOWN Super-Agent

Acesta **nu** este un agent separat. Este un **simț** al unei singure minți:
[`agents/cognition/MODEL.md`](../cognition/MODEL.md).

Instrumentul brut (digest civic Madrid, solo lectura, español de producto):

```bash
node scripts/supervise-madrid-pilot.js
```

Super-agentul (mintea care învață) îl apelează și scrie în cognition:

```bash
node scripts/town-super-agent.js
```

## Ce observă acest simț

- Semnale `madrid-es` (barrio, etapă, X/5, seed vs NUEVA)
- Health ca poartă (nu ca produs)
- Snapshot pentru delta în modelul lumii

## Reguli (moștenite de mintea părinte)

- Cero mutaciones en plataforma / Stripe / PR
- Si todas las seed están 0/5 → activar miembros reales (YO TAMBIÉN LO VEO)
- Señales NUEVA → abre Moderación
- 5/5 → verifica paso a proposals
- Locale debe ser es-ES

Antrenamentul și memoria persistentă trăiesc în `agents/cognition/`, nu aici.
