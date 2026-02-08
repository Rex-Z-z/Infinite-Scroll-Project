'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(90vh-2rem)]">
            <p className="text-base font-semibold text-blue-400">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Page error
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                Sorry, the page you are looking for is currently unavailable.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button className='p-5 text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 hover:ring-2 hover:ring-blue-700 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer'>
                    <a href="/"> Go back home </a>
                </Button>
                <Button onClick={() => window.location.reload()} className='p-5 text-white dark:text-black bg-white dark:bg-white hover:bg-gray-200 dark:hover:bg-gray-200 hover:ring-2 hover:ring-gray-200 focus:ring-2 focus:ring-gray-200 hover:cursor-pointer'> Try again </Button>
            </div>
        </div>
    )
}

export default error
