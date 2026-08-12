import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack>Stack</Stack>)
    expect(screen.getByText('Stack')).toBeInTheDocument()
  })
})
