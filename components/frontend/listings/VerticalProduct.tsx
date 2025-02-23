"use client"

import { useAppDispatch } from '@/redux/hooks/hooks';
import { addProductToHistory } from '@/redux/slices/historySlice';
import { IProducts } from '@/type/types';
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoMdStarHalf } from "react-icons/io";

const VerticalProduct = ({product}: {product: IProducts}) => {

    const discountRate = 5
    const discount = product.productPrice * discountRate / 100
    const discountedPrice = product.productPrice - discount

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

    <div className='border w-36 sm:w-auto shadow bg-white dark:bg-slate-800 rounded-lg p-3'>
        <Link 
            href={`/product/${product.slug}`}
            onClick={handleAdd} 
            className='flex flex-col gap-2 space-x-2 justify-center items-center'
        >
            <Image 
                src={product.productThumbnail ?? "/placeholder.svg"} 
                alt={product.name}
                width={250} 
                height={300}
                className='w-32 h-32 aspect-square object-contain' 
            />
            <div className='flex flex-col justify-center items-center'>
                <h2 className="text-sm font-semibold w-[10ch] sm:w-[20ch] truncate text-gray-700 dark:text-slate-50">
                    {product?.brand?.title} {product.name}
                </h2>
                <div className='flex flex-col items-center space-y-2'>
                    <p className="text-base sm:text-lg font-bold text-gray-500 dark:text-slate-50">
                        ${discountedPrice}
                        <span className='line-through px-2 text-gray-400 dark:text-slate-400'>
                            ${product.productPrice.toLocaleString("ex-US")}
                        </span>
                    </p>
                    <p>
                        <span className="text-xs sm:text-sm font-semibold text-teal-500 bg-green-50 px-2 py-1 rounded-lg">
                            - {discountRate}% Off
                        </span>
                    </p>
                    <p>
                        <span className="sm:block hidden text-sm font-medium text-gray-500 dark:text-slate-50">
                            Free shipping
                        </span>
                    </p>
                </div>
                <div className='flex gap-1 items-center'>
                    <FaStar className='size-3 sm:size-4 text-amber-200'/>
                    <FaStar className='size-3 sm:size-4 text-amber-200'/>
                    <FaStar className='size-3 sm:size-4 text-amber-200'/>
                    <FaStar className='size-3 sm:size-4 text-amber-200'/>
                    <IoMdStarHalf className='size-4 sm:size-5 text-amber-200'/>
                    <span className="sm:block hidden text-sm font-medium text-gray-500 dark:text-slate-50">
                        (50 reviews)
                    </span>
                </div>
            </div>
        </Link>
    </div>

  )
}

export default VerticalProduct