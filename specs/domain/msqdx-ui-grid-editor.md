# MSQ DX — GridEditor

**Status:** Accepted — 2026-08-28  
**Implements:** `packages/ui/src/components/GridEditor.tsx` · `packages/ui/src/lib/grid-editor.ts`  
**Consumer:** Brandion token studio (`layout.grid` per channel)

## Goals

Interactive editor for layout grid metrics: column count (presets + stepper), live column mock, draggable margin / gutter / max-width handles, synced numeric fields.

## Metrics shape

```ts
type GridEditorMetrics = {
  columns?: number
  gutter?: string
  margin?: string
  maxWidth?: string
}
```

Lengths are opaque CSS/print strings (`1.5rem`, `1200px`, `5mm`) — the editor preserves unit family when dragging (rem vs px · mm for print).

## API

```tsx
<GridEditor
  channel="digital"
  value={{ columns: 12, gutter: '1.5rem', margin: '1rem', maxWidth: '1200px' }}
  onChange={setMetrics}
  labels={{ columns: 'Columns', gutter: 'Gutter', margin: 'Margin', maxWidth: 'Max width' }}
  columnPresets={[4, 8, 12, 16]}
  size="md"
/>
```

## Non-goals (LE-1)

- Breakpoint-responsive grids inside one token (separate `layout.grid.*` paths).
- TokenPicker links to `spacing.*` (LE-4).
- Print/digital channel switch (consumer passes `channel` + patches one channel slice).
