# MSQ DX v2 — Field / Input / Select (product UI)

**Status:** Accepted — 2026-07-28 · Amended 2026-07-29 (underline-led chrome · accent labels · `Input.block` without forced `.search-input`)  
**ADR:** 0028 §15  
**Implements:** `packages/ui/src/components/Field.tsx` · `Input.tsx` · `Select.tsx` · `Textarea.tsx` · `TagInput.tsx` · `css/field.css`  
**Knowledge:** `knowledge/msqdx-ui-field.md`  
**Forms wave:** `specs/domain/msqdx-ui-forms.md`  
**Catalog:** Storybook → Molecules/Field · Molecules/TagInput  
**Pilot:** ECHON Signals/Waves Select · Sources search · AUDION edit dialogs  

## Goals

1. One field chrome for labeled controls: label + control (+ optional hint).
2. **Text inputs** stay native `<input>`. **Dropdowns / filters are custom UI** — never OS/browser `<select>` chrome.
3. Tokens only: light frame + firm bottom rule (`--ink` / `--accent`), label `--accent`, `--type-*`, `--space-*`, `--radius-sm`, `--motion-hover`.
4. Spec → components → CSS → Storybook → pilots → tests.

## Non-goals

- Chat composer (`.chat-input` stays; chat chrome later). Prefer `<Textarea>` for new multiline fields.
- Date / file / searchable combobox (typeahead later if needed).
- Validation library / form state manager.
- Restyle every leftover bare `<input>` in ops/corpus this pass.

## Anatomy

| Part | Class | Tokens |
|------|-------|--------|
| Shell | `.ds-field` | column · gap `--space-1` |
| Label | `.ds-field-label` | body · `0.62rem` · `--accent` · uppercase · track |
| Control input | `.ds-input` | transparent · light frame (~6% ink) · firm bottom `--ink` |
| Select root | `.ds-select` | relative · inline-flex |
| Trigger | `.ds-select-trigger` | same face as input · caret |
| Menu | `.ds-select-menu` | panel surface · border · elevates above chrome |
| Option | `.ds-select-option` | hover/active wash · selected accent |
| Size `sm` (**default**) | compact | filter chrome |
| Size `md` | roomier | denser forms |
| Focus | accent bottom rule (no glow ring) | |

## Select a11y (required)

- Trigger: `role="combobox"` · `aria-haspopup="listbox"` · `aria-expanded` · `aria-controls` · `aria-activedescendant` when open
- Popup: `role="listbox"` · options `role="option"` · `aria-selected`
- Keyboard: Enter/Space/↓ open · ↑/↓ move · Enter/Space choose · Esc close · Home/End
- Pointer: click outside closes; choose closes
- **No** native `<select>` in product filter/form dropdowns

## API

```tsx
<Field label={t('signals.filterStatus')} size="sm" layout="inline">
  <Select
    value={status}
    onChange={setStatus}
    options={STATUSES.map((s) => ({ value: s, label: statusLabel(s) }))}
  />
</Field>

<Input
  size="md"
  block
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder={t('sources.search')}
  aria-label={t('sources.search')}
/>
```

| Prop | Notes |
|------|--------|
| `Field.label` | string or node; wires `htmlFor` → control `id` |
| `Field.layout` | `stack` \| `inline` |
| `Select.options` | `{ value, label, disabled? }[]` |
| `Select.value` / `onChange(value)` | controlled string |
| `Select.size` | **default `sm`** |
| `Input.block` | full width (`ds-input--block`); legacy `.search-input` only via `className` |

## CSS contract

- Public: `.ds-field*`, `.ds-input*`, `.ds-select*`
- Legacy input alias: `.search-input`
- Do **not** style `select` / `.signals-filter-select` as the product control (retired)

## Acceptance

1. Spec + ADR note custom Select (no system dropdown).
2. Signals / Waves use `<Select options={…}>` — zero `<select>` in those filters.
3. Unit tests: open/choose/keyboard/Esc; Field label association to combobox; Field error a11y.
4. Storybook shows custom menu (not OS chrome).
5. Control chrome matches underline-led face (label accent, firm bottom rule, no focus glow).

## Migration

- All product filter dropdowns → `<Select>`.
- Chat / ask-form: later.
- App-local input border overrides should be removed once on `@msqdx/ui` ≥ this amendment.
