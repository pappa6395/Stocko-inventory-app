
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getBrandById } from '@/actions/brand';
import BrandForm from '@/components/dashboard/Forms/BrandForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const brand = await getBrandById(id) || null

  
    return (
  
      <div>
          <BrandForm 
            initialData={brand ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page