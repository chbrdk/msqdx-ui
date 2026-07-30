# ECHON V3 — URLs and paths

**Source of truth for machine-readable values:** `../config/paths.yaml`  
Do not hardcode hosts, ports, or model IDs in `apps/`.

## Local (Mac primary)

| Resource | Default |
|----------|---------|
| API | `http://127.0.0.1:8300` (bind: `api.host`, default `0.0.0.0` for LAN) |
| Product UI (Vite+React) | `http://127.0.0.1:3300` (`apps/web-ui`) · `knowledge/product-ui-vite.md` |
| Settings (theme / locale / display name) | `web.ui.settings_path` → `/settings` · `knowledge/msqdx-ui-settings.md` |
| Dashboard (ops thin) | `http://127.0.0.1:8300/dashboard` (API; not in product rail) |
| Storybook (component catalog) | `web.storybook_base_url` → `http://127.0.0.1:6006` · `knowledge/storybook-web-ui.md` |
| LAN UI | `http://<mac-lan-ip>:3300` — bind via `web.host: 0.0.0.0` · IP: `ipconfig getifaddr en0` |
| LAN API | `http://<mac-lan-ip>:8300` (UI proxies `/api` via Vite → loopback; direct API also LAN-reachable) |
| Brand (MSQ DX trial) | `brand.msqdx_site` → https://www.msqdx.com/en · `knowledge/ui-msqdx-trial.md` |
| Logo mark | `brand.msqdx_logo_mark` → `apps/web-ui/src/ui/MsqdxLogoMark.tsx` |
| Brand corner cutout | `brand.corner_*` → `BrandCorner.tsx` · `knowledge/brand-corner-cutout.md` |
| Postgres | `127.0.0.1:5433` / db `echon_v3` (Docker `echon-v3-postgres`, vol `echon_v3_pgdata`) |
| Redis | `127.0.0.1:6380` |

See `postgres-pgvector.md` for compose + migrate.

## API prefixes

