'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search } from 'lucide-react'

// Import your new Input Group components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { mockReads } from '@/lib/mock-data'
import { ReadItem } from '@/lib/types'

import SearchPreview from './search-preview'

const SearchBar = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [filteredResults, setFilteredResults] = useState<ReadItem[]>([])
  const [history, setHistory] = useState<string[]>([
    'Solo Leveling',
    'Omniscient Reader',
  ])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    setQuery(item.title)
    router.push(`/library/${item.id}`)
  }

  return (
    <div className="relative w-xl" ref={containerRef}>
      <InputGroup className="h-10">
        <InputGroupAddon align="inline-start">
          <Search className="text-muted-foreground" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="text-sm"
        />
      </InputGroup>

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
  )
}

export default SearchBar
