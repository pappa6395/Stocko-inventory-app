
import { getAllCategories } from '@/actions/category'
import { getAllCustomers } from '@/actions/customers'
import { getProductsByCategoryId } from '@/actions/products'
import { getAllSubCategories } from '@/actions/subCategories'
import { getAllUsers } from '@/actions/users'
import PointOfSale from '@/components/pos/PointOfSale'
import React from 'react'

type Props = {
  searchParams: Promise<{ cate: string }>
}

const page = async ({searchParams}: Props) => {

  const { cate="all" } = await searchParams;
  const allCategories = await getAllCategories() || [] 
  //const allSubCategories = await getAllSubCategories() || []
  const products = (await getProductsByCategoryId(cate)).data || []
  const customers = (await getAllUsers())?.data || [];
  
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