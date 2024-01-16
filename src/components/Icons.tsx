/* eslint-disable import/prefer-default-export, react/jsx-props-no-spreading */

import {
  LucideProps,
  UserRound,
  Loader,
  Focus,
  Expand,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Send,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  EyeOff,
  Upload,
  BookOpenText,
  Moon,
  Sun,
  LogIn,
  Trash,
  Copy,
} from "lucide-react"
import { MdKeyboardArrowRight, MdOutlineCloudUpload } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { BsFileEarmarkPdfFill } from "react-icons/bs"

export const Icons = {
  Pdf: BsFileEarmarkPdfFill,
  Apple: FaApple,
  Google: FcGoogle,
  Copy,
  Trash,
  Enter: LogIn,
  Moon,
  Sun,
  Upload,
  UploadToCloud: MdOutlineCloudUpload,
  Read: BookOpenText,
  X,
  Show: Eye,
  Hide: EyeOff,
  Success: CheckCircle,
  Alert: AlertTriangle,
  Send,
  Left: ChevronLeft,
  Right: ChevronRight,
  RightSmall: MdKeyboardArrowRight,
  RotateRight: RotateCw,
  RotateLeft: RotateCcw,
  ZoomIn,
  ZoomOut,
  Loader,
  Focus,
  Fullscreen: Expand,
  User: UserRound,
  logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path d="m6.94 14.036c-.233.624-.43 1.2-.606 1.783.96-.697 2.101-1.139 3.418-1.304 2.513-.314 4.746-1.973 5.876-4.058l-1.456-1.455 1.413-1.415 1-1.001c.43-.43.915-1.224 1.428-2.368-5.593.867-9.018 4.292-11.074 9.818zm10.06-5.035 1 .999c-1 3-4 6-8 6.5-2.669.334-4.336 2.167-5.002 5.5h-1.998c1-6 3-20 18-20-1 2.997-1.998 4.996-2.997 5.997z" />
    </svg>
  ),
}
