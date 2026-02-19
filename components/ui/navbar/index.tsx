'use client'

import React from 'react'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BookOpen,
  CircleUserRound,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import SearchBar from '../search-bar'

interface NavBarProps {
  page?: 'user' | 'landing' | 'library'
}

const NavBar = ({ page = 'user' }: NavBarProps) => {
  const { setTheme } = useTheme()
  const pathname = usePathname()

  const isLibraryPage = pathname === '/library'

  return (
    <nav
      className={`sticky top-0 z-50 ${page === 'user' ? 'bg-card shadow-sm' : ''}`}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between p-3">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={48}
            height={48}
            alt="Flowbite Logo"
            className="h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12"
          />
          <span className="hidden self-center text-2xl font-semibold whitespace-nowrap lg:block dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex">
          {page === 'user' ? (
            <SearchBar className="hidden md:block" />
          ) : (
            <div className="flex flex-row">
              <Button variant="link" className="font-bold" asChild>
                <a href="#">Home</a>
              </Button>
              <Button variant="link" className="font-bold" asChild>
                <a href="#about">About</a>
              </Button>
              <Button variant="link" className="font-bold" asChild>
                <a href="#projects">Project</a>
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-1 md:gap-2">
          <SearchBar className="mb-[1px] block md:hidden" />

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "size-6 md:size-9 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4",
              isLibraryPage ? 'pointer-events-none opacity-50' : ''
            )}
            asChild
          >
            <a href="/library">
              {' '}
              <BookOpen />{' '}
            </a>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-6 hover:cursor-pointer md:size-9 [&_svg:not([class*='size-'])]:size-2.5 md:[&_svg:not([class*='size-'])]:size-4"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all hover:cursor-pointer dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all hover:cursor-pointer dark:scale-100 dark:rotate-0" />
                <span className="sr-only hover:cursor-pointer">
                  Toggle theme
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {page === 'user' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-[23px] rounded-sm hover:cursor-pointer md:size-[35px]">
                  <AvatarImage src="/pictures/profile-pic.jpg" />
                  <AvatarFallback className="size-[23px] rounded-sm hover:cursor-pointer md:size-[35px]">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel className="text-primary font-bold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <a href="/setting">
                    {' '}
                    <CircleUserRound className="" /> Profile{' '}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/setting">
                    {' '}
                    <Settings /> Setting{' '}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="hover:cursor-pointer"
                  asChild
                >
                  <a href="/login">
                    {' '}
                    <LogOut /> Logout{' '}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hover:cursor-pointer"
            >
              <Link href="/login">
                <User />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
