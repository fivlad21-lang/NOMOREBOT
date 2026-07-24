# Pricing FX (USD → UAH)

WayForPay списує **лише гривні**. Долари на лендінгу — маркетинговий якір ($20 / $49 / $100).

## Як рахується

`src/data/pricing.ts`:
- `FX_USD_UAH` — курс (дефолт з НБУ на дату в `FX_META.asOf`)
- `uahFromUsd(usd)` — `round(usd * rate / 10) * 10` (крок 10 ₴)

`plans[].priceUah = uahFromUsd(priceUsd)` у `src/data/course.ts`.  
UI (pricing / checkout / sticky / оферта) і `/api/pay/create` беруть той самий `priceUah`.

## Оновити курс

1. Подивись НБУ: https://bank.gov.ua (USD)  
2. На Vercel Env:
   ```
   NEXT_PUBLIC_FX_USD_UAH=44.81
   ```
3. Redeploy  
4. Онови `FX_META.asOf` у коді (опційно) і цей рядок у таблиці нижче.

Або змінити дефолт у `pricing.ts` і закомітити.

## Таблиця (дефолт 44.81 ₴/$)

| План | USD | UAH |
| --- | --- | --- |
| Start | 20 | 900 |
| Community | 49 | 2200 |
| Mentor | 100 | 4480 |

## Acceptance

- Немає хардкоду типу `₴820` у sticky CTA  
- Checkout amount === WFP invoice amount === `plan.priceUah`  
- Зміна `NEXT_PUBLIC_FX_USD_UAH` перераховує всі три тарифи після redeploy  
