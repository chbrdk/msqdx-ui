'use client'

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

export type TooltipProps = {
  content: ReactNode
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children' | 'content'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

const VIEWPORT_PAD = 8
const ANCHOR_GAP = 2

const fixedBase: CSSProperties = {
  position: 'fixed',
  right: 'auto',
  bottom: 'auto',
  transform: 'none',
}

/** Hover/focus tooltip — specs/domain/msqdx-ui-extended.md */
export function Tooltip({ content, children, className, ...rest }: TooltipProps) {
  const tipId = useId()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)

  function show() {
    setOpen(true)
  }
  function hide() {
    setOpen(false)
    setCoords(null)
  }

  function place() {
    const anchorEl = anchorRef.current
    const bubble = bubbleRef.current
    if (!anchorEl || !bubble || typeof window === 'undefined') return

    const anchor = anchorEl.getBoundingClientRect()
    const tipRect = bubble.getBoundingClientRect()
    const tipW = tipRect.width || bubble.offsetWidth || bubble.scrollWidth
    const tipH = tipRect.height || bubble.offsetHeight || bubble.scrollHeight
    if (tipW <= 0 || tipH <= 0) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    let left = anchor.left + anchor.width / 2 - tipW / 2
    let top = anchor.top - tipH - ANCHOR_GAP

    left = Math.min(Math.max(VIEWPORT_PAD, left), Math.max(VIEWPORT_PAD, vw - tipW - VIEWPORT_PAD))

    if (top < VIEWPORT_PAD) {
      top = anchor.bottom + ANCHOR_GAP
    }
    top = Math.min(Math.max(VIEWPORT_PAD, top), Math.max(VIEWPORT_PAD, vh - tipH - VIEWPORT_PAD))

    setCoords({ top, left })
  }

  useLayoutEffect(() => {
    if (!open) return
    place()
    const raf = requestAnimationFrame(() => place())
    const onReposition = () => place()
    window.addEventListener('scroll', onReposition, true)
    window.addEventListener('resize', onReposition)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onReposition, true)
      window.removeEventListener('resize', onReposition)
    }
  }, [open, content])

  const bubbleStyle: CSSProperties = coords
    ? {
        ...fixedBase,
        top: coords.top,
        left: coords.left,
        visibility: 'visible',
      }
    : {
        ...fixedBase,
        top: 0,
        left: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      }

  return (
    <span
      className={cx('ds-tooltip', open && 'ds-tooltip--open', className)}
      {...rest}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={(e: FocusEvent<HTMLSpanElement>) => {
        show()
        rest.onFocus?.(e)
      }}
      onBlur={(e: FocusEvent<HTMLSpanElement>) => {
        hide()
        rest.onBlur?.(e)
      }}
    >
      <span
        ref={anchorRef}
        className="ds-tooltip-anchor"
        aria-describedby={open ? tipId : undefined}
      >
        {children}
      </span>
      {open ? (
        <span
          ref={bubbleRef}
          id={tipId}
          role="tooltip"
          className="ds-tooltip-bubble"
          style={bubbleStyle}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
