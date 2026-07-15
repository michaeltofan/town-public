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

### Screen 08 — Email Entry Mock (review)

Flow after Screen 07 **Continue**:

1. Email entry (prototype input only)
2. Continue disabled until a valid email is entered
3. **Back** → Screen 07 (state preserved)
4. **Continue** → Screen 09 boundary only

No real email is sent. No real account is created. No authentication.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–08):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → … → Screen 07 → Screen 08 (IT) → validation → Back / Screen 09 boundary
2. Germany → Munich → … → Screen 07 → Screen 08 (DE) → validation → Back / Screen 09 boundary
