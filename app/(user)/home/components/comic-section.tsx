'use client'

import React, { useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'
import ComicCard from '@/components/ui/comic-card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ReadItem } from '@/lib/types'

const AddNewModal = dynamic(() => import('@/components/ui/add-new-modal'), {
  loading: () => (
    <div className="bg-muted size-6 animate-pulse rounded-md md:size-[36px]" />
  ),
})

const DropdownHome = dynamic(() => import('./home-filters'), {
  loading: () => (
    <div className="bg-muted size-6 animate-pulse rounded-md md:size-[36px]" />
  ),
})

const SectionCarouselControls = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

interface ComicSectionProps {
  title: string
  reads: ReadItem[]
  showAddCard?: boolean
  autoplay?: boolean
  loop?: boolean
  filterSection?: string
}

const ComicSection = ({
  title,
  reads,
  showAddCard = false,
  autoplay = false,
  loop = false,
  filterSection,
}: ComicSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComic, setEditingComic] = useState<ReadItem | null>(null)

  const plugins = useMemo(() => {
    if (autoplay) {
      return [
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]
    }
    return []
  }, [autoplay])

  const handleEdit = (read: ReadItem) => {
    setEditingComic(read)
    setIsModalOpen(true)
  }

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setEditingComic(null)
    }
  }

  return (
    <section className="flex w-full flex-col px-28 py-4">
      <Carousel
        opts={{
          align: 'start',
          loop: loop,
        }}
        plugins={plugins}
        className="flex w-full flex-col gap-2"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-0.5 md:gap-1">
            <h2 className="text-sm hover:cursor-pointer hover:underline md:text-2xl md:font-semibold">
              <Link href="/library">{title}</Link>
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mt-[1.5px] size-5 md:size-7"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex flex-row items-center justify-center gap-1">
            <SectionCarouselControls />

            {filterSection && <DropdownHome />}

            <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
              {showAddCard && (
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
                  >
                    <Plus />
                  </Button>
                </DialogTrigger>
              )}
              <AddNewModal comicData={editingComic} />
            </Dialog>
          </div>
        </div>

        <CarouselContent className="-ml-1 sm:-ml-2">
          {reads &&
            reads.map((read) => (
              <CarouselItem key={read.id} className="basis-1/6 pl-2">
                <ComicCard read={read} onEdit={handleEdit} />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default ComicSection
