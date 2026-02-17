'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Plus,
  Book,
  BookMarked,
  CheckCircle2,
  PauseCircle,
  XCircle,
  Archive,
} from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewModal from '@/components/ui/add-new-modal';

interface LibraryEmptyStateProps {
  status: string;
}

const emptyStateContent: Record<string, { icon: React.ComponentType<{ className?: string }>, title: string, description: string }> = {
  'Ongoing': {
    icon: BookOpen,
    title: 'No ongoing reads',
    description: 'Start reading something to track your progress here.'
  },
  'Completed': {
    icon: CheckCircle2,
    title: 'No completed comics yet',
    description: 'Mark comics as completed when you finish them.'
  },
  'On Hold': {
    icon: PauseCircle,
    title: 'No comics on hold',
    description: 'Temporarily pause a comic you plan to continue later.'
  },
  'Plan to Read': {
    icon: BookMarked,
    title: 'Nothing in your backlog',
    description: 'Add comics you want to read in the future.'
  },
  'Dropped': {
    icon: XCircle,
    title: 'No dropped comics',
    description: 'Comics you stopped reading will appear here.'
  },
  'Cancelled': {
    icon: Archive,
    title: 'No cancelled series',
    description: 'Cancelled comics will be listed here.'
  },
};

const LibraryEmptyState: React.FC<LibraryEmptyStateProps> = ({ status }) => {
  const content = emptyStateContent[status] || emptyStateContent['Ongoing'];
  const Icon = content.icon;

  return (
    <div className='flex flex-col items-center justify-center py-20 px-4'>
      <div className='w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6'>
        <Icon className='w-10 h-10 text-muted-foreground' />
      </div>

      <h3 className='text-2xl font-bold text-center mb-2'>{content.title}</h3>
      <p className='text-muted-foreground text-center mb-8 max-w-sm'>
        {content.description}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className='gap-2'>
            <Plus className='size-5' />
            Add a Comic
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className='sr-only'>Add a new comic</DialogTitle>
          <AddNewModal comicData={null} />
        </DialogContent>
      </Dialog>

      {/* Tips */}
      <div className='mt-12 p-6 rounded-lg border bg-card/30 max-w-sm'>
        <h4 className='font-semibold text-sm mb-3'>Tips:</h4>
        <ul className='space-y-2 text-sm text-muted-foreground'>
          <li>• Search for comics using the search bar</li>
          <li>• Import from other sources (coming soon)</li>
          <li>• Use keyboard shortcut Cmd+K to add quickly</li>
          <li>• Organize with collections and tags</li>
        </ul>
      </div>
    </div>
  );
};

export default LibraryEmptyState;
