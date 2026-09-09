import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  IconAlignLeft,
  IconBold,
  IconCheck,
  IconMessage,
  IconOverview,
  IconPlay,
  IconPlus,
  IconStorybook,
} from './icons'

describe('icons', () => {
  it('renders Align and Wave 5 platform icons as custom ds-ui-icon', () => {
    expect(render(<IconAlignLeft />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(
      true,
    )
    expect(render(<IconPlay />).container.querySelector('.ds-ui-icon__stroke')).toBeTruthy()
    expect(render(<IconMessage size={32} />).container.querySelector('svg')?.getAttribute('width')).toBe(
      '32',
    )
  })

  it('renders earlier waves as custom', () => {
    expect(render(<IconPlus />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(true)
    expect(render(<IconBold />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(true)
    expect(render(<IconOverview />).container.querySelector('svg')?.classList.contains('ds-ui-icon')).toBe(
      true,
    )
    expect(render(<IconCheck />).container.innerHTML).not.toMatch(/#fff|#ffffff|#000/i)
  })

  it('renders Storybook brand mark as ui-icon', () => {
    expect(render(<IconStorybook />).container.querySelector('svg')?.classList.contains('ui-icon')).toBe(
      true,
    )
  })
})
