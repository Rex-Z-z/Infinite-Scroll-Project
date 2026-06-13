import React, { Suspense } from 'react'

import { HomeSectionSkeleton } from '@/components/ui/section-skeleton'
import {
  fetchRecentReads,
  fetchRecommendedReads,
} from '@/services/home/comic.service'

import ComicSection from './components/comic-section'
import LibraryRead from './components/library'

const HomePage = async () => {
  const [recentReadsData, recommendedReadsData] = await Promise.all([
    fetchRecentReads(),
    fetchRecommendedReads(),
  ])

  return (
    <div>
      <ComicSection
        title="Recent Read"
        reads={recentReadsData}
        showAddCard={true}
      />

      <ComicSection
        title="Recommendation"
        reads={recommendedReadsData}
        showAddCard={false}
        autoplay={true}
        loop={true}
        filterSection="recommendations"
      />

      <Suspense
        fallback={
          <div className="w-full p-2 lg:p-0">
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

export default HomePage
