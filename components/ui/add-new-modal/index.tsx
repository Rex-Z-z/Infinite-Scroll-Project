import React from 'react';
import { ReadItem } from '@/lib/types';
import { ImageUploader } from './image-uploader';
import ComicForm from './comic-form';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from "@/components/ui/dialog"


const AddNewModal = ({ comicData }: { comicData: ReadItem | null }) => {
    return (
        <>
            <div className='flex flex-row gap-3'>
                <ImageUploader initialImageUrl={comicData?.coverImage || null} comicData={comicData} />
            </div>

            <ComicForm comicData={comicData} />

            <DialogFooter className='mt-4'>
                <DialogClose asChild>
                    <Button variant="outline" className='w-1/2 hover:cursor-pointer'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className='w-1/2 hover:cursor-pointer'>Submit</Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
};

export default AddNewModal;
