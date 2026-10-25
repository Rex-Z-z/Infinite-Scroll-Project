'use client'

import React, { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Activity,
  Book,
  Calendar,
  Hash,
  RotateCcw,
  Search,
  Star,
  Tag,
} from 'lucide-react'

import { FilterIcon } from '@/components/icons/custom-icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const TIME_PRESETS = ['Recent', '7 Days', '1 Month', '6 Months'] as const
const YEARS = ['2023', '2024', '2025', '2026'] as const

const TYPE_OPTIONS = [
  { key: 'manga', label: 'Manga' },
  { key: 'manhwa', label: 'Manhwa' },
  { key: 'manhua', label: 'Manhua' },
] as const

const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Thriller',
  'Tragedy',
]

const TAGS = [
  'Based on a Web Novel',
  'Badass Male Lead',
  'Badass Female Lead',
  'Based on a Novel',
  'Regular Male Lead',
  'Regular Female Lead',
  'Strong Male Lead',
  'Strong Female Lead',
  'Handsome Male Lead',
  'Handsome Female Lead',
  'Glasses-Wearing Male Lead',
  'Glasses-Wearing Female Lead',
  'Older Male Younger Female',
  'Older Female Younger Male',
  'Older Male Older Female',
  'Older Female Older Male',
  'Childhood Friend/s',
  'High School',
  'College',
]

const RATINGS = [
  'Absolute Cinema',
  'Awesome',
  'Great',
  'Good',
  'Regular',
  'Bad',
  'Garbage',
]

const STATUSES = [
  'Ongoing',
  'Completed',
  'On Hold',
  'Plan to Read',
  'Dropped',
  'Cancelled',
]

