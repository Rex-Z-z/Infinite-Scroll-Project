'use client'

import './globals.css'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'

const NotFound = () => {
    return (
        <html>
            <body className='flex h-[calc(90vh-2rem)] w-full flex-col items-center justify-center'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className='flex flex-col justify-center items-center'>
                        <div className='relative flex items-center justify-center'>
                            <h1 className='text-[350px] text-muted/20 font-bold select-none'>
                                404
                            </h1>
                            <img 
                                src="/404-error.svg" 
                                alt="Server Error Illustration"
                                className="absolute bottom-4 h-94 w-94 object-contain" 
                            />
                        </div>
                        <div className='flex flex-col gap-2.5 justify-center items-center'>
                            <h1 className='text-2xl font-semibold'>You've Scrolled Too Far</h1>
                            <p className='w-max-sm text-center text-muted-foreground'>You've reached the end of the known universe. There are no more comics here.</p>
                            <Button variant="default" size="xl" className='hover:cursor-pointer'>
                                <a href="/home">Back to Home</a>
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default NotFound