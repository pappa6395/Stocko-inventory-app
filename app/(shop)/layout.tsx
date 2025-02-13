import { getPopulatedMainCategories } from '@/actions/main-categories'
import { getUserById } from '@/actions/users'
import { CategoryHeader } from '@/components/frontend/CategoryHeader'
import CategoryHeaderMobile from '@/components/frontend/CategoryHeaderMobile'
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

  const mainCategories = await getPopulatedMainCategories() || []

  return (
    <div className=''>
      <ShopHeader user={userById} />
      <div className='hidden sm:block sm:container max-w-6xl mx-auto py-4'>
       {mainCategories && mainCategories.length > 0 && (
         <CategoryHeader mainCategories={mainCategories ?? []} />
       )}
      </div>
      <div className='sm:hidden block sm:container max-w-6xl mx-auto'>
          <CategoryHeaderMobile mainCategories={mainCategories ?? []} />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default layout