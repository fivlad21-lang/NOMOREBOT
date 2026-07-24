# LEV Estates — Demo Showcase

Клікабельне демо нової вітрини нерухомості для [LEV Estates](https://www.levestates.com).

## Що всередині
- Каталог з фільтрами (локація, тип, ціна, кімнати, hot)
- Режими **Grid / List / Map**
- Картка об'єкта + схожі + форма запиту
- Мультимова **RU / EN / BG** (перемикач + авто-детект браузера)
- Mock-дані ~40 об'єктів (імітація CRM)
- Форми лідів зберігаються в `localStorage` (demo)

## Запуск
```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

## Скрипти
- `npm run dev` — локальна розробка
- `npm run build` — продакшен-збірка
- `npm run start` — запуск збірки

## Структура
- `src/app/[locale]/…` — сторінки
- `src/data/properties.ts` — mock CRM
- `src/lib/api/properties.ts` — шар даних (готовий до заміни на API)
- `src/messages/*.json` — переклади UI
- `TZ-DEMO.md` — технічне завдання демо

## Далі (не в цьому демо)
Підключення реальної CRM по API, sync 1–2×/день, SEO/редіректи, деплой на `levestates.com`.
