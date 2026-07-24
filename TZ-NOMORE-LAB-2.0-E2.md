# TZ 2.0 — E2 payments report

**Дата:** 2026-07-24  
**Висновок:** **PASS (API + mapping fix)**; HPP card matrix — manual (власник на Preview).

---

## Зроблено в E2

1. Документація `docs/WAYFORPAY-TEST-LIVE.md` + README / `.env.example`
2. Скрипт `npm run smoke:wfp` (`scripts/e2-wfp-smoke.mjs`)
3. **Багфікс:** `CHECK_STATUS` на неоплаченому інвойсі дає `Declined` + **`reasonCode=1151`** («очікує оплату»). Раніше UI мапив це в **fail**. Тепер `mapPaymentUiStatus` тримає **pending** для 1151/1131/…  
   Оновлено: `wayforpay.ts`, `/api/pay/status`, `/api/pay/return`, `/api/pay/webhook`

---

## Автоматичний smoke (`test_merch_n1`)

| Перевірка | Результат |
| --- | --- |
| CREATE_INVOICE Start ₴820 | Ok + invoiceUrl |
| CREATE_INVOICE Community ₴2010 | Ok + invoiceUrl |
| CREATE_INVOICE Mentor ₴4100 | Ok + invoiceUrl |
| Domain `nomorebot.vercel.app` на test_merch | працює |
| CHECK_STATUS unpaid → Declined+1151 | мапиться в **pending** |
| map(Declined, 1104) | **failed** |
| map(Approved, 1100) | **paid** |

---

## Acceptance з ТЗ 2.0

| Пункт | Статус |
| --- | --- |
| Повна матриця на test_merch (HPP Approved/Declined/Cancel) | **Manual** — ставити test keys лише на **Preview**, не на Production |
| Live keys і домен узгоджені | Checklist у docs (власник) |
| README: test ≠ production | **Done** |

---

## Ручні кроки власника (залишок E2)

1. Vercel **Preview** env → `test_merch_n1` + wiki secret → Redeploy Preview.  
2. Пройти HPP матрицю з `docs/WAYFORPAY-TEST-LIVE.md`.  
3. Production лишити **свої** keys; не ставити test_merch на прод.  
4. Перед трафіком: go-live checklist (домен, webhook, мікроплатіж).

---

## Next

→ **E3** Orders persistence (KV), щоб webhook/status не розʼїжджались між інстансами.
