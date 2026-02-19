import React, { useEffect, useState } from 'react'

import { Book, BookOpen, Check, Clipboard, Copy, Search } from 'lucide-react'

import { Star } from '@/components/icons/custom-icons'
import { AnimatedSwapIcon } from '@/components/ui/animated-swap-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReadItem } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ComicFormProps {
  comicData: ReadItem | null
}

const ratingColorMap: { [key: string]: string } = {
  'Absolute Cinema': 'text-blue-400',
  Awesome: 'text-green-700',
  Great: 'text-green-600',
  Good: 'text-yellow-400',
  Regular: 'text-orange-400',
  Bad: 'text-red-500',
  Garbage: 'text-purple-400',
}

const statusColorMap: { [key: string]: string } = {
  Ongoing: 'text-blue-600',
  Completed: 'text-green-600',
  'On Hold': 'text-yellow-600',
  'Plan to Read': 'text-purple-600',
  Dropped: 'text-red-600',
  Cancelled: 'text-red-600',
}

const ComicForm = ({ comicData }: ComicFormProps) => {
  const [title, setTitle] = useState('')
  const [chapter, setChapter] = useState('')
  const [rating, setRating] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setTitle(comicData?.title || '')
    setChapter(String(comicData?.chapter || ''))
    setRating(comicData?.rating || '')
    setType(comicData?.type || '')
    setStatus(comicData?.status || '')
  }, [comicData])

  const handlePasteName = async () => {
    try {
      const textFromClipboard = await navigator.clipboard.readText()
      setTitle(textFromClipboard)
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error)
    }
  }

  const handleCopyName = () => {
    navigator.clipboard.writeText(title)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSearch = () => {
    const query = encodeURIComponent(`${title} chapter ${chapter}`)
    window.open(`https://www.google.com/search?q=${query}`, '_blank')
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Label
        className={cn(
          'flex items-center gap-2 text-xs',
          title ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        <Book className={'size-4'} />
        Title
      </Label>
      <div className="flex flex-row gap-1.5">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {title ? (
          <>
            <div className="relative">
              <Button variant="outline" size="icon" onClick={handleCopyName}>
                <AnimatedSwapIcon
                  icon={Copy}
                  altIcon={Check}
                  crossfade={isCopied}
                />
              </Button>
            </div>
            <Button
              onClick={handleSearch}
              variant="outline"
              size="icon"
              className="transition-all duration-300 ease-in-out hover:cursor-pointer"
            >
              <Search />
            </Button>
          </>
        ) : (
          <Button onClick={handlePasteName} variant="outline" size="icon">
            <Clipboard />
          </Button>
        )}
      </div>

      <div className="flex flex-row gap-1.5">
        <div className="flex w-full flex-col gap-2.5">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs',
              type ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <BookOpen className="size-4" />
            Type
          </Label>
          <Select onValueChange={setType} value={type}>
            <SelectTrigger className="w-full py-[17px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <SelectGroup>
                <SelectItem value="Manga">Manga</SelectItem>
                <SelectItem value="Manhwa">Manhwa</SelectItem>
                <SelectItem value="Manhua">Manhua</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full flex-col gap-2.5">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs',
              chapter ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <BookOpen className="size-4" />
            Chapter
          </Label>
          <Input
            type="number"
            placeholder="Chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </div>
      </div>

      <Label
        className={cn(
          'flex items-center gap-2 text-xs',
          rating ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn('mb-0.5 size-4', ratingColorMap[rating])}
        >
          <Star
            isFill
            className={cn('mb-0.5 size-4', ratingColorMap[rating])}
          />
        </svg>
        Rating
      </Label>
      <Select onValueChange={setRating} value={rating}>
        <SelectTrigger className="w-full py-[17px]">
          <SelectValue placeholder="Select a rating" />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
          <SelectGroup>
            <SelectItem value="Absolute Cinema">
              <Star isFill className="mr-2 size-4 text-blue-400" /> Absolute
              Cinema
            </SelectItem>
            <SelectItem value="Awesome">
              <Star isFill className="mr-2 size-4 text-green-700" /> Awesome
            </SelectItem>
            <SelectItem value="Great">
              <Star isFill className="mr-2 size-4 text-green-500" /> Great
            </SelectItem>
            <SelectItem value="Good">
              <Star isFill className="mr-2 size-4 text-yellow-400" /> Good
            </SelectItem>
            <SelectItem value="Regular">
              <Star isFill className="mr-2 size-4 text-orange-400" /> Regular
            </SelectItem>
            <SelectItem value="Bad">
              <Star isFill className="mr-2 size-4 text-red-500" /> Bad
            </SelectItem>
            <SelectItem value="Garbage">
              <Star isFill className="mr-2 size-4 text-purple-400" /> Garbage
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label
        className={cn(
          'flex items-center gap-2 text-xs',
          status ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={cn(`bi bi-circle-fill`, statusColorMap[status])}
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
        Status
      </Label>
      <RadioGroup
        defaultValue="Ongoing"
        onValueChange={setStatus}
        value={status}
        className="grid grid-cols-2 gap-1.5"
      >
        <Label
          htmlFor="r1"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 not-last:transition-colors"
        >
          <RadioGroupItem value="Ongoing" id="r1" className="text-blue-600" />
          Ongoing
        </Label>

        <Label
          htmlFor="r2"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 transition-colors"
        >
          <RadioGroupItem
            value="Completed"
            id="r2"
            className="text-green-600"
          />
          Completed
        </Label>

        <Label
          htmlFor="r3"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 transition-colors"
        >
          <RadioGroupItem value="On Hold" id="r3" className="text-yellow-600" />
          On Hold
        </Label>

        <Label
          htmlFor="r4"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 transition-colors"
        >
          <RadioGroupItem
            value="Plan to Read"
            id="r4"
            className="text-purple-600"
          />
          Plan to Read
        </Label>

        <Label
          htmlFor="r5"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 transition-colors"
        >
          <RadioGroupItem value="Dropped" id="r5" className="text-red-600" />
          Dropped
        </Label>

        <Label
          htmlFor="r6"
          className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 transition-colors"
        >
          <RadioGroupItem value="Cancelled" id="r6" className="text-red-600" />
          Cancelled
        </Label>
      </RadioGroup>
    </div>
  )
}

export default ComicForm
