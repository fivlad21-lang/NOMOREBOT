# NOMORE LAB — лендінг курсу

Воронка продажу курсу зі створення сайтів (TikTok / Instagram / Telegram → оплата).

- ТЗ: [`TZ-COURSE-LANDING.md`](./TZ-COURSE-LANDING.md)
- Апдейт: [`TZ-NOMORE-LAB-1.1.md`](./TZ-NOMORE-LAB-1.1.md)

## Запуск
```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

UTM-приклад: http://localhost:3000?from=tiktok

## Контакти
- Telegram: [@notany](https://t.me/notany)
- Instagram: [nomorevlad](https://instagram.com/nomorevlad)
- Email: fivlad.21@gmail.com

## Що всередині
- Лендінг з glass UI, тарифами Start / Community / Mentor ($20 / $49 / $100)
- Checkout + mock-оплата (`/api/pay/create`) → `/thanks`
- Side nav + mobile menu
- Демо нерухомості LEV Estates лишилось під `/ru`, `/en`, `/bg`

## Скрипти
- `npm run dev` — локальна розробка
- `npm run build` — продакшен-збірка
- `npm run start` — запуск збірки
- `npm run lint` — eslint
