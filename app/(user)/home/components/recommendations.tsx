'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import Autoplay from "embla-carousel-autoplay"
import { ReadItem } from '@/lib/types';
import DropdownHome from './ui/home-filters';
import SectionSkeleton from '@/components/ui/section-skeleton';
import ComicCard from '@/components/ui/comic-card';
import { fetchRecommendedReads } from '@/services/home/comic.service';
import { Dialog } from '@/components/ui/dialog';
import AddNewModal from '@/components/ui/add-new-modal';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi, } from "@/components/ui/carousel"

const fetcher = () => fetchRecommendedReads();

const Recommendations = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComic, setEditingComic] = useState<ReadItem | null>(null);
    const { data: recommendedReads, isLoading, error } = useSWR(['recommended-reads'], fetcher);

    // Carousel API state
    const [api, setApi] = useState<CarouselApi>()
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    // Monitor Carousel state to enable/disable buttons
    useEffect(() => {
        if (!api) {
            return
        }

        const updateScrollState = () => {
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }

        updateScrollState()
        api.on("select", updateScrollState)
        api.on("reInit", updateScrollState)

        return () => {
            api.off("select", updateScrollState)
            api.off("reInit", updateScrollState)
        }
    }, [api])

    const handleEdit = (read: ReadItem) => {
        setEditingComic(read);
        setIsModalOpen(true);
    };

    const handleModalOpenChange = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingComic(null);
        }
    }

    return (
        <section className='flex flex-col w-full p-4 gap-2'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-2xl font-bold hover:underline hover:cursor-pointer'>
                        <a href="/library">Recommendation</a>
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7 mt-[1.5px]">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Filter Menu & Carousel Controls */}
                <div className='flex flex-row gap-1 items-center'>
                    {/* Only show controls if data is loaded */}
                    {!isLoading && !error && (
                        <div className="flex items-center gap-1">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="size-[36px]" 
                                onClick={() => api?.scrollPrev()} 
                                disabled={!canScrollPrev}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="size-[36px]" 
                                onClick={() => api?.scrollNext()} 
                                disabled={!canScrollNext}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <DropdownHome section='recommendations'/>
                </div>
            </div>
            
            {isLoading && <SectionSkeleton />}
            {error && <p className="text-destructive">{error}</p>}

            {/* Carousel Content */}
            { !isLoading && !error &&
                <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                            delay: 2000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {recommendedReads && recommendedReads.map((read) => (
                                <CarouselItem key={read.id} className="pl-2 basis-1/3 sm:basis-1/5 xl:basis-1/6 3xl:basis-1/8 4xl:basis-1/12 5xl:basis-1/19">
                                    <ComicCard read={read} onEdit={handleEdit} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    
                    <AddNewModal comicData={editingComic} />
                </Dialog>
            }
        </section>
    )
}

export default Recommendations