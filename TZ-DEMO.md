# ТЗ: DEMO-сайт LEV Estates

Повне технічне завдання для клікабельного демо вітрини нерухомості.

## Мета
Показати клієнту UX нового сайту: каталог, фільтри, карта/список, картка об'єкта, 3 мови (RU/EN/BG), форми лідів. Без реальної CRM.

## Scope DEMO
- Головна, каталог, карта, картка, about, contacts, selection
- Mock 40+ об'єктів (Болгарія)
- i18n з prefix `/ru|/en|/bg` + locale detection
- Leaflet + OSM карта (без API key)
- Ліди в `localStorage`

## Out of scope
CRM sync, адмінка, SEO-міграція домену, акаунти користувачів.

## Стек
Next.js (App Router) + TypeScript + Tailwind + next-intl + Leaflet.

## Запуск
```bash
npm install
npm run dev
```
Відкрити http://localhost:3000 → редірект на `/ru`.

## Acceptance
Див. чеклист у README. Після апруву UX — заміна mock API на CRM sync.
