import React from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen'>
      <p className='text-3xl font-bold'>Lading Page (Ongoing Development)</p>
      <Button variant="outline">
        <a href="/login">Login</a>
      </Button>
    </div>
  )
}

export default page
