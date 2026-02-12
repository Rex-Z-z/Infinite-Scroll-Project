"use client"

import React, { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { CirclePlus, Globe, Pen, Pencil, Search, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

const MOCK_SOURCES: Source[] = [
    { id: '1', name: 'Asura Scans', url: 'https://asuratoon.com/', icon: '/icons/asura-icon.png' },
    { id: '2', name: 'Flame Scans', url: 'https://flamecomics.com/', icon: '/icons/flame-icon.png' },
    { id: '3', name: 'Webtoon', url: 'https://www.webtoons.com/' },
    { id: '4', name: 'Reaper Scans', url: 'https://reaperscans.com/' },
    { id: '5', name: 'MangaDex', url: 'https://mangadex.org/' },
]

interface Source {
    id: string
    name: string
    url: string
    icon?: string
}

const SourcesSection = () => {
    const [sources, setSources] = useState<Source[]>(MOCK_SOURCES)
    
    return (
        <div id="sources" className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold'>Comic Sources</h1>

            {/* Toolbar: Search & Add */}
            <div className='flex gap-2 items-center'>
                <InputGroup className='py-4.5 has-[[data-slot=input-group-control]:focus-visible]:border-2 has-[[data-slot=input-group-control]:focus-visible]:border-blue-500'>
                    <InputGroupAddon>
                        <Search className='text-muted-foreground' />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search"/>
                </InputGroup>

                <Button variant="default" className='text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>
                    <CirclePlus />
                    Add Source
                </Button>
            </div>

            <div className='flex flex-col gap-2 border rounded-lg p-3'>
                { sources.map((sources) => (
                    <div className="flex flex-row gap-2 p-3 items-center bg-muted/50 rounded-lg shadow-lg">
                        {/* Icon */}
                        <Avatar className='relative block w-14 h-14 rounded-md fill group'>
                            <AvatarImage src={sources.icon} />
                            <AvatarFallback className="bg-gray-700 rounded-none">
                                <Globe className='w-8 h-8'/>
                            </AvatarFallback>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button variant="ghost" className="w-14 h-14 opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 ease-in-out text-xs px-2 py-1 !hover:bg-none">
                                    <Upload className="size-6" />
                                </Button>
                            </div>
                        </Avatar>

                        {/* URL */}
                        <div className='w-full flex flex-col gap-1.5'>
                            <Label className='text-xs'>URL</Label>
                            <Input
                                placeholder='URL'
                                defaultValue={sources.url}
                                className="bg-gray-50/50 dark:bg-gray-900/50"
                            />
                        </div>

                        {/* Name */}
                        <div className='w-full flex flex-col gap-1.5'>
                            <Label className='text-xs'>Name</Label>
                            <Input
                                placeholder='URL'
                                defaultValue={sources.name}
                                className="bg-gray-50/50 dark:bg-gray-900/50"
                            />
                        </div>

                        {/* Remove Button */}
                        <div className='flex gap-2 mt-5'>
                            <Button
                                variant="outline"
                                size='icon'
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size='icon'
                                className="text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 border-red-200 dark:border-red-900"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SourcesSection