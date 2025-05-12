import { PageProps } from '@/.next/types/app/(shop)/(auth)/change-password/page'
import ChangePasswordForm from '@/components/frontend/ChangePasswordForm'
import React from 'react'

const page = async ({searchParams: searchParamsPromise}: PageProps) => {
  const { id, roleId, email } = await searchParamsPromise
  
  console.log("ID:", id);
  
  
  return (

    <section>
        <div className='md:container px-4 md:px-0'>
            <div className="grid grid-cols-1
            max-w-md mx-auto border my-3 shadow-xl rounded-md">
                <ChangePasswordForm userId={id} roleId={roleId} email={email} />
            </div>
        </div>
    </section>
    
  )
}

export default page