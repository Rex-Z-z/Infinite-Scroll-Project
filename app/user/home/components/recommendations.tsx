'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ReadItem } from './types';
import { Button } from '@/components/ui/button';
import { CalendarCog, Settings2 } from 'lucide-react';

const mockRecommendedReads: ReadItem[] = [
  { id: 1, imageUrl: "/pictures/image.png", title: "A Regressor's Tale of Cultivation", lastRead: "A day ago", status: "Good", chapter: "Chapter 12" },
  { id: 2, imageUrl: "/pictures/image2.png", title: "The Regressed Mercenary Has a Plan", lastRead: "3 days ago", status: "Good", chapter: "Chapter 4" },
  { id: 3, imageUrl: "/pictures/image3.png", title: "The Knight Who Only Lives Today", lastRead: "Last week", status: "Bad", chapter: "Chapter 8" },
  { id: 4, imageUrl: "/pictures/image.png", title: "A Regressor's Tale of Cultivation", lastRead: "A day ago", status: "Good", chapter: "Chapter 12" },
  { id: 5, imageUrl: "/pictures/image2.png", title: "The Regressed Mercenary Has a Plan", lastRead: "3 days ago", status: "Mid", chapter: "Chapter 4" },
  { id: 6, imageUrl: "/pictures/image3.png", title: "The Knight Who Only Lives Today", lastRead: "Last week", status: "Mid", chapter: "Chapter 8" },
  { id: 7, imageUrl: "/pictures/image.png", title: "A Regressor's Tale of Cultivation", lastRead: "A day ago", status: "Good", chapter: "Chapter 12" },
  { id: 8, imageUrl: "/pictures/image2.png", title: "The Regressed Mercenary Has a Plan", lastRead: "3 days ago", status: "Mid", chapter: "Chapter 4" },
  { id: 9, imageUrl: "/pictures/image3.png", title: "The Knight Who Only Lives Today", lastRead: "Last week", status: "Mid", chapter: "Chapter 8" },
];

const statusColorMap: { [key: string]: string } = {
  "Good": "text-yellow-400 size-4 mt-0.5",
  "Mid": "text-orange-400 size-4 mt-0.5",
  "Bad": "text-red-500 size-4 mt-0.5",
};

const Recommendations = () => {
    const [recommendedReads, setRecommendedReads] = useState<ReadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const recommendedContainerRef = useRef<HTMLDivElement>(null);

    // Simulate fetching
    useEffect(() => {
        const fetchRecommendedReads = async () => {
            try {
                // THIS IS WHERE TO REAL API CALL
                // Example: const response = await fetch('https://api.yourapp.com/recommended-reads');
                // const data = await response.json();
                // setRecommendedReads(data);

                // For now, simulate a 1-second delay with mock data
                await new Promise(resolve => setTimeout(resolve, 500));
                setRecommendedReads(mockRecommendedReads);

            } catch (err) {
                setError("Failed to fetch recommended reads. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedReads();
    }, []);

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

    return (
        <div>
            <section className='flex flex-col w-full p-4 gap-2'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row'>
                        <p className='text-2xl font-bold hover:underline hover:cursor-pointer'>Recommendation</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7 mt-[1.5px]">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Date Sort */}
                    <div className='flex flex-row gap-1.5'>
                        <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                            <CalendarCog />
                        </Button>
                    </div>
                </div>
                {loading && <p>Loading your reads...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Card Sections */}
                <div ref={recommendedContainerRef} className='flex flex-row gap-2 overflow-x-auto flex-nowrap pr-1 [&::-webkit-scrollbar]:hidden'>
                    {!loading && !error && recommendedReads.map((read) => (
                        // The key prop is essential for React lists!
                        <div key={read.id} className="max-w-60">
                            <a href="#" className="relative block h-75 overflow-hidden rounded-md">
                                <img src={read.imageUrl} alt={`Cover for ${read.title}`} />
                                <Button variant="outline" size="icon" className="absolute size-8 top-2 left-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:cursor-pointer">
                                    <Settings2 />
                                </Button>
                            </a>
                            <div className='mt-2 p-2 rounded-md hover:bg-gray-800'>
                                <a href="#">
                                    <h5 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white max-w-180 truncate" title={read.title}>{read.title}</h5>
                                </a>
                                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{read.lastRead}</p>
                                <div className='flex flex-row justify-between text-sm font-normal text-gray-700 dark:text-gray-400'>
                                    <div className='flex flex-row gap-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.status] || 'text-gray-400 size-4 mt-0.5'}>
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <p>{read.status}</p>
                                    </div>
                                    <p>{read.chapter}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Recommendations
