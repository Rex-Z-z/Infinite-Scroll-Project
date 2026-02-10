import React, { useState } from 'react'
import Link from 'next/link';
import { ReadItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Copy, Image, Plus } from 'lucide-react';
import { AnimatedSwapIcon } from '@/components/ui/animated-swap-icon';
import { mockReads } from '@/lib/mock-data';
import { Dialog } from '@/components/ui/dialog';
import SourceEdit from './source-edit';

const RightSidePage = ({ comicId, data }: { comicId: string, data: ReadItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCopyName = () => {
        navigator.clipboard.writeText(data?.title);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSourceEdit = () => {
        setIsModalOpen(true);
    };

    const TRUNCATE_LENGTH = 350; 
    const needsTruncation = data?.desc && data.desc.length > TRUNCATE_LENGTH;

    const relatedComics = mockReads.filter(comic => data?.relations?.includes(comic.id));
    
    return (
        <div className='flex flex-col w-full h-full overflow-y-auto custom-scrollbar pr-4'>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <SourceEdit source={data?.source} sourceIcon={data?.sourceIcon} sourceUrl={data?.sourceUrl} />
            </Dialog>

            {/* Top Section */}
            <div className='flex flex-col gap-2'>
                {/* Title */}
                <div>
                    <div className='flex flex-row gap-2'>
                        <h1 className='text-3xl font-semibold line-clamp-2' title={data?.title}>{data?.title}</h1>
                        <div className="relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={handleCopyName}
                            >
                                <AnimatedSwapIcon 
                                    icon={Copy} 
                                    altIcon={Check} 
                                    crossfade={isCopied} 
                                />
                            </Button>
                        </div>
                    </div>
                    <h2 className='text-lg text-gray-500 font-semibold  line-clamp-1' title={data?.altTitle}>{data?.altTitle}</h2>
                </div>
                
                {/* Tags */}
                <div className='flex flex-row gap-1.5'>
                    {data?.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-2.5 py-1.5 rounded-2xl">
                        {tag}
                    </Badge>
                    ))}
                </div>

                <div className='mt-2'>
                    <h1 className='text-lg font-semibold mb-1'>More Info</h1>
                    <p className='text-sm text-gray-500 font-semibold'>Published: <span className='text-gray-300'>{data?.published || 'N/A'}</span> </p>
                    <p className='text-sm text-gray-500 font-semibold'>Updated: <span className='text-gray-300'>{data?.updated || 'N/A'}</span></p>
                    <p className='text-sm text-gray-500 font-semibold'>Status: <span className='text-gray-300'>{data?.status || 'N/A'}</span></p>
                    <p className='text-sm text-gray-500 font-semibold'>Chapter: <span className='text-gray-300'>{data?.comicChapter || 'N/A'}</span></p>
                </div>
                
                {/* Description */}
                <div className='mt-2'>
                    <h1 className='text-md font-semibold'>Description</h1>
                    <p className={cn('text-sm text-gray-500 font-semibold', needsTruncation && !isExpanded && 'line-clamp-3' )}>
                    {data?.desc}
                    </p>
                    {needsTruncation && (
                    <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 hover:underline text-sm font-semibold p-0 hover:cursor-pointer" >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                    )}
                </div>
            </div>

            {/* Bottom Section */}
            <div className='flex flex-col gap-4'>
                {/* Source */}
                <div className='mt-2'>
                    <h1 className='text-md font-semibold mb-1'>Source</h1>
                    <div className='flex gap-2'>
                        <div className='flex flex-row gap-1.5'>
                            {data?.source?.map((source, index) => (
                                <Link target='_blank' href={data.sourceUrl[index]} key={source}>
                                    <Badge key={source} variant="secondary" className="px-2.5 py-1.5 hover:bg-gray-700 rounded-2xl">
                                        <img
                                            src={data.sourceIcon[index]}
                                            alt={`${source} logo`}
                                            className='size-4 rounded-full'
                                        />
                                        {source}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                        
                        <Button onClick={handleSourceEdit} size="icon" variant="secondary" className='rounded-full'>
                            <Plus />
                        </Button>
                    </div>
                </div>

                {/* Relation */}
                {relatedComics.length > 0 && (
                    <div>
                        <h1 className='text-md font-semibold mb-1'>Relation</h1>
                        <div className='flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                            {relatedComics.map((comic) => (
                                <Link key={comic.id} href={`/library/${comic.id}`}>
                                    <div key={comic.id} className='flex-none w-32 flex flex-col gap-2 group cursor-pointer'>
                                        <div className='relative w-full aspect-[2/3] rounded-md overflow-hidden bg-gray-800 shadow-md'>
                                            {comic.coverImage ? (
                                                <img
                                                    src={comic.coverImage}
                                                    alt={comic.title}
                                                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                                                />
                                            ) : (
                                                <div className='flex h-full items-center justify-center'>
                                                    <Image className='text-gray-500' />
                                                </div>
                                            )}
                                        </div>
                                        <span className='text-xs font-medium text-gray-400 group-hover:text-blue-500 line-clamp-2 transition-colors'>
                                            {comic.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                <div>
                    <h1 className='text-md font-semibold mb-2.5'>Tags</h1>
                    <div className='flex flex-row gap-1.5'>
                        {data?.category?.map((category) => (
                            <Badge key={category} variant="secondary" className="bg-gray-500 text-white dark:bg-gray-600 dark:hover:bg-gray-700 px-2.5 py-1.5 rounded-md">
                                {category}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSidePage
