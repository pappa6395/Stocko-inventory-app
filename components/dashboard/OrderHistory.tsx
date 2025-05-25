"use client"

import { ILineOrder } from '@/type/types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { convertIsoToDateString } from '@/lib/convertISOtoDate'
import { generateSlug } from '@/lib/generateSlug'
import { cn } from '@/lib/utils'
import { ChevronLeft, FilePenLine, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import OrderStatusBtn from '../frontend/orders/OrderStatusBtn'
import Tooltip from '../global/Tooltip'

type OrderHistoryProps = {
    orders: ILineOrder[],
}

const OrderHistory = (props: OrderHistoryProps) => {

    const { orders } = props
    
    const router = useRouter()
    const handleBack = () => {
        router.back()
    } 

  return (

    <div>
        <div className='flex gap-3'>
            <Button 
                onClick={handleBack}
                variant="outline" 
                type="button"
                size="icon" 
                className="h-7 w-7"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Order History
            </h1>
        </div>
        <div className='pt-3 mx-2 flex items-center justify-between gap-2 border-b '>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Customer: {orders[0].customerName}
            </h2>
            <div className='mr-3'>
                <p className='text-muted-foreground'>
                    Email: {orders[0].customerEmail}
                </p>
                <p className='text-muted-foreground'>
                    Phone: {orders[0].phone || "-"}
                </p>
            </div>
            
        </div>
        <div className="py-4 text-xs">
            {orders.length > 0 ? (
                <div className='space-y-4 mx-4'>
                    {orders.map((order,i) => {
                        const totalSum = order?.lineOrderItems?.reduce(
                            (sum, item) => sum + item.price * item.qty,0);
                        const currentDate = convertIsoToDateString(order?.createdAt)
                        return (
                            <div 
                                key={i}
                                className={cn("shadow rounded-md border", 
                                    order.status === "DELIVERED" 
                                    ? "border-green-500" 
                                    : "border-yellow-500")}
                            >                                
                                <Table className="text-xs">
                                    <TableHeader>
                                        <TableRow className='flex justify-around py-3'>
                                            <TableHead>Order Date</TableHead>
                                            <TableHead>Order No</TableHead>
                                            <TableHead>Pay.Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Shipping Address</TableHead>
                                            <TableHead>Total Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className='flex justify-around'>
                                            <TableCell className='pt'>{currentDate}</TableCell>
                                            <TableCell>#{order?.orderNumber || ""}</TableCell>
                                            <TableCell>{order?.paymentMethod || ""}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <OrderStatusBtn order={order}  />
                                                </div>
                                            </TableCell>
                                            <TableCell className='flex-shrink-0'>
                                                {order?.streetAddress || ""}, {order?.unitNumber || ""}
                                            </TableCell>
                                            <TableCell className='font-semibold text-lg'>
                                                ${totalSum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="flow-root pb-4 mx-2 px-4">
                                    <div className="flex items-center justify-between">
                                        <ul className='flex gap-3'>
                                        {order.lineOrderItems.length > 0 &&
                                            order.lineOrderItems.map((item, i) => {
                                            const slug = generateSlug(item.name);
                                            return (
                                                <li key={i} className="flex space-x-3">
                                                    <Link
                                                        href={`/product/${slug}`}
                                                        className="flex-shrink-0"
                                                    >
                                                        <Image
                                                        width={200}
                                                        height={200}
                                                        className="object-cover w-14 h-14 rounded-lg"
                                                        src={item.productThumbnail}
                                                        alt={item.name}
                                                        />
                                                    </Link>
                                                </li>
                                            );
                                            })} 
                                        </ul>
                                        <div className="flex mr-5 pr-4">
                                            <div className='relative group'>
                                                <Button asChild variant={'ghost'} size={"icon"}>
                                                    <Link href={`/dashboard/orders/${order.id}`}>
                                                        <FileText />
                                                        <span aria-label='View Order' className='sr-only'>View Order</span>
                                                    </Link>
                                                </Button>
                                                <Tooltip label={"View Order"}/>
                                            </div>
                                            
                                            {/* <div className='relative group'>
                                                <Button variant={"ghost"} size={"icon"}>
                                                    <FilePenLine />   
                                                </Button>
                                                <Tooltip label={"Change Status"}/>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            ) : (
                <div>
                    No orders found.
                </div>
            )}
                
        </div>
    </div>

  )
}

export default OrderHistory