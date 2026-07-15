# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

### Screen 02 — Country Selection (approved on `main`)

### Screen 03 — City Selection (approved on `main`)

### Screen 04 — Location Verification Mock (approved on `main`)

### Screen 05 — Visitor Local Feed (approved on `main`)

### Screen 06 — Membership Invitation (approved on `main`)

### Screen 07 — Account Setup Introduction (approved on `main`)

### Screen 08 — Email Entry Mock (approved on `main`)

### Screen 09 — Verification Code Mock (approved on `main`)

### Screen 10 — Passkey Introduction Mock (approved on `main`)

### Screen 11 — Account Ready Mock (approved on `main`)

### Screen 12 — Membership Payment Boundary Mock (approved on `main`)

### Screen 13 — Membership Active Confirmation + Return to Originating Signal (approved on `main`)

### Signal Detail V1 (review)

Replaces the placeholder Open signal modal with a cinematic editorial detail for the currently visible signal.

1. Opens from the exact feed signal
2. Preserves community language (IT / DE)
3. Full-bleed image continuation + expanded civic context
4. Visitor: LO VEDO ANCH’IO / ICH SEHE DAS AUCH still starts membership invitation
5. Member: discreet status + completed confirmation when applicable
6. Close returns to the same feed signal
7. No comments, backend, or later screens

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview:

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → open each of the three signals → Close → LO VEDO ANCH’IO from detail still works
2. Germany → Munich → open each of the three signals → Close → member completed state remains after Screen 13 return
