'use client'

import './globals.css'
import React from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from '@/components/ui/button'
import { ThemeProvider } from 'next-themes'

const NotFound = () => {
    return (
        <html>
            <body className='flex min-h-screen w-full flex-col items-center justify-center'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Empty className="py-12">
                        <EmptyHeader>
                            <EmptyTitle className='text-[100px] font-bold'>404</EmptyTitle>
                            <EmptyDescription className='text-md'>
                                The page you looking for might have been removed had its name changed or is temporarily unavailable
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent className="flex-row justify-center">
                            <Button size="xl">Back to Home</Button>
                            <Button variant="outline" size="xl">Try again</Button>
                        </EmptyContent>
                    </Empty>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default NotFound