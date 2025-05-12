"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { generateInitial } from "@/lib/generateInitial"
import { User } from "@prisma/client"
import { Headset, LogOut, Mail, MessageSquareMore, PhoneCall, Presentation, Settings, Users } from "lucide-react"
import { signOut } from "next-auth/react"

import Link from "next/link"
import { useRouter } from "next/navigation"
  import React, { useEffect } from 'react'
import toast from "react-hot-toast"
  
const AvatarMenu = ({user}: {user: User}) => {

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
    const menuLinks = [
        {
            name: "Settings",
            icon: Settings,
            href: "/dashboard/settings"
        },
        {
            name: "Profile",
            icon: Users,
            href: "/dashboard/profile"
        },
        {
            name: "POS",
            icon: Presentation,
            href: "/dashboard/pos"
        },
    ]
    const assistedLinks = [
        {
            name: "Free 2 hours set-up assistance",
            icon: Headset,
            href: "/dashboard/settings"
        },
        {
            name: "Chat with our experts",
            icon: MessageSquareMore,
            href: "/dashboard/profile"
        },
        {
            name: "Send an email",
            icon: Mail,
            href: "/dashboard/pos"
        },
        {
            name: "Talk to us - 123 456 7890",
            icon: PhoneCall,
            href: "/dashboard/profile"
        },
    ]

    return (

    <Sheet>
        <SheetTrigger>
            <Avatar className="size-9">
                <AvatarImage 
                    src={user?.profileImage ?? "/profile.svg" } 
                    alt="profile"
                    className="size-8 object-contain aspect-auto"
                />
                <AvatarFallback>{generateInitial(user?.name ?? "")}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    <div>
                        <div className="flex gap-2 items-center border-b pb-2">
                            <Avatar className="size-9">
                                <AvatarImage src={user?.profileImage ?? "/profile.svg" } alt="profile" className="object-cover"/>
                                <AvatarFallback>{generateInitial(user?.name ?? "")}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span>{user?.name ?? ""}</span>
                                <span className="block text-sm text-muted-foreground">
                                    {user?.email?? ""}
                                </span>
                            </div>
                        </div>
                        <div className="pt-2 flex justify-between px-2">
                            <Button asChild variant={"outline"} size={"sm"}>
                                <Link href={"#"} >
                                    <Settings />
                                    Manage Account
                                </Link>
                            </Button>
                            <Button 
                                type="button" 
                                variant={"outline"} 
                                size={"sm"} 
                                onClick={handleSignOut}
                            >
                                <LogOut />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </SheetTitle>
            <SheetDescription className="border-b border-t pt-2 pb-2">
                    <span className="text-xs text-muted-foreground">
                        Login Date: {new Date().toLocaleDateString()}{' '}
                        {new Date().toLocaleTimeString()}
                    </span>
            </SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-3 pt-4 py-6">
                {menuLinks.map((link,i) => {
                    const Icon = link.icon;
                    return (
                        <Link key={i} href={link.href} className="ml-3">
                            <div className="space-y-2">
                                <Icon className="size-10 text-primary" />
                                <span className="block text-sm">{link.name}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div>
                <h2 className="scroll-m-20 text-lg text-primary font-semibold tracking-tight">Need Assisted Services ?</h2>
                <div className="py-4 flex flex-col items-start">
                    {assistedLinks.map((link,i) => {
                        const Icon = link.icon;
                        return (
                            <Button asChild key={i} variant={"ghost"} size={"sm"}>
                                <Link href={link.href}>
                                    <Icon className="size-4 text-primary" />
                                    <span className="text-sm">{link.name}</span>
                                </Link>
                            </Button>
                        )
                    })}
                </div>
            </div>
            <SheetFooter>
            <Button type="button" variant={"outline"} size={"sm"} onClick={handleSignOut}>
                <LogOut />
                <span>Log out</span>
            </Button>
        </SheetFooter>
        </SheetContent>
    </Sheet>      

    )
}
  
export default AvatarMenu