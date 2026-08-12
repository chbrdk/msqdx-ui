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
  Baseline,
  BetweenHorizontalStart,
  Blend,
  Bold,
  BoxSelect,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Columns3,
  Contrast,
  Droplet,
  Eye,
  EyeOff,
  FolderKanban,
  Heading1,
  History,
  Image,
  LayoutDashboard,
  LayoutGrid,
  Link,
  Lock,
  Map,
  Mic,
  Minus,
  MousePointerClick,
  MoveHorizontal,
  MoveVertical,
  Pencil,
  Radius,
  Redo2,
  RotateCw,
  Rows3,
  Save,
  Search,
  Send,
  Share2,
  Square,
  SquareDashed,
  SquareStack,
  StretchHorizontal,
  TextCursorInput,
  Trash2,
  Type,
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
export const IconBaseline = wrap(Baseline)
export const IconFill = wrap(Droplet)
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
