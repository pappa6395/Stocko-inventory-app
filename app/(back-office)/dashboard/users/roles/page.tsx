
import React from 'react'

import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { columns } from './columns'
import { getAllRoles } from '@/actions/roles'


const page = async () => {

  const roles = (await getAllRoles())?.data || []

  return (

    <div>
      <TableHeader
        title="Roles"
        linkTitle="Add Role"
        href="/dashboard/users/roles/new"
        data={roles}
        model="role"
        showImport={false}
      />
         <div className="py-8">
        <DataTable data={roles} columns={columns} />
      </div>
    </div>

  )
}

export default page