'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search, X } from 'lucide-react'

// Import your new Input Group components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { mockReads } from '@/lib/mock-data'
import { ReadItem } from '@/lib/types'
import { cn } from '@/lib/utils'

import { Button } from '../button'
import SearchPreview from './search-preview'

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false) // Tracks mobile overlay
  const [filteredResults, setFilteredResults] = useState<ReadItem[]>([])
  const [history, setHistory] = useState<string[]>([
    'Solo Leveling',
    'Omniscient Reader',
  ])

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
        // Optional: Close mobile overlay if clicking outside when empty
        if (isMobileOpen && !query) setIsMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen, query])

  useEffect(() => {
    if (!query) {
      setFilteredResults([])
      return
    }
    const lowerQuery = query.toLowerCase()
    const results = mockReads.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.altTitle.toLowerCase().includes(lowerQuery)
    )
    setFilteredResults(results.slice(0, 5))
  }, [query])

  const handleSelectResult = (item: ReadItem) => {
    if (!history.includes(item.title)) {
      setHistory((prev) => [item.title, ...prev].slice(0, 5))
    }
    setIsFocused(false)
    setIsMobileOpen(false)
    setQuery(item.title)
    router.push(`/library/${item.id}`)
  }

  return (
    <div className={cn('flex items-center', className)} ref={containerRef}>
      {/* 1. Mobile-only Search Button */}
      <Button
        variant="outline"
        size="icon"
        className="size-6 md:hidden md:size-9 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
        onClick={() => {
          setIsMobileOpen(true)
          // Small delay to allow element to render before focusing
          setTimeout(() => inputRef.current?.focus(), 50)
        }}
      >
        <Search />
      </Button>

      {/* 2. Main Search Container (Overlay on Mobile, Inline on Desktop) */}
      <div
        className={`bg-card absolute top-0 left-0 z-50 flex h-full w-full items-center px-3 md:relative md:flex md:w-md md:bg-transparent md:px-0 lg:w-xl ${isMobileOpen ? 'flex' : 'hidden'} `}
      >
        <div className="relative flex w-full items-center gap-2">
          <InputGroup className="h-[23.5px] flex-1 md:h-10">
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground size-2.5 md:size-4" />
            </InputGroupAddon>

            <InputGroupInput
              ref={inputRef}
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="text-xs md:text-sm"
            />
          </InputGroup>

          {/* 3. Mobile-only Close Button */}
          <Button
            className="size-6 md:hidden md:size-9 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsMobileOpen(false)
              setIsFocused(false)
              setQuery('') // Optional: clear query on close
            }}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* 4. Search Preview stays exactly the same */}
          {isFocused && (
            <SearchPreview
              results={filteredResults}
              history={history}
              isSearching={query.length > 0}
              onSelectResult={handleSelectResult}
              onSelectHistory={(term) => setQuery(term)}
              onClearHistory={() => setHistory([])}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
