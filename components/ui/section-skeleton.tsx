import React from 'react'

import { Skeleton } from './skeleton'

export const HomeSectionSkeleton = () => {
  return (
    <div className="flex flex-row gap-2 overflow-hidden">
      {[...Array(16)].map((_, index) => (
        <div
          key={index}
          className="flex w-20 flex-shrink-0 flex-col gap-2.5 md:w-50 md:gap-3"
        >
          <Skeleton className="h-[120px] w-full md:h-[300px]" />
          <div className="flex flex-col gap-2.5 md:gap-3.5">
            <Skeleton className="h-2 w-full sm:h-4" />
            <Skeleton className="h-2 w-1/2 sm:h-4" />
            <div className="flex flex-row justify-between">
              <Skeleton className="h-2 w-1/3 sm:h-4" />
              <Skeleton className="h-2 w-1/4 sm:h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const LibrarySectionSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-2 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {[...Array(16)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2.5 md:gap-3">
          <Skeleton className="aspect-[2/3] w-full" />
          <div className="flex flex-col gap-2.5 md:gap-3.5">
            <Skeleton className="h-2 w-full sm:h-4" />
            <Skeleton className="h-2 w-1/2 sm:h-4" />
            <div className="flex flex-row justify-between">
              <Skeleton className="h-2 w-1/3 sm:h-4" />
              <Skeleton className="h-2 w-1/4 sm:h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
