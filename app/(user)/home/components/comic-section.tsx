'use client'

import React, { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import useSWR from 'swr'

import AddNewModal from '@/components/ui/add-new-modal'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import ComicCard from '@/components/ui/comic-card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import SectionSkeleton from '@/components/ui/section-skeleton'
import { ReadItem } from '@/lib/types'

import DropdownHome from './ui/home-filters'

interface ComicSectionProps {
  title: string
  fetcher: () => Promise<ReadItem[]>
  swrKey: string[]
  showAddCard?: boolean
  autoplay?: boolean
  loop?: boolean
  filterSection?: string
}

const ComicSection = ({
  title,
  fetcher,
  swrKey,
  showAddCard = false,
  autoplay = false,
  loop = false,
  filterSection,
}: ComicSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComic, setEditingComic] = useState<ReadItem | null>(null)

  // Pass the swrKey to useSWR so it caches correctly for each section
  const { data: reads, isLoading, error } = useSWR(swrKey, fetcher)

  // Carousel API state
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Memoize plugins to prevent re-creation on every render
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

  // Monitor Carousel state
  useEffect(() => {
    if (!api) return

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollState()
    api.on('select', updateScrollState)
    api.on('reInit', updateScrollState)

    return () => {
      api.off('select', updateScrollState)
      api.off('reInit', updateScrollState)
    }
  }, [api])

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
    <section className="flex w-full flex-col gap-2 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-0.5 md:gap-1">
          <p className="text-sm hover:cursor-pointer hover:underline md:text-2xl md:font-semibold">
            <Link href="/library">{title}</Link>
          </p>
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

        {/* Controls: Arrows + Optional Filter */}
        <div className="flex flex-row items-center gap-1">
          {!isLoading && !error && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
              >
                <ChevronRight />
              </Button>
            </div>
          )}

          {filterSection && <DropdownHome section={filterSection} />}

          {showAddCard && (
            <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
              <DialogTrigger>
                <Button
                  size="icon"
                  className="size-6 md:size-[36px] [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
                >
                  <Plus />
                </Button>
              </DialogTrigger>
              <AddNewModal comicData={editingComic} />
            </Dialog>
          )}
        </div>
      </div>

      {isLoading && <SectionSkeleton />}
      {error && <p className="text-destructive">{error}</p>}

      {!isLoading && !error && (
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: loop,
          }}
          plugins={plugins}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {reads &&
              reads.map((read) => (
                <CarouselItem
                  key={read.id}
                  className="3xl:basis-1/8 4xl:basis-1/12 5xl:basis-1/19 basis-1/4 pl-2 md:basis-1/4 xl:basis-1/6"
                >
                  <ComicCard read={read} onEdit={handleEdit} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  )
}

export default ComicSection
