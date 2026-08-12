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
ARG MSQDX_UI_REF=<sha-below>
```

## Suggested `MSQDX_UI_REF`

Inspect chrome changes are **local / uncommitted** in msqdx-ui (do not pin until committed + pushed).

1. Commit only inspect-chrome files (leave `chat-blocks-backlog`, `ChatCatalog`, `msqdx-brand-colors` out).
2. `git rev-parse HEAD` → full sha.
3. Push, then set creation-v3 `Dockerfile`:

```dockerfile
ARG MSQDX_UI_REF=<that-full-sha>
```

**Current HEAD (pre-density commit):** `f5b6c97f62e9833aa079505f93f9f4fefa4158ca`  
**Post-commit target:** replace with the new HEAD sha once this wave is on the remote creation fetches.

## Paths

- Specs: `specs/domain/msqdx-ui-*-inspector|token-picker|inspect-section|creation-editor-chrome.md`
- Components: `packages/ui/src/components/{PropertyInspector,InspectSection,TokenPicker,SelectionHandles,CanvasViewport}.*`
- Catalog: `packages/ui/src/storybook/catalog.ts` · export `packages/ui/src/index.ts`
