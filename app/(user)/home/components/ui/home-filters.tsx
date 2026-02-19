'use client'

import React, { useState } from 'react'

import { CalendarCog, Filter, Star, Tag } from 'lucide-react'

import { FilterIcon } from '@/components/icons/custom-icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

interface NavBarProps {
  section?: string
}

const RATINGS = [
  'Absolute Cinema',
  'Awesome',
  'Great',
  'Good',
  'Regular',
  'Bad',
  'Garbage',
]

const DropdownHome = ({ section = 'recent-reads' }: NavBarProps) => {
  // --- State ---
  const [dateRange, setDateRange] = useState('Recent')
  const [preset, setPreset] = useState('Recent')

  // Custom Years
  const [startYear, setStartYear] = useState('2025')
  const [endYear, setEndYear] = useState('2025')

  // Type
  const [types, setTypes] = useState({
    manga: false,
    manhwa: false,
    manhua: false,
  })

  // Rating
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])

  const toggleRating = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    )
  }

  // Helper to count active filters for a badge notification
  const activeFilterCount = [
    dateRange === 'Custom',
    preset !== 'Recent',
    Object.values(types).some((t) => t),
    selectedRatings.length > 0,
  ].filter(Boolean).length

  const handlePresetChange = (val: string) => {
    setPreset(val)
    if (val !== 'Custom') {
      setDateRange('Recent')
    } else {
      setDateRange('Custom')
    }
  }

  const handleReset = () => {
    setPreset('Recent')
    setDateRange('Recent')
    setTypes({ manga: false, manhwa: false, manhua: false })
    setSelectedRatings([])
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-6 md:size-9 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
        >
          {activeFilterCount ? (
            <FilterIcon isFill className="text-primary size-2.5 md:size-4" />
          ) : (
            <FilterIcon strokeWidth={1.7} className="size-2.5 md:size-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="end">
        {/* Header */}
        <div className="bg-muted/30 flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-semibold">Filter Content</h4>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary h-auto p-0 text-xs"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <Separator />

        <ScrollArea
          className={cn(
            `px-4 py-4`,
            section !== 'recent-reads' ? 'h-[400px]' : ''
          )}
        >
          <div className="space-y-6">
            {/* --- Date Section --- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarCog className="text-muted-foreground size-4" />
                <Label className="font-semibold">Time Period</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Recent', '7 Days', '1 Month', '6 Months'].map((period) => (
                  <Button
                    key={period}
                    variant={preset === period ? 'default' : 'outline'}
                    className="justify-start text-xs"
                    onClick={() => handlePresetChange(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>

              {/* Custom Year Range Selection */}
              {section !== 'recent-reads' && (
                <div>
                  <Button
                    variant={dateRange === 'Custom' ? 'default' : 'outline'}
                    size="sm"
                    className="mb-2 w-full text-xs"
                    onClick={() => handlePresetChange('Custom')}
                  >
                    Custom Year Range
                  </Button>

                  {dateRange === 'Custom' && (
                    <div className="animate-in fade-in zoom-in-95 flex w-full items-center gap-2 duration-200">
                      <Select value={startYear} onValueChange={setStartYear}>
                        <SelectTrigger className="h-8 w-full">
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
                      <span className="text-muted-foreground text-xs">to</span>
                      <Select value={endYear} onValueChange={setEndYear}>
                        <SelectTrigger className="h-8 w-full">
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
              )}
            </div>

            {section !== 'recent-reads' && <Separator />}

            {section !== 'recent-reads' && (
              <>
                {/* --- Type Section --- */}
                <div className="space-y-3">
                  <Label className="font-semibold">
                    <Tag className="text-muted-foreground size-4" />
                    Type
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(types).map(([key, value]) => (
                      <div
                        key={key}
                        className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition-colors select-none ${value ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground hover:bg-muted bg-transparent'} `}
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

                {/* --- Rating Section --- */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star className="size-4" />
                    Rating
                  </div>
                  <div className="space-y-2">
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
              </>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownHome
