'use client'

import { useState, type HTMLAttributes, type ReactNode } from 'react'

export type SchemaFieldType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any'

export type SchemaTreeNode = {
  id: string
  key: string
  path: string
  type: SchemaFieldType
  value?: string
  /** True when showing catalog shape without a run value yet. */
  schema?: boolean
  children?: SchemaTreeNode[]
}

export type SchemaTreeProps = {
  root: SchemaTreeNode | SchemaTreeNode[]
  onSelectPath?: (path: string) => void
  emptyLabel?: string
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function typeLabel(type: SchemaFieldType): string {
  return type
}

function SchemaTreeRow({
  node,
  depth,
  onSelectPath,
}: {
  node: SchemaTreeNode
  depth: number
  onSelectPath?: (path: string) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const [open, setOpen] = useState(depth < 2)
  const interactive = typeof onSelectPath === 'function'
  const hasValue = node.value != null && node.value !== '' && !node.schema

  const typeBadge = (
    <span className={cx('ds-schema-tree-type', `ds-schema-tree-type--${node.type}`)}>
      {typeLabel(node.type)}
    </span>
  )

  const body: ReactNode = (
    <>
      <span className="ds-schema-tree-key">{node.key}</span>
      {typeBadge}
      {hasValue ? <span className="ds-schema-tree-value">{node.value}</span> : null}
      {node.schema && !hasValue ? (
        <span className="ds-schema-tree-schema-tag">Schema</span>
      ) : null}
    </>
  )

  return (
    <li className={cx('ds-schema-tree-item', hasChildren && 'ds-schema-tree-item--branch')}>
      <div className="ds-schema-tree-row-wrap" style={{ paddingLeft: `${depth * 0.65}rem` }}>
        {hasChildren ? (
          <button
            type="button"
            className="ds-schema-tree-chevron"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="ds-schema-tree-chevron ds-schema-tree-chevron--spacer" aria-hidden />
        )}
        {interactive ? (
          <button
            type="button"
            className={cx(
              'ds-schema-tree-row',
              hasChildren && 'ds-schema-tree-row--object',
              node.schema && !hasValue && 'ds-schema-tree-row--schema'
            )}
            onClick={() => onSelectPath(node.path)}
          >
            {body}
          </button>
        ) : (
          <div
            className={cx(
              'ds-schema-tree-row',
              'ds-schema-tree-row--static',
              hasChildren && 'ds-schema-tree-row--object',
              node.schema && !hasValue && 'ds-schema-tree-row--schema'
            )}
          >
            {body}
          </div>
        )}
      </div>
      {hasChildren && open ? (
        <ul className="ds-schema-tree-children" role="group">
          {node.children!.map((child) => (
            <SchemaTreeRow key={child.id} node={child} depth={depth + 1} onSelectPath={onSelectPath} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

/** Nested schema browser for flow node INPUT/OUTPUT columns. */
export function SchemaTree({
  root,
  onSelectPath,
  emptyLabel = 'No schema',
  className,
  ...rest
}: SchemaTreeProps) {
  const roots = Array.isArray(root) ? root : [root]
  if (roots.length === 0) {
    return (
      <div className={cx('ds-schema-tree', 'ds-schema-tree--empty', className)} {...rest}>
        <p className="ds-schema-tree-empty">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div className={cx('ds-schema-tree', className)} {...rest}>
      <ul className="ds-schema-tree-list" role="list">
        {roots.map((node) => (
          <SchemaTreeRow key={node.id} node={node} depth={0} onSelectPath={onSelectPath} />
        ))}
      </ul>
    </div>
  )
}
