'use client'

import { Badge } from '@/components/ui/badge'
import NavBar from '@/components/ui/navbar'
import { formatDistanceToNow } from '@/lib/utils'
import { fetchComickById } from '@/services/library/comic.service'
import { Book } from 'lucide-react'
import React from 'react'
import useSWR from 'swr'


const page = ({ params }: { params: { comicId: string } }) => {
  const { comicId } = params;
  const fetcher = () => fetchComickById(Number(comicId));
  const { data: read, isLoading, error } = useSWR(['read'], fetcher);

  const getLastReadDate = () => {
    if (read?.lastRead) {
      return `${formatDistanceToNow(read.lastRead)} (${read.lastRead})`;
    }
    return 'N/A';
  }

  return (
    <div>
      <NavBar />
      <div className='flex flex-row gap-4 p-4'>

        {/* Left Side */}
        <div className="flex-none flex-col w-75 h-full">
          {/* Cover */}
          <img src={read?.imageUrl} alt={`Cover for ${read?.title}`} className='overflow-hidden rounded-lg mb-3'/>
          
          {/* Info */}
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-1.5'>
              <div className='p-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md'>
                <Book className='size-5'/>
              </div>
              <div>
                <h2 className='text-[11px] text-gray-400 font-semibold'>Type</h2>
                <h1 className='text-sm font-semibold'>{read?.type}</h1>
              </div>
            </div>

            <div className='flex flex-row gap-1.5'>
              <div className='p-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md'>
                <Book className='size-5'/>
              </div>
              <div>
                <h2 className='text-[11px] text-gray-400 font-semibold'>Rating</h2>
                <h1 className='text-sm font-semibold'>{read?.rating}</h1>
              </div>
            </div>

            <div className='flex flex-row gap-1.5'>
              <div className='p-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md'>
                <Book className='size-5'/>
              </div>
              <div>
                <h2 className='text-[11px] text-gray-400 font-semibold'>Status</h2>
                <h1 className='text-sm font-semibold'>{read?.status}</h1>
              </div>
            </div>

            <div className='flex flex-row gap-1.5'>
              <div className='p-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md'>
                <Book className='size-5'/>
              </div>
              <div>
                <h2 className='text-[11px] text-gray-400 font-semibold'>Last Read</h2>
                <h1 className='text-sm font-semibold'>{getLastReadDate()}</h1>
              </div>
            </div>

            <div className='flex flex-row gap-1.5'>
              <div className='p-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md'>
                <Book className='size-5'/>
              </div>
              <div>
                <h2 className='text-[11px] text-gray-400 font-semibold'>Chapter</h2>
                <h1 className='text-sm font-semibold'>{read?.chapter}</h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side */}
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              {/* Title */}
              <div>
                <h1 className='text-3xl font-semibold'>{read?.title}</h1>
                <h2 className='text-lg text-gray-500 font-semibold'>{read?.altTitle}</h2>
              </div>
              
              {/* Tags */}
              <div className='flex flex-row gap-1.5'>
                {read?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-2.5 py-1.5 rounded-2xl">
                      {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Description */}
              <div className='mt-2'>
                <h1 className='text-md font-semibold'>Description</h1>
                <h2 className='text-sm text-gray-500 font-semibold line-clamp-5'>{read?.desc}</h2>
              </div>
              
              {/* Source */}
              <div className='mt-2'>
                <h1 className='text-md font-semibold mb-1'>Source</h1>
                <div className='flex flex-row gap-1.5'>
                  {read?.source.map((source) => (
                    <Badge key={source} variant="secondary" className="px-2.5 py-1.5 rounded-2xl">
                        {source === 'Asura Scans' && <img src="/icons/logo.webp" alt="" className='size-4'/>}
                        {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
                {[...Array(5)].map((_, index) => (
                  <div key={index} className='h-16 rounded-md bg-gray-800'></div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default page