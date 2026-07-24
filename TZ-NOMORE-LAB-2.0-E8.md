# TZ 2.0 — E8 аналітика / UTM / OG

**Дата:** 2026-07-24  
**Висновок:** **PASS** (код); Pixel IDs — owner

## Attribution
- `?from=` + `utm_*` → `sessionStorage` (`AttributionCapture`)
- Checkout POST → order.`source` + `utmSource|Medium|Campaign|Content|Term`
- Hero subtitle як і раніше через `subtitleForSource(from)`

## Pixels
- `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- ViewContent на `/`, InitiateCheckout на `/checkout`
- Purchase (Meta) + CompletePayment (TikTok) **лише** на thanks `paid`, 1× на orderId
- Без IDs скрипти не вантажаться

## OG
- `src/app/opengraph-image.tsx` — 1200×630
- `layout` openGraph + twitter `summary_large_image`

## Docs
- `docs/ANALYTICS.md`
- `.env.example` + README

## Owner перед E10
Додати Pixel IDs на Vercel → Redeploy → перевірити Events Manager / TikTok helper.

## Next
→ **E9** soft launch checklist
