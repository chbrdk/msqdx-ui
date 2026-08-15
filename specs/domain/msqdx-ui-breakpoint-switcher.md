# MSQDX UI — BreakpointSwitcher

**Status:** Accepted (CREATION E7 chrome) · **Amended:** 2026-08-15 (P85 `print`)  
**Layer:** Molecules  
**Consumers:** creation-v3 `/editor` canvas toolbar · any composition editor preview width  
**Related:** `msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-canvas-viewport.md`

## Purpose

Generic segmented control for editor chrome breakpoint ids. Apps own the preview width/height mapping (e.g. artboard CSS size); this primitive only switches the selected breakpoint id. Default options stay digital (`mobile` / `tablet` / `desktop`); apps may pass `print` via `options`.

## Non-goals

- Hardcoded CREATION brand labels or product routes.
- Computing pixel widths or print presets inside `@msqdx/ui` (apps map `value` → CSS / canvas size; print page presets stay app-owned).
- Replacing general `ToggleGroup` / `Tabs` for non-editor surfaces.

## API

| Prop | Notes |
|------|--------|
| `value` | Current breakpoint: `'mobile' \| 'tablet' \| 'desktop' \| 'print'` |
| `onChange` | `(value: EditorBreakpoint) => void` |
| `labels` | Optional partial label overrides (`mobile` / `tablet` / `desktop` / `print`) |
| `options` | Optional subset / order (default mobile→tablet→desktop — **no** print unless passed) |
| `aria-label` | Default `Breakpoint` |
| `className` | Optional |

### Defaults

```ts
type EditorBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'print'

const DEFAULT_OPTIONS: EditorBreakpoint[] = ['mobile', 'tablet', 'desktop']

const DEFAULT_LABELS: Record<EditorBreakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
  print: 'Print',
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

1. Stories: Default, Custom labels, Tablet selected, Print option (when `options` includes `print`).
2. Tests: `onChange` fires with the clicked breakpoint; custom labels render; radiogroup a11y attrs present; `print` option when provided.
3. Consuming apps import `BreakpointSwitcher` from `@msqdx/ui` and map value → preview size (CREATION maps `print` + `activePrintPreset` → fixed WxH).
