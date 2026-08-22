'use client'

import React, { useState } from 'react'

import { Plus, Search, SearchX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

import SourceCard from './source-card'

export interface Source {
  id: string
  name: string
  url: string
  icon?: string
}

// Initial data moved out of the component
const initialSources: Source[] = [
  {
    id: '1',
    name: 'Asura Scans',
    url: 'https://asuratoon.com/',
    icon: '/icons/asura-icon.png',
  },
  {
    id: '2',
    name: 'Flame Scans',
    url: 'https://flamecomics.com/',
    icon: '/icons/flame-icon.png',
  },
  { id: '3', name: 'Webtoon', url: 'https://www.webtoons.com/' },
  { id: '4', name: 'Reaper Scans', url: 'https://reaperscans.com/' },
  { id: '5', name: 'MangaDex', url: 'https://mangadex.org/' },
]

const SourcesSection = () => {
  const [sources, setSources] = useState<Source[]>(initialSources)
  const [isAdding, setIsAdding] = useState(false)

  // Handlers for the new empty card
  const handleSaveNew = (newSource: Omit<Source, 'id'>) => {
    const sourceWithId = { ...newSource, id: Date.now().toString() }
    setSources([sourceWithId, ...sources])
    setIsAdding(false)
  }

  const handleCancelNew = () => {
    setIsAdding(false)
  }

  return (
    <div id="sources" className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Comic Sources</h1>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <InputGroup className="py-[17px]">
          <InputGroupAddon>
            <Search className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search" />
        </InputGroup>

        {/* Disable button if already adding a new card */}
        <Button
          variant="default"
          className="hover:cursor-pointer"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <Plus className="mr-2 size-4" />
          Add Source
        </Button>
      </div>

      {/* List */}
      <div
        className={cn(
          'custom-scrollbar flex max-h-[400px] min-h-[400px] w-full flex-col gap-2 overflow-y-auto rounded-lg border p-3 pr-4',
          sources.length === 0 && !isAdding && 'items-center justify-center'
        )}
      >
        {/* Render the empty card at the top if isAdding is true */}
        {isAdding && (
          <SourceCard
            isNew={true}
            source={{ id: 'temp', name: '', url: '', icon: '' }}
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          />
        )}

        {sources.length === 0 && !isAdding ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
            <SearchX className="size-10" />
            <div className="text-muted-foreground text-center">
              No sources found
            </div>
          </div>
        ) : (
          sources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              onSave={(updatedSource) => {
                // Example update logic for existing cards
                setSources(
                  sources.map((s) =>
                    s.id === updatedSource.id ? (updatedSource as Source) : s
                  )
                )
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SourcesSection
