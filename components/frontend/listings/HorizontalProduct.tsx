import { IProducts } from '@/type/types';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoMdStarHalf } from "react-icons/io";

const HorizontalProduct = ({product}: {product: IProducts}) => {

    const discountRate = 5
    const discount = product.productPrice * discountRate / 100
    const discountedPrice = product.productPrice - discount

  return (

    <div className='border shadow bg-white rounded-lg p-3'>
        <Link href={"#"} className='flex gap-2 space-x-2'>
            <Image 
                src={product.productThumbnail ?? "/placeholder.svg"} 
                alt={product.name} 
                width={250} 
                height={300}
                className='w-24 h-32 object-contain flex-shrink-0' 
            />
            <div className=''>
                <h2 className="text-sm font-semibold text-gray-700">
                    {product.brand.title} {product.name}
                </h2>
                <div>
                    <p className="text-lg font-bold text-gray-500">
                        ${discountedPrice}
                        <span className='line-through px-2 text-gray-400'>
                            ${product.productPrice}
                        </span>
                    </p>
                    <p>
                        <span className="text-sm font-semibold text-teal-500 bg-green-50 px-2 py-1 rounded-lg">
                            - {discountRate}% Off
                        </span>
                    </p>
                    <p>
                        <span className="text-sm font-medium text-gray-500">
                            Free shipping
                        </span>
                    </p>
                </div>
                <div className='flex gap-1 items-center'>
                    <FaStar className='size-4 text-amber-200'/>
                    <FaStar className='size-4 text-amber-200'/>
                    <FaStar className='size-4 text-amber-200'/>
                    <FaStar className='size-4 text-amber-200'/>
                    <IoMdStarHalf className='size-4 text-amber-200'/>
                    <span className="text-sm font-medium text-gray-500">
                        4.5 (50 reviews)
                    </span>
                </div>
            </div>
        </Link>
    </div>

  )
}

export default HorizontalProduct