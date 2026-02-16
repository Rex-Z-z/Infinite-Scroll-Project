'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Trash2, 
  Star, 
  Download, 
  Tag, 
  X,
  ChevronDown
} from 'lucide-react';

interface BulkActionsPanelProps {
  selectedCount: number;
  selectedIds: number[];
  onSelectAll: (selectAll: boolean) => void;
  onDelete: (ids: number[]) => void;
  onAddToCollection: (ids: number[], collection: string) => void;
  onRate: (ids: number[], rating: string) => void;
  onClearSelection: () => void;
  totalCount: number;
  isVisible: boolean;
}

const BulkActionsPanel: React.FC<BulkActionsPanelProps> = ({
  selectedCount,
  selectedIds,
  onSelectAll,
  onDelete,
  onAddToCollection,
  onRate,
  onClearSelection,
  totalCount,
  isVisible,
}) => {
  if (!isVisible || selectedCount === 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-4 p-4 rounded-lg border bg-card/50 mb-6 animate-in fade-in slide-in-from-top-2'>
      {/* Checkbox & Count */}
      <div className='flex items-center gap-3'>
        <Checkbox
          checked={selectedCount === totalCount}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)}
          title="Select all"
        />
        <span className='text-sm font-medium whitespace-nowrap'>
          {selectedCount} selected
        </span>
      </div>

      <div className='h-6 border-r opacity-30'></div>

      {/* Action Buttons */}
      <div className='flex flex-wrap gap-2 flex-1'>
        {/* Add to Collection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className='gap-2'>
              <Tag className='size-4' />
              Add to Collection
              <ChevronDown className='size-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className='text-xs'>Collections</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAddToCollection(selectedIds, 'Favorites')}>
              Favorites
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddToCollection(selectedIds, 'To Binge')}>
              To Binge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddToCollection(selectedIds, 'Top 10')}>
              Top 10
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Rate */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className='gap-2'>
              <Star className='size-4' />
              Rate
              <ChevronDown className='size-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className='text-xs'>Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['Absolute Cinema', 'Awesome', 'Great', 'Good', 'Regular', 'Bad', 'Garbage'].map(rating => (
              <DropdownMenuItem 
                key={rating}
                onClick={() => onRate(selectedIds, rating)}
              >
                {rating}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export */}
        <Button 
          variant="outline" 
          size="sm" 
          className='gap-2'
          onClick={() => {/* Export selected */}}
        >
          <Download className='size-4' />
          Export
        </Button>

        {/* Delete */}
        <Button 
          variant="destructive" 
          size="sm" 
          className='gap-2'
          onClick={() => onDelete(selectedIds)}
        >
          <Trash2 className='size-4' />
          Delete
        </Button>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearSelection}
        title="Clear selection"
      >
        <X className='size-4' />
      </Button>
    </div>
  );
};

export default BulkActionsPanel;
