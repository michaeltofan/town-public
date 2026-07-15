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

### Screen 10 — Passkey Introduction Mock (review)

Flow after Screen 09 verify with `123456`:

1. Passkey introduction (why secure access, device methods, benefits)
2. Primary action → prototype notice (no WebAuthn)
3. **Simulate setup** → success state
4. **Back** → Screen 09 (state preserved)
5. **Continue** → Screen 11 boundary only

No real passkey is created. No authentication credential is stored.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive browser preview (Screens 01–10):

**https://aged-front-perfectly-guys.trycloudflare.com/**

Review paths:

1. Italy → Milano → … → Screen 09 (`123456`) → Screen 10 (IT) → notice → simulate → success → Screen 11 boundary
2. Germany → Munich → … → Screen 09 (`123456`) → Screen 10 (DE) → notice → simulate → success → Screen 11 boundary
