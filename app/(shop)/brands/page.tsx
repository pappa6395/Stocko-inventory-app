import { getAllBrands } from '@/actions/brand'
import CustomBreadCrumb from '@/components/frontend/CustomBreadCrumb';
import BrandList from '@/components/frontend/listings/BrandList'
import { Breadcrumb } from '@/components/ui/breadcrumb';
import React from 'react'

const page = async () => {

    const brands = await getAllBrands() || [];
    const breadCrumb = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Brands',
            href: '/brands',
        },
    ]

  return (

    <div className='container py-8'>
        <div className='py-4 border-t'>
            <CustomBreadCrumb breadCrumb={breadCrumb} />
        </div>
        <BrandList 
            brands={brands} 
            title="All Brands"
            link={`/brands`}
        />
    </div>

  )
}

export default page