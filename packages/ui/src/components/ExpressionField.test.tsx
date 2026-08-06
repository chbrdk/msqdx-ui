import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ExpressionField } from './ExpressionField'

describe('ExpressionField', () => {
  it('renders label and updates value', () => {
    const onChange = vi.fn()
    render(<ExpressionField label="Path" value="a" onChange={onChange} />)
    expect(screen.getByLabelText('Path')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Path'), { target: { value: 'ab' } })
    expect(onChange).toHaveBeenCalledWith('ab')
  })

  it('shows hint', () => {
    render(
      <ExpressionField label="Path" value="" onChange={() => {}} hint="use {{ }}" />
    )
    expect(screen.getByText('use {{ }}')).toBeInTheDocument()
  })
})
