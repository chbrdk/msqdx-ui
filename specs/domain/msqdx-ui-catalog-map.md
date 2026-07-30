# MSQ DX v2 — Storybook catalog map

**Status:** Accepted — 2026-07-28  
**Spec:** `msqdx-ui-storybook-atomic.md`  
**Runtime SoT:** `apps/web-ui/src/storybook/catalog.ts` (must match this table)

Paths are relative to `apps/web-ui/src/`.

## Foundation

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| tokens | Foundation/Tokens | design-system/DesignTokens.stories.tsx | design-system/DesignTokens.mdx |
| typography | Foundation/Typography | design-system/Typography.stories.tsx | design-system/Typography.mdx |
| motion | Foundation/Motion | design-system/Motion.stories.tsx | design-system/Motion.mdx |
| icons | Foundation/Icons | ui/Icons.stories.tsx | ui/Icons.mdx |

## Atoms

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| Text | Atoms/Text | design-system/components/Text.stories.tsx | design-system/components/Text.mdx |
| Button | Atoms/Button | design-system/components/Button.stories.tsx | design-system/components/Button.mdx |
| Chip | Atoms/Chip | design-system/components/Chip.stories.tsx | design-system/components/Chip.mdx |
| Input | Atoms/Input | design-system/components/Input.stories.tsx | design-system/components/Input.mdx |
| Textarea | Atoms/Textarea | design-system/components/Textarea.stories.tsx | design-system/components/Textarea.mdx |
| Select | Atoms/Select | design-system/components/Select.stories.tsx | design-system/components/Select.mdx |
| Checkbox | Atoms/Checkbox | design-system/components/Checkbox.stories.tsx | design-system/components/Checkbox.mdx |
| Switch | Atoms/Switch | design-system/components/Switch.stories.tsx | design-system/components/Switch.mdx |
| Divider | Atoms/Divider | design-system/components/Divider.stories.tsx | design-system/components/Divider.mdx |
| Spinner | Atoms/Spinner | design-system/components/Spinner.stories.tsx | design-system/components/Spinner.mdx |
| Skeleton | Atoms/Skeleton | design-system/components/Skeleton.stories.tsx | design-system/components/Skeleton.mdx |
| StatusDot | Atoms/StatusDot | design-system/components/StatusDot.stories.tsx | design-system/components/StatusDot.mdx |
| Tooltip | Atoms/Tooltip | design-system/components/Tooltip.stories.tsx | design-system/components/Tooltip.mdx |
| Hint | Atoms/Hint | design-system/components/Hint.stories.tsx | design-system/components/Hint.mdx |
| LoadingText | Atoms/LoadingText | design-system/components/LoadingText.stories.tsx | design-system/components/LoadingText.mdx |
| EmptyState | Atoms/EmptyState | design-system/components/EmptyState.stories.tsx | design-system/components/EmptyState.mdx |
| PageTitle | Atoms/PageTitle | design-system/components/PageTitle.stories.tsx | design-system/components/PageTitle.mdx |
| AnimatedCount | Atoms/AnimatedCount | components/AnimatedCount.stories.tsx | components/AnimatedCount.mdx |
| MsqdxLogoMark | Atoms/MsqdxLogoMark | ui/MsqdxLogoMark.stories.tsx | ui/MsqdxLogoMark.mdx |
| MsqdxCornerBox | Atoms/MsqdxCornerBox | ui/MsqdxCornerBox.stories.tsx | ui/MsqdxCornerBox.mdx |
| ThemeToggle | Atoms/ThemeToggle | theme/ThemeToggle.stories.tsx | theme/ThemeToggle.mdx |
| LocaleToggle | Atoms/LocaleToggle | i18n/LocaleToggle.stories.tsx | i18n/LocaleToggle.mdx |

