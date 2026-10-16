import React from "react"

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#F4ECE1] rounded-xl ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8DDCF] p-4 flex flex-col justify-between h-[380px]">
      <div>
        <Skeleton className="aspect-square w-full rounded-xl" />
        <Skeleton className="h-4 w-1/3 mt-4" />
        <Skeleton className="h-6 w-3/4 mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#F4ECE1]">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  )
}
