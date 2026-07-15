# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

### Screen 02 — Country Selection (approved on `main`)

### Screen 03 — City Selection (review)

Flow:

1. Screen 01 → **Enter My Town**
2. Screen 02 → Italy or Germany → **Continue**
3. Screen 03 → Milano (Italy) or Munich (Germany)
4. Community language applies after city selection (Italian / German)
5. **Back** returns to Screen 02 with country preserved
6. **Continue** stops at the Screen 04 boundary placeholder

No location verification, account flow, membership, authentication, payments, or API are included.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

See the Screen 03 pull request for the current browser-accessible preview URL.
