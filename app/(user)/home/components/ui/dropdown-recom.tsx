'use client'

import React, { useState } from 'react'
import { BookOpen, CalendarCog, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
DropdownMenu, 
DropdownMenuContent, 
DropdownMenuLabel, 
DropdownMenuRadioGroup, 
DropdownMenuRadioItem, 
DropdownMenuSeparator, 
DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const DropdownRecom = () => {
    const [date, setDate] = useState("Recent");
    const [type, setType] = useState("Manga");
    const [rating, setRating] = useState("Good");
    const [year, setYear] = useState("2025");
    const [year2, setYear2] = useState("2025");
    const [isYearRangeActive, setIsYearRangeActive] = useState(false);

    return (
        <div className='flex flex-row gap-1.5 items-center'>
            {/* Date */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                        <CalendarCog />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={date} onValueChange={(value) => {setDate(value); setIsYearRangeActive(false);}}>
                        <DropdownMenuRadioItem value="Recent">Recent</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="7 Days">7 Days</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1 Month">1 Month</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="6 Months">6 Months</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <div className='mt-1 mb-1.5 flex items-center justify-center gap-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`h-7 text-[12px] ml-1 ${ isYearRangeActive ? "border-2 dark:border-blue-500 dark:ring-blue-500 text-white" : "" }`}>{year}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-10">
                                <DropdownMenuLabel>Year</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={year} onValueChange={(value) => {setYear(value); setDate("Custom"); setIsYearRangeActive(true);}}>
                                    <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <p className='text-sm text-center'>To</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`h-7 text-[12px] ml-1 ${ isYearRangeActive ? "border-2 dark:border-blue-500 dark:ring-blue-500 text-white" : "" }`}>{year2}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-10">
                                <DropdownMenuLabel>Year</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={year2} onValueChange={(value) => {setYear2(value); setDate("Custom"); setIsYearRangeActive(true);}}>
                                    <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                        <Star />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={rating} onValueChange={setRating}>
                        <DropdownMenuRadioItem value="Good">
                            <Star className="text-yellow-400" /> Good
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Mid">
                            <Star className="text-orange-400"/> Mid
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Bad">
                            <Star className="text-red-500"/>Bad
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                        <BookOpen />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                        <DropdownMenuRadioItem value="Manga">Manga</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Manhwa">Manhwa</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Manhua">Manhua</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DropdownRecom
