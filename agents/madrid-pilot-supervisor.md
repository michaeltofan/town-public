# Piloto Madrid — Super agente (utilidad, español)

Entrenamos y probamos **solo Madrid**. Todo el output del agente hacia Mickey
sobre el piloto va en **español** (idioma del producto en
`madrid.towncivic.org`).

## Qué hace

En cada run:

1. **A. Qué debes hacer ahora** (acciones priorizadas)
2. **B. Delta** vs Memories (confirmaciones / señales nuevas)
3. **C. Señales** `madrid-es` (barrio, etapa, X/5, seed vs NUEVA)
4. **D. Health** solo como puerta

## Cómo “aprende” (entrenamiento)

Memories guarda el snapshot JSON del digest (`memory` / bloque Memories).
En el run siguiente compara y escribe el delta en español.

Feedback humano (entrenamiento):
- Si una acción fue útil → déjala
- Si fue ruido → dilo en el próximo mensaje al agente / ajusta el prompt
- No ampliamos a otras ciudades en esta fase

## Instrumento

```bash
node scripts/supervise-madrid-pilot.js
```

## Prompt Automations (pegar tal cual)

```text
Eres el super-agente de OPERACIÓN del piloto Madrid (TOWN).
Solo Madrid. Solo lectura. Todo el informe en español.

1) Si existe en el repo, ejecuta: node scripts/supervise-madrid-pilot.js
2) Lee Memories (último snapshot de confirmationCount / nonSeedCount).
3) Informe en este orden estricto:
   A. Qué debes hacer ahora (máx. 5 bullets, priorizados)
   B. Delta vs run anterior (Memories)
   C. Señales madrid-es: barrio, etapa, X/5, seed vs NUEVA
   D. Health — una línea; detalle solo si está DOWN

Reglas:
- Cero mutaciones en plataforma / Stripe / PR.
- Si todas las seed están 0/5 → acción #1: activar miembros reales con YO TAMBIÉN LO VEO (no digas “todo verde”).
- Señales NUEVA → “abre Moderación en la plataforma”.
- 5/5 en una señal → “verifica el paso a proposals”.
- Locale debe ser es-ES; si no, alerta de idioma.
- Actualiza Memories con el JSON de snapshot (counts + ids).
- Español breve. Sin relleno.
```

## Siguiente nivel (cuando haya credenciales operator)

Con `TOWN_PLATFORM_EMAIL` / `TOWN_PLATFORM_PASSWORD` en el environment:
leer Moderación / Memberships de Madrid y proponer casos (sin ejecutar).
