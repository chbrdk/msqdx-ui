'use client'

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type StepStripProps = {
  children?: ReactNode
  header?: ReactNode
  hint?: ReactNode
  empty?: ReactNode
  /** Centers this card in the scroller when set */
  scrollToIndex?: number | null
  scrollerLabel?: string
  className?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

export type StepStripItemProps = {
  index: number
  children?: ReactNode
  selected?: boolean
  expanded?: boolean
  active?: boolean
  onActivate?: () => void
  /** Accessible name for the card */
  label: string
  className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'onClick' | 'onKeyDown'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Horizontal selectable step cards — specs/domain/msqdx-ui-step-strip.md */
export function StepStrip({
  children,
  header,
  hint,
  empty,
  scrollToIndex = null,
  scrollerLabel = 'Step cards',
  className,
  'aria-label': ariaLabel = 'Steps',
  ...rest
}: StepStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const hasItems = Boolean(children)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || scrollToIndex == null || scrollToIndex < 0) return
    const card = el.querySelector<HTMLElement>(`[data-step-index="${scrollToIndex}"]`)
    if (!card) return
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    }
  }, [scrollToIndex, children])

  if (!hasItems) {
    if (!empty) return null
    return (
      <section className={cx('ds-step-strip', className)} aria-label={ariaLabel} {...rest}>
        {header}
        {hint != null ? <div className="ds-step-strip-hint">{hint}</div> : null}
        <div className="ds-step-strip-empty">{empty}</div>
      </section>
    )
  }

  return (
    <section className={cx('ds-step-strip', className)} aria-label={ariaLabel} {...rest}>
      {header}
      {hint != null ? <div className="ds-step-strip-hint">{hint}</div> : null}
      <div
        className="ds-step-strip-scroller ds-scroll"
        ref={scrollerRef}
        tabIndex={0}
        aria-label={scrollerLabel}
      >
        {children}
      </div>
    </section>
  )
}

export function StepStripItem({
  index,
  children,
  selected = false,
  expanded = false,
  active = false,
  onActivate,
  label,
  className,
  ...rest
}: StepStripItemProps) {
  function activate() {
    onActivate?.()
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    activate()
  }

  function onClick(e: MouseEvent<HTMLElement>) {
    if (typeof window !== 'undefined' && window.getSelection()?.toString()) return
    const target = e.target as HTMLElement | null
    if (target?.closest('a, button, summary, details')) return
    activate()
  }

  return (
    <article
      className={cx(
        'ds-step-strip-item',
        selected && 'ds-step-strip-item--selected',
        expanded && 'ds-step-strip-item--expanded',
        active && 'ds-step-strip-item--active',
        className,
      )}
      data-step-index={index}
      aria-current={selected ? 'true' : active ? 'step' : undefined}
      aria-expanded={expanded}
      aria-pressed={selected}
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </article>
  )
}
