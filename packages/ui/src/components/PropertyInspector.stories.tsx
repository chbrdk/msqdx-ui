import type { Meta, StoryObj } from '@storybook/react-vite'
import { PropertyInspector } from './PropertyInspector'

const meta = {
  title: 'Organisms/PropertyInspector',
  component: PropertyInspector,
  args: {
    children: 'PropertyInspector',
  },
} satisfies Meta<typeof PropertyInspector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
