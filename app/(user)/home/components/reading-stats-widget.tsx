'use client';

import React, { useMemo } from 'react';
import { ReadItem } from '@/lib/types';
import { TrendingUp, Calendar, Award } from 'lucide-react';

interface ReadingStatsWidgetProps {
  allReads: ReadItem[] | undefined;
  isLoading: boolean;
}

const ReadingStatsWidget: React.FC<ReadingStatsWidgetProps> = ({ allReads = [], isLoading }) => {
  const stats = useMemo(() => {
    if (!allReads) return { 
      thisWeek: 0, 
      average: 0, 
      streak: 5,
      rating: '--'
    };

    // Calculate this week's chapters
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekChapters = allReads
      .filter(read => new Date(read.lastRead) >= weekAgo)
      .reduce((sum, read) => sum + (read.chapter || 0), 0);

    // Calculate average chapters per week (rough estimate)
    const totalChapters = allReads.reduce((sum, read) => sum + (read.chapter || 0), 0);
    const weeksOfReading = Math.max(allReads.length / 2, 1); // Rough estimate
    const average = Math.round(totalChapters / weeksOfReading);

    // Calculate average rating
    const ratings: { [key: string]: number } = {
      "Absolute Cinema": 5,
      "Awesome": 4.5,
      "Great": 4,
      "Good": 3,
      "Regular": 2,
      "Bad": 1,
      "Garbage": 0,
    };
    const ratedReads = allReads.filter(r => r.rating);
    const avgRating = ratedReads.length > 0
      ? (ratedReads.reduce((sum, r) => sum + (ratings[r.rating] || 0), 0) / ratedReads.length).toFixed(1)
      : '--';

    return { 
      thisWeek: thisWeekChapters, 
      average,
      streak: 5,
      rating: avgRating
    };
  }, [allReads]);

  if (isLoading) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        {[1, 2, 3].map(i => (
          <div key={i} className='h-28 bg-muted rounded-lg animate-pulse'></div>
        ))}
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
      {/* This Week */}
      <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-5 hover:bg-card/80 transition-colors cursor-default'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
        <div className='relative'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm font-medium text-muted-foreground'>This Week</span>
            <Calendar className='size-4 text-blue-500' />
          </div>
          <div className='flex items-baseline gap-2'>
            <div className='text-4xl font-bold'>{stats.thisWeek}</div>
            <span className='text-sm text-muted-foreground'>chapters</span>
          </div>
          <p className='text-xs text-muted-foreground mt-2'>Keep the momentum going</p>
        </div>
      </div>

      {/* Average Weekly */}
      <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-5 hover:bg-card/80 transition-colors cursor-default'>
        <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
        <div className='relative'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm font-medium text-muted-foreground'>Average</span>
            <TrendingUp className='size-4 text-purple-500' />
          </div>
          <div className='flex items-baseline gap-2'>
            <div className='text-4xl font-bold'>{stats.average}</div>
            <span className='text-sm text-muted-foreground'>per week</span>
          </div>
          <p className='text-xs text-muted-foreground mt-2'>Based on your history</p>
        </div>
      </div>

      {/* Average Rating */}
      <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-5 hover:bg-card/80 transition-colors cursor-default'>
        <div className='absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
        <div className='relative'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm font-medium text-muted-foreground'>Avg Rating</span>
            <Award className='size-4 text-yellow-500' />
          </div>
          <div className='flex items-baseline gap-2'>
            <div className='text-4xl font-bold'>{stats.rating}</div>
            <span className='text-sm text-muted-foreground'>/5.0</span>
          </div>
          <p className='text-xs text-muted-foreground mt-2'>Your taste level</p>
        </div>
      </div>
    </section>
  );
};

export default ReadingStatsWidget;
