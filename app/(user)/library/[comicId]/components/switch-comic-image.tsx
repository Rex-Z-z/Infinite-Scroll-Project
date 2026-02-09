import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from 'lucide-react';

const SwitchComicImage = () => {
    const images = [
        "/pictures/image.png",
        "/pictures/image2.png",
        "/pictures/image3.png",
        "/pictures/image4.png",
        "/pictures/image5.png",
    ];

    return (
        <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Comic Cover</DialogTitle>
                <DialogDescription>
                    Select a cover image for your comic
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-1">
                {images.map((src, index) => (
                    <div key={index} className='relative flex h-60 items-center justify-center bg-gray-700 hover:bg-gray-800 rounded-md shadow-lg overflow-hidden group cursor-pointer'>
                        <img 
                            src={src} 
                            alt={`Cover option ${index + 1}`} 
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' 
                        />
                        <Button variant="outline" size="icon" className="absolute size-8 top-2 right-2 bg-gray-500 dark:bg-gray-500/60 hover:bg-gray-600 dark:hover:bg-gray-500/80 focus:ring-gray-400 dark:focus:ring-gray-500 hover:cursor-pointer rounded-full">
                            <X />
                        </Button>
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