# MSQDX UI — InspectTabs

**Status:** Accepted (CREATION E7 chrome) — 2026-08-12  
**Layer:** Molecules  
**Consumers:** creation-v3 `/editor` inspect rail · peers composing Design vs CSS (or equivalent)  
**Related:** `msqdx-ui-property-inspector.md` · `msqdx-ui-inspect-section.md` · `msqdx-ui-creation-editor-chrome.md`

## Purpose

Dense **two-tab (or N-tab) chrome** for the property inspect rail. Labels are **props** — defaults are `Design` / `CSS`, but apps may pass any copy. **Does not** own tab panels: apps render `PropertyInspector` / CSS preview as siblings based on `value`.

## Why separate from PropertyInspector

`PropertyInspector` stays a shell for sections/fields. Tab IA sits above or beside it so field catalogs remain app-owned (`msqdx-ui-property-inspector.md` — no `tabs` prop on the inspector).

## Non-goals

- Embedding panel content (use app children / conditional render).
- Free-form content tabs for marketing pages (use `Tabs`).
- CREATION-specific copy locked into the package.

## API

| Prop | Notes |
|------|--------|
| `value` | Selected tab id |
| `onChange` | `(id: string) => void` |
| `items` | Optional `{ id, label, disabled? }[]` — overrides default Design/CSS pair |
| `designLabel` | Label for default left tab (default `Design`); ignored when `items` set |
| `cssLabel` | Label for default right tab (default `CSS`); ignored when `items` set |
| `designId` | Id for default left tab (default `design`) |
| `cssId` | Id for default right tab (default `css`) |
| `aria-label` | Default `Inspector tabs` |
| `className` | Optional |

## Behaviour

- Controlled only.
- `role="tablist"` / `role="tab"`; selected tab has `aria-selected="true"`.
- No `tabpanel` inside the primitive — apps own panels.

## Accessibility

- Tablist labelled via `aria-label`.
- Unselected tabs use `tabIndex={-1}`; selected uses `0`.

## Acceptance

1. Stories: Default Design/CSS, Custom labels, Custom items.
2. Tests: `onChange` with clicked id; custom labels; default ids `design` / `css`.
3. Apps compose: `<InspectTabs value={…} onChange={…} />` then conditional `PropertyInspector` / CSS pane.
