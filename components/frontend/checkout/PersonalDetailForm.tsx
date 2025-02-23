"use client"


import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import { useRouter } from 'next/navigation';
import { PersonalDetails, setPersonalDetails } from '@/redux/slices/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setActiveStep } from '@/redux/slices/stepSlice';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';


const PersonalDetailForm = ({session}: {session: Session}) => {

    const dispatch = useAppDispatch()
    const activeStep = useAppSelector((state) => state.step.activeStep)
    const personalDetails = useAppSelector((state) => state.checkout.personalDetails) as PersonalDetails | null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PersonalDetails>({
        defaultValues: {
            firstName: personalDetails?.firstName || session?.user?.firstName,
            lastName: personalDetails?.lastName || session?.user?.lastName,
            email: personalDetails?.email || session?.user?.email!,
            phone: personalDetails?.phone || session?.user?.phone,
        }
    });

    const saveData = async(data: PersonalDetails) => {
        dispatch(setActiveStep(activeStep + 1));
        dispatch(
            setPersonalDetails(data)
        );

    }

  return (

    <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Personal Details</h2>
        <form 
          onSubmit={handleSubmit(saveData)} 
          className='grid md:col-span-12 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                        register={register}
                        errors={errors}
                        label="First Name"
                        name="firstName"
                        />
                        <TextInput
                        register={register}
                        errors={errors}
                        label="Last Name"
                        name="lastName"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Email Address"
                            name="email"
                            type="email"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Phone Number"
                            name="phone"
                        />
                    </div>
                </div>
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <PreviousButton />
            <NextButton />
          </div>
        </form>
    </div>
    
  )
}

export default PersonalDetailForm