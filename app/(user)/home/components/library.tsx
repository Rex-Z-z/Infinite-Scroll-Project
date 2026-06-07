import React from 'react'

import { fetchAllReads } from '@/services/home/comic.service'

import ComicSection from './comic-section'

const LibraryRead = async () => {
  const allReadsData = await fetchAllReads()

  return (
    <ComicSection
      title="Library"
      reads={allReadsData}
      showAddCard={false}
      loop={true}
    />
  )
}

export default LibraryRead
