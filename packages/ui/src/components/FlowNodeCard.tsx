import type { HTMLAttributes, ReactNode } from 'react'

export type FlowNodeRunState = 'idle' | 'active' | 'done' | 'skipped' | 'error'

export type FlowNodeCardProps = {
  kind: string
  kindLabel?: string
  nodeId?: string
  selected?: boolean
  runState?: FlowNodeRunState
  runStateB?: FlowNodeRunState
  hasOutput?: boolean
  /** App-owned target Handle(s). */
  targetHandle?: ReactNode
  /** App-owned source Handle(s). */
  sourceHandles?: ReactNode
  children?: ReactNode
  output?: ReactNode
  footer?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Magazine RF node card chrome — no xyflow dependency; handles via slots. */
export function FlowNodeCard({
  kind,
  kindLabel,
  nodeId,
  selected,
  runState = 'idle',
  runStateB = 'idle',
  hasOutput,
  targetHandle,
  sourceHandles,
  children,
  output,
  footer,
  className,
  ...rest
}: FlowNodeCardProps) {
  return (
    <div
      className={cx(
        'msqdx-flow-rf-node',
        `msqdx-flow-rf-node--${kind}`,
        `msqdx-flow-rf-node--run-${runState}`,
        runStateB !== 'idle' && `msqdx-flow-rf-node--run-b-${runStateB}`,
        hasOutput && 'has-output',
        selected && 'is-selected',
        className
      )}
      data-kind={kind}
      data-run={runState}
      {...rest}
    >
      {targetHandle}
      <header className="msqdx-flow-rf-node-head">
        <span className="msqdx-flow-rf-node-kind">{kindLabel ?? kind}</span>
        <span className="msqdx-flow-rf-node-run" data-run={runState}>
          {runState === 'idle' ? '' : runState}
        </span>
        {nodeId ? (
          <span className="msqdx-flow-rf-node-id" title={nodeId}>
            {nodeId}
          </span>
        ) : null}
      </header>
      <div className="msqdx-flow-rf-node-body">{children}</div>
      {output ? <div className="msqdx-flow-rf-output">{output}</div> : null}
      {footer ? <div className="msqdx-flow-rf-footer">{footer}</div> : null}
      {sourceHandles}
    </div>
  )
}
