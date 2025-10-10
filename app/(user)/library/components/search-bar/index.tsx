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
            <input type="text" placeholder="Search" className="w-full rounded-md border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-74 py-[7.6px] text-sm text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring-3 focus:ring-gray-200 focus:dark:ring-gray-700 focus:border-blue-600 focus:dark:border-blue-500 hover:border-gray-400 hover:dark:border-gray-600"/>

            <div className="absolute right-1.5 top-[55%] -translate-y-1/2">
                <DropdownType />
                <DropdownGenre />
                <DropdownRelevance />
            </div>
        </div>
    )
}

export default SearchBar