import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconItalic, IconUndo, IconUnderline } from './icons'

describe('icons', () => {
  it('wraps lucide with ui-icon class', () => {
    const { container } = render(<IconUndo />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
  })

  it('exports type and chrome glyphs used by editor inspect', () => {
    const italic = render(<IconItalic />)
    const underline = render(<IconUnderline />)
    expect(italic.container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
    expect(underline.container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
  })
})
