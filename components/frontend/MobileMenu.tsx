import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  BookOpen,
  Brush,
  Camera,
  Car,
  Computer,
  Dumbbell,
  Gamepad2,
  Gem,
  Headphones,
  Headset,
  HelpCircle,
  Home,
  Laptop,
  LogOut,
  Mail,
  Map,
  MessageSquareMore,
  Music,
  PhoneCall,
  Presentation,
  Settings,
  Shapes,
  Shirt,
  ShoppingBag,
  Tv,
  User,
  UserRound,
  Utensils,
  Watch,
  Wine,
} from "lucide-react";

import Link from "next/link";
import Logo from "../global/Logo";
import { ScrollArea } from "../ui/scroll-area";
import HelpMenu from "./HelpMenu";

export function MobileMenu() {
  
    const categoryLinks = [
        { name: "Computer", icon: Computer, href: "/dashboard/pos?cate=computer&limit=20" },
        { name: "Mobile and Tablets", icon: MessageSquareMore, href: "/dashboard/pos?cate=mobile&limit=20" },
        { name: "Laptops", icon: Laptop, href: "/dashboard/pos?cate=laptops&limit=20" },
        { name: "Accessories", icon: Shapes, href: "/dashboard/pos?cate=accessories&limit=20" },
        { name: "Headphones & Audio", icon: Headphones, href: "/dashboard/pos?cate=audio&limit=20" },
        { name: "TV & Home Theater", icon: Tv, href: "/dashboard/pos?cate=tv&limit=20" },
        { name: "Smart Watches", icon: Watch, href: "/dashboard/pos?cate=smart-watches&limit=20" },
        { name: "Cameras & Photography", icon: Camera, href: "/dashboard/pos?cate=cameras&limit=20" },
        { name: "Fashion & Clothing", icon: ShoppingBag, href: "/dashboard/pos?cate=fashion&limit=20" },
        { name: "Men's Wear", icon: Shirt, href: "/dashboard/pos?cate=mens-wear&limit=20" },
        { name: "Jewelry & Watches", icon: Gem, href: "/dashboard/pos?cate=jewelry&limit=20" },
        { name: "Home Appliances", icon: Home, href: "/dashboard/pos?cate=home-appliances&limit=20" },
        { name: "Kitchen & Dining", icon: Utensils, href: "/dashboard/pos?cate=kitchen&limit=20" },
        { name: "Food & Beverages", icon: Wine, href: "/dashboard/pos?cate=food&limit=20" },
        { name: "Automotive", icon: Car, href: "/dashboard/pos?cate=automotive&limit=20" },
        { name: "Sports & Fitness", icon: Dumbbell, href: "/dashboard/pos?cate=sports&limit=20" },
        { name: "Books & Stationery", icon: BookOpen, href: "/dashboard/pos?cate=books&limit=20" },
        { name: "Gaming & Consoles", icon: Gamepad2, href: "/dashboard/pos?cate=gaming&limit=20" },
        { name: "Music & Instruments", icon: Music, href: "/dashboard/pos?cate=music&limit=20" },
        { name: "Beauty & Personal Care", icon: Brush, href: "/dashboard/pos?cate=beauty&limit=20" },
      ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <AlignJustify className="w-6 h-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[350px]">
        <SheetHeader>
            <Logo
                classNameFrame='size-12 ml-3'
                classNameLogo='size-10'
                classNameText='text-xl' 
            />
            <SheetTitle className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
                {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </SheetTitle>
        </SheetHeader>
        {/* CONTENT HWRE */}
        <ScrollArea className="h-[500px] w-full rounded-md">
            <div className="">
                <div className="flex justify-between border-b pb-2 pt-2">
                    <Button asChild variant={"ghost"} className="w-full">
                        <Link href={"/login"}>
                            <Map />
                            <div>
                                <span>Track Orders</span>
                                <p className="text-muted-foreground text-xs">View order status</p>
                            </div>
                        </Link>
                    </Button>
                    <HelpMenu />
                </div>
                <div className="py-6">
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                   Category
                    </h2>
                    <div className="grid grid-cols-1 py-3">
                    {categoryLinks.map((item, i) => {
                        const Icon = item.icon;
                        return (
                        <Button
                            className="col-span-full justify-start"
                            key={i}
                            size={"lg"}
                            asChild
                            variant={"ghost"}
                        >
                            <Link href={item.href}>
                            <Icon className="h-4 w-4 mr-2" />
                            <span>{item.name}</span>
                            </Link>
                        </Button>
                        );
                    })}
                    </div>
                </div>
                <div className="flex justify-between pb-2 mx-2 gap-2">
                    <Button asChild variant={"outline"} className="w-full">
                        <Link href={"/login"}>
                            Login
                        </Link>
                    </Button>
                    <Button asChild variant={"outline"}className="w-full">
                        <Link href={"/register"}>
                            Sign Up
                        </Link>
                    </Button>
                </div>
            </div>
        </ScrollArea>
        
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
