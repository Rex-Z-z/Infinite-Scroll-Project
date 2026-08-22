import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { LibrarySectionSkeleton } from '@/components/ui/section-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <h1 className="ml-1 text-lg font-semibold tracking-tight md:text-4xl lg:mb-1">
        Library
      </h1>

      <div className="w-full">
        <ScrollArea className="h-[calc(100vh-200px)] rounded-md pt-1.5 md:h-[calc(100vh-170px)]">
          <div>
            <Skeleton className="h-8 w-full md:h-[38px] lg:h-9 lg:w-[31%]" />
          </div>
          <div className="mt-1 lg:mt-2">
            <LibrarySectionSkeleton />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
