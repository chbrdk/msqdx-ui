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
const ANCHOR_GAP = 4

/** Hover/focus tooltip — specs/domain/msqdx-ui-extended.md */
export function Tooltip({ content, children, className, ...rest }: TooltipProps) {
  const tipId = useId()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)
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
    const root = rootRef.current
    const bubble = bubbleRef.current
    if (!root || !bubble || typeof window === 'undefined') return

    const anchor = root.getBoundingClientRect()
    const tip = bubble.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const tipW = tip.width || bubble.offsetWidth
    const tipH = tip.height || bubble.offsetHeight

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
    const onReposition = () => place()
    window.addEventListener('scroll', onReposition, true)
    window.addEventListener('resize', onReposition)
    return () => {
      window.removeEventListener('scroll', onReposition, true)
      window.removeEventListener('resize', onReposition)
    }
  }, [open, content])

  const bubbleStyle: CSSProperties = coords
    ? {
        position: 'fixed',
        top: coords.top,
        left: coords.left,
        right: 'auto',
        bottom: 'auto',
        transform: 'none',
        visibility: 'visible',
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      }

  return (
    <span
      ref={rootRef}
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
      <span className="ds-tooltip-anchor" aria-describedby={open ? tipId : undefined}>
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
