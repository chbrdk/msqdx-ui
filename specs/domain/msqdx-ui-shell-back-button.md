# MSQDX UI — ShellBackButton

**Status:** Accepted — 2026-08-27  
**Layer:** Molecules  
**Shell:** `specs/domain/msqdx-ui-app-shell.md`

## Purpose

Fixed **top-left** history-back control for product shells — the mirror of `BrandCorner` (top-right). Icon-only plaque in the shell cutdown language so Audion / Checkion / Plexon / Brandion share one back affordance.

## Visual

- Flush to the viewport top-left (`position: fixed; top: 0; left: 0; z-index: 40`)
- Ink plaque via `MsqdxCornerBox` with cutdowns (same radius as BrandCorner, default 24)
- Single `IconArrowLeft` — no text label in the chrome
- Reads like shell / BrandCorner overlay chrome, not a toolbar `Button`

## API

| Prop | Notes |
|------|--------|
| `label` | Required accessible name (`aria-label`); default `"Back"` |
| `onClick` | Consumer-owned history (`router.back()` etc.) — **no router inside DS** |
| `href` | Optional: renders `<a>` instead of `<button>` |
| `disabled` | Optional |
| `borderRadius` / `corners` | Optional overrides; default `TOP_LEFT_BACK_CORNERS` |

## AppFrame

- Optional slot `backCorner?: ReactNode` (parallel to `brandCorner`)
- When `backCorner` is set, `ShellCorners` **omits** the decorative top-left scoop (TR remains reserved for BrandCorner; TL is reserved for back)

## Rules

- Routing / history stay app-owned
- No product copy or fallback routes inside `@msqdx/ui`
- Embed / auth shells may omit `backCorner`

## Acceptance

1. Storybook shows the plaque with arrow icon and a11y label
2. Unit tests cover render + click + AppFrame slot
3. Consuming AppShells mount `ShellBackButton` via `AppFrame.backCorner`
