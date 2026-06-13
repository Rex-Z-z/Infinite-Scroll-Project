import React from 'react'

import { HomeSectionSkeleton } from '@/components/ui/section-skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <div className="flex flex-col gap-5 md:gap-10">
        <div className="w-full">
          <div className="bg-muted mb-4 h-7 w-32 animate-pulse rounded-md"></div>
          <HomeSectionSkeleton />
        </div>

        <div className="w-full">
          <div className="bg-muted mb-4 h-7 w-40 animate-pulse rounded-md"></div>
          <HomeSectionSkeleton />
        </div>

        <div className="w-full">
          <div className="bg-muted mb-4 h-7 w-40 animate-pulse rounded-md"></div>
          <HomeSectionSkeleton />
        </div>
      </div>
    </div>
  )
}
