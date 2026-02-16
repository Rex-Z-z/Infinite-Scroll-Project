'use client'

import React, { useState } from 'react'
import useSWR from 'swr';
import { fetchRecommendedReads } from '@/services/home/comic.service';
import HorizontalSection from './horizontal-section';
import { FilterState } from './ui/home-filters';

const fetcher = () => fetchRecommendedReads();

const Recommendations = () => {
    const [filters, setFilters] = useState<FilterState | null>(null);
    const { data: recommendedReads, isLoading, error } = useSWR(['recommended-reads'], fetcher);

    return (
        <HorizontalSection
            title="Recommendation"
            href="/library"
            data={recommendedReads}
            isLoading={isLoading}
            error={error}
            section="recommendations"
            showAddButton={false}
            filters={filters || undefined}
            onFilterChange={setFilters}
        />
    )
}

export default Recommendations
