# TZ 2.0 — E4 legal + brand .wtf

**Дата:** 2026-07-24  
**Висновок:** **PASS**

## Зроблено

1. **BrandMark** — `NOMORE LAB` + маленьке `.wtf` (hero, header, footer, checkout, proof, legal layout)
2. Сторінки:
   - `/legal/offer`
   - `/legal/privacy`
   - `/legal/requisites`
3. Checkout: обовʼязковий checkbox оферти + privacy
4. Footer: живі лінки на документи
5. FAQ повернення → лінк на оферту
6. Дані: `src/data/legal.ts` (домен `nomorelab.wtf`, реквізити)

## Реквізити (надані власником)

| Поле | Значення |
| --- | --- |
| Отримувач | Фурман Владислав Іванович |
| ІПН/ЄДРПОУ | 3752109313 |
| IBAN | UA713220010000026205360316289 |

Примітка в оферті: це ще не ФОП-оформлення; онлайн-оплата через WayForPay.

## Acceptance

- [x] Немає placeholder «на етапі продакшену» у футері
- [x] Без оферти оплата не стартує
- [x] `.wtf` видно біля бренду
- [x] Lint / build

## Далі від власника

1. Привʼязати DNS `nomorelab.wtf` → Vercel  
2. `NEXT_PUBLIC_SITE_URL=https://nomorelab.wtf` + оновити WayForPay domain / return / webhook  
3. Коли буде ФОП — оновити `legal.ts` і формулювання в оферті  

## Next

→ **E5** доступ/контент каналу або **E6** соцдоказ.
