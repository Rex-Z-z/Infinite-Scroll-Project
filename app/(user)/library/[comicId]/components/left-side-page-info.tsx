import React, { useEffect, useRef, useState } from 'react'
import { ReadItem } from '@/lib/types';
import { formatDistanceToNow } from '@/lib/utils';
import { Book, BookOpen, Calendar as CalendarIcon, ImagePlus, ArrowLeftRight , Star, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LastReadDatePicker from './lastread-datepicker';
import { Label } from '@/components/ui/label';

const ratingColorMap: { [key: string]: string } = {
    "Absolute Cinema": "bg-blue-400 hover:bg-blue-500",
    "Awesome": "bg-green-700 hover:bg-green-800",
    "Great": "bg-green-600 hover:bg-green-700",
    "Good": "bg-yellow-400 hover:bg-yellow-500",
    "Regular": "bg-orange-400 hover:bg-orange-500",
    "Bad": "bg-red-500 hover:bg-red-600",
    "Garbage": "bg-purple-400 hover:bg-purple-500",
};

const statusColorMap: { [key: string]: string } = {
    "Ongoing": "bg-blue-600 hover:bg-blue-700",
    "Completed": "bg-green-600 hover:bg-green-700",
    "On Hold": "bg-yellow-600 hover:bg-yellow-700",
    "Dropped": "bg-red-600 hover:bg-red-700",
    "Plan to data": "bg-purple-600 hover:bg-purple-700",
};

const typeColorMap: { [key: string]: string } = {
    "Manga": "bg-purple-600 hover:bg-purple-700",
    "Manhwa": "bg-green-600 hover:bg-green-700",
    "Manhua": "bg-orange-600 hover:bg-orange-700",
};

const LeftSidePage = ({ comicId, data }: { comicId: string, data: ReadItem }) => {
    const [isEdit, setEdit] = useState(false);
    const [chapter, setChapter] = useState("");
    const [rating, setRating] = useState("");
    const [type , setType] = useState("");
    const [status, setStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(data?.lastRead ? new Date(data.lastRead) : undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setChapter(String(data?.chapter || ""));
        setRating(data?.rating || "");
        setType(data?.type || "");
        setStatus(data?.status || "");
        
        if (data?.lastRead) {
            setDate(new Date(data.lastRead));
        }
    }, [data]);

    useEffect(() => {
        setDate(data?.lastRead ? new Date(data.lastRead) : undefined);
    }, [data]);
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleEdit = () => {
        setEdit(!isEdit);
    }

    const handleSwitch = () => {
        setIsModalOpen(true);
    };

    const getLastReadDate = () => {
        if (data?.lastRead) {
            return `${formatDistanceToNow(data.lastRead)} (${data.lastRead})`;
        }
        return 'N/A';
    }

    return (
        <div className="flex-none flex-col w-75 h-full">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Comic Cover</DialogTitle>
                        <DialogDescription>
                            Select a cover image for your comic
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className='flex h-60 items-center justify-center bg-gray-700 hover:bg-gray-800 rounded-md shadow-lg'>
                                <Image size={25} className='text-gray-500' />
                            </div>
                        ))}
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                        <Button variant="default" className='text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Upload</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            {/* Cover */}
            <div className='relative block w-full h-99 aspect-[2/3] rounded-md overflow-hidden mb-3 group'>
                {data.imageUrl? (
                    <img src={data?.imageUrl} alt={`Cover for ${data?.title}`} className='absolute h-full w-full object-cover hover:scale-110 transition-all duration-500 ease-in-out'/>
                ) : (
                    <>
                        <input type="file" ref={fileInputRef} className="hidden" />
                        <Button onClick={handleUploadClick} variant="outline" className='relative flex w-full h-99 aspect-[2/3] items-center justify-center group mb-3 hover:text-gray-400'>
                            <ImagePlus className='size-18 text-gray-600 group-hover:scale-130 transition-all duration-300 ease-in-out' />
                        </Button>
                    </>
                )}
                <Button onClick={handleSwitch} variant="outline" size="icon" className="absolute size-8 top-2 left-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:cursor-pointer">
                    <ArrowLeftRight  />
                </Button>
            </div>
            
            {/* Info */}
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${typeColorMap[type] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <Book className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
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
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Type</h2>
                                <h1 className='text-sm font-semibold'>{data?.type || 'N/A'}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${ratingColorMap[rating] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <Star className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Select onValueChange={setRating} value={rating}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a rating" />
                                </SelectTrigger>
                                <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                    <SelectGroup>
                                        <SelectItem value="Absolute Cinema"> Absolute Cinema </SelectItem>
                                        <SelectItem value="Awesome"> Awesome </SelectItem>
                                        <SelectItem value="Great"> Great </SelectItem>
                                        <SelectItem value="Good"> Good </SelectItem>
                                        <SelectItem value="Regular"> Regular </SelectItem>
                                        <SelectItem value="Bad"> Bad </SelectItem>
                                        <SelectItem value="Garbage"> Garbage </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Rating</h2>
                                <h1 className='text-sm font-semibold'>{data?.rating || 'N/A'}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${statusColorMap[status] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <CalendarIcon className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Select onValueChange={setStatus} value={status}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a rating" />
                                </SelectTrigger>
                                <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                    <SelectGroup>
                                        <SelectItem value="Ongoing"> Ongoing </SelectItem>
                                        <SelectItem value="Completed"> Completed </SelectItem>
                                        <SelectItem value="On Hold"> On Hold </SelectItem>
                                        <SelectItem value="Plan to data"> Plan to data </SelectItem>
                                        <SelectItem value="Dropped"> Dropped </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Status</h2>
                                <h1 className='text-sm font-semibold'>{data?.status || 'N/A'}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className='p-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md'>
                        <Book className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Input type='number' placeholder='Chapter' value={chapter} onChange={(e) => setChapter(e.target.value)}/>
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Chapter</h2>
                                <h1 className='text-sm font-semibold'>{data?.chapter || 'N/A'}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className='p-2 dark:bg-violet-600 dark:hover:bg-violet-700 rounded-md'>
                        <BookOpen className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <LastReadDatePicker date={date} setDate={setDate} />
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Last read</h2>
                                <h1 className='text-sm font-semibold'>{getLastReadDate()}</h1>
                            </>
                        )}
                    </div>
                </div>

                {isEdit ? (
                    <div className='w-full grid grid-cols-2 gap-1.5'>
                        <Button onClick={handleEdit} className='w-full text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Save</Button>
                        <Button onClick={handleEdit} variant="outline" className='w-full hover:cursor-pointer'>Cancel</Button>
                    </div>
                ) : (
                    <Button onClick={handleEdit} className='w-full text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Edit</Button>
                )}
            </div>
        </div>
    )
}

export default LeftSidePage