# MSQ DX — BreakpointEditor

**Status:** Accepted — 2026-08-28  
**Implements:** `packages/ui/src/components/BreakpointEditor.tsx` · `packages/ui/src/lib/breakpoint-editor.ts`  
**Consumer:** Brandion token studio (`layout.breakpoint` per channel)

## Goals

Interactive editor for layout breakpoint `minWidth`: device-track mock with draggable width, sm/md/lg/xl (or print A5/A4) presets, synced text field.

## API

```tsx
<BreakpointEditor
  channel="digital"
  value="768px"
  onChange={setMinWidth}
  labels={{ minWidth: 'Min width' }}
  size="md"
/>
```

## Non-goals (LE-2)

- Linking breakpoint tokens to grid tokens (LE-4).
- Multiple fields per breakpoint (contract is `minWidth` only).
