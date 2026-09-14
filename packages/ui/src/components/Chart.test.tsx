import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Chart } from './Chart'

describe('Chart', () => {
  it('renders bar chart with accessible table fallback', () => {
    render(
      <Chart
        title="Apps"
        data={[
          { label: 'A', value: 2 },
          { label: 'B', value: 5 },
        ]}
      />,
    )
    expect(screen.getByRole('img', { name: 'Apps' })).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(document.querySelectorAll('.ds-chart__bar')).toHaveLength(2)
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
})
