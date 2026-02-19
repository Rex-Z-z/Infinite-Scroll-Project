import React from 'react'

import LibraryRead from './components/library'
import RecentReads from './components/recent-reads'
import Recommendations from './components/recommendations'

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
