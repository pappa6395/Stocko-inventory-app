import VerifyAccountForm from '@/components/frontend/VerifyAccountForm'
import React from 'react'

const page = () => {

  return (

    <section>
        <div className='md:container px-4 md:px-0 mt-auto mb-auto'>
            <div className="grid grid-cols-1
            max-w-md mx-auto border my-3 shadow-xl rounded-md">
                <VerifyAccountForm />
            </div>
        </div>
    </section>
    
  )
}

export default page