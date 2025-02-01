import { getUserById } from '@/actions/users'
import Footer from '@/components/global/footer'
import ShopHeader from '@/components/global/ShopHeader'
import { authOptions } from '@/config/authOptions'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id || "";
  const userById = (await getUserById(userId))?.data as User

  return (
    <div className=''>
      <div className=''>
        <ShopHeader user={userById} />
      </div>
      {children}
       <Footer />
    </div>
  )
}

export default layout