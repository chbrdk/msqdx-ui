# MSQDX UI — ExpressionField

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `ExpressionField`  
**Related:** [`msqdx-ui-json-tree.md`](./msqdx-ui-json-tree.md) · Field / Input

## Purpose

Text field for **path or `{{ expression }}`** parameters on flow boards (n8n-like). Apps resolve expressions; this primitive only edits and focuses.

## API

```ts
type ExpressionFieldProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  disabled?: boolean
  className?: string
  /** Called when the field receives focus (for JsonTree insert target). */
  onFocusField?: () => void
}
```

## Behaviour

- Controlled `value` / `onChange`
- Monospace-friendly input class for expressions
- `onFocusField` when focused

## Visual

- `.ds-expression-field`, `.ds-expression-field-label`, `.ds-expression-field-input`, `.ds-expression-field-hint`
- Reuse Field/Input spacing tokens

## Non-goals

- Expression evaluation / syntax highlighting
- Autocomplete dropdown (apps may add later)
