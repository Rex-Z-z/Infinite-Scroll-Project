import React, { Suspense } from 'react'

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
          <div className="bg-muted m-4 h-64 animate-pulse rounded-md p-4">
            Loading Library...
          </div>
        }
      >
        <LibraryRead />
      </Suspense>
    </div>
  )
}

export default HomePage
