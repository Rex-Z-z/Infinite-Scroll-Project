import React, { useState } from 'react'
import { ReadItem } from '@/lib/types';
import SkeletonDetails from './skeleton';
import { fetchComickById } from '@/services/library/comic.service';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RightSidePage = ({ comicId, data }: { comicId: string, data: ReadItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const TRUNCATE_LENGTH = 350; 
    const needsTruncation = data?.desc && data.desc.length > TRUNCATE_LENGTH;
    
    return (
        <div className='flex flex-col w-full h-full overflow-y-auto custom-scrollbar pr-4'>
            {/* Top Section */}
            <div className='flex flex-col gap-2'>
                {/* Title */}
                <div>
                    <h1 className='text-3xl font-semibold line-clamp-2' title={data?.title}>{data?.title}</h1>
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
                
                {/* Description */}
                <div className='mt-2'>
                    <h1 className='text-md font-semibold'>Description</h1>
                    <p className={cn('text-sm text-gray-500 font-semibold', needsTruncation && !isExpanded && 'line-clamp-5' )}>
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
                    <div className='flex flex-row gap-1.5'>
                    {data?.source?.map((source, index) => (
                        <Badge key={source} variant="secondary" className="px-2.5 py-1.5 rounded-2xl">
                            <img 
                                src={data.sourceIcon[index]} 
                                alt={`${source} logo`} 
                                className='size-4'
                            />
                            {source}
                        </Badge>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSidePage
