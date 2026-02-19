'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Image as ImageIcon, Settings2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ReadItem } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/utils'

import { Star } from '../icons/custom-icons'
import { Badge } from './badge'

interface ComicCardProps {
  read: ReadItem
  page?: 'home' | 'library'
  onEdit: (read: ReadItem) => void
}

const statusColorMap: { [key: string]: string } = {
  'Absolute Cinema': 'text-blue-400',
  Awesome: 'text-green-700',
  Great: 'text-green-600',
  Good: 'text-yellow-400',
  Regular: 'text-orange-400',
  Bad: 'text-red-500',
  Garbage: 'text-purple-400',
}

const BadgeStyle =
  'hover:bg-accent/70 text-[7px] md:text-xs px-1 md:px-2 py-[1px] md:py-0.5 [&>svg]:size-2 md:[&>svg]:size-3 gap-0.5 md:gap-1 [&>svg]:mb-[0.5px]'

const ComicCard = ({ read, page = 'home', onEdit }: ComicCardProps) => {
  const isHome = page === 'home'

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit(read)
  }

  return (
    <Link href={`/library/${read.id}`} key={read.id}>
      {isHome ? (
        // Home
        <div key={read.id} className="max-w-60">
          <div className="relative block aspect-[2/3] h-30 w-full overflow-hidden rounded-md shadow-2xl md:h-75">
            {read.coverImage ? (
              <Image
                src={read.coverImage}
                fill
                alt={`Cover for ${read.title}`}
                className="absolute object-cover transition-all duration-500 ease-in-out hover:scale-110"
              />
            ) : (
              <div className="group relative flex aspect-[2/2.51] h-30 w-full items-center justify-center rounded-md bg-gray-700 shadow-lg hover:bg-gray-800 md:h-75">
                <div className="transition-all duration-300 ease-in-out group-hover:scale-130">
                  <ImageIcon className="size-8 text-gray-600 md:size-16" />
                </div>
              </div>
            )}

            <Button
              onClick={handleEditClick}
              variant="secondary"
              size="icon-sm"
              className="hover:bg-accent hover:text-accent-foreground absolute top-1 left-1 size-5 hover:cursor-pointer md:top-2 md:left-2 md:size-8 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
            >
              <Settings2 />
            </Button>
          </div>
          <div className="mt-2 rounded-md p-0.5 sm:p-1">
            <h5
              className="hover:text-foreground/80 mb-0.5 max-w-180 truncate text-[8px] font-semibold tracking-tight md:mb-1 md:text-sm"
              title={read.title}
            >
              {read.title}
            </h5>
            <p className="text-muted-foreground hover:text-muted-foreground/80 mb-1.5 text-[7px] font-normal md:mb-3 md:text-xs">
              {formatDistanceToNow(read.lastRead)}
            </p>
            <div className="text-muted-foreground flex flex-row justify-between text-sm font-normal">
              {read.rating ? (
                <div className="flex flex-row gap-1">
                  <Badge variant="outline" className={BadgeStyle}>
                    <Star
                      isFill
                      className={statusColorMap[read.rating] || 'text-gray-400'}
                    />
                    <span className="max-w-[20px] truncate md:max-w-[60px]">
                      {read.rating}
                    </span>
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline" className={BadgeStyle}>
                  <Star isFill className="text-gray-400" />
                  No Rating
                </Badge>
              )}

              {read.chapter ? (
                <Badge variant="outline" className={BadgeStyle}>
                  <span className="hidden md:block">Chapter</span>
                  <span className="block md:hidden">Ch</span>
                  {read.chapter}
                </Badge>
              ) : (
                <Badge variant="outline" className={BadgeStyle}>
                  No Chapter
                </Badge>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Library
        <div key={read.id} className="flex flex-col overflow-hidden">
          <div className="relative block aspect-[2/3] w-full overflow-hidden rounded-md shadow-2xl">
            {read.coverImage ? (
              <Image
                src={read.coverImage}
                fill
                alt={`Cover for ${read.title}`}
                className="absolute object-cover transition-all duration-500 ease-in-out hover:scale-110"
              />
            ) : (
              <div className="group relative flex aspect-[2/3] w-full cursor-pointer items-center justify-center rounded-md bg-gray-700 shadow-lg hover:bg-gray-800">
                <div className="transition-all duration-300 ease-in-out group-hover:scale-130">
                  <ImageIcon className="size-8 text-gray-600 md:size-16" />
                </div>
              </div>
            )}

            <Button
              onClick={handleEditClick}
              variant="secondary"
              size="icon-sm"
              className="hover:bg-accent hover:text-accent-foreground absolute top-1 left-1 size-5 hover:cursor-pointer md:top-2 md:left-2 md:size-8 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
            >
              <Settings2 />
            </Button>
          </div>

          <div className="mt-1 rounded-md p-1 md:mt-2">
            <h5
              className="hover:text-foreground/80 mb-1 max-w-180 truncate text-[8px] font-semibold tracking-tight md:text-sm"
              title={read.title}
            >
              {read.title}
            </h5>
            <p className="text-muted-foreground hover:text-muted-foreground/80 mb-1 text-[7px] font-normal md:mb-3 md:text-xs">
              {formatDistanceToNow(read.lastRead)}
            </p>
            <div className="text-muted-foreground flex flex-row justify-between text-sm font-normal">
              {read.rating ? (
                <div className="flex flex-row gap-1">
                  <Badge variant="outline" className={BadgeStyle}>
                    <Star
                      isFill
                      className={statusColorMap[read.rating] || 'text-gray-400'}
                    />
                    <span className="max-w-[35px] truncate md:max-w-[50px]">
                      {read.rating}
                    </span>
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline" className={BadgeStyle}>
                  <Star isFill className="text-gray-400" />
                  No Rating
                </Badge>
              )}

              {read.chapter ? (
                <Badge variant="outline" className={BadgeStyle}>
                  <span className="hidden md:block">Chapter</span>
                  <span className="block md:hidden">Ch</span>
                  {read.chapter}
                </Badge>
              ) : (
                <Badge variant="outline" className={BadgeStyle}>
                  No Chapter
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}

export default ComicCard
