'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon, Settings2 } from 'lucide-react'
import { formatDistanceToNow } from '@/lib/utils'
import { ReadItem } from '@/lib/types'
import { Badge } from './badge'
import { Star } from '../icons/custom-icons'

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
          <div className="relative block aspect-[2/3] h-75 w-full overflow-hidden rounded-md shadow-2xl">
            {read.coverImage ? (
              <Image
                src={read.coverImage}
                fill
                alt={`Cover for ${read.title}`}
                className="absolute object-cover transition-all duration-500 ease-in-out hover:scale-110"
              />
            ) : (
              <div className="group relative flex aspect-[2/2.51] h-75 w-full items-center justify-center rounded-md bg-gray-700 shadow-lg hover:bg-gray-800">
                <div className="transition-all duration-300 ease-in-out group-hover:scale-130">
                  <ImageIcon className="size-16 text-gray-600" />
                </div>
              </div>
            )}

            <Button
              onClick={handleEditClick}
              variant="secondary"
              size="icon-sm"
              className="hover:bg-accent hover:text-accent-foreground absolute top-2 left-2 hover:cursor-pointer"
            >
              <Settings2 />
            </Button>
          </div>
          <div className="mt-2 rounded-md p-1">
            <h5
              className="text-md hover:text-foreground/80 mb-1 max-w-180 truncate font-bold tracking-tight"
              title={read.title}
            >
              {read.title}
            </h5>
            <p className="text-muted-foreground hover:text-muted-foreground/80 mb-3 text-sm font-normal">
              {formatDistanceToNow(read.lastRead)}
            </p>
            <div className="text-muted-foreground flex flex-row justify-between text-sm font-normal">
              {read.rating ? (
                <div className="flex flex-row gap-1">
                  <Badge variant="outline" className="hover:bg-accent/70">
                    <Star
                      isFill
                      className={statusColorMap[read.rating] || 'text-gray-400'}
                    />
                    <span className="max-w-[60px] truncate">{read.rating}</span>
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline" className="hover:bg-accent/70">
                  <Star isFill className="text-gray-400" />
                  No Rating
                </Badge>
              )}

              {read.chapter ? (
                <Badge variant="outline" className="hover:bg-accent/70">
                  Chapter {read.chapter}
                </Badge>
              ) : (
                <Badge variant="outline" className="hover:bg-accent/70">
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
                  <ImageIcon className="size-16 text-gray-600" />
                </div>
              </div>
            )}

            <Button
              onClick={handleEditClick}
              variant="secondary"
              size="icon-sm"
              className="hover:bg-accent absolute top-2 left-2 hover:cursor-pointer"
            >
              <Settings2 />
            </Button>
          </div>

          <div className="mt-2 rounded-md p-1">
            <h5
              className="hover:text-foreground/80 mb-1 max-w-180 truncate text-sm font-semibold tracking-tight"
              title={read.title}
            >
              {read.title}
            </h5>
            <p className="text-muted-foreground hover:text-muted-foreground/80 mb-3 text-xs font-normal">
              {formatDistanceToNow(read.lastRead)}
            </p>
            <div className="text-muted-foreground flex flex-row justify-between text-sm font-normal">
              {read.rating ? (
                <div className="flex flex-row gap-1">
                  <Badge variant="outline" className="hover:bg-accent/70">
                    <Star
                      isFill
                      className={statusColorMap[read.rating] || 'text-gray-400'}
                    />
                    <span className="max-w-[60px] truncate">{read.rating}</span>
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline" className="hover:bg-accent/70">
                  <Star isFill className="text-gray-400" />
                  No Rating
                </Badge>
              )}

              {read.chapter ? (
                <Badge variant="outline" className="hover:bg-accent/70">
                  Chapter {read.chapter}
                </Badge>
              ) : (
                <Badge variant="outline" className="hover:bg-accent/70">
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
