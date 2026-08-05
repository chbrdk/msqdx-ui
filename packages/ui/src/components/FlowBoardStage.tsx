'use client'

import { useEffect, type HTMLAttributes, type ReactNode } from 'react'

export type FlowBoardStageProps = {
  children?: ReactNode
  /** React Flow / canvas viewport (receives pointer events). */
  viewport?: ReactNode
  /** Floating docks / overlays. */
  overlays?: ReactNode
  /** Alert band above the stage. */
  alert?: ReactNode
  /** Toggle `body.msqdx-flow-board-active` while mounted. Default true. */
  active?: boolean
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Immersive magazine board stage — chrome only; apps own RF domain. */
export function FlowBoardStage({
  children,
  viewport,
  overlays,
  alert,
  active = true,
  className,
  ...rest
}: FlowBoardStageProps) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return
    document.body.classList.add('msqdx-flow-board-active')
    return () => {
      document.body.classList.remove('msqdx-flow-board-active')
    }
  }, [active])

  return (
    <div
      className={cx('msqdx-flow-canvas-shell', 'msqdx-flow-canvas-shell--immersive', className)}
      {...rest}
    >
      {alert ? <div className="msqdx-flow-board-alert">{alert}</div> : null}
      <div className="msqdx-flow-board-stage">
        {viewport ? (
          <div className="msqdx-flow-canvas-viewport msqdx-flow-canvas-viewport--fullscreen">
            {viewport}
          </div>
        ) : null}
        {overlays}
        {children}
      </div>
    </div>
  )
}
