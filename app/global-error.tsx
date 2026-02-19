'use client'

import './globals.css'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const GlobalError = () => {
  return (
    <html>
      <body className='justify-center" flex h-[calc(90vh-2rem)] flex-col items-center'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <h1 className="text-muted/20 text-[350px] font-bold tracking-widest select-none">
                505
              </h1>
              <Image
                src="/error.svg"
                alt="Server Error Illustration"
                width={376}
                height={376}
                className="absolute bottom-10 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2.5">
              <h1 className="text-2xl font-semibold">Internal Server Error</h1>
              <p className="w-max-sm text-muted-foreground text-center">
                The server encountered an internal error and was unable to
                complete your request.
              </p>
              <Button
                variant="default"
                onClick={() => window.location.reload()}
                className="hover:cursor-pointer"
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
