import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows content on focus and uses fixed viewport placement', () => {
    render(
      <Tooltip content="Sentence case tip about discoverability.">
        <button type="button">Trigger</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByRole('button', { name: 'Trigger' }))
    const tip = screen.getByRole('tooltip')
    expect(tip).toHaveTextContent('Sentence case tip about discoverability.')
    expect(tip.style.position).toBe('fixed')
    expect(tip.style.transform).toBe('none')
  })

  it('clamps horizontally near the left viewport edge', () => {
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value() {
        if ((this as HTMLElement).getAttribute('role') === 'tooltip') {
          return {
            width: 320,
            height: 48,
            top: 0,
            left: 0,
            right: 320,
            bottom: 48,
            x: 0,
            y: 0,
            toJSON() {},
          }
        }
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 4,
          right: 24,
          bottom: 120,
          x: 4,
          y: 100,
          toJSON() {},
        }
      },
    })

    render(
      <Tooltip content="Edge tip that would otherwise overflow left.">
        <button type="button">Edge</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByRole('button', { name: 'Edge' }))
    const tip = screen.getByRole('tooltip')
    const left = Number.parseFloat(tip.style.left || '0')
    expect(left).toBeGreaterThanOrEqual(8)
  })
})
