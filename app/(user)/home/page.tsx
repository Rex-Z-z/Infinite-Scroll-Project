import React from 'react'
import RecentReads from './components/recent-reads'
import Recommendations from './components/recommendations'
import LibraryRead from './components/library'

const page = () => {
  return (
    <div>
      <RecentReads />
      <Recommendations />
      <LibraryRead />
    </div>
  )
}

export default page
