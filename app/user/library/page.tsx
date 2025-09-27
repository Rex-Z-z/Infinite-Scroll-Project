import NavBar from '@/components/ui/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavBar />
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold'>Library Page</h1>
      </div>
    </div>
  )
}

export default page