import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from './Stack'

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
  args: {
    children: 'Stack',
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
