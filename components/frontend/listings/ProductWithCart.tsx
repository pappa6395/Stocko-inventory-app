"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Plus, Trash2 } from 'lucide-react'

import { BsCartPlus } from 'react-icons/bs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IProducts } from '@/type/types'


const ProductWithCart = ({
    product,
    scrollable = false
}: {
    product: IProducts;
    scrollable?: boolean;
}) => {

    
  return (
 
    <div className='py-2 px-2 flex flex-col justify-between border rounded-lg shadow-md bg-white'>
        <Image
            src={product.productThumbnail ?? "/StockOnline.png"}
            alt="product"
            width={200}
            height={280}
            className='border h-[200px] w-full object-contain' 
        />
        <div>
            <div className='py-2'>
                <h3 className='pb-2 font-bold text-lg w-[16ch] truncate'>{product.name}</h3>
                <p className='text-sm line-clamp-2 overflow-scroll'>
                    {product.productDetails}
                </p>
            </div>
        </div>
        <div className='flex flex-col justify-end'>
            <div className='flex justify-between pb-2'>
                <Badge 
                    variant={"outline"} 
                    className='text-sm font-semibold shadow-sm 
                    text-indigo-500 rounded-lg'
                >
                    ${product.productPrice.toLocaleString("en-US")}
                </Badge>
                <Badge 
                    variant={"outline"} 
                    className='text-sm font-medium shadow-sm rounded-lg'
                >
                    Qty: {product.stockQty}
                </Badge>
            </div>
            <div className='flex justify-center items-end'>
                <Button 
                    variant={"shop"} 
                    type={"button"} 
                    size={"sm"} 
                    className=''
                >
                    <BsCartPlus className='size-4'/>
                    <span className='font-semibold shadow-sm'>Add to Cart</span>
                </Button>
            </div>
        </div>
    </div> 

  )
}

export default ProductWithCart