import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from 'lucide-react';

interface SwitchComicImageProps {
    currentCover: string;
    availableImages: string[];
    onCoverUpdate: (newCover: string) => void;
}

const SwitchComicImage = ({ currentCover, availableImages, onCoverUpdate }: SwitchComicImageProps) => {
    const [selectedImage, setSelectedImage] = useState(currentCover);

    const handleSave = () => {
        onCoverUpdate(selectedImage);
    };

    return (
        <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Comic Cover</DialogTitle>
                <DialogDescription>
                    Select a cover image for your comic
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2">
                {availableImages.map((src, index) => (
                    <div 
                        key={index} 
                        onClick={() => setSelectedImage(src)}
                        className={`relative flex h-60 items-center justify-center rounded-md shadow-lg overflow-hidden group cursor-pointer border-4 ${selectedImage === src ? 'border-blue-500' : 'border-transparent'}`}
                    >
                        <img 
                            src={src} 
                            alt={`Cover option ${index + 1}`} 
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' 
                        />
                        {selectedImage === src && (
                            <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                                <Check className="text-white size-4" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" onClick={handleSave} className='bg-blue-500 hover:bg-blue-600 text-white'>
                        Save Changes
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default SwitchComicImage