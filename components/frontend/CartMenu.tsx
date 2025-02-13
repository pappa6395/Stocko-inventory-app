"use client"

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
import { Headset, HelpCircle, LogOut, Mail, MessageSquareMore, Minus, PhoneCall, Plus, Presentation, Settings, ShoppingCart, Trash, Users } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from 'next/image'
import Link from "next/link"
import { useRouter } from "next/navigation"
  import React from 'react'
import toast from "react-hot-toast"
  
const CartMenu = () => {

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
        <SheetTrigger className="relative inline-flex items-center p-3 
        text-sm font-medium text-center text-white bg-transparent rounded-lg "
        >
            <ShoppingCart className="text-lime-700 dark:text-lime-500" />
            <span className="sr-only">Cart</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 
            text-xs font-bold text-white bg-red-500  rounded-full -top-0 end-6 
            dark:border-gray-900"
            >
                0
            </div>
        </SheetTrigger>
        <SheetContent>
        <SheetHeader className="w-[400px] sm:w-[540px]">
          <SheetTitle className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
                Shopping Cart (2)
          </SheetTitle>
        </SheetHeader>
            {/* CONTENT HWRE */}
        <div className="">
            <div className="flex justify-between gap-4 py-3 border-b ">
                <Image
                width={200}
                height={200}
                alt="cart image"
                src="/macbook4 Small.jpeg"
                className="w-16 h-16 rounded-lg"
                />
                <div className="space-y-2">
                <h2 className="text-xs font-medium">
                    Best Nice laptop i have seen
                </h2>
                <button className="text-xs flex items-center text-red-500">
                    <Trash className="w-4 h-4 mr-1" />
                    <span>Remove</span>
                </button>
                </div>
                <div className="space-y-2">
                <h2 className="text-sx">$199.00</h2>
                <div className="flex items-center space-x-3">
                    <button className="border shadow rounded flex items-center justify-center w-10 h-7">
                    <Minus className="w-4 h-4" />
                    </button>

                    <p>1</p>
                    <button className="border shadow rounded flex items-center justify-center w-10 h-7 bg-slate-800 text-white">
                    <Plus className="w-4 h-4" />
                    </button>
                </div>
                </div>
            </div>
            <div className="flex justify-between gap-4 py-3 border-b ">
                <Image
                width={200}
                height={200}
                alt="cart image"
                src="/macbook4 Small.jpeg"
                className="w-16 h-16 rounded-lg"
                />
                <div className="space-y-2">
                <h2 className="text-xs font-medium">
                    Best Nice laptop i have seen
                </h2>
                <button className="text-xs flex items-center text-red-500">
                    <Trash className="w-4 h-4 mr-1" />
                    <span>Remove</span>
                </button>
                </div>
                <div className="space-y-2">
                <h2 className="text-sx">$199.00</h2>
                <div className="flex items-center space-x-3">
                    <button className="border shadow rounded flex items-center justify-center w-10 h-7">
                    <Minus className="w-4 h-4" />
                    </button>

                    <p>1</p>
                    <button className="border shadow rounded flex items-center justify-center w-10 h-7 bg-slate-800 text-white">
                    <Plus className="w-4 h-4" />
                    </button>
                </div>
                </div>
            </div>
            <div className="space-y-1 py-3 border-b mb-3">
                <div className="flex items-center justify-between text-sm">
                <h2 className="font-medium">Subtotal</h2>
                <p>$1930.00</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                <h2 className="font-medium">Tax</h2>
                <p>$10.00</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                <h2 className="font-medium">Total</h2>
                <p>$1930.00</p>
                </div>
            </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"} type="submit">
              Continue Shopping
            </Button>
          </SheetClose>
          <Button asChild>
            <Link href="/checkout">
              <span>Proceed to Checkout</span>
            </Link>
          </Button>
        </SheetFooter>
        </SheetContent>
    </Sheet>      

    )
}
  
export default CartMenu