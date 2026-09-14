# MSQDX UI — ExpressionField

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `ExpressionField`  
**Related:** [`msqdx-ui-json-tree.md`](./msqdx-ui-json-tree.md) · Field / Input · Select

## Purpose

Text field for **path or `{{ expression }}`** parameters on flow boards (n8n-like). Apps resolve expressions; this primitive only edits and focuses.

## API

```ts
type ExpressionSuggestion = { value: string; label: string }

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
  /** Insert a path dragged from SchemaTree (defaults to `{{ path }}`). */
  onDropPath?: (path: string) => void
  /**
   * Optional flat pick list (chevron). Picking calls `onChange(option.value)`.
   * No typeahead / fuzzy search in v1.
   */
  suggestions?: ExpressionSuggestion[]
}
```

## Behaviour

- Controlled `value` / `onChange`
- Monospace-friendly input class for expressions
- `onFocusField` when focused
- Accepts SchemaTree drag-drop (`onDropPath` or default `{{ path }}`)
- When `suggestions` is non-empty and not disabled: chevron opens a portaled listbox; pick sets `onChange(suggestion.value)` (same path strings as drop/type)

## Visual

- `.ds-expression-field`, `.ds-expression-field-label`, `.ds-expression-field-input`, `.ds-expression-field-hint`
- Complete `{{ … }}` segments render as inline **chips** in a mirror layer; input text is transparent over chips with visible caret
- Field background gets a light accent tint when expressions are present
- Suggestions: `.ds-expression-field-input-wrap--has-suggestions`, `.ds-expression-field-pick`, menu reuses `.ds-select-menu` / `.ds-select-option`
- Reuse Field/Input spacing tokens

## Non-goals

- Expression evaluation
- Typeahead / fuzzy search filtering of suggestions (v1 = flat pick list)
