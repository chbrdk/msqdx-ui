import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  args: {
    children: 'Card',
  },
  argTypes: {
    clipInset: { control: 'object' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Bottom edge slants down to the right (BL raised). */
export const BottomSlant: Story = {
  args: {
    clipInset: { bottomLeft: { y: '12%' } },
    style: {
      background: 'var(--surface-2, #e8eee9)',
      padding: '1.5rem',
      minHeight: '8rem',
    },
    children: 'Bottom slant — clipInset.bottomLeft.y = 12%',
  },
}
