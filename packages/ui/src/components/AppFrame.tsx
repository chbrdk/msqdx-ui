import type { HTMLAttributes, ReactNode } from 'react'
import { ShellCorners } from './ShellCorners'

export type AppFrameRailEdge = 'left' | 'right' | 'top' | 'bottom'

export type AppFrameProps = {
  children: ReactNode
  rail?: ReactNode
  brandCorner?: ReactNode
  topbar?: ReactNode
  railEdge?: AppFrameRailEdge
  /** Viewport cutdowns at TL / BL / BR (TR reserved for brand corner). Default on. */
  shellCorners?: boolean
  shellCornerRadius?: number
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
  shellCorners = true,
  shellCornerRadius = 32,
  className,
  ...rest
}: AppFrameProps) {
  return (
    <main className={cx('app-frame', className)} data-rail-edge={railEdge} {...rest}>
      <div className="atmosphere" aria-hidden />
      {shellCorners ? <ShellCorners borderRadius={shellCornerRadius} /> : null}
      {brandCorner}
      {rail}
      <div className="app-main">
        {topbar ? <header className="topbar">{topbar}</header> : null}
        <div className="page-body">{children}</div>
      </div>
    </main>
  )
}
