'use client'

import React, { useState } from 'react'
import useSWR from 'swr';
import { fetchAllReads } from '@/services/home/comic.service';
import HorizontalSection from './horizontal-section';
import { FilterState } from './ui/home-filters';

const fetcher = () => fetchAllReads();

const LibraryRead = () => {
    const [filters, setFilters] = useState<FilterState | null>(null);
    const { data: allReads, isLoading, error } = useSWR(['all-reads'], fetcher);

    return (
        <HorizontalSection
            title="Library"
            href="/library"
            data={allReads}
            isLoading={isLoading}
            error={error}
            section="recent-reads"
            showAddButton={false}
            filters={filters || undefined}
            onFilterChange={setFilters}
        />
    )
}

export default LibraryRead
