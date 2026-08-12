import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type StackDirection = 'row' | 'column'
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type StackProps = {
  children?: ReactNode
  className?: string
  direction?: StackDirection
  gap?: StackGap
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Flex stack — CREATION composition layout (Zaoly `ds-stack`). */
export function Stack({
  children,
  className,
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap = false,
  style,
  ...rest
}: StackProps) {
  return (
    <div
      className={cx(
        'ds-stack',
        `ds-stack--${direction}`,
        `ds-stack--gap-${gap}`,
        wrap && 'ds-stack--wrap',
        className,
      )}
      style={{
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
