import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import PreviousButton from './PreviousButton'
import Image from 'next/image'
import NextButton from './NextButton'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { setActiveStep } from '@/redux/slices/stepSlice'

const OrderSummary = () => {

    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const activeStep = useAppSelector((state) => state.step.activeStep);
    const dispatch = useAppDispatch();


    const sumItems = cartItems.reduce((
        sum, item) => sum + item.qty, 0)
    const totalSum = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,0).toFixed(2);


    const handleSubmit = () => {
        dispatch(setActiveStep(activeStep + 1));
    }

  return (

    <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Order Summary</h2>
        <form onSubmit={handleSubmit}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Image</TableHead>
                        <TableHead>Product Title</TableHead>
                        <TableHead>Product Quantity</TableHead>
                        <TableHead>Product Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map((item, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    <Image 
                                        src={item.image}
                                        alt={item.name}
                                        width={200}
                                        height={250}
                                        className='size-20 aspect-square object-contain'
                                    />
                                </TableCell>
                                <TableCell className='w-60'>
                                    <span>
                                    {item.name}
                                    </span>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <span>{item.qty}</span>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <span>${item.price}</span>
                                </TableCell>
                            </TableRow>
                        )
                    })}   
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className='translate-x-5 sm:translate-x-10 font-semibold'>
                            Total Items:
                        </TableCell>
                        <TableCell colSpan={3} className='text-end font-semibold'>
                            <span className='mr-2.5 sm:mr-5 pr-2.5 sm:pr-5'>{sumItems}</span>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className='text-center'>
                            <Card>
                                <CardContent className='flex items-center justify-between pt-5'>
                                    <CardTitle className='text-xl sm:ml-4'>
                                        Total  <span className='hidden sm:inline text-gray-400 text-sm'>{' '}
                                        (VAT fee 7% included)</span> :
                                    </CardTitle>
                                    <p className='text-lg font-bold sm:mr-3'>${totalSum}</p>
                                </CardContent>
                                <p className='sm:hidden text-gray-400 text-sm'>(VAT fee 7% included)</p>
                            </Card>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className='flex justify-between mt-6 px-2'>
                <PreviousButton />
                <NextButton />
            </div>
        </form>
    </div>

  )
}

export default OrderSummary