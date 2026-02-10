import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SourceEditProps {
    source: string[];
    sourceIcon: string[];
    sourceUrl: string[];
}

const SourceEdit = ({ source, sourceIcon, sourceUrl }: SourceEditProps) => (
    <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
            <div className='flex gap-1 items-center'>
                <DialogTitle>Source</DialogTitle>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                            <Info />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="flex flex-col gap-1 rounded-xl text-sm"
                    >
                        <p className="font-medium">Where to upload source</p>
                        {/* user can upload source in setting */}
                        <p>You can upload more source in the setting page by clicking this link <span><a href="/setting" className='text-blue-500 hover:underline'>Setting</a></span></p>
                    </PopoverContent>
                </Popover>
            </div>
            <DialogDescription>
                Add or Edit your source information here
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 pb-4">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className='relative block bg-gray-600 group'>
                    <AvatarImage src={sourceIcon[0]} />
                    <AvatarFallback className='!rounded-sm'>CN</AvatarFallback>
                </Avatar>
                <InputGroup className='py-[17px]'>
                    <InputGroupInput placeholder='URL' defaultValue={sourceUrl[0]} disabled/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="secondary" size="icon-xs">
                                    <Info />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </PopoverTrigger>
                        <PopoverContent
                            align="end"
                            className="flex flex-col gap-1 rounded-xl text-sm"
                        >
                            <p className="font-medium">What is a source?</p>
                            <p>A source is a place where you can find your comics</p>
                        </PopoverContent>
                    </Popover>
                </InputGroup>

                <Input placeholder='Name' defaultValue={source[0]} disabled/>

                <Button variant="outline" size='icon-lg' className=''>
                    <Trash2 />
                </Button>
                <Button variant="outline" size='icon-lg' className=''>
                    <Plus />
                </Button>
            </div>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="outline">Close</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="button" className='bg-blue-500 hover:bg-blue-600 text-white'>
                    Save Changes
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
)

export default SourceEdit
