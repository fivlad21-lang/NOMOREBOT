# NOMORE LAB — лендінг курсу

Воронка продажу курсу зі створення сайтів (TikTok / Instagram / Telegram → оплата).

- ТЗ: [`TZ-COURSE-LANDING.md`](./TZ-COURSE-LANDING.md)
- Roadmap: [`TZ-NOMORE-LAB-2.0.md`](./TZ-NOMORE-LAB-2.0.md)
- Платежі test vs live: [`docs/WAYFORPAY-TEST-LIVE.md`](./docs/WAYFORPAY-TEST-LIVE.md)
- Orders persistence: [`docs/ORDERS-PERSISTENCE.md`](./docs/ORDERS-PERSISTENCE.md)
- Access ops: [`docs/ACCESS-OPS.md`](./docs/ACCESS-OPS.md)
- Analytics / UTM / pixels: [`docs/ANALYTICS.md`](./docs/ANALYTICS.md)
- Soft launch: [`docs/SOFT-LAUNCH.md`](./docs/SOFT-LAUNCH.md)
- Pricing FX (USD→UAH): [`docs/PRICING-FX.md`](./docs/PRICING-FX.md)

## Запуск
```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

UTM-приклад: http://localhost:3000?from=tiktok&utm_source=tiktok&utm_medium=paid&utm_campaign=launch

## Контакти
- Telegram: [@notany](https://t.me/notany)
- Instagram: [nomorevlad](https://instagram.com/nomorevlad)
- Email: fivlad.21@gmail.com

## Що всередині
- Лендінг з glass UI, тарифами Start / Community / Mentor ($20 / $49 / $100)
- Checkout + **WayForPay** (`/api/pay/create` → invoice → `/api/pay/return` → `/thanks`)
- Webhook: `/api/pay/webhook`
- Side nav + mobile menu
- Демо нерухомості LEV Estates лишилось під `/ru`, `/en`, `/bg`

## WayForPay env (Vercel)

```
WAYFORPAY_MERCHANT_ACCOUNT=
WAYFORPAY_SECRET_KEY=
WAYFORPAY_DOMAIN=nomorebot.vercel.app
WAYFORPAY_SERVICE_URL=https://nomorebot.vercel.app/api/pay/webhook
NEXT_PUBLIC_SITE_URL=https://nomorebot.vercel.app
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

| Режим | Merchant | Куди |
| --- | --- | --- |
| Test (без реальних списань) | `test_merch_n1` + ключ з [wiki](https://wiki.wayforpay.com/view/852472) | Preview / local |
| Live | твій магазин з кабінету | Production |

У кабінеті домен магазину = `WAYFORPAY_DOMAIN` (не Instagram).  
Після зміни env — Redeploy.

API smoke на тест-мерчанті:

```bash
npm run smoke:wfp
```

## Скрипти
- `npm run dev` — локальна розробка
- `npm run build` — продакшен-збірка
- `npm run start` — запуск збірки
- `npm run lint` — eslint
- `npm run smoke:wfp` — E2 WayForPay test_merch smoke
- `npm run smoke:orders` — E3 orders backend env smoke
- `npm run smoke:soft-launch` — E9 preflight HTTP smoke (`SITE_URL=…`)
