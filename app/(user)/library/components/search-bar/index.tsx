'use client'

import React from 'react'

import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

import { LibraryFilters } from './library-filters'

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn('w-full lg:max-w-xl', className)}>
      <InputGroup className="py-1 md:py-4.5">
        <InputGroupAddon>
          <Search className="text-muted-foreground size-3 md:size-4" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search library..."
          className="text-xs md:text-base"
        />

        <InputGroupAddon align="inline-end">
          <LibraryFilters />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchBar
