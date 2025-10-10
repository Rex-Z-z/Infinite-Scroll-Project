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

const DropdownGenre = () => {
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
    const isGenreSelected = showAction || showAdventure || showComedy || showDrama || showFantasy || showHorror || showMystery || showRomance || showSciFi || showSliceOfLife || showThriller || showTragedy;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className='h-7 text-[12px] ml-1 focus-visible:ring-[1.5px] transition-all duration-300 ease-in-out'>
                    {isGenreSelected ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    Genres
                </Button>
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
    )
}

export default DropdownGenre
