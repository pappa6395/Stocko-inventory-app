
import { PageProps } from '@/.next/types/app/(point-of-sale)/pos/page'
import { getAllCategories } from '@/actions/category'
import { getProductsByCategoryId } from '@/actions/products'
import PointOfSale from '@/components/pos/PointOfSale'
import React from 'react'


const page = async ({searchParams: searchParamsPromise}: PageProps) => {

  const { cate="all" } = await searchParamsPromise
  const categories = await getAllCategories() || []
  const products = (await getProductsByCategoryId(cate))?.data || []

  return (

    <div className='md:px-0 px-2'>
        <PointOfSale 
          categories={categories ?? []}
          products={products ?? []} 
          cate={cate ?? ""} 
        />
    </div>

  )
}

export default page