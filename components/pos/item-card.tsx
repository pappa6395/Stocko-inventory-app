"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Products } from '@prisma/client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { BsCartPlus } from 'react-icons/bs'
import { ProductwithBrand } from './PointOfSale'
import { loadOrderLineItem } from '@/redux/slices/pointOfSale'


const ItemCard = ({
    product,
    handleAdd,
    handleRemove,
}: {
    product: ProductwithBrand;
    handleAdd: (value: ProductwithBrand) => void
    handleRemove: (value: number) => void

}) => {

    const orderLineItems = useAppSelector((state) => state.pos.products)
    const dispatch = useAppDispatch();
    const [existing, setExisting] = useState(false);
    
    useEffect(() => {
        const isInCart = orderLineItems.some((item) => item.id === product.id)
        setExisting(isInCart);
        return () => setExisting(false); // cleanup function to prevent memory leak when component unmounts
    }, [orderLineItems, product.id]);

    useEffect(() => {
        dispatch(
            loadOrderLineItem(),
        );
    }, []);
    
  return (

    <div className='py-2 px-2 border rounded-lg shadow-md'>
        <Image
            src={product.productThumbnail ?? "/StockOnline.png"}
            alt="product"
            width={200}
            height={280}
            className='border h-[200px] w-full object-contain' 
        />
        <div>
        <div className='py-2'>
            <h3 className='pb-2 font-bold text-lg w-[16ch] truncate'>{product.brand.title} {product.name}</h3>
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
                ${product.productPrice.toLocaleString("en-US")}
            </Badge>
            <Badge 
                variant={"outline"} 
                className='text-sm font-medium shadow-sm rounded-lg'
            >
                Qty: {product.stockQty}
            </Badge>
        </div>
        {existing ? (
            <div className='flex justify-between items-end'>
                <Button 
                    variant={"destructive"} 
                    type={"button"} 
                    size={"sm"}
                    onClick={() => handleRemove(product.id)} 
                    className=''
                >
                    <Trash2 className='size-4'/>
                </Button>
                <Button 
                    variant={"shop"} 
                    type={"button"} 
                    size={"sm"}
                    onClick={() => handleAdd(product)} 
                    className=''
                >
                    <BsCartPlus className='size-4'/>
                    <span className='font-semibold shadow-sm'>Add</span>
                </Button>
            </div>
        ) : (
            <div className='flex justify-center items-end'>
                <Button 
                    variant={"shop"} 
                    type={"button"} 
                    size={"sm"}
                    onClick={() => handleAdd(product)} 
                    className=''
                >
                    <BsCartPlus className='size-4'/>
                    <span className='font-semibold shadow-sm'>Add to Cart</span>
                </Button>
            </div>
        )}
        
        </div>
    </div> 

  )
}

export default ItemCard