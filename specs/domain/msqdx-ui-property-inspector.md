# MSQDX UI — PropertyInspector

**Status:** Accepted (inspect density) — 2026-08-12  
**Layer:** Organisms  
**Consumers:** CREATION `/editor` (`specs/domain/editor-inspect.md`)  
**Related:** `msqdx-ui-inspect-section.md` · `msqdx-ui-token-picker.md` · `msqdx-ui-creation-editor-chrome.md`

## Purpose

Aside chrome for a design-tool property panel at **Penpot-like density**. **Field schema and section grouping live in the consuming app** (contract / catalog driven). This primitive supplies title, empty state, and a compact scroll body. Apps compose children as `InspectSection` blocks (or equivalent), not a flat stub list.

## Non-goals

- Field catalogs, token DTCG parsing, or CREATION scene ops.
- Free raw CSS / `#hex` / `px` text entry (forbidden by consumer inspect model).
- Built-in Design | CSS tab chrome (apps own tabs — see below).

## API

| Prop | Notes |
|------|--------|
| `title` | Panel header (default `Inspector`) |
| `emptyLabel` | Shown when `children` empty / null (default `Select a node`) |
| `children` | App-supplied sections / fields |
| `aria-label` | Default `Property inspector` |

### Design | CSS tabs

Do **not** add a `tabs` prop on this primitive. Compose `InspectTabs` (`msqdx-ui-inspect-tabs.md`) above or around `PropertyInspector` with conditional children (e.g. Design = `InspectSection` stack; CSS = read-only preview). Labels stay props on `InspectTabs`; field catalogs stay in the app.

## Density

- Tight header + body padding (token-spaced).
- Body is a vertical stack with small gaps — sections provide their own chrome.
- Prefer `InspectSection` children over ad-hoc `<h3>` wrappers.

## Accessibility

- Root is `<aside>` with `aria-label`.
- Empty state is plain text (not a live region).

## Acceptance

1. Storybook: empty + with `InspectSection` children.
2. Unit tests cover empty vs children.
3. Consuming apps import `PropertyInspector` from `@msqdx/ui` and own field catalogs.
