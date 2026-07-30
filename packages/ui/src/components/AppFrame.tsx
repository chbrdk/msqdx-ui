import type { HTMLAttributes, ReactNode } from 'react'

export type AppFrameRailEdge = 'left' | 'right' | 'top' | 'bottom'

export type AppFrameProps = {
  children: ReactNode
  rail?: ReactNode
  brandCorner?: ReactNode
  topbar?: ReactNode
  railEdge?: AppFrameRailEdge
  className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function AppFrame({
  children,
  rail,
  brandCorner,
  topbar,
  railEdge = 'left',
  className,
  ...rest
}: AppFrameProps) {
  return (
    <main className={cx('app-frame', className)} data-rail-edge={railEdge} {...rest}>
      <div className="atmosphere" aria-hidden />
      {brandCorner}
      {rail}
      <div className="app-main">
        {topbar ? <header className="topbar">{topbar}</header> : null}
        <div className="page-body">{children}</div>
      </div>
    </main>
  )
}
