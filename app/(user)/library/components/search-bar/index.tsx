'use client'

import React from 'react'

import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { LibraryFilters } from './library-filters'

const SearchBar = () => {
  return (
    <div className="w-full max-w-xl">
      <InputGroup className="py-4.5">
        <InputGroupAddon>
          <Search className="text-muted-foreground" />
        </InputGroupAddon>

        <InputGroupInput placeholder="Search library..." />

        <InputGroupAddon align="inline-end">
          <LibraryFilters />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchBar
