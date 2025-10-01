import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonDetails = () => {
    return (
        <div>
            <div className='flex flex-row gap-4' style={{ height: 'calc(100vh - 60px)' }}>
                <div className='flex-none flex-col w-75 h-full'>
                    <Skeleton className="w-full h-98 rounded-lg mb-3" />
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[17.5px] w-10" />
                                <Skeleton className="h-[17.5px] w-15" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[17.5px] w-10" />
                                <Skeleton className="h-[17.5px] w-25" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[17.5px] w-10" />
                                <Skeleton className="h-[17.5px] w-28" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[17.5px] w-10" />
                                <Skeleton className="h-[17.5px] w-34" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-[17.5px] w-10" />
                                <Skeleton className="h-[17.5px] w-16" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-140 h-8" />
                            <Skeleton className="w-100 h-5" />
                        </div>
                        <div className='flex flex-row gap-1.5'>
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                            <Skeleton className="w-16 h-8 rounded-3xl" />
                        </div>
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
                    
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Skeleton className="w-25 h-6" />
                            <div className='flex flex-row gap-1.5'>
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                                <Skeleton className="w-16 h-8 rounded-3xl" />
                            </div>
                        </div>

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
