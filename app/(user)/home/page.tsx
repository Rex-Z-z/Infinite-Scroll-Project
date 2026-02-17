'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { BookOpen, Lightbulb, Library } from 'lucide-react';
import WelcomeHero from './components/welcome-hero';
import ReadingStatsWidget from './components/reading-stats-widget';
import ResponsiveGridSection from './components/responsive-grid-section';
import QuickActionPanel from './components/quick-action-panel';
import { FilterState } from './components/ui/home-filters';
import { fetchRecentReads, fetchRecommendedReads, fetchAllReads } from '@/services/home/comic.service';

const fetcher = () => Promise.resolve(null);

const HomePage = () => {
  const [recentFilters, setRecentFilters] = useState<FilterState | null>(null);
  const [recommendationFilters, setRecommendationFilters] = useState<FilterState | null>(null);

  const { data: recentReads, isLoading: recentLoading, error: recentError } = useSWR(['recent-reads'], () => fetchRecentReads());
  const { data: recommendedReads, isLoading: recommendedLoading, error: recommendedError } = useSWR(['recommended-reads'], () => fetchRecommendedReads());
  const { data: allReads, isLoading: allLoading, error: allError } = useSWR(['all-reads'], () => fetchAllReads());

  const isLoading = recentLoading || recommendedLoading || allLoading;

  return (
    <main className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-4 py-6 md:py-8'>
        {/* Welcome Hero Section */}
        <WelcomeHero allReads={allReads} isLoading={isLoading} />

        {/* Reading Stats Widget */}
        <ReadingStatsWidget allReads={allReads} isLoading={isLoading} />

        {/* Recent Reads Section */}
        <ResponsiveGridSection
          title="Continue Reading"
          description="Your recently updated titles"
          icon={BookOpen}
          href="/library"
          data={recentReads}
          isLoading={recentLoading}
          error={recentError}
          section="recent-reads"
          filters={recentFilters}
          onFilterChange={setRecentFilters}
        />

        <div className='my-8' />

        {/* Recommendations Section */}
        <ResponsiveGridSection
          title="Recommended For You"
          description="Based on your reading history and ratings"
          icon={Lightbulb}
          href="/library"
          data={recommendedReads}
          isLoading={recommendedLoading}
          error={recommendedError}
          section="recommendations"
          filters={recommendationFilters}
          onFilterChange={setRecommendationFilters}
        />

        <div className='my-8' />

        {/* Full Library Section */}
        <ResponsiveGridSection
          title="Your Library"
          description="All comics in your collection"
          icon={Library}
          href="/library"
          data={allReads}
          isLoading={allLoading}
          error={allError}
          section="recent-reads"
          filters={null}
        />
      </div>

      {/* Quick Action Panel */}
      <QuickActionPanel />
    </main>
  );
};

export default HomePage;
