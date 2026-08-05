# FloatingPanel

Shared dockable overlay for immersive workspaces (AUDION flow board, future canvas tools).

## Usage

```tsx
import { FloatingPanel } from '@msqdx/ui'

<FloatingPanel storageKey="app.board.inspector" defaultEdge="right" title="Inspector">
  …
</FloatingPanel>
```

## Notes

- Default surface is magazine-solid (no blur). Use `surface="glass"` only when intentional.
- Persist keys are product-owned (`paths.flowBoard*DockKey` in Audion).
- Spec: `specs/domain/floating-panel.md`
