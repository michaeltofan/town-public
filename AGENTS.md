# Agent guidance — town-public

## Super agent Madrid (utilitate)

Playbook: [`agents/madrid-pilot-supervisor.md`](agents/madrid-pilot-supervisor.md)

```bash
node scripts/supervise-madrid-pilot.js
```

Livrează **ce ai de făcut acum** pe pilotul Madrid (civic progress, semnale noi, health ca poartă). Nu e un smoke de uptime.

## Honesty

- Feed doar din API live
- Fără membership simulat în client
- Mutările pe platformă rămân umane până la o fază explicită
