import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import HorizontalProduct from './HorizontalProduct'
import { IProducts } from '@/type/types'
import VerticalProduct from './VerticalProduct'
import ProductWithCart from './ProductWithCart'
import CarouselListing from './CarouselListing'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'


type ProductListingProps = {
    title?: string;
    detailLink: string;
    products: IProducts[];
    cardType?: "horizontal" | "vertical" | "cart" | "carousel";
    scrollable?: boolean;
    carousel?: boolean;
    className?: string;
}


const ProductListing = ({
    title,
    detailLink,
    products,
    cardType = "horizontal",
    scrollable,
    carousel,
    className
  }: ProductListingProps
) => {


  return (

    <div className='space-y-3 grid grid-col-1'>
        <div className={cn('flex items-center justify-between border-gray-400 py-3', className)}>
            {/* Heading */}
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight 
            lg:text-3xl px-4 text-white">
            {title ?? ""}
            </h1>
            <Button asChild variant={"receipt"} className='mr-2'>
                <Link href={detailLink}>See All</Link>
            </Button>   
        </div>
        <div className='bg-gradient-to-r from-white to-sky-300 
        dark:from-slate-500 dark:to-slate-700 gap-2 rounded-lg'>
            {carousel ? (
                    <div className='max-w-xs md:max-w-5xl mx-auto pt-3 pb-3'>
                        <CarouselListing products={products} />
                    </div>
                ) : cardType === "horizontal" ? (
                    scrollable ? (
                        <ScrollArea className='w-[350px] sm::w-[600px] md:w-[780px] lg:w-[980px]
                        whitespace-nowrap mx-auto'>
                            <div className='flex gap-4 py-3 items-center'>
                                {products.map((product,i) => {
                                    return (
                                        <HorizontalProduct key={i} product={product} />
                                    )
                                })}
                            </div>
                            <ScrollBar orientation='horizontal'/>
                        </ScrollArea>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-2'>
                            {products.map((product,i) => {
                                return (
                                    <HorizontalProduct key={i} product={product} />
                                )
                            })}
                        </div>
                    )
                ) : cardType === "vertical" ? (
                    scrollable ? (
                        <ScrollArea className='w-[330px] sm::w-[600px] md:w-[780px] lg:w-[980px]
                        whitespace-nowrap mx-auto'>
                            <div className='flex gap-4 py-3 items-center'>
                                {products.map((product,i) => {
                                    return (
                                        <VerticalProduct key={i} product={product} />
                                    )
                                })}
                            </div>
                            <ScrollBar orientation='horizontal'/>
                        </ScrollArea>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 sm:p-4 gap-2'>
                            {products.map((product,i) => {
                                return (
                                    <VerticalProduct key={i} product={product} />
                                )
                            })}
                        </div>
                    )         
                ) : cardType === "cart" ? (
                    scrollable ? (
                        <ScrollArea className='w-[350px] sm::w-[600px] md:w-[780px] lg:w-[980px]
                        whitespace-nowrap mx-auto'>
                            <div className='flex gap-4 py-3 items-center'>
                                {products.map((product,i) => {
                                    return (
                                        <ProductWithCart key={i} product={product}/>
                                    )
                                })}
                            </div>
                            <ScrollBar orientation='horizontal'/>
                        </ScrollArea>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4 gap-2'>
                            {products.map((product,i) => {
                                return (
                                    <ProductWithCart key={i} product={product}/>
                                )
                            })}
                        </div>
                    )
                ) : (
                    <div>
                        <p>No products found</p>
                    </div>
                )
            }
        </div>
            
    </div>

  )
}

export default ProductListing