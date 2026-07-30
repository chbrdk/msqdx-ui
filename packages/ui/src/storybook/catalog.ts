/**
 * Atomic Storybook inventory — SoT for catalogCompleteness.
 * Spec: specs/domain/msqdx-ui-catalog-map.md
 * Knowledge: knowledge/msqdx-ui-storybook-atomic.md
 * Viewport-critical: specs/domain/msqdx-ui-responsive.md
 */
export type CatalogLayer =
  | 'Foundation'
  | 'Atoms'
  | 'Molecules'
  | 'Organisms'

export type CatalogEntry = {
  id: string
  layer: CatalogLayer
  title: string
  stories: string
  mdx: string
  /** Requires Narrow story (globals.viewport responsiveSm) — responsive bar. */
  viewportCritical?: boolean
}

export const CATALOG: CatalogEntry[] = [
  // Foundation
  { id: 'tokens', layer: 'Foundation', title: 'Foundation/Tokens', stories: 'DesignTokens.stories.tsx', mdx: 'DesignTokens.mdx' },
  { id: 'typography', layer: 'Foundation', title: 'Foundation/Typography', stories: 'Typography.stories.tsx', mdx: 'Typography.mdx' },
  { id: 'motion', layer: 'Foundation', title: 'Foundation/Motion', stories: 'Motion.stories.tsx', mdx: 'Motion.mdx' },
  // Atoms
  { id: 'Text', layer: 'Atoms', title: 'Atoms/Text', stories: 'components/Text.stories.tsx', mdx: 'components/Text.mdx' },
  { id: 'Button', layer: 'Atoms', title: 'Atoms/Button', stories: 'components/Button.stories.tsx', mdx: 'components/Button.mdx' },
  { id: 'Chip', layer: 'Atoms', title: 'Atoms/Chip', stories: 'components/Chip.stories.tsx', mdx: 'components/Chip.mdx' },
  { id: 'Input', layer: 'Atoms', title: 'Atoms/Input', stories: 'components/Input.stories.tsx', mdx: 'components/Input.mdx' },
  { id: 'Textarea', layer: 'Atoms', title: 'Atoms/Textarea', stories: 'components/Textarea.stories.tsx', mdx: 'components/Textarea.mdx' },
  { id: 'Select', layer: 'Atoms', title: 'Atoms/Select', stories: 'components/Select.stories.tsx', mdx: 'components/Select.mdx', viewportCritical: true },
  { id: 'Checkbox', layer: 'Atoms', title: 'Atoms/Checkbox', stories: 'components/Checkbox.stories.tsx', mdx: 'components/Checkbox.mdx' },
  { id: 'Switch', layer: 'Atoms', title: 'Atoms/Switch', stories: 'components/Switch.stories.tsx', mdx: 'components/Switch.mdx' },
  { id: 'Divider', layer: 'Atoms', title: 'Atoms/Divider', stories: 'components/Divider.stories.tsx', mdx: 'components/Divider.mdx' },
  { id: 'Spinner', layer: 'Atoms', title: 'Atoms/Spinner', stories: 'components/Spinner.stories.tsx', mdx: 'components/Spinner.mdx' },
  { id: 'Skeleton', layer: 'Atoms', title: 'Atoms/Skeleton', stories: 'components/Skeleton.stories.tsx', mdx: 'components/Skeleton.mdx' },
  { id: 'StatusDot', layer: 'Atoms', title: 'Atoms/StatusDot', stories: 'components/StatusDot.stories.tsx', mdx: 'components/StatusDot.mdx' },
  { id: 'Tooltip', layer: 'Atoms', title: 'Atoms/Tooltip', stories: 'components/Tooltip.stories.tsx', mdx: 'components/Tooltip.mdx' },
  { id: 'Avatar', layer: 'Atoms', title: 'Atoms/Avatar', stories: 'components/Avatar.stories.tsx', mdx: 'components/Avatar.mdx' },
  { id: 'Hint', layer: 'Atoms', title: 'Atoms/Hint', stories: 'components/Hint.stories.tsx', mdx: 'components/Hint.mdx' },
  { id: 'LoadingText', layer: 'Atoms', title: 'Atoms/LoadingText', stories: 'components/LoadingText.stories.tsx', mdx: 'components/LoadingText.mdx' },
  { id: 'EmptyState', layer: 'Atoms', title: 'Atoms/EmptyState', stories: 'components/EmptyState.stories.tsx', mdx: 'components/EmptyState.mdx' },
  { id: 'PageTitle', layer: 'Atoms', title: 'Atoms/PageTitle', stories: 'components/PageTitle.stories.tsx', mdx: 'components/PageTitle.mdx' },
  // Molecules
  { id: 'Field', layer: 'Molecules', title: 'Molecules/Field', stories: 'components/Field.stories.tsx', mdx: 'components/Field.mdx', viewportCritical: true },
  { id: 'TagInput', layer: 'Molecules', title: 'Molecules/TagInput', stories: 'components/TagInput.stories.tsx', mdx: 'components/TagInput.mdx' },
  { id: 'Alert', layer: 'Molecules', title: 'Molecules/Alert', stories: 'components/Alert.stories.tsx', mdx: 'components/Alert.mdx' },
  { id: 'Toast', layer: 'Molecules', title: 'Molecules/Toast', stories: 'components/Toast.stories.tsx', mdx: 'components/Toast.mdx' },
  { id: 'FilterRow', layer: 'Molecules', title: 'Molecules/FilterRow', stories: 'components/FilterRow.stories.tsx', mdx: 'components/FilterRow.mdx', viewportCritical: true },
  { id: 'ToggleGroup', layer: 'Molecules', title: 'Molecules/ToggleGroup', stories: 'components/ToggleGroup.stories.tsx', mdx: 'components/ToggleGroup.mdx' },
  { id: 'Tabs', layer: 'Molecules', title: 'Molecules/Tabs', stories: 'components/Tabs.stories.tsx', mdx: 'components/Tabs.mdx' },
  { id: 'Accordion', layer: 'Molecules', title: 'Molecules/Accordion', stories: 'components/Accordion.stories.tsx', mdx: 'components/Accordion.mdx' },
  { id: 'Panel', layer: 'Molecules', title: 'Molecules/Panel', stories: 'components/Panel.stories.tsx', mdx: 'components/Panel.mdx' },
  { id: 'MetricChip', layer: 'Molecules', title: 'Molecules/MetricChip', stories: 'components/MetricChip.stories.tsx', mdx: 'components/MetricChip.mdx' },
  { id: 'StatLede', layer: 'Molecules', title: 'Molecules/StatLede', stories: 'components/StatLede.stories.tsx', mdx: 'components/StatLede.mdx' },
  { id: 'SectionChrome', layer: 'Molecules', title: 'Molecules/SectionChrome', stories: 'SectionChrome.stories.tsx', mdx: 'SectionChrome.mdx' },
  { id: 'RankedRow', layer: 'Molecules', title: 'Molecules/RankedRow', stories: 'components/RankedRow.stories.tsx', mdx: 'components/RankedRow.mdx' },
  // Organisms
  { id: 'Dialog', layer: 'Organisms', title: 'Organisms/Dialog', stories: 'components/Dialog.stories.tsx', mdx: 'components/Dialog.mdx', viewportCritical: true },
  { id: 'ConfirmDialog', layer: 'Organisms', title: 'Organisms/ConfirmDialog', stories: 'components/ConfirmDialog.stories.tsx', mdx: 'components/ConfirmDialog.mdx' },
  { id: 'DataTable', layer: 'Organisms', title: 'Organisms/DataTable', stories: 'components/DataTable.stories.tsx', mdx: 'components/DataTable.mdx' },
  { id: 'RankedList', layer: 'Organisms', title: 'Organisms/RankedList', stories: 'components/RankedList.stories.tsx', mdx: 'components/RankedList.mdx', viewportCritical: true },
  { id: 'Flyout', layer: 'Molecules', title: 'Molecules/Flyout', stories: 'components/Flyout.stories.tsx', mdx: 'components/Flyout.mdx' },
]

export const VIEWPORT_CRITICAL = CATALOG.filter((e) => e.viewportCritical)
