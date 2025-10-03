'use client'

import React from 'react'
import useSWR from 'swr';
import { Settings2 } from 'lucide-react';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { Button } from '@/components/ui/button';
import { fetchOngoingComicByType } from '@/services/library/comic.service';
import Link from 'next/link';
import { formatDistanceToNow } from '@/lib/utils';
import ComicCard from '@/components/ui/comic-card';

const statusColorMap: { [key: string]: string } = {
  "Good": "text-yellow-400 size-3 mt-0.5",
  "Mid": "text-orange-400 size-3 mt-0.5",
  "Bad": "text-red-500 size-3 mt-0.5",
};

const fetcher = () => fetchOngoingComicByType();

const OnGoing = () => {
    const { data: libraryReads, error, isLoading } = useSWR(['ongoing'], fetcher);

    return (
        <div>
            {isLoading && <SectionSkeleton page='library'/>}
            {error && <p className="text-red-500">Failed to fetch recommended reads. Please try again later.</p>}

            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2'>
                {!isLoading && !error && libraryReads && libraryReads.map((read) => (
                    <ComicCard key={read.id} read={read} page='library'/>
                ))}
            </div>
        </div>
    )
}

export default OnGoing