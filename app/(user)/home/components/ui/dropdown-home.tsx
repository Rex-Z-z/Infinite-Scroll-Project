'use client'

import React, { useState } from 'react'
import { BookOpen, CalendarCog, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

interface NavBarProps {
    section?: 'recent-reads' | 'recommendations';
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

const DropdownHome = ({section = 'recent-reads' }: NavBarProps) => {
    const [date, setDate] = useState("Recent");
    const [year, setYear] = useState("2025");
    const [year2, setYear2] = useState("2025");
    const [isYearRangeActive, setIsYearRangeActive] = useState(false);
    
    // Type
    const [showManga, setShowManga] = useState<Checked>(true)
    const [showManhwa, setShowManhwa] = useState<Checked>(true)
    const [showManhua, setShowManhua] = useState<Checked>(true)

    // Rating
    const [showRatingAbsoluteCinema, setShowRatingAbsoluteCinema] = useState<Checked>(true)
    const [showRatingAwesome, setShowRatingAwesome] = useState<Checked>(true)
    const [showRatingGreat, setShowRatingGreat] = useState<Checked>(false)
    const [showRatingGood, setShowRatingGood] = useState<Checked>(false)
    const [showRatingRegular, setShowRatingRegular] = useState<Checked>(false)
    const [showRatingBad, setShowRatingBad] = useState<Checked>(false)
    const [showRatingGarbage, setShowRatingGarbage] = useState<Checked>(false)

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
                    <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Select Date</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={date} onValueChange={(value) => {setDate(value); setIsYearRangeActive(false);}}>
                        <DropdownMenuRadioItem value="Recent">Recent</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="7 Days">7 Days</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1 Month">1 Month</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="6 Months">6 Months</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    
                    { section === "recent-reads" ? (
                        ""
                    ) : (
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
                    )} 
                </DropdownMenuContent>
            </DropdownMenu>

            { section === "recent-reads" ? (
                ""
            ) : (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                                <Star />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Select Rating</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={showRatingAbsoluteCinema} onCheckedChange={setShowRatingAbsoluteCinema} >Absolute Cinema</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingAwesome} onCheckedChange={setShowRatingAwesome} >Awesome</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingGreat} onCheckedChange={setShowRatingGreat} >Great</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingGood} onCheckedChange={setShowRatingGood} >Good</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingRegular} onCheckedChange={setShowRatingRegular} >Regular</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingBad} onCheckedChange={setShowRatingBad} >Bad</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showRatingGarbage} onCheckedChange={setShowRatingGarbage} >Garbage</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="size-8 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer">
                                <BookOpen />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-46" align="end">
                            <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>Select Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={showManga} onCheckedChange={setShowManga} >Manga</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showManhwa} onCheckedChange={setShowManhwa} >Manhwa</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={showManhua} onCheckedChange={setShowManhua} >Manhua</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
        </div>
    )
}

export default DropdownHome