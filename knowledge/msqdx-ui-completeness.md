# MSQ DX v2 — Design system completeness (2026-07-28)

**Goal:** Product UI foundation is “fully built” when primitives ship (spec → component → CSS → Storybook Atomic entry → tests). Chat sheet chrome product-impl stays separate.

## Done — core + foundation + extended

See prior tables in git history / primitive specs. Barrel: `design-system/index.ts`.

## Done — Atomic Storybook catalog

| Item | Spec |
|------|------|
| Atomic layers + CSF/MDX rules | `msqdx-ui-storybook-atomic.md` |
| Full inventory map | `msqdx-ui-catalog-map.md` |
| Runtime catalog + guards | `apps/web-ui/src/storybook/catalog.ts` |

Sidebar: `Foundation` → `Atoms` → `Molecules` → `Organisms` → `Templates` → `Pages`.

## Done — Responsive ladder

| Item | Spec / artifact |
|------|-----------------|
| Breakpoint knobs sm/md/lg | `web.ui.responsive_*` in `paths.yaml` |
| Layer rules + acceptance | `msqdx-ui-responsive.md` |
| CSS layer | `design-system/css/responsive.css` |
| Storybook viewport presets | `.storybook/preview.tsx` · `src/storybook/viewports.ts` |
| Guards | `responsiveLayout.test.ts` · catalog `viewportCritical` |

Complements ultra-wide (`overview-ultra-wide.md`); does not replace it.

## Done — Chat chrome (Wave B + open surface)

Composer / empty / error / close use DS (`msqdx-ui-chat-chrome.md`).  
**2026-07-29:** `.chat-panel-open` editorial full-page surface (turns, underline composer, expand, icon send) promoted into `packages/ui/src/css/chat.css`. Guard: `chatChrome.test.ts`. Product SoT: `msqdx-ui-product-sot.md`.

## Done — Product page chrome (Wave C)

Wave/Briefing headlines → `<Text role="headline">`; status lines → Alert/LoadingText/EmptyState; citation hops → `<Button variant="link">`. Guard: `productChromeSot.test.ts`.

## Done — Token unify (Wave D)

Chart/status/palette SoT = `design-system/tokens` (`status.ts`, `colors.ts`). `msqdxTokens.ts` is runtime facade. Guard: `tokenSot.test.ts` (CSS `[data-theme]` ↔ SemanticTheme).

## Done — Feedback / data primitives (Wave E)

`Avatar` · `ToastProvider`/`useToast` · `DataTable` — spec `msqdx-ui-feedback-data.md` · tests `FeedbackData.test.tsx` · `ToastProvider` in product `App`.

**Pilot:** `/sources` → DataTable + Avatar + Toast (`SourcesPage.test.tsx`).

**Follow-on cutover:** Waves detect → Toast (`WavesPage.test.tsx`); OpsStrip → Alert/LoadingText (`OpsStrip.test.tsx`); Research/Signals/Waves empties → EmptyState (`ResearchPage.test.tsx`); Overview KPI/Hint/SystemLoad → Text (`KpiStrip.test.tsx`, `OverviewPage.test.tsx`).

## Done — Forms edit wave (2026-07-29)

`Field` errors · `TagInput` · `ConfirmDialog` · underline-led control chrome — `msqdx-ui-forms.md` · `forms-edit-wave.md` · tests in `Field.test.tsx`.

## Done — Accordion magazine disclosure (2026-07-30)

`Accordion` · `SectionChrome.metaTone="accent"` — spec `msqdx-ui-accordion.md` · pilot AUDION project knowledge.

## Explicitly later

- Message-bubble rem-audit in chat
- Full rem-audit of leftover viz CSS literals
- Chromatic / visual regression CI
- Product pages consuming DataTable / Avatar where ranked lists stay preferred

## Related

- Hub: `msqdx-ui-design-system.md`
- Product SoT: `msqdx-ui-product-sot.md`
- Storybook: `storybook-web-ui.md` · `msqdx-ui-storybook-atomic.md`
- Responsive: `msqdx-ui-responsive.md`
- Chat chrome: `msqdx-ui-chat-chrome.md` (Wave B done)
- Forms: `forms-edit-wave.md` · `msqdx-ui-field.md`
- ADR: `specs/adr/0028-product-ui-visual-system.md` §17 · §20 · §21 · §22
