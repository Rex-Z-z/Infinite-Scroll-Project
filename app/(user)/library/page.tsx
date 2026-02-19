import React from 'react'

import ComicList from './components/comic-list'
import SearchBar from './components/search-bar'

const Page = () => {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <h1 className="text-md mb-1 ml-1 font-semibold tracking-tight md:mb-3 md:text-4xl">
        Library
      </h1>

      <div className="w-full">
        <div className="mb-1 flex flex-col justify-between gap-1.5 bg-transparent lg:flex-row">
          <SearchBar />
        </div>

        <ComicList />
      </div>
    </div>
  )
}

export default Page
