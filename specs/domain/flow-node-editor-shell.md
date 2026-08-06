# FlowNodeEditorShell

**Status:** Wave 21 (Collection Flow n8n node editor)  
**Layer:** Organism  
**Consumers:** Plexon `CollectionFlowNodeInspector`, later Audion journey boards

## Purpose

Fullscreen (near full-bleed) overlay for editing a single flow node in three columns — n8n parity:

| Column | Role |
|--------|------|
| **INPUT** | Upstream graph context + pick paths into params |
| **Parameters** | All node configuration fields |
| **OUTPUT** | This node's run output / execution preview |

Canvas cards stay compact; this shell opens on node selection.

## API

```tsx
<FlowNodeEditorShell
  open
  onClose={() => {}}
  kind="compare"
  kindLabel="Compare"
  title="Score check"
  nodeId="n-compare-1"
  runState="idle"
  input={<… />}
  params={<… />}
  output={<… />}
/>
```

- `open` — mount + show overlay; `false` renders null
- `onClose` — backdrop click, × button, Escape
- `input` / `params` / `output` — column slots (app-owned domain UI)
- Header chrome matches `FlowInspectorShell` kind colors

## Layout

- Fixed overlay above flow board (`z-index` above FloatingPanel docks)
- Sheet ~96vw × ~92vh, centered, scrim dims canvas
- Three equal columns on `min-width: 900px`; stack vertically on narrow viewports
- Column bodies scroll independently

## Non-goals

- No xyflow dependency
- No expression runtime — apps use `ExpressionField` + `JsonTree`
