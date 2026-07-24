# WayForPay — тестовий vs бойовий режим (E2)

Офіційні тест-реквізити: [wiki WayForPay](https://wiki.wayforpay.com/view/852472)

## Ніколи не плутати

| | Test | Production |
| --- | --- | --- |
| `WAYFORPAY_MERCHANT_ACCOUNT` | `test_merch_n1` | твій магазин (напр. `instagram_com_325ba`) |
| `WAYFORPAY_SECRET_KEY` | з wiki (`flk3409refn54t54t*FNJRET`) | секрет з кабінету |
| Картки | тест / сценарії wiki | реальні (списують гроші) |
| Де ставити | **Preview** / локально | **Production** лише після верифікації |

Статус магазину `tested` у кабінеті **не гарантує**, що реальна картка не піде в банк (див. Monobank push). Для безпечних тестів — тільки `test_merch_n1`.

## Локальний / Preview smoke (API)

```bash
node scripts/e2-wfp-smoke.mjs
```

Перевіряє: CREATE_INVOICE для Start/Community/Mentor, CHECK_STATUS, мапінг `Declined+1151 → pending`.

## Ручна матриця на HPP (ти)

1. Постав test keys у **Vercel Preview** (не Production) → Redeploy.
2. Відкрий Preview URL → checkout кожного плану.
3. На сторінці WayForPay:

| Сценарій | Дія | Очікування на сайті |
| --- | --- | --- |
| Approved Start | успішна тест-оплата | thanks + кнопка каналу |
| Approved Community | успіх | канал + група |
| Approved Mentor | успіх | канал + група + «Написати мені» |
| Declined / bad CVV | відхилення банком | fail + «Спробувати знову» |
| Cancel | закрити/скасувати HPP | fail (без invite) |
| Unpaid invoice poll | відкрити thanks з order без оплати | **pending**, не fail (`reasonCode` 1151) |

Тест-картки / сценарії — актуальні в кабінеті/wiki WayForPay (розділ тестів).

## Go-live checklist (бойовий)

- [ ] У кабінеті домен магазину = `nomorebot.vercel.app`
- [ ] `WAYFORPAY_DOMAIN` / `SERVICE_URL` / `NEXT_PUBLIC_SITE_URL` збігаються
- [ ] Production keys = **твій** merchant (не `test_merch_n1`)
- [ ] Webhook ACK працює (логи `[pay.webhook] APPROVED`)
- [ ] 1 мікроплатіж собі → thanks → доступ → рефанд за офертою
- [ ] Прибрати test keys з Preview після тестів (або лишити лише на Preview)

## Відома поведінка WFP

`CHECK_STATUS` для неоплаченого інвойсу часто повертає `transactionStatus=Declined` + **`reasonCode=1151`** («Invoice Is Awaiting For Payment»).  
У коді це мапиться на **pending**, не на fail (`mapPaymentUiStatus`).
