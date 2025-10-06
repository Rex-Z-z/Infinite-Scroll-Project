import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, BookOpen, Star, Upload } from 'lucide-react';
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


const AddNewModal = () => {
    const [title, setTitle] = useState("");
    const [chapters, setChapters] = useState("");
    const [rating, setRating] = useState("");
    const [type , setType] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const ratingColorMap: { [key: string]: string } = {
        "Good": "text-yellow-400",
        "Mid": "text-orange-400",
        "Bad": "text-red-500",
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

    return (
        <DialogContent>
            <div className='flex flex-row gap-3'>
                <div className="relative block w-36 h-52 flex-shrink-0 group">
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*"/>
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Cover Preview" className="h-full w-full object-cover rounded-md" />
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button  variant="default" onClick={handleUploadClick} className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 ease-in-out text-xs px-2 py-1 dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
                                    <Upload className="size-3.5" /> Update
                                </Button>
                            </div>
                        </>
                    ) : (

                        <div className="h-full w-full bg-gray-800 rounded-md flex items-center justify-center">
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
                            Add a new comic to your collection.
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

                <div className="flex flex-row gap-2.5">
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
                        <Label className={cn('text-xs flex items-center gap-2', chapters ? 'text-white' : 'text-gray-400')}>
                            <BookOpen className='size-4'/>
                            Chapters
                        </Label>
                        <Input type="number" placeholder="Chapters" value={chapters} onChange={(e) => setChapters(e.target.value)}/>
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

                
            </div>

            <DialogFooter className='mt-4'>
                <DialogClose className='w-full'>
                    <Button variant="outline" className='w-full'>Cancel</Button>
                </DialogClose>
                <DialogClose className='w-full'>
                    <Button className='w-full text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'>Submit</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default AddNewModal;