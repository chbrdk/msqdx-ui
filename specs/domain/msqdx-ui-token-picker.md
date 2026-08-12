# MSQDX UI — TokenPicker

**Status:** Accepted (inspect density) — 2026-08-12  
**Layer:** Molecules (catalogued under Organisms for editor chrome grouping)  
**Consumers:** CREATION `/editor` token-bound inspect fields  
**Related:** `msqdx-ui-property-inspector.md` · `msqdx-ui-inspect-section.md` · `msqdx-ui-swatch-strip.md`

## Purpose

Compact control to **bind a property to a token path**. Values are **token paths only** — never free CSS literals. Optional swatch preview shows resolved color for display; selection always writes `path`.

## Non-goals

- Editing token definitions / DTCG trees.
- Typing raw `#hex`, `px`, or CSS strings into the value.
- Full token browser / search (app may filter `options` before pass-in).

## API

| Prop | Notes |
|------|--------|
| `options` | `{ path, label?, preview? }[]` — `path` is the value |
| `value` | Selected path or `null` |
| `onChange` | `(path: string) => void` — always a token path |
| `onClear` | Optional clear affordance; called when user clears binding |
| `clearLabel` | Accessible label for clear control (default `Clear`) |
| `allowNone` | When true, list includes a none/empty option that calls `onClear` (or `onChange` is not used for empty) |
| `noneLabel` | Label for none option (default `None`) |
| `label` | Field label above the control |
| `aria-label` | Default `Token picker` |

### Option shape

```ts
type TokenPickerOption = {
  path: string
  label?: string
  /** Display-only CSS color for swatch; not written as the value. */
  preview?: string
}
```

## Anatomy / density

1. **Label** row (quiet meta).
2. **Current value** strip: optional swatch + mono token path (or none placeholder) + optional clear button when `onClear` and value set.
3. **Dense option list** (`role="listbox"`): swatch (if `preview`) + path/label; selected state outlined.

## Rules

- `onChange` MUST only emit `option.path` strings from `options`.
- Clear MUST go through `onClear` (not `onChange('')`) so apps can map to `clear_token_binding`.
- No free-text input for CSS.

## Accessibility

- Listbox + `role="option"` / `aria-selected`.
- Clear control is a button with `clearLabel`.
- None option is a selectable option when `allowNone`.

## Acceptance

1. Stories: Default, WithClear, AllowNone, DenseList.
2. Tests: select path; clear calls `onClear`; none option; no raw CSS field.
3. Consuming apps import `TokenPicker` from `@msqdx/ui`.
