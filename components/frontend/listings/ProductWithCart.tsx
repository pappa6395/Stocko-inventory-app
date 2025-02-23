"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { IProducts } from '@/type/types'
import AddToCartButton from './AddToCartButton'
import { useAppDispatch } from '@/redux/hooks/hooks'
import { addProductToHistory } from '@/redux/slices/historySlice'
import Link from 'next/link'


const ProductWithCart = ({
    product,
    scrollable = false
}: {
    product: IProducts;
    scrollable?: boolean;
}) => {

    const dispatch = useAppDispatch()
    
    const handleAdd = () => {
        const newHistoryItem = {
            id: product?.id || 0,
            name: product?.name || "",
            slug: product?.slug || "",
            productPrice: product?.productPrice || 0,
            productDetails: product?.productDetails || "",
            productThumbnail: product?.productThumbnail || "/placeholder.svg",
            stockQty: product?.stockQty || 0,
        };
        dispatch(
            addProductToHistory(newHistoryItem)
        )
    };
    
  return (
 
    <div className='py-2 px-2 flex flex-col justify-between border 
    rounded-lg shadow-md bg-white dark:bg-slate-800'>
        <Link href={`/product/${product.slug}`} onClick={handleAdd}>
            <Image
                src={product.productThumbnail ?? "/StockOnline.png"}
                alt="product"
                width={200}
                height={280}
                className='border h-[200px] w-full object-contain' 
            />
        </Link>
        <Link 
            href={`/product/${product.slug}`} 
            onClick={handleAdd} 
            className='py-2'
        >
            <h3 className='pb-2 font-bold text-lg w-[14ch] sm:w-[16ch] truncate'>{product?.brand?.title} {product.name}</h3>
            <p className='text-sm line-clamp-2 overflow-scroll'>
                {product.productDetails}
            </p>
        </Link>
        <div className='flex flex-col justify-end'>
            <div className='flex justify-between pb-2'>
                <Badge 
                    variant={"outline"} 
                    className='text-sm font-semibold shadow-sm 
                    text-indigo-500 dark:text-indigo-300 rounded-lg'
                >
                    ${product?.productPrice?.toLocaleString("en-US")}
                </Badge>
                <Badge 
                    variant={"outline"} 
                    className='text-sm font-medium shadow-sm rounded-lg'
                >
                    Qty: {product.stockQty}
                </Badge>
            </div>
            <div className='flex justify-center items-end'>
                <AddToCartButton product={product} />
            </div>
        </div>
    </div> 

  )
}

export default ProductWithCart