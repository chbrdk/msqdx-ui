import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders primary by default with ds-btn classes', () => {
    render(<Button>Save</Button>)
    const btn = screen.getByRole('button', { name: 'Save' })
    expect(btn.className).toContain('ds-btn')
    expect(btn.className).toContain('ds-btn--primary')
    expect(btn.className).toContain('ds-btn--sm')
  })

  it('applies variant size shape and block', () => {
    render(
      <Button variant="ghost" size="md" shape="pill" block>
        More
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'More' })
    expect(btn.className).toContain('ds-btn--ghost')
    expect(btn.className).toContain('ds-btn--md')
    expect(btn.className).toContain('ds-btn--pill')
    expect(btn.className).toContain('ds-btn--block')
  })

  it('supports disabled and custom type', () => {
    render(
      <Button type="submit" disabled>
        Go
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('type', 'submit')
  })
})
