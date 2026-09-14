import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chart } from './Chart'

const sample = [
  { label: 'Mon', value: 4 },
  { label: 'Tue', value: 7 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 9 },
  { label: 'Fri', value: 6 },
]

const meta = {
  title: 'Molecules/Chart',
  component: Chart,
  args: {
    data: sample,
    title: 'Applications / day',
  },
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = { args: { variant: 'bar' } }
export const Line: Story = { args: { variant: 'line' } }
export const Empty: Story = { args: { data: [], title: 'No data' } }
