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

### Screen 11 — Account Ready Mock (review)

Flow after Screen 10 passkey simulation **Continue**:

1. Account Ready confirmation (prototype)
2. Clear distinction: Account ready ≠ Membership active
3. Membership context: €12/year; no real payment
4. **Back** → Screen 10 success state
5. **Continue** → Screen 12 boundary only

No membership activation. No payment fields. No real session.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–11):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → … → Screen 10 simulate → Screen 11 (IT) → Back / Screen 12 boundary
2. Germany → Munich → … → Screen 10 simulate → Screen 11 (DE) → Back / Screen 12 boundary
