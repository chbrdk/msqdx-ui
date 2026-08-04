import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { InfoTip } from './InfoTip'

describe('InfoTip', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders a labelled ghost trigger', () => {
    render(<InfoTip label="About performance" content="Core Web Vitals and load timing." />)
    const trigger = screen.getByRole('button', { name: 'About performance' })
    expect(trigger).toBeInTheDocument()
    expect(trigger.className).toContain('ds-btn--ghost')
    expect(trigger.className).toContain('ds-btn--square')
  })

  it('shows tip content on focus', () => {
    const { container } = render(
      <InfoTip label="About SEO" content="Search visibility and crawl signals." />,
    )
    fireEvent.focus(screen.getByRole('button', { name: 'About SEO' }))
    expect(within(container).getByRole('tooltip')).toHaveTextContent(
      'Search visibility and crawl signals.',
    )
  })

  it('shows tip content on hover', () => {
    const { container } = render(
      <InfoTip label="About UX" content="Task ease and interaction quality." />,
    )
    const tipRoot = container.querySelector('.ds-tooltip')
    expect(tipRoot).toBeTruthy()
    fireEvent.mouseEnter(tipRoot!)
    expect(within(container).getByRole('tooltip')).toHaveTextContent(
      'Task ease and interaction quality.',
    )
  })
})
