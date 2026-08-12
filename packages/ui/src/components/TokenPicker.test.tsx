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
})
