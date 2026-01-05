import React from 'react'
import PageInfo from './components/page-info'

const page = ({ params }: { params: { comicId: string } }) => {
  const { comicId } = params;
  
  return (
    <PageInfo comicId={comicId} />
  )
}

export default page