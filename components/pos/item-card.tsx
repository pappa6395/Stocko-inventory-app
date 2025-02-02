import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Products } from '@prisma/client'

const ItemCard = ({product}: {product: Products}) => {


  return (

    <div className='py-2 px-2 border rounded-lg shadow-md'>
        <Image
            src={product.productThumbnail ?? "/StockOnline.png"}
            alt="product"
            width={200}
            height={280}
            className='border' 
        />
        <div>
        <div className='py-2'>
            <h3 className='pb-2 font-bold text-lg'>{product.name}</h3>
            <p className='text-sm line-clamp-3 overflow-scroll'>
                {product.productDetails}
            </p>
        </div>
        <div className='flex justify-between pb-2'>
            <Badge 
                variant={"outline"} 
                className='text-sm font-semibold shadow-sm 
                text-indigo-500 rounded-lg'
            >
                Price: ${product.productPrice}
            </Badge>
            <Badge 
                variant={"outline"} 
                className='text-sm font-medium shadow-sm rounded-lg'
            >
                Qty: {product.stockQty}
            </Badge>
        </div>
        <div className='flex justify-end items-end'>
            <Button variant={"shop"} type={"button"} size={"sm"} className=''>
                <Plus className='size-4'/>
                <span className='font-semibold shadow-sm'>Add to Cart</span>
            </Button>
        </div>
        </div>
    </div> 

  )
}

export default ItemCard