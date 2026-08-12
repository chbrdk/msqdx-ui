# CREATION editor chrome E7 bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-breakpoint-switcher.md` · `msqdx-ui-inspect-tabs.md` · `msqdx-ui-layers-panel.md` · `msqdx-ui-property-inspector.md` · `msqdx-ui-creation-editor-chrome.md`  
**Prior waves:** `knowledge/creation-inspect-chrome-bump.md` · `knowledge/creation-layers-panel-bump.md`

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `BreakpointSwitcher` | **New** molecule — `mobile` / `tablet` / `desktop` radiogroup; optional `labels` / `options` |
| `InspectTabs` | **New** molecule — Design\|CSS tablist (labels as props); no panels |
| `LayersPanel` | Optional sibling reorder: `onMoveUp` / `onMoveDown` and/or `onReorder` |
| `PropertyInspector` | Spec clarified: compose `InspectTabs` around the shell (still no `tabs` prop) |

## creation-v3 consumer notes

1. Toolbar: replace ad-hoc breakpoint chips with `BreakpointSwitcher`; map `value` → artboard `max-width` in app.
2. Inspect rail: put `InspectTabs` above `PropertyInspector`; switch Design vs CSS children in the app.
3. Layers: wire `onMoveUp`/`onMoveDown` (or `onReorder`) to sibling reorder in the scene tree; keep drag-drop app-owned if needed later.
4. Re-export new symbols from `apps/web/lib/msqdx-ui.ts` after bump.
5. Pin Dockerfile:

```dockerfile
ARG MSQDX_UI_REF=cae218fe19442d410b2b09a0c6039f4c75c3a6aa
```

## Suggested `MSQDX_UI_REF`

E7 editor chrome wave is **committed** on `msqdx-ui` `main`.

```dockerfile
ARG MSQDX_UI_REF=cae218fe19442d410b2b09a0c6039f4c75c3a6aa
```

**Wave commit (full):** `cae218fe19442d410b2b09a0c6039f4c75c3a6aa`  
**Short:** `cae218f`

## Paths

- Specs: `specs/domain/msqdx-ui-{breakpoint-switcher,inspect-tabs,layers-panel,creation-editor-chrome,property-inspector}.md`
- Components: `packages/ui/src/components/{BreakpointSwitcher,InspectTabs,LayersPanel}.*`
- Knowledge: `knowledge/components/{breakpoint-switcher,inspect-tabs,layers-panel}.md`
- Catalog / export: `packages/ui/src/storybook/catalog.ts` · `packages/ui/src/index.ts`
- Storybook: `Molecules/BreakpointSwitcher` · `Molecules/InspectTabs` · `Organisms/LayersPanel` → WithReorder
