
import CheckoutPage from '@/components/frontend/checkout/CheckoutPage'
import { authOptions } from '@/config/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/login?returnUrl=/checkout')
    }
    

  return (

    <div className='sm:container'>
        <CheckoutPage session={session} />
    </div>

  )
}

export default page