
import { PageProps } from '@/.next/types/app/(point-of-sale)/pos/page'
import { getAllCategories } from '@/actions/category'
import { getAllCustomers } from '@/actions/customers'
import { getProductsByCategoryId } from '@/actions/products'
import { getAllSubCategories } from '@/actions/subCategories'
import PointOfSale from '@/components/pos/PointOfSale'
import React from 'react'


const page = async ({searchParams: searchParamsPromise}: PageProps) => {

  const { cate="all" } = await searchParamsPromise
  const allCategories = await getAllCategories() || [] 
  //const allSubCategories = await getAllSubCategories() || []
  const products = (await getProductsByCategoryId(cate)).data || []
  const customers = (await getAllCustomers())?.data || [];
  
  if (!customers) {
    return <p>No customer Found</p>
  } 

  return (

    <div className='md:px-0 px-2'>
        <PointOfSale 
          categories={allCategories ?? []}
          products={products ?? []}
          customers={customers ?? []}
          cate={cate ?? ""} 
        />
    </div>

  )
}

export default page