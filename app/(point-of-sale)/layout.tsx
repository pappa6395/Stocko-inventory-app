import { getUserById } from '@/actions/users'
//import { AppSidebar } from '@/components/pos/app-sidebar'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/pos/Sidebar'

//import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { authOptions } from '@/config/authOptions'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

const Layout = async({children}: {children: ReactNode}) => {

  const session = await getServerSession(authOptions)
  const userId = session?.user.id || "";
  const userById = (await getUserById(userId))?.data as User

  return (

    // <SidebarProvider defaultOpen={false}>
    //   <AppSidebar />
    //   <SidebarInset>
    //     <div className="w-full flex flex-1 flex-col pt-0">
    //     <Navbar user={userById}/>
    //       {children}
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar session={session} />
      <div className="flex flex-col sm:py-4 sm:pl-14">
        <Navbar user={userById} />
        <main className="">{children}</main>
      </div>
    </div>
    
  )
}

export default Layout