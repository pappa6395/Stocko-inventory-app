
import { PageProps } from '@/.next/types/app/(shop)/(auth)/login/page'
import LoginForm from '@/components/frontend/LoginForm'
import { IdCard } from 'lucide-react'
import React from 'react'


const page = async ({searchParams: searchParamsPromise}: PageProps) => {

    const { userId, roleId, email } = await searchParamsPromise

    console.log("ID:", userId);
    

  return (

    <section>
        <div className='md:container px-4 md:px-0'>
            <div className="mx-auto border max-w-md my-3 shadow-xl rounded-md">
                <LoginForm roleId={roleId} email={email} userId={userId} />
            </div>
        </div>
    </section>
    
  )
}

export default page