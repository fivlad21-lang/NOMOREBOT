# ТЗ v1.3 — Return / fail UX + purchase state machine

Без зміни цін Start $20 / Community $49 / Mentor $100.

## Проблема
WayForPay повертає браузер на `returnUrl` методом **POST**.  
`/thanks` був лише `page.tsx` (GET) → Next.js: **`Server action not found.`**  
Fail-UI з 1.2 не показувався.

## Фікс
1. **`/api/pay/return`** — GET/POST → sync order (paid/failed) → **303** на `/thanks?plan&order&wfpStatus&reason`
2. **Новий `returnUrl`** у CREATE_INVOICE → `/api/pay/return?...`
3. **Middleware** — legacy POST на `/thanks` → 303 GET (якщо старі інвойси ще на `/thanks`); без статусу → `wfpStatus=Declined`
4. **`ThanksClient`** — миттєвий fail/paid з `wfpStatus`; кнопка **«Спробувати знову»** → `/checkout?plan=<тариф>`
5. **`error.tsx`** на `/thanks` і `/checkout` — без сирих Next екранів
6. Спільний **`mapPaymentUiStatus`** у `wayforpay.ts`

## Стан-машина

| Стан | UI | CTA |
| --- | --- | --- |
| Create fail | помилка на checkout | лишитись / retry |
| WFP cancel / declined / expired | fail | Спробувати знову (той самий plan) + підтримка |
| Pending | spinner + soft cancel | без TG invite |
| Approved | success по плану | канал / група / написати мені |
| No order | unknown | checkout або тарифи |

Fail / pending / unknown → **без** лінків курсу/групи.

## Acceptance
- [x] POST `/thanks` і POST `/api/pay/return` не дають `Server action not found`
- [x] Fail UI + «Спробувати знову» з тим самим `plan`
- [x] Success кнопки як у 1.2
- [x] Lint / build
- [x] 5-хв моніторинг — див. `TZ-NOMORE-LAB-1.3-MONITOR.md`
