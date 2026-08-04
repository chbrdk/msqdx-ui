import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get(this: HTMLElement) {
        return this.getAttribute('role') === 'tooltip' ? 240 : 24
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get(this: HTMLElement) {
        return this.getAttribute('role') === 'tooltip' ? 40 : 24
      },
    })
  })

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
    expect(tip.style.bottom).toBe('auto')
  })

  it('clamps horizontally near the left viewport edge', () => {
    const original = HTMLElement.prototype.getBoundingClientRect
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value(this: HTMLElement) {
        if (this.classList.contains('ds-tooltip-anchor')) {
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
        }
        return original.call(this)
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
