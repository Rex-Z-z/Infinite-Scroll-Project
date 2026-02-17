'use client';

import React, { useState } from 'react'
import { ReadItem } from '@/lib/types';
import EnhancedComicCard from './enhanced-comic-card';
import SectionHeader from './section-header';
import { Button } from '@/components/ui/button';
import DropdownHome from './ui/home-filters';
import { FilterState } from './ui/home-filters';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { BookOpen, Grid2X2, List } from 'lucide-react';

interface ResponsiveGridSectionProps {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  data: ReadItem[] | undefined;
  isLoading: boolean;
  error: any;
  section: 'recent-reads' | 'recommendations';
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

// Filter helper function
const applyFilters = (items: ReadItem[], filters: FilterState) => {
  if (!items || !filters) return items;

  return items.filter(item => {
    // Filter by type
    if (Object.values(filters.types).some(t => t)) {
      const hasType = Object.entries(filters.types)
        .filter(([, selected]) => selected)
        .some(([type]) => item.type.toLowerCase() === type.toLowerCase());
      if (!hasType) return false;
    }

    // Filter by rating
    if (filters.selectedRatings.length > 0) {
      if (!filters.selectedRatings.includes(item.rating)) return false;
    }

    return true;
  });
};

const ResponsiveGridSection: React.FC<ResponsiveGridSectionProps> = ({
  title,
  description,
  icon: Icon,
  href,
  data,
  isLoading,
  error,
  section,
  filters,
  onFilterChange,
}) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredData = filters ? applyFilters(data || [], filters) : data;

  return (
    <section className='flex flex-col w-full p-4 md:p-6 gap-4'>
      {/* Header with view toggle */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <SectionHeader 
          title={title} 
          description={description}
          icon={Icon}
          href={href}
        />
        
        {/* View Toggle and Filters */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center border rounded-lg p-1 bg-muted/50'>
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="size-8 rounded-md"
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <Grid2X2 className="size-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="size-8 rounded-md"
              onClick={() => setView('list')}
              title="List view"
            >
              <List className="size-4" />
            </Button>
          </div>
          {onFilterChange && (
            <DropdownHome
              section={section}
              onFilterChange={onFilterChange}
              initialFilters={filters || undefined}
            />
          )}
        </div>
      </div>

      {isLoading && <SectionSkeleton />}
      {error && <p className="text-destructive text-sm">Failed to load {title.toLowerCase()}</p>}

      {/* Cards Grid/List */}
      {!isLoading && !error && (
        <div>
          {filteredData && filteredData.length > 0 ? (
            <div className={
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max'
                : 'space-y-2'
            }>
              {filteredData.map((read) => (
                <EnhancedComicCard
                  key={read.id}
                  read={read}
                  view={view}
                />
              ))}
            </div>
          ) : (
            <Empty className='bg-transparent border-0 py-8'>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen className="text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>No items found</EmptyTitle>
              </EmptyHeader>
              <EmptyDescription>
                {filters?.selectedRatings.length || Object.values(filters?.types || {}).some(t => t)
                  ? 'No items match your current filters. Try adjusting them.'
                  : `No ${title.toLowerCase()} yet. Start by adding some!`
                }
              </EmptyDescription>
            </Empty>
          )}
        </div>
      )}
    </section>
  );
};

export default ResponsiveGridSection;
