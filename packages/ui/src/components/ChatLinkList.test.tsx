import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatLinkList } from './ChatLinkList'

describe('ChatLinkList', () => {
  it('renders link labels and hrefs', () => {
    render(
      <ChatLinkList
        links={[
          { label: 'Dashboard', href: '/projects/demo' },
          { label: 'MSQDX', href: 'https://msqdx.com', external: true },
        ]}
      />,
    )
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/projects/demo')
    expect(screen.getByRole('link', { name: 'MSQDX' })).toHaveAttribute('href', 'https://msqdx.com')
  })
})
