import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppFrame } from './components/AppFrame'
import { BrandCorner } from './components/BrandCorner'
import { NavRail } from './components/NavRail'

describe('shared app shell primitives', () => {
  it('renders app frame, nav rail, and brand corner', () => {
    render(
      <AppFrame
        rail={
          <NavRail
            dockable={false}
            logo={<span>AU</span>}
            logoLabel="AUDION home"
            items={[{ id: 'personas', label: 'Personas', href: '/personas', icon: 'PR', active: true }]}
          />
        }
        brandCorner={<BrandCorner label="AUDION" />}
        topbar={<div>Topbar</div>}
      >
        <div>Content</div>
      </AppFrame>,
    )

    const rail = document.querySelector('.nav-rail')
    expect(screen.getByTestId('brand-corner')).toBeInTheDocument()
    expect(rail).toBeInTheDocument()
    expect(rail).toHaveClass('nav-rail--static-dock')
    expect(rail).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByRole('link', { name: 'Personas' })).toHaveClass('active')
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
