import React, { useState } from 'react'
import { ReadItem } from '@/lib/types';
import { formatDistanceToNow } from '@/lib/utils';
import { Book, BookOpen, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ratingColorMap: { [key: string]: string } = {
  "Good": "bg-yellow-500 hover:bg-yellow-600",
  "Mid": "bg-orange-500 hover:bg-orange-600",
  "Bad": "bg-red-600 hover:bg-red-700",
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
    const [type , setType] = useState("");
    const [rating, setRating] = useState("");
    const [status, setStatus] = useState("");
    const [chapter, setChapter] = useState("");

    const handleEdit = () => {
        setEdit(!isEdit);
    }

    const getLastReadDate = () => {
        if (data?.lastRead) {
        return `${formatDistanceToNow(data.lastRead)} (${data.lastRead})`;
        }
        return 'N/A';
    }

    return (
        <div className="flex-none flex-col w-75 h-full">
            {/* Cover */}
            <img src={data?.imageUrl} alt={`Cover for ${data?.title}`} className='overflow-hidden rounded-lg mb-3'/>
            
            {/* Info */}
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${typeColorMap[data.type] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <Book className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Select onValueChange={setType} value={data?.type}>
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
                                <h1 className='text-sm font-semibold'>{data?.type}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${ratingColorMap[data.rating] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <Star className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Select onValueChange={setRating} value={data?.rating}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a rating" />
                                </SelectTrigger>
                                <SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                    <SelectGroup>
                                        <SelectItem value="Good"> Good </SelectItem>
                                        <SelectItem value="Mid"> Mid </SelectItem>
                                        <SelectItem value="Bad"> Bad </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Rating</h2>
                                <h1 className='text-sm font-semibold'>{data?.rating}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className={`p-2 rounded-md ${statusColorMap[data.status] || 'dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                        <Calendar className='size-5'/>
                    </div>
                    <div className='w-full'>
                        {isEdit ? (
                            <Select onValueChange={setStatus} value={data?.status}>
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
                                <h1 className='text-sm font-semibold'>{data?.status}</h1>
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
                            <Input type='number' placeholder='Chapter' value={data?.chapter} onChange={(e) => setChapter(e.target.value)}/>
                        ) : (
                            <>
                                <h2 className='text-[10px] text-gray-400 font-semibold'>Chapter</h2>
                                <h1 className='text-sm font-semibold'>{data?.chapter}</h1>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-row gap-1.5'>
                    <div className='p-2 dark:bg-violet-600 dark:hover:bg-violet-700 rounded-md'>
                        <BookOpen className='size-5'/>
                    </div>
                    <div>
                        <h2 className='text-[10px] text-gray-400 font-semibold'>Last data</h2>
                        <h1 className='text-sm font-semibold'>{getLastReadDate()}</h1>
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