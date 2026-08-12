import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasViewport } from './CanvasViewport'
import { Text } from './Text'

const meta = {
  title: 'Organisms/CanvasViewport',
  component: CanvasViewport,
  args: {
    zoom: 1,
    artboardWidth: 640,
    artboardHeight: 400,
  },
  render: (args) => (
    <div style={{ height: 360 }}>
      <CanvasViewport {...args}>
        <div style={{ padding: 24 }}>
          <Text>Artboard content</Text>
        </div>
      </CanvasViewport>
    </div>
  ),
} satisfies Meta<typeof CanvasViewport>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
