"use client"

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ChevronDown, ChevronRight, Menu, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { ModeToggle } from '../global/mode-toggle'
import AvatarMenu from './Menu/AvatarMenu'
import QuickAccessMenu from './Menu/QuickAccessMenu'
import { sidebarLinks } from '@/config/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '../global/Logo'

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleToggleMenuMobile = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <header className="flex h-14 items-center gap-4 border-b 
    bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild onClick={handleToggleMenuMobile}>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetTitle>
            <Logo 
              classNameLogo='size-4' 
              classNameFrame='size-8' 
              classNameText='text-base' 
            />
          </SheetTitle>
          <nav className="grid gap-2 text-lg font-medium">
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
          <div className="mt-auto">
            <Button size="sm" className="w-full">
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <QuickAccessMenu />
      <ModeToggle />
      <AvatarMenu />
    </header>

  )
}

export default Navbar