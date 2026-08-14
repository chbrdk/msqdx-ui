'use client'

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

import { TokenPreview, type TokenPreviewKind } from './TokenPreview'

export type TokenPickerOption = {
  path: string
  label?: string
  /** Display-only CSS color / length for swatch or TokenPreview; not written as the value. */
  preview?: string
  /** Display-only font-family for the value label (type tokens). */
  fontPreview?: string
  /** Display-only CSS on the value label (size / weight samples). */
  sampleStyle?: {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    lineHeight?: string
    letterSpacing?: string
  }
  /** Category for browser scope filtering (e.g. color, space, radius). */
  category?: string
}

export type TokenPickerVariant = 'compact' | 'list'

export type TokenPickerScope = {
  id: string
  label: string
}

export type TokenPickerProps = {
  className?: string
  options: TokenPickerOption[]
  value?: string | null
  onChange?: (path: string) => void
  /** Clear binding affordance — apps map to clear_token_binding (not onChange('')). */
  onClear?: () => void
  clearLabel?: string
  /** Include a none/empty option that invokes onClear. */
  allowNone?: boolean
  /** Listbox none option only — never the empty strip. */
  noneLabel?: string
  /** Current-strip placeholder when unbound (default em dash). */
  emptyLabel?: string
  /** Show −/+ on the current strip to cycle prev/next through cycle options. */
  allowCycle?: boolean
  prevLabel?: string
  nextLabel?: string
  label?: string
  /** Optional 16px glyph beside the label. */
  icon?: ReactNode
  /**
   * `compact` (default): Penpot strip; option list is a popover.
   * `list`: always-open dense list (Storybook / debug).
   */
  variant?: TokenPickerVariant
  /**
   * When true with `compact`: portal multi-context browser
   * (search, scopes, Recent, drag header, keyboard, rich previews).
   */
  browser?: boolean
  scopes?: TokenPickerScope[]
  scope?: string
  onScopeChange?: (scopeId: string) => void
  suggestedPaths?: string[]
  recentPaths?: string[]
  onRecentPathsChange?: (paths: string[]) => void
  contextTitle?: string
  previewKind?: TokenPreviewKind
  searchPlaceholder?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'onChange'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function optionTextStyle(opt: TokenPickerOption): {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
} | undefined {
  if (!opt.fontPreview && !opt.sampleStyle) return undefined
  return {
    ...(opt.fontPreview ? { fontFamily: opt.fontPreview } : {}),
    ...opt.sampleStyle,
  }
}

function cycleIndex(value: string | null, options: TokenPickerOption[]): number {
  if (!value) return -1
  return options.findIndex((opt) => opt.path === value)
}

const PANEL_W = 300
const PANEL_H = 380
const RECENT_MAX = 8

/** Interactive token path picker — values are token paths only (no free CSS entry). */
export function TokenPicker({
  className,
  options,
  value = null,
  onChange,
  onClear,
  clearLabel = 'Clear',
  allowNone = false,
  noneLabel = 'None',
  emptyLabel = '—',
  allowCycle = false,
  prevLabel = 'Previous token',
  nextLabel = 'Next token',
  label = 'Token',
  icon,
  variant = 'compact',
  browser = false,
  scopes,
  scope: scopeProp,
  onScopeChange,
  suggestedPaths,
  recentPaths = [],
  onRecentPathsChange,
  contextTitle,
  previewKind = 'auto',
  searchPlaceholder = 'Search tokens…',
  'aria-label': ariaLabel = 'Token picker',
  ...rest
}: TokenPickerProps) {
  const listId = useId()
  const selectedOption = value ? options.find((opt) => opt.path === value) : undefined
  const displayText = selectedOption?.label ?? value ?? emptyLabel
  const valueStyle = selectedOption
    ? {
        ...(selectedOption.fontPreview ? { fontFamily: selectedOption.fontPreview } : {}),
        ...selectedOption.sampleStyle,
      }
    : undefined
  const fontPreview = Boolean(selectedOption?.fontPreview || selectedOption?.sampleStyle)
  const showClear = Boolean(onClear && value)
  const compact = variant === 'compact'
  const useBrowser = compact && browser
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [scopeInternal, setScopeInternal] = useState(scopes?.[0]?.id ?? 'suggested')
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const activeScope = scopeProp ?? scopeInternal

  const setScope = useCallback(
    (id: string) => {
      onScopeChange?.(id)
      if (scopeProp === undefined) setScopeInternal(id)
    },
    [onScopeChange, scopeProp],
  )

  const cycleOptions = useMemo(() => {
    if (suggestedPaths?.length) {
      const ordered = suggestedPaths
        .map((p) => options.find((o) => o.path === p))
        .filter((o): o is TokenPickerOption => Boolean(o))
      return ordered.length ? ordered : options
    }
    return options
  }, [options, suggestedPaths])

  const index = cycleIndex(value, cycleOptions)

  const scopedOptions = useMemo(() => {
    if (!useBrowser || !scopes?.length) return options
    if (activeScope === 'all') return options
    if (activeScope === 'suggested') {
      if (suggestedPaths?.length) {
        const set = new Set(suggestedPaths)
        return options.filter((o) => set.has(o.path))
      }
      return options
    }
    const scopeMeta = scopes.find((s) => s.id === activeScope)
    const key = activeScope.toLowerCase()
    const labelKey = (scopeMeta?.label ?? '').toLowerCase()
    return options.filter((o) => {
      const cat = (o.category ?? '').toLowerCase()
      return cat === key || cat === labelKey
    })
  }, [useBrowser, scopes, activeScope, suggestedPaths, options])

  const filtered = useMemo(() => {
    const base = useBrowser ? scopedOptions : options
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(
      (o) =>
        o.path.toLowerCase().includes(q) ||
        (o.label ?? '').toLowerCase().includes(q) ||
        (o.category ?? '').toLowerCase().includes(q),
    )
  }, [useBrowser, scopedOptions, options, query])

  const colorGrid =
    useBrowser &&
    previewKind === 'color' &&
    filtered.length > 0 &&
    filtered.every((o) => Boolean(o.preview))

  const pushRecent = useCallback(
    (path: string) => {
      if (!onRecentPathsChange) return
      const next = [path, ...recentPaths.filter((p) => p !== path)].slice(0, RECENT_MAX)
      onRecentPathsChange(next)
    },
    [onRecentPathsChange, recentPaths],
  )

  const placePanel = useCallback(() => {
    const el = triggerRef.current
    if (!el || typeof window === 'undefined') return
    const r = el.getBoundingClientRect()
    let left = r.left
    let top = r.bottom + 6
    if (left + PANEL_W > window.innerWidth - 8) left = Math.max(8, window.innerWidth - PANEL_W - 8)
    if (top + PANEL_H > window.innerHeight - 8) top = Math.max(8, r.top - PANEL_H - 6)
    setPanelPos({ top, left })
  }, [])

  useEffect(() => {
    if (!compact || !open) return
    const onDoc = (event: MouseEvent) => {
      const t = event.target as Node
      if (rootRef.current?.contains(t)) return
      if (panelRef.current?.contains(t)) return
      setOpen(false)
      setQuery('')
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [compact, open])

  useEffect(() => {
    if (!open || !useBrowser) return
    placePanel()
    const t = window.setTimeout(() => searchRef.current?.focus(), 0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, useBrowser, placePanel])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, activeScope, open])

  useEffect(() => {
    if (!dragging || !useBrowser) return
    const onMove = (e: MouseEvent) => {
      const maxL = window.innerWidth - PANEL_W - 8
      const maxT = window.innerHeight - 120
      setPanelPos({
        left: Math.max(8, Math.min(maxL, e.clientX - dragOffset.current.x)),
        top: Math.max(8, Math.min(maxT, e.clientY - dragOffset.current.y)),
      })
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, useBrowser])

  const onHeaderDown = (e: ReactMouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    e.preventDefault()
    dragOffset.current = { x: e.clientX - panelPos.left, y: e.clientY - panelPos.top }
    setDragging(true)
  }

  const step = (direction: -1 | 1) => {
    if (cycleOptions.length === 0) return
    if (direction === 1) {
      if (index < 0) {
        onChange?.(cycleOptions[0]!.path)
        return
      }
      if (index >= cycleOptions.length - 1) {
        if (allowNone) onClear?.()
        return
      }
      onChange?.(cycleOptions[index + 1]!.path)
      return
    }
    if (index < 0) {
      onChange?.(cycleOptions[cycleOptions.length - 1]!.path)
      return
    }
    if (index === 0) {
      if (allowNone) onClear?.()
      return
    }
    onChange?.(cycleOptions[index - 1]!.path)
  }

  const pick = (path: string | null) => {
    if (path == null) onClear?.()
    else {
      onChange?.(path)
      pushRecent(path)
    }
    if (compact) {
      setOpen(false)
      setQuery('')
    }
  }

  const onListKeyDown = (e: ReactKeyboardEvent) => {
    if (!filtered.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      e.stopPropagation()
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      e.stopPropagation()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      const opt = filtered[activeIndex]
      if (opt) pick(opt.path)
    }
  }

  const stripPreview =
    selectedOption?.preview &&
    (previewKind === 'color' ||
      previewKind === 'auto' ||
      previewKind === 'space' ||
      previewKind === 'radius' ||
      previewKind === 'opacity' ||
      previewKind === 'size' ||
      previewKind === 'shadow' ||
      previewKind === 'type')

  const flatList = (
    <ul
      className="ds-token-picker__list"
      role="listbox"
      aria-label={ariaLabel}
      hidden={compact && !open}
    >
      {allowNone ? (
        <li>
          <button
            type="button"
            role="option"
            aria-selected={!value}
            className={cx('ds-token-picker__option', !value && 'ds-token-picker__option--selected')}
            onClick={() => pick(null)}
          >
            <span className="ds-token-picker__swatch ds-token-picker__swatch--empty" aria-hidden />
            <span className="ds-token-picker__path">{noneLabel}</span>
          </button>
        </li>
      ) : null}
      {options.map((opt) => {
        const selected = value === opt.path
        return (
          <li key={opt.path}>
            <button
              type="button"
              role="option"
              aria-selected={selected}
              className={cx(
                'ds-token-picker__option',
                selected && 'ds-token-picker__option--selected',
              )}
              onClick={() => pick(opt.path)}
            >
              {opt.preview ? (
                <span
                  className="ds-token-picker__swatch"
                  style={{ background: opt.preview }}
                  aria-hidden
                />
              ) : null}
              <span
                className={cx(
                  'ds-token-picker__path',
                  (opt.fontPreview || opt.sampleStyle) && 'ds-token-picker__path--font',
                )}
                style={optionTextStyle(opt)}
              >
                {opt.label ?? opt.path}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  const browserPanel =
    useBrowser && open && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={panelRef}
            className={cx(
              'ds-token-picker__browser',
              dragging && 'ds-token-picker__browser--dragging',
            )}
            style={{ top: panelPos.top, left: panelPos.left, width: PANEL_W }}
            role="dialog"
            aria-label={`${label} token browser`}
          >
            <div
              className="ds-token-picker__browser-header"
              onMouseDown={onHeaderDown}
              data-testid="token-picker-drag-header"
            >
              <div className="ds-token-picker__browser-title">
                <strong>{label}</strong>
                {contextTitle ? (
                  <span className="ds-token-picker__browser-context">{contextTitle}</span>
                ) : null}
              </div>
              <button
                type="button"
                className="ds-token-picker__browser-close"
                aria-label="Close"
                onClick={() => {
                  setOpen(false)
                  setQuery('')
                }}
              >
                ×
              </button>
            </div>
            <div className="ds-token-picker__browser-search">
              <input
                ref={searchRef}
                type="search"
                className="ds-token-picker__search"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKeyDown}
                aria-label="Search tokens"
                data-testid="token-picker-search"
              />
            </div>
            {scopes && scopes.length > 0 ? (
              <div className="ds-token-picker__scopes" role="tablist" aria-label="Token scopes">
                {scopes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={activeScope === s.id}
                    className={cx(
                      'ds-token-picker__scope',
                      activeScope === s.id && 'ds-token-picker__scope--active',
                    )}
                    onClick={() => setScope(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ) : null}
            {recentPaths.length > 0 && !query ? (
              <div className="ds-token-picker__recent">
                <span className="ds-token-picker__recent-label">Recent</span>
                <div className="ds-token-picker__recent-chips">
                  {recentPaths.map((p) => {
                    const opt = options.find((o) => o.path === p)
                    if (!opt) return null
                    return (
                      <button
                        key={p}
                        type="button"
                        className="ds-token-picker__recent-chip"
                        onClick={() => pick(p)}
                      >
                        {opt.preview && previewKind === 'color' ? (
                          <TokenPreview kind="color" value={opt.preview} size="sm" />
                        ) : null}
                        <span>{opt.label ?? opt.path}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
            <div
              id={listId}
              className={cx(
                'ds-token-picker__browser-body',
                colorGrid && 'ds-token-picker__browser-body--grid',
              )}
              role="listbox"
              aria-label={ariaLabel}
            >
              {filtered.length === 0 ? (
                <p className="ds-token-picker__empty-msg">No matching tokens</p>
              ) : colorGrid ? (
                filtered.map((opt, i) => (
                  <button
                    key={opt.path}
                    type="button"
                    role="option"
                    aria-selected={opt.path === value}
                    aria-label={`${opt.path} — ${opt.label ?? opt.path}`}
                    title={`${opt.path} — ${opt.label ?? opt.path}`}
                    className={cx(
                      'ds-token-picker__swatch-btn',
                      opt.path === value && 'ds-token-picker__swatch-btn--active',
                      i === activeIndex && 'ds-token-picker__swatch-btn--highlight',
                    )}
                    style={{ background: opt.preview }}
                    onClick={() => pick(opt.path)}
                    onMouseEnter={() => setActiveIndex(i)}
                  />
                ))
              ) : (
                filtered.map((opt, i) => {
                  const selected = value === opt.path
                  const highlight = i === activeIndex
                  return (
                    <button
                      key={opt.path}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cx(
                        'ds-token-picker__option',
                        selected && 'ds-token-picker__option--selected',
                        highlight && 'ds-token-picker__option--highlight',
                      )}
                      onClick={() => pick(opt.path)}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      {opt.preview ? (
                        <TokenPreview kind={previewKind} value={opt.preview} size="sm" />
                      ) : null}
                      <span
                        className={cx(
                          'ds-token-picker__path',
                          (opt.fontPreview || opt.sampleStyle) && 'ds-token-picker__path--font',
                        )}
                        style={optionTextStyle(opt)}
                      >
                        {opt.label ?? opt.path}
                      </span>
                    </button>
                  )
                })
              )}
            </div>
            {allowNone && onClear ? (
              <div className="ds-token-picker__browser-footer">
                <button
                  type="button"
                  role="option"
                  aria-selected={!value}
                  className={cx(
                    'ds-token-picker__option',
                    !value && 'ds-token-picker__option--selected',
                  )}
                  onClick={() => pick(null)}
                >
                  <span className="ds-token-picker__swatch ds-token-picker__swatch--empty" aria-hidden />
                  <span className="ds-token-picker__path">{noneLabel}</span>
                </button>
              </div>
            ) : null}
          </div>,
          document.body,
        )
      : null

  return (
    <div
      ref={rootRef}
      className={cx(
        'ds-token-picker',
        compact ? 'ds-token-picker--compact' : 'ds-token-picker--list',
        useBrowser && 'ds-token-picker--browser',
        compact && open && 'ds-token-picker--open',
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      <div className="ds-token-picker__label">
        {icon != null ? (
          <span className="ds-token-picker__icon" aria-hidden>
            {icon}
          </span>
        ) : null}
        {label}
      </div>

      <div className="ds-token-picker__current">
        <button
          ref={triggerRef}
          type="button"
          className="ds-token-picker__trigger"
          data-testid="token-picker-trigger"
          aria-expanded={compact ? open : undefined}
          aria-haspopup={compact ? 'listbox' : undefined}
          aria-label={label}
          onClick={() => {
            if (compact) {
              setOpen((next) => {
                const opening = !next
                if (opening && useBrowser) placePanel()
                return opening
              })
            }
          }}
        >
          {selectedOption?.preview ? (
            stripPreview && previewKind !== 'auto' && previewKind !== 'color' ? (
              <TokenPreview kind={previewKind} value={selectedOption.preview} size="sm" />
            ) : (
              <span
                className="ds-token-picker__swatch"
                style={{ background: selectedOption.preview }}
                aria-hidden
              />
            )
          ) : null}
          <span
            className={cx(
              'ds-token-picker__path',
              !value && 'ds-token-picker__path--empty',
              fontPreview && 'ds-token-picker__path--font',
            )}
            style={valueStyle}
            data-testid="token-picker-value"
          >
            {displayText}
          </span>
        </button>
        {allowCycle ? (
          <span className="ds-token-picker__cycle">
            <button
              type="button"
              className="ds-token-picker__cycle-btn"
              aria-label={prevLabel}
              onClick={() => step(-1)}
            >
              −
            </button>
            <button
              type="button"
              className="ds-token-picker__cycle-btn"
              aria-label={nextLabel}
              onClick={() => step(1)}
            >
              +
            </button>
          </span>
        ) : null}
        {showClear ? (
          <button
            type="button"
            className="ds-token-picker__clear"
            aria-label={clearLabel}
            onClick={() => onClear?.()}
          >
            ×
          </button>
        ) : null}
      </div>

      {useBrowser ? browserPanel : flatList}
    </div>
  )
}
