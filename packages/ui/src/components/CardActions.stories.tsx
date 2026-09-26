import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { CardActions } from './CardActions'

const meta = {
  title: 'Molecules/CardActions',
  component: CardActions,
} satisfies Meta<typeof CardActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: '22rem', border: '1px solid var(--line)', padding: '1rem' }}>
      <CardActions>
        <Button variant="ghost">Open</Button>
        <Button variant="ghost">Edit</Button>
        <Button variant="ghost">Delete</Button>
      </CardActions>
    </div>
  ),
}

export const WithoutHairline: Story = {
  render: () => (
    <div style={{ width: '18rem', border: '1px solid var(--line)', padding: '1rem' }}>
      <CardActions hairline={false}>
        <Button variant="ghost" size="sm">
          Open
        </Button>
        <Button variant="primary" size="sm">
          Start chat
        </Button>
      </CardActions>
    </div>
  ),
}

/** Crowded DE labels — Open must stay clickable (no neighbor overflow). */
export const CrowdedGermanLabels: Story = {
  render: () => (
    <div style={{ width: '22rem', border: '1px solid var(--line)', padding: '1rem' }}>
      <CardActions>
        <Button variant="ghost">Öffnen</Button>
        <Button variant="ghost">Bearbeiten</Button>
        <Button variant="ghost">Archivieren</Button>
        <Button variant="ghost">Zu Plexon syncen</Button>
      </CardActions>
    </div>
  ),
}
