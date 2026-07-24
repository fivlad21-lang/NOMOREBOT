# TZ 1.3 — звіт моніторингу (~5 хв)

## Середовища
- **local** `http://127.0.0.1:3000` — збірка після коміту `a3e9fed` (після рестарту next-server)
- **prod** `https://nomorebot.vercel.app` — на момент тесту **ще без TZ 1.3** (`/api/pay/return` → 404)

## Результат local (після рестарту з новим білдом)
| Перевірка | Результат |
| --- | --- |
| `POST /api/pay/return` | **303** → `/thanks?…&wfpStatus=Declined` |
| `GET /api/pay/return` | **303** |
| `POST /thanks` (legacy) | **303** через middleware (не `Server action not found`) |
| Fail UI після redirect | є «Оплату не підтверджено» + **«Спробувати знову»** → `/checkout?plan=…` |
| `GET /`, `/checkout?plan=*`, `/thanks` | 200 |
| `GET /api/pay/status?order=invalid` | 400 `Invalid order` (очікувано) |
| `POST /api/pay/create` без env ключів | 500 (немає `WAYFORPAY_*` локально) |

## Результат prod (до деплою 1.3)
| Перевірка | Результат |
| --- | --- |
| GET `/`, checkout, thanks | 200 стабільно (~5 хв heartbeat) |
| `POST /thanks` | 200 HTML (старий білд; middleware 1.3 ще немає) |
| `GET/POST /api/pay/return` | **404** (маршрут з’явиться після деплою) |
| Invalid status order | 400 JSON |

## Помилки / ризики (список)
1. **P0 (виправлено в 1.3, чекає деплой):** WayForPay POST на `/thanks` → `Server action not found` на проді до викатки.
2. **P1:** Поки prod не задеплоїть 1.3, нові інвойси з `returnUrl=/api/pay/return` отримають 404 — **потрібен деплой PR #5**.
3. **P2 local:** без `WAYFORPAY_MERCHANT_ACCOUNT` / `SECRET_KEY` create падає 500 (норма для локалки без env).
4. **P2:** перший прогін моніторингу бив у **старий** next-server на :3000 (EADDRINUSE) → хибні 404 на API; після kill/restart — ок.
5. **Info:** мерчант `tested` + реальна картка = живий банк-флоу; для тестів без грошей — `test_merch_n1` + тест-картки з доки.
6. **Info:** build warning Next 16 — `middleware` deprecated → `proxy` (не блокує).

## Acceptance TZ 1.3 (local)
- [x] POST return без Server action error
- [x] Fail + retry на той самий plan
- [ ] Prod — після Vercel deploy того ж коміту
