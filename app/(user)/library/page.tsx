'use client';

import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, BookAlert, BookMarked, BookOpen, BookOpenCheck, BookX } from 'lucide-react';
import useSWR from 'swr';
import LibraryHeader from './components/library-header';
import LibrarySidebar from './components/library-sidebar';
import QuickFilters, { QuickFilterType } from './components/quick-filters';
import SortDropdown, { SortOption } from './components/sort-dropdown';
import ViewOptions, { ViewSize, ViewLayout } from './components/view-options';
import BulkActionsPanel from './components/bulk-actions-panel';
import SearchBar from './components/search-bar';
import { fetchOngoingComicByType, fetchCompletedComicByType, fetchHoldComicByType, fetchDroppedComicByType, fetchPlanToReadComicByType } from '@/services/library/comic.service';
import { ReadItem } from '@/lib/types';
import EnhancedLibraryCard from './components/enhanced-library-card';
import LibraryEmptyState from './components/library-empty-state';
import SectionSkeleton from '@/components/ui/section-skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddNewModal from '@/components/ui/add-new-modal';

const fetcher = async () => {
  const [ongoing, completed, hold, dropped, plan] = await Promise.all([
    fetchOngoingComicByType(),
    fetchCompletedComicByType(),
    fetchHoldComicByType(),
    fetchDroppedComicByType(),
    fetchPlanToReadComicByType(),
  ]);
  return { ongoing, completed, hold, dropped, plan };
};

