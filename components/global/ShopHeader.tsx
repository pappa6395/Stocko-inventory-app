"use client"

import React from 'react'
import Logo from './Logo'
import { Button } from '../ui/button'
import { LayoutGrid, ShoppingBasket } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@prisma/client'
import { generateInitial } from '@/lib/generateInitial'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ShopHeader = ({user}: {user: User | undefined | null}) => {

    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/login")
            toast.success("Signed out successfully")
        } catch (err) {
            console.error("Failed to sign out:", err);
            return;
        }
        
    }

  return (
    <header className='py-3'>
        <div className='container'>
            <div className='flex items-center justify-between gap-2'>
                <div className="flex items-center gap-2">
                    <Logo
                        classNameFrame='size-12'
                        classNameLogo='size-10'
                        classNameText='text-xl' 
                    />
                    <Button variant={"outline"} className='rounded-lg'>
                        <LayoutGrid className='size-4' />
                        <span className='text-xs'>Catalog</span>
                    </Button>
                </div>
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
                    <div className="flex gap-1">
                        <Button 
                            variant={"outline"} 
                            size={"icon"} 
                            className='rounded-full'
                        >
                            <ShoppingBasket className='size-6 rounded-full'/>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant={"outline"} 
                                    size={"icon"} 
                                    className='rounded-full'>
                                    <Avatar>
                                        <AvatarImage src={user?.profileImage ?? "/profile.svg"} alt="profile" className='object-fit rounded' />
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
                        
                    </div>
                <ModeToggle />
            </div>
        </div>
    </header>
  )
}

export default ShopHeader