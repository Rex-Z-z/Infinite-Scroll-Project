'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CalendarCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { fetchAllReads } from '@/services/home/comic.service';
import useSWR from 'swr';
import ComicCard from '@/components/ui/comic-card';

const fetcher = () => fetchAllReads();

const LibraryRead = () => {
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
    const libraryContainerRef = useRef<HTMLDivElement>(null);
    
    const { data: allReads, isLoading, error } = useSWR(['all-reads'], fetcher);

    useEffect(() => {
        const container = libraryContainerRef.current;
        if (container) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            };
            container.addEventListener('wheel', handleWheel);
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, []);

    return (
        <section className='flex flex-col w-full p-4 gap-2'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <p className='text-2xl font-bold hover:underline hover:cursor-pointer'>Library</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7 mt-[1.5px]">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Date Sort */}
                <div className='flex flex-row gap-1.5'>
                    <div className={`flex items-center gap-1.5 transition-all duration-300 ease-in-out ${isDateFilterOpen ? 'w-fit opacity-100' : 'w-0 opacity-0'} overflow-hidden`}>
                        <Button variant="outline" onClick={() => setIsDateFilterOpen(!isDateFilterOpen)} className="text-xs size-8 focus:border-1 focus:border-blue-500 hover:cursor-pointer">7d</Button>
                        <Button variant="outline" onClick={() => setIsDateFilterOpen(!isDateFilterOpen)} className="text-xs size-8 focus:border-1 focus:border-blue-500 hover:cursor-pointer">1m</Button>
                        <Button variant="outline" onClick={() => setIsDateFilterOpen(!isDateFilterOpen)} className="text-xs size-8 focus:border-1 focus:border-blue-500 hover:cursor-pointer">6m</Button>
                    </div>

                    <Button variant="outline" size="icon" onClick={() => setIsDateFilterOpen(!isDateFilterOpen)} className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                        <CalendarCog />
                    </Button>
                </div>
            </div>
            {isLoading && <SectionSkeleton />}
            {error && <p className="text-red-500">{error}</p>}

            {/* Card Sections */}
            <div ref={libraryContainerRef} className='flex flex-row gap-2 overflow-x-auto flex-nowrap pr-1 [&::-webkit-scrollbar]:hidden'>
                { !isLoading && !error && allReads && allReads.map((read) => (
                    <ComicCard key={read.id} read={read} />
                ))}
            </div>
        </section>
    )
}

export default LibraryRead
