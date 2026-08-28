import type { Meta, StoryObj } from '@storybook/react-vite'
import { Hint } from './Hint'
import { ToggleGroup } from './ToggleGroup'
import { SettingsBand, SettingsShell } from './SettingsShell'
import { Text } from './Text'

const meta = {
  title: 'Organisms/SettingsShell',
  component: SettingsShell,
} satisfies Meta<typeof SettingsShell>

export default meta
type Story = StoryObj<typeof meta>

export const MagazineCore: Story = {
  args: {
    labels: {
      account: 'Account',
      profile: 'Profile',
      appearance: 'Appearance',
      language: 'Language',
    },
    lede: <Hint panel>Preferences sync across MSQ DX apps when you are signed in.</Hint>,
    account: <Text role="body">Signed in as demo@msqdx.local</Text>,
    profile: <Text role="body">Display name field lives here</Text>,
    appearance: (
      <ToggleGroup
        aria-label="Theme"
        value="dark"
        onChange={() => undefined}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'auto', label: 'Auto' },
        ]}
      />
    ),
    language: (
      <ToggleGroup
        aria-label="Language"
        value="en"
        onChange={() => undefined}
        options={[
          { value: 'en', label: 'English' },
          { value: 'de', label: 'Deutsch' },
        ]}
      />
    ),
    extras: (
      <SettingsBand title="Federation" help="Read-only ops">
        <Text role="meta">2026-05-plexon-federation-v3</Text>
      </SettingsBand>
    ),
  },
}
