'use client'

import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import ComicCard from '@/components/ui/comic-card'
import { Dialog } from '@/components/ui/dialog'
import { ReadItem } from '@/lib/types'

const AddNewModal = dynamic(() => import('@/components/ui/add-new-modal'), {
  loading: () => (
    <div className="bg-muted size-6 animate-pulse rounded-md md:size-[36px]" />
  ),
})

const ComicList = ({ initialComics }: { initialComics: ReadItem[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComic, setEditingComic] = useState<ReadItem | null>(null)

  const handleEdit = (read: ReadItem) => {
    setEditingComic(read)
    setIsModalOpen(true)
  }

  if (!initialComics?.length) {
    return (
      <div className="bg-card flex h-[calc(100vh-220px)] flex-col items-center justify-center rounded-md">
        <p className="text-muted-foreground mt-4 text-center text-lg">
          No comics found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-2 lg:grid-cols-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AddNewModal comicData={editingComic} />
      </Dialog>

      {initialComics.map((read) => (
        <ComicCard
          key={read.id}
          read={read}
          page="library"
          onEdit={handleEdit}
        />
      ))}
    </div>
  )
}

export default ComicList
