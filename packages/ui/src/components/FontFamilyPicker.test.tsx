import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { FontFamilyPicker } from './FontFamilyPicker'

describe('FontFamilyPicker', () => {
  it('selects catalog font', () => {
    const onChange = vi.fn()
    render(
      <FontFamilyPicker value="Roboto" onChange={onChange} data-testid="font" />,
    )
    fireEvent.click(screen.getByTestId('font-option-Inter'))
    expect(onChange).toHaveBeenCalledWith('Inter')
  })

  it('filters list via search', () => {
    render(<FontFamilyPicker value="" onChange={() => {}} data-testid="font" />)
    fireEvent.change(screen.getByTestId('font-search-input'), { target: { value: 'JetBrains' } })
    expect(screen.getByTestId('font-option-JetBrains-Mono')).toBeInTheDocument()
    expect(screen.queryByTestId('font-option-Inter')).toBeNull()
  })
})
