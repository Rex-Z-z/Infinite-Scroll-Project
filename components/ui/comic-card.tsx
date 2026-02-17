'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Image, Settings2 } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import { ReadItem } from '@/lib/types';

interface ComicCardProps {
    read: ReadItem;
    page?: 'home' | 'library';
    onEdit: (read: ReadItem) => void;
}

const statusColorMap: { [key: string]: string } = {
    "Absolute Cinema": "text-blue-400 size-4 mt-0.5",
    "Awesome": "text-green-700 size-4 mt-0.5",
    "Great": "text-green-600 size-4 mt-0.5",
    "Good": "text-yellow-400 size-4 mt-0.5",
    "Regular": "text-orange-400 size-4 mt-0.5",
    "Bad": "text-red-500 size-4 mt-0.5",
    "Garbage": "text-purple-400 size-4 mt-0.5",
};

const ComicCard = ({ read, page = 'home', onEdit}: ComicCardProps) => {
    const isHome = page === 'home';

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit(read);
    }

    return (
        <Link href={`/library/${read.id}`} key={read.id}>
            { isHome ? (
                // Home
                <div key={read.id} className="max-w-60">
                    <div className="relative block w-full h-75 aspect-[2/3] overflow-hidden rounded-md shadow-2xl">
                        {read.coverImage? (
                            <img src={read.coverImage} alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover hover:scale-110 transition-all duration-500 ease-in-out"/>
                        ) : (
                            <div className="relative flex w-full h-75 aspect-[2/2.51] items-center justify-center bg-muted hover:bg-muted/80 rounded-md cursor-pointer shadow-lg group">
                                <div className="group-hover:scale-130 transition-all duration-300 ease-in-out">
                                    <Image className='size-16 text-muted-foreground' />
                                </div>
                            </div>
                        )}
                        
                        <Button onClick={handleEditClick} variant="secondary" size="icon" className="absolute size-8 top-2 left-2 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
                            <Settings2 />
                        </Button>
                    </div>
                    <div className='mt-2 p-2 rounded-md hover:bg-accent'>
                        <h5 className="mb-1 text-md font-bold tracking-tight max-w-180 truncate" title={read.title}>{read.title}</h5>
                        <p className="mb-3 text-sm font-normal text-muted-foreground">{formatDistanceToNow(read.lastRead)}</p>
                        <div className='flex flex-row justify-between text-sm font-normal text-muted-foreground'>
                            {read.rating ? (
                                <div className='flex flex-row gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-4'}>
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <p className='mt-[2.5px] max-w-22 truncate'>{read.rating}</p>
                                </div>
                            ) : (
                                <p className='font-semibold text-muted-foreground'>No Rating</p>
                            )}

                            {read.chapter ? (
                                <p className='mt-[2.5px] max-w-22 truncate'>Chapter {read.chapter}</p>
                            ) : (
                                <p className='text-muted-foreground'>No Chapter</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Library
                <div key={read.id} className="flex flex-col overflow-hidden">
                    <div className="relative block w-full aspect-[2/3] overflow-hidden rounded-md shadow-2xl">
                        {read.coverImage? (
                            <img  src={read.coverImage}  alt={`Cover for ${read.title}`} className="absolute h-full w-full object-cover hover:scale-110 transition-all duration-500 ease-in-out"/>
                        ) : (
                            <div className="relative flex w-full aspect-[2/3] items-center justify-center bg-muted hover:bg-muted/80 rounded-md cursor-pointer shadow-lg group">
                                <div className="group-hover:scale-130 transition-all duration-300 ease-in-out">
                                    <Image className='size-16 text-muted-foreground' />
                                </div>
                            </div>
                        )}

                        <Button onClick={handleEditClick} variant="secondary" size="icon" className="absolute size-8 top-2 left-2 hover:bg-accent hover:cursor-pointer">
                            <Settings2 />
                        </Button>
                    </div>
                
                    <div className='mt-2 p-2 rounded-md hover:bg-accent'>
                        <h5 className="mb-1 text-sm font-semibold tracking-tight max-w-180 truncate" title={read.title}>{read.title}</h5>
                        <p className="mb-3 text-xs font-normal text-muted-foreground">{formatDistanceToNow(read.lastRead)}</p>
                        <div className='flex flex-row justify-between text-xs font-normal text-muted-foreground'>
                            <div className='flex flex-row gap-1'>
                                {read.rating ? (
                                <div className='flex flex-row gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-4'}>
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <p className='mt-[2.5px] max-w-18 truncate'>{read.rating}</p>
                                </div>
                            ) : (
                                <p className='font-semibold text-muted-foreground'>No Rating</p>
                            )}
                            </div>
                            
                            {read.chapter ? (
                                <p className='mt-[2.5px] max-w-18 truncate'>Chapter {read.chapter}</p>
                            ) : (
                                <p className='text-muted-foreground'>No Chapter</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Link>
    )
}

export default ComicCard
