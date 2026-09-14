import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Chart, formatChartValue } from './Chart'

describe('formatChartValue', () => {
  it('keeps integers clean and trims long floats', () => {
    expect(formatChartValue(72)).toBe('72')
    expect(formatChartValue(52.936614583333345)).toBe('52.9')
    expect(formatChartValue(0.125)).toBe('0.13')
  })
})

describe('Chart', () => {
  it('renders visible legend labels and value ticks', () => {
    render(
      <Chart
        title="Apps"
        data={[
          { label: 'Hired', value: 2 },
          { label: 'Rejected', value: 5 },
        ]}
      />,
    )
    expect(screen.getByRole('img', { name: 'Apps' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Category' })).toBeInTheDocument()
    expect(screen.getAllByText('Hired').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Rejected').length).toBeGreaterThanOrEqual(1)
    expect(document.querySelectorAll('.ds-chart__bar')).toHaveLength(2)
    expect(document.querySelectorAll('.ds-chart__tick')).toHaveLength(2)
    expect(document.querySelectorAll('.ds-chart__value-label')).toHaveLength(2)
  })

  it('renders line polyline', () => {
    render(
      <Chart
        variant="line"
        data={[
          { label: 'A', value: 1 },
          { label: 'B', value: 3 },
        ]}
      />,
    )
    expect(document.querySelector('.ds-chart__line')).toBeTruthy()
    expect(document.querySelectorAll('.ds-chart__dot')).toHaveLength(2)
  })

  it('invokes onPointClick from bar group', () => {
    const onPointClick = vi.fn()
    const { container } = render(
      <Chart
        data={[
          { label: 'Hired', value: 2 },
          { label: 'Rejected', value: 1 },
        ]}
        onPointClick={onPointClick}
      />,
    )
    expect(container.querySelector('.ds-chart--interactive')).toBeTruthy()
    const barGroup = container.querySelector('.ds-chart__point')
    expect(barGroup).toBeTruthy()
    fireEvent.click(barGroup!)
    expect(onPointClick).toHaveBeenCalledWith({ label: 'Hired', value: 2 }, 0)
  })
})
