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

### Screen 12 — Membership Payment Boundary Mock (review)

Flow after Screen 11 **Continue**:

1. Payment boundary with €12/year terms
2. Account ready / Membership inactive
3. Prototype note: real payment not active; payment provider not integrated
4. Simulate membership activation → notice → simulate → mock success
5. **Back** → Screen 11
6. **Continue** → Screen 13 boundary only

No real payment. No real entitlement. No membership activation beyond prototype simulation.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–12):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → … → Screen 11 → Screen 12 (IT) → simulate → success → Screen 13 boundary
2. Germany → Munich → … → Screen 11 → Screen 12 (DE) → simulate → success → Screen 13 boundary
