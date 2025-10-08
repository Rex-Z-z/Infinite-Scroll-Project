'use client'

import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr';
import { ReadItem } from '@/lib/types';
import DropdownRecom from './ui/dropdown-recom';
import SectionSkeleton from '@/components/ui/section-skeleton';
import ComicCard from '@/components/ui/comic-card';
import { fetchRecommendedReads } from '@/services/home/comic.service';
import { Dialog } from '@/components/ui/dialog';
import AddNewModal from './ui/add-new-modal';

const fetcher = () => fetchRecommendedReads();

const Recommendations = () => {
    const recommendedContainerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComic, setEditingComic] = useState<ReadItem | null>(null);
    const { data: recommendedReads, isLoading, error } = useSWR(['recommended-reads'], fetcher);

    useEffect(() => {
        const container = recommendedContainerRef.current;
        if (container) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            };
            container.addEventListener('wheel', handleWheel);
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, []);

    const handleEdit = (read: ReadItem) => {
        setEditingComic(read);
        setIsModalOpen(true);
    };
    

    return (
        <section className='flex flex-col w-full p-4 gap-2'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <p className='text-2xl font-bold hover:underline hover:cursor-pointer'>
                        <a href="/library">Recommendation</a>
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7 mt-[1.5px]">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Date Sort */}
                <div className='flex flex-row gap-1.5'>
                    <DropdownRecom section='recommendations'/>
                </div>
            </div>
            {isLoading && <SectionSkeleton />}
            {error && <p className="text-red-500">{error}</p>}

            {/* Card Sections */}
            <div ref={recommendedContainerRef} className='flex flex-row gap-2 overflow-x-auto flex-nowrap pr-1 [&::-webkit-scrollbar]:hidden'>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <AddNewModal comicData={editingComic} />
                </Dialog>
                
                {!isLoading && !error && recommendedReads  && recommendedReads.map((read) => (
                    <ComicCard key={read.id} read={read} onEdit={handleEdit} />
                ))}
            </div>
        </section>
    )
}

export default Recommendations