'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { BrandCorner, type BrandCornerProps } from './BrandCorner'
import { ProductSwitcherPanel, launchProductSwitcherItem, type ProductSwitcherItem } from './ProductSwitcherPanel'

export type BrandCornerProductMenuProps = BrandCornerProps & {
  currentProductId: string
  items: ProductSwitcherItem[]
  menuLabel?: string
  footer?: ReactNode
  onSelectItem?: (item: ProductSwitcherItem) => void
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * BrandCorner + federated product launcher panel.
 * Spec: specs/domain/msqdx-ui-product-switcher.md
 */
export function BrandCornerProductMenu({
  currentProductId,
  items,
  menuLabel = 'Products',
  footer,
  onSelectItem,
  className,
  ...brandCornerProps
}: BrandCornerProductMenuProps) {
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const hasMenu = items.length > 0

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  function handleSelect(item: ProductSwitcherItem) {
    const launch = onSelectItem ?? launchProductSwitcherItem
    launch(item)
    setOpen(false)
  }

  if (!hasMenu) {
    return <BrandCorner className={className} {...brandCornerProps} />
  }

  return (
    <div
      ref={rootRef}
      className={cx('brand-corner-product-menu', className)}
      data-testid="brand-corner-product-menu"
    >
      <BrandCorner
        {...brandCornerProps}
        onActivate={() => setOpen((value) => !value)}
        menuExpanded={open}
        menuControlsId={panelId}
      />
      {open ? (
        <ProductSwitcherPanel
          id={panelId}
          items={items}
          currentProductId={currentProductId}
          label={menuLabel}
          footer={footer}
          onSelectItem={handleSelect}
          className="brand-corner-product-menu__panel"
        />
      ) : null}
    </div>
  )
}
