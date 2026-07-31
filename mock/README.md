# TOWN member experience mocks (design archive)

Approved static mocks restored from commit `28366e7`.

These files are **design reference**, not the live product path:

- `member-signal-detail.html` — Signal Detail as seen by an active member, with testimonies
- `member-testimony-capture.html` — testimony capture stages (text/photo/video)

Open locally from the repo root, for example:

```bash
python3 -m http.server 4173
```

Then visit:

- http://localhost:4173/mock/member-signal-detail.html
- http://localhost:4173/mock/member-testimony-capture.html

Live product capture for participating members is wired in `index.html` / `script.js` behind `canTakeCivicAction()` (demo in-session preview only; not uploaded).
