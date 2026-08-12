import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SelectionHandles } from './SelectionHandles'

describe('SelectionHandles', () => {
  it('renders handles', () => {
    render(<SelectionHandles data-testid="handles" />)
    expect(screen.getByTestId('handles')).toBeInTheDocument()
  })
})
