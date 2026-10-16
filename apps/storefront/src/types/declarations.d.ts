declare module "lucide-react" {
  import * as React from "react"

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number
    color?: string
    strokeWidth?: string | number
    className?: string
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >

  export const ShoppingBag: LucideIcon
  export const Menu: LucideIcon
  export const X: LucideIcon
  export const Trash2: LucideIcon
  export const Plus: LucideIcon
  export const Minus: LucideIcon
  export const Check: LucideIcon
  export const MessageCircle: LucideIcon
  export const AlertCircle: LucideIcon
  export const Search: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowLeft: LucideIcon
  export const ArrowUpDown: LucideIcon
  export const Sparkles: LucideIcon
  export const BookOpen: LucideIcon
  export const Compass: LucideIcon
  export const HelpCircle: LucideIcon
  export const Heart: LucideIcon
  export const ShieldCheck: LucideIcon
  export const ShieldAlert: LucideIcon
  export const Truck: LucideIcon
  export const Share2: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronLeft: LucideIcon
  export const Info: LucideIcon
  export const Copy: LucideIcon
  export const ExternalLink: LucideIcon
  export const RefreshCw: LucideIcon
  export const Eye: LucideIcon
  export const SlidersHorizontal: LucideIcon
  export const CheckCircle: LucideIcon

  const allIcons: Record<string, LucideIcon>
  export default allIcons
}
