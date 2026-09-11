# MSQ DX v2 — Extended primitives (complete the DS bar)

**Status:** Accepted — 2026-07-28 · Amended 2026-07-29 (`ConfirmDialog`) · Amended 2026-09-11 (`Dialog` quiet programmatic close)  
**ADR:** 0028 §20  
**Knowledge:** `knowledge/msqdx-ui-completeness.md` · `knowledge/dialog-showmodal-lifecycle.md`  
**Implements:** Divider, Checkbox, Switch, Tabs, Skeleton, Spinner, Tooltip, Dialog, ConfirmDialog under `packages/ui/src/components/` · CSS `css/extended.css` (+ forms in `field.css`)

## Goals

1. Close the remaining **design-system** bar (not Chat/page chrome).
2. Form extras + overlay/feedback primitives with tokens, Storybook, tests.
3. Cut over leftover `.module-panel` / `.ghost-btn` consumers to `<Panel>` / `<Button>`.

## Non-goals

- Chat sheet migrate (separate `msqdx-ui-chat-chrome.md`) — done separately.
- Full rem-audit of every viz CSS file.
- TanStack / virtualized tables (see lean `DataTable` in `msqdx-ui-feedback-data.md`).

## Primitive map

| Component | Notes |
|-----------|--------|
| `Divider` | horizontal/vertical hairline `--line` |
| `Checkbox` | native input + label face |
| `Switch` | boolean toggle (button role=switch) |
| `Tabs` | tablist + panels (controlled) |
| `Skeleton` | pulse placeholder (honors reduced-motion) |
| `Spinner` | compact busy indicator |
| `Tooltip` | hover/focus tip; portal + fixed placement (tight above, flip below only when needed); sentence case |
| `Dialog` | native `<dialog>` modal shell · effect cleanup MUST `close()` to clear top-layer, but MUST NOT call host `onClose` for that programmatic close (Strict Mode / conditional mount race) |
| `ConfirmDialog` | Dialog + cancel/confirm actions · `msqdx-ui-forms.md` |
| `Avatar` / `Toast` / `DataTable` | Wave E — `msqdx-ui-feedback-data.md` |

## Acceptance

1. Exported from `design-system/index.ts`.
2. Storybook Foundation or Extended stories + unit tests.
3. Overview + TagGraph + remaining module panels use `<Panel>`; TagGraph clear-focus uses `<Button>`.
4. Completeness checklist marks extended bar **done**; Toast/Table/Avatar shipped in Wave E.
