# TZ 2.0 — E1 smoke report

**Дата:** 2026-07-24 (UTC)  
**Prod:** `https://nomorebot.vercel.app`  
**Deploy:** Production `nomorebot` → SHA `1bce2cd` (гілка `cursor/tz-course-landing-bde7`)  
**Висновок:** **PASS** — TZ 1.3 на проді, fail/retry працюють.

---

## Acceptance

| Критерій | Результат |
| --- | --- |
| Prod має `/api/pay/return` (не 404) | **PASS** — `POST` → **303** |
| Cancel/decline → branded fail (не Server action) | **PASS** — fail title + copy |
| Retry → той самий `/checkout?plan=` | **PASS** — `checkout?plan=start` / mentor |

---

## Матриця запитів

| Запит | Код | Нотатка |
| --- | --- | --- |
| `POST /api/pay/return?plan=start&order=…` + Declined | **303** | Location → `/thanks?…&wfpStatus=Declined&reason=E1smoke` |
| `POST /thanks?plan=community&order=…` + Declined | **303** | Legacy middleware bridge |
| Body POST `/thanks` | — | Немає `Server action not found` |
| `GET /` | 200 | |
| `GET /checkout?plan=start\|community\|mentor` | 200 | |
| `GET /thanks` | 200 | unknown/empty order UI |
| `GET /thanks?…&wfpStatus=Declined` (start, mentor) | 200 | markers: `fail_title`, `retry`, `checkout_plan` |
| Follow return → HTML | — | «Оплату не підтверджено», «Оплата не пройшла», «Спробувати знову», `checkout?plan=start` |
| `GET /api/pay/status?order=NL-start-invalid` | 400 | `Invalid order` (очікувано) |
| `POST /api/pay/create` Start | 200 | invoice URL від WayForPay створено |

---

## Deploy / CI

- Vercel **nomorebot** Production: `1bce2cd` — SUCCESS  
- Vercel Preview nomorebot: `1bce2cd` — SUCCESS  
- Окремий проєкт **barbara-menu-demo** на тому ж PR: FAILURE (поза скоупом NOMORE LAB)

---

## Залишки / ризики (не блокер E1)

1. **E2:** create на проді б’є в живий/tested мерчант — для повних тестів оплати перейти на `test_merch_n1` (Preview) або тест-картки з доки.  
2. **E3:** orders ще in-memory — можливий розʼїзд webhook vs status на різних інстансах.  
3. Env на Vercel виглядають робочими (create повернув invoice); повний чекліст ключів/домену — в E2.

---

## Next

→ **E2** (платежі test → live checklist) або **E3** (KV persistence), за пріоритетом власника.
