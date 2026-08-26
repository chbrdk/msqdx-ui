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
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Badge,
  Ban,
  Baseline,
  BetweenHorizontalStart,
  Blend,
  Bold,
  BoxSelect,
  CaseLower,
  CaseSensitive,
  CaseUpper,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleHelp,
  Columns3,
  Contrast,
  Droplet,
  Eye,
  EyeOff,
  FolderKanban,
  Ghost,
  Heading1,
  History,
  Image,
  Italic,
  LayoutDashboard,
  LayoutGrid,
  Link,
  Lock,
  Map,
  Maximize2,
  Mic,
  Minimize2,
  Minus,
  MousePointerClick,
  Move,
  MoveHorizontal,
  MoveVertical,
  Pencil,
  Radius,
  Redo2,
  RotateCw,
  Rows3,
  Save,
  ScrollText,
  Search,
  Send,
  Share2,
  Sparkles,
  Square,
  SquareDashed,
  SquareStack,
  StretchHorizontal,
  Strikethrough,
  TextCursorInput,
  Trash2,
  TriangleAlert,
  Type,
  Underline,
  Undo2,
  Unlock,
  Users,
  Video,
  WrapText,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

export type IconProps = LucideProps

const defaults: LucideProps = {
  size: 16,
  strokeWidth: 1.75,
  'aria-hidden': true,
}

function wrap(Icon: ComponentType<LucideProps>) {
  return function Wrapped(props: IconProps) {
    return (
      <Icon
        {...defaults}
        {...props}
        className={['ui-icon', props.className].filter(Boolean).join(' ')}
      />
    )
  }
}

export const IconOverview = wrap(LayoutDashboard)
export const IconPersonas = wrap(Users)
export const IconResearch = wrap(Search)
export const IconProjects = wrap(FolderKanban)
export const IconJourneys = wrap(Map)
export const IconSend = wrap(Send)
export const IconShare = wrap(Share2)
export const IconHistory = wrap(History)
export const IconMoodboard = wrap(LayoutGrid)
export const IconMic = wrap(Mic)
export const IconVideo = wrap(Video)
export const IconInfo = wrap(CircleHelp)
export const IconEdit = wrap(Pencil)
export const IconTrash = wrap(Trash2)
export const IconCheck = wrap(Check)
export const IconClose = wrap(X)

export const IconUndo = wrap(Undo2)
export const IconRedo = wrap(Redo2)
export const IconZoomIn = wrap(ZoomIn)
export const IconZoomOut = wrap(ZoomOut)
export const IconSave = wrap(Save)
export const IconArrowLeft = wrap(ArrowLeft)
export const IconArrowRight = wrap(ArrowRight)
export const IconArrowUp = wrap(ArrowUp)
export const IconArrowDown = wrap(ArrowDown)

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
export const IconType = wrap(Type)
export const IconBold = wrap(Bold)
export const IconItalic = wrap(Italic)
export const IconUnderline = wrap(Underline)
export const IconStrikethrough = wrap(Strikethrough)
export const IconCaseUpper = wrap(CaseUpper)
export const IconCaseLower = wrap(CaseLower)
export const IconCaseTitle = wrap(CaseSensitive)
export const IconBaseline = wrap(Baseline)
export const IconFill = wrap(Droplet)
export const IconBan = wrap(Ban)
export const IconGhost = wrap(Ghost)
export const IconMinimize = wrap(Minimize2)
export const IconMaximize = wrap(Maximize2)
export const IconScroll = wrap(ScrollText)
export const IconDotted = wrap(CircleDot)
export const IconMove = wrap(Move)
export const IconMinus = wrap(Minus)
export const IconCircle = wrap(Circle)
export const IconSparkles = wrap(Sparkles)
export const IconSuccess = wrap(CircleCheck)
export const IconWarning = wrap(TriangleAlert)
export const IconDanger = wrap(CircleAlert)
export const IconRotate = wrap(RotateCw)
export const IconRadius = wrap(Radius)
export const IconOpacity = wrap(Contrast)
export const IconBlur = wrap(Aperture)
export const IconShadow = wrap(Blend)

export const IconEye = wrap(Eye)
export const IconEyeOff = wrap(EyeOff)
export const IconLock = wrap(Lock)
export const IconUnlock = wrap(Unlock)
export const IconChevronUp = wrap(ChevronUp)
export const IconChevronDown = wrap(ChevronDown)
export const IconChevronRight = wrap(ChevronRight)

export const IconStack = wrap(SquareStack)
export const IconButton = wrap(MousePointerClick)
export const IconText = wrap(Type)
export const IconInput = wrap(TextCursorInput)
export const IconCard = wrap(Square)
export const IconImage = wrap(Image)
export const IconHeading = wrap(Heading1)
export const IconGrid = wrap(LayoutGrid)
export const IconLink = wrap(Link)
export const IconBadge = wrap(Badge)
export const IconSpacer = wrap(Minus)

/** Official Storybook mark (book + S) — filled brand silhouette for small toolbar use. */
export function IconStorybook({
  size = 16,
  className,
  absoluteStrokeWidth: _absoluteStrokeWidth,
  strokeWidth: _strokeWidth,
  ...props
}: IconProps) {
  const px = typeof size === 'number' ? size : Number.parseInt(String(size), 10) || 16
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={['ui-icon', className].filter(Boolean).join(' ')}
      {...props}
    >
      <path d="M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 011.279 1.2v21.596a1.2 1.2 0 01-1.26 1.2l-16.096-.72a1.2 1.2 0 01-1.15-1.16l-.75-19.797a1.2 1.2 0 011.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z" />
    </svg>
  )
}
