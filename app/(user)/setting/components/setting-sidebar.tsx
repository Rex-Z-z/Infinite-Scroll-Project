import { User2, KeyRound, NotebookText, MonitorCog } from "lucide-react"
import { UserIcon, KeyIcon, Storage, AdjustmentsHorizontal } from "@/components/icons/custom-icons"
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
} from "@/components/ui/sidebar"

const data = {
    navMain: [
        {
            title: "Settings",
            url: "#",
            items: [
                {   
                    icons: UserIcon,
                    title: "Account",
                    url: "#",
                    isActive: false
                },
                {
                    icons:  KeyIcon,
                    title: "Password",
                    url: "#",
                    isActive: false
                },
                {
                    icons: Storage,
                    title: "Sources",
                    url: "#",
                    isActive: true
                },
                {
                    icons: AdjustmentsHorizontal,
                    title: "Preferences",
                    url: "#",
                    isActive: false
                },
            ],
        }
    ],
}

export function SettingSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props} className="top-[65px] h-[calc(100vh-58px)]">
            <SidebarContent>
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton size="md" isActive={item.isActive} asChild className="data-[active=true]:text-blue-500 data-[active=true]:bg-blue-900/50">
                                            <a href={item.url} >
                                                <item.icons isFill={item.isActive} className="mr-2 h-5 w-5" />
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