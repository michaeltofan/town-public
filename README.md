# town-public

Public web surface for **TOWN** (`towncivic.org`).

## Screens

### Screen 01 — TOWN Entry (approved on `main`)

`index.html`

### Screen 02 — Country Selection (review)

`country.html`

Flow:

1. Open Screen 01
2. Press **Enter My Town**
3. Choose **Italy** or **Germany**
4. **Continue** enables after a country is selected
5. **Back** returns to Screen 01
6. Continue stops at the Screen 03 boundary placeholder

No account flow, membership, authentication, payments, API, or city selection are included.

### Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

### Visual review URL

See the Screen 02 pull request for the current browser-accessible preview URL.
