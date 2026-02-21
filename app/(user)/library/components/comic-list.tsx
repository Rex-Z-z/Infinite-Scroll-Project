'use client'

import React, { useState } from 'react'

import useSWR from 'swr'

import ComicCard from '@/components/ui/comic-card'
import { Dialog } from '@/components/ui/dialog'
import SectionSkeleton from '@/components/ui/section-skeleton'
import { ReadItem } from '@/lib/types'
import { fetchComicsByFilters } from '@/services/library/comic.service'

import AddNewModal from '../../../../components/ui/add-new-modal'

// You can pass search parameters or filters as props here to trigger re-fetches
const ComicList = ({ searchParams }: { searchParams?: any }) => {
  // Use the search parameters as part of the SWR key so it refetches when filters change
  const {
    data: libraryReads,
    error,
    isLoading,
  } = useSWR(['library-comics', searchParams], () =>
    fetchComicsByFilters(searchParams)
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComic, setEditingComic] = useState<ReadItem | null>(null)

  const handleEdit = (read: ReadItem) => {
    setEditingComic(read)
    setIsModalOpen(true)
  }

  return (
    <div>
      {isLoading && <SectionSkeleton page="library" />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="4xl:grid-cols-8 grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-2 lg:grid-cols-5">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AddNewModal comicData={editingComic} />
        </Dialog>

        {!isLoading &&
          !error &&
          libraryReads &&
          libraryReads.map((read) => (
            <ComicCard
              key={read.id}
              read={read}
              page="library"
              onEdit={handleEdit}
            />
          ))}
      </div>
    </div>
  )
}

export default ComicList
