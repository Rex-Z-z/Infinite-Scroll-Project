'use client'

import React from 'react'

import { fetchRecentReads } from '@/services/home/comic.service'

import ComicSection from './comic-section'

const fetcher = () => fetchRecentReads()

const RecentReads = () => {
  return (
    <ComicSection
      title="Recent Read"
      fetcher={fetcher}
      swrKey={['recent-reads']}
      showAddCard={true}
    />
  )
}

export default RecentReads
