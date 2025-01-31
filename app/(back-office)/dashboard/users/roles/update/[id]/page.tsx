

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/users/roles/update/[id]/page';
import { getRoleById } from '@/actions/roles';
import RoleForm from '@/components/dashboard/Forms/RoleForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const role = (await getRoleById(id))?.data || null


    return (
  
      <div>
          <RoleForm 
            editingId={id ?? ""}
            initialData={role ?? null}
          />
      </div>
    )
}

export default page