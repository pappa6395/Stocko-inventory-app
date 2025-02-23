"use client"

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { addProductToCart, decrementQty, incrementQty, removeProductFromCart } from '@/redux/slices/cartSlice';
import { Brand, Category, MainCategory, Products, SubCategory } from '@prisma/client';
import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'


export interface ICategoryCart extends Category {
    mainCategory?: MainCategory;
}

export interface ISubCategory extends SubCategory {
    category?: ICategoryCart;
}

export interface IProductCarts extends Products {
    subCategory: ISubCategory;
    brand: Brand;
}
export interface AddProductToCartProps {
    product: IProductCarts | null;
}

const AddToCartButton = ({product}: AddProductToCartProps) => {

    const [existing, setExisting] = useState(false);

    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    
    const [quantity, setQuantity] = useState(1);
    function handleAdd() {
      const newCartItem = {
        id: product?.id || 0,
        name: product?.name || "",
        price: product?.productPrice || 0,
        qty: quantity,
        brand: product?.brand.title || "",
        image: product?.productThumbnail || "/placeholder.svg",
      };
      dispatch(addProductToCart(newCartItem));

    }

    const handleIncrement = () => {
        setQuantity((prevQty) => prevQty + 1 )
    }

    const handleDecrement = () => {
       setQuantity((prevQty) => prevQty ? prevQty - 1 : 1 )
    }

    useEffect(() => {
      // Check if the product already exists in the cart
      const isExisting = cartItems.some((item) => item.id === product?.id);
      setExisting(isExisting);
    }, [cartItems]);

      
  return (

    <div className='flex justify-evenly items-center mt-5'>
        <div className='hidden sm:flex items-center gap-1'>
            <Button 
                type="button" 
                size={"icon"} 
                variant={"cart"}
                onClick={handleDecrement}
                className='size-8'
            >
                <Minus className='size-4' />
            </Button>
            <div className='border px-3 py-1 bg-white dark:bg-slate-800 rounded-md'>
                <p className='text-base'>{quantity || 1}</p>
            </div>
            <Button 
                type="button" 
                size={"icon"} 
                variant={"cart"}
                onClick={handleIncrement}
                className='size-8'
            >
                <Plus className='size-4'/>
            </Button>
        </div>
        <Button className='ml-2' variant="receipt" onClick={handleAdd}>
            <span>Add to Cart</span>
        </Button>
    </div>
    

  )
}

export default AddToCartButton