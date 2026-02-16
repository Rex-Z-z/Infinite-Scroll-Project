'use client';

import React, { useMemo, useState } from 'react';
import { ReadItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';

interface LibrarySidebarProps {
  allReads: ReadItem[] | undefined;
  isLoading: boolean;
  selectedStatus?: string;
  onStatusSelect?: (status: string) => void;
}

const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  allReads = [],
  isLoading,
  selectedStatus,
  onStatusSelect
}) => {
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const stats = useMemo(() => {
    if (!allReads) return {
      ongoing: 0,
      completed: 0,
      onHold: 0,
      planToRead: 0,
      dropped: 0,
      cancelled: 0,
      byGenre: {} as Record<string, number>,
    };

    const genres: Record<string, number> = {};
    const result = {
      ongoing: 0,
      completed: 0,
      onHold: 0,
      planToRead: 0,
      dropped: 0,
      cancelled: 0,
      byGenre: genres,
    };

    allReads.forEach(read => {
      switch (read.status) {
        case 'Ongoing': result.ongoing++; break;
        case 'Completed': result.completed++; break;
        case 'On Hold': result.onHold++; break;
        case 'Plan to Read': result.planToRead++; break;
        case 'Dropped': result.dropped++; break;
        case 'Cancelled': result.cancelled++; break;
      }

      read.tags?.forEach(tag => {
        genres[tag] = (genres[tag] || 0) + 1;
      });
    });

    return result;
  }, [allReads]);

  const statusItems = [
    { label: 'Ongoing', count: stats.ongoing, color: 'text-blue-500' },
    { label: 'Completed', count: stats.completed, color: 'text-green-500' },
    { label: 'On Hold', count: stats.onHold, color: 'text-yellow-500' },
    { label: 'Plan to Read', count: stats.planToRead, color: 'text-purple-500' },
    { label: 'Dropped', count: stats.dropped, color: 'text-red-500' },
    { label: 'Cancelled', count: stats.cancelled, color: 'text-gray-500' },
  ];

  const topGenres = Object.entries(stats.byGenre)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className='hidden lg:block w-64 space-y-4'>
        {[1, 2, 3].map(i => (
          <div key={i} className='h-20 bg-muted rounded-lg animate-pulse'></div>
        ))}
      </div>
    );
  }

  return (
    <div className='hidden lg:block w-64 space-y-4 flex-shrink-0'>
      {/* Status Breakdown */}
      <div className='p-4 rounded-lg border bg-card/50'>
        <h3 className='font-semibold text-sm mb-4'>Status Breakdown</h3>
        <div className='space-y-2'>
          {statusItems.map(item => (
            <button
              key={item.label}
              onClick={() => onStatusSelect?.(item.label)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm hover:bg-accent transition-colors ${
                selectedStatus === item.label ? 'bg-accent' : ''
              }`}
            >
              <div className='flex items-center gap-2'>
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <span className='text-muted-foreground'>{item.label}</span>
              </div>
              <span className='font-semibold text-xs bg-muted px-2 py-1 rounded'>
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Genres */}
      <div className='p-4 rounded-lg border bg-card/50'>
        <h3 className='font-semibold text-sm mb-4'>Top Genres</h3>
        <div className='space-y-2'>
          {topGenres.map(([genre, count]) => (
            <div key={genre} className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground truncate'>{genre}</span>
              <span className='text-xs font-semibold bg-muted px-2 py-1 rounded whitespace-nowrap'>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className='p-4 rounded-lg border bg-card/50'>
        <button
          onClick={() => setCollectionsOpen(!collectionsOpen)}
          className='w-full flex items-center justify-between mb-3'
        >
          <h3 className='font-semibold text-sm'>Collections</h3>
          <ChevronDown className={`size-4 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
        </button>
        {collectionsOpen && (
          <div className='space-y-2'>
            <div className='p-2 rounded-md hover:bg-accent cursor-pointer transition-colors text-sm'>
              <span className='text-muted-foreground'>Favorites</span>
            </div>
            <div className='p-2 rounded-md hover:bg-accent cursor-pointer transition-colors text-sm'>
              <span className='text-muted-foreground'>To Binge</span>
            </div>
            <div className='p-2 rounded-md hover:bg-accent cursor-pointer transition-colors text-sm'>
              <span className='text-muted-foreground'>Top 10</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className='w-full gap-2 mt-2'
            >
              <Plus className='size-3' />
              New Collection
            </Button>
          </div>
        )}
      </div>

      {/* Reading Goals */}
      <div className='p-4 rounded-lg border bg-card/50'>
        <h3 className='font-semibold text-sm mb-4'>Reading Goal</h3>
        <div className='space-y-2'>
          <div className='text-sm text-muted-foreground'>
            Finish 2 series this month
          </div>
          <div className='h-2 bg-muted rounded-full overflow-hidden'>
            <div className='h-full w-1/3 bg-primary rounded-full'></div>
          </div>
          <div className='text-xs text-muted-foreground'>1 of 2 completed</div>
        </div>
      </div>
    </div>
  );
};

export default LibrarySidebar;