## Molecules

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| Field | Molecules/Field | design-system/components/Field.stories.tsx | design-system/components/Field.mdx |
| TagInput | Molecules/TagInput | packages/ui/src/components/TagInput.stories.tsx | packages/ui/src/components/TagInput.mdx |
| Alert | Molecules/Alert | design-system/components/Alert.stories.tsx | design-system/components/Alert.mdx |
| FilterRow | Molecules/FilterRow | design-system/components/FilterRow.stories.tsx | design-system/components/FilterRow.mdx |
| ToggleGroup | Molecules/ToggleGroup | design-system/components/ToggleGroup.stories.tsx | design-system/components/ToggleGroup.mdx |
| Tabs | Molecules/Tabs | design-system/components/Tabs.stories.tsx | design-system/components/Tabs.mdx |
| Accordion | Molecules/Accordion | packages/ui/src/components/Accordion.stories.tsx | packages/ui/src/components/Accordion.mdx |
| Panel | Molecules/Panel | design-system/components/Panel.stories.tsx | design-system/components/Panel.mdx |
| MetricChip | Molecules/MetricChip | design-system/components/MetricChip.stories.tsx | design-system/components/MetricChip.mdx |
| SectionChrome | Molecules/SectionChrome | components/SectionChrome.stories.tsx | components/SectionChrome.mdx |
| RankedRow | Molecules/RankedRow | design-system/components/RankedRow.stories.tsx | design-system/components/RankedRow.mdx |
| CategoryBars | Molecules/CategoryBars | viz/CategoryBars.stories.tsx | viz/CategoryBars.mdx |
| ScoreRadarChart | Molecules/ScoreRadarChart | viz/ScoreRadarChart.stories.tsx | viz/ScoreRadarChart.mdx |
| CitationScoreBars | Molecules/CitationScoreBars | viz/CitationScoreBars.stories.tsx | viz/CitationScoreBars.mdx |
| StatusStackBar | Molecules/StatusStackBar | viz/StatusStackBar.stories.tsx | viz/StatusStackBar.mdx |
| DimensionStrip | Molecules/DimensionStrip | viz/DimensionStrip.stories.tsx | viz/DimensionStrip.mdx |
| TagWeightBars | Molecules/TagWeightBars | viz/TagWeightBars.stories.tsx | viz/TagWeightBars.mdx |
| QueueMeter | Molecules/QueueMeter | viz/QueueMeter.stories.tsx | viz/QueueMeter.mdx |
| MlPill | Molecules/MlPill | viz/MlPill.stories.tsx | viz/MlPill.mdx |
| ScoreBars | Molecules/ScoreBars | viz/ScoreBars.stories.tsx | viz/ScoreBars.mdx |
| SentimentBand | Molecules/SentimentBand | viz/SentimentBand.stories.tsx | viz/SentimentBand.mdx |
| LabeledFacets | Molecules/LabeledFacets | viz/LabeledFacets.stories.tsx | viz/LabeledFacets.mdx |
| GeoSummary | Molecules/GeoSummary | viz/GeoSummary.stories.tsx | viz/GeoSummary.mdx |
| TagWeightChart | Molecules/TagWeightChart | viz/TagWeightChart.stories.tsx | viz/TagWeightChart.mdx |
| EntityField | Molecules/EntityField | viz/EntityField.stories.tsx | viz/EntityField.mdx |
| ChatAnswer | Molecules/ChatAnswer | chat/ChatAnswer.stories.tsx | chat/ChatAnswer.mdx |
| ChatThinkingLive | Molecules/ChatThinkingLive | chat/ChatThinkingLive.stories.tsx | chat/ChatThinkingLive.mdx |
| ChatThinkingTrace | Molecules/ChatThinkingTrace | chat/ChatThinkingTrace.stories.tsx | chat/ChatThinkingTrace.mdx |
| TopStatus | Molecules/TopStatus | components/TopStatus.stories.tsx | components/TopStatus.mdx |
| BrandCorner | Molecules/BrandCorner | ui/BrandCorner.stories.tsx | ui/BrandCorner.mdx |
| SignalMetaGrid | Molecules/SignalMetaGrid | components/SignalMetaGrid.stories.tsx | components/SignalMetaGrid.mdx |
| SignalSection | Molecules/SignalSection | components/SignalSection.stories.tsx | components/SignalSection.mdx |

