import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Book,
  BookAlert,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookX,
} from 'lucide-react'
import OnGoing from './components/ongoing'
import Completed from './components/completed'
import Hold from './components/hold'
import Dropped from './components/dropped'
import SearchBar from './components/search-bar'
import Plan from './components/plan'
import Cancelled from './components/cancelled'

const Page = () => {
  return (
    <div>
      <div className="flex flex-col p-4">
        <h1 className="mb-3 ml-1 text-4xl font-semibold tracking-tight">
          Library
        </h1>

        <Tabs defaultValue="ongoing" className="w-full">
          <div className="mb-1 flex flex-row justify-between gap-1.5 bg-transparent">
            <TabsList className="m-0 bg-transparent p-0">
              <TabsTrigger
                value="ongoing"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <BookOpen /> Ongoing
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <BookOpenCheck /> Completed
              </TabsTrigger>
              <TabsTrigger
                value="hold"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <Book /> On Hold
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <BookMarked /> Plan to Read
              </TabsTrigger>
              <TabsTrigger
                value="dropped"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <BookAlert /> Dropped
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="dark:data-[state=active]:text-primary px-5 py-[18px] hover:cursor-pointer"
              >
                <BookX /> Cancelled
              </TabsTrigger>
            </TabsList>
            <SearchBar />
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
    </div>
  )
}

export default Page
