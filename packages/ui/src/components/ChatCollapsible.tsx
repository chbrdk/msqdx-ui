'use client'

import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'
import { Text } from './Text'

export type ChatCollapsibleProps = {
  title: string
  defaultOpen?: boolean
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'title'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Single disclosure for long assistant detail — specs/domain/msqdx-ui-chat-collapsible.md
 */
export function ChatCollapsible({
  title,
  defaultOpen = false,
  children,
  className,
  ...rest
}: ChatCollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cx('ds-chat-collapsible', open && 'is-open', className)} {...rest}>
      <Button
        type="button"
        variant="ghost"
        className="ds-chat-collapsible__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Text role="title" size="xl" as="span" className="ds-chat-collapsible__title">
          {title}
        </Text>
        <Text role="meta" as="span" aria-hidden>
          {open ? '▾' : '▸'}
        </Text>
      </Button>
      {open ? <div className="ds-chat-collapsible__body">{children}</div> : null}
    </div>
  )
}
