import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TokenPicker } from './TokenPicker'

afterEach(() => {
  cleanup()
})

describe('TokenPicker', () => {
  it('renders options and selects a token path', () => {
    const onChange = vi.fn()
    render(
      <TokenPicker
        options={[{ path: 'color.accent', preview: '#245' }]}
        onChange={onChange}
        variant="list"
      />,
    )
    expect(screen.getByRole('option', { name: /color.accent/ })).toBeInTheDocument()
    screen.getByRole('option', { name: /color.accent/ }).click()
    expect(onChange).toHaveBeenCalledWith('color.accent')
  })

  it('shows current path and clear affordance', () => {
    const onClear = vi.fn()
    render(
      <TokenPicker
        options={[{ path: 'color.accent', preview: '#245' }]}
        value="color.accent"
        onClear={onClear}
        clearLabel="Clear token"
      />,
    )
    expect(screen.getByTestId('token-picker-value')).toHaveTextContent('color.accent')
    screen.getByRole('button', { name: 'Clear token' }).click()
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('allowNone option invokes onClear', () => {
    const onClear = vi.fn()
    render(
      <TokenPicker
        options={[{ path: 'radius.md' }]}
        value="radius.md"
        allowNone
        noneLabel="None"
        onClear={onClear}
        variant="list"
      />,
    )
    screen.getByRole('option', { name: 'None' }).click()
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('renders an optional label icon', () => {
    render(
      <TokenPicker
        label="Fill"
        icon={<span data-testid="token-icon">F</span>}
        options={[{ path: 'color.accent' }]}
      />,
    )
    expect(screen.getByTestId('token-icon')).toBeInTheDocument()
    expect(screen.getByText('Fill')).toBeInTheDocument()
  })

  it('does not render a free-text CSS input', () => {
    const { container } = render(
      <TokenPicker options={[{ path: 'color.accent' }]} value="color.accent" />,
    )
    expect(container.querySelector('input')).toBeNull()
    expect(container.querySelector('textarea')).toBeNull()
  })

  it('cycles prev/next through options when allowCycle', () => {
    const onChange = vi.fn()
    const onClear = vi.fn()
    const options = [
      { path: 'radius.sm' },
      { path: 'radius.md' },
      { path: 'radius.lg' },
    ]
    const { rerender } = render(
      <TokenPicker
        options={options}
        value="radius.md"
        onChange={onChange}
        onClear={onClear}
        allowCycle
        allowNone
      />,
    )
    screen.getByRole('button', { name: 'Next token' }).click()
    expect(onChange).toHaveBeenCalledWith('radius.lg')
    screen.getByRole('button', { name: 'Previous token' }).click()
    expect(onChange).toHaveBeenCalledWith('radius.sm')

    rerender(
      <TokenPicker
        options={options}
        value="radius.sm"
        onChange={onChange}
        onClear={onClear}
        allowCycle
        allowNone
      />,
    )
    screen.getByRole('button', { name: 'Previous token' }).click()
    expect(onClear).toHaveBeenCalled()
  })

  it('compact variant hides the list until the strip is opened', () => {
    const onChange = vi.fn()
    render(
      <TokenPicker
        label="Radius"
        options={[{ path: 'radius.md' }, { path: 'radius.lg' }]}
        value="radius.md"
        onChange={onChange}
      />,
    )
    expect(screen.queryByRole('option', { name: /radius.lg/ })).toBeNull()
    expect(document.querySelector('.ds-token-picker--compact')).not.toBeNull()
    fireEvent.click(screen.getByTestId('token-picker-trigger'))
    expect(screen.getByRole('option', { name: /radius.lg/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('option', { name: /radius.lg/ }))
    expect(onChange).toHaveBeenCalledWith('radius.lg')
    expect(screen.queryByRole('option', { name: /radius.lg/ })).toBeNull()
  })

  it('empty strip shows emptyLabel, not noneLabel', () => {
    render(
      <TokenPicker
        options={[{ path: 'fontFamily.sans', label: 'Sans' }]}
        value={null}
        allowNone
        noneLabel="Clear token"
        emptyLabel="—"
      />,
    )
    expect(screen.getByTestId('token-picker-value')).toHaveTextContent('—')
    expect(screen.getByTestId('token-picker-value')).not.toHaveTextContent('Clear token')
  })

  it('bound strip shows option label, not the token path', () => {
    render(
      <TokenPicker
        options={[{ path: 'fontFamily.sans', label: 'Sans' }]}
        value="fontFamily.sans"
      />,
    )
    expect(screen.getByTestId('token-picker-value')).toHaveTextContent('Sans')
    expect(screen.getByTestId('token-picker-value')).not.toHaveTextContent('fontFamily.sans')
  })

  it('fontPreview applies font-family on the value label', () => {
    render(
      <TokenPicker
        options={[
          {
            path: 'fontFamily.serif',
            label: 'Serif',
            fontPreview: 'Georgia, serif',
          },
        ]}
        value="fontFamily.serif"
      />,
    )
    expect(screen.getByTestId('token-picker-value')).toHaveStyle({ fontFamily: 'Georgia, serif' })
  })

  it('sampleStyle applies font-weight on the value label', () => {
    render(
      <TokenPicker
        options={[{ path: 'fontWeight.semibold', label: 'Semibold', sampleStyle: { fontWeight: '600' } }]}
        value="fontWeight.semibold"
      />,
    )
    expect(screen.getByTestId('token-picker-value')).toHaveStyle({ fontWeight: '600' })
  })

  it('current strip uses magazine ink tokens, not a grey well', () => {
    const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../css/components.css'), 'utf8')
    const start = css.indexOf('.ds-token-picker__current {')
    const block = css.slice(start, start + 420)
    expect(block).toContain('background: transparent')
    expect(block).toContain('color: var(--ink)')
    expect(block).toContain('border-bottom: 1px solid var(--ink)')
    expect(block).not.toContain('#f7f7f7')
    expect(css).not.toContain('color: var(--fg, #111)')
    const tokens = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../css/tokens.css'), 'utf8')
    expect(tokens).toContain('--surface-1: var(--bg1)')
    expect(tokens).toContain('--border: var(--line)')
  })
})
