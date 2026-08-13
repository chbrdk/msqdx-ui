'use client'

import {
  useState,
  type DragEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconEye,
  IconEyeOff,
  IconLock,
  IconUnlock,
} from './icons'

export type LayersPanelItem = {
  id: string
  label: string
  /** Optional type meta shown beside the label (e.g. Stack, Text). */
  type?: string
  /** Optional leading glyph (type icon). */
  icon?: ReactNode
  /** Visual: dimmed when true (canvas hide). */
  hidden?: boolean
  /** Visual: lock pressed; row not draggable when true. */
  locked?: boolean
  children?: LayersPanelItem[]
}

export type LayersPanelReorderDirection = 'up' | 'down'

export type LayersPanelReorderDropPosition = 'before' | 'after'

/** Modifier keys for layer row activation (matches canvas multi-select). */
export type LayersPanelSelectMods = {
  shiftKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

/** MIME for sibling layer drag-and-drop within LayersPanel. */
export const LAYERS_PANEL_DND_MIME = 'application/x-msqdx-layers-panel-id'

export type LayersPanelProps = {
  className?: string
  title?: string
  items: LayersPanelItem[]
  /**
   * Primary selection id (`aria-current`). When `selectedIds` is omitted,
   * this alone drives the selected style.
   */
  selectedId?: string | null
  /**
   * Full multi-selection set. Every id is highlighted; primary remains
   * `selectedId` (or the last id when `selectedId` is omitted).
   */
  selectedIds?: readonly string[] | null
  onSelect?: (id: string, mods?: LayersPanelSelectMods) => void
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
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'title' | 'onSelect'>

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

function modsFromMouse(event: MouseEvent<HTMLElement>): LayersPanelSelectMods {
  return {
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
    ctrlKey: event.ctrlKey,
  }
}

function LayerRow({
  item,
  depth,
  siblings,
  index,
  selectedId,
  selectedSet,
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
  selectedSet: Set<string>
  onSelect?: (id: string, mods?: LayersPanelSelectMods) => void
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
  const inSelection = selectedSet.has(item.id)
  const isPrimary = Boolean(selectedId && selectedId === item.id)
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
        data-drop-edge={dropHint ?? undefined}
      >
        {hasChildren ? (
          <button
            type="button"
            className="ds-layers-panel__chevron"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
          </button>
        ) : (
          <span className="ds-layers-panel__chevron ds-layers-panel__chevron--spacer" aria-hidden />
        )}
        <button
          type="button"
          className={cx(
            'ds-layers-panel__btn',
            inSelection && 'ds-layers-panel__btn--selected',
            inSelection && !isPrimary && 'ds-layers-panel__btn--multi-selected',
          )}
          data-testid={`layers-panel-item-${item.id}`}
          data-multi-selected={inSelection && !isPrimary ? 'true' : undefined}
          aria-current={isPrimary ? 'true' : undefined}
          onClick={(event) => onSelect?.(item.id, modsFromMouse(event))}
        >
          {item.icon ? (
            <span className="ds-layers-panel__glyph" aria-hidden>
              {item.icon}
            </span>
          ) : null}
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
                {item.hidden ? <IconEyeOff size={12} /> : <IconEye size={12} />}
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
                {item.locked ? <IconLock size={12} /> : <IconUnlock size={12} />}
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
                  <IconChevronUp size={12} />
                </button>
                <button
                  type="button"
                  className="ds-layers-panel__move"
                  data-testid={`layers-panel-move-down-${item.id}`}
                  aria-label="Move down"
                  disabled={!canDown}
                  onClick={() => move('down')}
                >
                  <IconChevronDown size={12} />
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
              selectedSet={selectedSet}
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

function resolveSelectedSet(
  selectedId: string | null | undefined,
  selectedIds: readonly string[] | null | undefined,
): Set<string> {
  if (selectedIds?.length) return new Set(selectedIds)
  if (selectedId) return new Set([selectedId])
  return new Set()
}

function resolvePrimaryId(
  selectedId: string | null | undefined,
  selectedIds: readonly string[] | null | undefined,
): string | null {
  if (selectedId) return selectedId
  if (selectedIds?.length) return selectedIds[selectedIds.length - 1] ?? null
  return null
}

/** Scene structure tree for composition editors — app maps domain nodes → items. */
export function LayersPanel({
  className,
  title = 'Layers',
  items,
  selectedId = null,
  selectedIds = null,
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
  const selectedSet = resolveSelectedSet(selectedId, selectedIds)
  const primaryId = resolvePrimaryId(selectedId, selectedIds)

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
              selectedId={primaryId}
              selectedSet={selectedSet}
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
