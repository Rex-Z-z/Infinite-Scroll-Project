'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

const error = () => {
    return (
        <div className="flex h-[calc(88vh-2rem)] w-full flex-col items-center justify-center">
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
        </div>
    )
}

export default error