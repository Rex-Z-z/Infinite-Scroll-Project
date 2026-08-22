import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchComicsByFilters } from '@/services/library/comic.service'

import ComicList from './components/comic-list'
import SearchBar from './components/search-bar'

const Page = async ({ searchParams }: { searchParams?: any }) => {
  const initialComics = await fetchComicsByFilters(searchParams)

  return (
    <div className="flex flex-col p-1.5 md:p-4">
      <h1 className="mb-1 ml-1 text-lg font-semibold tracking-tight md:mb-2 md:text-4xl">
        Library
      </h1>

      <div className="w-full flex-row gap-2">
        <div className="flex flex-col justify-between gap-1.5 bg-transparent pb-2 lg:flex-row">
          <SearchBar />
        </div>

        <div className="custom-scrollbar lg:h-[calc(100vh-190 px)] h-[calc(100vh-150px)] w-full overflow-y-auto rounded-md md:h-[calc(100vh-200px)] xl:h-[calc(100vh-205px)]">
          <ComicList initialComics={initialComics} />
        </div>
      </div>
    </div>
  )
}

export default Page
