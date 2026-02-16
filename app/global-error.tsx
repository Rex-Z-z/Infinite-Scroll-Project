'use client'

import React from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from '@/components/ui/button'

const GlobalError = () => {
    return (
        <Empty className="py-12">
            <EmptyHeader>
                <EmptyTitle className='text-[100px] font-bold'>404</EmptyTitle>
                <EmptyDescription className='text-lg'>
                    The page you looking for might have been removed had its name changed or is temporarily unavailable
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center">
                <Button>Back to Home</Button>
                <Button variant="outline">Try again</Button>
            </EmptyContent>
        </Empty>
    )
}

export default GlobalError