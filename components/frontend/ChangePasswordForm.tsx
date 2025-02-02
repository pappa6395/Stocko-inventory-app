"use client"

import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChangePasswordProps } from '@/type/types';
import { useForm } from 'react-hook-form';
import LoginPasswordInput from '../global/FormInputs/LoginPasswordInput';
import SubmitButton from '../global/FormInputs/SubmitButton';
import { updateUserPassword } from '@/actions/users';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const ChangePasswordForm = ({
    userId, 
    roleId, 
    email
}: {
    userId: number;
    roleId: string;
    email: string;
}) => {


    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors}
    } = useForm<ChangePasswordProps>()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    

    const saveNewPassword = async (data: ChangePasswordProps) => {
        
        data.email = email
        data.userId = userId
        data.roleId = Number(roleId)
        console.log("Data:", data);
        
        try {
            setIsLoading(true);
            const updatePassword = await updateUserPassword(data);
            if (updatePassword.ok) {
                console.log("updated Password:", updatePassword.data);
                toast.success("Password updated successfully");
                router.push("/login")
            }
            
        } catch (e) {
            console.error("Error saving new password:", e);
        } finally {
            setIsLoading(false);
        }
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
            <form className="space-y-3" onSubmit={handleSubmit(saveNewPassword)}>
                <div>
                    <LoginPasswordInput
                        register={register}
                        errors={errors}
                        label='New Password'
                        name='password'
                        type="password"
                        icon={Lock}
                    />
                </div>
                <div>
                    <LoginPasswordInput
                        register={register}
                        errors={errors}
                        label='Confirm Password'
                        name='confirmPassword'
                        type="password"
                        icon={Lock}
                    />
                </div>
                <div className='w-full'>
                   <SubmitButton 
                    title={"Sign in"}
                    loading={isLoading}
                    loadingTitle={isLoading ? "Loading..." : "Sign in"}
                    buttonIcon={LogIn}
                    className='w-full bg-indigo-500'
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

export default ChangePasswordForm