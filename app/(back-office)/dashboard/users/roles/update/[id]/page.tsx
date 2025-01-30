
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getUnitById } from '@/actions/units';
import RoleForm from '@/components/dashboard/Forms/RoleForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const unit = await getUnitById(id) || null

  
    return (
  
      <div>
          <RoleForm 
            initialData={unit ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page