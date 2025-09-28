import React from 'react'
import { Skeleton } from './skeleton'

interface SectionSkeletonProps {
    page?: 'home' | 'library';
}

const SectionSkeleton = ({ page = 'home' }: SectionSkeletonProps) => {
    const libraryGridClasses = 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2';
    const homeGridClasses = 'flex flex-row gap-2 overflow-hidden';

    return (
        <div className={`${page === 'home' ? homeGridClasses : libraryGridClasses}`}>
            {[...Array(16)].map((_, index) => (
                <div key={index} className={`flex flex-col gap-3 ${page === 'home' ? 'w-60 flex-shrink-0' : ''}`}>
                    <Skeleton className={`${page === 'home' ? 'w-full h-[312px]' : 'w-full aspect-[2/3]'}`} />
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-1/2"/>
                        <div className="flex flex-row justify-between">
                            <Skeleton className="h-4 w-1/3"/>
                            <Skeleton className="h-4 w-1/4"/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SectionSkeleton
