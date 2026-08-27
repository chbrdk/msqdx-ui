'use client'

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { MsqdxCornerBox } from '../brand/MsqdxCornerBox'
import {
  MSQDX_SHELL_CORNER_RADIUS,
  TOP_LEFT_BACK_CORNERS,
  type CornerKey,
  type CornerStyle,
} from '../brand/msqdxCutdown'
import { IconArrowLeft } from './icons'

export type ShellBackButtonProps = {
  /** Accessible name — required for the icon-only control. */
  label?: string
  /** Leading icon override (default `IconArrowLeft`). */
  icon?: ReactNode
  borderRadius?: number
  corners?: Record<CornerKey, CornerStyle>
  className?: string
  disabled?: boolean
} & (
  | ({
      href?: undefined
      onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
    } & Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'children' | 'onClick' | 'disabled' | 'type'
    >)
  | ({
      href: string
      onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
    } & Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'className' | 'children' | 'onClick' | 'href'
    >)
)

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Fixed top-left shell history-back plaque — mirror of BrandCorner.
 * Spec: specs/domain/msqdx-ui-shell-back-button.md
 */
export function ShellBackButton({
  label = 'Back',
  icon,
  borderRadius = MSQDX_SHELL_CORNER_RADIUS,
  corners = TOP_LEFT_BACK_CORNERS,
  className,
  disabled,
  ...rest
}: ShellBackButtonProps) {
  const mark = icon ?? <IconArrowLeft size={18} strokeWidth={2} aria-hidden />
  const href = 'href' in rest ? rest.href : undefined

  const control = href ? (
    <a
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      href={href}
      className="shell-back-corner-btn"
      aria-label={label}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault()
          return
        }
        rest.onClick?.(event)
      }}
    >
      {mark}
    </a>
  ) : (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className="shell-back-corner-btn"
      aria-label={label}
      disabled={disabled}
    >
      {mark}
    </button>
  )

  return (
    <div
      className={cx('shell-back-corner', className)}
      data-testid="shell-back-corner"
    >
      <MsqdxCornerBox
        className="shell-back-corner-box"
        borderRadius={borderRadius}
        topLeft={corners.topLeft}
        topRight={corners.topRight}
        bottomLeft={corners.bottomLeft}
        bottomRight={corners.bottomRight}
      >
        {control}
      </MsqdxCornerBox>
    </div>
  )
}
