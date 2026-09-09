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
import {
  CellParkGlyph,
  ClipPresetGlyph,
  DistributeGlyph,
  cellParkGlyphId,
  clipPresetGlyphId,
  distributeGlyphId,
} from './InspectLayoutGlyphsExtra'
import {
  AspectRatioGlyph,
  DisplayModeGlyph,
  GapAxisGlyph,
  NinePointGlyph,
  SelfParkGlyph,
  TextAlignGlyph,
  ninePointGlyphId,
  ninePointWriteValue,
  selfParkGlyphId,
  textAlignGlyphId,
  aspectRatioGlyphId,
} from './InspectLayoutGlyphsMore'

describe('InspectLayoutGlyphs', () => {
  it('renders size mode glyphs with ui-icon + ds-inspect-glyph and no hardcoded fills', () => {
    const { container } = render(<SizeModeGlyph id="fixed" axis="width" />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ds-inspect-glyph')).toBe(true)
    expect(svg?.classList.contains('ui-icon')).toBe(true)
    expect(svg?.getAttribute('width')).toBe('16')
    expect(container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
    expect(container.querySelector('.ds-inspect-glyph__accent')).toBeTruthy()
  })

  it('renders media fit and grid glyphs', () => {
    expect(render(<MediaFitGlyph id="cover" />).container.querySelector('svg')).toBeTruthy()
    expect(
      render(<GridColumnGlyph id="cols-3" />).container.querySelector(
        '.ds-inspect-glyph__cell--strong',
      ),
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

  it('renders catalog extras and maps helpers', () => {
    expect(render(<DistributeGlyph id="even" />).container.querySelector('svg')).toBeTruthy()
    expect(
      render(<CellParkGlyph id="stretch" axis="v" />).container.querySelector('svg'),
    ).toBeTruthy()
    expect(
      render(<ClipPresetGlyph id="trapezoid" />).container.querySelector(
        '.ds-inspect-glyph__silhouette',
      ),
    ).toBeTruthy()
    expect(distributeGlyphId('space-between')).toBe('even')
    expect(cellParkGlyphId('flex-end')).toBe('end')
    expect(clipPresetGlyphId('parallelogram')).toBe('parallelogram')
  })

  it('renders More families and maps helpers', () => {
    expect(render(<SelfParkGlyph id="stretch" />).container.querySelector('svg')).toBeTruthy()
    expect(render(<NinePointGlyph id="top-left" />).container.querySelector('.ds-inspect-glyph__pip')).toBeTruthy()
    expect(render(<TextAlignGlyph id="justify" />).container.querySelector('svg')).toBeTruthy()
    expect(render(<AspectRatioGlyph id="16-9" />).container.querySelector('svg')).toBeTruthy()
    expect(render(<DisplayModeGlyph id="grid" />).container.querySelectorAll('rect').length).toBeGreaterThan(3)
    expect(render(<GapAxisGlyph id="both" />).container.querySelector('.ds-inspect-glyph__accent')).toBeTruthy()
    expect(selfParkGlyphId('flex-end')).toBe('end')
    expect(ninePointGlyphId('top left')).toBe('top-left')
    expect(ninePointWriteValue('bottom-right')).toBe('bottom right')
    expect(textAlignGlyphId('right')).toBe('end')
    expect(aspectRatioGlyphId('9:16')).toBe('9-16')
    expect(aspectRatioGlyphId('16:9')).toBe('16-9')
  })
})
