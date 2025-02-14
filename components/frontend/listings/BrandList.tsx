import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Brand } from '@prisma/client'


const BrandList = ({
    brands, 
    title, 
    link
}: {
    brands: Brand[];
    title: string;
    link: string;
}) => {

  return (

    <div>
        <div className='flex justify-between items-center border-b pb-3'>
            <div>
                <h2 className='text-3xl font-bold text-gray-900'>{title}</h2>
                <p className='text-gray-600'>Discover our diverse range of brands.</p>
            </div>
            <Link href={link}>
                <span className='text-center font-medium text-blue-600'>View All Brands</span>
            </Link>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-3'>
            {brands.map((b,index) => {
                return (
                    <Link 
                        href={`/brands/${b.slug}?id=${b.id}`} 
                        key={index}
                        className='flex flex-col items-center'
                    >
                        <Image 
                            src={b.imageUrl ?? '/placeholder.svg'} 
                            alt={b.title} 
                            width={200} 
                            height={250}
                            className='h-44 w-44 object-contain' 
                        />
                        <h2 className='text-sm font-semibold text-gray-600'>{b.title}</h2>
                    </Link>
                )
            })}
        </div>
    </div>

  )
}

export default BrandList