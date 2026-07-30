import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup } from './ToggleGroup'

const meta = {
  title: 'Molecules/ToggleGroup',
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (<ToggleGroup aria-label="View" value="all" onChange={() => {}} options={[{ value: "all", label: "All" }, { value: "active", label: "Active" }]} />),
}
