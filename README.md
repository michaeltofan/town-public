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

### Screen 09 — Verification Code Mock (review)

Flow after Screen 08 **Continue**:

1. Verification code mock (prototype code `123456`)
2. Verify disabled until `123456` is entered
3. **Change email** → Screen 08 (state preserved)
4. **Verify** → Screen 10 boundary only

No real code is sent. No real email verification. No real account is created.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–09):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → … → Screen 08 → Screen 09 (IT) → validation → Change email / Screen 10 boundary
2. Germany → Munich → … → Screen 08 → Screen 09 (DE) → validation → Change email / Screen 10 boundary
