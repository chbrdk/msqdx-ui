# MSQDX UI — Flyout

**Status:** Accepted — 2026-07-30  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Flyout.tsx` · CSS `.ds-flyout` / `.ds-flyover`  
**Knowledge:** `knowledge/components/flyout.md`

## Purpose

Reusable icon-triggered flyover for topbar / tool chrome (share, history, moodboard, filters). Anchored panel under the trigger — **not** a modal Drawer/Sheet and **not** a page-level scrim.

## API

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Trigger `aria-label` + dialog `aria-label` |
| `icon` | `ReactNode` | Passed to ghost `Button` |
| `resetKey` | `string \| null` | Optional; closes when key changes |
| `triggerClassName` | `string` | Product chrome (e.g. topbar icon sizing) |
| `panelClassName` | `string` | Product content width variants |
| `disabled` | `boolean` | Disables trigger |
| `children` | `(ctx: { close }) => ReactNode` | Panel body |

Hook: `useFlyout(resetKey?)` → `{ open, setOpen, rootRef, toggle }`.

## States

- Closed: trigger only
- Open: `.ds-flyover` with `role="dialog"`; trigger `aria-expanded`
- Active trigger: `.is-active` on ghost button when open

## Accessibility

- Escape closes
- Outside `mousedown` closes
- Trigger exposes `aria-controls` → panel id
- No focus trap (lightweight popover pattern; Dialog remains for true modals)

## Visual

| Part | Treatment |
|------|-----------|
| Root | `.ds-flyout` relative anchor |
| Panel | `.ds-flyover` frosted: translucent surface + `backdrop-filter: blur(16px)` |
| Motion | `.ds-motion-reveal`; `prefers-reduced-motion` drops blur + uses solid surface |
| Overlay | **None** — panel blur only |

## Non-goals

- Full-page `.chat-overlay-backdrop` / modal scrim
- Domain fetch / share URL / conversation list (product compositions)
- Drawer/Sheet (explicit DS non-goal)

## Acceptance

1. Storybook Default story opens frosted panel. ✅  
2. Vitest: open, Escape, resetKey. ✅  
3. Consuming apps import `Flyout` / `useFlyout` from `@msqdx/ui`. ✅  
4. Icons for common chat actions: `IconShare`, `IconHistory`, `IconMoodboard`, `IconMic`, `IconVideo`. ✅  
