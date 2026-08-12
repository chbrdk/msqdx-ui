import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Badge</Badge>)
    expect(screen.getByText('Badge')).toBeInTheDocument()
  })
})
