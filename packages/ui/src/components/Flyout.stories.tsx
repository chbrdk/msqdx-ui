import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flyout } from './Flyout'
import { IconShare } from './icons'
import { SectionChrome } from '../SectionChrome'
import { Button } from './Button'

const meta = {
  title: 'Molecules/Flyout',
  component: Flyout,
} satisfies Meta<typeof Flyout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '2rem', minHeight: '12rem' }}>
      <Flyout label="Share" icon={<IconShare />}>
        {({ close }) => (
          <>
            <SectionChrome quiet title="Share" as="h3" />
            <p style={{ margin: '0.35rem 0 0.75rem' }}>
              Frosted panel only — no page overlay.
            </p>
            <Button type="button" size="sm" onClick={close}>
              Close
            </Button>
          </>
        )}
      </Flyout>
    </div>
  ),
}
