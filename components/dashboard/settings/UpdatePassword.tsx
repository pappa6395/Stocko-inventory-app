"use client"

import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChangePasswordProps } from '@/type/types';
import { useForm } from 'react-hook-form';
import { updateUserPassword } from '@/actions/users';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoginPasswordInput from '@/components/global/FormInputs/LoginPasswordInput';
import SubmitButton from '@/components/global/FormInputs/SubmitButton';
import { Session } from 'next-auth';


const UpdatePasswordForm = ({
    session,
    roleId
}: {
    session: Session;
    roleId: string;
}) => {

    const  { id, email } = session?.user;

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors}
    } = useForm<ChangePasswordProps>()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [passwordErr, setPasswordErr] = useState<string | null>("");
    

    const saveNewPassword = async (data: ChangePasswordProps) => {
        setIsLoading(true);
        data.email = email ?? ""
        data.userId = Number(id)
        data.roleId = Number(roleId)
        console.log("Data:", data);
        
        try {
            const updatePassword = await updateUserPassword(data);
            if (updatePassword.status === "200") {
                console.log("updated Password:", updatePassword.data);
                toast.success("Password updated successfully");
                setIsLoading(false);
                router.push("/login")
            } else {
                toast.error("Failed to update password");
                setPasswordErr(updatePassword.error);
                setIsLoading(false);
                return;
            }
            
        } catch (e) {
            console.error("Error saving new password:", e);
            setIsLoading(false);
        } 
    }

  return (

    <div className='dark:bg-blue-950'>
        <div className='py-5 px-8'>
            <div className='py-4'>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    Change Password
                </h2>
                <p className='text-center'>Fill in details to change password.</p>
            </div> 
            <div className="">
                <form className="flex flex-col justify-center items-center space-y-3" onSubmit={handleSubmit(saveNewPassword)}>
                    <div className='w-1/2'>
                        <LoginPasswordInput
                            register={register}
                            errors={errors}
                            label='New Password'
                            name='password'
                            type="password"
                            icon={Lock}
                        />
                    </div>
                    <div className='w-1/2'>
                        <LoginPasswordInput
                            register={register}
                            errors={errors}
                            label='Confirm Password'
                            name='confirmPassword'
                            type="password"
                            icon={Lock}
                        />
                        {passwordErr && <p className='text-red-500 text-xs'>{passwordErr}</p>}
                    </div>
                    <div className='w-1/2 pt-4'>
                        <SubmitButton 
                            title={"Update Password"}
                            loading={isLoading}
                            loadingTitle={isLoading ? "Changing..." : "Update Password"}
                            buttonIcon={LogIn}
                            variant='shop'
                            className='w-full'
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default UpdatePasswordForm