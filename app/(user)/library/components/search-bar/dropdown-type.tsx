import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { 
    DropdownMenu, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps["checked"]

const DropdownType = () => {
    // Type
    const [showManga, setShowManga] = useState<Checked>(false)
    const [showManhwa, setShowManhwa] = useState<Checked>(false)
    const [showManhua, setShowManhua] = useState<Checked>(false)
    const isTypeSelected = showManga || showManhwa || showManhua;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className='h-7 text-[12px] focus-visible:ring-[1.5px] transition-all duration-300 ease-in-out'>
                    {isTypeSelected ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-blue-600">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    Type
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
    )
}

export default DropdownType
