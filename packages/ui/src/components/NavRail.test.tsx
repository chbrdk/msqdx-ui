import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { NavRail } from './NavRail'
import { railOrientationFromEdge } from '../shell/railDock'

afterEach(() => {
  cleanup()
})

describe('railOrientationFromEdge', () => {
  it('maps side edges to vertical and top/bottom to horizontal', () => {
    expect(railOrientationFromEdge('left')).toBe('vertical')
    expect(railOrientationFromEdge('right')).toBe('vertical')
    expect(railOrientationFromEdge('top')).toBe('horizontal')
    expect(railOrientationFromEdge('bottom')).toBe('horizontal')
  })
})

describe('NavRail', () => {
  it('sets horizontal orientation for top static dock', () => {
    render(
      <NavRail dockable={false} defaultDockEdge="top" items={[{ id: 'a', label: 'A', href: '#a' }]} />,
    )
    const rail = screen.getByRole('navigation', { name: 'Primary' })
    expect(rail).toHaveAttribute('data-orientation', 'horizontal')
    expect(rail).toHaveAttribute('data-edge', 'top')
  })

  it('sets horizontal orientation for bottom static dock', () => {
    render(
      <NavRail
        dockable={false}
        defaultDockEdge="bottom"
        items={[{ id: 'a', label: 'A', href: '#a' }]}
      />,
    )
    const rail = screen.getByRole('navigation', { name: 'Primary' })
    expect(rail).toHaveAttribute('data-orientation', 'horizontal')
    expect(rail).toHaveAttribute('data-edge', 'bottom')
  })

  it('keeps vertical orientation for left static dock', () => {
    render(
      <NavRail dockable={false} defaultDockEdge="left" items={[{ id: 'a', label: 'A', href: '#a' }]} />,
    )
    const rail = screen.getByRole('navigation', { name: 'Primary' })
    expect(rail).toHaveAttribute('data-orientation', 'vertical')
    expect(rail).toHaveAttribute('data-edge', 'left')
  })
})
