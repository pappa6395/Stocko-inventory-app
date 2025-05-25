"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, Delete, File, Trash } from 'lucide-react'
import Link from 'next/link'
import { ILineOrder } from '@/type/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { convertIsoToDateString } from '@/lib/convertISOtoDate'
import OrderStatusBtn from '../frontend/orders/OrderStatusBtn'

const OrderSummary = ({orders}: {orders: ILineOrder[]}) => {

    const actualOrders = orders.filter((order) => order.lineOrderItems.length > 0);

  return (

        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">Recent Orders</CardTitle>
                    <Button 
                        asChild 
                        size="lg" 
                        variant="default" 
                        className="gap-1 text-sm py-2.5 px-3">
                        <Link href="#" >
                            <span className="sr-only sm:not-sr-only">View All</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>  
                <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Amount</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                { actualOrders && actualOrders.length > 0 ? (
                    actualOrders.map((order,index) => {
                        const date = convertIsoToDateString(order.createdAt)
                        const isEven = index % 2 === 0;
                        return (
                            <TableRow key={index} className={isEven ? "bg-accent" : ""}>
                                <TableCell>
                                <div className="font-medium">{order.customerName}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">{order.customerEmail}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{order.orderType}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <OrderStatusBtn order={order} />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{date}</TableCell>
                                <TableCell className="text-right">${order.orderAmount}</TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        asChild 
                                        size="sm" 
                                        variant="outline" 
                                        className="gap-1 text-sm">
                                        <Link href={`/dashboard/orders/${order.id}`} >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">View</span>
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    
                ) : (
                    <TableRow>
                        <TableCell colSpan={6}>No orders found.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    
  )
}

export default OrderSummary