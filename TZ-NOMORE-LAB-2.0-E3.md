# TZ 2.0 — E3 orders persistence report

**Дата:** 2026-07-24  
**Висновок:** **PASS (код)** — Redis/KV store + memory fallback; на Vercel треба додати env власником.

---

## Зроблено

1. `src/lib/orders.ts` — async API, Upstash/`@upstash/redis` або memory
2. Усі `/api/pay/*` (create, status, return, webhook) — `await` save/get/mark
3. `/api/pay/health` — `{ ordersBackend: "redis" | "memory" }`
4. Docs: `docs/ORDERS-PERSISTENCE.md`, README, `.env.example`
5. `npm run smoke:orders`

## Поля order

`orderReference, planId, email, telegram?, amountUah, status, providerStatus?, reason?, source?, provisioned?, createdAt, updatedAt`  
TTL ключа: 45 днів · prefix `nomore:order:`

## Acceptance

| Критерій | Статус |
| --- | --- |
| Persist між cold start при Redis env | **Ready** — після додавання UPSTASH/KV на Vercel |
| Webhook Approved → poll paid | **Ready** (той самий store) |
| Без Redis не ламає local/dev | **PASS** — memory + warning |
| Lint / build | **PASS** |

## Дія власника

1. Створити Upstash Redis (або Vercel Storage → KV)  
2. Додати на **Production** (і Preview):
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`  
3. Redeploy  
4. `curl https://nomorebot.vercel.app/api/pay/health` → `"ordersBackend":"redis"`

Поки env немає — прод лишається на memory (ризик розʼїзду інстансів; CHECK_STATUS WFP лишається запасним).

## Next

→ **E4** Юридичне (оферта / privacy / ФОП) — потрібні реквізити від власника.
