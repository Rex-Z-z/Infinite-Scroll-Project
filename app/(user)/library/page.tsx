import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, BookMarked, BookOpen, BookOpenCheck, BookX } from 'lucide-react';
import OnGoing from './components/ongoing';
import Completed from './components/completed';
import Hold from './components/hold';
import Dropped from './components/dropped';
import SearchBar from './components/search-bar';
import Plan from './components/plan';

const Page = () => {
  return (
    <div>
      <div className="flex flex-col p-4">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-white mb-3 ml-1">Library</h1>
        
        <section>
          <Tabs defaultValue="ongoing" className="w-full">
            <div className="gap-1.5 mb-1 bg-transparent flex flex-row justify-between">
              <TabsList className="gap-1.5 bg-transparent p-0 m-0">
                <TabsTrigger value="ongoing" className='px-5 py-[18px] border-0 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-600 dark:data-[state=active]:hover:bg-blue-700 hover:bg-gray-800 hover:ring-2 hover:ring-gray-800 dark:data-[state=active]:hover:ring-2 dark:data-[state=active]:hover:ring-blue-700 hover:cursor-pointer'>
                  <BookOpen /> Ongoing
                </TabsTrigger>
                <TabsTrigger value="completed" className='px-5 py-[18px] border-0 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-600 dark:data-[state=active]:hover:bg-blue-700 hover:bg-gray-800 hover:ring-2 hover:ring-gray-800 dark:data-[state=active]:hover:ring-2 dark:data-[state=active]:hover:ring-blue-700 hover:cursor-pointer'>
                  <BookOpenCheck /> Completed
                </TabsTrigger>
                <TabsTrigger value="hold" className='px-5 py-[18px] border-0 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-600 dark:data-[state=active]:hover:bg-blue-700 hover:bg-gray-800 hover:ring-2 hover:ring-gray-800 dark:data-[state=active]:hover:ring-2 dark:data-[state=active]:hover:ring-blue-700 hover:cursor-pointer'>
                  <Book /> On Hold
                </TabsTrigger>
                <TabsTrigger value="dropped" className='px-5 py-[18px] border-0 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-600 dark:data-[state=active]:hover:bg-blue-700 hover:bg-gray-800 hover:ring-2 hover:ring-gray-800 dark:data-[state=active]:hover:ring-2 dark:data-[state=active]:hover:ring-blue-700 hover:cursor-pointer'>
                  <BookX /> Dropped
                </TabsTrigger>
                <TabsTrigger value="plan" className='px-5 py-[18px] border-0 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-600 dark:data-[state=active]:hover:bg-blue-700 hover:bg-gray-800 hover:ring-2 hover:ring-gray-800 dark:data-[state=active]:hover:ring-2 dark:data-[state=active]:hover:ring-blue-700 hover:cursor-pointer'>
                  <BookMarked /> Plan to Read
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

            <TabsContent value="dropped">
              <Dropped />
            </TabsContent>

            <TabsContent value="plan">
              <Plan />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default Page