"use client"

import { LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
InputOTP,
InputOTPGroup,
InputOTPSeparator,
InputOTPSlot,
} from "@/components/ui/input-otp"
import SubmitButton from '../global/FormInputs/SubmitButton'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { verifyResetToken } from '@/actions/users'
  


const VerifyAccountForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [dbError, setDbError] = useState<string | null>("");
    console.log(code);
    const router = useRouter()
    const params = useSearchParams()
    const userId = params.get('id')
    const returnUrl = params.get('returnUrl') || '/'

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const resetToken = Number(code)
        console.log("UserId", userId);
        
        if (!userId) {
            toast.error("Invalid user ID");
            return;
        }
        try {
            const user = await verifyResetToken(userId, resetToken)
            console.log("User data", user);
            if (user.status === "200") {
                setIsLoading(false);
                toast.success("Token verified successfully");
                router.push(`/change-password?id=${user.data?.id}&roleId=${user.data?.roleId}&email=${user.data?.email}`)
                setCode("")
            } else {
                setDbError(user.error);
                setIsLoading(false);
                return;
            }
            
            
        } catch (err) {
            console.error("Failed to verify account:", err);
            // Display error message
            toast.error("Failed to verify account");
            setIsLoading(false);
        }
 
    }


  return (

    <div className='dark:bg-blue-950'>
        <div className='w-full py-5 lg:px-8 px-6 flex flex-col justify-center items-center'>
            <div className='p-2 px-10'>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight">
                    Enter your token
                </h2>
                <p className='text-center'>No worries, we will send you reset password instruction.</p>
            </div>
            <div className="">
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="token" className="block text-sm/6 font-medium">
                        Token
                        </label>
                        <div className="mt-2">
                            <InputOTP 
                                maxLength={6} 
                                value={code} 
                                onChange={(n) => setCode(n)}
                                >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className='dark:border-gray-400' />
                                    <InputOTPSlot index={1} className='dark:border-gray-400' />
                                    <InputOTPSlot index={2} className='dark:border-gray-400' />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} className='dark:border-gray-400' />
                                    <InputOTPSlot index={4} className='dark:border-gray-400' />
                                    <InputOTPSlot index={5} className='dark:border-gray-400' />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        {dbError && <span className='text-red-500 text-xs'>{dbError}</span>}
                    </div>
                    <div className='w-full pt-10'>
                    <SubmitButton 
                        title='Reset Password'
                        loading={isLoading}
                        loadingTitle={isLoading ? 'Loading...' : 'Reset Password'}
                        className='w-full text-md'
                        buttonIcon={LogIn}
                        variant={'shop'}
                    />
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default VerifyAccountForm