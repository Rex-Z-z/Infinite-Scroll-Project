'use client'

import React, { useEffect, useState } from 'react'
import { Settings2 } from 'lucide-react';
import { ReadItem } from '../../home/components/types';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { Button } from '@/components/ui/button';
import { mockReads } from '../../home/components/mock-data';

const statusColorMap: { [key: string]: string } = {
  "Good": "text-yellow-400 size-4 mt-0.5",
  "Mid": "text-orange-400 size-4 mt-0.5",
  "Bad": "text-red-500 size-4 mt-0.5",
};

const Completed = () => {
    const [completedReads, setCompletedReads] = useState<ReadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
          const fetchRecommendedReads = async () => {
              try {
                  // THIS IS WHERE TO REAL API CALL
                  // Example: const response = await fetch('https://api.yourapp.com/recommended-reads');
                  // const data = await response.json();
                  // setLibraryReads(data);
    
                  // For now, we'll simulate a 1-second delay with mock data
                  await new Promise(resolve => setTimeout(resolve, 2500));
                  setCompletedReads(mockReads);
    
              } catch (err) {
                  setError("Failed to fetch recommended reads. Please try again later.");
                  console.error(err);
              } finally {
                  setLoading(false);
              }
          };
    
          fetchRecommendedReads();
      }, []);

    return (
        <div>
            {loading && <SectionSkeleton page='library'/>}
            {error && <p className="text-red-500">{error}</p>}

            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2'>
                {!loading && !error && completedReads.map((read) => (
                    <div key={read.id} className="flex flex-col overflow-hidden">
                        <a href="#" className="relative block w-full aspect-[2/3] overflow-hidden">
                            <img  src={read.imageUrl}  alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover rounded-md"/>
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
        </div>
    )
}

export default Completed