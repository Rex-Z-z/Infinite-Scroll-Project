import React, { useState } from 'react'
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface LastReadDatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

const LastReadDatePicker = ({ date, setDate }: LastReadDatePickerProps) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date());
    const [open, setOpen] = useState(false);

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        // setOpen(false); // Uncomment if you want it to close immediately on click
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal h-9 px-3",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col sm:flex-row sm:flex-wrap">
                    <div className="p-3">
                        <Calendar
                            mode="single"
                            captionLayout='dropdown'
                            selected={date}
                            onSelect={handleDateSelect}
                            month={currentMonth}
                            onMonthChange={setCurrentMonth}
                            fixedWeeks
                            className="p-0"
                        />
                    </div>
                    <div className="flex flex-col gap-2 p-3 border-t sm:border-l sm:border-t-0 border-border bg-muted/20 w-full sm:w-auto">
                        <span className="text-xs font-medium text-muted-foreground mb-1">Quick Select</span>
                        {[
                            { label: "Today", value: 0 },
                            { label: "Yesterday", value: -1 },
                            { label: "Last week", value: -7 },
                            { label: "Last month", value: -30 },
                            { label: "Last 3 months", value: -90 },
                            { label: "Last year", value: -365 },
                        ].map((preset) => (
                            <Button
                                key={preset.value}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs h-7"
                                onClick={() => {
                                    const newDate = addDays(new Date(), preset.value);
                                    setDate(newDate);
                                    setCurrentMonth(newDate);
                                    setOpen(false);
                                }}
                            >
                                {preset.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default LastReadDatePicker