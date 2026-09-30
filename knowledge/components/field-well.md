# FieldWell

Molecules primitive for dashboard / chart builder **bind wells** (Value, Category, Dataset slots).

## Usage

- Wrap `ExpressionField` (no duplicate label) in `FieldWell` + stack with `FieldWellStack`.
- Use inside `FlowInspectorShell` / `PropertyInspector` with optional `ds-inspect-density` on the host.

## Related

`specs/domain/msqdx-ui-field-well.md` · `ExpressionField` · METRON `specs/domain/dashboard-field-wells.md`

## Follow-up

- METRON: replace `.metron-dash-mag__fields` + duplicate inspect width CSS with `FieldWellStack` when consuming `@msqdx/ui` export is bumped.
