import React from 'react'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar' //
import { SettingSidebar } from './components/setting-sidebar'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SidebarProvider>
        <SettingSidebar />
        <SidebarInset>
          <SidebarTrigger className="mt-2 ml-2" />
          <div className="p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