| Prefix | Purpose |
|--------|---------|
| `/health`, `/health/ready` | Health |
| `/api/v3/signals` | Signals |
| `/api/v3/waves` | Waves |
| `/api/v3/waves/tag-graph` | Topic adjacency (+ `?industry=` / noise) · `knowledge/tag-graph-noise-industry.md` |
| `/api/v3/foresight/momentum` | Rising tags + wave momentum + watchlist · ADR 0031 gate · `knowledge/foresight-momentum.md` / `regional-noise-gate.md` |
| `/api/v3/foresight/briefing` | Daily pulse · same gate · `knowledge/daily-briefing.md` |
| `/api/v3/foresight/cross-pressure` | Industry bridges · same gate · `knowledge/scenario-cross-pressure.md` |
| Research gold | `scripts/eval_research_gold.py` · `paths.research_gold_queries` |
| Cross-pressure gold | `scripts/eval_cross_pressure_gold.py` · `paths.cross_pressure_gold` |
| `/api/v3/research/threads` | Research threads |
| `/api/v3/research/threads/{id}/ask` | Ask (hybrid ANN + optional scenario cache) |
| `/api/v3/research/scenarios` | List scheduled scenario packs + cache status + `history_preview` |
| `/api/v3/research/scenarios/{id}` | Get one scenario snapshot |
| `/api/v3/research/scenarios/{id}/history` | Thin time-history (ADR 0027) |
| `/api/v3/research/scenarios/run` | Force refresh (`?scenario_id=` optional) |
| `/api/v3/chat/sessions` | ChatGPT agent sessions (ADR 0032) · `knowledge/echon-chat.md` |
| `/api/v3/chat/sessions/{id}/messages` | User → assistant (+ tools / citations) |
| `/api/v3/research/briefings` | Magazine briefings POST create / GET `{id}` · `knowledge/research-briefing-page.md` |
| `config/research_scenarios.yaml` | Scenario pack definitions |
| `config/research_gold_queries.yaml` | Gold questions for research quality |
| `scripts/eval_research_gold.py` | Research gold eval (local or `--api`) |
| `knowledge/item-18-quality-gate.md` | Item 18 close-out (tags + enrich quality) |
| `knowledge/dashboard-plan.md` | Product dashboard planning (stack locked B′) |
| `knowledge/product-ui-vite.md` | Product UI runbook (Vite+React `:3300`) |
| `specs/adr/0020-vite-react-product-ui.md` | ADR 0020 — Vite+React product UI |
| `specs/adr/0021-product-ui-locales.md` | ADR 0021 — DE|EN UI locales |
| `specs/domain/product-ui.md` | Product UI capabilities + i18n acceptance |
| `knowledge/sticky-ml-nano-overflow.md` | Sticky ML phases + OpenAI nano overflow (ADR 0019) |
| `knowledge/corpus-overflow-starvation-2026-07-27.md` | Invalid OpenAI key starved local ML ticks |
| `knowledge/crash-oom-2026-07-27.md` | OOM crash: dual MLX + V2 containers |
| `knowledge/eval-tag-policy.json` | Live tag-policy check artifact |
| `scripts/check_tag_policy.py` | Tag policy live checker |
| `knowledge/msqdx-demo-walkthrough.md` | MSQ DX Overview→Research demo (#83) |
| `scripts/msqdx_demo_preflight.py` | Demo readiness gate · `paths.eval_msqdx_demo_preflight` |
| `api.foresight_momentum` / `cross_pressure` / `briefing` | Path keys under `api.*` (no hardcode in scripts) |
| `knowledge/openapi-ci-gate.md` | Spectral + oasdiff CI gate (#84) |
| `scripts/openapi_gate.py` | OpenAPI lint/validate/breaking · `openapi_gate.*` pins |
| `paths.eval_openapi_gate` | `knowledge/eval-openapi-gate.json` |
| `knowledge/dual-queue-drain-watch.md` | Dual-queue drain after pressure (#85) |
| `scripts/dual_queue_drain_watch.py` | Drain status · `ops.drain_watch` / `paths.eval_dual_queue_drain` |
| `knowledge/schemathesis-smoke.md` | Schemathesis ASGI GET smoke (#86) |
| `scripts/schemathesis_smoke.py` | Allowlist smoke · `schemathesis_smoke.*` / `paths.eval_schemathesis_smoke` |


| `/api/v3/pipeline/metrics` | Pipeline |
| `/api/v3/workers/*` | Auto-tick / RSS |
| `/dashboard` | Thin ops UI |

## Models

| Role | Config key | Default intent |
|------|------------|----------------|
| Local enrich | `models.enrichment_local.model_id` | `mlx-community/gemma-4-e4b-it-4bit` |
| Fallback enrich | `models.enrichment_fallback.model_id` | `gpt-5.6-luna` |
| Product chat | `models.chat.model_id` | `gpt-5.6-terra` (ADR 0032) |

| Embedding | `models.embedding.model_id` | `TyKaoz/bge-m3-8bit` (1024-d) |
| Qwen embed (A/B) | `models.embedding_candidates.qwen3_0_6b_mlx.model_id` | `majentik/Qwen3-Embedding-0.6B-MLX-4bit` |

## Specs (enrich)

| Schema | Config key |
|--------|------------|
| Deep enrich | `paths.enrichment_schema` |
| Light categorize | `paths.enrichment_light_schema` |

Capacity planning: `mac-enrich-capacity.md` · ADR 0011 · Runtime: `tiered-enrich-pipeline.md`  
Tag policy: `tag-policy.md` (`enrichment_tags` — EN, min 5 / tier)  
Signal dimensions / always-deep: `signal-dimensions.md` (`enrichment.require_deep`)  
Signal latency bench: `signal-latency.md` · `scripts/bench_signal_latency.py`  
E2E smoke: `e2e-smoke.md` · `scripts/e2e_smoke.py`  
Mac deploy: `mac-deploy.md` · `scripts/deploy_mac.sh`  
EU RSS catalog: `eu-rss-catalog.md` · press/wire: `press-intake.md` · market pack: `market-feeds.md` · regional DE: `regional-de-feeds.md` · regional noise: `regional-noise-gate.md` · digest: `ops-digest-pass.md` · capacity: `ops-capacity-check.md` · enrich clear: `enrich-backlog-clear.md` · MSQ demo: `msqdx-demo-walkthrough.md` · system load: `system-load.md` · snapshot/trajectory: `snapshot-history.md` · industry lens: `industry-lens.md` · `paths.rss_feeds` / `paths.rss_market_feeds` / `paths.rss_regional_de_feeds` / `paths.industries` / `ops.alerts` / `foresight.regional_noise`  
Industries API: `/api/v3/industries` · Sources `?industry=`  
Watchlist → Research: `watchlist-research.md` · `/research?signal=` (`web.ui.signal_param`)  
Dashboard visual: `dashboard-visual-system.md` · ADR 0028 · Lucide `ui/icons.tsx` · `SectionChrome` (`msqdx-ui-section-chrome.md`) · DS completeness: `msqdx-ui-completeness.md` · product SoT: `msqdx-ui-product-sot.md` · settings: `msqdx-ui-settings.md` · feedback/data: `msqdx-ui-feedback-data.md` · signal detail: `msqdx-ui-signal-detail.md` · chat chrome: `msqdx-ui-chat-chrome.md` · category rank: `category-rank-viz.md` · ranked list: `msqdx-ui-ranked-list.md` · field: `msqdx-ui-field.md` · page polish: `page-visual-polish.md` · ultra-wide Overview: `overview-ultra-wide.md` · responsive ladder: `msqdx-ui-responsive.md` · `/signals?category=` (`web.ui.category_param`) · MSQ DX v2 DS: `msqdx-ui-design-system.md` · typography: `msqdx-ui-typography.md` · motion/Button: `msqdx-ui-motion-buttons.md` · chip: `msqdx-ui-chip.md` · Storybook: `storybook-web-ui.md`
Retrieval quality: `golden-retrieval-eval.md` (`paths.golden_queries` / `golden_corpus`)
Eval artifacts: `paths.eval_golden_bge` · `paths.eval_embedding_ab`  
MCP: `mcp-server.md` (stdio `echon-v3-mcp`)  
Redis Streams (opt-in): `redis-streams-mirror.md` · `ECHON_V3_REDIS_STREAMS=1`  
Near-dup: `near-dup-skip.md` · `near_dup.*` in paths.yaml  
Research package (hybrid+briefings): `research-package-shadow-failed-enrich.md` · `scripts/requeue_failed_enrich.py`  
Sources: `sources-ui.md` · `/api/v3/sources` · `paths.rss_feeds`  
Content extract: `content-extract-firecrawl.md` · `content_extract.*` · Firecrawl `http://127.0.0.1:3002`  
Hard golden (archive): `hard-golden-and-v2-compare.md`  
Coolify / V2: **ignored** · `knowledge/v2-rethink-decommission.md` · `v2_compare.enabled: false`


## Remote clients

Tailscale hostname / public URL: add here when exposed; until then local only.
