# MSQDX UI — FieldWell

**Status:** Accepted — 2026-09-30  
**Layer:** Molecules  
**Consumers:** Dashboard / chart builders (visual binding inspector)  
**Related:** [`msqdx-ui-expression-field.md`](./msqdx-ui-expression-field.md) · [`msqdx-ui-inspect-section.md`](./msqdx-ui-inspect-section.md) · [`msqdx-ui-property-inspector.md`](./msqdx-ui-property-inspector.md)

## Purpose

Power-BI-style **binding slot** chrome for compose inspectors: a short **role** label (Value, Category, Dataset — app i18n), optional hint, empty vs bound affordance, and a drop-friendly body that wraps `ExpressionField` or other controls.

Domain-free: no KPI/dataset types, no eval, no drag protocol — apps own drop handlers and path strings.

## Non-goals

- Chart rendering, formula engine, or SchemaTree wiring
- Replacing `ExpressionField` (well body composes it)
- Metron-specific widget kinds or well taxonomies

## API

### `FieldWell`

| Prop | Notes |
|------|--------|
| `role` | Short slot label (e.g. Value, Category) |
| `hint` | Optional helper under the control |
| `bound` | When false, empty-well styling; when true, bound styling (visual only) |
| `dropActive` | Highlight while a drag is over this slot (app-driven) |
| `children` | Bind control — typically `ExpressionField` **without** its own `label` |
| `className` | Optional |

Root: `<div class="ds-field-well">` with `data-bound`, `data-drop-active` for tests.

### `FieldWellStack`

Vertical stack for multiple wells inside an inspect section (`gap` + full width). Replaces ad-hoc app classes like `.metron-dash-mag__fields`.

| Prop | Notes |
|------|--------|
| `children` | `FieldWell` rows and other full-width fields |
| `className` | Optional |

## Density

- Role label uses inspect accent uppercase (`--accent`, ~0.6875rem).
- Body stretches nested `.ds-expression-field` / `.ds-field` to full width.
- Inside `.ds-inspect-density`, wells inherit calm transparent underline inputs (same as magazine inspect).

## Accessibility

- `role` is exposed as a visible label; bind control must retain its own input `aria-label` or associated label when not using `ExpressionField`.
- `dropActive` is decorative; drop targets remain on the app / `ExpressionField` handlers.

## Acceptance

1. Storybook: empty + bound wells with `ExpressionField`, stacked chart bind trio, drop-active state.
2. Unit tests: role text, `data-bound`, stack class.
3. Consuming apps import `FieldWell` and `FieldWellStack` from `@msqdx/ui`.
