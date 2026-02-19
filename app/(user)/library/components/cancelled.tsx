'use client'

import React, { useState } from 'react'

import useSWR from 'swr'

import ComicCard from '@/components/ui/comic-card'
import { Dialog } from '@/components/ui/dialog'
import SectionSkeleton from '@/components/ui/section-skeleton'
import { ReadItem } from '@/lib/types'
import { fetchDroppedComicByType } from '@/services/library/comic.service'

import AddNewModal from '../../../../components/ui/add-new-modal'

const fetcher = () => fetchDroppedComicByType()

const Cancelled = () => {
  const { data: libraryReads, error, isLoading } = useSWR(['dropped'], fetcher)
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

      <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-2 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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

export default Cancelled
