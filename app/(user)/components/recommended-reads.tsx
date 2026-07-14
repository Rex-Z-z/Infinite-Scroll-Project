import { fetchRecommendedReads } from '@/services/home/comic.service'

import ComicSection from './comic-section'

export default async function RecommendedReads() {
  const recommendedReadsData = await fetchRecommendedReads()

  return (
    <ComicSection
      title="Recommendation"
      reads={recommendedReadsData}
      showAddCard={false}
      autoplay={true}
      loop={true}
      filterSection="recommendations"
    />
  )
}
