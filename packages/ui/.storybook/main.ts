import type { StorybookConfig } from '@storybook/react-vite'

/**
 * Storybook for ECHON product UI (msqdx-v2 design system).
 * Port / URL: config/paths.yaml → web.storybook_* · knowledge/storybook-web-ui.md
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },
}

export default config
