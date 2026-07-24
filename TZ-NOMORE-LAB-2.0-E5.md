# TZ 2.0 — E5 access ops report

**Дата:** 2026-07-24  
**Висновок:** **PASS (код + docs)**; наповнення TG-каналу — на власнику.

## Зроблено

1. `src/data/access.ts` — матриця Start/Community/Mentor, next steps, `mentorDmHref(orderId)`
2. Thanks success — кнопки по grants, блок «Наступні кроки», номер замовлення
3. Mentor кнопка відкриває TG з готовим текстом і orderId
4. Checkout trust copy про те, що саме відкриється після оплати
5. Webhook Approved лог: `grants` + ops flags
6. `docs/ACCESS-OPS.md` + `docs/channel-starter.md`

## Acceptance

| Пункт | Статус |
| --- | --- |
| Матриця доступу | PASS |
| Fail без invite | PASS (без змін логіки) |
| Ops checklist | PASS (docs) |
| Контент у каналі | **Owner** — вставити шаблони з channel-starter |

## Owner TODO

1. Вставити закріп / модуль 1 / чекліст / правила групи з `docs/channel-starter.md`
2. Таблиця Mentor місць (8)
3. Після перших оплат — звірити логи Vercel `[pay.webhook] APPROVED`

## Next

→ **E6** соцдоказ (реальні відгуки/скріни) або **E7** дизайн.
