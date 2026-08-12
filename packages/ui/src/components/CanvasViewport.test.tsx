import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CanvasViewport } from './CanvasViewport'

describe('CanvasViewport', () => {
  it('renders children', () => {
    render(<CanvasViewport>CanvasViewport</CanvasViewport>)
    expect(screen.getByText('CanvasViewport')).toBeInTheDocument()
  })
})
