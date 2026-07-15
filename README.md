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

### Signal Detail V1 (approved on `main`)

### Desktop Feed Experience V1 (review)

Adapts the existing six local feed scenes for a premium desktop reading layout:

1. One full-screen scene at a time
2. Full-bleed photography with restrained left-weighted overlays
3. Single editorial text column on the left
4. Warm pearl-white body text and quiet metadata
5. Finite Previous / Next across three signals only
6. Open signal continues into approved Signal Detail V1
7. Visitor and member states preserved — no new product journey

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

Interactive desktop preview:

**https://william-athens-echo-revealed.trycloudflare.com/**

Review paths:

1. Italy → Milano → inspect scenes 1–3 on a wide desktop viewport → Open signal → Close
2. Germany → Munich → inspect scenes 1–3 → membership completion → member status + completed confirmation remain