const Page = () => {
  const { data, isLoading } = useSWR('library-data', fetcher);
  const allReads = useMemo(() => {
    if (!data) return [];
    return [
      ...data.ongoing,
      ...data.completed,
      ...data.hold,
      ...data.dropped,
      ...data.plan,
    ];
  }, [data]);

  // UI State
  const [viewSize, setViewSize] = useState<ViewSize>('normal');
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [isAscending, setIsAscending] = useState(true);
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [editingComic, setEditingComic] = useState<ReadItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('ongoing');

  // Filter and sort data
  const getStatusReads = (status: string) => {
    if (!data) return [];
    const statusMap: Record<string, ReadItem[]> = {
      ongoing: data.ongoing || [],
      completed: data.completed || [],
      hold: data.hold || [],
      plan: data.plan || [],
      dropped: data.dropped || [],
      cancelled: [],
    };
    return statusMap[status] || [];
  };

  const filterAndSortReads = (reads: ReadItem[]) => {
    let filtered = reads;

    // Apply quick filters
    if (quickFilter === 'favorites') {
      filtered = filtered.filter(r => favorites.has(r.id));
    } else if (quickFilter === 'unrated') {
      filtered = filtered.filter(r => !r.rating);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;
      switch (sortBy) {
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
        case 'rating':
          compareValue = (b.rating?.length || 0) - (a.rating?.length || 0);
          break;
        case 'dateAdded':
          compareValue = new Date(b.published).getTime() - new Date(a.published).getTime();
          break;
        case 'lastRead':
          compareValue = new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
          break;
        case 'progress':
          const progressA = a.comicChapter ? (a.chapter / a.comicChapter) * 100 : 0;
          const progressB = b.comicChapter ? (b.chapter / b.comicChapter) * 100 : 0;
          compareValue = progressB - progressA;
          break;
        case 'chapters':
          compareValue = (b.chapter || 0) - (a.chapter || 0);
          break;
      }
      return isAscending ? compareValue : -compareValue;
    });

    return sorted;
  };

  const statusReads = getStatusReads(activeTab);
  const sortedReads = filterAndSortReads(statusReads);

  // Status counts
  const statusCounts = useMemo(() => ({
    ongoing: data?.ongoing?.length || 0,
    completed: data?.completed?.length || 0,
    hold: data?.hold?.length || 0,
    plan: data?.plan?.length || 0,
    dropped: data?.dropped?.length || 0,
    cancelled: 0,
  }), [data]);

  // Handlers
  const handleEditComic = (comic: ReadItem) => {
    setEditingComic(comic);
    setIsModalOpen(true);
  };

  const handleSelectToggle = (id: number, selected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (selected) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedIds(newSelected);
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedIds(new Set(sortedReads.map(r => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Changed comic ${id} to status ${newStatus}`);
  };

  const handleFavoriteToggle = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const handleDelete = (ids: number[]) => {
    console.log('Deleting:', ids);
    setSelectedIds(new Set());
  };

  // Column count based on size
  const getGridCols = () => {
    if (viewSize === 'compact') return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8';
    if (viewSize === 'large') return 'grid-cols-1';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <main className='min-h-screen bg-background'>
      {/* Header - Full Width */}
      <div className='border-b'>
        <div className='px-4 py-6'>
          <LibraryHeader allReads={allReads} isLoading={isLoading} />
        </div>
      </div>

      {/* Body - Flex Layout */}
      <div className='flex gap-4 md:gap-6 max-w-7xl mx-auto px-4 lg:px-0 overflow-hidden'>
        {/* Sidebar */}
        <div className='hidden lg:block w-64 flex-shrink-0 py-6 pr-2'>
          <LibrarySidebar
            allReads={allReads}
            isLoading={isLoading}
            selectedStatus={activeTab}
            onStatusSelect={(status) => setActiveTab(status.toLowerCase())}
          />
        </div>

        {/* Main Content */}
        <div className='flex-1 min-w-0 py-6'>
          {/* Quick Filters */}
          <QuickFilters
            active={quickFilter}
            onChange={setQuickFilter}
          />

          {/* Bulk Actions Panel */}
          <BulkActionsPanel
            selectedCount={selectedIds.size}
            selectedIds={Array.from(selectedIds)}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            onAddToCollection={(ids, collection) => {
              console.log('Added to collection:', collection);
            }}
            onRate={(ids, rating) => {
              console.log('Rated:', rating);
            }}
            onClearSelection={() => setSelectedIds(new Set())}
            totalCount={sortedReads.length}
            isVisible={selectedIds.size > 0}
          />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List with counts */}
            <div className="mb-6 bg-transparent flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <TabsList className="bg-transparent p-0 m-0 gap-1 overflow-x-auto flex-wrap lg:flex-nowrap">
                {[
                  { value: 'ongoing', label: 'Ongoing', icon: BookOpen, count: statusCounts.ongoing },
                  { value: 'completed', label: 'Completed', icon: BookOpenCheck, count: statusCounts.completed },
                  { value: 'hold', label: 'On Hold', icon: Book, count: statusCounts.hold },
                  { value: 'plan', label: 'Plan to Read', icon: BookMarked, count: statusCounts.plan },
                  { value: 'dropped', label: 'Dropped', icon: BookAlert, count: statusCounts.dropped },
                  { value: 'cancelled', label: 'Cancelled', icon: BookX, count: statusCounts.cancelled },
                ].map(({ value, label, icon: Icon, count }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className='px-4 py-2 gap-2 dark:data-[state=active]:text-primary hover:cursor-pointer text-sm'
                  >
                    <Icon className='size-4' />
                    <span className='hidden sm:inline'>{label}</span>
                    <span className='ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-muted text-muted-foreground'>
                      {count}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Controls */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto'>
                <div className='flex items-center gap-2 flex-1 sm:flex-none'>
                  <SortDropdown
                    value={sortBy}
                    isAscending={isAscending}
                    onChange={(option, asc) => {
                      setSortBy(option);
                      setIsAscending(asc);
                    }}
                  />
                  <ViewOptions
                    size={viewSize}
                    layout={viewLayout}
                    onSizeChange={setViewSize}
                    onLayoutChange={setViewLayout}
                  />
                </div>
                <div className='w-full sm:w-auto'>
                  <SearchBar />
                </div>
              </div>
            </div>

            {/* Tab Contents */}
            {['ongoing', 'completed', 'hold', 'plan', 'dropped', 'cancelled'].map(status => (
              <TabsContent key={status} value={status} className='mt-6'>
                {isLoading && <SectionSkeleton />}

                {!isLoading && sortedReads.length > 0 && (
                  <>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <AddNewModal comicData={editingComic} />
                    </Dialog>

                    {viewLayout === 'grid' ? (
                      <div className={`grid ${getGridCols()} gap-3 md:gap-4 lg:gap-6`}>
                        {sortedReads.map(read => (
                          <div key={read.id} className='min-w-0'>
                            <EnhancedLibraryCard
                              read={read}
                              onEdit={handleEditComic}
                              onStatusChange={handleStatusChange}
                              onFavoriteToggle={handleFavoriteToggle}
                              onDelete={handleDelete}
                              onSelectToggle={handleSelectToggle}
                              selected={selectedIds.has(read.id)}
                              size={viewSize}
                              isFavorite={favorites.has(read.id)}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='space-y-2 md:space-y-3'>
                        {sortedReads.map(read => (
                          <EnhancedLibraryCard
                            key={read.id}
                            read={read}
                            onEdit={handleEditComic}
                            onStatusChange={handleStatusChange}
                            onFavoriteToggle={handleFavoriteToggle}
                            onDelete={handleDelete}
                            onSelectToggle={handleSelectToggle}
                            selected={selectedIds.has(read.id)}
                            size="large"
                            isFavorite={favorites.has(read.id)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!isLoading && sortedReads.length === 0 && (
                  <LibraryEmptyState status={status === 'plan' ? 'Plan to Read' : status.charAt(0).toUpperCase() + status.slice(1)} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Page;
