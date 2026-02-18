"use client"

import React, { useState, useRef } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Plus, Globe, Pencil, Search, Trash2, Upload, Check, X, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils' // Ensure you have this utility or use a standard conditional class approach

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
    const [searchQuery, setSearchQuery] = useState('')
    
    // State to track editing and errors
    const [editingId, setEditingId] = useState<string | null>(null)
    const [hasError, setHasError] = useState(false)

    // State for image upload
    const [uploadingId, setUploadingId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const filteredSources = sources.filter(source => 
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.url.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Helper to validate a source
    const validateSource = (id: string): boolean => {
        const sourceToCheck = sources.find(s => s.id === id)
        if (!sourceToCheck) return true
        
        const isValid = sourceToCheck.name.trim().length > 0 && sourceToCheck.url.trim().length > 0
        
        if (!isValid) {
            setHasError(true)
        } else {
            setHasError(false)
        }
        
        return isValid
    }

    const handleAddSource = () => {
        // If we are currently editing, validate before adding a new one
        if (editingId) {
            if (!validateSource(editingId)) {
                return // Stop if current source is invalid
            }
        }

        const newId = Date.now().toString()
        const newSource: Source = {
            id: newId,
            name: '',
            url: '',
            icon: ''
        }
        
        // Reset error state for the new item
        setHasError(false)
        setSources([newSource, ...sources])
        setEditingId(newId)
    }

    const handleRemoveSource = (id: string) => {
        setSources(sources.filter(s => s.id !== id))
        if (editingId === id) {
            setEditingId(null)
            setHasError(false)
        }
    }

    const handleUpdateSource = (id: string, field: keyof Source, value: string) => {
        setSources(sources.map(s => 
            s.id === id ? { ...s, [field]: value } : s
        ))
    }

    const handleSave = (id: string) => {
        if (validateSource(id)) {
            setEditingId(null)
        }
    }

    const handleEdit = (id: string) => {
        if (editingId && editingId !== id) {
            if (!validateSource(editingId)) return
        }
        
        setHasError(false)
        setEditingId(id)
    }

    const handleCancel = (id: string) => {
        setEditingId(null)
        setHasError(false)
    }

    const triggerImageUpload = (id: string) => {
        setUploadingId(id)
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && uploadingId) {
            const reader = new FileReader()
            reader.onloadend = () => {
                handleUpdateSource(uploadingId, 'icon', reader.result as string)
                setUploadingId(null) 
            }
            reader.readAsDataURL(file)
        }
        e.target.value = '' 
    }

    return (
        <div id="sources" className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold'>Comic Sources</h1>

            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* Toolbar */}
            <div className='flex gap-2 items-center'>
                <InputGroup className='py-[17px]'>
                    <InputGroupAddon>
                        <Search className='text-muted-foreground' />
                    </InputGroupAddon>
                    <InputGroupInput 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>

                <Button 
                    variant="default"
                    className='hover:cursor-pointer'
                    onClick={handleAddSource}
                >
                    <Plus />
                    Add Source
                </Button>
            </div>

            {/* List */}
            <div className={cn('flex flex-col gap-2 border rounded-lg p-3 max-h-[400px] min-h-[400px] overflow-y-auto custom-scrollbar', filteredSources.length === 0 && 'items-center justify-center border-dashed')}>
                {filteredSources.length === 0 ? (
                     <div className='flex flex-col gap-2 justify-center text-muted-foreground items-center'>
                        <SearchX className='size-10'/>
                        <div className="text-center justify-center item-center text-muted-foreground">No sources found</div>
                     </div>
                ) : (
                    filteredSources.map((source) => {
                        const isEditing = editingId === source.id;

                        return (
                            <div key={source.id} className="flex flex-row gap-2 p-3 items-center bg-muted/50 rounded-lg shadow-lg">
                                {/* Icon */}
                                <div className="relative group">
                                    <Avatar className='block w-14 h-14 rounded-md'>
                                        <AvatarImage src={source.icon} className="object-cover"/>
                                        <AvatarFallback className="bg-gray-700 rounded-none">
                                            <Globe className='w-8 h-8'/>
                                        </AvatarFallback>
                                    </Avatar>

                                    {isEditing && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md cursor-pointer" onClick={() => triggerImageUpload(source.id)}>
                                            <Upload className="w-6 h-6 text-white opacity-80 hover:opacity-100" />
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <div className='w-full flex flex-col'>
                                    <Label className={cn('text-xs', isEditing && hasError && !source.name.trim() && "text-destructive", isEditing ? "mb-1" : "ml-2")}>
                                        Name
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            placeholder='Source Name'
                                            value={source.name}
                                            onChange={(e) => handleUpdateSource(source.id, 'name', e.target.value)}
                                            className={cn(
                                                "bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-200",
                                                hasError && !source.name.trim() ? "border-destructive focus-visible:ring-destructive/50" : ""
                                            )}
                                        />
                                    ) : (
                                        <div className="flex items-center h-9 px-3 text-md font-medium truncate">
                                            {source.name || 'Unnamed Source'}
                                        </div>
                                    )}
                                </div>

                                {/* URL */}
                                <div className='w-full flex flex-col'>
                                    <Label className={cn('text-xs', isEditing && hasError && !source.url.trim() && "text-destructive", isEditing ? "mb-1" : "ml-2.5")}>
                                        URL
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            placeholder='https://example.com'
                                            value={source.url}
                                            onChange={(e) => handleUpdateSource(source.id, 'url', e.target.value)}
                                            className={cn(
                                                "bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-200",
                                                hasError && !source.url.trim() ? "border-destructive focus-visible:ring-destructive/50" : ""
                                            )}
                                        />
                                    ) : (
                                        <div className="flex items-center h-9 px-3 text-md truncate">
                                            <a 
                                                href={source.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline hover:text-primary/80 truncate"
                                            >
                                                {source.url || 'No URL'}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className='flex gap-2 mt-5'>
                                    {isEditing ? (
                                        <Button
                                            variant="default"
                                            size='icon'
                                            className="hover:cursor-pointer"
                                            onClick={() => handleSave(source.id)}
                                            title="Save"
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size='icon'
                                            onClick={() => handleEdit(source.id)}
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    )}

                                    {isEditing ? (
                                        <Button
                                            variant="outline"
                                            size='icon'
                                            className="hover:cursor-pointer"
                                            onClick={() => handleCancel(source.id)}
                                            title="Cancel"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="destructive"
                                            size='icon'
                                            className="hover:cursor-pointer"
                                            onClick={() => handleRemoveSource(source.id)}
                                            title="Remove"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default SourcesSection