import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPicker } from './TokenPicker'

const meta = {
  title: 'Organisms/TokenPicker',
  component: TokenPicker,
  args: {
    value: 'color.accent',
    options: [
      { path: 'color.accent', preview: '#224455', label: 'color.accent' },
      { path: 'color.muted', preview: '#666666', label: 'color.muted' },
      { path: 'space.md', label: 'space.md' },
    ],
  },
} satisfies Meta<typeof TokenPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
