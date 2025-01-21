import ForgotPasswordForm from '@/components/frontend/ForgotPasswordForm'
import React from 'react'

const page = () => {

  return (

    <section>
        <div className='md:container px-4 md:px-0'>
            <div className="grid grid-cols-1
            max-w-md mx-auto border my-3 shadow-xl rounded-md">
                <ForgotPasswordForm />
            </div>
        </div>
    </section>
    
  )
}

export default page