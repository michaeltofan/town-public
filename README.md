# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

### Screen 02 — Country Selection (approved on `main`)

### Screen 03 — City Selection (approved on `main`)

### Screen 04 — Location Verification Mock (approved on `main`)

### Screen 05 — Visitor Local Feed (approved on `main`)

### Screen 06 — Membership Invitation (review)

Flow after **I SEE THIS TOO**:

1. Contextual invitation over the originating signal
2. Membership details (`€12/year`)
3. **Not now** → experience end → Return to TOWN Entry
4. **Continue** → Screen 07 boundary only

No account creation, payments, authentication, or later screens.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–06):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → mock verify → feed → **LO VEDO ANCH’IO** → invite → membership / Not now / Screen 07 boundary
2. Germany → Munich → mock verify → feed → **ICH SEHE DAS AUCH** → invite → membership / Not now / Screen 07 boundary
