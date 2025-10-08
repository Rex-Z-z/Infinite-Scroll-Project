import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ReadItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, BookOpen, Star, Upload, Clipboard } from 'lucide-react';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const AddNewModal = ({ comicData }: { comicData: ReadItem | null }) => {
    const [title, setTitle] = useState("");
    const [chapter, setChapter] = useState("");
    const [rating, setRating] = useState("");
    const [type , setType] = useState("");
    const [status, setStatus] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (comicData) {
            setTitle(comicData.title);
            setChapter(comicData.chapter);
            setRating(comicData.rating);
            setType(comicData.type);
            setStatus(comicData.status);
            setImagePreview(comicData.imageUrl);
        } else {
            // Reset fields when there is no comicData (for "Add New")
            setTitle('');
            setChapter('');
            setRating('');
            setType('');
            setStatus('');
            setImagePreview(null);
        }
    }, [comicData]);

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handlePaste = async () => {
        try {
            const clipboardItems = await navigator.clipboard.read();
            for (const item of clipboardItems) {
                if (item.types.some(type => type.startsWith('image/'))) {
                    const blob = await item.getType(item.types.find(type => type.startsWith('image/'))!);
                    setImagePreview(URL.createObjectURL(blob));
                    break;
                }
            }
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
        }
    };

    return (
        <DialogContent>
            <div className='flex flex-row gap-3'>
                <div className="relative block w-36 h-52 flex-shrink-0 group">
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*"/>
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Cover Preview" className="h-full w-full object-cover rounded-md" />
                            
                            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
                                <Button  variant="default" onClick={handleUploadClick} className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 ease-in-out text-xs px-2 py-1 dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
                                    <Upload className="size-3.5" /> Update
                                </Button>
                            </div>
                        </>
                    ) : (

                        <div className="h-full w-full bg-[#1a2231] border border-gray-700 rounded-md flex flex-col gap-2 items-center justify-center">
                            <Button variant="outline" onClick={handleUploadClick} className="flex items-center gap-2">
                                <Upload className="size-4" />
                                Upload
                            </Button>
                        </div>
                    )}
                </div>
                
                <div className='flex flex-col gap-4 w-full'>
                    <DialogHeader>
                        <DialogTitle>Add New Comic</DialogTitle>
                        <DialogDescription className='font-semibold'>
                            {comicData ? "Edit the details of your comic." : "Add a new comic to your collection."}
                            <Button variant="outline" onClick={handlePaste} className="flex items-center gap-2 mt-2 text-xs p-1">
                                <Clipboard className="size-3.5" />
                                Paste
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </div>
            
            <div className="flex flex-col gap-2.5">
                <Label className={cn('text-xs flex items-center gap-2', title ? 'text-white' : 'text-gray-400')}>
                    <Book className={'size-4'}/>
                    Title
                </Label>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

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

            <DialogFooter className='mt-4'>
                <DialogClose asChild>
                    <Button variant="outline" className='w-1/2 hover:cursor-pointer'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className='w-1/2 text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Submit</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default AddNewModal;