## Organisms

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| Dialog | Organisms/Dialog | design-system/components/Dialog.stories.tsx | design-system/components/Dialog.mdx |
| ConfirmDialog | Organisms/ConfirmDialog | packages/ui/src/components/ConfirmDialog.stories.tsx | packages/ui/src/components/ConfirmDialog.mdx |
| RankedList | Organisms/RankedList | design-system/components/RankedList.stories.tsx | design-system/components/RankedList.mdx |
| NavRail | Organisms/NavRail | ui/NavRail.stories.tsx | ui/NavRail.mdx |
| OpsStrip | Organisms/OpsStrip | components/OpsStrip.stories.tsx | components/OpsStrip.mdx |
| KpiStrip | Organisms/KpiStrip | components/KpiStrip.stories.tsx | components/KpiStrip.mdx |
| BriefingPulse | Organisms/BriefingPulse | viz/BriefingPulse.stories.tsx | viz/BriefingPulse.mdx |
| ForesightPanel | Organisms/ForesightPanel | viz/ForesightPanel.stories.tsx | viz/ForesightPanel.mdx |
| CrossPressurePanel | Organisms/CrossPressurePanel | viz/CrossPressurePanel.stories.tsx | viz/CrossPressurePanel.mdx |
| PipelinePanel | Organisms/PipelinePanel | viz/PipelinePanel.stories.tsx | viz/PipelinePanel.mdx |
| SystemLoadPanel | Organisms/SystemLoadPanel | viz/SystemLoadPanel.stories.tsx | viz/SystemLoadPanel.mdx |
| TagGraphPanel | Organisms/TagGraphPanel | viz/TagGraphPanel.stories.tsx | viz/TagGraphPanel.mdx |
| ScenarioFreshness | Organisms/ScenarioFreshness | viz/ScenarioFreshness.stories.tsx | viz/ScenarioFreshness.mdx |
| WaveScatter | Organisms/WaveScatter | viz/WaveScatter.stories.tsx | viz/WaveScatter.mdx |
| SignalCompactList | Organisms/SignalCompactList | viz/SignalCompactList.stories.tsx | viz/SignalCompactList.mdx |
| WaveCompactList | Organisms/WaveCompactList | viz/WaveCompactList.stories.tsx | viz/WaveCompactList.mdx |
| SimilarCards | Organisms/SimilarCards | viz/SimilarCards.stories.tsx | viz/SimilarCards.mdx |
| ResearchAnswer | Organisms/ResearchAnswer | viz/ResearchAnswer.stories.tsx | viz/ResearchAnswer.mdx |
| ChatPanel | Organisms/ChatPanel | chat/ChatPanel.stories.tsx | chat/ChatPanel.mdx |

> Chat visual SoT is CSS-only today: `.chat-panel` / `.chat-panel-open` in `packages/ui/src/css/chat.css`. React `ChatPanel` remains product-owned until a shared component ships.

## Templates

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| AppShell | Templates/AppShell | storybook/templates/AppShell.stories.tsx | storybook/templates/AppShell.mdx |
| ChatOverlay | Templates/ChatOverlay | chat/ChatOverlay.stories.tsx | chat/ChatOverlay.mdx |

## Pages

| Id | Story title | stories | mdx |
|----|-------------|---------|-----|
| OverviewPage | Pages/Overview | pages/OverviewPage.stories.tsx | pages/OverviewPage.mdx |
| ResearchPage | Pages/Research | pages/ResearchPage.stories.tsx | pages/ResearchPage.mdx |
| BriefingComposePage | Pages/BriefingCompose | pages/BriefingComposePage.stories.tsx | pages/BriefingComposePage.mdx |
| BriefingDetailPage | Pages/BriefingDetail | pages/BriefingDetailPage.stories.tsx | pages/BriefingDetailPage.mdx |
| ChatPage | Pages/Chat | pages/ChatPage.stories.tsx | pages/ChatPage.mdx |
| WavesPage | Pages/Waves | pages/WavesPage.stories.tsx | pages/WavesPage.mdx |
| WaveDetailPage | Pages/WaveDetail | pages/WaveDetailPage.stories.tsx | pages/WaveDetailPage.mdx |
| SignalsPage | Pages/Signals | pages/SignalsPage.stories.tsx | pages/SignalsPage.mdx |
| SignalDetailPage | Pages/SignalDetail | pages/SignalDetailPage.stories.tsx | pages/SignalDetailPage.mdx |
| SourcesPage | Pages/Sources | pages/SourcesPage.stories.tsx | pages/SourcesPage.mdx |

## Deferred (not in catalog)

Toast · DataTable · Avatar
