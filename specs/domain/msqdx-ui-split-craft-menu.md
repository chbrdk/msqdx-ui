# MSQDX UI — SplitCraftMenu

**Status:** Accepted — 2026-09-11  
**Layer:** Molecules  
**Consumers:** CREATION Style craft (TypographyCraftMenu host)  
**Related:** `msqdx-ui-token-picker.md` · CREATION `specs/domain/canvas-smart-hud.md` · `knowledge/hud-craft-token-menu.md`

## Purpose

Compact **two-column craft popover shell** for editor context menus:

- **Left rail** — scrollable list surface (e.g. fonts)
- **Right stack** — dense property controls (size, weight, toggles, color)

Generic chrome only — no SceneNode, Brandion, or product routing. Apps supply `left` / `right` children.

## Non-goals

- Token catalog / promote logic
- Full TokenPicker browser chrome (drag, resize, scopes) — apps may embed TokenPicker *inside* a column
- Centered modal / Dialog replacement

## API

| Prop | Notes |
|------|--------|
| `title` | Header label (required for a11y when used as dialog) |
| `header` | Optional custom head content (replaces plain title text; e.g. token picker row) |
| `left` | Left column content |
| `right` | Right column content |
| `leftLabel` | Optional column eyebrow (default `Fonts` / unset) |
| `rightLabel` | Optional column eyebrow (default `Properties` / unset) |
| `footer` | Optional sticky footer |
| `className` | Root class |
| `width` / `height` | Optional CSS size hints (defaults ~400×272) |
| `data-testid` | Default `split-craft-menu` |

Root: `role="dialog"` + `aria-label={title}`. Escape / outside-close is **host-owned** (Floating HUD already closes the craft popover).

## Anatomy

```
.ds-split-craft-menu
  .ds-split-craft-menu__head   (title)
  .ds-split-craft-menu__body
    .ds-split-craft-menu__left   (scroll)
    .ds-split-craft-menu__right  (stack, no scroll preferred)
  .ds-split-craft-menu__footer? (optional)
```

## Density

- Fixed compact panel (~400×272 default); left list scrolls; right controls hug content.
- Equal columns (~50/50) with 1px divider; tight padding (≤0.35rem column inset).
- Quiet uppercase eyebrows for column labels when provided.
- Consumers MAY further densify Field / TokenPicker / Chip chrome via a host class (CREATION: `.creation-typo-craft--dense`).

## Acceptance

1. Stories: Default (fonts | props mock), WithFooter.
2. Tests: renders title, left, right; optional footer; dialog role.
3. Apps import `SplitCraftMenu` from `@msqdx/ui`.
