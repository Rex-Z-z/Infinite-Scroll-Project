'use client'

import './globals.css'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'

const GlobalError = () => {
    return (
        <html>
            <body className='flex h-[calc(90vh-2rem)] flex-col items-center justify-center"'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className='flex flex-col justify-center items-center'>
                        <div className='relative flex items-center justify-center'>
                            <h1 className='text-[350px] text-muted/20 font-bold select-none tracking-widest'>
                                505
                            </h1>
                            <img 
                                src="/error.svg" 
                                alt="Server Error Illustration"
                                className="absolute bottom-10 h-94 w-94 object-contain" 
                            />
                        </div>
                        <div className='flex flex-col gap-2.5 justify-center items-center'>
                            <h1 className='text-2xl font-semibold'>Internal Server Error</h1>
                            <p className='w-max-sm text-center text-muted-foreground'>The server encountered an internal error and was unable to complete your request.</p>
                            <Button 
                                variant="default" 
                                size="xl"
                                onClick={() => window.location.reload()} 
                                className='hover:cursor-pointer'
                            >
                                Refresh
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default GlobalError