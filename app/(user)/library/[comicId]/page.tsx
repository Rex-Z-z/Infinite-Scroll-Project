import React from 'react'

import PageInfo from './components/page-info'

const page = async ({ params }: { params: Promise<{ comicId: string }> }) => {
  const { comicId } = await params

  return <PageInfo comicId={comicId} />
}

export default page
