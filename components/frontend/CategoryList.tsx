import { getAllCategories } from '@/actions/category'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const CategoryList = async () => {

    const categories = await getAllCategories()

  return (

    <div>
        <ScrollArea className='w-[350px] sm:w-[540px] md:w-[780px] 
        lg:w-[1080px] whitespace-nowrap rounded-md mx-auto overflow-scroll'
        >
            <div className='flex w-auto gap-6 items-center py-3'>
                {categories && categories.length > 0 && categories.map((category, i) => {
                    return (
                        <Link 
                            key={i} 
                            href={`/categories/${category.slug}`} 
                            className='w-24 flex flex-col justify-center items-center'
                        >
                            <Image 
                                src={category.imageUrl || "/placeholder.svg"} 
                                alt={category.title} 
                                width={200} height={200}
                                className='h-15 w-15 aspect-square object-contain rounded-lg' 
                            />
                            <p className='truncate w-[10ch] 
                            text-center whitespace-nowrap font-medium text-sm pt-2'>
                                {category.title}
                            </p>
                        </Link>
                    )
                })}
            </div>
            <ScrollBar orientation='horizontal'/>
        </ScrollArea>
        
    </div>

  )
}

export default CategoryList