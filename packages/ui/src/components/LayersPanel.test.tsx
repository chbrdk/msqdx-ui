import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LayersPanel, type LayersPanelItem } from './LayersPanel'

afterEach(() => {
  cleanup()
})

const TREE: LayersPanelItem[] = [
  {
    id: 'root',
    label: 'Root',
    type: 'Stack',
    children: [
      { id: 'child', label: 'Child', type: 'Text' },
      {
        id: 'branch',
        label: 'Branch',
        type: 'Card',
        children: [{ id: 'leaf', label: 'Leaf', type: 'Button' }],
      },
    ],
  },
]

describe('LayersPanel', () => {
  it('renders items and selects via onSelect', () => {
    const onSelect = vi.fn()
    render(<LayersPanel items={TREE} selectedId="root" onSelect={onSelect} />)
    expect(screen.getByTestId('layers-panel')).toBeInTheDocument()
    expect(screen.getByTestId('layers-panel-item-child')).toBeInTheDocument()
    screen.getByTestId('layers-panel-item-child').click()
    expect(onSelect).toHaveBeenCalledWith('child')
  })

  it('marks selected row with aria-current', () => {
    render(<LayersPanel items={TREE} selectedId="child" />)
    expect(screen.getByTestId('layers-panel-item-child')).toHaveAttribute('aria-current', 'true')
    expect(screen.getByTestId('layers-panel-item-root')).not.toHaveAttribute('aria-current')
  })

  it('shows empty label when items is empty', () => {
    render(<LayersPanel items={[]} emptyLabel="No layers yet" />)
    expect(screen.getByText('No layers yet')).toBeInTheDocument()
  })

  it('collapses branch children via chevron', () => {
    render(<LayersPanel items={TREE} defaultExpanded />)
    expect(screen.getByTestId('layers-panel-item-leaf')).toBeInTheDocument()
    const branchBtn = screen.getByTestId('layers-panel-item-branch')
    const row = branchBtn.closest('.ds-layers-panel__row')
    expect(row).toBeTruthy()
    const chevron = within(row as HTMLElement).getByRole('button', { name: 'Collapse' })
    expect(chevron).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(chevron)
    expect(chevron).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByTestId('layers-panel-item-leaf')).toBeNull()
  })
})
