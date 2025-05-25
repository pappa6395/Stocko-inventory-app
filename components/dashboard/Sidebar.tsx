"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell, ChevronDown, ChevronRight, ExternalLink, Plus } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '../global/Logo'
import { sidebarLinks } from '@/config/sidebar'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Session } from 'next-auth'
import { filterLinks } from '@/lib/filterLinks'
import { Notification } from '@prisma/client'
import { NotificationMenu } from '../frontend/NotificationMenu'

const Sidebar = ({
  session,
  notifications
}: {
  session: Session;
  notifications: Notification[];
}) => {

  // const filterSidebarLinks = (
  //   links: ISidebarLink[],
  //   permissions: Record<string, boolean>
  // ): ISidebarLink[] => {
  //   return links.filter((link) => {
  //     if (link.dropdown) {
  //       link.dropdownMenu = link.dropdownMenu?.filter(
  //         (subLink) =>
  //           permissions[`canView${subLink.title.replace(/\s+/g, "")}`]
  //       );
  //       return link?.dropdownMenu?.length > 0;
  //     }
  //     return permissions[`canView${link.title.replace(/\s+/g, "")}`];
  //   });
  // };

  // const rolePermissions = getRolePermissions(session.user.role);
  // console.log(rolePermissions);
  // const filteredLinks = filterSidebarLinks(sidebarLinks, rolePermissions);
  // console.log(filteredLinks);

  const pathname = usePathname();
  const router = useRouter();
  const user = session.user;
  const filteredLinks = filterLinks(sidebarLinks, user);
  //const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  
  // const handleToggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };
  
  const handleSignOut = async () => {
      try {
          const result = await signOut({ redirect: false, callbackUrl: "/login" });
          console.log("Signed out result:", result);
  
          if (typeof window !== "undefined") {
              localStorage.clear(); 
              document.cookie = "";
          }
  
          toast.success("✅ Signed out successfully");
          router.push("/login");
          
      } catch (err) {
          console.error("❌ Failed to sign out:", err);
          toast.error("❌ Failed to sign out. Please try again.");
      }
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block py-2">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-12 items-center justify-between border-b px-4 lg:h-[52px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo 
                classNameLogo='size-8' 
                classNameFrame='size-8' 
                classNameText='text-sm' 
              />
            </Link>
            <NotificationMenu notifications={notifications} />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {filteredLinks.map((link,i) => {
                const Icon = link.icon;
                const isHrefDropdown = link.dropdownMenu?.some(item => item.href === pathname)
                const isOpen = openDropdownIndex === i;
                return (
                  <div key={i}>
                    {link.dropdown ? (
                      <Collapsible>
                        <CollapsibleTrigger
                          onClick={() => setOpenDropdownIndex(isOpen ? null : i)} 
                          className={cn(
                            'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            isHrefDropdown && "bg-muted text-primary"
                          )}
                        >
                          <div className="w-full flex items-center gap-3">
                            <Icon className="h-4 w-4" />
                            {link.label}
                          </div>
                          {isOpen 
                          ? <ChevronDown className='flex size-4 mr-1'/> 
                          : <ChevronRight className='flex size-4 mr-1'/> }
                        </CollapsibleTrigger>
                          <CollapsibleContent className='dark:bg-neutral-950'>
                            {link.dropdownMenu?.map((item,i) => {
                              return (
                                <Link
                                  key={i}
                                  href={item.href || "#"}
                                  className={cn("mx-4 flex items-center justify-between gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary",
                                    pathname === item.href && "bg-muted text-primary"
                                  )}
                                >
                                  {item.label || ""}
                                  <Badge className='rounded-full size-5 px-1' variant={"outline"}>
                                    <Plus className="size-3" />
                                  </Badge>
                                </Link>
                              )
                            })}
                          </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={`${link.href || "#"}`}
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname===link.href && "bg-muted text-primary")}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label || ""}
                      </Link>
                    )}
                  </div>
                )
              })}
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                Live Website
            </Link>
            </nav>
          </div>
          
        </div>
        {/* <div className="p-4">
          <Button type="button" size="sm" className="w-full" onClick={handleSignOut}>
            Logout
          </Button>
        </div> */}
      </div>
  )
}

export default Sidebar