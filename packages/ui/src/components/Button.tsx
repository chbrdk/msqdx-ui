import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'danger' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonShape = 'default' | 'pill'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  /** Optional leading icon */
  icon?: ReactNode
  /** Full-width in flex/grid parents */
  block?: boolean
  children?: ReactNode
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Design-system button — variants + sizes. CSS: design-system/css/button.css
 * Prefer `<Button>` over legacy `.ghost-btn` classnames.
 */
export function Button({
  variant = 'primary',
  size = 'sm',
  shape = 'default',
  icon,
  block = false,
  children,
  className,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        'ds-btn',
        `ds-btn--${variant}`,
        `ds-btn--${size}`,
        shape === 'pill' && 'ds-btn--pill',
        block && 'ds-btn--block',
        className,
      )}
      {...rest}
    >
      {icon ? <span className="ds-btn__icon">{icon}</span> : null}
      {children != null ? <span className="ds-btn__label">{children}</span> : null}
    </button>
  )
}
