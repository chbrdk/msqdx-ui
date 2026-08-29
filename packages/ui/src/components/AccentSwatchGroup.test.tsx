import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AccentSwatchGroup } from './AccentSwatchGroup'
import {
  applyAccentPreference,
  migrateLegacyAccent,
  resolveAccentOption,
} from '../accentPreference'

describe('AccentSwatchGroup', () => {
  it('fires onChange for a swatch', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<AccentSwatchGroup value="green" onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'purple' }))
    expect(onChange).toHaveBeenCalledWith('purple')
  })
})

describe('accentPreference', () => {
  it('migrates legacy CSS vars', () => {
    expect(migrateLegacyAccent('--color-secondary-dx-purple')).toBe('purple')
    expect(migrateLegacyAccent('--audion-light-border-color')).toBe('ink')
    expect(migrateLegacyAccent('blue')).toBe('blue')
    expect(migrateLegacyAccent(null)).toBe('green')
  })

  it('applies --accent on documentElement', () => {
    applyAccentPreference('orange')
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#ff6a3b')
    expect(document.documentElement.getAttribute('data-accent')).toBe('orange')
    expect(resolveAccentOption('orange').textColor).toBe('#ffffff')
  })
})
