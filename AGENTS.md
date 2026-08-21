# Agent guidance — town-public

## TOWN Super-Agent (o singură minte cognitivă)

Nu rulăm o flotă de agenți. Un singur organism care **percepe → învață → decide → se îmbunătățește**.

Contract: [`agents/cognition/MODEL.md`](agents/cognition/MODEL.md)

```bash
node scripts/town-super-agent.js
node scripts/town-super-agent.js --feedback "util: …"   # antrenament
node scripts/town-super-agent.js --feedback "zgomot: …"
node scripts/town-super-agent.js --feedback "regulă: …"
```

- **Identitate:** `town-super-agent`
- **Creier:** `agents/cognition/state.json` + `lessons.json` + `feedback.jsonl`
- **Simțuri (nu agenți):** Madrid civic, health probes; Platform (citire) când există credențiale
- **Livrare:** ce trebuie făcut acum (buclă civică), nu teatru de uptime
- **Antrenament:** feedback uman → lecții durabile în repo

Simț Madrid (digest brut): `node scripts/supervise-madrid-pilot.js` — folosit intern de super-agent.

## Honesty

- Feed solo desde API live
- Sin membership simulado en cliente
- Mutaciones de plataforma: humanas, hasta fase explícita

## Decizie produs — pilot Madrid (confirmată)

**Confirmarea unui semnal (`YO TAMBIÉN LO VEO`) trebuie să fie posibilă fără plată în pilotul Madrid.**

- Scop: testa ideea civică, nu toleranța la paywall de 12 €
- **Nu** se implementează prin bypass în client (interzis: membership simulat / participate-preview)
- Deblocarea reală cere ca **API-ul** să acorde `canParticipate` / `canConfirm` pe Madrid fără Stripe (cont identificat + comunitate), până la o fază de membership plătit
- Până atunci: **nu** recruta pe FRAVM — funnel-ul încă arde audiența pe plată
