# MSQ DX — EasingCurveEditor

**Status:** Accepted — 2026-08-28  
**Implements:** `packages/ui/src/components/EasingCurveEditor.tsx` · `packages/ui/src/lib/easing-curve.ts`  
**Consumer:** Brandion token studio (`motion.easing` digital channel)

## Goals

Interactive editor for CSS `cubic-bezier(x1,y1,x2,y2)` strings: SVG curve, draggable control points, four numeric fields.

## API

```tsx
<EasingCurveEditor
  value="cubic-bezier(0.4, 0, 0.2, 1)"
  onChange={setEasing}
  labels={{ x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2' }}
  enableCustomLabel="Use custom cubic-bezier"
  size="md"
/>
```

## Non-goals

- Keyword easings (`ease-in-out`) — consumer keeps preset Select; editor offers switch-to-bezier only.
- Animation preview travel dot (Brandion `MotionEasingPreview` stays app-local).
