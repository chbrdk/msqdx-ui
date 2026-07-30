import type { ReactNode } from 'react'
import { Chip } from './Chip'
import type { ChipSize } from './Chip'

export type ToggleOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

export type ToggleGroupProps = {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  size?: ChipSize
  className?: string
  'aria-label'?: string
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Exclusive chip toggle (locale/theme) — specs/domain/msqdx-ui-foundation.md
 * Uses `<Chip>`; not a native radio group chrome.
 */
export function ToggleGroup({
  options,
  value,
  onChange,
  size = 'sm',
  className,
  'aria-label': ariaLabel,
}: ToggleGroupProps) {
  return (
    <div
      className={cx('ds-toggle-group', 'locale-toggle', 'ds-chip-row', className)}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <Chip
          key={opt.value}
          size={size}
          selected={value === opt.value}
          disabled={opt.disabled}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  )
}
