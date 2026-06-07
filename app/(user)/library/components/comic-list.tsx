'use client'

import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import useSWR from 'swr'

import ComicCard from '@/components/ui/comic-card'
import { Dialog } from '@/components/ui/dialog'
import { LibrarySectionSkeleton } from '@/components/ui/section-skeleton'
import { ReadItem } from '@/lib/types'
import { fetchComicsByFilters } from '@/services/library/comic.service'

const AddNewModal = dynamic(() => import('@/components/ui/add-new-modal'), {
  loading: () => (
    <div className="bg-muted size-6 animate-pulse rounded-md md:size-[36px]" />
  ),
})

const ComicList = ({ searchParams }: { searchParams?: any }) => {
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
      {isLoading && <LibrarySectionSkeleton />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-2 lg:grid-cols-8">
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
