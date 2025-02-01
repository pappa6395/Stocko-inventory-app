import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { generateInitial } from "@/lib/generateInitial"
import { User } from "@prisma/client"
  import React from 'react'
  
  const AvatarMenu = ({user}: {user: User}) => {

    return (

    <Sheet>
        <SheetTrigger>
            <Avatar className="size-9">
                <AvatarImage src={user?.profileImage ?? "/profile.svg" } alt="profile"/>
                <AvatarFallback>{generateInitial(user?.name ?? "")}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>{user?.name ?? ""}</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>      

    )
  }
  
  export default AvatarMenu