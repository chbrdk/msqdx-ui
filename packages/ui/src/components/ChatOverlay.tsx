'use client'

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export type ChatOverlayPlacement = 'dock-end' | 'center'

export type ChatOverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  /** Accessible name when title is visual-only / omitted */
  ariaLabel?: string
  placement?: ChatOverlayPlacement
  headerActions?: ReactNode
  children: ReactNode
  className?: string
  onClose?: () => void
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Domain-free chat flyout / overlay shell.
 * @see specs/domain/msqdx-ui-chat-overlay.md
 */
export function ChatOverlay({
  open,
  onOpenChange,
  title,
  ariaLabel,
  placement = 'dock-end',
  headerActions,
  children,
  className,
  onClose,
}: ChatOverlayProps) {
  const titleId = useId()
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const close = () => {
    onOpenChange(false)
    onClose?.()
  }

  useEffect(() => {
    if (!open) return
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const sheet = sheetRef.current
    const focusable = sheet?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()
    return () => {
      previousFocusRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
        onClose?.()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange, onClose])

  if (!open || typeof document === 'undefined') return null

  const label = ariaLabel || title || 'Chat'

  return createPortal(
    <div
      className={cx(
        'chat-overlay',
        placement === 'dock-end' && 'chat-overlay-dock-end',
        className,
      )}
      data-placement={placement}
    >
      <button
        type="button"
        className="chat-overlay-backdrop"
        aria-label="Close chat overlay"
        onClick={close}
      />
      <div
        ref={sheetRef}
        className={cx(
          'chat-overlay-sheet',
          placement === 'dock-end' && 'chat-overlay-sheet-dock-end',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : label}
        aria-labelledby={title ? titleId : undefined}
      >
        <div className="chat-panel-head chat-overlay-head">
          <div className="chat-overlay-head-start">
            {title ? (
              <h2 id={titleId} className="chat-overlay-title">
                {title}
              </h2>
            ) : null}
            {headerActions}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="chat-close"
            aria-label="Close"
            onClick={close}
          >
            ×
          </Button>
        </div>
        <div className="chat-overlay-body chat-panel chat-panel-compact">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
