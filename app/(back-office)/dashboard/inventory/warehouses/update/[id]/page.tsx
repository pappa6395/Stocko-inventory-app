

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getWarehouseById } from '@/actions/warehouses';
import WarehouseForm from '@/components/dashboard/Forms/WarehouseForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const warehouse = await getWarehouseById(id) || null

  
    return (
  
      <div>
          <WarehouseForm 
            initialData={warehouse ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page