import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FlowNodeCard } from './FlowNodeCard'

describe('FlowNodeCard', () => {
  it('applies kind and run classes', () => {
    const { container } = render(
      <FlowNodeCard kind="prompt" kindLabel="Prompt" nodeId="n1" runState="active" selected>
        <span>Body</span>
      </FlowNodeCard>
    )
    const root = container.querySelector('.msqdx-flow-rf-node')
    expect(root).toHaveClass('msqdx-flow-rf-node--prompt')
    expect(root).toHaveClass('msqdx-flow-rf-node--run-active')
    expect(root).toHaveClass('is-selected')
    expect(screen.getByText('Prompt')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
