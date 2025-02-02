import React from 'react'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

const OrderCard = () => {

  return (

    <div>
        <div className='flex items-center justify-between p-2 gap-2'>
            <div className='flex gap-2'>
                <Image
                src={"/StockOnline.png"}
                alt="product"
                width={200}
                height={280}
                className='h-16 w-14 object-cover' 
                />
                <div>
                    <div className='py-2'>
                        <h3 className='font-bold text-md'>Product Title</h3>
                        <p className='text-xs text-muted-foreground truncate'>
                            Product Details
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <Badge 
                            variant={"outline"} 
                            className='text-sm font-semibold shadow-sm 
                            text-indigo-500 rounded-lg'
                        >
                            $100
                        </Badge>
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex justify-end items-end'>
                    <Button variant={"outline"} type={"button"} size={"icon"} className='size-6 rounded-full'>
                        <Minus className='size-4'/>
                    </Button>
                </div>
                <div className='flex justify-end items-end'>
                    <Button  disabled variant={"ghost"} type={"button"} size={"icon"} className='size-6 rounded-full'>
                        <span className='text-primary'>5</span>
                    </Button>
                </div>
                <div className='flex justify-end items-end'>
                    <Button variant={"shop"} type={"button"} size={"icon"} className='size-6 rounded-full'>
                        <Plus className='size-4'/>
                    </Button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default OrderCard