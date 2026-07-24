# Orders persistence (E3)

Webhook і `/api/pay/status` на Vercel можуть виконуватись на **різних** serverless-інстансах. In-memory `Map` між ними не шариться.

## Рішення

`src/lib/orders.ts`:
- **Redis** через `@upstash/redis`, якщо є env
- інакше **memory** (local / поки KV не підключено) + warning у логах

Ключ: `nomore:order:{orderReference}`  
TTL: 45 днів

## Env (Vercel Production + Preview)

Upstash Redis або Vercel KV (той самий REST API):

```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

або

```
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

Після додавання — **Redeploy**.

## Перевірка

```bash
curl https://nomorebot.vercel.app/api/pay/health
# {"ok":true,"ordersBackend":"redis",...}
```

Локально без env → `"ordersBackend":"memory"`.

```bash
npm run smoke:orders
```

## Поведінка

| Операція | Persist |
| --- | --- |
| create | save pending |
| return / status / webhook | paid / failed / pending |
| markPaid | не даунгрейдить з paid |
| markFailed | не перетирає paid |
| provisioned | після Approved webhook |

Поля order (мін.): `orderReference, planId, email, telegram?, amountUah, status, providerStatus?, reason?, source? (from), utmSource/Medium/Campaign/Content/Term?, provisioned, createdAt, updatedAt`

Поки Redis не підключено на проді — система працює, але статус може «губитись» між інстансами (WFP CHECK_STATUS лишається запасним шляхом).
