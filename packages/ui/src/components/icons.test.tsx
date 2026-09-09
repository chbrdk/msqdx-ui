import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  IconAlignLeft,
  IconBold,
  IconCheck,
  IconJustifyCenter,
  IconOverview,
  IconPlus,
  IconSpaceBetween,
  IconStorybook,
} from './icons'

describe('icons', () => {
  it('renders Align matrix as custom ds-ui-icon (no Lucide)', () => {
    const align = render(<IconAlignLeft />)
    const justify = render(<IconJustifyCenter />)
    const space = render(<IconSpaceBetween size={48} />)
    expect(align.container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(true)
    expect(justify.container.querySelector('.ds-ui-icon__stroke')).toBeTruthy()
    expect(space.container.querySelector('svg')?.getAttribute('width')).toBe('48')
    expect(align.container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
  })

  it('renders Waves 1–3 custom icons with ds-ui-icon', () => {
    expect(render(<IconPlus />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(
      true,
    )
    expect(render(<IconBold />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(
      true,
    )
    expect(
      render(<IconOverview />).container.querySelector('svg')?.classList.contains('ds-ui-icon'),
    ).toBe(true)
    expect(render(<IconCheck />).container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
  })

  it('renders Storybook brand mark as ui-icon', () => {
    const { container } = render(<IconStorybook />)
    expect(container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
  })
})
