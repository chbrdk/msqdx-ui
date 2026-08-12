'use client'

import { useState, type HTMLAttributes } from 'react'

export type LayersPanelItem = {
  id: string
  label: string
  /** Optional type meta shown beside the label (e.g. Stack, Text). */
  type?: string
  children?: LayersPanelItem[]
}

export type LayersPanelProps = {
  className?: string
  title?: string
  items: LayersPanelItem[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  emptyLabel?: string
  /** When true (default), branches with children start expanded. */
  defaultExpanded?: boolean
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'title'>

const INDENT_REM = 0.75
const BASE_PAD_REM = 0.5

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function LayerRow({
  item,
  depth,
  selectedId,
  onSelect,
  defaultExpanded,
}: {
  item: LayersPanelItem
  depth: number
  selectedId?: string | null
  onSelect?: (id: string) => void
  defaultExpanded: boolean
}) {
  const hasChildren = Boolean(item.children?.length)
  const [open, setOpen] = useState(defaultExpanded)
  const selected = selectedId === item.id

  return (
    <li className="ds-layers-panel__item">
      <div
        className="ds-layers-panel__row"
        style={{ paddingLeft: `${BASE_PAD_REM + depth * INDENT_REM}rem` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="ds-layers-panel__chevron"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="ds-layers-panel__chevron ds-layers-panel__chevron--spacer" aria-hidden />
        )}
        <button
          type="button"
          className={cx(
            'ds-layers-panel__btn',
            selected && 'ds-layers-panel__btn--selected',
          )}
          data-testid={`layers-panel-item-${item.id}`}
          aria-current={selected ? 'true' : undefined}
          onClick={() => onSelect?.(item.id)}
        >
          {item.type ? <span className="ds-layers-panel__type">{item.type}</span> : null}
          <span className="ds-layers-panel__label">{item.label}</span>
        </button>
      </div>
      {hasChildren && open ? (
        <ul className="ds-layers-panel__list" role="group">
          {item.children!.map((child) => (
            <LayerRow
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

/** Scene structure tree for composition editors — app maps domain nodes → items. */
export function LayersPanel({
  className,
  title = 'Layers',
  items,
  selectedId = null,
  onSelect,
  emptyLabel = 'No layers',
  defaultExpanded = true,
  'aria-label': ariaLabel = 'Layers panel',
  ...rest
}: LayersPanelProps) {
  const empty = items.length === 0

  return (
    <nav
      className={cx('ds-layers-panel', className)}
      aria-label={ariaLabel}
      data-testid="layers-panel"
      {...rest}
    >
      <header className="ds-layers-panel__head">
        <strong>{title}</strong>
      </header>
      {empty ? (
        <p className="ds-layers-panel__empty">{emptyLabel}</p>
      ) : (
        <ul className="ds-layers-panel__list">
          {items.map((item) => (
            <LayerRow
              key={item.id}
              item={item}
              depth={0}
              selectedId={selectedId}
              onSelect={onSelect}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}
