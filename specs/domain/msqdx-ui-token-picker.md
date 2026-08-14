# MSQDX UI — TokenPicker

**Status:** Accepted (inspect density) — 2026-08-12 · **P77 browser** — 2026-08-14  
**Layer:** Molecules (catalogued under Organisms for editor chrome grouping)  
**Consumers:** CREATION `/editor` token-bound inspect fields  
**Related:** `msqdx-ui-property-inspector.md` · `msqdx-ui-inspect-section.md` · `msqdx-ui-swatch-strip.md` · Zaoly Spec 5 S-5 / R115 / R118

## Purpose

Compact control to **bind a property to a token path**. Values are **token paths only** — never free CSS literals. Optional preview shows resolved color / length / type for display; selection always writes `path`.

**P77:** Optional **browser** mode opens a floating multi-context window (search, scopes, Recent, drag header, kind-aware previews, keyboard) instead of a flat option strip.

## Non-goals

- Editing token definitions / DTCG trees.
- Typing raw `#hex`, `px`, or CSS strings into the value.
- Propose / create library tokens from the picker (app Tokens tab / Brandion).
- Full Variables left-rail panel.

## API

| Prop | Notes |
|------|--------|
| `options` | `{ path, label?, preview?, category?, … }[]` — `path` is the value; full catalog when browser scopes need All |
| `value` | Selected path or `null` |
| `onChange` | `(path: string) => void` — always a token path |
| `onClear` | Optional clear affordance; called when user clears binding |
| `clearLabel` | Accessible label for clear control (default `Clear`) |
| `allowNone` | When true, list includes a none/empty option that calls `onClear` |
| `noneLabel` | Label for the none **list** option (default `None`) — not the empty strip |
| `emptyLabel` | Current-strip placeholder when unbound (default `—`) |
| `allowCycle` | When true, show −/+ on the current strip to step prev/next through **cycle options** (suggested or filtered list) |
| `prevLabel` / `nextLabel` | Accessible cycle labels |
| `label` | Field label above the control |
| `icon` | Optional 16px glyph beside the label |
| `variant` | `compact` (default): popover. `list`: always-open dense list. |
| `browser` | When true with `compact`: portal popover with search, scopes, drag header, keyboard (P77) |
| `scopes` | `{ id: string; label: string }[]` — e.g. Suggested / Spacing / All |
| `scope` / `onScopeChange` | Controlled scope tab (`suggested` filters via `suggestedPaths`) |
| `suggestedPaths` | Paths shown under Suggested scope |
| `recentPaths` / `onRecentPathsChange` | Session recent; app owns storage |
| `contextTitle` | Popover header (e.g. `Binding for: Desktop`) |
| `previewKind` | `color` \| `space` \| `radius` \| `opacity` \| `type` \| `size` \| `shadow` \| `auto` |
| `searchPlaceholder` | Search field placeholder (default `Search tokens`) |
| `aria-label` | Default `Token picker` |

### Option shape

```ts
type TokenPickerOption = {
  path: string
  label?: string
  /** Scope / category id for filtering (e.g. color, space, radius). */
  category?: string
  /** Display-only CSS color or length for previews; not written as the value. */
  preview?: string
  fontPreview?: string
  sampleStyle?: { fontFamily?: string; fontSize?: string; fontWeight?: string }
}
```

### TokenPreview (molecule)

Kind-aware chip used inside browser options / strip: color swatch, spacing bar, radius chip, opacity checker, type “Ag”, size box, shadow chip. Display-only.

## Anatomy / density

1. **Label** row (quiet meta).
2. **Current value** strip: optional preview + **option label** (or path) when bound, else `emptyLabel`; optional −/+ cycle (`allowCycle`) + optional clear. Cycle and clear MAY hide until hover.
3. **Option surface**
   - **compact (default, `browser=false`):** flat list popover from the strip.
   - **compact + `browser`:** portaled floating panel — header (grip + `contextTitle`), search, scope tabs, Recent chip row, list **or** color swatch grid when `previewKind === 'color'`. Header is pointer-draggable; Escape closes; Arrow/Enter navigate/select.
   - **list:** always visible under the strip (Storybook / debug).

### Cycle behaviour (`allowCycle`)

- Cycle order is the **suggested** list when `suggestedPaths` is set, else `options` filtered to the active scope (paths only).
- Cycle MUST call `onChange(path)` / `onClear()` — never invent CSS literals.

### Browser filter behaviour

- Search matches `path` and `label` (case-insensitive).
- Scope `suggested` → paths in `suggestedPaths` (fallback: all `options` if unset).
- Scope matching a `category` → `option.category === scope`.
- Scope `all` → all `options`.
- Recent: picking a path prepends it via `onRecentPathsChange`; Recent chips pick without leaving browser.

## Rules

- `onChange` MUST only emit `option.path` strings present in `options`.
- Clear MUST go through `onClear` (not `onChange('')`).
- No free-text input for CSS.
- Browser search filters display only — does not invent paths.

## Accessibility

- Listbox + `role="option"` / `aria-selected`.
- Scope tabs: `role="tablist"` / `tab`.
- Clear control is a button with `clearLabel`.
- Keyboard (browser): ArrowUp/Down highlight, Enter select, Escape close.

## Acceptance

1. Stories: Default, WithClear, AllowNone, DenseList, WithCycle, FontFamily, **Browser**, **BrowserColorGrid**.
2. Tests: select path; clear; none; cycle; compact popover; browser search/scope/pick; color grid; keyboard; drag header present; empty strip shows `emptyLabel`.
3. Consuming apps import `TokenPicker` / `TokenPreview` from `@msqdx/ui`.
