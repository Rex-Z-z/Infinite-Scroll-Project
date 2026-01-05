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
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9 w-9" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[16px] w-10" />
                                <Skeleton className="h-[16px] w-15" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9 w-9" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[16px] w-10" />
                                <Skeleton className="h-[16px] w-25" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9 w-9" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[16px] w-10" />
                                <Skeleton className="h-[16px] w-28" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9 w-9" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[16px] w-10" />
                                <Skeleton className="h-[16px] w-34" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-9 w-9" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[16px] w-10" />
                                <Skeleton className="h-[16px] w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex flex-col w-full gap-3'>
                    {/* Top Section */}
                    <div className='flex flex-col gap-2'>
                        {/* Title */}
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-140 h-8" />
                            <Skeleton className="w-100 h-5" />
                        </div>
                        {/* Tags */}
                        <div className='flex flex-row gap-1.5'>
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                        </div>
                        {/* Description */}
                        <div className='flex flex-col gap-2 mt-2.5'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-col gap-2'>
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-[75%] h-4" />
                                <Skeleton className="w-[85%] h-4" />
                                <Skeleton className="w-[95%] h-4" />
                                <Skeleton className="w-16 h-4 mt-1" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className='flex flex-col gap-4'>
                        {/* Source */}
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-row gap-1.5'>
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                            </div>
                        </div>
                        {/* Chapters */}
                        <div className='flex flex-col gap-2'>
                            {[...Array(5    )].map((_, index) => (
                                <Skeleton key={index} className="w-full h-16" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonDetails
