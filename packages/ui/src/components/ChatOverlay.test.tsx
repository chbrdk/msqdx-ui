import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ChatOverlay } from './ChatOverlay'

afterEach(() => {
  cleanup()
})

describe('ChatOverlay', () => {
  it('renders nothing when closed', () => {
    render(
      <ChatOverlay open={false} onOpenChange={() => {}} title="Assistant">
        Body
      </ChatOverlay>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens dock-end sheet with dialog role', () => {
    render(
      <ChatOverlay open onOpenChange={() => {}} title="Assistant" placement="dock-end">
        Body
      </ChatOverlay>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('chat-overlay-sheet-dock-end')
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('uses center placement without dock-end class', () => {
    render(
      <ChatOverlay open onOpenChange={() => {}} title="Assistant" placement="center">
        Center body
      </ChatOverlay>,
    )
    expect(screen.getByRole('dialog')).not.toHaveClass('chat-overlay-sheet-dock-end')
  })

  it('closes on backdrop click and Esc', () => {
    const onOpenChange = vi.fn()
    const onClose = vi.fn()
    const { rerender } = render(
      <ChatOverlay open onOpenChange={onOpenChange} onClose={onClose} title="Assistant">
        Body
      </ChatOverlay>,
    )
    fireEvent.click(screen.getByLabelText('Close chat overlay'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalled()

    onOpenChange.mockClear()
    onClose.mockClear()
    rerender(
      <ChatOverlay open onOpenChange={onOpenChange} onClose={onClose} title="Assistant">
        Body
      </ChatOverlay>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalled()
  })

  it('closes from header control', () => {
    const onOpenChange = vi.fn()
    render(
      <ChatOverlay open onOpenChange={onOpenChange} title="Assistant">
        Body
      </ChatOverlay>,
    )
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
