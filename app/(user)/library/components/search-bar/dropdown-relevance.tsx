import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
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

type Checked = DropdownMenuCheckboxItemProps["checked"]

const DropdownRelevance = () => {
    // Rating
    const [showRatingGood, setShowRatingGood] = useState<Checked>(false)
    const [showRatingMid, setShowRatingMid] = useState<Checked>(false)
    const [showRatingBad, setShowRatingBad] = useState<Checked>(false)
    const isRatingSelected = showRatingGood || showRatingMid || showRatingBad;

    // Time
    const [time, setTime] = useState("Recent")

    // Year
    const [year, setYear] = useState("2025")
    const [year2, setYear2] = useState("2025")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className='h-7 text-[12px] focus-visible:ring-[1.5px] ml-1 transition-all duration-300 ease-in-out'>
                    {isRatingSelected ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-blue-600">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    Relevance
                </Button>
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
    )
}

export default DropdownRelevance
