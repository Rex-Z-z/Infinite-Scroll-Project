"use client"

import React from 'react'
import { Moon, Sun, Search, User, CircleUserRound, Settings, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

interface NavBarProps {
    page?: 'user' | 'landing';
}

const NavBar = ({ page = 'user' }: NavBarProps) => {
    const { setTheme } = useTheme();
    
    return (
    <nav className={`sticky top-0 z-50 ${page === 'user' ? 'bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700' : ''}`}>
            <div className="flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex">
                    {page === 'user' ? (
                        <>
                            <div className="relative hidden md:block w-lg">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input type="text" placeholder="Search" className="w-full rounded-md border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-10 py-2 text-sm text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring-3 focus:ring-gray-200 focus:dark:ring-gray-700 focus:border-blue-600 focus:dark:border-blue-500 hover:border-gray-400 hover:dark:border-gray-600"/>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-row'>
                            <Button variant="link" className='font-bold' asChild>
                                <a href="#">Home</a>
                            </Button>
                            <Button variant="link" className='font-bold' asChild>
                                <a href="#about">About</a>
                            </Button>
                            <Button variant="link" className='font-bold' asChild>
                                <a href="#projects">Project</a>
                            </Button>
                        </div>
                    )}
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
                    {page === 'user' ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className='size-[34px] hover:cursor-pointer hover:ring-2 ring-blue-500 rounded-sm'>
                                    <AvatarImage src="/pictures/profile-pic.jpg" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuLabel className='text-[12px] text-blue-400 font-bold'>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='hover:cursor-pointer' asChild>
                                    <a href="/profile"> <CircleUserRound className='text-white'/> Profile </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className='text-white'/> Setting
                                </DropdownMenuItem>
                                <DropdownMenuItem className='hover:cursor-pointer' asChild>
                                    <a href="/login"> <LogOut className='text-white'/> Logout </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="outline" size="icon" asChild className='focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 hover:ring-1 hover:ring-blue-400 hover:cursor-pointer'>
                           <a href="/login"><User /></a>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar