# MSQDX UI — BreakpointSwitcher

**Status:** Accepted (CREATION E7 chrome) — 2026-08-12  
**Layer:** Molecules  
**Consumers:** creation-v3 `/editor` canvas toolbar · any composition editor preview width  
**Related:** `msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-canvas-viewport.md`

## Purpose

Generic **mobile / tablet / desktop** segmented control for editor chrome. Apps own the preview width mapping (e.g. artboard `max-width`); this primitive only switches the selected breakpoint id.

## Non-goals

- Hardcoded CREATION brand labels or product routes.
- Computing pixel widths inside `@msqdx/ui` (apps map `value` → CSS / canvas size).
- Replacing general `ToggleGroup` / `Tabs` for non-editor surfaces.

## API

| Prop | Notes |
|------|--------|
| `value` | Current breakpoint: `'mobile' \| 'tablet' \| 'desktop'` |
| `onChange` | `(value: EditorBreakpoint) => void` |
| `labels` | Optional partial label overrides (`mobile` / `tablet` / `desktop`) |
| `options` | Optional subset / order (default all three in mobile→desktop order) |
| `aria-label` | Default `Breakpoint` |
| `className` | Optional |

### Defaults

```ts
type EditorBreakpoint = 'mobile' | 'tablet' | 'desktop'

const DEFAULT_LABELS: Record<EditorBreakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
}
```

## Behaviour

- Controlled only — no internal selected state.
- Exclusive selection via `role="radiogroup"` + `role="radio"`.
- Keyboard: arrow keys move focus and select within the group (standard radio pattern).

## Accessibility

- Root `role="radiogroup"` with `aria-label`.
- Each option is `role="radio"` with `aria-checked`.

## Acceptance

1. Stories: Default, Custom labels, Tablet selected.
2. Tests: `onChange` fires with the clicked breakpoint; custom labels render; radiogroup a11y attrs present.
3. Consuming apps import `BreakpointSwitcher` from `@msqdx/ui` and map value → preview width.
