import type { HTMLAttributes, ImgHTMLAttributes } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarProps = {
  /** Visible name — used for initials + default aria-label */
  name?: string
  src?: string
  alt?: string
  size?: AvatarSize
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase()
}

/**
 * Avatar — image or initials fallback.
 * Spec: specs/domain/msqdx-ui-feedback-data.md
 */
export function Avatar({
  name = '',
  src,
  alt,
  size = 'sm',
  className,
  ...rest
}: AvatarProps) {
  const label = alt ?? (name ? name : 'Avatar')
  const imgProps: ImgHTMLAttributes<HTMLImageElement> | null = src
    ? { src, alt: label }
    : null

  return (
    <span
      className={cx('ds-avatar', `ds-avatar--${size}`, className)}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : label}
      {...rest}
    >
      {imgProps ? (
        <img className="ds-avatar-img" {...imgProps} />
      ) : (
        <span className="ds-avatar-initials" aria-hidden>
          {initialsFrom(name)}
        </span>
      )}
    </span>
  )
}
