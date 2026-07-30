# MSQ DX UI — Forms edit wave (Field errors · TagInput · ConfirmDialog · input face)

**Status:** Accepted — 2026-07-29  
**Implements:** `Field` · `TagInput` · `ConfirmDialog` · shared control chrome in `css/field.css`  
**Related:** `msqdx-ui-field.md` · `msqdx-ui-extended.md` (Dialog)  
**Knowledge:** `knowledge/msqdx-ui-field.md` · `knowledge/forms-edit-wave.md`  
**Pilots:** AUDION edit dialogs · ECHON filters/search (via `@msqdx/ui/styles.css`)

## Goals

1. Field surfaces validation: `error` / `invalid` → `aria-invalid`, `aria-describedby`, `role="alert"`.
2. TagInput: Enter/comma add, chip dismiss, Backspace removes last.
3. ConfirmDialog: confirm + cancel on Dialog.
4. **Shared control face** across Input, Textarea, Select trigger, TagInput:
   - transparent fill
   - light outer border ≈ `color-mix(in srgb, var(--ink) 6%, transparent)`
   - firm bottom rule `1px solid var(--ink)`
   - focus: light accent frame + bottom `var(--accent)` — **no** glow ring
5. **Field labels**: `0.62rem`, uppercase, `color: var(--accent)` (nested `.ds-text-label` inherits).

## Anatomy

| Part | Notes |
|------|--------|
| `.ds-field-label` | accent micro-label |
| `.ds-input` / `.ds-textarea` / `.search-input` | underline-led face |
| `.ds-select-trigger` | same face |
| `.ds-tag-input` | same face; inner field borderless |
| `.ds-field-error` | danger text; empty hidden |

## Non-goals

- Form state managers / Zod bindings
- Drawer/Sheet
- Typeahead combobox

## Acceptance

1. Unit tests: Field error a11y · TagInput add/remove · ConfirmDialog confirm.
2. Storybook: Field WithError · TagInput · ConfirmDialog.
3. Products consuming `@msqdx/ui/styles.css` pick up chrome without app-local border overrides.
4. `Input block` ≠ legacy `.search-input` (pass class explicitly when needed).
