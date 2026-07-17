import React from 'react'

import { Carousel, CarouselContent, CarouselItem } from './carousel'
import { Skeleton } from './skeleton'

export const HomeSectionSkeleton = () => {
  return (
    <Carousel>
      <CarouselContent className="-ml-1 lg:-ml-2">
        {[...Array(6)].map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 pl-1 md:basis-1/4 lg:basis-1/5 lg:pl-2 2xl:basis-1/6"
          >
            <div
              key={index}
              className="flex aspect-[2/3] w-full flex-shrink-0 flex-col gap-3.5"
            >
              <Skeleton className="h-full w-full" />
              <div className="flex flex-col gap-2 md:gap-4">
                <Skeleton className="h-2 w-full sm:h-4" />
                <Skeleton className="h-2 w-1/2 sm:h-4" />
                <div className="flex flex-row justify-between">
                  <Skeleton className="h-2 w-1/3 sm:h-4" />
                  <Skeleton className="h-2 w-1/4 sm:h-4" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export const LibrarySectionSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-3 lg:grid-cols-6">
      {[...Array(16)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2.5 md:gap-3">
          <Skeleton className="aspect-[2/3] h-100 w-full" />
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
