
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getBannerById } from '@/actions/banners';
import BannerForm from '@/components/dashboard/Forms/BannerForm';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const banner = await getBannerById(id) || null
  
    return (
  
      <div>
          <BannerForm 
            initialData={banner ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page