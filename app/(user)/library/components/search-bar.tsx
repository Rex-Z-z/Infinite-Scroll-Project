'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps["checked"]

const SearchBar = () => {
    // Type
    const [showManga, setShowManga] = useState<Checked>(true)
    const [showManhwa, setShowManhwa] = useState<Checked>(true)
    const [showManhua, setShowManhua] = useState<Checked>(true)

    // Genres
    const [showAction, setShowAction] = useState<Checked>(false)
    const [showAdventure, setShowAdventure] = useState<Checked>(false)
    const [showComedy, setShowComedy] = useState<Checked>(false)
    const [showDrama, setShowDrama] = useState<Checked>(false)
    const [showFantasy, setShowFantasy] = useState<Checked>(false)
    const [showHorror, setShowHorror] = useState<Checked>(false)
    const [showMystery, setShowMystery] = useState<Checked>(false)
    const [showRomance, setShowRomance] = useState<Checked>(false)
    const [showSciFi, setShowSciFi] = useState<Checked>(false)
    const [showSliceOfLife, setShowSliceOfLife] = useState<Checked>(false)
    const [showThriller, setShowThriller] = useState<Checked>(false)
    const [showTragedy, setShowTragedy] = useState<Checked>(false)

    // Rating
    const [showRatingGood, setShowRatingGood] = useState<Checked>(true)
    const [showRatingMid, setShowRatingMid] = useState<Checked>(false)
    const [showRatingBad, setShowRatingBad] = useState<Checked>(false)

    // Time
    const [time, setTime] = useState("Recent")

    // Year
    const [year, setYear] = useState("2025")
    const [year2, setYear2] = useState("2025")
    
    return (
        <div>
            <div className="relative w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input type="text" placeholder="Search" className="w-full rounded-md border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-62 py-[7.6px] text-sm text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring-3 focus:ring-gray-200 focus:dark:ring-gray-700 focus:border-blue-600 focus:dark:border-blue-500 hover:border-gray-400 hover:dark:border-gray-600"/>

                <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='h-7 text-[12px]'>Type</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-46" align="end">
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Select Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={showManga} onCheckedChange={setShowManga} >Manga</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showManhwa} onCheckedChange={setShowManhwa} >Manhwa</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showManhua} onCheckedChange={setShowManhua} >Manhua</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='h-7 text-[12px] ml-1'>Genres</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-46 h-50 custom-scrollbar" align="end">
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Select Genres</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={showAction} onCheckedChange={setShowAction} >Action</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showAdventure} onCheckedChange={setShowAdventure} >Adventure</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showComedy} onCheckedChange={setShowComedy} >Comedy</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showDrama} onCheckedChange={setShowDrama} >Drama</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showFantasy} onCheckedChange={setShowFantasy} >Fantasy</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showHorror} onCheckedChange={setShowHorror} >Horror</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showMystery} onCheckedChange={setShowMystery} >Mystery</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRomance} onCheckedChange={setShowRomance} >Romance</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showSciFi} onCheckedChange={setShowSciFi} >Sci-Fi</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showSliceOfLife} onCheckedChange={setShowSliceOfLife} >Slice of Life</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showThriller} onCheckedChange={setShowThriller} >Thriller</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showTragedy} onCheckedChange={setShowTragedy} >Tragedy</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='h-7 text-[12px] ml-1'>Relevance</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-46" align="end">
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Time</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={time} onValueChange={setTime}>
                                <DropdownMenuRadioItem value="Recent">Recent</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Last Week">Last Week</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Last Month">Last Month</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Last Year">Last Year</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <div className='mt-1 mb-1.5 flex items-center justify-center gap-2'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className='h-7 text-[12px] ml-1'>{year}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-10">
                                        <DropdownMenuLabel>Year</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
                                            <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <p className='text-sm text-center'>To</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className='h-7 text-[12px] ml-1'>{year2}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-10">
                                        <DropdownMenuLabel>Year</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={year2} onValueChange={setYear2}>
                                            <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Rating</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={showRatingGood} onCheckedChange={setShowRatingGood} >Good</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingMid} onCheckedChange={setShowRatingMid} >Mid</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingBad} onCheckedChange={setShowRatingBad} >Bad</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default SearchBar