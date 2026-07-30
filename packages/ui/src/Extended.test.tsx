import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  Checkbox,
  Dialog,
  Divider,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  Tooltip,
  Button,
} from './index'

describe('Extended primitives', () => {
  it('Checkbox toggles', () => {
    const onChange = vi.fn()
    render(<Checkbox id="x" label="Opt" onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Opt'))
    expect(onChange).toHaveBeenCalled()
  })

  it('Switch flips aria-checked', () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Live" checked={false} onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole('switch', { name: 'Live' })
    expect(sw).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(sw)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('Tabs switches panels', () => {
    const onChange = vi.fn()
    render(
      <Tabs
        value="a"
        onChange={onChange}
        items={[
          { id: 'a', label: 'A', panel: 'Panel A' },
          { id: 'b', label: 'B', panel: 'Panel B' },
        ]}
      />,
    )
    expect(screen.getByText('Panel A')).toBeTruthy()
    fireEvent.click(screen.getByRole('tab', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('Divider / Skeleton / Spinner render', () => {
    const { container } = render(
      <>
        <Divider />
        <Skeleton width={40} />
        <Spinner label="Busy" />
      </>,
    )
    expect(container.querySelector('.ds-divider--horizontal')).toBeTruthy()
    expect(container.querySelector('.ds-skeleton')).toBeTruthy()
    expect(screen.getByRole('status', { name: 'Busy' })).toBeTruthy()
  })

  it('Tooltip opens on focus', () => {
    render(
      <Tooltip content="Tip text">
        <button type="button">Target</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByText('Target').parentElement!)
    expect(screen.getByRole('tooltip').textContent).toBe('Tip text')
  })

  it('Dialog showModal when open', () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <Dialog open={false} onClose={onClose} title="T">
        Body
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
    rerender(
      <Dialog open onClose={onClose} title="T">
        Body
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText('Body')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})
