'use client'

import { useState, type DragEvent, type HTMLAttributes } from 'react'

export type LayersPanelItem = {
  id: string
  label: string
  /** Optional type meta shown beside the label (e.g. Stack, Text). */
  type?: string
  /** Visual: dimmed when true (canvas hide). */
  hidden?: boolean
  /** Visual: lock pressed; row not draggable when true. */
  locked?: boolean
  children?: LayersPanelItem[]
}

export type LayersPanelReorderDirection = 'up' | 'down'

export type LayersPanelReorderDropPosition = 'before' | 'after'

/** MIME for sibling layer drag-and-drop within LayersPanel. */
export const LAYERS_PANEL_DND_MIME = 'application/x-msqdx-layers-panel-id'

export type LayersPanelProps = {
  className?: string
  title?: string
  items: LayersPanelItem[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  /** Move among siblings toward list start. */
  onMoveUp?: (id: string) => void
  /** Move among siblings toward list end. */
  onMoveDown?: (id: string) => void
  /**
   * Alternative to `onMoveUp` / `onMoveDown`. Used for a direction when the
   * matching directional prop is omitted.
   */
  onReorder?: (id: string, direction: LayersPanelReorderDirection) => void
  /**
   * Sibling drag-and-drop drop. `position` is relative to `targetId`.
   * Self / cross-parent drops are ignored by the primitive.
   */
  onReorderDrop?: (
    id: string,
    targetId: string,
    position: LayersPanelReorderDropPosition,
  ) => void
  /** Toggle canvas visibility for a layer id. */
  onToggleHidden?: (id: string) => void
  /** Toggle lock for a layer id. */
  onToggleLocked?: (id: string) => void
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

function dropPositionFromEvent(
  event: DragEvent<HTMLElement>,
): LayersPanelReorderDropPosition {
  const rect = event.currentTarget.getBoundingClientRect()
  const mid = rect.top + rect.height / 2
  return event.clientY < mid ? 'before' : 'after'
}

function LayerRow({
  item,
  depth,
  siblings,
  index,
  selectedId,
  onSelect,
  onMoveUp,
  onMoveDown,
  onReorder,
  onReorderDrop,
  onToggleHidden,
  onToggleLocked,
  defaultExpanded,
  showReorder,
  showDrag,
  showHidden,
  showLocked,
}: {
  item: LayersPanelItem
  depth: number
  siblings: LayersPanelItem[]
  index: number
  selectedId?: string | null
  onSelect?: (id: string) => void
  onMoveUp?: (id: string) => void
  onMoveDown?: (id: string) => void
  onReorder?: (id: string, direction: LayersPanelReorderDirection) => void
  onReorderDrop?: (
    id: string,
    targetId: string,
    position: LayersPanelReorderDropPosition,
  ) => void
  onToggleHidden?: (id: string) => void
  onToggleLocked?: (id: string) => void
  defaultExpanded: boolean
  showReorder: boolean
  showDrag: boolean
  showHidden: boolean
  showLocked: boolean
}) {
  const hasChildren = Boolean(item.children?.length)
  const [open, setOpen] = useState(defaultExpanded)
  const [dropHint, setDropHint] = useState<LayersPanelReorderDropPosition | null>(null)
  const selected = selectedId === item.id
  const canUp = index > 0
  const canDown = index < siblings.length - 1
  const siblingIds = new Set(siblings.map((s) => s.id))
  const canDrag = showDrag && !item.locked

  const move = (direction: LayersPanelReorderDirection) => {
    if (direction === 'up') {
      if (onMoveUp) onMoveUp(item.id)
      else onReorder?.(item.id, 'up')
      return
    }
    if (onMoveDown) onMoveDown(item.id)
    else onReorder?.(item.id, 'down')
  }

  const clearDropHint = () => setDropHint(null)

  const handleDragStart = (event: DragEvent<HTMLElement>) => {
    if (!canDrag) return
    event.dataTransfer.setData(LAYERS_PANEL_DND_MIME, item.id)
    event.dataTransfer.setData('text/plain', item.id)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    if (!showDrag || !onReorderDrop) return
    const types = Array.from(event.dataTransfer.types)
    if (!types.includes(LAYERS_PANEL_DND_MIME) && !types.includes('text/plain')) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setDropHint(dropPositionFromEvent(event))
  }

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    if (!onReorderDrop) return
    event.preventDefault()
    const position = dropHint ?? dropPositionFromEvent(event)
    clearDropHint()
    const draggedId =
      event.dataTransfer.getData(LAYERS_PANEL_DND_MIME) ||
      event.dataTransfer.getData('text/plain')
    if (!draggedId || draggedId === item.id) return
    if (!siblingIds.has(draggedId)) return
    onReorderDrop(draggedId, item.id, position)
  }

  return (
    <li className="ds-layers-panel__item">
      <div
        className={cx(
          'ds-layers-panel__row',
          item.hidden && 'ds-layers-panel__row--hidden',
          item.locked && 'ds-layers-panel__row--locked',
          dropHint === 'before' && 'ds-layers-panel__row--drop-before',
          dropHint === 'after' && 'ds-layers-panel__row--drop-after',
          canDrag && 'ds-layers-panel__row--draggable',
        )}
        style={{ paddingLeft: `${BASE_PAD_REM + depth * INDENT_REM}rem` }}
        draggable={canDrag}
        onDragStart={canDrag ? handleDragStart : undefined}
        onDragOver={showDrag ? handleDragOver : undefined}
        onDragLeave={showDrag ? clearDropHint : undefined}
        onDragEnd={showDrag ? clearDropHint : undefined}
        onDrop={showDrag ? handleDrop : undefined}
        data-testid={`layers-panel-row-${item.id}`}
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
        {(showHidden || showLocked || showReorder) ? (
          <span className="ds-layers-panel__actions">
            {showHidden ? (
              <button
                type="button"
                className={cx(
                  'ds-layers-panel__icon-btn',
                  item.hidden && 'ds-layers-panel__icon-btn--active',
                )}
                data-testid={`layers-panel-hide-${item.id}`}
                aria-label={item.hidden ? 'Show layer' : 'Hide layer'}
                aria-pressed={item.hidden === true}
                onClick={() => onToggleHidden?.(item.id)}
              >
                {item.hidden ? '◌' : '◉'}
              </button>
            ) : null}
            {showLocked ? (
              <button
                type="button"
                className={cx(
                  'ds-layers-panel__icon-btn',
                  item.locked && 'ds-layers-panel__icon-btn--active',
                )}
                data-testid={`layers-panel-lock-${item.id}`}
                aria-label={item.locked ? 'Unlock layer' : 'Lock layer'}
                aria-pressed={item.locked === true}
                onClick={() => onToggleLocked?.(item.id)}
              >
                {item.locked ? '▣' : '□'}
              </button>
            ) : null}
            {showReorder ? (
              <span className="ds-layers-panel__moves">
                <button
                  type="button"
                  className="ds-layers-panel__move"
                  data-testid={`layers-panel-move-up-${item.id}`}
                  aria-label="Move up"
                  disabled={!canUp}
                  onClick={() => move('up')}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="ds-layers-panel__move"
                  data-testid={`layers-panel-move-down-${item.id}`}
                  aria-label="Move down"
                  disabled={!canDown}
                  onClick={() => move('down')}
                >
                  ▼
                </button>
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
      {hasChildren && open ? (
        <ul className="ds-layers-panel__list" role="group">
          {item.children!.map((child, childIndex) => (
            <LayerRow
              key={child.id}
              item={child}
              depth={depth + 1}
              siblings={item.children!}
              index={childIndex}
              selectedId={selectedId}
              onSelect={onSelect}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onReorder={onReorder}
              onReorderDrop={onReorderDrop}
              onToggleHidden={onToggleHidden}
              onToggleLocked={onToggleLocked}
              defaultExpanded={defaultExpanded}
              showReorder={showReorder}
              showDrag={showDrag}
              showHidden={showHidden}
              showLocked={showLocked}
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
  onMoveUp,
  onMoveDown,
  onReorder,
  onReorderDrop,
  onToggleHidden,
  onToggleLocked,
  emptyLabel = 'No layers',
  defaultExpanded = true,
  'aria-label': ariaLabel = 'Layers panel',
  ...rest
}: LayersPanelProps) {
  const empty = items.length === 0
  const showReorder = Boolean(onMoveUp || onMoveDown || onReorder)
  const showDrag = Boolean(onReorderDrop)
  const showHidden = Boolean(onToggleHidden)
  const showLocked = Boolean(onToggleLocked)

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
          {items.map((item, index) => (
            <LayerRow
              key={item.id}
              item={item}
              depth={0}
              siblings={items}
              index={index}
              selectedId={selectedId}
              onSelect={onSelect}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onReorder={onReorder}
              onReorderDrop={onReorderDrop}
              onToggleHidden={onToggleHidden}
              onToggleLocked={onToggleLocked}
              defaultExpanded={defaultExpanded}
              showReorder={showReorder}
              showDrag={showDrag}
              showHidden={showHidden}
              showLocked={showLocked}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}
