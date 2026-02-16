'use client';

import React from 'react';
import { ReadItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import AddNewModal from '@/components/ui/add-new-modal';

interface LibraryHeaderProps {
  allReads: ReadItem[] | undefined;
  isLoading: boolean;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({ allReads = [], isLoading }) => {
  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!allReads) return {
      total: 0,
      ongoing: 0,
      completed: 0,
      onHold: 0,
      planToRead: 0,
      dropped: 0,
      cancelled: 0,
    };

    return {
      total: allReads.length,
      ongoing: allReads.filter(r => r.status === 'Ongoing').length,
      completed: allReads.filter(r => r.status === 'Completed').length,
      onHold: allReads.filter(r => r.status === 'On Hold').length,
      planToRead: allReads.filter(r => r.status === 'Plan to Read').length,
      dropped: allReads.filter(r => r.status === 'Dropped').length,
      cancelled: allReads.filter(r => r.status === 'Cancelled').length,
    };
  }, [allReads]);

  if (isLoading) {
    return (
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 animate-pulse'>
        <div className='space-y-2'>
          <div className='h-10 bg-muted rounded-lg w-48'></div>
          <div className='h-4 bg-muted rounded-lg w-80'></div>
        </div>
        <div className='flex gap-2'>
          {[1, 2, 3].map(i => (
            <div key={i} className='h-10 bg-muted rounded-lg w-20'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 md:p-6 rounded-xl border bg-card/50'>
      <div className='flex-1'>
        <h1 className='text-4xl font-bold tracking-tight mb-2'>Your Library</h1>
        <p className='text-lg text-muted-foreground'>
          You have <span className='font-semibold text-foreground'>{stats.total}</span> comics with{' '}
          <span className='font-semibold text-foreground'>{stats.ongoing}</span> actively reading
        </p>
        
        {/* Quick Stats */}
        <div className='flex flex-wrap gap-4 mt-4'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-blue-500'></div>
            <span className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>{stats.completed}</span> Completed
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
            <span className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>{stats.onHold}</span> On Hold
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-purple-500'></div>
            <span className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>{stats.planToRead}</span> Plan to Read
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-red-500'></div>
            <span className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>{stats.dropped}</span> Dropped
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='flex flex-wrap gap-2 justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className='gap-2'>
              <Plus className='size-4' />
              Add Comic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddNewModal comicData={null} />
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="sm" className='gap-2'>
          <Upload className='size-4' />
          Import
        </Button>
        
        <Button variant="outline" size="sm" className='gap-2'>
          <Download className='size-4' />
          Export
        </Button>
      </div>
    </div>
  );
};

export default LibraryHeader;
