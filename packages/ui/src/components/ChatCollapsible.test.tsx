import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatCollapsible } from './ChatCollapsible'

describe('ChatCollapsible', () => {
  it('toggles body on click', () => {
    render(
      <ChatCollapsible title="Details">
        <p>Hidden body</p>
      </ChatCollapsible>,
    )
    expect(screen.queryByText('Hidden body')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Details/ }))
    expect(screen.getByText('Hidden body')).toBeInTheDocument()
  })
})
