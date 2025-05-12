"use client"

import { Eye, EyeOff, Lock, LogIn, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { createUserFromLogin } from '@/actions/users'
import TextInput from '../global/FormInputs/TextInputForm'
import toast from 'react-hot-toast'
import PasswordInput from '../global/FormInputs/PasswordInput'
import LoginPasswordInput from '../global/FormInputs/LoginPasswordInput'
import SubmitButton from '../global/FormInputs/SubmitButton'
import { UserProps } from '@/type/types'


const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [emailErr, setEmailErr] = useState<string | null>("");
    const router = useRouter()
    const params = useSearchParams()
    const returnUrl = params.get('returnUrl') || '/'

    const { 
        handleSubmit, 
        register, 
        reset, 
        formState:{errors} 
    } = useForm<UserProps>()


    const saveSubmit = async (data: UserProps) => {
        setIsLoading(true);
        data.name = `${data.firstName} ${data.lastName}`
        data.status = true;
        data.profileImage = "/profile.svg"
        data.roleId = 2;
        console.log(data);

        try {
            const newUser = await createUserFromLogin(data);
            if (newUser?.status === "400") {
              setIsLoading(false);
              toast.error("User already exists")
              setEmailErr(newUser?.error)
              
            } else if (newUser?.status === "200") {
                setIsLoading(false);
                toast.success("Registration Successful");
                reset();
                router.push(returnUrl);
            } else {
                setIsLoading(false);
                toast.error("Failed to create user");
                reset();
            }
        } catch (error) {
        setIsLoading(false);
        console.error("Network Error:", error);
        toast.error("Its seems something is wrong with your Network");
        }
        
    }


  return (

    <div className='dark:bg-blue-950'>
        <div className='w-full py-5 px-8'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    Create an Account
                </h2>
                <p className='text-center'>Please!, fill in details to create an account</p>
            </div>
            <div className="">
            <form className="space-y-3" onSubmit={handleSubmit(saveSubmit)}>
                <div className='grid grid-cols-2 gap-3'>
                    <TextInput
                        register={register}
                        errors={errors}
                        label='First Name'
                        name='firstName'
                        icon={User}
                    />
                    <TextInput
                        register={register}
                        errors={errors}
                        label='Last Name'
                        name='lastName'
                        icon={User}
                    />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <TextInput
                        register={register}
                        errors={errors}
                        label='Email Address'
                        name='email'
                        type='email'
                        icon={Mail}
                    />
                     <TextInput
                        register={register}
                        errors={errors}
                        label='Phone Number'
                        name='phone'
                        type="tel"
                        icon={Phone}
                    />
                    {emailErr && <span className='text-red-500 text-xs col-span-full'>{emailErr}</span>}
                </div>
                <div className='relative'>
                    <LoginPasswordInput
                        register={register}
                        errors={errors}
                        label="Password"
                        name="password"
                        icon={Lock}
                        toolTipText='Password must be at least 8 charactors' 
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
                    <PasswordInput
                        register={register}
                        errors={errors}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        icon={Lock}
                        toolTipText='It must be the same as the password' 
                    />
                </div>
                <div className='w-full'>
                    <SubmitButton 
                        title='Sign up'
                        loading={isLoading}
                        loadingTitle={isLoading ? 'Loading...' : 'Sign up'}
                        className='w-full text-md'
                        buttonIcon={LogIn}
                        variant={"shop"}
                    />
                </div>
            </form>
            {/* <form className="space-y-3">
                <div>
                    <label 
                        htmlFor="fullName" 
                        className="block text-sm/6 font-medium"
                    >
                        Full Name
                    </label>
                    <div className="mt-2 relative">
                        <div className='absolute flex items-center 
                        inset-y-0 left-0 pl-3 pointer-events-none'>
                            <User className='text-slate-300 size-4' />
                        </div>
                        <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="fullName"
                        className="block w-full rounded-md bg-white px-3 py-1.5 
                        text-base text-gray-900 outline outline-1 -outline-offset-1 
                        outline-gray-300 placeholder:text-gray-400 focus:outline 
                        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                        sm:text-sm/6 ps-8"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium">
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
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium">
                        Password
                        </label>
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
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign up
                    </button>
                </div>
            </form> */}
            <p className="mt-6 text-center text-sm/6 text-gray-500">
               Already registered ?{' '}
                <Link 
                    href="/login" 
                    className="font-semibold text-indigo-600 
                    hover:text-indigo-500"
                >
                    Sign In
                </Link>
            </p>
            </div>
        </div>
    </div>

  )
}

export default RegisterForm