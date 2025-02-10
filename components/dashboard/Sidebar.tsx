"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '../global/Logo'
import { sidebarLinks } from '@/config/sidebar'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
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
          <div className="flex h-12 items-center border-b px-4 lg:h-[52px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo 
                classNameLogo='size-8' 
                classNameFrame='size-8' 
                classNameText='text-sm' 
              />
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarLinks.map((link,i) => {
                const Icon = link.icon;
                const isHrefDropdown = link.dropdownMenu?.some(item => item.href === pathname)
                return (
                  <div key={i}>
                    {link.dropdown ? (
                      <Collapsible>
                        <CollapsibleTrigger
                          onClick={handleToggleMenu} 
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
            </nav>
          </div>
          
        </div>
        <div className="mt-auto p-4">
            <Button type="button" size="sm" className="w-full" onClick={handleSignOut}>
              Logout
            </Button>
          </div>
      </div>
  )
}

export default Sidebar