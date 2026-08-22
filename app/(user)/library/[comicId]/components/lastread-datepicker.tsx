import { ChangeEvent, ChangeEventHandler, useState } from 'react'

import dynamic from 'next/dynamic'

import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { DropdownNavProps, DropdownProps } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const Calendar = dynamic(
  () => import('@/components/ui/calendar').then((mod) => mod.Calendar),
  {
    loading: () => (
      <div>
        <Skeleton className="h-72 w-62" />
      </div>
    ),
    ssr: false,
  }
)

interface LastReadDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

const LastReadDatePicker = ({ date, setDate }: LastReadDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date())
  const [open, setOpen] = useState(false)

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    // setOpen(false); // Uncomment if you want it to close immediately on click
  }

  const handleCalendarChange = (
    _value: string | number,
    _e: ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as ChangeEvent<HTMLSelectElement>
    _e(_event)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'h-9.5 w-full justify-start px-3 text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          <div className="p-3">
            <Calendar
              captionLayout="dropdown"
              classNames={{
                month_caption: 'mx-0',
              }}
              components={{
                Dropdown: (props: DropdownProps) => {
                  return (
                    <Select
                      onValueChange={(value) => {
                        if (props.onChange && value !== null) {
                          handleCalendarChange(value, props.onChange)
                        }
                      }}
                      value={String(props.value)}
                    >
                      <SelectTrigger className="first:grow">
                        <SelectValue>
                          {
                            props.options?.find(
                              (option) => option.value === props.value
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {props.options?.map((option) => (
                          <SelectItem
                            disabled={option.disabled}
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                },
                DropdownNav: (props: DropdownNavProps) => {
                  return (
                    <div className="flex w-full items-center gap-2">
                      {props.children}
                    </div>
                  )
                },
              }}
              defaultMonth={new Date()}
              hideNavigation
              mode="single"
              onSelect={handleDateSelect}
              selected={date}
              startMonth={new Date(1980, 6)}
            />
          </div>
          <div className="border-border bg-muted/20 flex w-full flex-col gap-2 border-t p-3 sm:w-auto sm:border-t-0 sm:border-l">
            <span className="text-muted-foreground mb-1 text-xs font-medium">
              Quick Select
            </span>
            {[
              { label: 'Today', value: 0 },
              { label: 'Yesterday', value: -1 },
              { label: 'Last week', value: -7 },
              { label: 'Last month', value: -30 },
              { label: 'Last 3 months', value: -90 },
              { label: 'Last year', value: -365 },
            ].map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                className="h-7 w-full justify-start text-xs"
                onClick={() => {
                  const newDate = addDays(new Date(), preset.value)
                  setDate(newDate)
                  setCurrentMonth(newDate)
                  setOpen(false)
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
