import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { FieldWell, FieldWellStack } from './FieldWell'

afterEach(() => {
  cleanup()
})

describe('FieldWell', () => {
  it('renders role, hint, and bound data attribute', () => {
    render(
      <FieldWell role="Category" hint="Pick a column" bound>
        <input aria-label="category bind" />
      </FieldWell>,
    )
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Pick a column')).toBeInTheDocument()
    expect(screen.getByTestId('field-well')).toHaveAttribute('data-bound', 'true')
    expect(screen.getByTestId('field-well').className).toContain('ds-field-well--bound')
  })

  it('marks empty wells', () => {
    render(
      <FieldWell role="Value">
        <span>control</span>
      </FieldWell>,
    )
    expect(screen.getByTestId('field-well')).toHaveAttribute('data-bound', 'false')
    expect(screen.getByTestId('field-well').className).toContain('ds-field-well--empty')
  })
})

describe('FieldWellStack', () => {
  it('renders stack chrome', () => {
    render(
      <FieldWellStack>
        <FieldWell role="Value">a</FieldWell>
      </FieldWellStack>,
    )
    expect(screen.getByTestId('field-well-stack').className).toContain('ds-field-well-stack')
  })
})
