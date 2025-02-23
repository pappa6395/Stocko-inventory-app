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

const ShopHeader = ({user}: {user: User | undefined | null}) => {

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
    <header className='py-3'>
        <div className='container max-w-6xl pb-3 border-b'>
            {/* Desktop Version */}
            <nav className='hidden sm:flex items-center justify-between gap-6'>
                <Link href={"/"} className="flex items-center gap-2">
                    <Logo
                        classNameFrame='size-12'
                        classNameLogo='size-10'
                        classNameText='text-xl' 
                    />
                </Link>
                <div className="flex-1">
                    <input 
                        type="search" 
                        name="search" 
                        id="search" 
                        autoComplete="search"
                        placeholder='Search here...' 
                        required 
                        className="block w-full rounded-md bg-white px-3 
                        py-1.5 text-base text-gray-900 outline outline-1 
                        -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                        focus:outline focus:outline-2 focus:-outline-offset-2 
                        focus:outline-indigo-600 sm:text-sm/6" 
                    />
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
                                        <AvatarImage src={user?.profileImage ?? "/profile.svg"} alt="profile" className='object-cover rounded' />
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
                <CartMenu />
                <ModeToggle />
            </nav>
            {/* Mobile  Version */}
            <nav className="sm:hidden flex items-center justify-between gap-6">
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