export function LibraryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)

  // --- Filter State ---
  const [timePreset, setTimePreset] = useState(
    () => searchParams.get('time') || 'Recent'
  )
  const [startYear, setStartYear] = useState(
    () => searchParams.get('from') || '2025'
  )
  const [endYear, setEndYear] = useState(() => searchParams.get('to') || '2025')

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    () => searchParams.get('types')?.split(',').filter(Boolean) || []
  )
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    () => searchParams.get('statuses')?.split(',').filter(Boolean) || []
  )
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    () => searchParams.get('genres')?.split(',').filter(Boolean) || []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    () => searchParams.get('tags')?.split(',').filter(Boolean) || []
  )
  const [selectedRatings, setSelectedRatings] = useState<string[]>(
    () => searchParams.get('ratings')?.split(',').filter(Boolean) || []
  )

  // --- Local Search State for Long Lists ---
  const [genreQuery, setGenreQuery] = useState('')
  const [tagQuery, setTagQuery] = useState('')
  // Constants (In production, TOTAL_TAG_COUNT & search results would come from your API/DB)
  const POPULAR_TAGS_LIMIT = 6
  const SEARCH_RESULTS_LIMIT = 12
  const TOTAL_TAG_COUNT = 142850 // Or TAGS.length if local

  // 1. Exclude already-selected tags from the suggestion pool so they don't duplicate
  const unselectedTags = TAGS.filter((tag) => !selectedTags.includes(tag))

  // 2. Determine which tags to display based on whether the user is searching
  const isSearchingTags = tagQuery.trim().length > 0

  // Generic array toggle helper
  const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  // Filtered lists based on search inputs
  const filteredGenres = GENRES.filter((g) =>
    g.toLowerCase().includes(genreQuery.toLowerCase())
  )
  const filteredTags = TAGS.filter((t) =>
    t.toLowerCase().includes(tagQuery.toLowerCase())
  )

  // Active filter group count
  const activeFilterCount = [
    timePreset !== 'Recent',
    selectedTypes.length > 0,
    selectedStatuses.length > 0,
    selectedGenres.length > 0,
    selectedTags.length > 0,
    selectedRatings.length > 0,
  ].filter(Boolean).length

  const handleReset = () => {
    setTimePreset('Recent')
    setStartYear('2025')
    setEndYear('2025')
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedGenres([])
    setSelectedTags([])
    setSelectedRatings([])
    setGenreQuery('')
    setTagQuery('')
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())

    const setOrDelete = (key: string, values: string[]) => {
      if (values.length > 0) params.set(key, values.join(','))
      else params.delete(key)
    }

    if (timePreset !== 'Recent') {
      params.set('time', timePreset)
      if (timePreset === 'Custom') {
        params.set('from', startYear)
        params.set('to', endYear)
      } else {
        params.delete('from')
        params.delete('to')
      }
    } else {
      params.delete('time')
      params.delete('from')
      params.delete('to')
    }

    setOrDelete('types', selectedTypes)
    setOrDelete('statuses', selectedStatuses)
    setOrDelete('genres', selectedGenres)
    setOrDelete('tags', selectedTags)
    setOrDelete('ratings', selectedRatings)

    router.push(`?${params.toString()}`)
    setOpen(false)
  }

  const matchingUnselectedTags = isSearchingTags
    ? unselectedTags.filter((t) =>
        t.toLowerCase().includes(tagQuery.toLowerCase())
      )
    : unselectedTags

  const displayedSuggestedTags = matchingUnselectedTags.slice(
    0,
    isSearchingTags ? SEARCH_RESULTS_LIMIT : POPULAR_TAGS_LIMIT
  )

  // 3. Calculate how many tags are hidden to show in the static counter
  const remainingTagCount = isSearchingTags
    ? Math.max(0, matchingUnselectedTags.length - displayedSuggestedTags.length)
    : Math.max(
        0,
        TOTAL_TAG_COUNT - selectedTags.length - displayedSuggestedTags.length
      )

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'text-muted-foreground hover:text-foreground h-6 gap-1.5 rounded-md px-2 text-xs md:h-7 md:px-2.5 md:text-sm',
            activeFilterCount > 0 &&
              'text-primary hover:text-primary bg-primary/10'
          )}
        >
          <FilterIcon
            isFill={activeFilterCount > 0}
            strokeWidth={1.7}
            className={cn(
              'size-3.5 md:size-4',
              activeFilterCount > 0 && 'text-primary'
            )}
          />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground ml-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[calc(100vw-2rem)] p-0 sm:w-[420px]"
        align="end"
      >
        {/* Sticky Header */}
        <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Library Filters</h4>
            {activeFilterCount > 0 && (
              <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[11px] font-medium">
                {activeFilterCount} active
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground h-7 gap-1 px-2 text-xs"
            >
              <RotateCcw className="size-3" />
              Reset
            </Button>
          )}
        </div>

        {/* Single Master ScrollArea */}
        <ScrollArea className="h-[420px]">
          <div className="space-y-5 p-4">
            {/* --- 1. Time & Relevance --- */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="text-muted-foreground size-3.5" />
                <Label className="text-xs font-semibold">
                  Time & Relevance
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {TIME_PRESETS.map((period) => (
                  <Button
                    key={period}
                    type="button"
                    variant={timePreset === period ? 'default' : 'outline'}
                    size="sm"
                    className="h-8 justify-start px-3 text-xs font-normal"
                    onClick={() => setTimePreset(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>

              <Button
                type="button"
                variant={timePreset === 'Custom' ? 'default' : 'outline'}
                size="sm"
                className="h-8 w-full text-xs font-normal"
                onClick={() => setTimePreset('Custom')}
              >
                Custom Year Range
              </Button>

              {timePreset === 'Custom' && (
                <div className="animate-in fade-in zoom-in-95 flex items-center gap-2 pt-1 duration-200">
                  <Select
                    value={startYear}
                    onValueChange={(val) => {
                      setStartYear(val)
                      if (Number(val) > Number(endYear)) setEndYear(val)
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={y} className="text-xs">
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-muted-foreground text-xs">to</span>

                  <Select value={endYear} onValueChange={setEndYear}>
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem
                          key={y}
                          value={y}
                          disabled={Number(y) < Number(startYear)}
                          className="text-xs"
                        >
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Separator />

            {/* --- 2. Type --- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Book className="text-muted-foreground size-3.5" />
                  <Label className="text-xs font-semibold">Type</Label>
                </div>
                {selectedTypes.length > 0 && (
                  <span className="text-muted-foreground text-[11px]">
                    {selectedTypes.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {TYPE_OPTIONS.map(({ key, label }) => {
                  const isSelected = selectedTypes.includes(key)
                  return (
                    <Button
                      key={key}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleItem(key, setSelectedTypes)}
                      className={cn(
                        'h-8 text-xs font-normal transition-all',
                        isSelected &&
                          'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-medium'
                      )}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <Separator />

            {/* --- 3. Reading Status --- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Activity className="text-muted-foreground size-3.5" />
                  <Label className="text-xs font-semibold">
                    Reading Status
                  </Label>
                </div>
                {selectedStatuses.length > 0 && (
                  <span className="text-muted-foreground text-[11px]">
                    {selectedStatuses.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {STATUSES.map((status) => (
                  <label
                    key={status}
                    htmlFor={`status-${status}`}
                    className="hover:bg-muted/50 flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors"
                  >
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() =>
                        toggleItem(status, setSelectedStatuses)
                      }
                    />
                    <span className="truncate">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* --- 4. Genres (With Live Filter) --- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <Tag className="text-muted-foreground size-3.5" />
                  <Label className="text-xs font-semibold">Genres</Label>
                  {selectedGenres.length > 0 && (
                    <span className="bg-primary/10 text-primary py-0.2 rounded-full px-1.5 text-[10px] font-medium">
                      {selectedGenres.length}
                    </span>
                  )}
                </div>

                <div className="relative w-44">
                  <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3 -translate-y-1/2" />
                  <Input
                    type="search"
                    value={genreQuery}
                    onChange={(e) => setGenreQuery(e.target.value)}
                    placeholder="Filter genres..."
                    className="h-7 pl-7 text-xs"
                  />
                </div>
              </div>

              {filteredGenres.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                  {filteredGenres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() =>
                          toggleItem(genre, setSelectedGenres)
                        }
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="cursor-pointer text-xs font-normal"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground py-2 text-center text-xs">
                  No genres match &ldquo;{genreQuery}&rdquo;
                </p>
              )}
            </div>

            <Separator />

            {/* --- 5. Tags (Fixed State + Pill Layout) --- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <Hash className="text-muted-foreground size-3.5" />
                  <Label className="text-xs font-semibold">Tags</Label>
                  {selectedTags.length > 0 && (
                    <span className="bg-primary/10 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                      {selectedTags.length}
                    </span>
                  )}
                </div>

                <div className="relative w-48">
                  <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3 -translate-y-1/2" />
                  <Input
                    type="search"
                    value={tagQuery}
                    onChange={(e) => setTagQuery(e.target.value)}
                    placeholder="Search all tags..."
                    className="h-7 pl-7 text-xs"
                  />
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                    Active
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleItem(tag, setSelectedTags)}
                        className="border-primary bg-primary/10 text-primary hover:bg-primary/20 flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-left text-xs font-medium transition-colors"
                      >
                        <span>{tag}</span>
                        <span className="text-[10px] leading-none opacity-70 hover:opacity-100">
                          ✕
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                  {isSearchingTags ? 'Matching Tags' : 'Popular Tags'}
                </span>

                {displayedSuggestedTags.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {displayedSuggestedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleItem(tag, setSelectedTags)}
                        className="hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer rounded-md border bg-transparent px-2.5 py-1 text-left text-xs transition-all"
                      >
                        {tag}
                      </button>
                    ))}

                    {/* 3. Static Non-Interactive Counter Badge */}
                    {remainingTagCount > 0 && (
                      <span
                        className="text-muted-foreground/70 bg-muted/40 rounded-md border border-dashed px-2 py-1 text-[11px] select-none"
                        title="Use the search box above to find specific tags"
                      >
                        +{remainingTagCount.toLocaleString()} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground py-2 text-xs">
                    No tags found matching &ldquo;{tagQuery}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* --- 6. Rating --- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="text-muted-foreground size-3.5" />
                  <Label className="text-xs font-semibold">Rating</Label>
                </div>
                {selectedRatings.length > 0 && (
                  <span className="text-muted-foreground text-[11px]">
                    {selectedRatings.length} selected
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {RATINGS.map((rating) => {
                  const isSelected = selectedRatings.includes(rating)
                  return (
                    <Button
                      key={rating}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleItem(rating, setSelectedRatings)}
                      className={cn(
                        'h-7 rounded-full px-3 text-xs font-normal transition-all',
                        isSelected &&
                          'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-medium'
                      )}
                    >
                      {rating}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="bg-background flex items-center gap-2 border-t p-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 flex-1 text-xs"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-9 flex-1 text-xs"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
