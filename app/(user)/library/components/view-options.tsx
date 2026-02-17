'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings2, Grid3X3, Rows3 } from 'lucide-react';

export type ViewSize = 'compact' | 'normal' | 'large';
export type ViewLayout = 'grid' | 'list';

interface ViewOptionsProps {
  size: ViewSize;
  layout: ViewLayout;
  onSizeChange: (size: ViewSize) => void;
  onLayoutChange: (layout: ViewLayout) => void;
}

const ViewOptions: React.FC<ViewOptionsProps> = ({ 
  size, 
  layout, 
  onSizeChange, 
  onLayoutChange 
}) => {
  const sizeLabels: Record<ViewSize, string> = {
    compact: 'Compact',
    normal: 'Normal',
    large: 'Large',
  };

  const layoutLabels: Record<ViewLayout, string> = {
    grid: 'Grid',
    list: 'List',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="size-4" />
          <span className="hidden sm:inline">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs uppercase">View Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={size === 'compact'}
          onCheckedChange={() => onSizeChange('compact')}
          className="cursor-pointer text-xs"
        >
          Compact (More items)
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={size === 'normal'}
          onCheckedChange={() => onSizeChange('normal')}
          className="cursor-pointer text-xs"
        >
          Normal (Balanced)
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={size === 'large'}
          onCheckedChange={() => onSizeChange('large')}
          className="cursor-pointer text-xs"
        >
          Large (Detailed)
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs uppercase">Layout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={layout === 'grid'}
          onCheckedChange={() => onLayoutChange('grid')}
          className="cursor-pointer"
        >
          <Grid3X3 className="size-4 mr-2" />
          Grid
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={layout === 'list'}
          onCheckedChange={() => onLayoutChange('list')}
          className="cursor-pointer"
        >
          <Rows3 className="size-4 mr-2" />
          List
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewOptions;
