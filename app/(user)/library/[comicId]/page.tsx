import React from 'react'

import { fetchComickById } from '@/services/library/comic.service'

import LeftSidePage from './components/left-side-page-info'
import RightSidePage from './components/right-side-page-info'

const Page = async ({ params }: { params: Promise<{ comicId: string }> }) => {
  const resolvedParams = await params
  const comicId = resolvedParams.comicId

  try {
    const read = await fetchComickById(Number(comicId))

    if (!read) return <div className="p-4 text-red-500">Comic not found...</div>

    return (
      <div className="flex h-[calc(95vh-2rem)] flex-row gap-4 overflow-hidden p-4">
        <LeftSidePage comicId={comicId} data={read} />
        <RightSidePage comicId={comicId} data={read} />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500">Error fetching comic...</div>
  }
}

export default Page
