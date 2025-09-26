import React from 'react';
import NavBar from '@/components/ui/navbar'
import RecentReads from './components/recent-reads';
import Recommendations from './components/recommendations';
import Library from './components/library';

const page = () => {
  return (
    <div>
      <NavBar />
      <RecentReads />
      <Recommendations />
      <Library />
    </div>
  );
}

export default page
