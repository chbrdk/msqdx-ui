# CREATION inspect chrome bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-property-inspector.md` · `msqdx-ui-token-picker.md` · `msqdx-ui-inspect-section.md` · `msqdx-ui-creation-editor-chrome.md`

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `PropertyInspector` | Denser rail CSS; compose `InspectSection` children |
| `InspectSection` | **New** molecule — title + body section chrome |
| `TokenPicker` | Current strip (swatch + path), `onClear` / `clearLabel`, `allowNone` / `noneLabel`, denser list; **token paths only** |
| `SelectionHandles` | Optional `interactive` + `onHandlePointerDown` |
| `CanvasViewport` | Spec + pan/zoom stories/tests (API already had `panX`/`panY`) |

## creation-v3 consumer notes

1. Replace ad-hoc `.creation-inspect-section` with `InspectSection`.
2. Wire `TokenPicker` `onClear` (drop separate Clear `Button`); set `allowNone` when unbound is valid.
3. Overlay `SelectionHandles` via `CanvasViewport` `overlays` when selection chrome is ready; drive `panX`/`panY` from gestures.
4. Re-export `InspectSection` from `apps/web/lib/msqdx-ui.ts` after bump.
5. Pin Dockerfile after this work is **committed & pushed** on `msqdx-ui`:

```dockerfile
ARG MSQDX_UI_REF=7e771cedfaecdf741a6b72e97b160e849409a253
```

## Suggested `MSQDX_UI_REF`

Inspect chrome wave is **committed & pushed** on `msqdx-ui` `main`.

```dockerfile
ARG MSQDX_UI_REF=7e771cedfaecdf741a6b72e97b160e849409a253
```

**Wave commit (full):** `7e771cedfaecdf741a6b72e97b160e849409a253`  
**Short:** `7e771ce`

## Paths

- Specs: `specs/domain/msqdx-ui-*-inspector|token-picker|inspect-section|creation-editor-chrome.md`
- Components: `packages/ui/src/components/{PropertyInspector,InspectSection,TokenPicker,SelectionHandles,CanvasViewport}.*`
- Catalog: `packages/ui/src/storybook/catalog.ts` · export `packages/ui/src/index.ts`
