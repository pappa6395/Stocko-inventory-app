import { getUserById } from '@/actions/users'
import { AppSidebar } from '@/components/pos/app-sidebar'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { authOptions } from '@/config/authOptions'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

const Layout = async({children}: {children: ReactNode}) => {

  const session = await getServerSession(authOptions)
  const userId = session?.user.id || "";
  const userById = (await getUserById(userId))?.data as User

  return (

    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full flex flex-1 flex-col pt-0">
        <Navbar user={userById}/>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    
  )
}

export default Layout