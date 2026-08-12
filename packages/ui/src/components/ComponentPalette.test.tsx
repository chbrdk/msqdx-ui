import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ComponentPalette } from './ComponentPalette'

describe('ComponentPalette', () => {
  it('renders items', () => {
    render(<ComponentPalette items={[{ id: 'x', label: 'ComponentPalette' }]} />)
    expect(screen.getByText('ComponentPalette')).toBeInTheDocument()
  })

  it('does not concatenate label and description into one word', () => {
    render(
      <ComponentPalette items={[{ id: 'Stack', label: 'Stack', description: 'Top-N' }]} />,
    )
    const btn = screen.getByRole('button', { name: /Stack/ })
    expect(btn.textContent).toMatch(/Stack\s+Top-N/)
    expect(btn.textContent).not.toBe('StackTop-N')
    expect(btn.querySelector('.ds-component-palette__label')?.textContent).toBe('Stack')
    expect(btn.querySelector('.ds-component-palette__desc')?.textContent).toBe('Top-N')
  })
})
