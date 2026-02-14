'use client'

import React from 'react'
import { Search } from 'lucide-react';
import DropdownType from './dropdown-type';
import DropdownGenre from './dropdown-genre';
import DropdownRelevance from './dropdown-relevance';

const SearchBar = () => {
    return (
        <div className="relative w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Search" className={`w-full rounded-lg border-2 pl-10 pr-74 py-[7.6px] text-sm file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}/>

            <div className="absolute right-1.5 top-[52.34%] -translate-y-1/2">
                <DropdownType />
                <DropdownGenre />
                <DropdownRelevance />
            </div>
        </div>
    )
}

export default SearchBar