'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export type SortOption = 'title' | 'rating' | 'dateAdded' | 'lastRead' | 'progress' | 'chapters';

interface SortDropdownProps {
  value: SortOption;
  isAscending: boolean;
  onChange: (option: SortOption, isAscending: boolean) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Title', value: 'title' },
  { label: 'Rating', value: 'rating' },
  { label: 'Date Added', value: 'dateAdded' },
  { label: 'Last Read', value: 'lastRead' },
  { label: 'Progress', value: 'progress' },
  { label: 'Chapters', value: 'chapters' },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ value, isAscending, onChange }) => {
  const currentLabel = sortOptions.find(opt => opt.value === value)?.label || 'Sort';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowUpDown className="size-4" />
          <span className="hidden sm:inline">{currentLabel}</span>
          {isAscending ? (
            <ArrowUp className="size-3" />
          ) : (
            <ArrowDown className="size-3" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs uppercase">Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {sortOptions.map(option => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={value === option.value}
            onCheckedChange={() => onChange(option.value, isAscending)}
            className="cursor-pointer"
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs uppercase">Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={isAscending}
          onCheckedChange={() => onChange(value, true)}
          className="cursor-pointer"
        >
          <ArrowUp className="size-4 mr-2" />
          Ascending
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={!isAscending}
          onCheckedChange={() => onChange(value, false)}
          className="cursor-pointer"
        >
          <ArrowDown className="size-4 mr-2" />
          Descending
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
