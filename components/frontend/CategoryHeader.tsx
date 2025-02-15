"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"


type SubCategories = {
    title: string;
    slug: string;
}

type Categories = {
    title: string;
    slug: string;
    subCategories: SubCategories[]
}

// const mainCategories: MainCategoryMegaMenuProps[] = [
//   {
//     title: "Computer and Accessories",
//     slug: "computer-and-accessories",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
//   {
//     title: "Phones and Tablets",
//     slug: "phones-and-tablets",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
//   {
//     title: "Electronics",
//     slug: "electronics",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
//   {
//     title: "Fashion",
//     slug: "fashion",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
//   {
//     title: "Home and Kitchen",
//     slug: "home-and-kitchen",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
//   {
//     title: "Games and Toys",
//     slug: "games-and-toys",
//     categories: [
//         {
//             title: "Laptops",
//             slug: "laptops",
//             subCategories: [
//                 {
//                     title: "Notebooks",
//                     slug: "notebooks",
//                 }
//             ]
//         },
//         {
//             title: "Desktop and Monitors",
//             slug: "desktop-and-monitors",
//             subCategories: [
//                 {
//                     title: "Monitors",
//                     slug: "monitors",
//                 }
//             ]
//         },
//     ]
//   },
// ]

export function CategoryHeader({
    mainCategories
}: {
    mainCategories: { title: string; slug: string; categories: Categories[];}[];
}) {


  return (
    <NavigationMenu>
        <ScrollArea>
            <NavigationMenuList className="sm:w-[640px] md:w-[940px] lg:w-full">
                {mainCategories.map((m, i) => {
                    return (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger>
                                <Link href={`/categories/${m.slug}?type=main`}>
                                    {m.title}
                                </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-full">
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[800px] ">
                                {m.categories.map((c, j) => (
                                    <div key={j}>
                                        <li>
                                            <Link href={`/categories/${c.slug}?type=cate`}>
                                                <span className="font-bold text-base">{c.title}</span>
                                            </Link>
                                        </li>
                                        {c.subCategories.map((s, k) => (
                                        <li key={k}>
                                            <Link href={`/categories/${s.slug}?type=sub`}>
                                                <span className="hover:text-blue-500 text-sm">{s.title}</span>
                                            </Link>
                                        </li>
                                        ))}
                                    </div>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </NavigationMenu>
  )
}