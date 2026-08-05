'use client'

import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'
import type { FlowNodeRunState } from './FlowNodeCard'

export type FlowInspectorSection = {
  id: string
  title: string
  meta?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

export type FlowInspectorShellProps = {
  kind?: string
  kindLabel?: string
  title: string
  nodeId?: string
  runState?: FlowNodeRunState
  badges?: ReactNode
  onClose?: () => void
  sections: FlowInspectorSection[]
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'title'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Inspector dock chrome — collapsible sections; domain content via slots. */
export function FlowInspectorShell({
  kind,
  kindLabel,
  title,
  nodeId,
  runState = 'idle',
  badges,
  onClose,
  sections,
  className,
  ...rest
}: FlowInspectorShellProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const s of sections) init[s.id] = s.defaultOpen !== false
    return init
  })

  return (
    <div
      className={cx(
        'msqdx-flow-inspector-body',
        kind && `msqdx-flow-inspector-body--${kind}`,
        className
      )}
      {...rest}
    >
      <header className="msqdx-flow-inspector-head">
        <div className="msqdx-flow-inspector-head-main">
          {badges ? <div className="msqdx-flow-inspector-badges">{badges}</div> : null}
          <div className="msqdx-flow-inspector-meta">
            {kindLabel || kind ? (
              <span
                className={cx(
                  'msqdx-flow-inspector-kind',
                  kind && `msqdx-flow-inspector-kind--${kind}`
                )}
              >
                {kindLabel ?? kind}
              </span>
            ) : null}
            {runState !== 'idle' ? (
              <span
                className={cx(
                  'msqdx-flow-inspector-run',
                  `msqdx-flow-inspector-run--${runState}`
                )}
              >
                {runState}
              </span>
            ) : null}
          </div>
          <h2 className="msqdx-flow-inspector-title">{title}</h2>
          {nodeId ? <p className="msqdx-flow-inspector-id">{nodeId}</p> : null}
        </div>
        {onClose ? (
          <Button type="button" size="sm" variant="ghost" onClick={onClose} aria-label="Close">
            ×
          </Button>
        ) : null}
      </header>

      {sections.map((section) => {
        const isOpen = open[section.id] !== false
        return (
          <section
            key={section.id}
            className={cx(
              'msqdx-flow-inspector-section',
              section.id === 'gate' && 'msqdx-flow-inspector-section--gate',
              section.id === 'run' && 'msqdx-flow-inspector-section--run'
            )}
          >
            <button
              type="button"
              className="msqdx-flow-inspector-section-toggle"
              aria-expanded={isOpen}
              onClick={() => setOpen((prev) => ({ ...prev, [section.id]: !isOpen }))}
            >
              <span className="msqdx-flow-inspector-section-title">{section.title}</span>
              {section.meta ? (
                <span className="msqdx-flow-inspector-section-meta">{section.meta}</span>
              ) : null}
              <span className="msqdx-flow-inspector-chevron" aria-hidden>
                {isOpen ? '▾' : '▸'}
              </span>
            </button>
            {isOpen ? (
              <div className="msqdx-flow-inspector-section-body">{section.children}</div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
