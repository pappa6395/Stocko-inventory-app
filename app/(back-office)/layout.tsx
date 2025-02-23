import { getUserById } from '@/actions/users'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import { authOptions } from '@/config/authOptions'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async({children}: {children: ReactNode}) => {

  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login?returnUrl=/dashboard')
  }

  const userId = session?.user.id || "";
  const userById = (await getUserById(userId))?.data as User
  

  return (

    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar user={userById}/>
        <div className='py-8 px-4 max-w-6xl mx-auto w-full my-4'>
        {children}
        </div>
      </div>
    </div>
  )
}

export default Layout