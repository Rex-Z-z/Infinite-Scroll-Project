import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonDetails = () => {
    return (
        <div>
            <div className='flex flex-row gap-4'>
                {/* Left Side */}
                <div className='flex-none flex-col w-75 h-full'>
                    {/* Cover */}
                    <Skeleton className="w-full h-98 rounded-lg mb-3" />
                    {/* Details */}
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex flex-row gap-2">
                                <Skeleton className="h-9.5 w-9.5" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-[17.5px] w-10" />
                                    <Skeleton className="h-[17.5px] w-20" />
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9.5 w-full" />
                            <Skeleton className="h-9.5 w-full" />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex flex-col w-full gap-3'>
                    {/* Top Section */}
                    <div className='flex flex-col gap-2 pb-2'>
                        {/* Title */}
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-140 h-8" />
                            <Skeleton className="w-100 h-5" />
                        </div>
                        {/* Genres */}
                        <div className='flex flex-row gap-1.5'>
                            {Array.from({ length:5 }).map((_, index) => (
                                <Skeleton key={index} className="w-16 h-8 rounded-3xl" />
                            ))}
                        </div>
                        {/* Description */}
                        <div className='flex flex-col gap-2 mt-2.5'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-col gap-2'>
                                <Skeleton className="w-[11%] h-4.5" />
                                <Skeleton className="w-[10%] h-4.5" />
                                <Skeleton className="w-[10.5%] h-4.5" />
                                <Skeleton className="w-[9.5%] h-4.5" />
                            </div>
                        </div>
                        {/* Description */}
                        <div className='flex flex-col gap-2 mt-2.5 pb-3'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-col gap-2'>
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-[75%] h-4" />
                                <Skeleton className="w-[85%] h-4" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-row gap-1.5'>
                                {Array.from({ length:5 }).map((_, index) => (
                                    <Skeleton key={index} className="w-16 h-8 rounded-3xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className='flex flex-col gap-4'>
                        {/* Relation */}
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-row gap-1.5'>
                                {Array.from({ length:3 }).map((_, index) => (
                                    <Skeleton key={index} className="w-32 aspect-[2/3] rounded-md" />
                                ))}
                            </div>
                        </div>
                        {/* Tags */}
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-row gap-1.5'>
                                {Array.from({ length:5 }).map((_, index) => (
                                    <Skeleton key={index} className="w-20 h-8 rounded-md" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonDetails
