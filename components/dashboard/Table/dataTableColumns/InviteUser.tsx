import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import React from 'react'

// We do not use this, just an idea
const InviteUser = ({user}: {user: User}) => {

    const sendInvitation = () => {
        const data = {
            loginPage: "http://localhost:3000/login",
            email: user.email,
            firstName: user.firstName
        };
        console.log("Data sent:", data);
        
    }

  return (

    <Button 
        size={"sm"} 
        variant={"secondary"} 
        onClick={sendInvitation}
        className='text-slate-600 font-medium'
    >
        Invite User
    </Button>

  )
}

export default InviteUser