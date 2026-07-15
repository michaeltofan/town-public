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

### Screen 13 — Membership Active Confirmation + Return to Originating Signal (review)

Flow after Screen 12 mock success **Continue**:

1. Membership active confirmation — prototype only
2. Selected local community + discreet member status
3. Account setup complete / participation active in the prototype
4. Explicit note: no real payment, no real entitlement
5. **Back** → Screen 12 mock success state
6. **Return to the signal** → exact originating feed scene
7. Visitor status replaced by discreet member status
8. I SEE THIS TOO shown as completed (prototype-only confirmation)
9. Open signal remains available
10. User remains on the local feed — no Screen 14

No real payment. No real entitlement. No real civic confirmation stored.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–13):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → feed → any scene → LO VEDO ANCH’IO → … → Screen 12 simulate → Screen 13 (IT) → Back → Return to the signal → originating Milano scene completed
2. Germany → Munich → feed → any scene → ICH SEHE DAS AUCH → … → Screen 12 simulate → Screen 13 (DE) → Back → Return to the signal → originating Munich scene completed
