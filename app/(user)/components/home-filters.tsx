'use client'

import React, { useState } from 'react'

import { CalendarCog, RotateCcw, Star, Tag } from 'lucide-react'

import { FilterIcon } from '@/components/icons/custom-icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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

const RATING_OPTIONS = [
  { key: 'absoluteCinema', label: 'Absolute Cinema' },
  { key: 'awesome', label: 'Awesome' },
  { key: 'great', label: 'Great' },
  { key: 'good', label: 'Good' },
  { key: 'regular', label: 'Regular' },
  { key: 'bad', label: 'Bad' },
  { key: 'garbage', label: 'Garbage' },
] as const

const DropdownHome = () => {
  const [preset, setPreset] = useState<string>('Recent')
  const [startYear, setStartYear] = useState('2025')
  const [endYear, setEndYear] = useState('2025')

  const [types, setTypes] = useState<Record<string, boolean>>({
    manga: false,
    manhwa: false,
    manhua: false,
  })

  const [rating, setRating] = useState<Record<string, boolean>>({
    absoluteCinema: false,
    awesome: false,
    great: false,
    good: false,
    regular: false,
    bad: false,
    garbage: false,
  })

  // Accurate count of active filter groups
  const activeTypeCount = Object.values(types).filter(Boolean).length
  const activeRatingCount = Object.values(rating).filter(Boolean).length
  const activeFilterCount =
    (preset !== 'Recent' ? 1 : 0) +
    (activeTypeCount > 0 ? 1 : 0) +
    (activeRatingCount > 0 ? 1 : 0)

  const toggleType = (key: string) =>
    setTypes((prev) => ({ ...prev, [key]: !prev[key] }))

  const toggleRating = (key: string) =>
    setRating((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleReset = () => {
    setPreset('Recent')
    setStartYear('2025')
    setEndYear('2025')
    setTypes({ manga: false, manhwa: false, manhua: false })
    setRating({
      absoluteCinema: false,
      awesome: false,
      great: false,
      good: false,
      regular: false,
      bad: false,
      garbage: false,
    })
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative size-8 md:size-9"
        >
          <FilterIcon
            isFill={activeFilterCount > 0}
            strokeWidth={1.7}
            className={cn(
              'size-3.5 transition-colors md:size-4',
              activeFilterCount > 0 && 'text-primary'
            )}
          />
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 md:w-96" align="end">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Filter Content</h4>
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

        <div className="space-y-4">
          {/* --- Time Period Section --- */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <CalendarCog className="text-muted-foreground size-3.5" />
              <Label className="text-xs font-medium">Time Period</Label>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {TIME_PRESETS.map((period) => (
                <Button
                  key={period}
                  variant={preset === period ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 justify-start px-3 text-xs font-normal"
                  onClick={() => setPreset(period)}
                >
                  {period}
                </Button>
              ))}
            </div>

            <Button
              variant={preset === 'Custom' ? 'default' : 'outline'}
              size="sm"
              className="h-8 w-full justify-center text-xs font-normal"
              onClick={() => setPreset('Custom')}
            >
              Custom Year Range
            </Button>

            {preset === 'Custom' && (
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

          {/* --- Type Section (Inline 3-col Grid) --- */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Tag className="text-muted-foreground size-3.5" />
                <Label className="text-xs font-medium">Type</Label>
              </div>
              {activeTypeCount > 0 && (
                <span className="text-muted-foreground text-[11px]">
                  {activeTypeCount} selected
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {TYPE_OPTIONS.map(({ key, label }) => {
                const isSelected = types[key]
                return (
                  <Button
                    key={key}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleType(key)}
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

          {/* --- Rating Section (Inline Flex Pills) --- */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="text-muted-foreground size-3.5" />
                <Label className="text-xs font-medium">Rating</Label>
              </div>
              {activeRatingCount > 0 && (
                <span className="text-muted-foreground text-[11px]">
                  {activeRatingCount} selected
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {RATING_OPTIONS.map(({ key, label }) => {
                const isSelected = rating[key]
                return (
                  <Button
                    key={key}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleRating(key)}
                    className={cn(
                      'h-7 rounded-full px-3 text-xs font-normal transition-all',
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
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownHome
