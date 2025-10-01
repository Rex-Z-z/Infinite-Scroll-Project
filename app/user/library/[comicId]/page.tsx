import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import NavBar from '@/components/ui/navbar'
import { BadgeCheckIcon } from 'lucide-react'
import React from 'react'

const page = ({ params }: { params: { comicId: string } }) => {
  return (
    <div>
      <NavBar />
      <div className='flex flex-row gap-4 p-4'>
        <div className="flex-none w-80 h-full">
          <img src="/pictures/image3.png" alt="Cover" className='overflow-hidden rounded-lg'/>
        </div>
        <div className='flex flex-col gap-2'>
            <div>
              <h1 className='text-3xl font-semibold'>How Can There Be a Divorce When We Haven't Even Married</h1>
              <h2 className='text-lg text-gray-500 font-semibold'>How Can There Be a Divorce When We Haven't Even Married</h2>
            </div>
            
            <div className='flex flex-row gap-1.5'>
              <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 px-2.5 py-1.5 rounded-2xl">
                  Action
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 px-2.5 py-1.5 rounded-2xl">
                  Adventure
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 px-2.5 py-1.5 rounded-2xl">
                  Drama
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 px-2.5 py-1.5 rounded-2xl">
                  Romance
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 px-2.5 py-1.5 rounded-2xl">
                  Thriller
              </Badge>
            </div>
            
            <div className='mt-2'>
              <h1 className='text-md font-semibold'>Description</h1>
              <h2 className='text-sm text-gray-500 font-semibold'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</h2>
            </div>
            
            <div className='mt-2'>
              <h1 className='text-md font-semibold mb-1'>Source</h1>
              <div className='flex flex-row gap-1.5'>
                <Badge variant="secondary" className="px-2.5 py-1.5 rounded-2xl">
                    <img src="/icons/logo.webp" alt="" className='size-4'/>
                    Asura Scans
                </Badge>
                <Badge variant="secondary" className="px-2.5 py-1.5 rounded-2xl">
                    Comick
                </Badge>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page