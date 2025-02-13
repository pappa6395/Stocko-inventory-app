
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getAdvertById } from '@/actions/adverts';
import AdvertForm from '@/components/dashboard/Forms/AdvertForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const advert = await getAdvertById(id) || null
    
    return (
  
      <div>
          <AdvertForm 
            initialData={advert ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page