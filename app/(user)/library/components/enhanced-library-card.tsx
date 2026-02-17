'use client';

import React from 'react';
import Link from 'next/link';
import { ReadItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Image, Settings2, Star, BookMarked, CheckCircle, Pause, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EnhancedLibraryCardProps {
  read: ReadItem;
  onEdit: (read: ReadItem) => void;
  onStatusChange: (id: number, status: string) => void;
  onFavoriteToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSelectToggle?: (id: number, selected: boolean) => void;
  selected?: boolean;
  size?: 'compact' | 'normal' | 'large';
  isFavorite?: boolean;
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

const statusColors: { [key: string]: string } = {
  "Ongoing": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  "Completed": "bg-green-500/20 text-green-700 dark:text-green-400",
  "On Hold": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  "Dropped": "bg-red-500/20 text-red-700 dark:text-red-400",
  "Plan to Read": "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  "Cancelled": "bg-gray-500/20 text-gray-700 dark:text-gray-400",
};

const EnhancedLibraryCard: React.FC<EnhancedLibraryCardProps> = ({
  read,
  onEdit,
  onStatusChange,
  onFavoriteToggle,
  onDelete,
  onSelectToggle,
  selected = false,
  size = 'normal',
  isFavorite = false,
}) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(read);
  };

  const progressPercent = read.comicChapter ? Math.min((read.chapter / read.comicChapter) * 100, 100) : 0;

  // Compact view
  if (size === 'compact') {
    return (
      <Link href={`/library/${read.id}`}>
        <div className={`relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
          selected ? 'ring-2 ring-primary' : ''
        }`}>
          {/* Image */}
          <div className='relative w-full aspect-[2/3] bg-muted'>
            {read.coverImage ? (
              <img
                src={read.coverImage}
                alt={read.title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-muted'>
                <Image className='size-6 text-muted-foreground' />
              </div>
            )}

            {/* Favorite Star */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteToggle?.(read.id);
              }}
              className='absolute top-1 right-1 p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors'
            >
              <Star className={`size-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>

            {/* Checkbox */}
            <div className='absolute top-1 left-1'>
              <Checkbox
                checked={selected}
                onCheckedChange={(checked) => {
                  onSelectToggle?.(read.id, checked as boolean);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            </div>

            {/* Status Badge */}
            <div className='absolute bottom-1 left-1 right-1'>
              <span className={`text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm ${statusColors[read.status] || ''}`}>
                {read.status}
              </span>
            </div>
          </div>

          {/* Info - Minimal */}
          <div className='p-2 bg-card/50 backdrop-blur-sm'>
            <h3 className='text-xs font-semibold truncate'>{read.title}</h3>
            <div className='h-1 bg-muted rounded-full mt-1 overflow-hidden'>
              <div
                className='h-full bg-primary rounded-full'
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Large view
  if (size === 'large') {
    return (
      <Link href={`/library/${read.id}`}>
        <div className={`flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group ${
          selected ? 'ring-2 ring-primary' : ''
        }`}>
          {/* Cover */}
          <div className='w-32 h-48 flex-shrink-0 rounded-md overflow-hidden shadow-md'>
            {read.coverImage ? (
              <img
                src={read.coverImage}
                alt={read.title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              />
            ) : (
              <div className='w-full h-full bg-muted flex items-center justify-center'>
                <Image className='size-8 text-muted-foreground' />
              </div>
            )}
          </div>

          {/* Content */}
          <div className='flex-1 flex flex-col justify-between py-1'>
            <div>
              {/* Header with checkbox */}
              <div className='flex items-start gap-3 mb-2'>
                <Checkbox
                  checked={selected}
                  onCheckedChange={(checked) => {
                    onSelectToggle?.(read.id, checked as boolean);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
                <div className='flex-1'>
                  <h3 className='font-bold text-lg line-clamp-2 mb-1'>{read.title}</h3>
                  <p className='text-sm text-muted-foreground'>{read.type} • {formatDistanceToNow(read.lastRead)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFavoriteToggle?.(read.id);
                  }}
                >
                  <Star className={`size-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`} />
                </button>
              </div>

              {/* Status and Rating */}
              <div className='flex items-center gap-2 mb-3'>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[read.status] || ''}`}>
                  {read.status}
                </span>
                {read.rating && (
                  <div className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating]}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-xs text-muted-foreground'>{read.rating}</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className='flex items-center gap-2'>
                <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                  <div className='h-full bg-primary rounded-full' style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className='text-xs text-muted-foreground font-medium whitespace-nowrap'>
                  {read.chapter}/{read.comicChapter}
                </span>
              </div>
            </div>

            {/* Quick Status Buttons */}
            <div className='flex gap-2 mt-3 pt-3 border-t'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className='text-xs gap-1'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onStatusChange(read.id, 'Ongoing');
                      }}
                    >
                      <BookMarked className='size-3' />
                      Read
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as reading</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className='text-xs gap-1'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onStatusChange(read.id, 'Completed');
                      }}
                    >
                      <CheckCircle className='size-3' />
                      Complete
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as completed</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className='text-xs gap-1'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onStatusChange(read.id, 'On Hold');
                      }}
                    >
                      <Pause className='size-3' />
                      Hold
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Put on hold</TooltipContent>
                </Tooltip>

                <Button
                  variant="ghost"
                  size="sm"
                  className='ml-auto'
                  onClick={handleEditClick}
                >
                  <Settings2 className='size-4' />
                </Button>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Normal view (default)
  return (
    <Link href={`/library/${read.id}`}>
      <div className={`max-w-52 group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        selected ? 'ring-2 ring-primary' : ''
      }`}>
        {/* Image Container */}
        <div className='relative w-full aspect-[2/3] bg-muted overflow-hidden'>
          {read.coverImage ? (
            <img
              src={read.coverImage}
              alt={read.title}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-muted'>
              <Image className='size-8 text-muted-foreground' />
            </div>
          )}

          {/* Overlay on hover */}
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2'>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteToggle?.(read.id);
              }}
              className='p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors'
            >
              <Star className={`size-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="secondary" size="icon" className='size-9'>
                  <ChevronDownIcon className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className='text-xs'>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(read.id, 'Ongoing');
                }}>
                  <BookMarked className='size-3 mr-2' />
                  Ongoing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(read.id, 'Completed');
                }}>
                  <CheckCircle className='size-3 mr-2' />
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(read.id, 'On Hold');
                }}>
                  <Pause className='size-3 mr-2' />
                  On Hold
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(read.id, 'Dropped');
                }}>
                  <Trash2 className='size-3 mr-2' />
                  Dropped
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Top Controls */}
          <div className='absolute top-2 left-2 right-2 flex justify-between'>
            <Checkbox
              checked={selected}
              onCheckedChange={(checked) => {
                onSelectToggle?.(read.id, checked as boolean);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
            <span className={`text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm ${statusColors[read.status] || ''}`}>
              {read.status}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className='p-3 bg-card/50 backdrop-blur-sm'>
          <h3 className='font-bold text-sm line-clamp-2 mb-2'>{read.title}</h3>
          <div className='flex items-center justify-between text-xs text-muted-foreground mb-2'>
            <span>{read.type}</span>
            <span>{formatDistanceToNow(read.lastRead)}</span>
          </div>

          {/* Progress */}
          <div className='mb-2'>
            <div className='h-1.5 bg-muted rounded-full overflow-hidden mb-1'>
              <div className='h-full bg-primary rounded-full' style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>{read.chapter}/{read.comicChapter}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Rating */}
          {read.rating && (
            <div className='flex items-center gap-1 text-xs'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={statusColorMap[read.rating]}>
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <span className='text-muted-foreground'>{read.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// Helper icon
const ChevronDownIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default EnhancedLibraryCard;
