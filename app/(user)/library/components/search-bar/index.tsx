import React from 'react'

import dynamic from 'next/dynamic'

import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const DynamicLibraryFilters = dynamic(
  () => import('./library-filters').then((mod) => mod.LibraryFilters),
  {
    loading: () => (
      <div className="bg-muted h-5.5 w-[80px] animate-pulse rounded-md md:h-7" />
    ),
  }
)

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
          <DynamicLibraryFilters />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchBar
