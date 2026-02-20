'use client'

import React, { useState } from 'react'

import { Activity, Book, Calendar, Star, Tag } from 'lucide-react'

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
  // --- State ---
  const [timePreset, setTimePreset] = useState('Recent') // "Recent" | "7 Days" | ... | "Custom"

  // Custom Years
  const [startYear, setStartYear] = useState('2025')
  const [endYear, setEndYear] = useState('2025')

  // Type
  const [types, setTypes] = useState({
    manga: false,
    manhwa: false,
    manhua: false,
  })

  // Genres (Stored as a Set for easier toggling, or just an array)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  // Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  // Ratings
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])
  // Statuses
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  // --- Helpers ---
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const toggleRating = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    )
  }

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    )
  }

  // Calculate active filters count
  const activeFilterCount = [
    timePreset !== 'Recent',
    Object.values(types).some((t) => t),
    selectedGenres.length > 0,
    selectedRatings.length > 0,
    selectedStatuses.length > 0,
    selectedTags.length > 0,
  ].filter(Boolean).length

  const handleReset = () => {
    setTimePreset('Recent')
    setTypes({ manga: false, manhwa: false, manhua: false })
    setSelectedGenres([])
    setSelectedTags([])
    setSelectedRatings([])
    setSelectedStatuses([])
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-7 gap-2 px-2"
        >
          {activeFilterCount ? (
            <FilterIcon isFill className="text-primary size-4.5" />
          ) : (
            <FilterIcon strokeWidth={1.7} className="size-4.5" />
          )}
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        {/* Header */}
        <div className="bg-muted/30 flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-semibold">Library Filters</h4>
          <Button variant="ghost" size="xs" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <ScrollArea className="custom-scrollbar h-[380px]">
          <div className="space-y-4 px-3 pb-1">
            {/* --- Time Section --- */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="text-muted-foreground size-4" />
                Time & Relevance
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Recent', '7 Days', '1 Month', '6 Months'].map((period) => (
                  <Button
                    key={period}
                    variant={timePreset === period ? 'default' : 'outline'}
                    className="h-8 justify-start text-xs"
                    onClick={() => setTimePreset(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>

              {/* Custom Range Toggle */}
              <Button
                variant={timePreset === 'Custom' ? 'default' : 'outline'}
                className="h-8 w-full text-xs"
                onClick={() => setTimePreset('Custom')}
              >
                Custom Year Range
              </Button>

              {timePreset === 'Custom' && (
                <div className="animate-in fade-in zoom-in-95 flex items-center gap-2 duration-200">
                  <Select value={startYear} onValueChange={setStartYear}>
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {['2023', '2024', '2025'].map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground text-xs">-</span>
                  <Select value={endYear} onValueChange={setEndYear}>
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {['2023', '2024', '2025'].map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Separator />

            {/* --- Type Section --- */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Book className="text-muted-foreground size-4" />
                Type
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(types).map(([key, value]) => (
                  <div
                    key={key}
                    className={`cursor-pointer rounded-md border px-4 py-2 text-xs font-medium transition-colors select-none ${value ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground hover:bg-muted bg-transparent'} `}
                    onClick={() =>
                      setTypes((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof types],
                      }))
                    }
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* --- Reading Status Section --- */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="text-muted-foreground size-4" />
                Reading Status
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {STATUSES.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                    />
                    <Label
                      htmlFor={`status-${status}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* --- Genre Section (Grid Layout) --- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-6 px-1 pt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="text-muted-foreground size-4" />
                  Genres
                </div>

                <Input
                  type="search"
                  placeholder="Search genres..."
                  className="h-8 !text-xs"
                />
              </div>
              <ScrollArea className="h-[130px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {GENRES.map((genre) => (
                    <div key={genre} className="flex items-center space-x-1.5">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => toggleGenre(genre)}
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="text-md cursor-pointer"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* --- Tag Section (Grid Layout) --- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-6 px-1 pt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="text-muted-foreground size-4" />
                  Tags
                </div>

                <Input
                  type="search"
                  placeholder="Search tags..."
                  className="h-8 !text-xs"
                />
              </div>
              <ScrollArea className="h-[130px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {TAGS.map((tag) => (
                    <div key={tag} className="flex items-center space-x-1.5">
                      <Checkbox
                        id={`genre-${tag}`}
                        checked={selectedGenres.includes(tag)}
                        onCheckedChange={() => toggleGenre(tag)}
                      />
                      <Label
                        htmlFor={`genre-${tag}`}
                        className="max-w-[150px] cursor-pointer truncate text-xs"
                        title={tag}
                      >
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* --- Rating Section --- */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Star className="size-4" />
                Rating
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {RATINGS.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRating(rating)}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {rating}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-2">
          <Button className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
