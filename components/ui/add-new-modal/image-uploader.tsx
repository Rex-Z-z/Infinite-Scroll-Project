'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Clipboard } from 'lucide-react';
import { DialogDescription, DialogHeader, DialogTitle } from '../dialog';
import { ReadItem } from '@/lib/types';

interface ImageUploaderProps {
  initialImageUrl: string | null;
  comicData: ReadItem | null;
}

export const ImageUploader = React.memo(({ initialImageUrl, comicData }: ImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(initialImageUrl);
  }, [initialImageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePasteImage = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        if (item.types.some(type => type.startsWith('image/'))) {
          const blob = await item.getType(item.types.find(type => type.startsWith('image/'))!);
          setImagePreview(URL.createObjectURL(blob));
          break;
        }
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  };

  return (
    <div className="flex flex-row gap-3">
        <div className="relative block w-36 h-52 flex-shrink-0 group">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*"/>
            {imagePreview ? (
                <>
                    <img src={imagePreview} alt="Cover Preview" className="h-full w-full object-cover rounded-md" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button  variant="default" onClick={handleUploadClick} className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 ease-in-out text-xs px-2 py-1 dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
                            <Upload className="size-3.5" /> Update
                        </Button>
                    </div>
                </>
            ) : (
                <div className="h-full w-full bg-[#1a2231] border border-gray-700 rounded-md flex flex-col gap-2 items-center justify-center">
                    <Button variant="outline" onClick={handleUploadClick} className="flex items-center gap-2">
                        <Upload className="size-4" />
                        Upload
                    </Button>
                </div>
            )}
        </div>
        
        <div className='flex flex-col gap-4 w-full'>
            <DialogHeader>
                <DialogTitle>Add New Comic</DialogTitle>
                <DialogDescription className='font-semibold'>
                    {imagePreview ? "Edit the details of your comic." : "Add a new comic to your collection."}
                    <Button variant="outline" onClick={handlePasteImage} className="flex items-center gap-2 mt-2 text-xs p-1">
                        <Clipboard className="size-3.5" />
                        Paste
                    </Button>
                </DialogDescription>
            </DialogHeader>
        </div>
    </div>
  );
});