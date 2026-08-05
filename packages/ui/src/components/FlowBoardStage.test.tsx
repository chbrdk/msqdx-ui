import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FlowBoardStage } from './FlowBoardStage'

describe('FlowBoardStage', () => {
  it('renders viewport and alert', () => {
    render(
      <FlowBoardStage active={false} alert="Heads up" viewport={<div>Canvas</div>} />
    )
    expect(screen.getByText('Heads up')).toBeInTheDocument()
    expect(screen.getByText('Canvas')).toBeInTheDocument()
  })
})
