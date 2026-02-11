import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingSidebar } from "./components/setting-sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div> 
            <SidebarProvider>
                <SettingSidebar />
                <main className="h-[calc(100vh-58px)]">
                    <SidebarTrigger />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}