import React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "mustard" | "turquoise" | "coral" | "neutral"
  className?: string
}

export function Badge({
  children,
  variant = "mustard",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    mustard: "bg-[#F2BD51] text-[#684606] border border-[#DFC685]/60",
    turquoise: "bg-[#137D84]/10 text-[#137D84] border border-[#137D84]/20",
    coral: "bg-[#EF745B]/10 text-[#EF745B] border border-[#EF745B]/20",
    neutral: "bg-[#F4ECE1] text-[#5A6B75] border border-[#E8DDCF]",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
