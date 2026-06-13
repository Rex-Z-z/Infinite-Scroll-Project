// app/(user)/home/page.tsx
import React, { Suspense } from 'react'

import { HomeSectionSkeleton } from '@/components/ui/section-skeleton'

import LibraryRead from './components/library'
import RecentReads from './components/recent-reads'
import RecommendedReads from './components/recommended-reads'

export default function HomePage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="mt-5 w-full px-4">
            <div className="bg-muted mb-4 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <RecentReads />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-8 w-full px-4">
            <div className="bg-muted mb-4 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <RecommendedReads />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-8 w-full px-4">
            <div className="bg-muted mb-4 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <LibraryRead />
      </Suspense>
    </div>
  )
}
