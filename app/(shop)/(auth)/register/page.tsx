import RegisterForm from '@/components/frontend/RegisterForm'
import React from 'react'


const page = () => {

  return (

    <section>
        <div className='md:container px-4 md:px-0'>
            <div className="grid grid-cols-1 lg:grid-cols-2
            max-w-4xl mx-auto border my-3 shadow-xl rounded-md">
                <RegisterForm />
                <div className='bg-blue-600 h-full text-center hidden lg:block'>
                    <p>Connect with every application</p>
                    <p className='text-xs text-gray-300'>
                        Everything you need is customizable on the dashboard
                    </p>
                </div>  
            </div>
        </div>
    </section>

  )
}

export default page