import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingSidebar } from "./components/setting-sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className='h-[calc(95vh-2rem)]'>
            <SidebarProvider>
                <SettingSidebar />
                <main>
                    <SidebarTrigger />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}