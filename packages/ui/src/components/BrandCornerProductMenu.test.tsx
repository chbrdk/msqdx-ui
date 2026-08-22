import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { BrandCornerProductMenu } from './BrandCornerProductMenu'
import { ProductSwitcherPanel } from './ProductSwitcherPanel'

const frameCss = readFileSync(path.resolve(__dirname, '../css/frame.css'), 'utf8')

const ITEMS = [
  { id: 'plexon', label: 'PLEXON', href: 'https://plexon.example/' },
  { id: 'creation', label: 'CREATION', href: 'https://creation.example/' },
  { id: 'checkion', label: 'CHECKION', href: 'https://checkion.example/' },
]

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ProductSwitcherPanel', () => {
  it('marks current product and disables its button', () => {
    render(<ProductSwitcherPanel items={ITEMS} currentProductId="creation" />)
    const current = screen.getByRole('menuitem', { name: 'CREATION' })
    expect(current).toBeDisabled()
    expect(current).toHaveClass('product-switcher-panel__item--current')
  })

  it('calls onSelectItem for launchable products', () => {
    const onSelectItem = vi.fn()
    render(
      <ProductSwitcherPanel
        items={ITEMS}
        currentProductId="creation"
        onSelectItem={onSelectItem}
      />,
    )
    fireEvent.click(screen.getByRole('menuitem', { name: 'PLEXON' }))
    expect(onSelectItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'plexon' }))
  })
})

describe('BrandCornerProductMenu', () => {
  it('opens panel on plaque click', () => {
    render(
      <BrandCornerProductMenu label="CREATION" currentProductId="creation" items={ITEMS} />,
    )
    expect(screen.queryByTestId('product-switcher-panel')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'CREATION' }))
    expect(screen.getByTestId('product-switcher-panel')).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    render(
      <BrandCornerProductMenu label="CREATION" currentProductId="creation" items={ITEMS} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'CREATION' }))
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByTestId('product-switcher-panel')).toBeNull()
  })

  it('delegates selection to onSelectItem', () => {
    const onSelectItem = vi.fn()
    render(
      <BrandCornerProductMenu
        label="CREATION"
        currentProductId="creation"
        items={ITEMS}
        onSelectItem={onSelectItem}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'CREATION' }))
    fireEvent.click(within(screen.getByTestId('product-switcher-panel')).getByRole('menuitem', { name: 'PLEXON' }))
    expect(onSelectItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'plexon' }))
  })

  it('falls back to plain BrandCorner when items are empty', () => {
    render(<BrandCornerProductMenu label="CREATION" currentProductId="creation" items={[]} />)
    expect(screen.getByTestId('brand-corner')).toBeInTheDocument()
    expect(screen.queryByTestId('brand-corner-product-menu')).toBeNull()
  })

  it('CSS anchors panel under fixed top-right corner', () => {
    expect(frameCss).toMatch(/\.brand-corner-product-menu\s*\{[^}]*position:\s*fixed/)
    expect(frameCss).toMatch(/\.brand-corner-product-menu__panel/)
  })
})
