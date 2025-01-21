"use client"

import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const ForgotPasswordForm = () => {


  return (

    <div>
        <div className='w-full py-5 lg:px-8 px-6'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Forgot your Password ?
                </h2>
                <p className='text-center'>No worries, we will send you reset password instruction.</p>
            </div>
            <div className="">
            <form className="space-y-3">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                       Email Address
                    </label>
                    <div className="mt-2 relative">
                        <div className='absolute flex items-center 
                        inset-y-0 left-0 pl-3 pointer-events-none'>
                            <Mail className='text-slate-300 size-4' />
                        </div>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 
                        text-base text-gray-900 outline outline-1 -outline-offset-1 
                        outline-gray-300 placeholder:text-gray-400 focus:outline 
                        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                        sm:text-sm/6 ps-8"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
                Remeber your Password?{' '}
                <Link 
                    href="/login" 
                    className="font-semibold text-indigo-600 
                    hover:text-indigo-500"
                >
                    Login
                </Link>
            </p>
            </div>
        </div>
    </div>

  )
}

export default ForgotPasswordForm