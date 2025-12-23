import React from 'react'
import NavBar from '@/components/ui/navbar'
import PageInfo from './components/page-info'

const page = ({ params }: { params: { comicId: string } }) => {
  const { comicId } = params;
  
  return (
    <div className='h-screen flex flex-col'>
      <PageInfo comicId={comicId} />
    </div>
  )
}

export default page