# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

### Screen 02 — Country Selection (approved on `main`)

### Screen 03 — City Selection (approved on `main`)

### Screen 04 — Location Verification Mock (approved on `main`)

### Screen 05 — Visitor Local Feed (approved on `main`)

### Screen 06 — Membership Invitation (approved on `main`)

### Screen 07 — Account Setup Introduction (review)

Flow after membership details **Continue**:

1. Account setup introduction (why an account is required)
2. **Back** → Screen 06 membership details (state preserved)
3. **Continue** → Screen 08 boundary only

No email input, authentication, payments, or later screens.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–07):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → mock verify → feed → **LO VEDO ANCH’IO** → invite → membership → Screen 07 (IT) → Back / Screen 08 boundary
2. Germany → Munich → mock verify → feed → **ICH SEHE DAS AUCH** → invite → membership → Screen 07 (DE) → Back / Screen 08 boundary
