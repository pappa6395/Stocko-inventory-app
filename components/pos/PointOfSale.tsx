"use client"

import { Category, Products } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import ItemCard from './item-card'
import OrderCard from './order-card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { addProductToOrderLine, decrementQty, incrementQty, OrderLineItem, removeProductFromOrderLine } from '@/redux/slices/pointOfSale'
import SearchItems from './search-items'


const PointOfSale = ({
    categories,
    products, 
    cate
}: {
    categories?: Category[]; 
    products?: Products[];
    cate: string;
}) => {
    
    const [clientOrderLineItems, setClientOrderLineItems] = useState<OrderLineItem[]>([]);
    const orderLineItems = useAppSelector((state) => state.pos.products)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setClientOrderLineItems(orderLineItems || []);
      }, [orderLineItems]);

    const sumItems = useMemo(() => orderLineItems.reduce((sum, item) => sum + item.qty, 0), [clientOrderLineItems])
    const subTotal = useMemo(() => orderLineItems.reduce((sum, item) => sum + item.price * item.qty, 0), [clientOrderLineItems])
    const taxRate = 7
    const taxFee = useMemo(() => (subTotal * (taxRate / 100)).toFixed(2), [subTotal, taxRate])
    const total = useMemo(() => (subTotal + Number(taxFee)).toFixed(2), [subTotal, taxFee])
    
    const [searchResults, setSearchResults] = useState(products);

    const handleAdd = (newOrderLineItems: Products) => {
        dispatch(
            addProductToOrderLine({
                id: newOrderLineItems.id,
                name: newOrderLineItems.name,
                price: newOrderLineItems.productPrice,
                productThumbnail: newOrderLineItems.productThumbnail,
                qty: 1,
            })
        );
        localStorage.setItem("posItem", JSON.stringify([...orderLineItems, newOrderLineItems]));
    }
    const handleRemove = (orderItemId: number) => {
        dispatch(
            removeProductFromOrderLine(orderItemId)
        );
        localStorage.setItem("posItem", JSON.stringify(orderLineItems.filter(
            (item) => item.id !== orderItemId)));
    }
    const handleIncrement = (orderItemId: number) => {
        dispatch(
            incrementQty(orderItemId)
        );
        localStorage.setItem("posItem", JSON.stringify(orderLineItems.map(
            (item) => item.id === orderItemId ? {...item, qty: item.qty + 1 } : item)));
    }
    const handleDecrement = (orderItemId: number) => {
        dispatch(
            decrementQty(orderItemId)
        );
        localStorage.setItem("posItem", JSON.stringify(orderLineItems.map(
            (item) => item.id === orderItemId? {...item, qty: item.qty - 1 } : item)));
    }
    

  return (

    <div className="grid grid-cols-12 divide-x-2 
        divide-gray-200 min-h-screen">
            <div className='col-span-full md:col-span-9 px-3'>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className='gap-2 space-x-1'>
                        <Button 
                            variant={"outline"} 
                            size={"sm"} 
                            asChild 
                            className={cn('py-2 px-2', 
                            cate === `all` ? "bg-slate-400" : "")}
                        >
                            <Link href={`/pos?cate=all`} className='flex gap-2'>
                                <Image 
                                    src={"/StockOnline.png"}
                                    alt='category'
                                    width={200}
                                    height={200}
                                    className='size-6 rounded-full'
                                />
                                <h3 className='text-sm font-medium truncate'>All</h3>
                            </Link>
                        </Button>
                        {categories && categories.map((category, index) => {
                            return (
                                <Button 
                                    key={index} 
                                    variant={"outline"} 
                                    size={"sm"} 
                                    asChild
                                    className={cn('py-2 px-2', 
                                    cate === `${category.id}` ? "bg-slate-400" : "")}
                                >
                                    <Link href={`/pos?cate=${category.id}`} className='flex gap-2'>
                                        <Image 
                                            src={category?.imageUrl ?? "/placeholder.svg"}
                                            alt='category'
                                            width={200}
                                            height={200}
                                            className='size-6 rounded-full'
                                        />
                                        <h3 className='text-sm font-medium truncate'>{category.title}</h3>
                                    </Link>
                                </Button>
                            )
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className='px-2 pt-2'>
                    {products && products.length > 0 ? (
                        <div>
                            <SearchItems allProducts={products as Products[]} onSearch={setSearchResults} />
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                {searchResults?.map((product,index) => {
                                    return (
                                        <ItemCard 
                                            key={index} 
                                            product={product}
                                            handleAdd={handleAdd}
                                            handleRemove={handleRemove}
                                        />
                                    )
                                })}  
                            </div>
                        </div>
                    ) : (
                        <div className='text-sm text-center'>No products found</div>
                    )}
                </div>
            </div>
            <div className='col-span-full md:col-span-3 p-3'>
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    Order Item
                </h2>
                {
                    clientOrderLineItems && clientOrderLineItems.length > 0 ? (
                        <div>
                            {orderLineItems.map((item, index) => {
                                return (
                                    <OrderCard 
                                        key={index} 
                                        product={item}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}
                                        handleRemove={handleRemove}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div className='text-base text-center py-6'>Your cart is empty</div>
                    )
                }
                {
                    clientOrderLineItems && clientOrderLineItems.length > 0 ? (
                        <div className='mt-2'>
                            <h2 className="scroll-m-20 border-b pb-2 text-2xl 
                            font-semibold tracking-tight first:mt-0"
                            >
                                Order Summary
                            </h2>
                            <div className='py-2 border-b'>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Total Items:</h3>
                                    <h3 className=' font-medium text-muted-foreground'>{sumItems} items</h3>
                                </div>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Subtotal:</h3>
                                    <h3 className='font-medium text-muted-foreground'>$ {subTotal}</h3>
                                </div>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Tax {taxRate}%:</h3>
                                    <h3 className='font-medium text-muted-foreground'>$ {taxFee}</h3>
                                </div>
                            </div>
                            <div className='py-2 flex justify-between items-end'>
                                <h2 className="scroll-m-20 text-2xl text-muted-foreground 
                                font-semibold tracking-tight first:mt-0"
                                >
                                    Total
                                </h2>
                                <h3 className="scroll-m-20 text-xl text-muted-foreground 
                                font-semibold tracking-tight first:mt-0"
                                >
                                    $ {total}
                                </h3>
                            </div>
                            <div className='w-full py-4'>
                                <Button variant={'shop'} className='w-full'>
                                    Place an Order
                                </Button>
                            </div>
                        </div>
                ) : ("")}
                
            </div>
    </div>

  )
}

export default PointOfSale