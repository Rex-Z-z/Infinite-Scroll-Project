import NavBar from '@/components/ui/navbar'
import React from 'react'

const page = ({ params }: { params: { comicId: string } }) => {
  return (
    <div>
      <NavBar />
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-semibold tracking-tight text-balance text-white mb-3 ml-1'>Comic {params.comicId}</h1>
      </div>
    </div>
  )
}

export default page