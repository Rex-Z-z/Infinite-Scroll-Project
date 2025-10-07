'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LibraryBig, Settings2 } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import { ReadItem } from '@/lib/types';

interface ComicCardProps {
  read: ReadItem;
  page?: 'home' | 'library';
}

const statusColorMap: { [key: string]: string } = {
  "Good": "text-yellow-400 size-4 mt-0.5",
  "Mid": "text-orange-400 size-4 mt-0.5",
  "Bad": "text-red-500 size-4 mt-0.5",
};

const ComicCard = ({ read, page = 'home'}: ComicCardProps) => {
    const isHome = page === 'home';

    return (
        <Link href={`/library/${read.id}`} key={read.id}>
            { isHome ? (
                // Home
                <div key={read.id} className="max-w-60">
                    <div className="relative block w-full h-75 aspect-[2/3] overflow-hidden rounded-md shadow-2xl">

                        {read.imageUrl? (
                            <img src={read.imageUrl} alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"/>
                        ) : (
                            <div className="relative flex w-full h-75 aspect-[2/2.51] items-center justify-center bg-gray-700 hover:bg-gray-800 rounded-md cursor-pointer shadow-lg group">
                                <div className="group-hover:scale-130 transition-all duration-300 ease-in-out">
                                    <LibraryBig  size={50} className='text-gray-600' />
                                </div>
                            </div>
                        )}
                        
                        <Button variant="outline" size="icon" className="absolute size-8 top-2 left-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:cursor-pointer">
                            <Settings2 />
                        </Button>
                    </div>
                    <div className='mt-2 p-2 rounded-md hover:bg-gray-800'>
                        <h5 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white max-w-180 truncate" title={read.title}>{read.title}</h5>
                        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{formatDistanceToNow(read.lastRead)}</p>
                        <div className='flex flex-row justify-between text-sm font-normal text-gray-700 dark:text-gray-400'>
                            {read.rating ? (
                                <div className='flex flex-row gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-4 mt-0.5'}>
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <p>{read.rating}</p>
                                </div>
                            ) : (
                                <p className='font-semibold text-gray-700'>No Rating</p>
                            )}

                            {read.chapter ? (
                                <p>{read.chapter}</p>
                            ) : (
                                <p className='text-gray-700'>No Chapter</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Library
                <div key={read.id} className="flex flex-col overflow-hidden">
                    <div className="relative block w-full aspect-[2/3] overflow-hidden rounded-md shadow-2xl">
                        <img  src={read.imageUrl}  alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"/>
                        <Button variant="outline" size="icon" className="absolute size-8 top-2 left-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:cursor-pointer">
                            <Settings2 />
                        </Button>
                    </div>
                
                    <div className='mt-2 p-2 rounded-md hover:bg-gray-800'>
                        <h5 className="mb-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white max-w-180 truncate" title={read.title}>{read.title}</h5>
                        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">{formatDistanceToNow(read.lastRead)}</p>
                        <div className='flex flex-row justify-between text-xs font-normal text-gray-700 dark:text-gray-400'>
                            <div className='flex flex-row gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-3 mt-0.5'}>
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                <p>{read.rating}</p>
                            </div>
                            <p>{read.chapter}</p>
                        </div>
                    </div>
                </div>
            )}
        </Link>
    )
}

export default ComicCard