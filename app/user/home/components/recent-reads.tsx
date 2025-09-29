'use client';

import React, { useEffect, useRef, useState } from 'react'
import { CalendarCog, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { formatDistanceToNow } from '@/lib/utils';
import { fetchRecentReads } from '@/services/home/comic.service';
import useSWR from 'swr';

const statusColorMap: { [key: string]: string } = {
  "Good": "text-yellow-400 size-4 mt-0.5",
  "Mid": "text-orange-400 size-4 mt-0.5",
  "Bad": "text-red-500 size-4 mt-0.5",
};

const fetcher = () => fetchRecentReads();

const RecentReads = () => {
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
    const recentReadsContainerRef = useRef<HTMLDivElement>(null);

    const { data: recentReads, isLoading, error } = useSWR(['recent-reads'], fetcher);

    useEffect(() => {
        const container = recentReadsContainerRef.current;
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
                    <p className='text-2xl font-bold hover:underline hover:cursor-pointer'>
                        <a href="/user/library">Recent Read</a>
                    </p>
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
            <div ref={recentReadsContainerRef} className='flex flex-row gap-2 overflow-x-auto flex-nowrap pr-1 [&::-webkit-scrollbar]:hidden'>
                {!isLoading && !error && recentReads && recentReads.map((read) => (
                    // The key prop is essential for React lists!
                    <div key={read.id} className="max-w-60">
                        <a href="#" className="relative block w-full h-75 aspect-[2/3] overflow-hidden">
                            <img src={read.imageUrl} alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover rounded-md"/>
                            <Button variant="outline" size="icon" className="absolute size-8 top-2 left-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:cursor-pointer">
                            <Settings2 />
                            </Button>
                        </a>
                        <div className='mt-2 p-2 rounded-md hover:bg-gray-800'>
                            <a href="#">
                                <h5 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white max-w-180 truncate" title={read.title}>{read.title}</h5>
                            </a>
                            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{formatDistanceToNow(read.lastRead)}</p>
                            <div className='flex flex-row justify-between text-sm font-normal text-gray-700 dark:text-gray-400'>
                                <div className='flex flex-row gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-4 mt-0.5'}>
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <p>{read.rating}</p>
                                </div>
                                <p>{read.chapter}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RecentReads
