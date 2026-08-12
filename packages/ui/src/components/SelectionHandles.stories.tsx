import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectionHandles } from './SelectionHandles'

const meta = {
  title: 'Organisms/SelectionHandles',
  component: SelectionHandles,
  args: {
    children: 'SelectionHandles',
  },
} satisfies Meta<typeof SelectionHandles>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
