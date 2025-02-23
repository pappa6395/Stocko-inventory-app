"use client"


import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setActiveStep } from '@/redux/slices/stepSlice';
import { setShippingAddress, ShippingAddress } from '@/redux/slices/checkoutSlice';
import { useRouter } from 'next/navigation';



const ShippingAddressForm = () => {
  
  
    const router = useRouter()
    const activeStep = useAppSelector((state) => state.step.activeStep)
    const dispatch = useAppDispatch()
    const shippingAddress = useAppSelector((state) => state.checkout.shippingAddress)

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ShippingAddress>({
      defaultValues: {
        streetAddress: shippingAddress?.streetAddress ?? "",
        unitNumber: shippingAddress?.unitNumber ?? "",
        city: shippingAddress?.city ?? "",
        state: shippingAddress?.state ?? "",
        zipCode: shippingAddress?.zipCode ?? "",
        country: shippingAddress?.country ?? "",
      }
    });

    const saveUser = async(data: ShippingAddress) => {
      dispatch(setActiveStep(activeStep + 1))
      dispatch(
        setShippingAddress(data)
      )
    }

  return (

    <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Shipping Details</h2>
        <form 
          onSubmit={handleSubmit(saveUser)} 
          className='grid md:col-span-12 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                        register={register}
                        errors={errors}
                        label="Street Address"
                        name="streetAddress"
                        />
                        <TextInput
                        register={register}
                        errors={errors}
                        label="Apartment or Unit No."
                        name="unitNumber"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="City"
                            name="city"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="State"
                            name="state"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Zip Code"
                            name="zipCode"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Country"
                            name="country"
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

export default ShippingAddressForm