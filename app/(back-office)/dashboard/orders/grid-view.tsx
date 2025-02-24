import { getOrders } from '@/actions/pos'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { convertIsoToDateString } from '@/lib/convertISOtoDate'
import { generateSlug } from '@/lib/generateSlug'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FilePenLine, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'


const page = async () => {

    const orders = (await getOrders()).data || [];
    const actualOrders = orders.filter((order) => order.lineOrderItems.length > 0);
    const achievedOrders = orders.filter((order) => order.lineOrderItems.length === 0);

  return (

    <div>
        <div>
            <h2>
                All Orders
            </h2>
        </div>
        <div className="py-4 text-xs">
            {actualOrders.length > 0 ? (
                <div className='space-y-4 mx-4'>
                    {actualOrders.map((order,i) => {
                        const totalSum = order?.lineOrderItems?.reduce(
                            (sum, item) => sum + item.price * item.qty,0);
                        const currentDate = convertIsoToDateString(order?.createdAt)
                        return (
                            <div 
                                key={i}
                                className={cn("shadow rounded-md border", 
                                    order.status === "DELIVERED" 
                                    ? "border-green-500" 
                                    : "border-gray-200")}
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
                                            <TableCell>{order?.status || "DELIVERED"}</TableCell>
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
                                        <div className="flex mr-3">
                                            <Button asChild variant={'ghost'} size={"icon"}>
                                                <Link href={`/dashboard/orders/${order.id}`}>
                                                    <FileText />
                                                    <span aria-hidden className='sr-only'>View Order</span>
                                                </Link>
                                            </Button>
                                            <Button variant={"ghost"} size={"icon"}>
                                                <FilePenLine />
                                                <span aria-hidden className='sr-only'>Change Status</span>
                                            </Button>
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

export default page