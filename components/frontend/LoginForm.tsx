"use client"

import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import TextInput from '../global/FormInputs/TextInputForm';
import SubmitButton from '../global/FormInputs/SubmitButton';
import { LoginProps } from '@/type/types';
import LoginPasswordInput from '../global/FormInputs/LoginPasswordInput';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const { 
        handleSubmit, 
        register, 
        reset, 
        formState:{errors} 
    } = useForm<LoginProps>()

    const handleLogin = async (data: LoginProps) => {
        //setIsLoading(true);
        console.log(data);
        
        try {
            setIsLoading(true);
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
              router.push("/dashboard");
            }
          } catch (error) {
            setIsLoading(false);
            console.error("Network Error:", error);
            toast.error("Its seems something is wrong with your Network");
          }
    }

  return (

    <div>
        <div className='w-full py-5 px-8'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-slate-50">
                    Login to your Account
                </h2>
                <p className='text-center'>Welcome back!, fill in details to login</p>
            </div>
            <div className="">
            <form className="space-y-3" onSubmit={handleSubmit(handleLogin)}>
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
                    {/* <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
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
                    </div> */}
                    {/* <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                            </label>
                            <div className="text-sm">
                                <Link 
                                    href="/forgot-password" 
                                    className="font-semibold text-indigo-600 
                                    hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <div className='absolute flex items-center 
                            inset-y-0 left-0 pl-3 pointer-events-none'>
                                <Lock className='text-slate-300 size-4' />
                            </div>
                            <input
                                id="password"
                                name="password"
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
                    </div> */}
                <div className='w-full'>
                    <SubmitButton 
                        title='Sign in'
                        loading={isLoading}
                        loadingTitle={isLoading ? 'Loading...' : 'Sign in'}
                        className='w-full bg-indigo-500 text-md'
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