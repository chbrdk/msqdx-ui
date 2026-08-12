# MSQDX UI — CanvasViewport

**Status:** Accepted — 2026-08-12  
**Layer:** Organisms  
**Consumers:** CREATION `/editor`  
**Related:** `msqdx-ui-selection-handles.md` · `msqdx-ui-creation-editor-chrome.md`

## Purpose

Pan/zoom artboard host for composition editors. Apps own gesture handlers and scene state; this primitive supplies chrome + transform slot + optional overlays (e.g. `SelectionHandles`).

## API

| Prop | Notes |
|------|--------|
| `artboardWidth` / `artboardHeight` | Logical CSS px (defaults 1280×800) |
| `zoom` | Scale (1 = 100%) |
| `panX` / `panY` | Translate before scale (apps drive pan) |
| `overlays` | Absolute layer above artboard (`pointer-events: none` by default in CSS) |
| `children` | Scene content inside artboard |
| `aria-label` | Default `Canvas` |

Gesture handlers attach via standard DOM props on the root (`onPointerDown`, `onWheel`, …). No built-in pan physics.

## Acceptance

1. Stories cover default + zoom/pan.
2. Tests assert artboard transform reflects `zoom` / `panX` / `panY`.
3. Import from `@msqdx/ui`.
