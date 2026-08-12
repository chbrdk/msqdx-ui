import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TokenPicker } from './TokenPicker'

describe('TokenPicker', () => {
  it('renders options', () => {
    render(<TokenPicker options={[{ path: 'TokenPicker' }]} />)
    expect(screen.getByText('TokenPicker')).toBeInTheDocument()
  })
})
