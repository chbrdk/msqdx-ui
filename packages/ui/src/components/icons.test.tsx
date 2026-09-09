import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  IconCheck,
  IconItalic,
  IconPlus,
  IconResearch,
  IconStorybook,
  IconUnderline,
  IconUndo,
} from './icons'

describe('icons', () => {
  it('wraps residual lucide with ui-icon class', () => {
    const { container } = render(<IconUndo />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
  })

  it('renders Wave 1 custom icons with ds-ui-icon and hairline language', () => {
    const { container } = render(<IconPlus size={48} />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
    expect(svg?.classList.contains('ds-ui-icon')).toBe(true)
    expect(svg?.getAttribute('width')).toBe('48')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 16 16')
    expect(container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
    expect(container.querySelector('.ds-ui-icon__stroke')).toBeTruthy()
  })

  it('redraws former Lucide exports as custom', () => {
    const check = render(<IconCheck />)
    const research = render(<IconResearch />)
    expect(check.container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(true)
    expect(research.container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(true)
  })

  it('exports type and chrome glyphs used by editor inspect', () => {
    const italic = render(<IconItalic />)
    const underline = render(<IconUnderline />)
    expect(italic.container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
    expect(underline.container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
  })

  it('renders Storybook brand mark as ui-icon', () => {
    const { container } = render(<IconStorybook />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
    expect(svg?.querySelector('path')).toBeTruthy()
  })
})
