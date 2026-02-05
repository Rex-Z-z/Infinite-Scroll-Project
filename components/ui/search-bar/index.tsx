// app/(user)/library/components/search-bar/index.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react';
import SearchPreview from './search-preview';
import { mockReads } from '@/lib/mock-data';
import { ReadItem } from '@/lib/types';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [filteredResults, setFilteredResults] = useState<ReadItem[]>([]);
    const [history, setHistory] = useState<string[]>(['Solo Leveling', 'Omniscient Reader']); 
    
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside to close the preview
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter results as user types
    useEffect(() => {
        if (!query) {
            setFilteredResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = mockReads.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.altTitle.toLowerCase().includes(lowerQuery)
        );
        setFilteredResults(results.slice(0, 5)); // Limit to top 5 results
    }, [query]);

    const handleSelectResult = (item: ReadItem) => {
        console.log('Navigate to:', item.title);
        // Add to history if not exists
        if (!history.includes(item.title)) {
             setHistory(prev => [item.title, ...prev].slice(0, 5));
        }
        setIsFocused(false);
        setQuery(item.title);
        // Implement navigation here, e.g., router.push(`/library/${item.id}`)
    };

    const handleSelectHistory = (historyItem: string) => {
        setQuery(historyItem);
    };

    return (
        // Add ref here to detect outside clicks
        <div className="relative w-xl" ref={containerRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 z-10" />
            
            <input 
                type="text" 
                placeholder="Search" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full rounded-md border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-74 py-[7.6px] text-sm text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring-3 focus:ring-gray-200 focus:dark:ring-gray-700 focus:border-blue-600 focus:dark:border-blue-500 hover:border-gray-400 hover:dark:border-gray-600"
            />

            {/* Render Preview if focused */}
            {isFocused && (
                <SearchPreview 
                    results={filteredResults}
                    history={history}
                    isSearching={query.length > 0}
                    onSelectResult={handleSelectResult}
                    onSelectHistory={handleSelectHistory}
                    onClearHistory={() => setHistory([])}
                />
            )}
        </div>
    )
}

export default SearchBar