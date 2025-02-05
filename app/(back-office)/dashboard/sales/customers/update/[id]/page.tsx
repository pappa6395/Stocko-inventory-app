

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getAllRoles } from '@/actions/roles';
import { getUserById } from '@/actions/users';
import UserForm from '@/components/dashboard/Forms/UserForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const user = (await getUserById(id))?.data || null
    const roles = (await getAllRoles())?.data || [];

  
    return (
  
      <div>
          <UserForm 
            initialData={user ?? null}
            editingId={id ?? ""}
            roles={roles}
            />
      </div>
  
  
    )
}

export default page