import RegisterForm from '@/components/frontend/RegisterForm'
import React from 'react'


const page = () => {

  return (

    <section>
        <div className='md:container px-4 md:px-0'>
            <div className="max-w-md mx-auto border my-3 shadow-xl rounded-md">
                <RegisterForm />
            </div>
        </div>
    </section>

  )
}

export default page