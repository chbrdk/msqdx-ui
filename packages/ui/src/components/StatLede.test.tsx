import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatLede, StatLedeGroup } from './StatLede'
import { DivergingBarList } from './DivergingBar'
import { WizardSteps } from './WizardSteps'

describe('StatLede', () => {
  it('renders value and label', () => {
    render(
      <StatLedeGroup aria-label="Summary">
        <StatLede value={33} unit="%" label="Task completion" tone="low" />
      </StatLedeGroup>,
    )
    expect(screen.getByLabelText('Summary')).toBeTruthy()
    expect(screen.getByText('33')).toBeTruthy()
    expect(screen.getByText('Task completion')).toBeTruthy()
  })
})

describe('DivergingBarList', () => {
  it('renders signed bars', () => {
    const { container } = render(
      <DivergingBarList
        items={[
          { id: 'nav', label: 'Navigation', value: -1.5 },
          { id: 'copy', label: 'Copy', value: 1.25 },
        ]}
      />,
    )
    expect(container.querySelectorAll('.ds-diverging-bar').length).toBe(2)
    expect(screen.getByText('-1.5')).toBeTruthy()
    expect(screen.getByText('+1.25')).toBeTruthy()
  })
})

describe('WizardSteps', () => {
  it('marks active step', () => {
    render(
      <WizardSteps
        activeIndex={1}
        steps={[
          { id: 'a', label: 'Basics' },
          { id: 'b', label: 'Hyps' },
          { id: 'c', label: 'Target' },
        ]}
      />,
    )
    expect(screen.getByText('Hyps').closest('li')).toHaveAttribute('data-state', 'active')
    expect(screen.getByText('Basics').closest('li')).toHaveAttribute('data-state', 'done')
  })
})
