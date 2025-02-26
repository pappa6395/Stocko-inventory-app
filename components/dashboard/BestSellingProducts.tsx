"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, Delete, ExternalLink, File, Trash } from 'lucide-react'
import { ILineOrder, IProducts, SBProducts } from '@/type/types'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice'
import Link from 'next/link'


const BestSellingProducts = ({products}: {products: SBProducts[]}) => {


  return (

    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 
        md:p-6 border shadow-sm rounded-lg">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Best Selling Products</h1>
                <Button asChild className="ml-auto" size="sm">
                    <Link href={`/dashboard/inventory/products`}>
                        <span>View All</span>
                        <ExternalLink />
                    </Link>
                </Button>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total Sales</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.length > 0 ? (
                            products.map((p, i) => {
                                const sales = p.sale
                                const totalAmount = p.sale.reduce((acc, item) => acc + item.salePrice * item.qty, 0);
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Image 
                                                src={p.productThumbnail || "/placeholder.svg"} 
                                                alt={p.name} 
                                                width={80} 
                                                height={120} 
                                            />
                                            
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <p className='text-xs'>{p.brand.title} {p.name}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>${formatPrice(p.productPrice)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{p.saleUnit}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>${formatPrice(totalAmount)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button asChild variant="outline" size="icon">
                                                    <Link href={`/product/${p.slug}`} >
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="icon">
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <p className="text-sm text-muted-foreground">No products found.</p>
                        )}
                        
                    </TableBody>
                </Table>
            </div>
    </main>
    
  )
}

export default BestSellingProducts