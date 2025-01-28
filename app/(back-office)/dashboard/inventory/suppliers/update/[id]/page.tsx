

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getSupplierById } from '@/actions/suppliers';
import SupplierForm from '@/components/dashboard/Forms/SupplierForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const supplier = await getSupplierById(id) || null

  
    return (
  
      <div>
          <SupplierForm 
            initialData={supplier ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page