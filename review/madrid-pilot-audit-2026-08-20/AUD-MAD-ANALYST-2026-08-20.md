# Audit de analist — Pilot Madrid (TOWN)

**ID:** AUD-MAD-ANALYST-2026-08-20  
**Obiect:** https://madrid.towncivic.org/ (`madrid-es`)  
**Dată sondă (UTC):** 2026-08-20T05:13:23Z  
**Tip:** read-only, date live + contract client din `town-public`  
**Limba raportului:** română  
**Limba produsului:** spaniolă (`es-ES`)  
**Acces operator:** absent (`TOWN_PLATFORM_*` neconfigurat) → Memberships/Moderare necitite

---

## 1. Verdict pentru analist

| Întrebare | Răspuns |
| --- | --- |
| Pilotul e „sus”? | **Da.** API prod/staging ready; host-uri Madrid 200. |
| Pilotul livrează utilitate civică? | **Nu.** Trei seed-uri, toate **0/5** confirmări, stagnare **≥10 zile** (proces creat 2026-08-09). |
| Ce măsoară succesul? | Nu health. Succes = `confirmationCount` pe semnale + membri cu `access.canParticipate` pe Madrid. |
| Decizie recomandată | **Nu scala marketingul** până există ≥1 confirmare reală pe ≥1 seed și un funnel membru verificat end-to-end pe prod. Treat as **pilot blocat pe adopție/funnel**, nu pe infrastructură. |

**O propoziție:** suprafața Madrid e pregătită tehnic și izolată corect pe host; bucla civică (vizitator → membru plătitor → confirmare) **nu a produs niciun eveniment măsurabil**.

---

## 2. Ce trebuie să știe un analist despre produs

TOWN pe Madrid nu e un feed de atenție. Semnalele seed sunt scene locale. Valoarea apare când membri eligibili apasă **YO TAMBIÉN LO VEO**, iar API-ul persistă confirmarea. Pragul de trecere la etapa **proposals** este **5 confirmări** pe semnal (`transitionRule.type = confirmation_count`).

Fără confirmări, pilotul rămâne un catalog editorial, indiferent cât de verde e health-ul.

---

## 3. Funnelul civic (adevărul operațional)

### 3.1 Lanțul obligatoriu (din client + API)

```
Vizitator pe madrid.towncivic.org
  → Auth (sesiune)
  → Community commitment pe slug madrid-es
  → Checkout Stripe (12 €/an în copy)
  → Membership status ∈ {active, cancelling}
     AND access.canParticipate === true
  → PUT /v1/signals/{uuid}/confirmation → data.confirmed === true
  → confirmationCount ++
  → la 5/5: etapa proposals
```

Surse contract: `canTakeCivicAction()` / `activateSeeTooAction()` în `script.js`; `TownMembershipRecovery.enablesCivicParticipation` în `membership-recovery.js`; commitment în `community-commitment.js`.

### 3.2 Ce am verificat live (fără sesiune)

| Pas | Probă | Rezultat | Semnificație |
| --- | --- | --- | --- |
| Host prod | GET madrid.towncivic.org | 200, intro markup prezent, cache `madrid-es-6` | Suprafața e live |
| Feed | GET `/v1/communities/madrid-es/signals` | 200, 3 seed, locale es-ES | Inventar civic există |
| Civic | GET `/v1/signals/:id/civic-process` | stage=confirmation, **0/5**, `canConfirm=false` | Nicio confirmare; guest nu poate confirma |
| Confirm read | GET `/v1/signals/:id/confirmation` | **401** `SESSION_NOT_AUTHORIZED` | Confirmarea e autentificată |
| Confirm write | PUT `/v1/signals/:id/confirmation` | **401** `SESSION_NOT_AUTHORIZED` | Fail-closed corect |
| Membership | GET `/v1/account/membership` | **401** | Fără sesiune nu există truth de membru |
| Platform memberships | GET `/v1/platform/memberships` | **404** fără auth operator | Nu putem număra membri Madrid din exterior |

### 3.3 Starea civică curentă (prod)

| Semnal | Zonă | Categorie | Confirmări | Etapă | Next |
| --- | --- | --- | --- | --- | --- |
| `…1901` Argumosa | Lavapiés | ESPACIO PÚBLICO | **0/5** | confirmation | proposals |
| `…1902` Farole | Legazpi | ALUMBRADO PÚBLICO | **0/5** | confirmation | proposals |
| `…1903` Containere | Retiro | MEDIO AMBIENTE | **0/5** | confirmation | proposals |

