import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ComponentPalette } from './ComponentPalette'

describe('ComponentPalette', () => {
  it('renders items', () => {
    render(<ComponentPalette items={[{ id: 'x', label: 'ComponentPalette' }]} />)
    expect(screen.getByText('ComponentPalette')).toBeInTheDocument()
  })
})
