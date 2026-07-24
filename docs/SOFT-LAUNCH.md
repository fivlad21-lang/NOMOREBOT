# Soft launch (E9)

Мета: **10–30 людей без платного трафіку**, ≥**3** успішні оплати, **0** критичних багів доступу.  
Після PASS → можна E10 (платний трафік).

Базовий URL зараз: `https://nomorebot.vercel.app`  
Цільовий: `https://nomorelab.wtf` (коли DNS + env).

---

## 0. Pre-flight (блокує запуск)

Запустити проти **того URL, куди кликатимуть люди**:

```bash
SITE_URL=https://nomorebot.vercel.app npm run smoke:soft-launch
```

Обовʼязково PASS:
- [ ] `/`, `/checkout?plan=start|community|mentor`, `/thanks`
- [ ] `/legal/offer`, `/privacy`, `/requisites`
- [ ] `/opengraph-image`
- [ ] `POST /api/pay/return` → 303 на `/thanks`
- [ ] `/api/pay/health` → `ok:true`
- [ ] `ordersBackend=redis` (не `memory`) — інакше статус оплати може «губитись»

Env на Production (Vercel):
- [ ] `WAYFORPAY_*` = **live** merchant (не `test_merch_n1`)
- [ ] `WAYFORPAY_DOMAIN` / `SERVICE_URL` / `NEXT_PUBLIC_SITE_URL` узгоджені з кабінетом
- [ ] `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (або KV)
- [ ] Production деплой = коміт з E1–E8 (legal + health + OG + attribution)

Опційно перед soft launch (не блокер E9, блокер E10):
- [ ] Pixel IDs (`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`)

Telegram ops:
- [ ] Закріп + Модуль 1 у каналі ([`channel-starter.md`](./channel-starter.md))
- [ ] Правила + «як представитись» у групі
- [ ] Invite-лінки Start/Community живі (з `src/data/course.ts` → `access`)
- [ ] Таблиця Mentor seats (макс. 8)

Самооплата (1×):
- [ ] Start або Community собі → thanks `paid` → кнопки доступу відкриваються
- [ ] Fail/cancel → fail UI **без** invite, «Спробувати знову» з тим самим `plan`

Деталі WFP: [`WAYFORPAY-TEST-LIVE.md`](./WAYFORPAY-TEST-LIVE.md)  
Доступ: [`ACCESS-OPS.md`](./ACCESS-OPS.md)

---

## 1. Кого кликати (органіка)

10–30 людей з теплої аудиторії, **без** платного TikTok/Meta:
- друзі / знайомі підприємці
- підписники IG / TG / особисті сторіси
- 1–2 мікро-інфлуенсери за бартер/знижку (не ads manager)

Лінк обовʼязково з `from` (і бажано UTM):

```
https://nomorebot.vercel.app/?from=telegram&utm_source=soft&utm_medium=dm&utm_campaign=e9
https://nomorebot.vercel.app/?from=instagram&utm_source=soft&utm_medium=story&utm_campaign=e9
```

---

## 2. Шаблон запрошення (DM / сторіс)

```
Зібрав курс NOMORE LAB — як зробити лендінг під TikTok і приймати оплату.

Зараз soft launch для своїх: Start $20 / Community $49 / Mentor $100.
Без реклами — потрібен фідбек по оплаті й доступу.

Лінк: https://nomorebot.vercel.app/?from=telegram&utm_source=soft&utm_medium=dm&utm_campaign=e9

Якщо щось зламається на оплаті/доступі — одразу напиши мені @notany з номером замовлення.
```

Не обіцяти те, чого немає в оферті. Не шарити invite-лінки каналу публічно.

---

## 3. Що трекати під час хвилі

| Метрика | Ціль E9 | Де дивитись |
| --- | --- | --- |
| Люди, що відкрили ленд | 10–30 | Stories / «подивились» + піксель (якщо є) |
| Успішні оплати `paid` | ≥ 3 | WFP кабінет + Vercel webhook logs + thanks |
| Критичні баги доступу | **0** | «сплатив — немає кнопки / інвайт мертвий» |
| Fail без доступу | очікувано | fail UI без TG invite |
| Mentor місця | ≤ 8 | своя таблиця |

Лог продажів (скопіюй у Notion / Sheets):

| Дата | План | OrderId | from/UTM | Доступ ОК / fail | Нотатка |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

---

## 4. Щоденна операційка (поки йде soft launch)

1. Перевірити Vercel logs на `[pay.webhook] APPROVED`
2. Якщо хтось написав «немає доступу» — `GET /api/pay/status?order=…` + ручний інвайт ([ACCESS-OPS](./ACCESS-OPS.md))
3. Зафіксувати баг у списку (блокер E10, якщо критичний)
4. Не збільшувати охоплення, поки є відкритий критичний баг

---

## 5. Acceptance E9

### Код / артефакти (агент)
- [x] Чекліст soft launch (`docs/SOFT-LAUNCH.md`)
- [x] Smoke `npm run smoke:soft-launch`
- [x] Звіт `TZ-NOMORE-LAB-2.0-E9.md`

### Жива хвиля (власник — обовʼязково перед E10)
- [ ] Pre-flight smoke PASS на Production URL
- [ ] Redis orders на проді
- [ ] Канал/група наповнені мінімумом
- [ ] ≥ 3 успішні оплати на живих людях
- [ ] 0 критичних багів доступу
- [ ] Короткий фідбек: що було незрозуміло на ленді / checkout

**Go E10** лише коли всі пункти «жива хвиля» закриті.
