'use client';

import React from 'react';
import Link from 'next/link';
import { ReadItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Image, Settings2, Eye, BookMarked } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EnhancedComicCardProps {
  read: ReadItem;
  onEdit?: (read: ReadItem) => void;
  view?: 'grid' | 'list';
}

const statusColorMap: { [key: string]: string } = {
  "Absolute Cinema": "text-blue-400 size-4 mt-0.5",
  "Awesome": "text-green-700 size-4 mt-0.5",
  "Great": "text-green-600 size-4 mt-0.5",
  "Good": "text-yellow-400 size-4 mt-0.5",
  "Regular": "text-orange-400 size-4 mt-0.5",
  "Bad": "text-red-500 size-4 mt-0.5",
  "Garbage": "text-purple-400 size-4 mt-0.5",
};

const statusBadgeColors: { [key: string]: string } = {
  "Ongoing": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  "Completed": "bg-green-500/20 text-green-700 dark:text-green-400",
  "On Hold": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  "Dropped": "bg-red-500/20 text-red-700 dark:text-red-400",
  "Plan to Read": "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  "Cancelled": "bg-red-500/20 text-red-700 dark:text-red-400",
};

const EnhancedComicCard: React.FC<EnhancedComicCardProps> = ({ 
  read, 
  onEdit,
  view = 'grid' 
}) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(read);
    }
  };

  // Calculate progress percentage
  const progressPercent = read.comicChapter ? Math.min((read.chapter / read.comicChapter) * 100, 100) : 0;

  if (view === 'list') {
    return (
      <Link href={`/library/${read.id}`}>
        <div className='flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group'>
          {/* Cover Image */}
          <div className='w-24 h-32 flex-shrink-0 rounded-md overflow-hidden shadow-md'>
            {read.coverImage ? (
              <img 
                src={read.coverImage} 
                alt={`Cover for ${read.title}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Image className='size-8 text-muted-foreground' />
              </div>
            )}
          </div>

          {/* Content */}
          <div className='flex-1 flex flex-col justify-between py-1'>
            <div>
              <div className='flex items-start justify-between gap-2 mb-2'>
                <h3 className='font-semibold text-lg line-clamp-2 flex-1'>{read.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusBadgeColors[read.status] || ''}`}>
                  {read.status}
                </span>
              </div>
              <p className='text-sm text-muted-foreground mb-2'>Last read {formatDistanceToNow(read.lastRead)}</p>
            </div>

            {/* Progress Bar */}
            <div className='flex items-center gap-2 mb-2'>
              <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-primary rounded-full transition-all duration-300'
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className='text-xs text-muted-foreground font-medium whitespace-nowrap'>
                {read.chapter}/{read.comicChapter}
              </span>
            </div>

            {/* Footer Stats */}
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-3'>
                {read.rating && (
                  <div className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-4'}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-xs text-muted-foreground'>{read.rating}</span>
                  </div>
                )}
                <span className='text-xs text-muted-foreground'>{read.type}</span>
              </div>
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={handleEditClick}
                >
                  <Settings2 className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link href={`/library/${read.id}`}>
      <div className="max-w-60 group">
        <div className="relative block w-full aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
          {read.coverImage ? (
            <img 
              src={read.coverImage} 
              alt={`Cover for ${read.title}`} 
              className="absolute h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
            />
          ) : (
            <div className="relative flex w-full h-full aspect-[2/3] items-center justify-center bg-muted hover:bg-muted/80 rounded-lg cursor-pointer shadow-lg">
              <Image className='size-16 text-muted-foreground' />
            </div>
          )}
          
          {/* Status Badge - Positioned at top right */}
          <div className='absolute top-2 right-2'>
            <span className={`text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm ${statusBadgeColors[read.status] || ''}`}>
              {read.status}
            </span>
          </div>

          {/* Quick Actions - Appear on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full"
                  >
                    <Eye className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
              
              {onEdit && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                      onClick={handleEditClick}
                    >
                      <Settings2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Comic</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>

        {/* Card Info */}
        <div className='mt-3 space-y-2'>
          <div>
            <h3 className="font-bold text-sm tracking-tight max-w-60 truncate line-clamp-2" title={read.title}>
              {read.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDistanceToNow(read.lastRead)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className='space-y-1'>
            <div className='h-1.5 bg-muted rounded-full overflow-hidden'>
              <div 
                className='h-full bg-primary rounded-full transition-all duration-300'
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className='flex justify-between items-center text-xs text-muted-foreground'>
              <span className='font-medium'>{read.chapter}/{read.comicChapter}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-1'>
            {read.rating ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating] || 'text-gray-400 size-3.5'}>
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <span className='text-xs text-muted-foreground font-medium truncate'>{read.rating}</span>
              </>
            ) : (
              <span className='text-xs text-muted-foreground'>No Rating</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnhancedComicCard;
