# ТЗ v2.0 — NOMORE LAB: до продакшену і трафіку

**Продукт:** курс «сайти/лендінги для бізнесу»  
**Стек:** Next.js 16 + Tailwind + Framer Motion + WayForPay  
**Сайт:** `https://nomorebot.vercel.app`  
**Гілка:** `cursor/tz-course-landing-bde7` (PR #5)  
**Мова:** UA  

**Не ламати:** `/`, `/checkout`, `/thanks`, `/api/pay/*`, ціни Start $20 / Community $49 / Mentor $100.

---

## 0. Статус зараз

| Шар | Стан |
| --- | --- |
| Лендінг + тарифи + FAQ | є |
| Checkout → WayForPay invoice | є |
| Thanks success по плану (канал/група/ментор) | є (1.2) |
| Fail UI + POST return bridge | є (1.3), **prod PASS E1** |
| Оферта / privacy / ФОП | заглушки |
| Persisted orders | код Redis/KV (E3); на проді увімкнути env |
| Пікселі / email після оплати | немає |
| Контент курсу в TG | поза кодом |

---

## Етапи (робити строго по порядку)

```
E1 Деплой і smoke
 → E2 Платежі (test → live checklist)
 → E3 Orders persistence
 → E4 Юридичне
 → E5 Доступ і операційка після оплати
 → E6 Контент / довіра на лендінгу
 → E7 Дизайн і копірайт (конверсія)
 → E8 Аналітика і UTM
 → E9 Soft launch
 → E10 Платний трафік
```

Кожен етап: **Acceptance** → лише потім наступний.

---

# E1 — Деплой TZ 1.3 + smoke

### Мета
На проді більше немає `Server action not found`; fail/retry працюють.

### Кроки
1. Задеплоїти PR #5 (merge в `main` або Vercel Production = ця гілка).
2. Перевірити env на Vercel:
   - `WAYFORPAY_MERCHANT_ACCOUNT`
   - `WAYFORPAY_SECRET_KEY`
   - `WAYFORPAY_DOMAIN=nomorebot.vercel.app`
   - `WAYFORPAY_SERVICE_URL=https://nomorebot.vercel.app/api/pay/webhook`
   - `NEXT_PUBLIC_SITE_URL=https://nomorebot.vercel.app`
3. Smoke:
   - `GET /`, `/checkout?plan=start|community|mentor`, `/thanks`
   - `POST /api/pay/return?...` → 303 на `/thanks`
   - `POST /thanks?...` → 303 (не Server action)
   - Fail UI: «Спробувати знову» → той самий `plan`

### Acceptance
- [x] Prod має `/api/pay/return` (не 404)
- [x] Cancel/decline з WFP → branded fail
- [x] Retry відкриває правильний checkout

**Артефакт:** `TZ-NOMORE-LAB-2.0-E1.md` — **PASS** (2026-07-24, prod SHA `1bce2cd`)

---

# E2 — Платежі: test vs live

### Мета
Безпечні тести + чекліст виходу в бойовий режим.

### E2.1 Тестовий режим
1. Preview/окремий env:
   - `WAYFORPAY_MERCHANT_ACCOUNT=test_merch_n1`
   - `WAYFORPAY_SECRET_KEY=` з доки WFP
2. Платити тільки тест-картками з wiki WayForPay.
3. Матриця: Approved Start/Community/Mentor; Declined; Cancel; Pending→Approved.

### E2.2 Бойовий мерчант
1. Домен у кабінеті = `nomorebot.vercel.app`.
2. Після верифікації — live keys у Production.
3. 1 мікроплатіж собі → webhook + thanks → рефанд за політикою.

### Acceptance
- [x] API-матриця на test_merch (`npm run smoke:wfp`) + фікс 1151→pending
- [ ] Повна HPP-матриця Approved/Declined/Cancel (власник на Preview)
- [x] Live vs test задокументовано (README + `docs/WAYFORPAY-TEST-LIVE.md`)
- [ ] Live keys і домен узгоджені в кабінеті (чекліст власника)

**Артефакт:** `TZ-NOMORE-LAB-2.0-E2.md`

---

# E3 — Persistence замовлень

### Мета
Статус оплати не залежить від serverless-інстансу.

### Рішення
Vercel KV / Upstash Redis (або Postgres).

### Поля order
`orderReference, planId, email, telegram?, amountUah, status, providerStatus?, reason?, provisioned, createdAt, updatedAt`

### Acceptance
- [x] Код: Redis/KV store + memory fallback; API async
- [ ] Prod: `ordersBackend=redis` після додавання Upstash/KV env (власник)
- [x] Webhook/status/return пишуть у спільний store
- [x] Docs + `/api/pay/health` + `npm run smoke:orders`

**Артефакт:** `TZ-NOMORE-LAB-2.0-E3.md`

---

# E4 — Юридичне

### Сторінки
| URL | Зміст |
| --- | --- |
| `/legal/offer` | Публічна оферта |
| `/legal/privacy` | Політика конфіденційності |
| `/legal/requisites` (опційно) | ФОП реквізити |

### UI
Footer з живими лінками; checkout checkbox «Приймаю оферту»; FAQ без «буде пізніше».

### Потрібно від власника
ПІБ ФОП, ІПН/ЄДРПОУ, адреса, email претензій, фінальний текст повернення.

---

# E5 — Доступ і операційка

| План | Канал | Група | Ментор |
| --- | --- | --- | --- |
| Start | так | ні | ні |
| Community | так | так | ні |
| Mentor | так | так | `@notany` |

Мінімум у каналі: вітання, модуль 1, чекліст, правила групи, закріп підтримки.

---

# E6 — Довіра / соцдоказ

Замінити Unsplash на реальні фото/скріни/відгуки без стоку. Посилити блок «1 год 32 хв».

---

# E7 — Дизайн і копірайт

Цільова структура: Hero → біль → proof → програма → експерт → відгуки → тарифи → FAQ → CTA.  
Hero full-bleed; бренд hero-рівень; CTA з ціною; коротший лендінг.

---

# E8 — Аналітика і UTM

Зберігати `from`/UTM у order; TikTok + Meta pixels; Purchase лише на `paid`; OG 1200×630.

---

# E9 — Soft launch

10–30 людей без платного трафіку; ≥3 успішні оплати; 0 критичних багів доступу.

---

# E10 — Платний трафік

Бойовий WFP + пікселі; малий бюджет; крутити креатив/лендінг за CVR, не бюджет наосліп.

---

## Поза скоупом v2.0

Авто-бот TG інвайтів; кабінет учня; EN; зміна цін; інший платіжний шлюз.

---

## Порядок тікетів

| # | Тікет | Етап |
| --- | --- | --- |
| 1 | Deploy verify + smoke 1.3 | E1 |
| 2 | Orders → KV/Redis | E3 |
| 3 | Legal pages + checkout checkbox | E4 |
| 4 | Thanks/checkout copy + trust | E5/E7 |
| 5 | Testimonials/proof real assets | E6 |
| 6 | Hero + shorten sections | E7 |
| 7 | Pixels + UTM on orders | E8 |
| 8 | OG image | E8 |
| 9 | Soft launch checklist | E9 |

## Від власника між етапами

1. Підтвердити Production на коміт з 1.3  
2. Реквізити ФОП + текст повернення  
3. Контент у каналі (мін.)  
4. Реальні відгуки/скріни  
5. Pixel IDs  
6. Дозвіл на `test_merch_n1` у Preview  
