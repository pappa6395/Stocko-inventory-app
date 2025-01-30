
import React from 'react'

import { Unit } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { columns } from './columns'


const page = async () => {

  

  return (

    <div>
      {/* <TableHeader
        title="Roles"
        linkTitle="Add Role"
        href="/dashboard/users/roles/new"
        data={roles}
        model="role"
      /> */}
         <div className="py-8">
        {/* <DataTable data={roles} columns={columns} /> */}
      </div>
    </div>

  )
}

export default page