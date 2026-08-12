# BreakpointSwitcher

Molecule for composition-editor preview width chrome (mobile / tablet / desktop).

## Consumer mapping (creation-v3)

```ts
import { BreakpointSwitcher, type EditorBreakpoint } from '@msqdx/ui'

const WIDTH: Record<EditorBreakpoint, number> = {
  mobile: 390,
  tablet: 768,
  desktop: 1280,
}

const [bp, setBp] = useState<EditorBreakpoint>('desktop')

<>
  <BreakpointSwitcher value={bp} onChange={setBp} />
  <CanvasViewport style={{ maxWidth: WIDTH[bp] }}>…</CanvasViewport>
</>
```

Labels default to Mobile / Tablet / Desktop; override via `labels` or subset via `options`.

## Spec

`specs/domain/msqdx-ui-breakpoint-switcher.md`
