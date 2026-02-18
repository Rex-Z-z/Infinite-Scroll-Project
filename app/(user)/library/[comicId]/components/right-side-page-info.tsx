import React, { useState } from 'react'
import Link from 'next/link';
import { ReadItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image, Plus } from 'lucide-react';
import { mockReads } from '@/lib/mock-data';
import { Dialog } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SourceEdit from './source-edit';

const RightSidePage = ({ comicId, data }: { comicId: string, data: ReadItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<'title' | 'alt' | null>(null);
    const [isTitleTooltipOpen, setIsTitleTooltipOpen] = useState(false);
    const [isAltTooltipOpen, setIsAltTooltipOpen] = useState(false);

    const handleCopy = (text: string, field: 'title' | 'alt') => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        
        // Ensure the tooltip stays open immediately after click
        if (field === 'title') setIsTitleTooltipOpen(true);
        if (field === 'alt') setIsAltTooltipOpen(true);

        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSourceEdit = () => {
        setIsModalOpen(true);
    };

    const TRUNCATE_LENGTH = 350; 
    const needsTruncation = data?.desc && data.desc.length > TRUNCATE_LENGTH;

    const relatedComics = mockReads.filter(comic => data?.relations?.includes(comic.id));
    
    return (
        <TooltipProvider>
            <div className='flex flex-col w-full h-full overflow-y-auto custom-scrollbar pr-4'>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <SourceEdit source={data?.source} sourceIcon={data?.sourceIcon} sourceUrl={data?.sourceUrl} />
                </Dialog>

                {/* Top Section */}
                <div className='flex flex-col gap-2'>
                    {/* Title & Alt Title */}
                    <div>
                        {/* Main Title */}
                        <Tooltip 
                            open={copiedField === 'title' || isTitleTooltipOpen} 
                            onOpenChange={setIsTitleTooltipOpen}
                        >
                            <TooltipTrigger asChild>
                                <h1 
                                    onClick={() => handleCopy(data?.title, 'title')}
                                    className='text-3xl font-semibold line-clamp-2 cursor-pointer transition-colors w-fit' 
                                    title={data?.title}
                                >
                                    {data?.title}
                                </h1>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{copiedField === 'title' ? 'Copied!' : 'Click to copy'}</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Alt Title */}
                        {data?.altTitle && (
                            <Tooltip 
                                open={copiedField === 'alt' || isAltTooltipOpen} 
                                onOpenChange={setIsAltTooltipOpen}
                            >
                                <TooltipTrigger asChild>
                                    <h2 
                                        onClick={() => handleCopy(data?.altTitle, 'alt')}
                                        className='text-lg text-muted-foreground font-semibold line-clamp-1 cursor-pointer transition-colors w-fit' 
                                        title={data?.altTitle}
                                    >
                                        {data?.altTitle}
                                    </h2>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{copiedField === 'alt' ? 'Copied!' : 'Click to copy'}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    
                    {/* Tags */}
                    <div className='flex flex-row gap-1.5'>
                        {data?.tags?.map((tag) => (
                        <Badge key={tag} variant="default" className="px-2.5 py-1.5 hover:bg-primary/80 rounded-2xl">
                            {tag}
                        </Badge>
                        ))}
                    </div>

                    <div className='mt-2'>
                        <h1 className='text-lg font-semibold mb-1'>More Info</h1>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground font-semibold'>Published: <span className='text-foreground'>{data?.published || 'N/A'}</span> </p>
                            <p className='text-sm text-muted-foreground font-semibold'>Updated: <span className='text-foreground'>{data?.updated || 'N/A'}</span></p>
                            <p className='text-sm text-muted-foreground font-semibold'>Status: <span className='text-foreground'>{data?.status || 'N/A'}</span></p>
                            <p className='text-sm text-muted-foreground font-semibold'>Chapter: <span className='text-foreground'>{data?.comicChapter || 'N/A'}</span></p>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className='mt-2'>
                        <h1 className='text-md font-semibold'>Description</h1>
                        <p className={cn('text-sm text-muted-foreground font-semibold', needsTruncation && !isExpanded && 'line-clamp-3' )}>
                            {data?.desc}
                        </p>
                        {needsTruncation && (
                            <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-primary hover:underline text-sm font-semibold p-0 hover:cursor-pointer" >
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
                                        <Badge key={source} variant="secondary" className="px-2.5 py-[6.5px] hover:bg-accent rounded-2xl">
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
                            
                            <Button onClick={handleSourceEdit} size="icon-sm" variant="secondary" className='rounded-full'>
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
                                            <div className='relative w-full aspect-[2/3] rounded-md overflow-hidden shadow-md'>
                                                {comic.coverImage ? (
                                                    <img
                                                        src={comic.coverImage}
                                                        alt={comic.title}
                                                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                                                    />
                                                ) : (
                                                    <div className='flex h-full items-center justify-center'>
                                                        <Image className='text-muted-foreground' />
                                                    </div>
                                                )}
                                            </div>
                                            <span className='text-xs font-medium text-muted-foreground group-hover:text-primary line-clamp-2 transition-colors'>
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
                                <Badge key={category} variant="secondary" className="px-2.5 py-1.5 hover:bg-accent rounded-md">
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default RightSidePage