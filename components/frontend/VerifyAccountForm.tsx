"use client"

import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
InputOTP,
InputOTPGroup,
InputOTPSeparator,
InputOTPSlot,
} from "@/components/ui/input-otp"
  


const VerifyAccountForm = () => {


  return (

    <div>
        <div className='w-full py-5 lg:px-8 px-6 flex flex-col justify-center items-center'>
            <div className='p-2 px-10'>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Enter your token
                </h2>
                <p className='text-center'>No worries, we will send you reset password instruction.</p>
            </div>
            <div className="">
                <form className="space-y-3">
                    <div>
                        <label htmlFor="token" className="block text-sm/6 font-medium text-gray-900">
                        Token
                        </label>
                        <div className="mt-2">
                            <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Verify Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default VerifyAccountForm