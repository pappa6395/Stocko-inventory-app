"use client"

import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';
import TextInput from '../global/FormInputs/TextInputForm';
import SubmitButton from '../global/FormInputs/SubmitButton';
import { LoginProps } from '@/type/types';
import LoginPasswordInput from '../global/FormInputs/LoginPasswordInput';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

interface LoginFormProps {
    roleId?: number;
    email?: string;
    userId?: number;
}

const LoginForm = ({roleId, email, userId}: LoginFormProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const params = useSearchParams()
    const returnUrl = params.get('returnUrl') || '/dashboard'

    const { 
        handleSubmit, 
        register, 
        reset, 
        formState:{errors} 
    } = useForm<LoginProps>()

    const handleLogin = async (data: LoginProps) => {
        setIsLoading(true);
        console.log(data);

        if (roleId && email && userId) {
            router.push(`/change-password?userId=${userId}&roleId=${roleId}&email=${email}`)
            setIsLoading(false);
        } else {

            try {
                
                console.log("Attempting to sign in with credentials:", data);
                const loginData = await signIn("credentials", {
                  ...data,
                  redirect: false,
                });
                console.log("SignIn response:", loginData);
                if (loginData?.error) {
                  setIsLoading(false);
                  toast.error("Sign-in error: Check your credentials");
                  
                } else {
                  // Sign-in was successful
                  
                  reset();
                  setIsLoading(false);
                  toast.success("Login Successful");
                  router.push(returnUrl);
                }
              } catch (error) {
                setIsLoading(false);
                console.error("Network Error:", error);
                toast.error("Its seems something is wrong with your Network");
              }
        }
        
    }


  return (

    <div className='dark:bg-blue-950'>
        <div className='w-full py-5 px-8'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-slate-50">
                    Login to your Account
                </h2>
                <p className='text-center'>Welcome back!, fill in details to login</p>
            </div>
            <div className="pt-4">
            <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <TextInput
                        register={register}
                        errors={errors}
                        label='Email Address'
                        name='email'
                        icon={Mail}
                    />
                </div>
                <div className='relative'>
                    <LoginPasswordInput
                        register={register}
                        errors={errors}
                        label='Password'
                        name='password'
                        type={'password'}
                        icon={Lock}
                    />
                    <div className="text-xs text-end pt-1 absolute top-0 right-0">
                        <Link 
                            href="/forgot-password" 
                            className="font-semibold underline text-indigo-600 
                            hover:text-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <div className='w-full pt-10'>
                    <SubmitButton 
                        title='Sign in'
                        loading={isLoading}
                        loadingTitle={isLoading ? 'Loading...' : 'Sign in'}
                        className='w-full text-md'
                        variant='shop'
                        buttonIcon={LogIn}
                    />
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

export default LoginForm