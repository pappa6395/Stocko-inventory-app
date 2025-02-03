import { Category, Products } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import ItemCard from './item-card'
import OrderCard from './order-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const PointOfSale = ({
    categories,
    products, 
    cate
}: {
    categories?: Category[]; 
    products?: Products[];
    cate: string;
}) => {
    

  return (

    <div className="grid grid-cols-12 divide-x-2 
        divide-gray-200 min-h-screen">
            <div className='col-span-9 px-3'>
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
                        <div className='grid grid-cols-4 gap-4'>
                            {products.map((product,index) => {
                                return (
                                    <ItemCard key={index} product={product} />
                                )
                            })}  
                        </div>
                    ) : (
                        <div className='text-sm text-center'>No products found</div>
                    )}
                </div>
            </div>
            <div className='col-span-3 p-3'>
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    OrderPanel
                </h2>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <div className='mt-2'>
                    <h2 className="scroll-m-20 border-b pb-2 text-2xl 
                    font-semibold tracking-tight first:mt-0"
                    >
                        Order Summary
                    </h2>
                    <div className='py-2 border-b'>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Total Items:</h3>
                            <h3 className=' font-medium text-muted-foreground'>5 items</h3>
                        </div>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Subtotal:</h3>
                            <h3 className='font-medium text-muted-foreground'>$ 500</h3>
                        </div>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Tax 7%:</h3>
                            <h3 className='font-medium text-muted-foreground'>$ 35</h3>
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
                            $ 535
                        </h3>
                    </div>
                    <div className='w-full py-4'>
                        <Button variant={'shop'} className='w-full'>
                            Place an Order
                        </Button>
                    </div>
                </div>
            </div>
    </div>

  )
}

export default PointOfSale