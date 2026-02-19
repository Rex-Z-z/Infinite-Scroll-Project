'use client'

import React from 'react'
import {
  Moon,
  Sun,
  User,
  CircleUserRound,
  Settings,
  LogOut,
  BookOpen,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="hidden self-center text-2xl font-semibold whitespace-nowrap lg:block dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex">
          {page === 'user' ? (
            <SearchBar />
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={isLibraryPage ? 'pointer-events-none opacity-50' : ''}
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
                className="hover:cursor-pointer"
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
                <Avatar className="size-[34px] rounded-sm hover:cursor-pointer">
                  <AvatarImage src="/pictures/profile-pic.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
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
              <a href="/login">
                <User />
              </a>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
