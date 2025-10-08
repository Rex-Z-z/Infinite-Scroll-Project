import React from 'react';
import { ReadItem } from '@/lib/types';
import { ImageUploader } from './image-uploader';
import ComicForm from './comic-form';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog"


const AddNewModal = ({ comicData }: { comicData: ReadItem | null }) => {
    return (
        <DialogContent>
            <div className='flex flex-row gap-3'>
                <ImageUploader initialImageUrl={comicData?.imageUrl || null} comicData={comicData} />
            </div>
            
            <ComicForm comicData={comicData} />

            <DialogFooter className='mt-4'>
                <DialogClose asChild>
                    <Button variant="outline" className='w-1/2 hover:cursor-pointer'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className='w-1/2 text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Submit</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default AddNewModal;