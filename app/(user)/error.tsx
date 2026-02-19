'use client'

import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

const error = () => {
  return (
    <div className="flex h-[calc(88vh-2rem)] w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <h1 className="text-muted/20 text-[350px] font-bold tracking-widest select-none">
            505
          </h1>
          <Image
            src="/error.svg"
            alt="Server Error Illustration"
            width={416}
            height={416}
            className="absolute bottom-4 h-104 w-104 object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h1 className="text-2xl font-semibold">Internal Server Error</h1>
          <p className="w-max-sm text-muted-foreground text-center">
            The server encountered an internal error and was unable to complete
            your request.
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
    </div>
  )
}

export default error
