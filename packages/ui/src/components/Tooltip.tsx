'use client'

import {
  useId,
  useState,
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

/** Hover/focus tooltip — specs/domain/msqdx-ui-extended.md */
export function Tooltip({ content, children, className, ...rest }: TooltipProps) {
  const tipId = useId()
  const [open, setOpen] = useState(false)

  function show() {
    setOpen(true)
  }
  function hide() {
    setOpen(false)
  }

  return (
    <span
      className={cx('ds-tooltip', open && 'ds-tooltip--open', className)}
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
      {...rest}
    >
      <span className="ds-tooltip-anchor" aria-describedby={open ? tipId : undefined}>
        {children}
      </span>
      {open ? (
        <span id={tipId} role="tooltip" className="ds-tooltip-bubble">
          {content}
        </span>
      ) : null}
    </span>
  )
}
