# MSQDX UI — Flow board chrome

**Status:** Accepted  
**Layer:** Organisms  
**Contracts:** `@msqdx/ui` — `FlowBoardStage`, `FlowBoardToolbar`, `FlowBoardPalette`, `FlowNodeCard`, `FlowInspectorShell`, `FlowRunStrip`  
**Related:** [`floating-panel.md`](./floating-panel.md) · Audion Phase 8 (`ux-test-flow-model.md`) · Plexon Collection Test Flow

## Purpose

Shared **magazine immersive board chrome** for UX / Collection flow workspaces. Visual SoT for Audion `/studies/flows/[flowId]` and Plexon `/projects/[id]/flows/[flowId]` so both boards share one look.

Domain (graph model, agent poll, Soft-Q, Checkion gates, Collection verdict) stays in consuming apps. This package is chrome + slots only.

## Class / token contract

| Prefix | Use |
|--------|-----|
| `.msqdx-flow-*` | All board chrome CSS in `@msqdx/ui` |
| `body.msqdx-flow-board-active` | Immersive body lock while board is mounted |

Apps **must not** ship parallel `.audion-flow-*` / `.plexon-flow-*` board chrome once adopted. Thin app wrappers may add product-only class hooks, not a second node/dock visual language.

Magazine board float chrome (toolbar / inspector / strip / FAB):

| Rule | Value |
|------|-------|
| Float radius | `12px` on `.ds-floating-panel-inner` (rounded outer shell) |
| Palette FAB | pill (`999px`), ~3.5rem |
| Surface | solid `--paper` / `--surface`, hairline `--line` |
| Shadow | soft lift on floats (not flat magazine zero) |
| Stage | `position: fixed; inset: 0` full `100vw` / `100dvh` while `body.msqdx-flow-board-active` |

## Primitives

### `FlowBoardStage`

Immersive full-bleed shell. Optional `active` toggles `body.msqdx-flow-board-active`.

```ts
type FlowBoardStageProps = {
  children: ReactNode
  /** RF / canvas viewport (pointer-events auto). */
  viewport?: ReactNode
  /** Floating docks / overlays (pointer-events none on stage; children re-enable). */
  overlays?: ReactNode
  active?: boolean // default true
  className?: string
  alert?: ReactNode
}
```

### `FlowBoardToolbar`

Compact toolbar row inside a `FloatingPanel variant="toolbar"` (app supplies the panel). Grip + actions + trailing slots.

```ts
type FlowBoardToolbarProps = {
  leading?: ReactNode
  children?: ReactNode // primary actions
  trailing?: ReactNode
  dirty?: boolean
  dirtyLabel?: string
  error?: ReactNode
  className?: string
}
```

### `FlowBoardPalette`

Collapsed FAB or open kind list chrome. Kinds are **children** (app maps domain kinds).

```ts
type FlowBoardPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children?: ReactNode // kind buttons when open
  fabLabel?: string
  className?: string
}
```

### `FlowNodeCard`

Magazine RF node chrome. Apps own `@xyflow/react` `Handle` elements via slots — DS does **not** depend on xyflow.

```ts
type FlowNodeRunState = 'idle' | 'active' | 'done' | 'skipped' | 'error'

type FlowNodeCardProps = {
  kind: string
  kindLabel?: string
  nodeId?: string
  selected?: boolean
  runState?: FlowNodeRunState
  runStateB?: FlowNodeRunState
  hasOutput?: boolean
  targetHandle?: ReactNode
  sourceHandles?: ReactNode
  children?: ReactNode // fields
  output?: ReactNode
  footer?: ReactNode // segment / gate actions
  className?: string
}
```

Root classes: `msqdx-flow-rf-node msqdx-flow-rf-node--{kind} msqdx-flow-rf-node--run-{state}`.

### `FlowInspectorShell`

Right-dock inspector layout: head + collapsible sections. Content via slots.

```ts
type FlowInspectorSection = {
  id: string
  title: string
  meta?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

type FlowInspectorShellProps = {
  kind?: string
  kindLabel?: string
  title: string
  nodeId?: string
  runState?: FlowNodeRunState
  badges?: ReactNode
  onClose?: () => void
  sections: FlowInspectorSection[]
  className?: string
}
```

### `FlowRunStrip`

Bottom status band content (inside FloatingPanel strip).

```ts
type FlowRunStripProps = {
  status?: ReactNode
  meta?: ReactNode
  links?: ReactNode
  verdict?: ReactNode
  className?: string
}
```

## Keep / reshape / drop

| | |
|--|--|
| **Keep** | `@xyflow/react` in apps; FloatingPanel dock persistence; domain APIs in apps |
| **Reshape** | Audion `.audion-flow-*` board CSS → `.msqdx-flow-*` in `@msqdx/ui` |
| **Drop** | App-local board chrome forks; glass/pill node chrome; xyflow as DS dependency |

## Acceptance

1. Storybook organisms cover stage, toolbar, palette open/closed, node card states, inspector sections, run strip.
2. Unit tests render slots and apply run-state / kind classnames.
3. Audion and Plexon import chrome from `@msqdx/ui` — no parallel board CSS SoT.
4. Side-by-side boards read as one visual family.
