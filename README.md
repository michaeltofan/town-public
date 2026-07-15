# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

`index.html`

### Screen 02 — Country Selection (review)

Implemented in `index.html` as the next view after Screen 01 (`#/country`).

Flow:

1. Open Screen 01
2. Press **Enter My Town**
3. Choose **Italy** or **Germany**
4. **Continue** enables after a country is selected
5. **Back** returns to Screen 01
6. Continue stops at the Screen 03 boundary placeholder (`#/boundary`)

No account flow, membership, authentication, payments, API, or city selection are included.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL (Screen 02)

Interactive review (open Screen 01, then Enter My Town):

https://opponent-joyce-important-flavor.trycloudflare.com/

PR: https://github.com/michaeltofan/town-public/pull/2
