# Magazine character challenge — DS vs AUDION/CHECKION (2026-08-03)

**Question:** Do `@msqdx/ui` primitives match the magazine / editorial character used by AUDION + CHECKION?

**Product SoT (binding):**
- Type + hairline rules + whitespace (not glass admin)
- Square magazine chrome (tiles, card footers, capability pickers)
- Fill-free stages (no soft panel washes / filled selection blocks)
- Underline + ink weight for selection
- Collection tiles OK; essay/chat must not live in card/Panel chrome
- Refs: `audion-v3/knowledge/persona-magazine.md`, `checkion-v3/specs/domain/scan-modes.md`, `msqdx-ui` accordion/card-actions/chat-chrome specs

## Rubric scores

| Score | Meaning |
|-------|---------|
| Fit | Encodes magazine language; safe in folio/article contexts |
| Ok-compose | Neutral kit; fine when composed under product magazine CSS |
| Tension | Usable but defaults drift toward soft admin / workstation |
| Mismatch | Actively fights magazine character if used as-is on editorial surfaces |

## Challenge table (public primitives)

| Component | Score | Challenge |
|-----------|-------|-----------|
| Text / PageTitle / Hint | Fit | Role ladder is the magazine spine |
| Divider | Fit | Hairline `--line` |
| Field / Input / Textarea / Select | Fit | Underline-led; no focus glow (spec) |
| Accordion | Fit | Spec: hairline magazine disclosure |
| CardActions | Fit | Square buttons + hairline footer |
| Meter / Slider / MeterList | Fit* | Magazine meters; Slider track still pill + soft focus ring (small tension) |
| Chip | Fit | Squared `--radius-sm`, not pill wall by default |
| SectionChrome / Lede / LedeStrip / DivergingBar | Fit | Unified lede: metrics + wizard steps; aliases StatLede / WizardSteps |
| EventFooter | Fit | Explicit “no card chrome” |
| BrandCorner / AppFrame / NavRail | Fit | Cutdown shell language |
| ScrollArea | Fit | Opt-in hairline scroll |
| Button default | Fit | Square + `md` magazine scale; `pill` chat-only; `lg` launch CTAs |
| Button `pill` | Ok-compose | Chat send only — wrong for collection / launch CTAs |
| Panel | Fit | Default `editorial`: top hairline, fill-free, square; `card` hairline tiles; wash only `variant="default"` |
| ToggleGroup / Tabs | Tension | Fine for settings; CHECKION forbids ToggleGroup for WCAG depth (use tiles) |
| FilterRow | Fit | Magazine hairline chip band (default); `toolbar` for dense ops |
| TagInput | Ok-compose | Utility chrome; keep off cover/overview hero |
| Alert / LoadingText / EmptyState / StatusDot | Ok-compose | Status language; keep quiet on magazine covers |
| Tooltip / Skeleton / Spinner | Ok-compose | Utility |
| RankedList / RankedRow / DataTable | Tension | Workstation lists — OK for ops/sources; not chapter spine (CHECKION: numbered lists not Panel tables) |
| Dialog / ConfirmDialog | Tension | Soft sheet (`--radius-panel` + shadow) — functional, not magazine folio |
| Toast | Tension | Soft card + shadow — ops feedback, not editorial |
| Avatar | Tension → **remediated** | Default `square`; `shape="round"` for dense lists (2026-08-03) |
| Flyout | Mismatch → **remediated** | Default solid; glass opt-in `surface="glass"` (2026-08-03) |
| KpiStrip / PipelinePanel / StatusMeterPanel / TopStatus | Tension | ECHON overview workstation — deliberately not magazine essay; don’t drop onto AUDION/CHECKION covers |
| InspectDock / StepStrip / ChannelStack | Ok-compose | Inspect shells; product fills tile bodies |
| Icons | Ok-compose | Neutral |

\*Slider magazine OK if composed as Meter; Flyout glass is the strongest primitive conflict.

## Systemic gaps (not one component)

1. **Two radii philosophies:** Theme `--radius: 0` vs many primitives using `--radius-md|panel|pill`.
2. ~~**Panel as default stage** fights CHECKION fill-free launch / AUDION open chat.~~ Remediated — default `editorial`; wash only via `variant="default"`.
3. **No first-class “magazine tile” / “capability picker”** primitive — products fork CSS (`checkion-capability-*`, `audion-index*`); `Panel variant="card"` covers collection tiles.
4. ~~**Avatar circle vs square portrait** language mismatch.~~ Remediated — square default.
5. ~~**Flyout glass** is the clearest anti-pattern still shipping in the kit.~~ Remediated — solid default.

## Recommended remediations (priority)

1. ~~Flyout: solid surface + hairline + square/`--radius` 0; drop blur by default (or `variant="glass"` opt-in only).~~ **Done 2026-08-03** — `surface="solid"|"glass"`.
2. ~~Panel: add `variant="flush"|"editorial"` (transparent / no wash / radius 0) for magazine stages.~~ **Done 2026-08-03** — default now `editorial`; `card` for collection tiles; `default` wash for ops.
3. ~~Button: magazine `shape="square"`.~~ **Done 2026-08-03** — default is now **square + md**; `pill` / `rounded` opt-in.
4. ~~Avatar: `shape="square"|"round"`; square default for product portraits.~~ **Done 2026-08-03**.
5. ~~Storybook: magazine vs workstation story tags~~ **Started 2026-08-03** — Avatar uses `tags: ['magazine']` / Round story `['workstation']`; expand across catalog next.
6. ~~FilterRow magazine overhaul + Lede unify (StatLede + WizardSteps).~~ **Done 2026-08-03** — products cut over to `Lede`/`LedeStrip`/`FilterRow`+`Chip`.

## Related

- Completeness: `msqdx-ui-completeness.md`
- Product SoT: `msqdx-ui-product-sot.md`
- Specs: `specs/domain/msqdx-ui-lede.md`, `specs/domain/msqdx-ui-filter-row.md`
- Canvas: Cursor canvases `magazine-character-challenge.canvas.tsx`
