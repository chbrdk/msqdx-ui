# MSQDX UI — TokenPicker

**Status:** Accepted (inspect density) — 2026-08-12 · **P77 browser** — 2026-08-14 · **allowLiteral hybrid** — 2026-08-20 · **color editor** — 2026-08-21  
**Layer:** Molecules (catalogued under Organisms for editor chrome grouping)  
**Consumers:** CREATION `/editor` token-bound inspect fields  
**Related:** `msqdx-ui-property-inspector.md` · `msqdx-ui-inspect-section.md` · `msqdx-ui-swatch-strip.md` · `msqdx-ui-color-picker.md` · Zaoly Spec 5 S-5 / R115 / R118

## Purpose

Compact control to **bind a property to a token path**. Default mode: values are **token paths only**. Optional preview shows resolved color / length / type for display; selection always writes `path`.

**P77:** Optional **browser** mode opens a floating multi-context window (search, scopes, Recent, drag header, kind-aware previews, keyboard) instead of a flat option strip.

**allowLiteral (hybrid):** Optional Penpot-style strip where the same control accepts a freeform literal via `onLiteralChange` **or** a token path via `onChange`. The picker never stores Brandion/CSS itself — the app maps callbacks (`set_prop` + clear binding vs `set_token_binding`).

**Literal commit (2026-08-21):** WENN `allowLiteral`, DANN MUST typing keep a **local draft** while the strip input is focused and MUST call `onLiteralChange` on **blur** (and Enter → blur). Color-editor / swatch picks MAY call `onLiteralChange` immediately. Token path picks still call `onChange` immediately.

## Non-goals

- Editing token definitions / DTCG trees.
- Free CSS entry when `allowLiteral` is false (default).
- Propose / create library tokens from the picker (app Tokens tab / Brandion).
- Full Variables left-rail panel.

## API

| Prop | Notes |
|------|--------|
| `options` | `{ path, label?, valueLabel?, preview?, category?, … }[]` — `path` is the value; full catalog when browser scopes need All |
| `value` | Selected path or `null` |
| `onChange` | `(path: string) => void` — always a token path |
| `onClear` | Optional clear affordance; called when user clears binding (and literal when hybrid) |
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
| `allowLiteral` | When true: strip value is an editable input; typing calls `onLiteralChange` |
| `literalValue` | App-owned freeform string when no token `value` is set |
| `onLiteralChange` | `(raw: string) => void` — app writes literal / clears binding; for strip typing, fired on **blur** (local draft while focused) |
| `literalPlaceholder` | Input placeholder when unbound (default `emptyLabel` / `—`) |
| `literalReadOnly` | When true, literal input is read-only (e.g. mixed multi-select) |
| `literalTestId` | Optional `data-testid` on the literal input |
| `emptyQueryCap` | When search is empty, cap visible options (large catalogs); typing shows full filter |
| `browserPortalTarget` | Optional portal mount for browser mode. Default: nearest `<dialog>` ancestor, else `document.body` (keeps browser above native modal top layer). |
| `onPromoteLiteral` | Optional Plus control when unbound literal is set (app owns Brandion create/bind) |
| `promoteLiteralLabel` | Accessible label for promote (default `Save as token`) |

### Color editor (hybrid + `previewKind === 'color'`)

WENN `allowLiteral` AND `previewKind === 'color'` AND `browser`, DANN MUST the floating browser be a **combined panel**: left = `ColorPicker` body (HSV · formats · alpha · eyedropper), right = token search/scopes/list. Default size MUST be larger than the token-only browser (≈560×420; still resizable).

WENN the designer activates the **color swatch** OR the **token browse** control, DANN MUST the same combined browser open (one dialog).

WENN the designer picks a color, DANN MUSS TokenPicker call `onLiteralChange` with normalized `#rrggbb` / `#rrggbbaa` (app clears token binding). Token row pick still calls `onChange(path)`.

WENN `browser` is false, DANN MAY the strip keep a standalone ColorPicker popover from the swatch.

Swatch fill: bound token `preview` when `value` is set; else `literalValue` when it parses as hex; else empty.

### Option shape

```ts
type TokenPickerOption = {
  path: string
  label?: string
  /** Resolved display value for browser columns; strip shows `valueLabel · label`. */
  valueLabel?: string
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
2. **Current value** strip:
   - **Default (`allowLiteral=false`):** optional preview + **option label** (or path) when bound, else `emptyLabel`; whole strip opens the option surface.
   - **Hybrid (`allowLiteral`):** optional preview / browse control opens the option surface; an editable `<input>` shows token label when `value` is set, else `literalValue` / placeholder. Focus on a bound token selects all so the first keystroke replaces via `onLiteralChange`. Optional −/+ cycle (`allowCycle`) + optional clear. Cycle and clear MAY hide until hover.
   - **Hybrid + color + browser:** one combined floating panel (color editor | token list); swatch and browse both open it.
3. **Option surface**
   - **compact (default, `browser=false`):** flat list popover from the strip.
   - **compact + `browser`:** portaled floating panel — header (grip + `contextTitle`), search, scope tabs, Recent chip row, then a **columnar list** for every scope/kind (preview · `valueLabel` · name). Panel size is fixed across scopes (default 300×380; resizable via E/S/SE; clamps ~240–720); list body scrolls inside (`flex: 1 1 0`). Header is pointer-draggable; Escape closes; Arrow/Enter navigate/select.
   - **list:** always visible under the strip (Storybook / debug).

### Cycle behaviour (`allowCycle`)

- Cycle order is the **suggested** list when `suggestedPaths` is set, else `options` filtered to the active scope (paths only).
- Cycle MUST call `onChange(path)` / `onClear()` — never invent CSS literals.

### Browser filter behaviour

- Search matches `path`, `label`, and `valueLabel` (case-insensitive).
- Scope `suggested` → paths in `suggestedPaths` (fallback: all `options` if unset).
- Scope matching a `category` → `option.category === scope`.
- Scope `all` → all `options`.
- Recent: picking a path prepends it via `onRecentPathsChange`; Recent chips pick without leaving browser.

## Rules

- `onChange` MUST only emit `option.path` strings present in `options`.
- Clear MUST go through `onClear` (not `onChange('')`).
- Free-text CSS only when `allowLiteral` — via `onLiteralChange`, never as a fake token path.
- Browser search filters display only — does not invent paths.

## Accessibility

- Listbox + `role="option"` / `aria-selected`.
- Scope tabs: `role="tablist"` / `tab`.
- Clear control is a button with `clearLabel`.
- Hybrid browse control: button labelled `{label} token` (opens browser); literal input uses `aria-label={label}`.
- Keyboard (browser): ArrowUp/Down highlight, Enter select, Escape close.

## Acceptance

1. Stories: Default, WithClear, AllowNone, DenseList, WithCycle, FontFamily, **Browser**, **BrowserColorList**, **WithLiteral**.
2. Tests: select path; clear; none; cycle; compact popover; browser search/scope/pick; color columnar list; keyboard; drag header present; empty strip shows `emptyLabel`; with `allowLiteral`: typing fires `onLiteralChange`, pick still fires `onChange`, default mode still has no free-text input.
3. Consuming apps import `TokenPicker` / `TokenPreview` from `@msqdx/ui`.
