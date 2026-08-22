// app/(user)/home/page.tsx
import React, { Suspense } from 'react'

import { HomeSectionSkeleton } from '@/components/ui/section-skeleton'

import LibraryRead from './components/library'
import RecentReads from './components/recent-reads'
import RecommendedReads from './components/recommended-reads'
import Loading from './loading'

const SHOW_LOADING = false

export default function HomePage() {
  if (SHOW_LOADING) {
    return <Loading />
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full px-5 py-4 md:px-20 lg:px-28">
            <div className="bg-muted mb-3 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <RecentReads />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-8 w-full px-8 py-4 md:px-20 lg:px-28">
            <div className="bg-muted mb-3 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <RecommendedReads />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-8 w-full px-8 py-4 md:px-20 lg:px-28">
            <div className="bg-muted mb-3 h-7 w-32 animate-pulse rounded-md"></div>
            <HomeSectionSkeleton />
          </div>
        }
      >
        <LibraryRead />
      </Suspense>
    </div>
  )
}
