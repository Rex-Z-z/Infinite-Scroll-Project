import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import ComicList from './components/comic-list'
import SearchBar from './components/search-bar'

const Page = () => {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <h1 className="mb-1 ml-1 text-lg font-semibold tracking-tight md:mb-2 md:text-4xl">
        Library
      </h1>

      <div className="w-full">
        <div className="flex flex-col justify-between gap-1.5 bg-transparent lg:flex-row">
          <SearchBar />
        </div>

        <ScrollArea className="h-[calc(100vh-150px)] rounded-md pt-1.5 md:h-[calc(100vh-200px)] md:pt-2 lg:h-[calc(100vh-195px)] xl:h-[calc(100vh-205px)]">
          <ComicList />
        </ScrollArea>
      </div>
    </div>
  )
}

export default Page
