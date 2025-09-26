"use client"

import React from 'react'
import { Moon, Sun, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavBar = () => {
    const { setTheme } = useTheme();
    
    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between mx-auto p-3">
                    <a href="/user/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div className="flex">
                        <Input type="text" placeholder="Search" className='hidden md:block border-2 dark:focus:border-blue-500'/>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="md:hidden border-2 dark:focus:border-blue-500 hover:cursor-pointer">
                            <Search />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className='focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer'>
                                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 hover:cursor-pointer" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 hover:cursor-pointer" />
                                    <span className="sr-only hover:cursor-pointer">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Avatar className='size-[34px] hover:cursor-pointer hover:ring-2 ring-blue-500 rounded-sm'>
                            <AvatarImage src="/pictures/profile-pic.jpg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
