import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'danger' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'
/** `square` = magazine default; `pill` = chat send; `rounded` = soft ops chrome. */
export type ButtonShape = 'square' | 'pill' | 'rounded' | 'default'

export type ButtonClassNameOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  block?: boolean
  className?: string
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Shared class builder for `<Button>` and link-styled anchors (`NextLink` / `<a>`). */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  shape = 'square',
  block = false,
  className,
}: ButtonClassNameOptions = {}): string {
  const resolvedShape = shape === 'default' ? 'square' : shape
  return cx(
    'ds-btn',
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    resolvedShape === 'square' && 'ds-btn--square',
    resolvedShape === 'pill' && 'ds-btn--pill',
    resolvedShape === 'rounded' && 'ds-btn--rounded',
    block && 'ds-btn--block',
    className,
  )
}

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
  /**
   * When set, renders an `<a>` with button classes (for external / plain links).
   * Prefer wrapping `<Link><Button /></Link>` for Next.js app routes when you need client prefetch.
   */
  href?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download'>

/**
 * Magazine button — square + md by default.
 * Spec: specs/domain/msqdx-ui-button.md
 */
export function Button({
  variant = 'primary',
  size = 'md',
  shape = 'square',
  icon,
  block = false,
  children,
  className,
  type = 'button',
  disabled,
  href,
  target,
  rel,
  download,
  ...rest
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, shape, block, className })
  const content = (
    <>
      {icon ? <span className="ds-btn__icon">{icon}</span> : null}
      {children != null ? <span className="ds-btn__label">{children}</span> : null}
    </>
  )

  if (href != null) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        download={download}
        aria-disabled={disabled || undefined}
        {...rest}
        {...(disabled ? { tabIndex: -1, onClick: (e) => e.preventDefault() } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  )
}
