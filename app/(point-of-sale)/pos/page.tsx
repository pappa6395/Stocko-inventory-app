
import { PageProps } from '@/.next/types/app/(point-of-sale)/pos/page'
import { getAllCustomers } from '@/actions/customers'
import { getProductsBySubCategoryId } from '@/actions/products'
import { getAllSubCategories } from '@/actions/subCategories'
import PointOfSale from '@/components/pos/PointOfSale'
import React from 'react'


const page = async ({searchParams: searchParamsPromise}: PageProps) => {

  const { cate="all" } = await searchParamsPromise
  const subCategories = await getAllSubCategories() || []
  const products = (await getProductsBySubCategoryId(cate))?.data || []
  const customers = (await getAllCustomers())?.data || [];
  
  if (!customers) {
    return <p>No customer Found</p>
  } 

  return (

    <div className='md:px-0 px-2'>
        <PointOfSale 
          subCategories={subCategories ?? []}
          products={products ?? []}
          customers={customers ?? []}
          cate={cate ?? ""} 
        />
    </div>

  )
}

export default page