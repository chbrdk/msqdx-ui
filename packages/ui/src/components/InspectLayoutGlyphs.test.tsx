import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  GridColumnGlyph,
  GridSpanGlyph,
  MediaFitGlyph,
  SizeModeGlyph,
  columnGlyphForPresetLabel,
  mediaFitGlyphId,
  sizeModeGlyphId,
  spanGlyphForPresetLabel,
} from './InspectLayoutGlyphs'

describe('InspectLayoutGlyphs', () => {
  it('renders size mode glyphs with ds-inspect-glyph and no hardcoded fills', () => {
    const { container } = render(<SizeModeGlyph id="fixed" axis="width" />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ds-inspect-glyph')).toBe(true)
    expect(container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
    expect(container.querySelector('.ds-inspect-glyph__accent')).toBeTruthy()
  })

  it('renders media fit and grid glyphs', () => {
    expect(render(<MediaFitGlyph id="cover" />).container.querySelector('svg')).toBeTruthy()
    expect(
      render(<GridColumnGlyph id="cols-3" />).container.querySelector('.ds-inspect-glyph__cell--strong'),
    ).toBeTruthy()
    expect(
      render(<GridSpanGlyph id="span-2" axis="col" />).container.querySelectorAll('rect').length,
    ).toBeGreaterThan(1)
  })

  it('maps labels to glyph ids', () => {
    expect(sizeModeGlyphId('fill')).toBe('fill')
    expect(mediaFitGlyphId('contain')).toBe('contain')
    expect(columnGlyphForPresetLabel('Sidebar')).toBe('sidebar')
    expect(spanGlyphForPresetLabel('Full')).toBe('span-full')
  })
})
