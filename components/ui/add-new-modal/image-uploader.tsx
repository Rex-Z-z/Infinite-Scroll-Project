'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Clipboard, Trash2 } from 'lucide-react';
import { DialogDescription, DialogHeader, DialogTitle } from '../dialog';
import { ReadItem } from '@/lib/types';
import Tooltip2 from '../tooltip-v2';

interface ImageUploaderProps {
  initialImageUrl: string | null;
  comicData: ReadItem | null;
}

export const ImageUploader = React.memo(({ initialImageUrl, comicData }: ImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showNoImageTooltip, setShowNoImageTooltip] = useState(false);
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

  const handleClearImage = () => {
    setImagePreview(null);
  };

  const handlePasteImage = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      let imageFound = false;
      for (const item of clipboardItems) {
        if (item.types.some(type => type.startsWith('image/'))) {
          const blob = await item.getType(item.types.find(type => type.startsWith('image/'))!);
          setImagePreview(URL.createObjectURL(blob));
          imageFound = true;
          break;
        }
      }
      if (!imageFound) {
        setShowNoImageTooltip(true);
        setTimeout(() => setShowNoImageTooltip(false), 2000);
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
      setShowNoImageTooltip(true);
      setTimeout(() => setShowNoImageTooltip(false), 2000);
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
                        <div className="flex flex-row gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                          <Button  variant="default" onClick={handleUploadClick} className="text-xs px-2 py-1">
                              <Upload className="size-3.5" />
                          </Button>
                          <Button  variant="default" onClick={handleClearImage} className="text-xs px-2 py-1">
                              <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-full w-full bg-card border rounded-md flex flex-col gap-2 items-center justify-center">
                    <div className='flex flex-row gap-2'>
                      <Button variant="default" onClick={handleUploadClick}>
                          <Upload className="size-4" />
                      </Button>
                    </div>
                </div>
            )}
        </div>
        
        <div className='flex flex-col gap-4 w-full'>
            <DialogHeader>
                <DialogTitle>
                  {comicData ? "Edit Comic" : "Add New Comic"}
                </DialogTitle>
                <DialogDescription className='flex flex-col mt-2 font-semibold'>
                    {comicData ? "Edit the details of your comic." : "Add a new comic to your collection."}
                    <div className='relative inline-block'>
                      <Button variant="outline" onClick={handlePasteImage} className="flex items-center gap-2 mt-2 text-xs p-1">
                          <Clipboard className="size-3.5" />
                          Paste
                      </Button>
                      {showNoImageTooltip && <Tooltip2>No image on clipboard</Tooltip2>}
                    </div>
                </DialogDescription>
            </DialogHeader>
        </div>
    </div>
  );
});