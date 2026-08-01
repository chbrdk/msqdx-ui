import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Panel } from './Panel'
import { StepStrip, StepStripItem } from './StepStrip'

const meta = {
  title: 'Molecules/StepStrip',
  component: StepStrip,
} satisfies Meta<typeof StepStrip>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [selected, setSelected] = useState<number | null>(0)
  const [expanded, setExpanded] = useState<number | null>(0)
  return (
    <StepStrip
      header={<h3 style={{ margin: 0 }}>Steps</h3>}
      hint="Select a step to keep chatting about that moment."
      scrollToIndex={expanded ?? selected}
    >
      {[0, 1, 2].map((i) => (
        <StepStripItem
          key={i}
          index={i}
          label={`Step ${i + 1}`}
          selected={selected === i}
          expanded={expanded === i}
          active={i === 2}
          onActivate={() => {
            setSelected(i)
            setExpanded((prev) => (prev === i ? null : i))
          }}
        >
          <Panel as="div" style={{ padding: '0.75rem' }}>
            <strong>Step {String(i + 1).padStart(2, '0')}</strong>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)' }}>
              {expanded === i ? 'Expanded detail body.' : 'Compact preview.'}
            </p>
          </Panel>
        </StepStripItem>
      ))}
    </StepStrip>
  )
}

export const Default: Story = {
  render: () => <Demo />,
}
