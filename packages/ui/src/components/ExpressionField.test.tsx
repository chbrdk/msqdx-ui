import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ExpressionField, parseExpressionSegments } from './ExpressionField'

describe('parseExpressionSegments', () => {
  it('splits complete expressions from literal text', () => {
    expect(parseExpressionSegments('{{ scan.scores.seo }}')).toEqual([
      { type: 'expression', value: 'scan.scores.seo', raw: '{{ scan.scores.seo }}' },
    ])
    expect(parseExpressionSegments('x {{ a }} y')).toEqual([
      { type: 'text', value: 'x ' },
      { type: 'expression', value: 'a', raw: '{{ a }}' },
      { type: 'text', value: ' y' },
    ])
  })
})

describe('ExpressionField', () => {
  it('renders label and updates value', () => {
    const onChange = vi.fn()
    render(<ExpressionField label="Path" value="a" onChange={onChange} />)
    expect(screen.getByLabelText('Path')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Path'), { target: { value: 'ab' } })
    expect(onChange).toHaveBeenCalledWith('ab')
  })

  it('shows expression chips in mirror layer', () => {
    const { container } = render(
      <ExpressionField label="Note" value="{{ scan.scores.seo }}" onChange={() => {}} />
    )
    expect(container.querySelector('.ds-expression-chip')?.textContent).toBe('scan.scores.seo')
    expect(screen.getByLabelText('Note')).toHaveClass('ds-expression-field-input--chip-overlay')
  })

  it('shows hint', () => {
    render(
      <ExpressionField label="Path" value="" onChange={() => {}} hint="use {{ }}" />
    )
    expect(screen.getByText('use {{ }}')).toBeInTheDocument()
  })
})
