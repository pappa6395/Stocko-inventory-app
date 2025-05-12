"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PersonalDetailForm from './PersonalDetailForm'
import ShippingAddressForm from './ShippingAddressForm'
import OrderSummary from './OrderSummary'
import PaymentMethod from './PaymentMethod'
import { useAppSelector } from '@/redux/hooks/hooks'
import { Session } from 'next-auth'
import { CartItem } from '@/redux/slices/cartSlice'
import { CartMenu } from '../CartMenu'



const CheckoutPage = ({session}: {session: Session}) => {

    const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const steps = useAppSelector((state) => state.step.steps);
    const activeSteps = useAppSelector((state) => state.step.activeStep)

    useEffect(() => {
        const allCartItems = localStorage.getItem('cart');
        if (allCartItems) {
            setAllCartItems(JSON.parse(allCartItems));
        }
    },[cartItems])
    
    const sumItems = allCartItems.reduce((
        sum, item) => sum + item.qty, 0)
    const totalSum = allCartItems.reduce(
        (sum, item) => sum + item.price * item.qty,0
    ).toFixed(2);

    
    function displayActiveForm() {
        switch (activeSteps) {
            case 1:
                return <PersonalDetailForm session={session} />
            case 2:
                return <ShippingAddressForm />
            case 3:
                return <OrderSummary />
            case 4:
                return <PaymentMethod />
            default:
                return <div>Loading...</div>
        }
    }

  return (

    <div className="max-w-4xl border mx-auto p-8 rounded-md">
            {/* Header */}
            <div className='flex items-center space-x-3 gap-3'>
                <Link href="/cart" className='space-x-2'>
                    <span>Cart</span>
                    <span className='px-2 py-1 text-sm/6 rounded-full bg-slate-900 text-white'>{sumItems}</span>
                </Link>
                {steps.map((step, i) => {
                    const isLastIndex = steps.length - 1 === i;
                    return (
                        <div key={i} className={`items-center rounded-lg px-2 py-1 gap-2 ${i + 1 === activeSteps 
                        ? 'text-slate-700 dark:text-slate-900 bg-slate-300 dark:bg-slate-100 flex' 
                        : 'text-gray-400 hidden sm:flex'}`}>
                            <p className='text-sm'>{step.name}</p>
                            {!isLastIndex && (
                                <Badge variant={"outline"} className='border-none'>
                                    <ChevronRight className={`size-4 ${i + 1 === activeSteps 
                                        ? 'text-slate-700' 
                                        : 'text-gray-400'}`}
                                    />
                                </Badge>
                            )}
                        </div>
                    )
                })}
            </div>
            {/* Form */}
            <div className='bg-white dark:bg-slate-800 shadow-md sm:border sm:border-gray-200/50 rounded-md p-8 mt-4'>
                <div className='flex items-center justify-between 
                 sm:bg-gray-100 py-3 px-3 rounded-xl'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className="flex items-center space-x-2 w-10 h-10 
                        justify-center rounded-full bg-slate-400">
                            <ShoppingBag className='size-6 text-slate-50 flex-shrink-0'/>
                        </div>
                        <p className='hidden sm:block dark:text-slate-800'>You have {sumItems} items in cart, the total amount is ${totalSum}</p>
                    </div>
                    <CartMenu from="checkout" />
                </div>
                <div className="sm:hidden block px-2 py-1 rounded-md bg-gray-100 dark:text-slate-800">
                    You have {allCartItems.length} items in cart, the total amount is ${totalSum}
                </div>
                
                <div>
                    {displayActiveForm()}
                </div>
            </div>
        </div>

  )
}

export default CheckoutPage