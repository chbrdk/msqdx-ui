# CREATION inspect chrome E9 bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-token-picker.md` · `msqdx-ui-creation-editor-chrome.md`  
**Prior waves:** `knowledge/creation-layers-panel-e8-bump.md` · `knowledge/creation-inspect-chrome-bump.md`

## Why

P23 added keep-props, but TokenPicker still expanded every option list under every field (empty swatch grids + “Clear token”). Palette labels concatenated in a row-flex Button. Inspect Field labels stayed magazine all-caps orange. That is form chrome, not Penpot/Zaoly density.

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `TokenPicker` | Default `variant="compact"`: strip + popover list; pick/outside click closes. `variant="list"` stays always-open. |
| `TokenPicker` | Clear control is `×` (label stays on `aria-label`). |
| `PropertyInspector` | Title row hidden (`display: none`); Field labels in-rail are sentence-case muted. |
| `InspectSection` | Tighter body gap. |
| `ComponentPalette` | Button is column flex so label + description do not concatenate. |

## Consumer notes (creation-v3)

1. Do not pass `variant="list"` in `/editor` — compact is the default.
2. Palette items: type name only (`Stack`), no `Top-N` / `Extended` descriptions.
3. Inspect Design tab: omit Type/Id meta; layers: name only (no type prefix).
4. Pin Dockerfile after this work is **committed & pushed** on `msqdx-ui`.

## Suggested `MSQDX_UI_REF`

E9 compact TokenPicker wave is **committed** on `msqdx-ui` `main`.

```dockerfile
ARG MSQDX_UI_REF=115711177cee9c5fac981675cb6a6e8f3517fcaa
```

**Wave commit (full):** `115711177cee9c5fac981675cb6a6e8f3517fcaa`  
**Short:** `1157111`

## Paths

- Spec: `specs/domain/msqdx-ui-token-picker.md` · `specs/domain/msqdx-ui-creation-editor-chrome.md`
- Components: `packages/ui/src/components/{TokenPicker,PropertyInspector,ComponentPalette}.*`
- CSS: `packages/ui/src/css/components.css` (`.ds-token-picker--compact`, `.ds-property-inspector__head`, `.ds-component-palette__btn`)
- Storybook: `Organisms/TokenPicker` → Default (compact) · DenseList
