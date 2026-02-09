import React from 'react'
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const SwitchComicImage = () => {
    return (
        <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Comic Cover</DialogTitle>
                <DialogDescription>
                    Select a cover image for your comic
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-1">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className='flex h-60 items-center justify-center bg-gray-700 hover:bg-gray-800 rounded-md shadow-lg'>
                        <Image size={25} className='text-gray-500' />
                    </div>
                ))}
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button">Close</Button>
                </DialogClose>
                <Button variant="default" className='text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Upload</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default SwitchComicImage
