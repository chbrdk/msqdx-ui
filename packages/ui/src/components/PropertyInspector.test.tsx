import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PropertyInspector } from './PropertyInspector'

describe('PropertyInspector', () => {
  it('renders title', () => {
    render(<PropertyInspector title="PropertyInspector" />)
    expect(screen.getByText('PropertyInspector')).toBeInTheDocument()
  })
})
