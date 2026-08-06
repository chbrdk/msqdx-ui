# MSQDX UI — SchemaTree

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `SchemaTree`  
**Related:** [`msqdx-ui-json-tree.md`](./msqdx-ui-json-tree.md) · [`msqdx-ui-expression-field.md`](./msqdx-ui-expression-field.md)

## Purpose

Nested **output/input schema** browser for flow node editors (n8n-like). Shows object shape, field types, and optional run values. Apps supply the tree; click inserts `path` into ExpressionField.

## API

```ts
type SchemaFieldType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any'

type SchemaTreeNode = {
  id: string
  key: string
  path: string
  type: SchemaFieldType
  value?: string
  schema?: boolean
  children?: SchemaTreeNode[]
}

type SchemaTreeProps = {
  root: SchemaTreeNode | SchemaTreeNode[]
  onSelectPath?: (path: string) => void
  emptyLabel?: string
  className?: string
}
```

## Behaviour

- Objects/arrays collapsible; leaves and objects clickable when `onSelectPath` set
- Type badge per node; run `value` when present (schema-only nodes show type only)
- `schema: true` → muted “Schema” styling until a run value arrives

## Non-goals

- JSON editing, validation, or expression wrapping