- Semnale noi (non-seed): **0**
- Proposals / deliberare / voturi: **0 / 0 / 0** pe toate
- `updatedAt` civic = `createdAt` (2026-08-09) → **zero mutații civice de la seed**

---

## 4. De ce e 0/5 — analiză cauzală (nu inventar)

Ordine de plauzibilitate pentru un analist, pe baza contractului de produs + probe:

### C1 — Nu există încă membri civici pe Madrid (cauză principală, neconfirmată numeric)
Fără `TOWN_PLATFORM_*` **nu putem citi** câți accounts au membership activ pe `madrid-es`.  
Dovezi indirecte: `confirmationCount=0` pe toate seed-urile + civic `updatedAt` neschimbat = **niciun PUT de confirmare reușit** de la lansarea procesului.

**Implicație:** orice dashboard de „pilot live” care arată doar uptime **minte utilitatea**.

### C2 — Funnelul cere plată înainte de utilitate
Confirmarea nu e gratuită pentru vizitator. Lanțul cere commitment + membership cu `canParticipate`.  
Preț în copy: **12 €/an**.  
Vizitatorul care apasă YO TAMBIÉN LO VEO fără eligibilitate este dus spre invite/auth/recovery — **nu** confirmă.

**Implicație:** conversia paid→participate este poarta pilotului. Fără măsurarea ei, auditul de creștere e orb.

### C3 — Capcană „wrong community” pe hostul Madrid
Pe `madrid.towncivic.org` feed-ul e blocat pe Madrid, dar UI-ul de commitment încă poate oferi catalogul Spaniei (Barcelona etc.). Un user care plătește pe alt slug primește pe seed-urile Madrid **wrong_community** / 403 `ACTOR_NOT_ELIGIBLE_FOR_COMMUNITY`, **fără** upsell de membership.

**Implicație:** poți avea „membri plătiți” și tot **0 confirmări** pe pilotul Madrid. Asta e defect de design al funnelului pe hostul pilot, nu doar „lipsă useri”.

### C4 — Friction de auth în engleză pe produs spaniol
În `script.js` (`syncAuthModeUi`), titlurile modalului sunt hardcodate: **“Sign in”**, **“First time here? Create account”**, deși există `LOGIN_COPY.es` și butoanele de password/passkey se localizează.  
Pe un pilot ES, primul ecran de membership e bilingv necontrolat.

**Implicație:** nu explică singur 0/5, dar crește abandonul la poarta funnelului.

### C5 — Continuity după sign-in nu confirmă automat
Pending see-too după login **nu** execută confirmarea; userul trebuie să revină eligibil și să apese din nou. Pași multipli + plată = drop-off.

### C6 — Cauze excluse (sau improbabile) pe baza probelor
| Ipoteză | Verdict |
| --- | --- |
| API/host căzut | **Respins** — health ready, hosts 200 |
| Seed-uri lipsă / feed gol | **Respins** — 3 seed live |
| Confirmare posibilă anonim (bug deschis) | **Respins** — PUT 401; `canConfirm=false` guest |
| Locale greșit pe semnale | **Respins** — toate `es-ES` |
| Host greșit (API staging pe prod) | **Respins** — `madrid.towncivic.org` → api.towncivic.org |

---

## 5. Findings acționabile

| ID | Severitate | Finding | De ce contează pentru audit | Acțiune |
| --- | --- | --- | --- | --- |
| F1 | **P0** | Zero confirmări / zero mutații civice ≥10 zile | Pilotul nu are KPI de utilitate | Rulează 1–2 membri de test pe **prod** până la primul `confirmationCount≥1`; oprește narativa „live success” |
| F2 | **P0** | Numărul de memberships Madrid e necunoscut din exterior | Analistul nu poate separa „nimeni nu a venit” de „au venit dar nu pot confirma” | Furnizează `TOWN_PLATFORM_EMAIL/PASSWORD` pentru audit fază 2 (read-only Memberships filtrate Madrid) |
| F3 | **P1** | Commitment pe host Madrid permite alte orașe ES | Plată pe comunitate greșită ⇒ 0 confirmări pe seed-uri | Lock commitment la `madrid-es` pe hosturile pilot |
| F4 | **P1** | Auth chrome hardcodat EN | Friction pe poarta de conversie | Folosește `LOGIN_COPY.es` pentru title/toggle pe host ES |
| F5 | **P1** | Staging `madrid-signal-2.area=Vallecas` vs prod `Legazpi` | QA pe staging nu oglindește prod | Aliniază datele sau documentează excepția |
| F6 | **P2** | `GET /v1/communities/madrid-es` → 404 | Tooling/analize by-slug eșuează; feed-ul merge pe alt contract | Fix API sau contract public: „list + signals only” |
| F7 | **P2** | HTML `lang="en"` pe shell | Semnal a11y/SEO greșit | `lang="es"` pe hosturile Madrid |

