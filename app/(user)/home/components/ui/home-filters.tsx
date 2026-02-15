'use client'

import React, { useState } from 'react'
import { CalendarCog, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface NavBarProps {
    section?: 'recent-reads' | 'recommendations';
}

const DropdownHome = ({ section = 'recent-reads' }: NavBarProps) => {
    // --- State ---
    const [dateRange, setDateRange] = useState("Recent");
    const [preset, setPreset] = useState("Recent");
    
    // Custom Years
    const [startYear, setStartYear] = useState("2025");
    const [endYear, setEndYear] = useState("2025");

    // Type
    const [types, setTypes] = useState({
        manga: true,
        manhwa: true,
        manhua: true,
    });

    // Rating
    const [ratings, setRatings] = useState({
        absoluteCinema: true,
        awesome: true,
        great: false,
        good: false,
        regular: false,
        bad: false,
        garbage: false,
    });

    // Helper to count active filters for a badge notification
    const activeFilterCount = [
        dateRange === "Custom",
        !types.manga || !types.manhwa || !types.manhua, // If any type is unchecked
        Object.values(ratings).some(r => r === true) // If any rating is checked (adjust logic as needed)
    ].filter(Boolean).length;

    const handlePresetChange = (val: string) => {
        setPreset(val);
        if (val !== "Custom") {
            setDateRange("Recent");
        } else {
            setDateRange("Custom");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="h-9 border-dashed flex items-center gap-2 px-3"
                >
                    <Filter className="size-4" />
                    <span className="text-sm font-medium">Filters</span>
                    {activeFilterCount > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-1 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {activeFilterCount}
                            </Badge>
                            <Badge variant="secondary" className="hidden rounded-sm px-1 font-normal lg:inline-flex">
                                {activeFilterCount} selected
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] p-0" align="end">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                    <h4 className="font-semibold text-sm">Filter Content</h4>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                        onClick={() => {
                            // Reset logic here
                            setPreset("Recent");
                            setDateRange("Recent");
                            setTypes({ manga: true, manhwa: true, manhua: true });
                        }}
                    >
                        Reset
                    </Button>
                </div>
                <Separator />
                
                <ScrollArea className={cn(`px-4 py-4`, section !== "recent-reads" ? "h-[400px]" : "" )}>
                    <div className="space-y-6">
                        
                        {/* --- Date Section --- */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <CalendarCog className="size-4 text-muted-foreground" />
                                <Label className="font-semibold">Time Period</Label>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {["Recent", "7 Days", "1 Month", "6 Months"].map((period) => (
                                    <Button
                                        key={period}
                                        variant={preset === period ? "default" : "outline"}
                                        size="sm"
                                        className="justify-start text-xs"
                                        onClick={() => handlePresetChange(period)}
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                            
                            {/* Custom Year Range Selection */}
                            {section !== "recent-reads" && (
                                <div>
                                    <Button 
                                        variant={dateRange === "Custom" ? "default" : "outline"} 
                                        size="sm" 
                                        className="w-full text-xs mb-2"
                                        onClick={() => handlePresetChange("Custom")}
                                    >
                                        Custom Year Range
                                    </Button>

                                    {dateRange === "Custom" && (
                                        <div className="flex w-full items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                                            <Select value={startYear} onValueChange={setStartYear}>
                                                <SelectTrigger className="w-full h-8">
                                                    <SelectValue placeholder="From" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["2023", "2024", "2025"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <span className="text-xs text-muted-foreground">to</span>
                                            <Select value={endYear} onValueChange={setEndYear}>
                                                <SelectTrigger className="w-full h-8">
                                                    <SelectValue placeholder="To" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["2023", "2024", "2025"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>


                        {section !== "recent-reads" && (
                            <Separator />
                        )}

                        {section !== "recent-reads" && (
                            <>
                                {/* --- Type Section --- */}
                                <div className="space-y-3">
                                    <Label className="font-semibold">Type</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(types).map(([key, value]) => (
                                            <div 
                                                key={key} 
                                                className={`
                                                    cursor-pointer select-none rounded-md border px-3 py-1 text-xs font-medium transition-colors
                                                    ${value ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground hover:bg-muted"}
                                                `}
                                                onClick={() => setTypes(prev => ({...prev, [key]: !prev[key as keyof typeof types]}))}
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* --- Rating Section --- */}
                                <div className="space-y-3">
                                    <Label className="font-semibold text-blue-500">Rating</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'absoluteCinema', label: 'Absolute Cinema' },
                                            { id: 'awesome', label: 'Awesome' },
                                            { id: 'great', label: 'Great' },
                                            { id: 'good', label: 'Good' },
                                            { id: 'regular', label: 'Regular' },
                                            { id: 'bad', label: 'Bad' },
                                            { id: 'garbage', label: 'Garbage' },
                                        ].map((rate) => (
                                            <div key={rate.id} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={rate.id} 
                                                    checked={ratings[rate.id as keyof typeof ratings]}
                                                    onCheckedChange={(checked) => 
                                                        setRatings(prev => ({...prev, [rate.id]: checked as boolean}))
                                                    }
                                                />
                                                <Label htmlFor={rate.id} className="text-sm font-normal cursor-pointer">
                                                    {rate.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}

export default DropdownHome