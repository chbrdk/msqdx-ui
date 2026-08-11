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
  | 'Templates'

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
  { id: 'Icons', layer: 'Foundation', title: 'Foundation/Icons', stories: 'components/Icons.stories.tsx', mdx: 'components/Icons.mdx' },
  // Atoms
  { id: 'Text', layer: 'Atoms', title: 'Atoms/Text', stories: 'components/Text.stories.tsx', mdx: 'components/Text.mdx' },
  { id: 'Button', layer: 'Atoms', title: 'Atoms/Button', stories: 'components/Button.stories.tsx', mdx: 'components/Button.mdx' },
  { id: 'Chip', layer: 'Atoms', title: 'Atoms/Chip', stories: 'components/Chip.stories.tsx', mdx: 'components/Chip.mdx' },
  { id: 'Input', layer: 'Atoms', title: 'Atoms/Input', stories: 'components/Input.stories.tsx', mdx: 'components/Input.mdx' },
  { id: 'Textarea', layer: 'Atoms', title: 'Atoms/Textarea', stories: 'components/Textarea.stories.tsx', mdx: 'components/Textarea.mdx' },
  { id: 'Select', layer: 'Atoms', title: 'Atoms/Select', stories: 'components/Select.stories.tsx', mdx: 'components/Select.mdx', viewportCritical: true },
  { id: 'Checkbox', layer: 'Atoms', title: 'Atoms/Checkbox', stories: 'components/Checkbox.stories.tsx', mdx: 'components/Checkbox.mdx' },
  { id: 'Switch', layer: 'Atoms', title: 'Atoms/Switch', stories: 'components/Switch.stories.tsx', mdx: 'components/Switch.mdx' },
  { id: 'Slider', layer: 'Atoms', title: 'Atoms/Slider', stories: 'components/Slider.stories.tsx', mdx: 'components/Slider.mdx' },
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
  { id: 'Meter', layer: 'Molecules', title: 'Molecules/Meter', stories: 'components/Meter.stories.tsx', mdx: 'components/Meter.mdx' },
  { id: 'ScrollArea', layer: 'Molecules', title: 'Molecules/ScrollArea', stories: 'components/ScrollArea.stories.tsx', mdx: 'components/ScrollArea.mdx' },
  { id: 'InspectDock', layer: 'Molecules', title: 'Molecules/InspectDock', stories: 'components/InspectDock.stories.tsx', mdx: 'components/InspectDock.mdx' },
  { id: 'StepStrip', layer: 'Molecules', title: 'Molecules/StepStrip', stories: 'components/StepStrip.stories.tsx', mdx: 'components/StepStrip.mdx' },
  { id: 'ChannelStack', layer: 'Molecules', title: 'Molecules/ChannelStack', stories: 'components/ChannelStack.stories.tsx', mdx: 'components/ChannelStack.mdx' },
  { id: 'EventFooter', layer: 'Molecules', title: 'Molecules/EventFooter', stories: 'components/EventFooter.stories.tsx', mdx: 'components/EventFooter.mdx' },
  { id: 'CardActions', layer: 'Molecules', title: 'Molecules/CardActions', stories: 'components/CardActions.stories.tsx', mdx: 'components/CardActions.mdx' },
  { id: 'Lede', layer: 'Molecules', title: 'Molecules/Lede', stories: 'components/Lede.stories.tsx', mdx: 'components/Lede.mdx' },
  { id: 'SectionChrome', layer: 'Molecules', title: 'Molecules/SectionChrome', stories: 'SectionChrome.stories.tsx', mdx: 'SectionChrome.mdx' },
  { id: 'RankedRow', layer: 'Molecules', title: 'Molecules/RankedRow', stories: 'components/RankedRow.stories.tsx', mdx: 'components/RankedRow.mdx' },
  { id: 'BrandCorner', layer: 'Molecules', title: 'Molecules/BrandCorner', stories: 'components/BrandCorner.stories.tsx', mdx: 'components/BrandCorner.mdx' },
  { id: 'TopStatus', layer: 'Molecules', title: 'Molecules/TopStatus', stories: 'components/TopStatus.stories.tsx', mdx: 'components/TopStatus.mdx' },
  { id: 'DivergingBar', layer: 'Molecules', title: 'Molecules/DivergingBar', stories: 'components/DivergingBar.stories.tsx', mdx: 'components/DivergingBar.mdx' },
  { id: 'Flyout', layer: 'Molecules', title: 'Molecules/Flyout', stories: 'components/Flyout.stories.tsx', mdx: 'components/Flyout.mdx' },
  // Organisms
  { id: 'Dialog', layer: 'Organisms', title: 'Organisms/Dialog', stories: 'components/Dialog.stories.tsx', mdx: 'components/Dialog.mdx', viewportCritical: true },
  { id: 'ConfirmDialog', layer: 'Organisms', title: 'Organisms/ConfirmDialog', stories: 'components/ConfirmDialog.stories.tsx', mdx: 'components/ConfirmDialog.mdx' },
  { id: 'DataTable', layer: 'Organisms', title: 'Organisms/DataTable', stories: 'components/DataTable.stories.tsx', mdx: 'components/DataTable.mdx' },
  { id: 'RankedList', layer: 'Organisms', title: 'Organisms/RankedList', stories: 'components/RankedList.stories.tsx', mdx: 'components/RankedList.mdx', viewportCritical: true },
  { id: 'NavRail', layer: 'Organisms', title: 'Organisms/NavRail', stories: 'components/NavRail.stories.tsx', mdx: 'components/NavRail.mdx' },
  { id: 'KpiStrip', layer: 'Organisms', title: 'Organisms/KpiStrip', stories: 'components/KpiStrip.stories.tsx', mdx: 'components/KpiStrip.mdx' },
  { id: 'PipelinePanel', layer: 'Organisms', title: 'Organisms/PipelinePanel', stories: 'components/PipelinePanel.stories.tsx', mdx: 'components/PipelinePanel.mdx' },
  { id: 'StatusMeterPanel', layer: 'Organisms', title: 'Organisms/StatusMeterPanel', stories: 'components/StatusMeterPanel.stories.tsx', mdx: 'components/StatusMeterPanel.mdx' },
  // Templates
  { id: 'AppFrame', layer: 'Templates', title: 'Templates/AppFrame', stories: 'components/AppFrame.stories.tsx', mdx: 'components/AppFrame.mdx' },
  { id: 'InfoTip', layer: 'Molecules', title: 'Molecules/InfoTip', stories: 'components/InfoTip.stories.tsx', mdx: 'components/InfoTip.mdx' },
  { id: 'FloatingPanel', layer: 'Organisms', title: 'Organisms/FloatingPanel', stories: 'components/FloatingPanel.stories.tsx', mdx: 'components/FloatingPanel.mdx' },
  { id: 'ChatOverlay', layer: 'Organisms', title: 'Organisms/ChatOverlay', stories: 'components/ChatOverlay.stories.tsx', mdx: 'components/ChatOverlay.mdx' },
  { id: 'FlowBoardStage', layer: 'Organisms', title: 'Organisms/FlowBoardStage', stories: 'components/FlowBoardStage.stories.tsx', mdx: 'components/FlowBoardStage.mdx' },
  { id: 'FlowBoardToolbar', layer: 'Organisms', title: 'Organisms/FlowBoardToolbar', stories: 'components/FlowBoardToolbar.stories.tsx', mdx: 'components/FlowBoardToolbar.mdx' },
  { id: 'FlowBoardPalette', layer: 'Organisms', title: 'Organisms/FlowBoardPalette', stories: 'components/FlowBoardPalette.stories.tsx', mdx: 'components/FlowBoardPalette.mdx' },
  { id: 'FlowNodeCard', layer: 'Organisms', title: 'Organisms/FlowNodeCard', stories: 'components/FlowNodeCard.stories.tsx', mdx: 'components/FlowNodeCard.mdx' },
  { id: 'FlowInspectorShell', layer: 'Organisms', title: 'Organisms/FlowInspectorShell', stories: 'components/FlowInspectorShell.stories.tsx', mdx: 'components/FlowInspectorShell.mdx' },
  { id: 'FlowNodeEditorShell', layer: 'Organisms', title: 'Organisms/FlowNodeEditorShell', stories: 'components/FlowNodeEditorShell.stories.tsx', mdx: 'components/FlowNodeEditorShell.mdx' },
  { id: 'FlowRunStrip', layer: 'Organisms', title: 'Organisms/FlowRunStrip', stories: 'components/FlowRunStrip.stories.tsx', mdx: 'components/FlowRunStrip.mdx' },
  { id: 'ContextMenu', layer: 'Molecules', title: 'Molecules/ContextMenu', stories: 'components/ContextMenu.stories.tsx', mdx: 'components/ContextMenu.mdx' },
  { id: 'JsonTree', layer: 'Molecules', title: 'Molecules/JsonTree', stories: 'components/JsonTree.stories.tsx', mdx: 'components/JsonTree.mdx' },
  { id: 'SchemaTree', layer: 'Molecules', title: 'Molecules/SchemaTree', stories: 'components/SchemaTree.stories.tsx', mdx: 'components/SchemaTree.mdx' },
  { id: 'ExpressionField', layer: 'Molecules', title: 'Molecules/ExpressionField', stories: 'components/ExpressionField.stories.tsx', mdx: 'components/ExpressionField.mdx' },
  { id: 'MagazineContentsNav', layer: 'Molecules', title: 'Molecules/MagazineContentsNav', stories: 'components/MagazineContentsNav.stories.tsx', mdx: 'components/MagazineContentsNav.mdx' },
  { id: 'MarkerCanvas', layer: 'Organisms', title: 'Organisms/MarkerCanvas', stories: 'components/MarkerCanvas.stories.tsx', mdx: 'components/MarkerCanvas.mdx' },
  { id: 'FormSection', layer: 'Molecules', title: 'Molecules/FormSection', stories: 'components/FormSection.stories.tsx', mdx: 'components/FormSection.mdx' },
  { id: 'EntityCard', layer: 'Molecules', title: 'Molecules/EntityCard', stories: 'components/EntityCard.stories.tsx', mdx: 'components/EntityCard.mdx' },
  { id: 'AddTile', layer: 'Atoms', title: 'Atoms/AddTile', stories: 'components/AddTile.stories.tsx', mdx: 'components/AddTile.mdx' },
  { id: 'SwatchStrip', layer: 'Atoms', title: 'Atoms/SwatchStrip', stories: 'components/SwatchStrip.stories.tsx', mdx: 'components/SwatchStrip.mdx' },
  { id: 'ChatBlockPanel', layer: 'Molecules', title: 'Molecules/ChatBlockPanel', stories: 'components/ChatBlockPanel.stories.tsx', mdx: 'components/ChatBlockPanel.mdx' },
  { id: 'ChatBlockList', layer: 'Molecules', title: 'Molecules/ChatBlockList', stories: 'components/ChatBlockList.stories.tsx', mdx: 'components/ChatBlockList.mdx' },
  { id: 'ChatMetricGrid', layer: 'Molecules', title: 'Molecules/ChatMetricGrid', stories: 'components/ChatMetricGrid.stories.tsx', mdx: 'components/ChatMetricGrid.mdx' },
  { id: 'ChatKeyValueList', layer: 'Molecules', title: 'Molecules/ChatKeyValueList', stories: 'components/ChatKeyValueList.stories.tsx', mdx: 'components/ChatKeyValueList.mdx' },
  { id: 'ChatStepList', layer: 'Molecules', title: 'Molecules/ChatStepList', stories: 'components/ChatStepList.stories.tsx', mdx: 'components/ChatStepList.mdx' },
  { id: 'ChatLinkList', layer: 'Molecules', title: 'Molecules/ChatLinkList', stories: 'components/ChatLinkList.stories.tsx', mdx: 'components/ChatLinkList.mdx' },
  { id: 'ChatAlertBlock', layer: 'Molecules', title: 'Molecules/ChatAlertBlock', stories: 'components/ChatAlertBlock.stories.tsx', mdx: 'components/ChatAlertBlock.mdx' },
  { id: 'ChatDataTable', layer: 'Molecules', title: 'Molecules/ChatDataTable', stories: 'components/ChatDataTable.stories.tsx', mdx: 'components/ChatDataTable.mdx' },
  { id: 'ChatCollapsible', layer: 'Molecules', title: 'Molecules/ChatCollapsible', stories: 'components/ChatCollapsible.stories.tsx', mdx: 'components/ChatCollapsible.mdx' },
  { id: 'ChatEntityGrid', layer: 'Molecules', title: 'Molecules/ChatEntityGrid', stories: 'components/ChatEntityGrid.stories.tsx', mdx: 'components/ChatEntityGrid.mdx' },
  { id: 'ChatPhaseStrip', layer: 'Molecules', title: 'Molecules/ChatPhaseStrip', stories: 'components/ChatPhaseStrip.stories.tsx', mdx: 'components/ChatPhaseStrip.mdx' },
  { id: 'ChatMomentList', layer: 'Molecules', title: 'Molecules/ChatMomentList', stories: 'components/ChatMomentList.stories.tsx', mdx: 'components/ChatMomentList.mdx' },
  { id: 'ChatCatalog', layer: 'Organisms', title: 'Organisms/ChatCatalog', stories: 'components/ChatCatalog.stories.tsx', mdx: 'components/ChatCatalog.mdx' },
]

export const VIEWPORT_CRITICAL = CATALOG.filter((e) => e.viewportCritical)
