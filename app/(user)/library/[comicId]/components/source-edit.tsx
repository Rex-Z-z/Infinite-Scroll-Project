import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Mock "Backend" Data: Global List of Available Sources ---
// In a real app, you would fetch this from your API or pass it as a prop.
const AVAILABLE_SOURCES = [
    { name: "Asura Scans", icon: "/icons/asura-icon.png", url: "https://asuratoon.com" },
    { name: "Webtoon", icon: "/icons/webtoon-icon.png", url: "https://webtoons.com" },
    { name: "Flame Scans", icon: "/icons/flame-icon.png", url: "https://flamecomics.com" },
];

interface SourceEditProps {
    source: string[];
    sourceIcon: string[];
    sourceUrl: string[];
    onSave?: (source: string[], sourceIcon: string[], sourceUrl: string[]) => void;
}

interface SourceItem {
    name: string;
    icon: string;
    url: string;
}

const SourceEdit = ({ source = [], sourceIcon = [], sourceUrl = [], onSave }: SourceEditProps) => {
    const [linkedSources, setLinkedSources] = useState<SourceItem[]>([]);
    const [selectedSourceToAdd, setSelectedSourceToAdd] = useState<string>("");

    useEffect(() => {
        const initialItems = source.map((name, index) => ({
            name: name,
            icon: sourceIcon[index] || '',
            url: sourceUrl[index] || ''
        }));
        setLinkedSources(initialItems);
    }, [source, sourceIcon, sourceUrl]);

    const handleRemoveSource = (index: number) => {
        setLinkedSources(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddSource = () => {
        if (!selectedSourceToAdd) return;

        const sourceData = AVAILABLE_SOURCES.find(s => s.name === selectedSourceToAdd);
        if (sourceData) {
            if (!linkedSources.some(s => s.name === sourceData.name)) {
                setLinkedSources([...linkedSources, sourceData]);
            }
        }
        setSelectedSourceToAdd(""); // Reset dropdown
    };

    const handleSave = () => {
        const newSources = linkedSources.map(i => i.name);
        const newIcons = linkedSources.map(i => i.icon);
        const newUrls = linkedSources.map(i => i.url);
        
        if (onSave) {
            onSave(newSources, newIcons, newUrls);
        }
    };

    // Filter out sources that are already linked so they don't appear in the dropdown
    const availableOptions = AVAILABLE_SOURCES.filter(
        s => !linkedSources.some(linked => linked.name === s.name)
    );

    return (
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
                <div className='flex gap-1 items-center'>
                    <DialogTitle>Source</DialogTitle>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon-xs">
                                <Info className="w-4 h-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="flex flex-col gap-1 rounded-xl text-sm">
                            <p className="font-medium">Managing Sources</p>
                            <p>Here you can link existing sources to this comic. To edit source details (like URL or Icon), please visit the <a href="/setting" className='text-blue-500 hover:underline'>Settings</a> page.</p>
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogDescription>
                    Manage the sources linked to this comic.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
                {/* List of Linked Sources */}
                {linkedSources.map((item, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center animate-in fade-in slide-in-from-top-1">
                        {/* Icon (Read-only) */}
                        <Avatar className='relative block bg-gray-600 w-10 h-10'>
                            <AvatarImage src={item.icon} />
                            <AvatarFallback className='!rounded-sm text-xs'>IMG</AvatarFallback>
                        </Avatar>

                        {/* URL (Read-only) */}
                        <InputGroup className='py-[17px] flex-1'>
                            <InputGroupInput 
                                placeholder='URL' 
                                defaultValue={item.url} 
                                disabled 
                                className="text-gray-500 bg-gray-50/50 dark:bg-gray-900/50"
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton variant="secondary" size="icon-xs" disabled>
                                            <Info className="w-4 h-4"/>
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="text-sm">
                                    <p>Source URL is managed in Settings.</p>
                                </PopoverContent>
                            </Popover>
                        </InputGroup>

                        {/* Name (Read-only) */}
                        <Input 
                            placeholder='Name' 
                            defaultValue={item.name} 
                            disabled
                            className="w-1/4 text-gray-500 bg-gray-50/50 dark:bg-gray-900/50"
                        />

                        {/* Remove Button */}
                        <Button 
                            variant="outline" 
                            size='icon' 
                            onClick={() => handleRemoveSource(index)} 
                            className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 border-red-200 dark:border-red-900"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                {/* Add New Source Section */}
                <div className="flex gap-2 items-center pt-4 border-t">
                    <Select value={selectedSourceToAdd} onValueChange={setSelectedSourceToAdd}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a source to add..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {availableOptions.length > 0 ? (
                                    availableOptions.map((source) => (
                                        <SelectItem key={source.name} value={source.name}>
                                            <div className="flex items-center gap-2">
                                                <img src={source.icon} alt="" className="w-4 h-4 rounded-full" />
                                                <span>{source.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-center text-gray-500">No more sources available</div>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    
                    <Button 
                        variant="outline" 
                        onClick={handleAddSource} 
                        disabled={!selectedSourceToAdd}
                        className="shrink-0"
                    >
                        <Plus className="mr-2 w-4 h-4" /> Add Source
                    </Button>
                </div>
            </div>

            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" className='bg-blue-500 hover:bg-blue-600 text-white' onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default SourceEdit