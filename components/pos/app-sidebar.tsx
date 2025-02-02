"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from "lucide-react"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/pos/nav-projects"
import { NavUser } from "./nav-user"
  
const data = {
    user: {
      name: "Pap Nontachai",
      email: "pap@example.com",
      avatar: "/myProfilePic.JPG",
    },
    teams: [
      {
        name: "Stocko Online",
        logo: "/StockOnline.png",
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: "/next.svg",
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: "/StockOnline.png",
        plan: "Free",
      },
    ],
  }

  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    )
  }
  