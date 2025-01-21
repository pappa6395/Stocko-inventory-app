"use client"

import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button';


const ChangePasswordForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isPassword, setIsPassword] = useState("");
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (

    <div>
        <div className='lg:w-[90%] w-full py-5 px-8'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Change Password
                </h2>
                <p className='text-center'>Fill in details to change password.</p>
            </div>
            <div className="">
            <form className="space-y-3">
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        New Password
                        </label>
                    </div>
                    <div className="mt-2 relative">
                        <div className='absolute flex items-center 
                        inset-y-0 left-0 pl-3 pointer-events-none'>
                            <Lock className='text-slate-300 size-4' />
                        </div>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setIsPassword(e.target.value)}
                            value={isPassword}
                            className="block w-full rounded-md bg-white px-3 
                            py-1.5 text-base text-gray-900 outline outline-1 
                            -outline-offset-1 outline-gray-300 ps-8
                            placeholder:text-gray-400 focus:outline focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 
                            sm:text-sm/6"
                        />
                        <Button
                            type="button" 
                            variant={"ghost"}
                            onClick={handleTogglePasswordVisibility} 
                            className='absolute flex items-center 
                        inset-y-0 right-0 pr-3'>
                            {showPassword 
                            ? <EyeOff className='text-slate-300 size-4' /> 
                            : <Eye className='text-slate-300 size-4' />}
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Confirm Password
                        </label>
                    </div>
                    <div className="mt-2 relative">
                        <div className='absolute flex items-center 
                        inset-y-0 left-0 pl-3 pointer-events-none'>
                            <Lock className='text-slate-300 size-4' />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setIsPassword(e.target.value)}
                            value={isPassword}
                            className="block w-full rounded-md bg-white px-3 
                            py-1.5 text-base text-gray-900 outline outline-1 
                            -outline-offset-1 outline-gray-300 ps-8
                            placeholder:text-gray-400 focus:outline focus:outline-2 
                            focus:-outline-offset-2 focus:outline-indigo-600 
                            sm:text-sm/6"
                        />
                        <Button
                            type="button" 
                            variant={"ghost"}
                            onClick={handleTogglePasswordVisibility} 
                            className='absolute flex items-center 
                        inset-y-0 right-0 pr-3'>
                            {showPassword 
                            ? <EyeOff className='text-slate-300 size-4' /> 
                            : <Eye className='text-slate-300 size-4' />}
                        </Button>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not Registered?{' '}
                <Link 
                    href="/register" 
                    className="font-semibold text-indigo-600 
                    hover:text-indigo-500"
                >
                    Create an Account
                </Link>
            </p>
            </div>
        </div>
    </div>

  )
}

export default ChangePasswordForm