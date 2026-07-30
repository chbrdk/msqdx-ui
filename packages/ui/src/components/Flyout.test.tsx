import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Flyout } from './Flyout'

describe('Flyout', () => {
  it('opens a frosted dialog panel from the icon trigger', () => {
    render(
      <Flyout label="Share" icon={<span>S</span>}>
        {() => <p>Share body</p>}
      </Flyout>,
    )

    expect(screen.queryByRole('dialog', { name: 'Share' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Share' }))
    const panel = screen.getByRole('dialog', { name: 'Share' })
    expect(panel).toBeInTheDocument()
    expect(panel.className).toContain('ds-flyover')
    expect(screen.getByText('Share body')).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    render(
      <Flyout label="History" icon={<span>H</span>}>
        {() => <p>History body</p>}
      </Flyout>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'History' }))
    expect(screen.getByRole('dialog', { name: 'History' })).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'History' })).not.toBeInTheDocument()
  })

  it('closes when resetKey changes', () => {
    const { rerender } = render(
      <Flyout label="Moodboard" icon={<span>M</span>} resetKey="a">
        {() => <p>Board</p>}
      </Flyout>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Moodboard' }))
    expect(screen.getByRole('dialog', { name: 'Moodboard' })).toBeInTheDocument()
    rerender(
      <Flyout label="Moodboard" icon={<span>M</span>} resetKey="b">
        {() => <p>Board</p>}
      </Flyout>,
    )
    expect(screen.queryByRole('dialog', { name: 'Moodboard' })).not.toBeInTheDocument()
  })
})
