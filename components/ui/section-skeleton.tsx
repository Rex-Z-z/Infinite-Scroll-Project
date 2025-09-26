import React from 'react'
import { Skeleton } from './skeleton'

const SectionSkeleton = () => {
    return (
        <div>
            <div className='flex flex-col w-full gap-2'>
                <div className='flex flex-row gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                    {[...Array(7)].map((_, index) => (
                        <div className='flex flex-col gap-3'>
                            <Skeleton className='h-76 w-60' />
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-60" />
                                <Skeleton className="h-4 w-18" />
                                <div className="flex flex-row justify-between">
                                    <Skeleton className="h-4 w-15" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SectionSkeleton
