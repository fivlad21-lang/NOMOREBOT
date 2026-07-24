# Analytics & UTM (E8)

## Attribution

Landing / ads URLs:

```
https://nomorelab.wtf/?from=tiktok&utm_source=tiktok&utm_medium=paid&utm_campaign=launch
```

- `from` → hero subtitle (`tiktok` / `instagram` / `telegram`) + order.`source`
- `utm_*` → order fields `utmSource` / `utmMedium` / `utmCampaign` / `utmContent` / `utmTerm`
- Values persist in `sessionStorage` (`nomore_attribution_v1`) across pricing → checkout
- Written on `/api/pay/create` into the order store

## Pixels

Env (Vercel Production + Preview):

```
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

Without IDs the site loads normally; scripts are not injected.

| Event | Where | Notes |
| --- | --- | --- |
| PageView | Meta / TikTok base snippet | layout |
| ViewContent | `/` landing | once on mount |
| InitiateCheckout | `/checkout` | once per plan view |
| Purchase (Meta) / CompletePayment (TikTok) | `/thanks` when status=`paid` | once per `orderId` (sessionStorage dedupe); **not** on fail/pending |

## OG image

- Generated: `/opengraph-image` → **1200×630**
- Metadata in `src/app/layout.tsx` (`openGraph` + `twitter.summary_large_image`)

Check:

```
https://nomorebot.vercel.app/opengraph-image
```

## Owner checklist before paid traffic (E10)

1. Create Meta Pixel + TikTok Pixel
2. Paste IDs into Vercel env → Redeploy
3. Verify events in pixel helpers (test Purchase only after a real/test paid thank-you)
4. Use UTM on every creative URL
