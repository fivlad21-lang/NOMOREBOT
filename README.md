# SITE LAB — лендінг курсу

Воронка продажу курсу зі створення сайтів (TikTok / Instagram / Telegram → оплата).

Повне ТЗ: [`TZ-COURSE-LANDING.md`](./TZ-COURSE-LANDING.md).

## Запуск
```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

UTM-приклад: http://localhost:3000?from=tiktok

## Що всередині
- Лендінг з glass UI, тарифами Start / Community / Mentor ($20 / $49 / $100)
- Checkout + mock-оплата (`/api/pay/create`) → `/thanks`
- Демо нерухомості LEV Estates лишилось під `/ru`, `/en`, `/bg`

## Скрипти
- `npm run dev` — локальна розробка
- `npm run build` — продакшен-збірка
- `npm run start` — запуск збірки
- `npm run lint` — eslint
