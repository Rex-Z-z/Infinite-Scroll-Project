import React from 'react'

import {
  Book,
  BookAlert,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookX,
} from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Cancelled from './components/cancelled'
import Completed from './components/completed'
import Dropped from './components/dropped'
import Hold from './components/hold'
import OnGoing from './components/ongoing'
import Plan from './components/plan'
import SearchBar from './components/search-bar'

const TabsTriggerStyle =
  'dark:data-[state=active]:text-primary text-[10px] md:text-sm md:py-[18px] md:px-3'
const TabsTriggerIconStyle = 'size-4'
const TabsTextStyle = 'hidden md:block'

const Page = () => {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <h1 className="text-md mb-1 ml-1 font-semibold tracking-tight md:mb-3 md:text-4xl">
        Library
      </h1>

      <Tabs defaultValue="ongoing" className="w-full">
        <div className="mb-1 flex flex-col justify-between gap-1.5 bg-transparent lg:flex-row">
          <SearchBar />
          <TabsList className="m-0 w-full bg-transparent p-0">
            <TabsTrigger value="ongoing" className={TabsTriggerStyle}>
              <BookOpen className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>Ongoing</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className={TabsTriggerStyle}>
              <BookOpenCheck className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>Completed</span>
            </TabsTrigger>
            <TabsTrigger value="hold" className={TabsTriggerStyle}>
              <Book className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>On Hold</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className={TabsTriggerStyle}>
              <BookMarked className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>Plan to Read</span>
            </TabsTrigger>
            <TabsTrigger value="dropped" className={TabsTriggerStyle}>
              <BookAlert className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>Dropped</span>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className={TabsTriggerStyle}>
              <BookX className={TabsTriggerIconStyle} />{' '}
              <span className={TabsTextStyle}>Cancelled</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ongoing">
          <OnGoing />
        </TabsContent>

        <TabsContent value="completed">
          <Completed />
        </TabsContent>

        <TabsContent value="hold">
          <Hold />
        </TabsContent>

        <TabsContent value="plan">
          <Plan />
        </TabsContent>

        <TabsContent value="dropped">
          <Dropped />
        </TabsContent>

        <TabsContent value="cancelled">
          <Cancelled />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
