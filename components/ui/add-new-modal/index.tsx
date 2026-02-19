import React from 'react'
import { ReadItem } from '@/lib/types'
import { ImageUploader } from './image-uploader'
import ComicForm from './comic-form'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog'

const AddNewModal = ({ comicData }: { comicData: ReadItem | null }) => {
  return (
    <DialogContent className="w-full">
      <div className="flex flex-row gap-3">
        <ImageUploader
          initialImageUrl={comicData?.coverImage || null}
          comicData={comicData}
        />
      </div>

      <ComicForm comicData={comicData} />

      <DialogFooter className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <DialogClose asChild>
          <Button variant="outline" size="lg" className="hover:cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" size="lg" className="hover:cursor-pointer">
          Save Change
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default AddNewModal
