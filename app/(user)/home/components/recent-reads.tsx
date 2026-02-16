'use client';

import React, { useState } from 'react'
import useSWR from 'swr';
import { fetchRecentReads } from '@/services/home/comic.service';
import HorizontalSection from './horizontal-section';
import { FilterState } from './ui/home-filters';

const fetcher = () => fetchRecentReads();

const RecentReads = () => {
    const [filters, setFilters] = useState<FilterState | null>(null);
    const { data: recentReads, isLoading, error } = useSWR(['recent-reads'], fetcher);

    return (
        <HorizontalSection
            title="Recent Read"
            href="/library"
            data={recentReads}
            isLoading={isLoading}
            error={error}
            section="recent-reads"
            showAddButton={true}
            filters={filters || undefined}
            onFilterChange={setFilters}
        />
    )
}

export default RecentReads
