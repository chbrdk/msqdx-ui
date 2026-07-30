import type { TextareaHTMLAttributes } from 'react'
import type { FieldSize } from './Field'

export type TextareaProps = {
  size?: FieldSize
  block?: boolean
  className?: string
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Multiline text — same face as Input · Field family */
export function Textarea({
  size = 'sm',
  block = false,
  className,
  rows = 3,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cx(
        'ds-textarea',
        'ds-input',
        `ds-textarea--${size}`,
        `ds-input--${size}`,
        block && 'ds-textarea--block',
        block && 'ds-input--block',
        className,
      )}
      {...rest}
    />
  )
}
