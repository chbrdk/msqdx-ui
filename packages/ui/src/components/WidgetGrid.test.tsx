import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WidgetGrid } from './WidgetGrid'

describe('WidgetGrid', () => {
  it('places items with span data attrs', () => {
    render(
      <WidgetGrid columns={12}>
        <WidgetGrid.Item colSpan={8} rowSpan={2}>
          Wide
        </WidgetGrid.Item>
        <WidgetGrid.Item colSpan={4}>Narrow</WidgetGrid.Item>
      </WidgetGrid>,
    )
    expect(screen.getByText('Wide').closest('[data-col-span="8"]')).toBeTruthy()
    expect(screen.getByText('Narrow').closest('[data-col-span="4"]')).toBeTruthy()
    expect(document.querySelector('.ds-widget-grid')?.getAttribute('data-columns')).toBe('12')
  })
})
