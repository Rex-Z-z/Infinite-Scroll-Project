import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, BookAlert, BookMarked, BookOpen, BookOpenCheck, BookX } from 'lucide-react';
import OnGoing from './components/ongoing';
import Completed from './components/completed';
import Hold from './components/hold';
import Dropped from './components/dropped';
import SearchBar from './components/search-bar';
import Plan from './components/plan';
import Cancelled from './components/cancelled';

const Page = () => {
  return (
    <div>
      <div className="flex flex-col p-4">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-white mb-3 ml-1">Library</h1>
        
        <section>
          <Tabs defaultValue="ongoing" className="w-full">
            <div className="gap-1.5 mb-1 bg-transparent flex flex-row justify-between">
              <TabsList className="bg-transparent p-0 m-0">
                <TabsTrigger value="ongoing" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
                  <BookOpen /> Ongoing
                </TabsTrigger>
                <TabsTrigger value="completed" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
                  <BookOpenCheck /> Completed
                </TabsTrigger>
                <TabsTrigger value="hold" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
                  <Book /> On Hold
                </TabsTrigger>
                <TabsTrigger value="plan" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
                  <BookMarked /> Plan to Read
                </TabsTrigger>
                <TabsTrigger value="dropped" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
                  <BookAlert /> Dropped
                </TabsTrigger>
                <TabsTrigger value="cancelled" className='px-5 py-[18px] dark:data-[state=active]:text-primary hover:cursor-pointer'>
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
        </section>
      </div>
    </div>
  )
}

export default Page