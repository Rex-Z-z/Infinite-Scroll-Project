'use client'

import { useEffect, useRef, useState } from 'react'

import {
  AdjustmentsHorizontal,
  KeyIcon,
  Storage,
  UserIcon,
} from '@/components/icons/custom-icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const navItems = [
  {
    title: 'Settings',
    items: [
      {
        icons: UserIcon,
        title: 'Account',
        url: '#account',
        id: 'account',
      },
      {
        icons: KeyIcon,
        title: 'Password',
        url: '#password',
        id: 'password',
      },
      {
        icons: Storage,
        title: 'Sources',
        url: '#sources',
        id: 'sources',
      },
      {
        icons: AdjustmentsHorizontal,
        title: 'Preferences',
        url: '#preferences',
        id: 'preferences',
      },
    ],
  },
]

export function SettingSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [activeId, setActiveId] = useState('account')
  const isManualScrolling = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isManualScrolling.current) return
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        // Root margin controls "when" the intersection triggers.
        // "-20% 0px -80% 0px" means: Trigger when the element is in the top 20% of the viewport
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
      }
    )

    // Observe all sections defined in our navItems
    navItems.forEach((group) => {
      group.items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) observer.observe(element)
      })
    })

    return () => observer.disconnect()
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    isManualScrolling.current = true
    setActiveId(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        isManualScrolling.current = false
      }, 1000)
    }
  }

  return (
    <Sidebar {...props} className="top-[65px] h-[calc(100vh-58px)]">
      <SidebarContent>
        {navItems.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      size="md"
                      isActive={activeId === item.id}
                      className="data-[active=true]:text-primary"
                      asChild
                    >
                      <a
                        href={item.url}
                        onClick={(e) => handleScroll(e, item.id)}
                      >
                        <item.icons
                          isFill={activeId === item.id}
                          className="mr-2 h-5 w-5"
                        />
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
