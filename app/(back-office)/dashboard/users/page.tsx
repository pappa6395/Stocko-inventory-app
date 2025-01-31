
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllUsers } from '@/actions/users'


const page = async () => {

  const users = (await getAllUsers()).data || [];

  return (

    <div>
        <TableHeader
        title="Users"
        linkTitle="Add User"
        href="/dashboard/users/new"
        data={users}
        model="user"
      />
         <div className="py-8">
        <DataTable data={users} columns={columns} />
      </div>
    </div>

  )
}

export default page