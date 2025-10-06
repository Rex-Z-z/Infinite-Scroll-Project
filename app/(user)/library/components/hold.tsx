'use client'

import React from 'react'
import useSWR from 'swr';
import SectionSkeleton from '@/components/ui/section-skeleton';
import ComicCard from '@/components/ui/comic-card';
import { fetchHoldComicByType } from '@/services/library/comic.service';

const fetcher = () => fetchHoldComicByType();

const Hold = () => {
    const { data: libraryReads, error, isLoading } = useSWR(['hold'], fetcher);
    
    return (
        <div>
            {isLoading && <SectionSkeleton page='library'/>}
            {error && <p className="text-red-500">{error}</p>}

            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2'>
                {!isLoading && !error && libraryReads && libraryReads.map((read) => (
                    <ComicCard key={read.id} read={read} page='library' />
                ))}
            </div>
        </div>
    )
}

export default Hold