# ТЗ v1.1 — NOMORE LAB: бренд, контент, фото, нав, фікс відгуків

Документ для імплементації **без поломки** поточної воронки (`/`, `/checkout`, `/thanks`, `/api/pay/*`). Mentor-тариф **не чіпаємо**.

## 0. Цілі

1. Бренд: **NOMORE LAB**
2. Контакти: TG / IG / email
3. Відгуки: живі, сленгові, з віком і різними болями
4. Фото експерта під glass-стилістику
5. Фікс кривих відгуків на мобайлі
6. Зручна **бічна навігація**
7. Регресія: оплата, тарифи, UTM, desktop — без змін логіки

## 1. Scope / Out of scope

**In:** rename, contacts, testimonials rewrite + layout, SideNav, photo, дрібні багфікси лендінгу.

**Out:** реальна платіжка, зміна цін/Mentor, кабінет, редизайн палітри, LEV Estates (не чіпати).

## 2–10. Деталі

Див. реалізацію в:
- `src/data/course.ts` — BRAND, contacts, testimonials
- `src/components/landing/SideNav.tsx`
- `src/components/landing/Testimonials.tsx`
- `public/course/expert.png`
- Hero / Expert / Footer / metadata

## Acceptance

- [x] NOMORE LAB скрізь на course-сторінках
- [x] Контакти клікабельні
- [x] 6 відгуків з віком і болями
- [x] Reviews без horizontal overflow
- [x] Side nav desktop + mobile menu
- [x] Фото в hero + expert
- [x] Mentor без змін
- [x] Checkout/thanks/mock pay живі
