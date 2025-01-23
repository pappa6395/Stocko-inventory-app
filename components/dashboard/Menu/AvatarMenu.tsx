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
  import React from 'react'
  
  const AvatarMenu = () => {

    return (

    <Sheet>
        <SheetTrigger>
            <Avatar className="size-9">
                <AvatarImage src="/myProfilePic.JPG" alt="profile"/>
                <AvatarFallback>NP</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
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