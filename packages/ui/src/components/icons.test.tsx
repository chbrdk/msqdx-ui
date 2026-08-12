import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconUndo } from './icons'

describe('icons', () => {
  it('wraps lucide with ui-icon class', () => {
    const { container } = render(<IconUndo />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
  })
})
