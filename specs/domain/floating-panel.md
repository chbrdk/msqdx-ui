# MSQDX UI — FloatingPanel

**Status:** Accepted  
**Layer:** Organisms  
**Contracts:** `@msqdx/ui` — `FloatingPanel`, `FloatingPanelSurface`, `FloatingPanelVariant`  
**Related:** NavRail SnapDock persistence (`shell/railDock.ts`), Flyout `surface`, magazine character challenge

## Purpose

Generic **dockable overlay shell** for immersive workspaces (flow boards, canvas tools, inspect side panels). Same interaction model as the primary NavRail: edge snap + offset persist via `localStorage`, optional drag handle.

Domain content (flow nodes, verdicts, product copy) stays in the consuming app. This primitive is chrome only.

## Magazine default

| Token / rule | Value |
|--------------|-------|
| Radius | `0` / `var(--radius)` (square) |
| Surface | **solid** — `--paper` / `--surface`, hairline `--line` |
| Blur | **off** by default |
| Shadow | none (optional quiet edge via hairline only) |
| Glass | opt-in `surface="glass"` (parity with Flyout) |

## Variants

| `variant` | Role |
|-----------|------|
| `panel` (default) | Titled floating body (inspector, palette, run strip) |
| `toolbar` | Compact square strip (icon actions) — **not** a pill capsule |
| `strip` | Thin status band (live run metrics) |

## API

```ts
type FloatingPanelSurface = 'solid' | 'glass'
type FloatingPanelVariant = 'panel' | 'toolbar' | 'strip'

type FloatingPanelProps = {
  children: ReactNode
  storageKey: string
  defaultEdge?: 'left' | 'right' | 'top' | 'bottom'
  defaultOffset?: number // 0–1 along edge
  title?: string // drag affordance label
  ariaLabel?: string
  surface?: FloatingPanelSurface // default 'solid'
  variant?: FloatingPanelVariant // default 'panel'
  className?: string
  zIndex?: number // default 35
}
```

### Behavior

1. Lazy-load `react-driftkit` `SnapDock` (same as NavRail). Fallback: static positioned panel using `data-edge`.
2. Persist `{ edge, offset }` with `serializeRailDock` / `readRailDockFromStorage`.
3. Drag handle = `.ds-floating-panel-drag` when `title` is set (toolbar may omit title).
4. No product routing, no domain nodes, no agent APIs.

### Accessibility

- Root has `aria-label` from `ariaLabel` or `title`.
- Drag handle is presentational; focusable controls live in `children`.

## Acceptance

1. Storybook: solid panel, toolbar, strip, glass opt-in.
2. Unit tests: renders children; applies `data-surface` / `data-variant`; persists dock when SnapDock fires (mockable).
3. Consuming apps import `FloatingPanel` from `@msqdx/ui` — no parallel SnapDock wrappers for the same chrome.
4. Default visual language scores **Fit** on magazine character challenge (no glass/pill by default).
