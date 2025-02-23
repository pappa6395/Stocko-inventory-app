import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Brand } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'


const BrandList = ({
    brands, 
    title, 
    link,
    className
}: {
    brands: Brand[];
    title: string;
    link: string;
    className?: string;
}) => {

  return (

    <div className='space-y-3'>
        <div className={cn('flex justify-between items-center border-b', className)}>
            <div className='px-4 py-4'>
                <h2 className='text-3xl font-bold text-slate-50'>{title}</h2>
                <p className='text-slate-50'>Discover our diverse range of brands.</p>
            </div>
            <Button asChild variant={"receipt"} className='mr-2 text-base'>
                <Link href={link}>See All</Link>
            </Button>
        </div>
        <ScrollArea className='w-[350px] sm::w-[600px] md:w-[780px] lg:w-[1280px]
            whitespace-nowrap mx-auto rounded-lg'>
            <div className='flex sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 
            gap-6 pt-3 dark:bg-slate-800 px-2'>
                {brands.map((b,index) => {
                    return (
                        <Link 
                            href={`/brands/${b.slug}?id=${b.id}`} 
                            key={index}
                            className='flex flex-col items-center gap-2'
                        >
                            <Image 
                                src={b.imageUrl ?? '/placeholder.svg'} 
                                alt={b.title} 
                                width={200} 
                                height={250}
                                className='h-20 w-28 sm:h-44 sm:w-44 aspect-square object-contain' 
                            />
                            <h2 className='text-sm font-semibold text-gray-600 dark:text-slate-50'>{b.title}</h2>
                        </Link>
                    )
                })}
            </div>
            <ScrollBar orientation='horizontal'/>
        </ScrollArea>
        
    </div>

  )
}

export default BrandList