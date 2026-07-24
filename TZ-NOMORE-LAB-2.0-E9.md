# TZ 2.0 — E9 soft launch

**Дата:** 2026-07-24  
**Висновок:** **PASS** (артефакти в репо). Жива хвиля 10–30 / ≥3 paid — **owner**, блокер E10.

## Артефакти
- `docs/SOFT-LAUNCH.md` — pre-flight, invite, трекінг, acceptance
- `scripts/e9-soft-launch-smoke.mjs` + `npm run smoke:soft-launch`
- Soft-launch DM у `docs/channel-starter.md`

## Prod smoke (2026-07-24, `https://nomorebot.vercel.app`)

| Check | Result |
| --- | --- |
| `/`, `/checkout`, `/thanks` | 200 |
| `POST /api/pay/return` | 303 → `/thanks` |
| `/legal/*`, `/opengraph-image`, `/api/pay/health` | **404** |

→ Production ще **не** на коміті з E4–E8. Перед запрошенням людей: задеплоїти гілку `cursor/tz-course-landing-bde7` (або merge) і добитися `npm run smoke:soft-launch` = PASS + `ordersBackend=redis`.

## Owner перед E10
1. Deploy latest + Redis env  
2. Live WFP + 1 самооплата  
3. Наповнити TG канал/групу  
4. Кликнути 10–30 своїх з `?from=` / UTM  
5. ≥3 paid, 0 critical access bugs  

## Next
→ **E10** лише після PASS живої хвилі.
