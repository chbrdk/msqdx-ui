/**
 * Named Icon* barrel — custom Waves 1–2 + residual Lucide wraps.
 * Spec: specs/domain/msqdx-ui-icon-language.md
 * Inventory: knowledge/icon-catalog.md
 */

import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import {
  Aperture,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignHorizontalJustifyStart,
  Badge,
  BetweenHorizontalStart,
  Blend,
  BoxSelect,
  Car,
  Camera,
  Contrast,
  Droplet,
  FolderKanban,
  Ghost,
  History,
  Image,
  LayoutDashboard,
  LayoutGrid,
  Map,
  Maximize2,
  Mic,
  Minimize2,
  MousePointerClick,
  Move,
  MoveHorizontal,
  MoveVertical,
  Package,
  PawPrint,
  Radius,
  RotateCw,
  Rows3,
  ScrollText,
  Send,
  Share2,
  Sparkles,
  Square,
  SquareDashed,
  SquareStack,
  StretchHorizontal,
  TextCursorInput,
  User,
  Users,
  Video,
  WrapText,
  Zap,
  Columns3,
  CircleDot,
  Clock,
} from 'lucide-react'
import type { IconProps } from './ui-icon-track'
import { resolveIconSize } from './ui-icon-track'
import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconClipboard,
  IconClose,
  IconCopy,
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconFilter,
  IconHome,
  IconLayers,
  IconLock,
  IconMenu,
  IconMoreHorizontal,
  IconMoreVertical,
  IconPanelLeft,
  IconPlus,
  IconRefresh,
  IconResearch,
  IconSearch,
  IconSettings,
  IconSliders,
  IconTrash,
  IconUnlock,
  IconUpload,
} from './UiIconsCore'
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconBan,
  IconBaseline,
  IconBold,
  IconCaseLower,
  IconCaseTitle,
  IconCaseUpper,
  IconCircle,
  IconDanger,
  IconHeading,
  IconInfo,
  IconItalic,
  IconLink,
  IconMinus,
  IconRedo,
  IconSave,
  IconSpacer,
  IconStrikethrough,
  IconSuccess,
  IconText,
  IconType,
  IconUnderline,
  IconUndo,
  IconWarning,
  IconZoomIn,
  IconZoomOut,
} from './UiIconsWave2'

export type { IconProps }

function wrap(Icon: ComponentType<LucideProps>) {
  return function Wrapped({
    size = 16,
    className,
    strokeWidth = 1.75,
    absoluteStrokeWidth,
    color,
    'aria-hidden': ariaHidden = true,
    ...rest
  }: IconProps) {
    const px = resolveIconSize(size)
    return (
      <Icon
        size={px}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth={absoluteStrokeWidth}
        color={color}
        aria-hidden={ariaHidden}
        className={['ui-icon', className].filter(Boolean).join(' ')}
        {...rest}
      />
    )
  }
}

export {
  IconPlus,
  IconMoreHorizontal,
  IconMoreVertical,
  IconSettings,
  IconSliders,
  IconCopy,
  IconClipboard,
  IconDownload,
  IconUpload,
  IconExternalLink,
  IconLayers,
  IconRefresh,
  IconFilter,
  IconHome,
  IconMenu,
  IconPanelLeft,
  IconResearch,
  IconSearch,
  IconCheck,
  IconClose,
  IconChevronUp,
  IconChevronDown,
  IconChevronRight,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconLock,
  IconUnlock,
  IconType,
  IconText,
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCaseUpper,
  IconCaseLower,
  IconCaseTitle,
  IconBaseline,
  IconHeading,
  IconLink,
  IconUndo,
  IconRedo,
  IconZoomIn,
  IconZoomOut,
  IconSave,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowDown,
  IconMinus,
  IconSpacer,
  IconCircle,
  IconInfo,
  IconSuccess,
  IconWarning,
  IconDanger,
  IconBan,
}

export const IconOverview = wrap(LayoutDashboard)
export const IconPersonas = wrap(Users)
export const IconUser = wrap(User)
export const IconProjects = wrap(FolderKanban)
export const IconJourneys = wrap(Map)
export const IconSend = wrap(Send)
export const IconShare = wrap(Share2)
export const IconHistory = wrap(History)
export const IconMoodboard = wrap(LayoutGrid)
export const IconMic = wrap(Mic)
export const IconVideo = wrap(Video)
export const IconCamera = wrap(Camera)
export const IconClock = wrap(Clock)

export const IconAlignLeft = wrap(AlignLeft)
export const IconAlignCenter = wrap(AlignCenter)
export const IconAlignRight = wrap(AlignRight)
export const IconAlignJustify = wrap(AlignJustify)
export const IconAlignStart = wrap(AlignVerticalJustifyStart)
export const IconAlignMiddle = wrap(AlignVerticalJustifyCenter)
export const IconAlignEnd = wrap(AlignVerticalJustifyEnd)
export const IconJustifyStart = wrap(AlignHorizontalJustifyStart)
export const IconJustifyCenter = wrap(AlignHorizontalJustifyCenter)
export const IconJustifyEnd = wrap(AlignHorizontalJustifyEnd)
export const IconSpaceBetween = wrap(AlignHorizontalSpaceBetween)
export const IconSpaceAround = wrap(AlignHorizontalSpaceAround)
export const IconRows = wrap(Rows3)
export const IconColumns = wrap(Columns3)
export const IconWrap = wrap(WrapText)
export const IconStretch = wrap(StretchHorizontal)

export const IconWidth = wrap(MoveHorizontal)
export const IconHeight = wrap(MoveVertical)
export const IconGap = wrap(BetweenHorizontalStart)
export const IconPadding = wrap(SquareDashed)
export const IconBox = wrap(BoxSelect)
export const IconPackage = wrap(Package)
export const IconCar = wrap(Car)
export const IconPaw = wrap(PawPrint)
export const IconZap = wrap(Zap)
export const IconFill = wrap(Droplet)
export const IconGhost = wrap(Ghost)
export const IconMinimize = wrap(Minimize2)
export const IconMaximize = wrap(Maximize2)
export const IconScroll = wrap(ScrollText)
export const IconDotted = wrap(CircleDot)
export const IconMove = wrap(Move)
export const IconSparkles = wrap(Sparkles)
export const IconRotate = wrap(RotateCw)
export const IconRadius = wrap(Radius)
export const IconOpacity = wrap(Contrast)
export const IconBlur = wrap(Aperture)
export const IconShadow = wrap(Blend)

export const IconStack = wrap(SquareStack)
export const IconButton = wrap(MousePointerClick)
export const IconInput = wrap(TextCursorInput)
export const IconCard = wrap(Square)
export const IconImage = wrap(Image)
export const IconGrid = wrap(LayoutGrid)
export const IconBadge = wrap(Badge)

/** Official Storybook mark (book + S) — filled brand silhouette for small toolbar use. */
export function IconStorybook({
  size = 16,
  className,
  absoluteStrokeWidth: _absoluteStrokeWidth,
  strokeWidth: _strokeWidth,
  color,
  style,
  ...props
}: IconProps) {
  const px = resolveIconSize(size)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={['ui-icon', className].filter(Boolean).join(' ')}
      style={color ? { ...style, color } : style}
      {...props}
    >
      <path d="M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 011.279 1.2v21.596a1.2 1.2 0 01-1.26 1.2l-16.096-.72a1.2 1.2 0 01-1.15-1.16l-.75-19.797a1.2 1.2 0 011.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z" />
    </svg>
  )
}
