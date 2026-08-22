import React, { useRef, useState } from 'react'

import { Check, Image } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SwitchComicImageProps {
  currentCover: string
  availableImages: string[]
  onCoverUpdate: (newCover: string) => void
}

const SwitchComicImage = ({
  currentCover,
  availableImages,
  onCoverUpdate,
}: SwitchComicImageProps) => {
  const [selectedImage, setSelectedImage] = useState(currentCover)
  const [cover, setCover] = useState(currentCover)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    onCoverUpdate(selectedImage)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setCover(URL.createObjectURL(file))
  }

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Comic Cover</DialogTitle>
        <DialogDescription>
          Select a cover image for your comic
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-2">
        <Button
          className="group bg-muted hover:bg-accent flex h-60 items-center justify-center rounded-md border-2 shadow-lg hover:cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <Image className="text-muted-foreground size-12 transition-transform duration-300 group-hover:scale-110" />
        </Button>

        {availableImages.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)}
            className={`group relative flex h-60 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 shadow-lg ${selectedImage === src ? 'border-primary' : 'border-transparent'}`}
          >
            <img
              src={src}
              alt={`Cover option ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {selectedImage === src && (
              <div className="bg-primary absolute top-2 right-2 rounded-full p-1">
                <Check className="size-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Close
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={handleSave}
          className="hover:cursor-pointer"
        >
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default SwitchComicImage
