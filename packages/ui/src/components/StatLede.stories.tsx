import type { Meta, StoryObj } from '@storybook/react'
import { StatLede, StatLedeGroup } from './StatLede'
import { DivergingBarList } from './DivergingBar'
import { WizardSteps } from './WizardSteps'

const meta: Meta = {
  title: 'Molecules/StatLede',
}
export default meta

type Story = StoryObj

export const LedeGroup: Story = {
  render: () => (
    <StatLedeGroup aria-label="Wave summary">
      <StatLede value={33} unit="%" label="Task completion" tone="low" />
      <StatLede value={33} unit="%" label="Valid evidence" tone="low" />
      <StatLede value={100} unit="%" label="Infrastructure block" tone="neg" />
    </StatLedeGroup>
  ),
}

export const DivergingBars: Story = {
  render: () => (
    <DivergingBarList
      items={[
        { id: 'a', label: 'Affordance', value: -0.67 },
        { id: 'c', label: 'Copy', value: 1.5 },
        { id: 'n', label: 'Navigation', value: -1.56 },
      ]}
    />
  ),
}

export const Steps: Story = {
  render: () => (
    <WizardSteps
      activeIndex={1}
      steps={[
        { id: '1', label: 'Basics' },
        { id: '2', label: 'Hypotheses' },
        { id: '3', label: 'Target' },
      ]}
    />
  ),
}
