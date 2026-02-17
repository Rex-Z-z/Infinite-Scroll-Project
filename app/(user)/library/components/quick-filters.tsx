'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Clock, Eye, Check } from 'lucide-react';

export type QuickFilterType = 'all' | 'favorites' | 'unread' | 'unrated' | 'recentlyAdded';

interface QuickFiltersProps {
  active: QuickFilterType;
  onChange: (filter: QuickFilterType) => void;
}

interface FilterOption {
  id: QuickFilterType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const filterOptions: FilterOption[] = [
  {
    id: 'all',
    label: 'All',
    icon: Eye,
    description: 'All comics'
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: Star,
    description: 'Starred comics'
  },
  {
    id: 'unread',
    label: 'Unread',
    icon: Clock,
    description: 'Plan to Read'
  },
  {
    id: 'unrated',
    label: 'Unrated',
    icon: Check,
    description: 'Need rating'
  },
  {
    id: 'recentlyAdded',
    label: 'Recently Added',
    icon: Clock,
    description: 'Last 7 days'
  },
];

const QuickFilters: React.FC<QuickFiltersProps> = ({ active, onChange }) => {
  return (
    <div className='flex flex-wrap gap-2 mb-6'>
      {filterOptions.map(option => {
        const Icon = option.icon;
        return (
          <Button
            key={option.id}
            variant={active === option.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option.id)}
            className='gap-2'
            title={option.description}
          >
            <Icon className='size-4' />
            <span className='hidden sm:inline'>{option.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickFilters;
