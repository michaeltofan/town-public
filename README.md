# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

### Screen 02 — Country Selection (approved on `main`)

### Screen 03 — City Selection (approved on `main`)

### Screen 04 — Location Verification Mock (review)

Flow:

1. Screen 01 → **Enter My Town**
2. Screen 02 → Italy / Germany
3. Screen 03 → Milano / Munich
4. Screen 04 → mock verification in Italian or German
5. Success state → Continue stops at the Screen 05 boundary placeholder

This slice does not use real GPS, geolocation APIs, accounts, membership, payments, or a feed.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

See the Screen 04 pull request for the current browser-accessible preview URL.
