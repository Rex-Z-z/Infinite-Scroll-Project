'use client';

import React, { useMemo } from 'react';
import { ReadItem } from '@/lib/types';
import { BookOpen, BookMarked, CheckCircle, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeHeroProps {
  allReads: ReadItem[] | undefined;
  isLoading: boolean;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({ allReads = [], isLoading }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    if (!allReads) return { total: 0, ongoing: 0, completed: 0, totalChapters: 0, readingStreak: 5 };
    
    const total = allReads.length;
    const ongoing = allReads.filter(read => read.status === 'Ongoing').length;
    const completed = allReads.filter(read => read.status === 'Completed').length;
    const totalChapters = allReads.reduce((sum, read) => sum + (read.chapter || 0), 0);
    
    return { total, ongoing, completed, totalChapters, readingStreak: 5 };
  }, [allReads]);

  // Get personalized greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get personalized message based on activity
  const getMessage = () => {
    if (!allReads || allReads.length === 0) {
      return "Start building your collection by adding your first comic!";
    }
    
    const recentReads = allReads
      .filter(r => r.lastRead)
      .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
    
    if (recentReads.length > 0) {
      const lastReadDate = new Date(recentReads[0].lastRead);
      const daysAgo = Math.floor((Date.now() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysAgo === 0) {
        return `You're on fire! Keep up the momentum with ${recentReads[0].title}`;
      } else if (daysAgo === 1) {
        return "Nice! You read something yesterday. Ready for more today?";
      } else if (daysAgo < 7) {
        return `You've been reading ${stats.totalChapters} chapters. Keep the streak going!`;
      } else {
        return `It's been ${daysAgo} days. Ready to jump back in?`;
      }
    }
    
    return `You have ${stats.ongoing} ongoing series. How's your reading going?`;
  };

  if (isLoading) {
    return (
      <section className='p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent rounded-xl mb-8 animate-pulse'>
        <div className='h-8 bg-muted rounded-lg w-48 mb-2'></div>
        <div className='h-4 bg-muted rounded-lg w-96 mb-6'></div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className='h-24 bg-muted rounded-lg'></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent rounded-xl mb-8 border border-primary/10'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
        <div className='flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-2'>
            {getGreeting()}, Reader! 📚
          </h1>
          <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            {getMessage()}
          </p>
        </div>
        <Button 
          size="lg" 
          className='md:w-auto w-full'
          asChild
        >
          <a href="/library">Browse Library</a>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {/* Total Comics */}
        <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-4 hover:bg-card/80 transition-colors cursor-default'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='relative flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Total Comics</span>
              <BookOpen className='size-4 text-primary' />
            </div>
            <div className='text-3xl font-bold'>{stats.total}</div>
            <p className='text-xs text-muted-foreground'>in your collection</p>
          </div>
        </div>

        {/* Ongoing */}
        <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-4 hover:bg-card/80 transition-colors cursor-default'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='relative flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Reading</span>
              <BookMarked className='size-4 text-blue-500' />
            </div>
            <div className='text-3xl font-bold'>{stats.ongoing}</div>
            <p className='text-xs text-muted-foreground'>currently reading</p>
          </div>
        </div>

        {/* Completed */}
        <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-4 hover:bg-card/80 transition-colors cursor-default'>
          <div className='absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='relative flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Completed</span>
              <CheckCircle className='size-4 text-green-500' />
            </div>
            <div className='text-3xl font-bold'>{stats.completed}</div>
            <p className='text-xs text-muted-foreground'>finished series</p>
          </div>
        </div>

        {/* Total Chapters */}
        <div className='group relative overflow-hidden rounded-lg border bg-card/50 p-4 hover:bg-card/80 transition-colors cursor-default'>
          <div className='absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='relative flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Read</span>
              <Flame className='size-4 text-orange-500' />
            </div>
            <div className='text-3xl font-bold'>{stats.totalChapters}</div>
            <p className='text-xs text-muted-foreground'>chapters read</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
