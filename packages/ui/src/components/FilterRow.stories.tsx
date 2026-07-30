import type { Meta, StoryObj } from '@storybook/react-vite'
import { narrowViewportGlobals } from '../storybook/viewports'
import { FilterRow } from './FilterRow'

const meta = {
  title: 'Molecules/FilterRow',
  component: FilterRow,
} satisfies Meta<typeof FilterRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (<FilterRow><button type="button">All</button><button type="button">Recent</button></FilterRow>),
}

export const Narrow: Story = {
  ...Default,
  globals: narrowViewportGlobals,
}
