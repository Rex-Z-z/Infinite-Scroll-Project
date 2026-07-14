import { fetchRecentReads } from '@/services/home/comic.service'

import ComicSection from './comic-section'

export default async function RecentReads() {
  const recentReadsData = await fetchRecentReads()

  return (
    <ComicSection
      title="Recent Read"
      reads={recentReadsData}
      showAddCard={true}
    />
  )
}
