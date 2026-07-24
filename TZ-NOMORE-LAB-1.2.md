# ТЗ v1.2 — Thanks / доступ після оплати

Без поломки воронки (`/`, `/checkout`, `/thanks`, `/api/pay/*`). Пакети Start $20 / Community $49 / Mentor $100 без змін цін.

## Мета

Після WayForPay показувати різний thank-you під план і окремий fail-стан без видачі доступу.

## Модель доступу

| Пакет | Канал курсу | Група комʼюніті | Ментор |
| --- | --- | --- | --- |
| Start | так | ні | ні |
| Community | так | так | ні |
| Mentor | так | так | кнопка «Написати мені» → `@notany` |

- Канал: `https://t.me/+b2AESFebi0szNmJi`
- Група: `https://t.me/+ARjwuE-PnJo5ZWRi`
- Доступ показуємо **тільки** якщо статус `Approved` / локально `paid`.

## Зроблено

1. **`access` + `thanksCopy`** у `src/data/course.ts` — тексти Start / Community / Mentor / fail
2. **Тарифи / FAQ / кроки** — канал vs група замість «матеріали на email»
3. **`ThanksClient`** — success UI по плану з живими TG-кнопками; fail UI з retry checkout + підтримка; **без** лінків курсу/групи на fail
4. **`/api/pay/status`** — `Declined` / `Expired` / `Refunded` / `Voided` → `failed`; polling лишається на `pending`
5. **Webhook** — ті самі fail-статуси пишуть `failed` у store (без provision)
6. **`markOrderFailed`** у `src/lib/orders.ts`

## Acceptance

- [x] Start success → лише «Відкрити канал курсу»
- [x] Community success → канал + «Увійти в комʼюніті»
- [x] Mentor success → канал + група + «Написати мені»
- [x] Fail → немає кнопок каналу/групи; є retry + Telegram підтримка
- [x] Доступ не показується, поки немає `Approved`
- [x] Lint / build
