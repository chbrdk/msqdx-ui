import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FlowBoardStage } from './FlowBoardStage'
import { FlowBoardToolbar } from './FlowBoardToolbar'
import { FlowBoardPalette } from './FlowBoardPalette'
import { FlowNodeCard } from './FlowNodeCard'
import { FlowInspectorShell } from './FlowInspectorShell'
import { FlowRunStrip } from './FlowRunStrip'
import { FloatingPanel } from './FloatingPanel'
import { Button } from './Button'

const meta = {
  title: 'Organisms/FlowBoardStage',
  component: FlowBoardStage,
  tags: ['magazine'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FlowBoardStage>

export default meta
type Story = StoryObj<typeof meta>

function MagazineBoardDemo() {
  const [paletteOpen, setPaletteOpen] = useState(true)
  return (
    <FlowBoardStage
      active={false}
      viewport={
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background:
              'radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--accent,#c4a35a) 12%, transparent), transparent 55%), var(--bg0,#f4f2ee)',
          }}
        >
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FlowNodeCard kind="start" kindLabel="Start" nodeId="n1" runState="done">
              <label className="msqdx-flow-rf-field">
                <span>Name</span>
                <input className="ds-input" defaultValue="Entry" readOnly />
              </label>
            </FlowNodeCard>
            <FlowNodeCard kind="prompt" kindLabel="Prompt" nodeId="n2" runState="active" selected hasOutput>
              <label className="msqdx-flow-rf-field">
                <span>Prompt</span>
                <textarea className="ds-textarea" rows={3} defaultValue="Explore checkout…" readOnly />
              </label>
              <div className="msqdx-flow-rf-output">
                <p className="msqdx-flow-rf-output-label">Output</p>
                <p className="msqdx-flow-rf-output-text">Agent is thinking…</p>
              </div>
            </FlowNodeCard>
            <FlowNodeCard kind="gate" kindLabel="Gate" nodeId="n3" runState="idle">
              <label className="msqdx-flow-rf-field">
                <span>Condition</span>
                <input className="ds-input" defaultValue="manual" readOnly />
              </label>
            </FlowNodeCard>
          </div>
        </div>
      }
      overlays={
        <>
          <FloatingPanel
            storageKey="msqdx.story.flow.toolbar"
            variant="toolbar"
            surface="solid"
            className="msqdx-flow-float-panel msqdx-flow-float-panel--toolbar"
          >
            <FlowBoardToolbar dirty dirtyLabel="dirty">
              <Button type="button" size="sm" variant="ghost" className="msqdx-flow-toolbar-btn">
                Undo
              </Button>
              <Button type="button" size="sm" variant="primary" className="msqdx-flow-toolbar-btn">
                Save
              </Button>
            </FlowBoardToolbar>
          </FloatingPanel>
          <FloatingPanel
            storageKey="msqdx.story.flow.palette"
            variant="toolbar"
            surface="solid"
            className={`msqdx-flow-float-panel msqdx-flow-float-panel--palette ${
              paletteOpen ? 'msqdx-flow-float-panel--palette-open' : 'msqdx-flow-float-panel--palette-collapsed'
            }`}
          >
            <FlowBoardPalette open={paletteOpen} onOpenChange={setPaletteOpen}>
              <div className="msqdx-flow-palette-row">
                {['Start', 'Prompt', 'Gate', 'Action'].map((k) => (
                  <Button key={k} type="button" size="sm" variant="subtle">
                    {k}
                  </Button>
                ))}
              </div>
            </FlowBoardPalette>
          </FloatingPanel>
          <FloatingPanel
            storageKey="msqdx.story.flow.inspector"
            title="Inspector"
            surface="solid"
            className="msqdx-flow-float-panel msqdx-flow-float-panel--inspector"
          >
            <FlowInspectorShell
              kind="prompt"
              kindLabel="Prompt"
              title="Explore checkout"
              nodeId="n2"
              runState="active"
              sections={[
                {
                  id: 'design',
                  title: 'Design',
                  children: <p className="msqdx-flow-inspector-prose">Prompt text and notes.</p>,
                },
                {
                  id: 'run',
                  title: 'Run',
                  meta: 'live',
                  children: <p className="msqdx-flow-inspector-prose">Step 2 · thinking</p>,
                },
              ]}
            />
          </FloatingPanel>
          <FloatingPanel
            storageKey="msqdx.story.flow.strip"
            variant="strip"
            surface="solid"
            defaultEdge="bottom"
            className="msqdx-flow-float-panel msqdx-flow-float-panel--run"
          >
            <FlowRunStrip
              status={<span>running</span>}
              meta={<span>job · 2/8</span>}
              links={<Button type="button" size="sm" variant="link">Open Soft-Q</Button>}
            />
          </FloatingPanel>
        </>
      }
    />
  )
}

export const Default: Story = {
  args: { active: false },
  render: () => (
    <FlowBoardStage
      active={false}
      viewport={<div className="msqdx-flow-board-empty">Drop nodes onto the board</div>}
    />
  ),
}

export const MagazineBoard: Story = {
  args: { active: false },
  render: () => <MagazineBoardDemo />,
}
