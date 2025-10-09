import { ReadItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, BookOpen, Star, Clipboard, ClipboardCopy, ClipboardCheck, Search } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import Tooltip2 from '../tooltip-v2';

interface ComicFormProps {
  comicData: ReadItem | null;
}

const ratingColorMap: { [key: string]: string } = {
    "Good": "text-yellow-400",
    "Mid": "text-orange-400",
    "Bad": "text-red-500",
};

const statusColorMap: { [key: string]: string } = {
    "Ongoing": "text-blue-600",
    "Completed": "text-green-600",
    "On Hold": "text-yellow-600",
    "Dropped": "text-red-600",
    "Plan to Read": "text-purple-600",
};

const ComicForm = ({ comicData }: ComicFormProps) => {
    const [title, setTitle] = useState("");
    const [chapter, setChapter] = useState("");
    const [rating, setRating] = useState("");
    const [type , setType] = useState("");
    const [status, setStatus] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    

    useEffect(() => {
        setTitle(comicData?.title || "");
        setChapter(String(comicData?.chapter || ""));
        setRating(comicData?.rating || "");
        setType(comicData?.type || "");
        setStatus(comicData?.status || "");
    }, [comicData]);

    const handlePasteName = async () => {
        try {
            const textFromClipboard = await navigator.clipboard.readText();
            setTitle(textFromClipboard);
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
        }
    };

    const handleCopyName = () => {
        navigator.clipboard.writeText(title);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSearch = () => {
        const query = encodeURIComponent(`${title} chapter ${chapter}`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div className="flex flex-col gap-2.5">
            <Label className={cn('text-xs flex items-center gap-2', title ? 'text-white' : 'text-gray-400')}>
                <Book className={'size-4'}/>
                Title
            </Label>
            <div className="flex flex-row gap-1.5">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                {title ? (
                    <>
                        <div className="relative">
                            <Button onClick={handleCopyName} variant="outline" size="icon" className='transition-all duration-300 ease-in-out hover:cursor-pointer'>
                                { isCopied ? <ClipboardCheck /> : <ClipboardCopy /> }
                            </Button>
                            {isCopied && (
                                <Tooltip2>Copied</Tooltip2>
                            )}
                        </div>
                        <Button onClick={handleSearch} variant="outline" size="icon" className='transition-all duration-300 ease-in-out hover:cursor-pointer'>
                            <Search />
                        </Button>
                    </>
                ) : (
                    <Button onClick={handlePasteName} variant="outline" size="icon">
                        <Clipboard />
                    </Button>
                )}
                
            </div>

            <div className="flex flex-row gap-1.5">
                <div className="flex flex-col gap-2.5 w-full">
                    <Label className={cn('text-xs flex items-center gap-2', type ? 'text-white' : 'text-gray-400')}>
                        <BookOpen className='size-4'/>
                        Type
                    </Label>
                    <Select onValueChange={setType} value={type}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                            <SelectGroup>
                                <SelectItem value="Manga">Manga</SelectItem>
                                <SelectItem value="Manhwa">Manhwa</SelectItem>
                                <SelectItem value="Manhua">Manhua</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="flex flex-col gap-2.5 w-full">
                    <Label className={cn('text-xs flex items-center gap-2', chapter ? 'text-white' : 'text-gray-400')}>
                        <BookOpen className='size-4'/>
                        Chapter
                    </Label>
                    <Input type="number" placeholder="Chapter" value={chapter} onChange={(e) => setChapter(e.target.value)}/>
                </div>
            </div>

            <Label className={cn('text-xs flex items-center gap-2', rating ? 'text-white' : 'text-gray-400')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn('size-4 mb-0.5', ratingColorMap[rating])}>
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                Rating
            </Label>
            <Select onValueChange={setRating} value={rating}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <SelectGroup>
                        <SelectItem value="Good">
                            <Star className="size-4 mr-2 text-yellow-400" /> Good
                        </SelectItem>
                        <SelectItem value="Mid">
                            <Star className="size-4 mr-2 text-orange-400" /> Mid
                        </SelectItem>
                        <SelectItem value="Bad">
                            <Star className="size-4 mr-2 text-red-500" /> Bad
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Label className={cn('text-xs flex items-center gap-2', status ? 'text-white' : 'text-gray-400')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={cn(`bi bi-circle-fill`, statusColorMap[status])} viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                Status
            </Label>
            <RadioGroup defaultValue="Ongoing" onValueChange={setStatus} value={status} className="grid grid-cols-2 gap-1.5">
                <Label htmlFor="r1" className="flex items-center gap-3 p-2.5 border rounded-md cursor-pointer bg-[#1a2231] border-gray-300 dark:border-gray-700 transition-colors">
                    <div className='rounded-full has-[[data-state=checked]]:bg-blue-600'>
                        <RadioGroupItem value="Ongoing" id="r1" />
                    </div>
                    Ongoing
                </Label>
                
                <Label htmlFor="r2" className="flex items-center gap-3 p-2.5 border rounded-md cursor-pointer bg-[#1a2231] border-gray-300 dark:border-gray-700 transition-colors">
                    <div className='rounded-full has-[[data-state=checked]]:bg-green-600'>
                        <RadioGroupItem value="Completed" id="r2" />
                    </div>
                    Completed
                </Label>
                
                <Label htmlFor="r3" className="flex items-center gap-3 p-2.5 border rounded-md cursor-pointer bg-[#1a2231] border-gray-300 dark:border-gray-700 transition-colors">
                    <div className='rounded-full has-[[data-state=checked]]:bg-yellow-600'>
                        <RadioGroupItem value="On Hold" id="r3" />
                    </div>
                    On Hold
                </Label>

                <Label htmlFor="r5" className="flex items-center gap-3 p-2.5 border rounded-md cursor-pointer bg-[#1a2231] border-gray-300 dark:border-gray-700 transition-colors">
                    <div className='rounded-full has-[[data-state=checked]]:bg-purple-600'>
                        <RadioGroupItem value="Plan to Read" id="r5" />
                    </div>
                    Plan to Read
                </Label>

                <Label htmlFor="r4" className="flex items-center gap-3 p-2.5 border rounded-md cursor-pointer bg-[#1a2231] border-gray-300 dark:border-gray-700 transition-colors">
                    <div className='rounded-full has-[[data-state=checked]]:bg-red-600'>
                        <RadioGroupItem value="Dropped" id="r4" />
                    </div>
                    Dropped
                </Label> 
            </RadioGroup>
        </div>
    )
}

export default ComicForm