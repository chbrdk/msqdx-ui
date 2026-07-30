# MSQ DX UI forms edit wave (2026-07-29)

Shipped for AUDION v3 persona/TG editors (also consumed by ECHON via `@msqdx/ui/styles.css`):

- `Field` — `error` / `invalid` + `aria-invalid` / `aria-describedby` / `role="alert"`
- `TagInput` — Enter/comma add, chip dismiss, Backspace remove
- `ConfirmDialog` — confirm/cancel on `Dialog`
- Shared control face in `packages/ui/src/css/field.css` (accent labels, light frame + firm bottom rule, no focus glow)

Spec: `specs/domain/msqdx-ui-forms.md` · `specs/domain/msqdx-ui-field.md` · `specs/domain/msqdx-ui-extended.md`  
Knowledge: `knowledge/msqdx-ui-field.md`  
Tests: `packages/ui/src/components/Field.test.tsx`  
Pilot: AUDION `audion-edit-dialog` · ECHON filters/search
