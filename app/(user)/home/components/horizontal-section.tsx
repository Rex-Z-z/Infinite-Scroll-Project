'use client';

import React, { useEffect, useRef, useState } from 'react'
import { ReadItem } from '@/lib/types';
import AddNewCard from './ui/add-new-card';
import AddNewModal from '@/components/ui/add-new-modal';
import DropdownHome from './ui/home-filters';
import SectionSkeleton from '@/components/ui/section-skeleton';
import ComicCard from '@/components/ui/comic-card';
import { Dialog } from '@/components/ui/dialog';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import { FilterState } from './ui/home-filters';

interface HorizontalSectionProps {
    title: string;
    href: string;
    data: ReadItem[] | undefined;
    isLoading: boolean;
    error: any;
    section: 'recent-reads' | 'recommendations';
    showAddButton?: boolean;
    filters?: FilterState;
    onFilterChange?: (filters: FilterState) => void;
}

// Filter helper function
const applyFilters = (items: ReadItem[], filters: HorizontalSectionProps['filters']) => {
    if (!items || !filters) return items;

    return items.filter(item => {
        // Filter by type
        if (Object.values(filters.types).some(t => t)) {
            const hasType = Object.entries(filters.types)
                .filter(([, selected]) => selected)
                .some(([type]) => item.type.toLowerCase() === type.toLowerCase());
            if (!hasType) return false;
        }

        // Filter by rating
        if (filters.selectedRatings.length > 0) {
            if (!filters.selectedRatings.includes(item.rating)) return false;
        }

        return true;
    });
};

const HorizontalSection: React.FC<HorizontalSectionProps> = ({
    title,
    href,
    data,
    isLoading,
    error,
    section,
    showAddButton = false,
    filters,
    onFilterChange
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComic, setEditingComic] = useState<ReadItem | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Apply filters to data
    const filteredData = filters ? applyFilters(data || [], filters) : data;

    useEffect(() => {
        const container = containerRef.current;
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

    const handleModalOpenChange = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingComic(null);
        }
    };

    return (
        <section className='flex flex-col w-full p-4 gap-2'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center'>
                    <h2 className='text-2xl font-bold hover:underline hover:cursor-pointer'>
                        <a href={href} aria-label={`View all ${title}`}>
                            {title}
                        </a>
                    </h2>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="size-7 mt-[1.5px]"
                        aria-hidden="true"
                    >
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Filters */}
                <div className='flex flex-row gap-1.5'>
                    <DropdownHome
                        section={section}
                        onFilterChange={onFilterChange}
                        initialFilters={filters}
                    />
                </div>
            </div>

            {isLoading && <SectionSkeleton />}
            {error && <p className="text-destructive text-sm">Failed to load {title.toLowerCase()}</p>}

            {/* Card Sections */}
            <div 
                ref={containerRef} 
                className='flex flex-row gap-2 overflow-x-auto flex-nowrap pr-1 [&::-webkit-scrollbar]:hidden'
                role="region"
                aria-label={`${title} carousel`}
            >
                {!isLoading && !error && (
                    <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
                        {showAddButton && <AddNewCard />}
                        <AddNewModal comicData={editingComic} />
                    </Dialog>
                )}

                {!isLoading && !error && filteredData && filteredData.length > 0 ? (
                    filteredData.map((read) => (
                        <ComicCard key={read.id} read={read} onEdit={handleEdit} />
                    ))
                ) : !isLoading && !error ? (
                    <div className='w-full'>
                        <Empty className='bg-transparent border-0 p-4'>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <BookOpen className="text-muted-foreground" />
                                </EmptyMedia>
                                <EmptyTitle>No items found</EmptyTitle>
                            </EmptyHeader>
                            <EmptyDescription>
                                {filters?.selectedRatings.length || Object.values(filters?.types || {}).some(t => t)
                                    ? 'No items match your current filters. Try adjusting them.'
                                    : `No ${title.toLowerCase()} yet. Start by adding some!`
                                }
                            </EmptyDescription>
                        </Empty>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default HorizontalSection;
