import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

type SubCategories = {
    title: string;
    slug: string;
}

type Categories = {
    title: string;
    slug: string;
    subCategories: SubCategories[]
}

const CategoryHeaderMobile = ({
    mainCategories
}: {
    mainCategories: { title: string; slug: string; categories: Categories[];}[];
}) => {


  return (

    <ScrollArea className="w-[380px] pl-2 whitespace-nowrap overflow-scroll">
        <div className='w-auto space-x-1 items-center flex px-2'>
            {mainCategories && mainCategories.map((category, index) => {
                return (
                    <Button 
                        key={index} 
                        variant={"outline"} 
                        size={"sm"} 
                        asChild
                    >
                        <Link href={`/pos?cate=${category.slug}`} className='flex gap-2'>
                            <h3 className='text-xs font-medium truncate'>{category.title}</h3>
                        </Link>
                    </Button>
                )
            })}
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>

  )
}

export default CategoryHeaderMobile