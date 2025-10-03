import React from 'react';
import NavBar from '@/components/ui/navbar'
import RecentReads from './components/recent-reads';
import Recommendations from './components/recommendations';
import LibraryRead from './components/library';

const page = () => {
  return (
    <div>
      <NavBar />
      <RecentReads />
      <Recommendations />
      <LibraryRead />
    </div>
  );
}

export default page
