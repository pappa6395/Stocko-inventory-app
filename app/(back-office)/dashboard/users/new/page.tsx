
import { getAllRoles } from '@/actions/roles';
import UserForm from '@/components/dashboard/Forms/UserForm';
import React from 'react';

const page = async() => {

  const roles = (await getAllRoles()).data || [];

  return (

    <div className="flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
        <UserForm
          roles={roles ?? []}
        />
    </div>

  )
}

export default page