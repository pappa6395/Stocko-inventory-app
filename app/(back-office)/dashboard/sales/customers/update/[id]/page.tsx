

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/sales/customers/update/[id]/page';
import { getCustomerById } from '@/actions/customers';
import { getAllRoles } from '@/actions/roles';
import CustomerForm from '@/components/dashboard/Forms/CustomerForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const customer = (await getCustomerById(id))?.data || null
    const roles = (await getAllRoles())?.data || [];

  
    return (
  
      <div>
          <CustomerForm 
            initialData={customer ?? null}
            editingId={id ?? ""}
            roles={roles}
            />
      </div>
  
    )
}

export default page