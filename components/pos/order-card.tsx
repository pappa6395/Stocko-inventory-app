"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { OrderLineItem } from '@/redux/slices/pointOfSale'
import { useAppSelector } from '@/redux/hooks/hooks'

const OrderCard = ({
    product,
    handleIncrement,
    handleDecrement,
    handleRemove
}: {
    product: OrderLineItem;
    handleIncrement: (value: number) => void;
    handleDecrement: (value: number) => void;
    handleRemove: (value: number) => void;
}) => {

    const orderLineItems = useAppSelector((state) => state.pos.products)

    useEffect(() => {
            if (typeof window !== "undefined") {
                localStorage.setItem("posItem", JSON.stringify(orderLineItems));
            }
    }, [orderLineItems]);

    
  return (

    <div>
        <div className='flex items-center justify-between p-2 gap-2'>
            <div className='flex gap-2'>
                <Image
                src={product?.productThumbnail ?? "/StockOnline.png"}
                alt="product"
                width={200}
                height={280}
                className='h-16 w-14 object-contain' 
                />
                <div>
                    <div className='py-2'>
                        <h3 className='font-bold text-md'>{product.name}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <Badge 
                            variant={"outline"} 
                            className='text-sm font-semibold shadow-sm 
                            text-indigo-500 rounded-lg'
                        >
                            ${product.price}
                        </Badge>
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex justify-end items-end'>
                    <Button 
                        variant={"outline"} 
                        type={"button"} 
                        size={"icon"}
                        onClick={() => handleDecrement(product.id)} 
                        className='size-6 rounded-full'
                    >
                        <Minus className='size-4'/>
                    </Button>
                </div>
                <div className='flex justify-end items-end'>
                    <Button  disabled variant={"ghost"} type={"button"} size={"icon"} className='size-6 rounded-full'>
                        <span className='text-primary'>{product.qty}</span>
                    </Button>
                </div>
                <div className='flex justify-end items-end'>
                    <Button 
                        variant={"shop"} 
                        type={"button"} 
                        size={"icon"}
                        onClick={() => handleIncrement(product.id)} 
                        className='size-6 rounded-full'
                    >
                        <Plus className='size-4'/>
                    </Button>
                </div>
            </div>
        </div>
        <div className='flex justify-end items-end'>
                <Button 
                    variant={"destructive"} 
                    type={"button"} 
                    size={"sm"}
                    onClick={() => handleRemove(product.id)} 
                    className=''
                >
                    <Trash2 className='size-4'/>
                    <span className='font-semibold shadow-xs'>Remove</span>
                </Button>
            </div>
    </div>

  )
}

export default OrderCard