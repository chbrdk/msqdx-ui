import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  IconAlignLeft,
  IconBold,
  IconCheck,
  IconOverview,
  IconPlus,
  IconStorybook,
  IconVideo,
} from './icons'

describe('icons', () => {
  it('keeps Align matrix as residual Lucide wrap', () => {
    const { container } = render(<IconAlignLeft />)
    const svg = container.querySelector('svg')
    expect(svg?.classList.contains('ui-icon')).toBe(true)
    expect(svg?.classList.contains('ds-ui-icon')).toBeFalsy()
  })

  it('renders Wave 1–3 custom icons with ds-ui-icon', () => {
    expect(render(<IconPlus size={48} />).container.querySelector('svg')?.getAttribute('width')).toBe(
      '48',
    )
    expect(render(<IconBold />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(
      true,
    )
    expect(
      render(<IconOverview />).container.querySelector('svg')?.classList.contains('ds-ui-icon'),
    ).toBe(true)
    expect(render(<IconVideo />).container.querySelector('.ds-ui-icon__stroke')).toBeTruthy()
    expect(render(<IconCheck />).container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
  })

  it('renders Storybook brand mark as ui-icon', () => {
    const { container } = render(<IconStorybook />)
    expect(container.querySelector('svg')?.classList.contains('ui-icon')).toBe(true)
  })
})
