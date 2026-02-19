import React from 'react'

import Image from 'next/image'

import { Clock, ImageIcon } from 'lucide-react'

import { ReadItem } from '@/lib/types'

interface SearchPreviewProps {
  results: ReadItem[]
  history: string[]
  isSearching: boolean
  onSelectResult: (item: ReadItem) => void
  onSelectHistory: (query: string) => void
  onClearHistory: () => void
}

const SearchPreview = ({
  results,
  history,
  isSearching,
  onSelectResult,
  onSelectHistory,
  onClearHistory,
}: SearchPreviewProps) => {
  return (
    <div className="bg-card absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-md border shadow-lg">
      {/* Show History when not searching (query is empty) */}
      {!isSearching && (
        <div className="p-2">
          <div className="text-muted-foreground flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase">
            <span>Recent Searches</span>
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="transition-colors hover:text-red-500"
              >
                Clear All
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="text-muted-foreground px-3 py-4 text-center text-sm">
              No recent searches
            </div>
          ) : (
            <ul>
              {history.map((term, index) => (
                <li
                  key={index}
                  onClick={() => onSelectHistory(term)}
                  className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm"
                >
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Show Search Results when searching */}
      {isSearching && (
        <div className="p-2">
          <div className="text-muted-foreground px-1 py-0.5 text-[10px] font-semibold uppercase md:px-3 md:py-2 md:text-xs">
            Results
          </div>
          {results.length === 0 ? (
            <div className="text-muted-foreground px-1 py-0.5 text-center text-sm md:px-3 md:py-2">
              No results found.
            </div>
          ) : (
            <ul>
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelectResult(item)}
                  className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2"
                >
                  {/* Image Thumbnail */}
                  <div className="relative h-18 w-14 shrink-0 overflow-hidden rounded md:h-28 md:w-24">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        fill
                        alt={`Cover for ${item.title}`}
                        className="absolute object-cover transition-all duration-500 ease-in-out hover:scale-110"
                      />
                    ) : (
                      <div className="group relative flex h-18 w-14 items-center justify-center rounded bg-gray-700 shadow-lg hover:bg-gray-800 md:h-28 md:w-24">
                        <div className="transition-all duration-300 ease-in-out group-hover:scale-130">
                          <ImageIcon className="size-6 text-gray-600 md:size-16" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Info */}
                  <div className="gap-A flex flex-col overflow-hidden">
                    <span className="truncate text-[10px] font-medium md:text-sm">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground/60 truncate text-[8px] md:text-xs">
                      {item.altTitle}
                    </span>
                    <span className="text-muted-foreground mt-0.5 text-[8px] font-medium md:text-sm">
                      Chapter {item.chapter}
                    </span>
                    <span className="text-primary mt-0.5 text-[8px] md:text-xs">
                      {item.type} • {item.rating}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPreview
