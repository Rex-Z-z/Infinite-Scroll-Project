import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const SkeletonDetails = () => {
  return (
    <div>
      <div className="flex flex-row gap-4">
        {/* Left Side */}
        <div className="h-full w-75 flex-none flex-col">
          {/* Cover */}
          <Skeleton className="mb-3 h-98 w-full rounded-lg" />
          {/* Details */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-row gap-2">
                <Skeleton className="h-9.5 w-9.5" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-[17.5px] w-10" />
                  <Skeleton className="h-[17.5px] w-20" />
                </div>
              </div>
            ))}
            <div className="flex flex-row gap-2">
              <Skeleton className="h-9.5 w-full" />
              <Skeleton className="h-9.5 w-full" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-col gap-3">
          {/* Top Section */}
          <div className="flex flex-col gap-2 pb-2">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-140" />
              <Skeleton className="h-5 w-100" />
            </div>
            {/* Genres */}
            <div className="flex flex-row gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-16 rounded-3xl" />
              ))}
            </div>
            {/* Description */}
            <div className="mt-2.5 flex flex-col gap-2">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4.5 w-[11%]" />
                <Skeleton className="h-4.5 w-[10%]" />
                <Skeleton className="h-4.5 w-[10.5%]" />
                <Skeleton className="h-4.5 w-[9.5%]" />
              </div>
            </div>
            {/* Description */}
            <div className="mt-2.5 flex flex-col gap-2 pb-3">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-row gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-16 rounded-3xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4">
            {/* Relation */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-row gap-1.5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="aspect-[2/3] w-32 rounded-md"
                  />
                ))}
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-row gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-20 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonDetails
