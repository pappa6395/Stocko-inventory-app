"use client"

import React from 'react'
import Logo from './Logo'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@prisma/client'
import { generateInitial } from '@/lib/generateInitial'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import HelpMenu from '../frontend/HelpMenu'

import { MobileMenu } from '../frontend/MobileMenu'
import { CartMenu } from '../frontend/CartMenu'
import SearchBar from '../frontend/SearchBar'
import ModernSearchBar from '../frontend/modernSearchBar'
import { SearchProduct } from '@/type/types'

const ShopHeader = ({
    user,
    products
}: {
    user: User | undefined | null;
    products: SearchProduct[]
}) => {

    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            localStorage.clear();
            document.cookie = "";

            router.push("/login");
            toast.success("Signed out successfully");
        } catch (err) {
            console.error("Failed to sign out:", err);
            return;
        }
        
    }

  return (
    <header className='py-3 px-8'>
        <div className='sm:container max-w-6xl sm:pb-3 border-b dark:border-none'>
            {/* Desktop Version */}
            <nav className='hidden sm:flex items-center justify-between gap-6'>
                <Link href={"/"} className="flex items-center gap-2 flex-shrink-0">
                    <Logo
                        classNameFrame='size-12'
                        classNameLogo='size-10'
                        classNameText='text-xl' 
                    />
                </Link>
               <div className='flex-1'>
                <ModernSearchBar products={products} />
               </div>
                <div>
                    <HelpMenu />
                </div>  
                <div className="flex gap-1">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant={"outline"} 
                                    size={"icon"} 
                                    className='rounded-full'>
                                    <Avatar>
                                        <AvatarImage 
                                            src={user?.profileImage ?? "/profile.svg"} 
                                            alt="profile" 
                                            className='pt-1.5 size-8 object-cover rounded-full 
                                            flex-shrink-0 pl-2' 
                                        />
                                        <AvatarFallback>{generateInitial(user?.name ?? "")}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button type="button" variant={"ghost"} size={"lg"} onClick={handleSignOut}>
                                    Log out
                                </Button>
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button  asChild type="button" variant={"ghost"} size={"lg"}>
                            <Link href="/login">
                                Login
                            </Link>
                        </Button>
                    )}
                    
                </div>
                <CartMenu from="header" />
                <ModeToggle />
            </nav>
            {/* Mobile  Version */}
            <nav className="sm:hidden flex items-center justify-between gap-6 w-full">
                <div className="flex items-center gap-4">
                    <MobileMenu />
                    <Link href={"/"} className="">
                    <Logo
                        classNameFrame='size-12'
                        classNameLogo='size-10'
                        classNameText='text-xl' 
                    />
                    </Link>
                </div>
                <CartMenu />
            </nav>
           
        </div>
    </header>
  )
}

export default ShopHeader