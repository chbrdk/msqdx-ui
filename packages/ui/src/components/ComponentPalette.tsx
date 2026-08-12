import type { HTMLAttributes, ReactNode } from 'react'
import { Button } from './Button'

export type ComponentPaletteItem = {
  id: string
  label: string
  description?: string
}

export type ComponentPaletteProps = {
  className?: string
  title?: string
  items: ComponentPaletteItem[]
  onAdd?: (id: string) => void
  footer?: ReactNode
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'title'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Clickable type list for inserting composition nodes. */
export function ComponentPalette({
  className,
  title = 'Components',
  items,
  onAdd,
  footer,
  'aria-label': ariaLabel = 'Component palette',
  ...rest
}: ComponentPaletteProps) {
  return (
    <nav className={cx('ds-component-palette', className)} aria-label={ariaLabel} {...rest}>
      <header className="ds-component-palette__head">
        <strong>{title}</strong>
      </header>
      <ul className="ds-component-palette__list">
        {items.map((item) => (
          <li key={item.id} className="ds-component-palette__item">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ds-component-palette__btn"
              onClick={() => onAdd?.(item.id)}
            >
              <span className="ds-component-palette__label">{item.label}</span>
              {item.description ? (
                <>
                  {' '}
                  <span className="ds-component-palette__desc">{item.description}</span>
                </>
              ) : null}
            </Button>
          </li>
        ))}
      </ul>
      {footer ? <footer className="ds-component-palette__footer">{footer}</footer> : null}
    </nav>
  )
}
