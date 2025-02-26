"use client"

import { LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../global/FormInputs/TextInputForm'
import SubmitButton from '../global/FormInputs/SubmitButton'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { sendPasswordResetToken } from '@/actions/users'

type ForgotPasswordFormProps = {
    email: string;
}

const ForgotPasswordForm = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [emailErr, setEmailErr] = useState<string | null>("");
    const router = useRouter()

    const { 
        handleSubmit, 
        register, 
        reset, 
        formState:{errors} 
    } = useForm<ForgotPasswordFormProps>()

    const handleForgotPassword = async (data: ForgotPasswordFormProps) => {

        console.log(data);
        // Send reset password link to user's email
        try {
            const res = await sendPasswordResetToken(data.email)
            if (res.status === '429') {
                toast.error("Too many password reset attempts. Please try again in 30 minutes.");
                setIsLoading(false);
                setEmailErr(res.error);
                return;
            } else if (res.status === '200') {
                toast.success("Reset password link has been sent to your email");
                setIsLoading(false);
                router.push('/verify-token');
                return;
            }
            
        } catch (error) {
            console.error("Failed to send password reset link:", error);
            // Display error message
            toast.error("Failed to send password reset link");
        }
    }

  return (

    <div className='dark:bg-blue-950'>
        <div className='w-full py-5 lg:px-8 px-6'>
            <div className='py-4'>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight">
                    Forgot your Password ?
                </h2>
                <p className='text-center'>No worries, we will send you reset password instruction.</p>
            </div>
            <div className="">
            <form className="space-y-3" onSubmit={handleSubmit(handleForgotPassword)}>
               <div>
                    <TextInput
                        register={register}
                        errors={errors}
                        label='Email Address'
                        name='email'
                        icon={Mail}
                    />
                    {emailErr && <span className='text-red-500 text-xs' >{emailErr}</span>}
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