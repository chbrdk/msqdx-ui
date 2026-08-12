# MSQDX UI — SelectionHandles

**Status:** Accepted — 2026-08-12  
**Layer:** Molecules (catalogued with editor organisms)  
**Consumers:** CREATION `/editor` canvas overlays  
**Related:** `msqdx-ui-canvas-viewport.md` · `msqdx-ui-creation-editor-chrome.md`

## Purpose

Visual bounding box + corner affordances. **No resize math** in the primitive — apps map pointer events to scene ops when interactive.

## API

| Prop | Notes |
|------|--------|
| `width` / `height` / `left` / `top` | Box geometry (CSS px) |
| `visible` | When false, renders nothing |
| `interactive` | When true, corners accept pointer events |
| `onHandlePointerDown` | `(handle: 'nw' \| 'ne' \| 'sw' \| 'se', event) => void` |
| `aria-hidden` | Always decorative; selection announced elsewhere |

Place inside `CanvasViewport` `overlays` (or absolute scene layer). Default `pointer-events: none` unless `interactive`.

## Acceptance

1. Stories: Default + Interactive.
2. Tests: hide when `visible={false}`; interactive fires `onHandlePointerDown`.
3. Import from `@msqdx/ui`.
