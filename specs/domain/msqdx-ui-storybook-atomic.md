# MSQ DX v2 — Atomic Storybook catalog (ECHON product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §21 · §22  
**Implements:** Storybook 10 + CSF3 + MDX under `apps/web-ui`  
**Inventory:** `specs/domain/msqdx-ui-catalog-map.md` · runtime `apps/web-ui/src/storybook/catalog.ts`  
**Knowledge:** `knowledge/msqdx-ui-storybook-atomic.md` · `knowledge/storybook-web-ui.md` · `knowledge/msqdx-ui-responsive.md`  
**URL/Port SoT:** `web.storybook_*` in `config/paths.yaml`  
**Responsive SoT:** `web.ui.responsive_*` · `specs/domain/msqdx-ui-responsive.md`

## Goals

1. Every public UI building block is catalogued under Atomic Design layers in Storybook.
2. Docs-heavy: co-located CSF3 + Controls + MDX docs page (Usage / Do–Don’t) per entry. Do **not** dual-tag CSF with `autodocs` when an MDX docs file exists (Storybook conflict).
3. Organisms/Pages use fixtures / Query prefill — **no live API** in Storybook.
4. Catalog completeness is guarded by tests (`catalog.ts` ↔ files on disk).

## Non-goals

- Toast / DataTable / Avatar until product consumers exist.
- Shipping Chromatic / visual regression CI in this pass.
- Replacing product Chat chrome behaviour (separate `msqdx-ui-chat-chrome.md`); Storybook still documents current chat components.

## Layers (sidebar titles)

| Layer | Title prefix | Contents |
|-------|--------------|----------|
| Foundation | `Foundation/` | Tokens, Typography, Motion, Icons |
| Atoms | `Atoms/` | Indivisible primitives |
| Molecules | `Molecules/` | Small compositions |
| Organisms | `Organisms/` | Data panels, nav, chat panel, ranked lists |
| Templates | `Templates/` | App shell, chat overlay |
| Pages | `Pages/` | One story set per route page |

## File conventions

Next to each component (or showcase):

- `X.stories.tsx` — CSF3, `component`, meaningful states + Controls via args
- `X.mdx` — Overview, Anatomy, Usage, Do and Don't, Accessibility, Related (docs page; no CSF `autodocs` tag)

Bundle galleries (`Design System/Foundation`, `Design System/Extended`) are **forbidden** once Atomic catalog ships.

## CSF3 requirements

- Prefer `args` / `argTypes` over opaque `render` when props-driven.
- States: at least `Default`; add `Disabled` / `Empty` / `Loading` / `Error` when the component has those modes.
- Theme via Storybook toolbar (`data-theme`); global decorators: `MemoryRouter`, `LocaleProvider`.
- Organisms/Pages: also `QueryClientProvider` + fixture prefill (`src/storybook/mocks/`).
- **Viewport:** Preview registers presets `responsiveSm` / `responsiveMd` / `desktop` / `ultraWide` from `paths.responsive*` / `paths.ultraWide*` (never hardcode px in stories). Critical catalog entries (`viewportCritical`) ship a `Narrow` story with `globals.viewport: { value: 'responsiveSm' }` (or MDX viewport note).

## MDX required sections

1. Overview  
2. Anatomy  
3. Usage  
4. Do and Don't  
5. Accessibility  
6. Related (links to sibling atoms/molecules)

## Acceptance

1. Catalog map + `catalog.ts` list every public entry with layer + story + mdx paths.  
2. `catalogCompleteness.test.ts` passes.  
3. `storySmoke.test.tsx` renders every CSF export.  
4. `pnpm build-storybook` succeeds.  
5. Completeness checklist marks Atomic Storybook **done**.
