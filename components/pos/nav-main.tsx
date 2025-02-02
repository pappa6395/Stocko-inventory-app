"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { sidebarLinks } from "@/config/sidebar"
import Link from "next/link"

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {sidebarLinks.map((item,index) => {
          const Icon =item.icon;
          return (
            <Collapsible
            key={index}
            asChild
            defaultOpen={item.dropdown}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.label} >
                    <Link href={item?.href || ""}>
                      <Icon className="size-4 text-primary"/>
                    </Link>
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.dropdownMenu?.map((subItem, j) => (
                    <SidebarMenuSubItem key={j}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.href}>
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
