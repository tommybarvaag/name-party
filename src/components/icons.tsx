import type { Icon as LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Command,
  File,
  FileText,
  Image,
  Loader2,
  MoreVertical,
  PartyPopper,
  Plus,
  Settings,
  Trash,
  User,
  UserCheck,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  Logo: Command,
  Spinner: Loader2,
  ChevronLeft,
  Trash,
  Post: FileText,
  Page: File,
  Media: Image,
  Settings,
  Ellipsis: MoreVertical,
  Add: Plus,
  Warning: AlertTriangle,
  User: User,
  ArrowRight,
  PartyPopper,
  Rsvp: UserCheck,
};
