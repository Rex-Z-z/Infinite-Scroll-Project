'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, BookOpenCheck, Book, BookMarked, BookAlert, BookX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

interface TabCarouselProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabCarousel: React.FC<TabCarouselProps> = ({ tabs, activeTab, onTabChange }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Check if we need scroll buttons
  const checkScroll = useCallback(() => {
    if (scrollRef.current && containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      // Check scroll position after animation
      setTimeout(checkScroll, 300);
    }
  };

  const handleTabClick = (value: string) => {
    onTabChange(value);
    
    // Scroll active tab into view
    setTimeout(() => {
      const activeElement = scrollRef.current?.querySelector(
        `[data-tab-value="${value}"]`
      );
      if (activeElement && scrollRef.current) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }, 0);
  };

  return (
    <div ref={containerRef} className='flex items-center gap-3 mb-6'>
      {/* Left Arrow */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className='flex-shrink-0 rounded-full'
          onClick={() => scroll('left')}
          title="Scroll left"
        >
          <ChevronLeft className='size-4' />
        </Button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        className='flex gap-2 overflow-x-auto scroll-smooth flex-1 scrollbar-hide'
        style={{
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        onScroll={checkScroll}
      >
        {tabs.map(({ value, label, icon: Icon, count }) => (
          <button
            key={value}
            data-tab-value={value}
            onClick={() => handleTabClick(value)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all whitespace-nowrap ${
              activeTab === value
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-card/50 text-foreground border-border hover:bg-accent hover:border-accent'
            }`}
          >
            <Icon className='size-4' />
            <span className='hidden sm:inline text-sm font-medium'>{label}</span>
            <span
              className={`ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full ${
                activeTab === value
                  ? 'bg-primary-foreground/30 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className='flex-shrink-0 rounded-full'
          onClick={() => scroll('right')}
          title="Scroll right"
        >
          <ChevronRight className='size-4' />
        </Button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TabCarousel;
