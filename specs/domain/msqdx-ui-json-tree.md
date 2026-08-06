# MSQDX UI — JsonTree

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `JsonTree`  
**Related:** [`msqdx-ui-expression-field.md`](./msqdx-ui-expression-field.md) · flow board chrome

## Purpose

Browse flat JSON path/value leaves (e.g. run context outputs) and **select a path** for insertion into an expression field. Apps own the data; this package owns the list chrome.

## API

```ts
type JsonTreeItem = {
  path: string
  value: string
}

type JsonTreeProps = {
  items: JsonTreeItem[]
  onSelectPath?: (path: string) => void
  emptyLabel?: string
  className?: string
}
```

## Behaviour

- Click / Enter on a row calls `onSelectPath(path)` when provided
- Empty `items` → show `emptyLabel`
- Paths may include array indices (`scan.issues.items[0].ruleId`)

## Visual

- Classes: `.ds-json-tree`, `.ds-json-tree-row`, `.ds-json-tree-path`, `.ds-json-tree-value`
- Magazine surface language (paper/line) — no glow

## Non-goals

- Live JSON editing
- Schema validation
- Built-in expression wrapping (app / ExpressionField)
