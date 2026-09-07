import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card</Card>)
    expect(screen.getByText('Card')).toBeInTheDocument()
  })

  it('applies clip-path from clipInset', () => {
    const { container } = render(
      <Card clipInset={{ bottomLeft: { y: '12%' } }}>Slant</Card>,
    )
    const el = container.firstElementChild as HTMLElement
    expect(el.style.clipPath).toBe('polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 12%))')
  })
})