---

## 6. Paritate prod ↔ staging

| Item | Prod | Staging | Impact audit |
| --- | --- | --- | --- |
| Host | madrid.towncivic.org | madrid-staging.towncivic.org | OK izolare API |
| Seed count | 3 | 3 | OK |
| Confirmări | 0/5 ×3 | 0/5 ×3 | Aceeași stagnare |
| Semnal 2 zonă | **Legazpi** | **Vallecas** | F5 — nu folosi staging ca proxy de conținut pentru prod |

---

## 7. Ce NU știm (goluri care fac auditul incomplet)

1. **Câți membri activi** au `community = madrid-es` și `canParticipate=true`.
2. **Câți au început checkout** și au abandonat Stripe.
3. **Câți au commitment pe alt oraș** accesând totuși hostul Madrid.
4. Coada de **moderare** (semnale/submission/discussion) — goală sau nu.
5. Dacă există confirmări pe alte comunități (semnal că produsul e folosit, dar nu pe Madrid).

Fără F2 (credențiale operator), un specialist **nu poate închide** cauza C1 vs C3.

---

## 8. Recomandări (ordinea care schimbă verdictul)

1. **Smoke membru pe prod (azi):** un operator creează/folosește un cont de test, commitment **strict** `madrid-es`, checkout test/live conform politicii, confirmă o seed. Criteriu: `confirmationCount` pe `…1901` sau alta ≥1.
2. **Instrumentare funnel:** evenimente minime — auth_ok, commitment_madrid, checkout_start, membership_active, confirm_ok, confirm_wrong_community. Fără ele, auditul rămâne inferențial.
3. **Lock commitment Madrid pe pilot host** (F3) înainte de campanie publică.
4. **Localizare auth** (F4).
5. **Audit fază 2 cu platform login** — export memberships Madrid + moderare, atașat la acest document.
6. Abia după (1)+(3): invitați 5–10 vecini reali; țintă: ≥1 semnal la 5/5 sau cel puțin mișcare zilnică pe counts.

---

## 9. Anexă — probe brute esențiale

### 9.1 Civic process (seed 1, reprezentativ)
- `confirmationCount`: 0  
- `requiredConfirmations`: 5  
- `canConfirm`: false (fără sesiune)  
- `nextStage`: proposals  
- `timeline`: process_created @ 2026-08-09T08:00:00.000Z  

### 9.2 Confirm API
- `PUT /v1/signals/{id}/confirmation` fără sesiune → **401** `SESSION_NOT_AUTHORIZED`

### 9.3 Catalog
- Madrid în `GET /v1/communities`: id `…0018`, slug `madrid-es`, `es-ES`, `Europe/Madrid`
- `GET /v1/communities/madrid-es` → **404**

### 9.4 Fișiere atașate în acest folder
- `digest.json` — snapshot digest operațional
- `evidence.json` — pachet probe live (health, dossiers, diffs, host meta)
- `unit-tests.txt` — contracte client Madrid PASSED (nu măsoară adopția)

### 9.5 Re-verificare de către specialist
```bash
node scripts/supervise-madrid-pilot.js --json
curl -sS https://api.towncivic.org/v1/communities/madrid-es/signals
curl -sS https://api.towncivic.org/v1/signals/00000000-0000-4000-8000-000000001901/civic-process
```
UI: https://madrid.towncivic.org/ — citire; confirmarea necesită membru eligibil.

---

## 10. Declarație

Nu s-au făcut mutații pe platformă, Stripe sau date. Health a fost tratat ca poartă. Metricile de utilitate sunt confirmările și eligibilitatea de membership, nu uptime-ul.

**Concluzie finală:** pilotul Madrid este **operațional ca suprafață** și **eșuat ca buclă civică măsurabilă** până la prima confirmare reală și până la vizibilitate pe memberships.
