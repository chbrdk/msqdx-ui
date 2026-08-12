# CREATION layers panel bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-layers-panel.md` · `msqdx-ui-token-picker.md` · `msqdx-ui-property-inspector.md` · `msqdx-ui-creation-editor-chrome.md`  
**Prior inspect wave:** `knowledge/creation-inspect-chrome-bump.md` (`7e771ce`)

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `LayersPanel` | **New** organism — tree `{ id, label, type?, children? }`, `selectedId` / `onSelect`, expand/collapse |
| `TokenPicker` | Optional `allowCycle` (−/+ prev/next through `options`); still **token paths only** |
| `PropertyInspector` | Documented: Design \| CSS tabs are **app-owned** (no `tabs` prop) |

## creation-v3 consumer notes

1. Replace app `EditorLayers` with `LayersPanel`: map `SceneNode` → `LayersPanelItem` (`label` = name \|\| type, `type` = node.type, recurse `children`).
2. Wire `selectedId` / `onSelect` to the same selection state as canvas.
3. Token fields: set `allowCycle` for denser −/+ stepping within the filtered group.
4. Design \| CSS: compose tabs in the app around `PropertyInspector` children — do not expect a DS tabs API.
5. Re-export `LayersPanel` from `apps/web/lib/msqdx-ui.ts` after bump.
6. Pin Dockerfile:

```dockerfile
ARG MSQDX_UI_REF=5e56fc5b887c1c9520608e1baa02966ec4244b2c
```

## Suggested `MSQDX_UI_REF`

Layers panel wave is **committed** on `msqdx-ui` `main` (push follows).

```dockerfile
ARG MSQDX_UI_REF=5e56fc5b887c1c9520608e1baa02966ec4244b2c
```

**Wave commit (full):** `5e56fc5b887c1c9520608e1baa02966ec4244b2c`  
**Short:** `5e56fc5`

## Paths

- Spec: `specs/domain/msqdx-ui-layers-panel.md`
- Components: `packages/ui/src/components/{LayersPanel,TokenPicker,PropertyInspector}.*`
- Catalog: `packages/ui/src/storybook/catalog.ts` · export `packages/ui/src/index.ts`
- Storybook: `Organisms/LayersPanel` · `Organisms/TokenPicker` → WithCycle
